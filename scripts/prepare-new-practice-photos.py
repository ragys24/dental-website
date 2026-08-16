from pathlib import Path

from PIL import Image, ImageOps
from pillow_heif import register_heif_opener


register_heif_opener()

SOURCE_DIR = Path('/home/ubuntu/upload')
OUTPUT_DIR = Path('/home/ubuntu/webdev-static-assets/uplift-new-practice-photos')
FILES = (
    'IMG_2495.HEIC',
    'IMG_2496.HEIC',
    'IMG_3750.HEIC',
    'IMG_7836.HEIC',
)
MAX_EDGE = 1800


def prepare(source_name: str) -> None:
    source = SOURCE_DIR / source_name
    destination = OUTPUT_DIR / f'{source.stem.lower()}-web.webp'
    with Image.open(source) as original:
        image = ImageOps.exif_transpose(original).convert('RGB')
        original_size = image.size
        image.thumbnail((MAX_EDGE, MAX_EDGE), Image.Resampling.LANCZOS)
        image.save(destination, 'WEBP', quality=88, method=6)
        print(f'{source.name}\t{original_size[0]}x{original_size[1]}\t{destination}\t{image.width}x{image.height}')


def main() -> None:
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    for file_name in FILES:
        prepare(file_name)


if __name__ == '__main__':
    main()
