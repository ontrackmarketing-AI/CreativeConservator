"""
Media Cataloging Script for Creative Conservator
Scans Version 1/Version 2 photo directories + FLOWR PDF,
sends each to Gemini 2.0 Flash for structured analysis,
and outputs media-catalog.json + media-catalog.md
"""

import os
import io
import json
import time
import sys
from pathlib import Path
from PIL import Image
import pypdf
from google import genai

# ── Config ──────────────────────────────────────────────────────────────────
MEDIA_DIRS = [
    Path(r"C:\Users\Owner\Downloads\Version 1"),
    Path(r"C:\Users\Owner\Downloads\Version 2"),
]
FLOWR_PDF = Path(r"C:\Users\Owner\Downloads\The FLOWR Strain Experience.pdf")
OUTPUT_DIR = Path(r"C:\Users\Owner\OneDrive\Desktop\CreativeConservator\scripts")
MAX_PX = 2048
DELAY_SECONDS = 5
MODEL = "gemini-2.0-flash"

# ── Gemini client ───────────────────────────────────────────────────────────
api_key = os.environ.get("GEMINI_API_KEY")
if not api_key:
    print("ERROR: Set GEMINI_API_KEY environment variable")
    sys.exit(1)

client = genai.Client(api_key=api_key)

IMAGE_PROMPT = """You are analyzing a professional photograph for a creative marketing studio website called "The Creative Conservator." The brand aesthetic is classical, refined, and artistic with colors: deep red (#3B0510), green (#889063), cream (#F5F0E8), and vintage wine (#221516).

The studio is founded by Darya, a woman with marketing strategy, sales experience, and global perspective shaped by modeling and extensive international travel.

Analyze this image and respond in VALID JSON (no markdown code fences) with this exact structure:
{
  "subject_description": "detailed description of what's in the image",
  "people": "description of any people visible, their appearance, pose, expression, or 'none'",
  "mood_tone": "overall mood and emotional tone",
  "dominant_colors": ["list", "of", "dominant", "colors"],
  "brand_color_alignment": "how well the image colors align with the brand palette (deep red, green, cream, vintage wine) - high/medium/low with explanation",
  "style_category": "one of: portrait, editorial, still-life, lifestyle, fashion, landscape, abstract, behind-the-scenes",
  "classification": "one of: 'photo_of_darya' (founder/about use), 'creative_work_by_darya' (portfolio use), 'both', 'unclear'",
  "classification_reasoning": "why you classified it this way",
  "suitability_scores": {
    "hero_banner": 0,
    "founder_photo": 0,
    "services_section": 0,
    "portfolio_showcase": 0,
    "background_texture": 0,
    "testimonials_area": 0,
    "blog_header": 0
  },
  "recommended_placement": "primary recommended placement on the website",
  "crop_suggestions": "how to best crop/frame for web use"
}

Score each suitability 1-10 where 10 = perfect fit. Be specific and practical."""

PDF_PROMPT = """You are analyzing a PDF document called "The FLOWR Strain Experience" which is a portfolio project by Darya, the founder of The Creative Conservator creative marketing studio.

Extract and analyze this document as a portfolio case study. Respond in VALID JSON (no markdown code fences):
{
  "project_title": "The FLOWR Strain Experience",
  "project_summary": "2-3 sentence summary of the project",
  "project_type": "type of project (brand campaign, content strategy, etc.)",
  "services_demonstrated": ["list of services this project demonstrates"],
  "key_visuals_described": "description of any notable visual elements or design choices",
  "brand_voice_notes": "notes on the tone, language, and creative approach",
  "target_audience": "who this project was aimed at",
  "portfolio_display_notes": "how to best feature this on a portfolio/work page",
  "case_study_headline": "suggested headline for the portfolio card",
  "case_study_excerpt": "1-2 sentence excerpt for the portfolio card"
}"""


def resize_image(img_path: Path) -> bytes:
    """Resize image to max MAX_PX, return JPEG bytes."""
    with Image.open(img_path) as img:
        img = img.convert("RGB")
        img.thumbnail((MAX_PX, MAX_PX), Image.LANCZOS)
        buf = io.BytesIO()
        img.save(buf, format="JPEG", quality=85)
        return buf.getvalue()


def analyze_image(img_path: Path, idx: int, total: int) -> dict:
    """Send one image to Gemini and return structured analysis."""
    print(f"  [{idx}/{total}] Analyzing {img_path.name} ...", end=" ", flush=True)
    img_bytes = resize_image(img_path)
    size_kb = len(img_bytes) / 1024
    print(f"({size_kb:.0f} KB)", end=" ", flush=True)

    response = client.models.generate_content(
        model=MODEL,
        contents=[
            {
                "parts": [
                    {"text": IMAGE_PROMPT},
                    {"inline_data": {"mime_type": "image/jpeg", "data": img_bytes}},
                ]
            }
        ],
    )
    raw = response.text.strip()
    # Strip markdown fences if present
    if raw.startswith("```"):
        raw = raw.split("\n", 1)[1] if "\n" in raw else raw[3:]
        if raw.endswith("```"):
            raw = raw[:-3]
        raw = raw.strip()
    try:
        data = json.loads(raw)
    except json.JSONDecodeError:
        data = {"raw_response": raw, "parse_error": True}
    print("done")
    return data


