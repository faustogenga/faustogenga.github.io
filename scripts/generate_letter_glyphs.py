from pathlib import Path

from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
SOURCE_DIR = ROOT / "public" / "assets" / "letters"
OUTPUT_DIR = SOURCE_DIR / "generated"


STYLE_CONFIGS = {
    "style-1": {
        "source": SOURCE_DIR / "alphabet-1.png",
        "rows": [
            {"letters": "ABCDEFG", "box": (44, 128, 982, 330)},
            {"letters": "HIJKLMN", "box": (44, 330, 982, 565)},
            {"letters": "OPQRSTU", "box": (42, 560, 982, 822)},
            {"letters": "VWXYZ", "box": (70, 822, 972, 1048)},
        ],
        "mask": "checkerboard",
    },
    "style-2": {
        "source": SOURCE_DIR / "alphabet-2.png",
        "rows": [
            {"letters": "ABCDEFG", "box": (44, 128, 982, 330)},
            {"letters": "HIJKLMN", "box": (44, 330, 982, 565)},
            {"letters": "OPQRSTU", "box": (42, 560, 982, 822)},
            {"letters": "VWXYZ", "box": (70, 822, 972, 1048)},
        ],
        "mask": "checkerboard",
    },
    "style-4": {
        "source": SOURCE_DIR / "alphabet-4.png",
        "rows": [
            {"letters": "ABCDEFG", "box": (44, 128, 982, 330)},
            {"letters": "HIJKLMN", "box": (44, 330, 982, 565)},
            {"letters": "OPQRSTU", "box": (42, 560, 982, 822)},
            {"letters": "VWXYZ", "box": (70, 822, 972, 1048)},
        ],
        "mask": "checkerboard",
    },
    "style-5": {
        "source": SOURCE_DIR / "alphabet-5.png",
        "rows": [
            {"letters": "ABCDEFG", "box": (44, 48, 980, 320)},
            {"letters": "HIJKLMN", "box": (44, 320, 980, 566)},
            {"letters": "OPQRSTU", "box": (40, 566, 982, 838)},
            {"letters": "VWXYZ", "box": (52, 838, 968, 1070)},
        ],
        "mask": "dark",
    },
}


def is_letter_pixel(pixel, mask_type):
    r, g, b, _ = pixel
    max_c = max(r, g, b)
    min_c = min(r, g, b)
    spread = max_c - min_c
    value = max_c / 255
    saturation = 0 if max_c == 0 else spread / max_c

    if mask_type == "checkerboard":
        return saturation > 0.09 or value < 0.87 or spread > 24

    if mask_type == "dark":
        return max_c > 48 or spread > 28

    return False


def extract_best_component(mask):
    width = len(mask[0])
    height = len(mask)
    visited = [[False] * width for _ in range(height)]
    components = []

    for y in range(height):
        for x in range(width):
            if not mask[y][x] or visited[y][x]:
                continue

            stack = [(x, y)]
            visited[y][x] = True
            pixels = []

            while stack:
                cx, cy = stack.pop()
                pixels.append((cx, cy))

                for nx in range(max(0, cx - 1), min(width, cx + 2)):
                    for ny in range(max(0, cy - 1), min(height, cy + 2)):
                        if visited[ny][nx] or not mask[ny][nx]:
                            continue
                        visited[ny][nx] = True
                        stack.append((nx, ny))

            if len(pixels) >= 24:
                components.append(pixels)

    if not components:
        return set()

    center_x = width / 2
    center_y = height / 2

    def score(component):
        area = len(component)
        avg_x = sum(x for x, _ in component) / area
        avg_y = sum(y for _, y in component) / area
        distance = abs(avg_x - center_x) + abs(avg_y - center_y)
        return area - (distance * 6)

    best = max(components, key=score)
    return set(best)


def make_transparent(image, mask_type):
    rgba = image.convert("RGBA")
    out = Image.new("RGBA", rgba.size, (0, 0, 0, 0))
    mask = []

    for y in range(rgba.height):
        row = []
        for x in range(rgba.width):
            pixel = rgba.getpixel((x, y))
            row.append(is_letter_pixel(pixel, mask_type))
        mask.append(row)

    keep = extract_best_component(mask)
    for x, y in keep:
        out.putpixel((x, y), rgba.getpixel((x, y)))

    return out


def trim_transparent(image):
    bbox = image.getbbox()
    if bbox is None:
        return image
    trimmed = image.crop(bbox)
    canvas = Image.new("RGBA", (trimmed.width + 12, trimmed.height + 12), (0, 0, 0, 0))
    canvas.paste(trimmed, (6, 6))
    return canvas


def crop_style(style_name, config):
    source = Image.open(config["source"]).convert("RGBA")
    style_dir = OUTPUT_DIR / style_name
    style_dir.mkdir(parents=True, exist_ok=True)

    for row in config["rows"]:
        letters = row["letters"]
        x0, y0, x1, y1 = row["box"]
        row_width = x1 - x0
        cell_width = row_width / len(letters)

        for index, letter in enumerate(letters):
            left = int(round(x0 + (index * cell_width) - 10))
            right = int(round(x0 + ((index + 1) * cell_width) + 10))
            top = max(0, y0 - 12)
            bottom = min(source.height, y1 + 12)
            cropped = source.crop((max(0, left), top, min(source.width, right), bottom))
            transparent = make_transparent(cropped, config["mask"])
            output = trim_transparent(transparent)
            output.save(style_dir / f"{letter}.png")


def main():
    for style_name, config in STYLE_CONFIGS.items():
        crop_style(style_name, config)
    print(f"Generated glyphs in {OUTPUT_DIR}")


if __name__ == "__main__":
    main()
