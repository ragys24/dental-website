from pathlib import Path

from PIL import Image, ImageOps
from pillow_heif import register_heif_opener


register_heif_opener()

SOURCE_DIR = Path('/home/ubuntu/webdev-static-assets/uplift-authentic-office')
OUTPUT_DIR = SOURCE_DIR / 'gbp-interior-upload'
FILES = {
    'IMG_1791.HEIC': 'uplift-interior-reception-waiting-area.jpg',
    'IMG_1808.HEIC': 'uplift-interior-reception-desk.jpg',
}


def convert(source_name: str, output_name: str) -> tuple[str, tuple[int, int]]:
    source_path = SOURCE_DIR / source_name
    output_path = OUTPUT_DIR / output_name
    with Image.open(source_path) as original:
        image = ImageOps.exif_transpose(original).convert('RGB')
        image.save(output_path, 'JPEG', quality=92, optimize=True, progressive=True)
        return str(output_path), image.size


def main() -> None:
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    for source_name, output_name in FILES.items():
        output_path, dimensions = convert(source_name, output_name)
        print(f'{output_path}\t{dimensions[0]}x{dimensions[1]}')


if __name__ == '__main__':
    main()