def extract_pdf_text(pdf_path: Path) -> str:
    """Extract all text from a PDF."""
    reader = pypdf.PdfReader(str(pdf_path))
    pages = []
    for page in reader.pages:
        text = page.extract_text()
        if text:
            pages.append(text)
    return "\n\n---PAGE BREAK---\n\n".join(pages)


def analyze_pdf(pdf_path: Path) -> dict:
    """Send PDF text to Gemini for case study analysis."""
    print(f"  Analyzing PDF: {pdf_path.name} ...", end=" ", flush=True)
    text = extract_pdf_text(pdf_path)
    if not text.strip():
        print("no text extracted")
        return {"error": "No text could be extracted from PDF"}
    # Truncate to ~30k chars to stay within limits
    text = text[:30000]
    response = client.models.generate_content(
        model=MODEL,
        contents=[{"parts": [{"text": f"{PDF_PROMPT}\n\nDocument text:\n{text}"}]}],
    )
    raw = response.text.strip()
    if raw.startswith("```"):
        raw = raw.split("\n", 1)[1] if "\n" in raw else raw[3:]
        if raw.endswith("```"):
            raw = raw[:-3]
        raw = raw.strip()
    try:
        data = json.loads(raw)
    except json.JSONDecodeError:
        data = {"raw_response": raw, "parse_error": True}
    print("done")
    return data


def build_catalog() -> dict:
    """Scan all media and build the full catalog."""
    catalog = {"images": [], "pdf": None, "summary": {}}

    # Collect all image paths
    all_images = []
    for media_dir in MEDIA_DIRS:
        if not media_dir.exists():
            print(f"WARNING: {media_dir} not found, skipping")
            continue
        for f in sorted(media_dir.iterdir()):
            if f.suffix.lower() in (".jpg", ".jpeg", ".png", ".tiff", ".webp"):
                all_images.append(f)

    total = len(all_images)
    print(f"\nFound {total} images across {len(MEDIA_DIRS)} directories\n")

    # Analyze each image
    for i, img_path in enumerate(all_images, 1):
        analysis = analyze_image(img_path, i, total)
        entry = {
            "filename": img_path.name,
            "directory": img_path.parent.name,
            "full_path": str(img_path),
            "file_size_mb": round(img_path.stat().st_size / (1024 * 1024), 1),
            "analysis": analysis,
        }
        catalog["images"].append(entry)
        if i < total:
            time.sleep(DELAY_SECONDS)

    # Analyze FLOWR PDF
    if FLOWR_PDF.exists():
        print()
        catalog["pdf"] = {
            "filename": FLOWR_PDF.name,
            "full_path": str(FLOWR_PDF),
            "file_size_mb": round(FLOWR_PDF.stat().st_size / (1024 * 1024), 1),
            "analysis": analyze_pdf(FLOWR_PDF),
        }
    else:
        print(f"\nWARNING: FLOWR PDF not found at {FLOWR_PDF}")

    # Build summary
    photos_of_darya = []
    creative_work = []
    best_hero = None
    best_founder = None
    best_portfolio = []
    hero_score = 0
    founder_score = 0

    for entry in catalog["images"]:
        a = entry.get("analysis", {})
        if a.get("parse_error"):
            continue
        classification = a.get("classification", "unclear")
        scores = a.get("suitability_scores", {})

        if classification in ("photo_of_darya", "both"):
            photos_of_darya.append(entry["filename"])
        if classification in ("creative_work_by_darya", "both"):
            creative_work.append(entry["filename"])

        h = scores.get("hero_banner", 0)
        if h > hero_score:
            hero_score = h
            best_hero = entry["filename"]

        f = scores.get("founder_photo", 0)
        if f > founder_score:
            founder_score = f
            best_founder = entry["filename"]

        p = scores.get("portfolio_showcase", 0)
        if p >= 7:
            best_portfolio.append({"filename": entry["filename"], "score": p})

    best_portfolio.sort(key=lambda x: x["score"], reverse=True)

    catalog["summary"] = {
        "total_images": len(catalog["images"]),
        "photos_of_darya": photos_of_darya,
        "creative_work_by_darya": creative_work,
        "best_hero_banner": {"filename": best_hero, "score": hero_score},
        "best_founder_photo": {"filename": best_founder, "score": founder_score},
        "best_portfolio_images": best_portfolio[:8],
        "has_flowr_pdf": catalog["pdf"] is not None,
    }

    return catalog


