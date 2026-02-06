"""
Image Optimization Script for Creative Conservator
Takes selected images from Version 1/2 and generates web-ready versions
in multiple sizes and formats (WebP + JPEG fallback).
"""

import json
from pathlib import Path
from PIL import Image

# ── Image placement decisions (based on catalog analysis) ─────────────────
PLACEMENTS = {
    # Hero images - used across page hero banners
    "hero": [
        {
            "source": Path(r"C:\Users\Owner\Downloads\Version 1\B2206681.jpg"),
            "name": "hero-creative-studio",
            "sizes": [2560, 1920, 1200, 800, 400],
        },
        {
            "source": Path(r"C:\Users\Owner\Downloads\Version 1\B2206671 copy.jpg"),
            "name": "hero-perfume-detail",
            "sizes": [2560, 1920, 1200, 800, 400],
        },
        {
            "source": Path(r"C:\Users\Owner\Downloads\Version 2\B2206695.jpg"),
            "name": "hero-fashion-duo",
            "sizes": [2560, 1920, 1200, 800, 400],
        },
        {
            "source": Path(r"C:\Users\Owner\Downloads\Version 2\B2206772.jpg"),
            "name": "hero-elegant-interior",
            "sizes": [2560, 1920, 1200, 800, 400],
        },
    ],
    # Founder photo
    "founder": [
        {
            "source": Path(r"C:\Users\Owner\Downloads\Version 1\B2206573.jpg"),
            "name": "founder-darya-creative",
            "sizes": [800, 560, 400, 200],
        },
        {
            "source": Path(r"C:\Users\Owner\Downloads\Version 2\B2206573.jpg"),
            "name": "founder-darya-collaboration",
            "sizes": [800, 560, 400, 200],
        },
    ],
    # Portfolio images
    "portfolio": [
        {
            "source": Path(r"C:\Users\Owner\Downloads\Version 1\B2206671 copy.jpg"),
            "name": "portfolio-kilian-perfume-hands",
            "sizes": [1200, 800, 400, 200],
        },
        {
            "source": Path(r"C:\Users\Owner\Downloads\Version 1\B2206681.jpg"),
            "name": "portfolio-kilian-perfume-lips",
            "sizes": [1200, 800, 400, 200],
        },
        {
            "source": Path(r"C:\Users\Owner\Downloads\Version 1\B2206681 g.jpg"),
            "name": "portfolio-kilian-editorial",
            "sizes": [1200, 800, 400, 200],
        },
        {
            "source": Path(r"C:\Users\Owner\Downloads\Version 1\B2206473.jpg"),
            "name": "portfolio-fashion-editorial-duo",
            "sizes": [1200, 800, 400, 200],
        },
        {
            "source": Path(r"C:\Users\Owner\Downloads\Version 2\B2206695.jpg"),
            "name": "portfolio-fashion-back-to-back",
            "sizes": [1200, 800, 400, 200],
        },
        {
            "source": Path(r"C:\Users\Owner\Downloads\Version 2\B2206772.jpg"),
            "name": "portfolio-fashion-elegant-room",
            "sizes": [1200, 800, 400, 200],
        },
        {
            "source": Path(r"C:\Users\Owner\Downloads\Version 1\B2206625.jpg"),
            "name": "portfolio-luxury-lounge",
            "sizes": [1200, 800, 400, 200],
        },
        {
            "source": Path(r"C:\Users\Owner\Downloads\Version 1\B2206534.jpg"),
            "name": "portfolio-fashion-interior",
            "sizes": [1200, 800, 400, 200],
        },
    ],
    # Services section images
    "services": [
        {
            "source": Path(r"C:\Users\Owner\Downloads\Version 1\B2206574.jpg"),
            "name": "services-creative-process",
            "sizes": [1200, 800, 400],
        },
        {
            "source": Path(r"C:\Users\Owner\Downloads\Version 2\B2206573.jpg"),
            "name": "services-collaboration",
            "sizes": [1200, 800, 400],
        },
    ],
}

OUTPUT_DIR = Path(r"C:\Users\Owner\OneDrive\Desktop\CreativeConservator\website\images")
WEBP_QUALITY = 82
JPEG_QUALITY = 85


def optimize_image(source: Path, name: str, category: str, sizes: list[int]):
    """Generate responsive versions of an image in WebP and JPEG."""
    out_dir = OUTPUT_DIR / category
    out_dir.mkdir(parents=True, exist_ok=True)

    if not source.exists():
        print(f"  WARNING: {source} not found, skipping")
        return []

    with Image.open(source) as img:
        img = img.convert("RGB")
        orig_w, orig_h = img.size
        generated = []

        for target_w in sizes:
            if target_w > orig_w:
                target_w = orig_w

            ratio = target_w / orig_w
            target_h = int(orig_h * ratio)
            resized = img.resize((target_w, target_h), Image.LANCZOS)

            # WebP
            webp_name = f"{name}-{target_w}.webp"
            webp_path = out_dir / webp_name
            resized.save(webp_path, "WEBP", quality=WEBP_QUALITY)

            # JPEG fallback
            jpg_name = f"{name}-{target_w}.jpg"
            jpg_path = out_dir / jpg_name
            resized.save(jpg_path, "JPEG", quality=JPEG_QUALITY)

            webp_size = webp_path.stat().st_size / 1024
            jpg_size = jpg_path.stat().st_size / 1024

            generated.append({
                "width": target_w,
                "height": target_h,
                "webp": f"images/{category}/{webp_name}",
                "jpeg": f"images/{category}/{jpg_name}",
                "webp_size_kb": round(webp_size, 1),
                "jpeg_size_kb": round(jpg_size, 1),
            })
            print(f"    {target_w}px: WebP {webp_size:.0f}KB, JPEG {jpg_size:.0f}KB")

        return generated


def main():
    print("=" * 60)
    print("  Creative Conservator - Image Optimization")
    print("=" * 60)

    manifest = {}

    for category, items in PLACEMENTS.items():
        print(f"\n--- {category.upper()} ---")
        for item in items:
            print(f"\n  Processing: {item['name']}")
            versions = optimize_image(
                item["source"], item["name"], category, item["sizes"]
            )
            manifest[item["name"]] = {
                "source": str(item["source"]),
                "category": category,
                "versions": versions,
            }

    # Write manifest
    manifest_path = OUTPUT_DIR / "image-manifest.json"
    manifest_path.write_text(json.dumps(manifest, indent=2), encoding="utf-8")
    print(f"\nManifest written to {manifest_path}")

    # Summary
    total_files = sum(len(v["versions"]) * 2 for v in manifest.values())
    total_size = sum(
        v["webp_size_kb"] + v["jpeg_size_kb"]
        for entry in manifest.values()
        for v in entry["versions"]
    )
    print(f"\nTotal files generated: {total_files}")
    print(f"Total size: {total_size / 1024:.1f} MB")
    print("\nDone!")


if __name__ == "__main__":
    main()
