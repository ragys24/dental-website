from __future__ import annotations

import json
from pathlib import Path
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent
ASSET_ROOT = ROOT / "client" / "public" / "assets" / "uplift"
MAX_DIMENSION = 2000
QUALITY = 82
manifest: dict[str, str] = {}
summary: list[dict[str, object]] = []

for source in sorted(ASSET_ROOT.iterdir()):
    if source.suffix.lower() not in {".jpg", ".jpeg", ".png"}:
        continue

    with Image.open(source) as opened:
        image = ImageOps.exif_transpose(opened)
        original_size = source.stat().st_size
        original_dimensions = image.size
        if max(image.size) > MAX_DIMENSION:
            image.thumbnail((MAX_DIMENSION, MAX_DIMENSION), Image.Resampling.LANCZOS)
        if image.mode not in {"RGB", "RGBA"}:
            image = image.convert("RGBA" if "transparency" in image.info else "RGB")

        output = source.with_suffix(".webp")
        image.save(output, "WEBP", quality=QUALITY, method=6)

    if output.stat().st_size < original_size:
        manifest[f"/assets/uplift/{source.name}"] = f"/assets/uplift/{output.name}"
        summary.append({
            "source": source.name,
            "output": output.name,
            "original_bytes": original_size,
            "optimized_bytes": output.stat().st_size,
            "original_dimensions": original_dimensions,
            "optimized_dimensions": image.size,
        })
    else:
        output.unlink()

report = {
    "optimized": summary,
    "replacements": manifest,
    "original_bytes": sum(int(item["original_bytes"]) for item in summary),
    "optimized_bytes": sum(int(item["optimized_bytes"]) for item in summary),
}
(ROOT / "docs" / "image-optimization-report.json").write_text(json.dumps(report, indent=2) + "\n")
print(json.dumps({
    "optimized_files": len(summary),
    "original_bytes": report["original_bytes"],
    "optimized_bytes": report["optimized_bytes"],
}, indent=2))