def write_markdown(catalog: dict, path: Path):
    """Write human-readable catalog summary."""
    lines = ["# Media Catalog - The Creative Conservator\n"]
    lines.append(f"**Total images analyzed:** {catalog['summary']['total_images']}\n")

    # Summary
    s = catalog["summary"]
    lines.append("## Quick Summary\n")
    lines.append(f"- **Photos OF Darya** (founder/about): {len(s['photos_of_darya'])} images")
    for fn in s["photos_of_darya"]:
        lines.append(f"  - {fn}")
    lines.append(f"- **Creative work BY Darya** (portfolio): {len(s['creative_work_by_darya'])} images")
    for fn in s["creative_work_by_darya"]:
        lines.append(f"  - {fn}")
    lines.append("")

    # Recommendations
    lines.append("## Placement Recommendations\n")
    lines.append(f"- **Hero Banner:** `{s['best_hero_banner']['filename']}` (score: {s['best_hero_banner']['score']})")
    lines.append(f"- **Founder Photo:** `{s['best_founder_photo']['filename']}` (score: {s['best_founder_photo']['score']})")
    lines.append("- **Portfolio Showcase (top picks):**")
    for item in s["best_portfolio_images"]:
        lines.append(f"  - `{item['filename']}` (score: {item['score']})")
    lines.append("")

    # Detailed per-image
    lines.append("---\n## Detailed Image Analysis\n")
    for entry in catalog["images"]:
        a = entry.get("analysis", {})
        lines.append(f"### {entry['filename']}")
        lines.append(f"- **Directory:** {entry['directory']}")
        lines.append(f"- **File size:** {entry['file_size_mb']} MB")
        if a.get("parse_error"):
            lines.append("- **Analysis:** FAILED TO PARSE")
            lines.append(f"- **Raw:** {a.get('raw_response', 'N/A')[:200]}")
        else:
            lines.append(f"- **Subject:** {a.get('subject_description', 'N/A')}")
            lines.append(f"- **People:** {a.get('people', 'N/A')}")
            lines.append(f"- **Mood/Tone:** {a.get('mood_tone', 'N/A')}")
            lines.append(f"- **Colors:** {', '.join(a.get('dominant_colors', []))}")
            lines.append(f"- **Brand Alignment:** {a.get('brand_color_alignment', 'N/A')}")
            lines.append(f"- **Style:** {a.get('style_category', 'N/A')}")
            lines.append(f"- **Classification:** {a.get('classification', 'N/A')}")
            lines.append(f"- **Reasoning:** {a.get('classification_reasoning', 'N/A')}")
            scores = a.get("suitability_scores", {})
            lines.append("- **Suitability Scores:**")
            for k, v in scores.items():
                lines.append(f"  - {k.replace('_', ' ').title()}: {v}/10")
            lines.append(f"- **Recommended Placement:** {a.get('recommended_placement', 'N/A')}")
            lines.append(f"- **Crop Suggestions:** {a.get('crop_suggestions', 'N/A')}")
        lines.append("")

    # FLOWR PDF
    if catalog.get("pdf"):
        lines.append("---\n## FLOWR Strain Experience (PDF)\n")
        pa = catalog["pdf"].get("analysis", {})
        if pa.get("parse_error"):
            lines.append("Analysis failed to parse.")
        else:
            lines.append(f"- **Project Title:** {pa.get('project_title', 'N/A')}")
            lines.append(f"- **Summary:** {pa.get('project_summary', 'N/A')}")
            lines.append(f"- **Type:** {pa.get('project_type', 'N/A')}")
            lines.append(f"- **Services Demonstrated:** {', '.join(pa.get('services_demonstrated', []))}")
            lines.append(f"- **Target Audience:** {pa.get('target_audience', 'N/A')}")
            lines.append(f"- **Case Study Headline:** {pa.get('case_study_headline', 'N/A')}")
            lines.append(f"- **Case Study Excerpt:** {pa.get('case_study_excerpt', 'N/A')}")
            lines.append(f"- **Display Notes:** {pa.get('portfolio_display_notes', 'N/A')}")
    lines.append("")

    path.write_text("\n".join(lines), encoding="utf-8")
    print(f"\nMarkdown catalog written to {path}")


def main():
    print("=" * 60)
    print("  Creative Conservator - Media Cataloging")
    print("=" * 60)

    catalog = build_catalog()

    # Write JSON
    json_path = OUTPUT_DIR / "media-catalog.json"
    json_path.write_text(json.dumps(catalog, indent=2, ensure_ascii=False), encoding="utf-8")
    print(f"\nJSON catalog written to {json_path}")

    # Write Markdown
    md_path = OUTPUT_DIR / "media-catalog.md"
    write_markdown(catalog, md_path)

    print("\nDone!")


if __name__ == "__main__":
    main()
