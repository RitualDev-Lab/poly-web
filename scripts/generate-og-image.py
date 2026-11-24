#!/usr/bin/env python3
"""
Poly Dynamic OpenGraph Social Card Generator (1200x630)
Generates high-resolution social preview cards for poly.ritualdev.in
"""

from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

ROOT_DIR = Path(__file__).resolve().parent.parent
PUBLIC_DIR = ROOT_DIR / "public"
OG_DIR = PUBLIC_DIR / "og"
OG_DIR.mkdir(parents=True, exist_ok=True)

W, H = 1200, 630

# Load Windows system fonts
FONT_DIR = Path("C:/Windows/Fonts")
font_hero = ImageFont.truetype(str(FONT_DIR / "segoeuib.ttf"), 54)
font_sub = ImageFont.truetype(str(FONT_DIR / "segoeui.ttf"), 26)
font_brand = ImageFont.truetype(str(FONT_DIR / "segoeuib.ttf"), 28)
font_pill = ImageFont.truetype(str(FONT_DIR / "segoeuib.ttf"), 18)
font_code = ImageFont.truetype(str(FONT_DIR / "consolab.ttf"), 22)
font_meta = ImageFont.truetype(str(FONT_DIR / "segoeui.ttf"), 20)

def generate_poly_og():
    img = Image.new("RGB", (W, H), (11, 15, 23)) # #0B0F17
    draw = ImageDraw.Draw(img)

    # Gradient radial glow effects
    draw.ellipse([800, -150, 1350, 380], fill=(14, 116, 144)) # cyan-700
    draw.ellipse([850, -100, 1300, 330], fill=(2, 132, 199)) # sky-600
    draw.ellipse([-150, 250, 450, 850], fill=(99, 102, 241)) # indigo-500

    # Inner Glass Container Card
    draw.rounded_rectangle([30, 30, W - 30, H - 30], radius=24, fill=(15, 23, 42), outline=(30, 41, 59), width=2)

    # Top Brand Bar
    draw.text((70, 65), "⚡ POLY", fill=(56, 189, 248), font=font_brand) # sky-400
    draw.text((205, 68), "• The Polyglot Monorepo Build System", fill=(148, 163, 184), font=font_meta)

    # Live Version Badge (v0.6.2)
    draw.rounded_rectangle([1030, 62, 1130, 98], radius=8, fill=(12, 74, 110), outline=(14, 165, 233), width=1)
    draw.text((1045, 68), "v0.6.2", fill=(56, 189, 248), font=font_pill)

    # Hero Title (2 lines)
    draw.text((70, 150), "One Monorepo Build Tool.", fill=(255, 255, 255), font=font_hero)
    draw.text((70, 218), "Node.js • Python • Rust • Go", fill=(56, 189, 248), font=font_hero)

    # Subtitle
    desc = "High-throughput graph task execution, deterministic composite poly.lock, and distributed cloud caching."
    draw.text((70, 305), desc, fill=(148, 163, 184), font=font_sub)

    # 4 Feature Pills
    pills = [
        ("⚡ 10x Task Cache", (12, 74, 110), (14, 165, 233), (56, 189, 248)),
        ("🔒 Zero-Leak AST Firewall", (30, 27, 75), (99, 102, 241), (165, 180, 252)),
        ("📦 Multi-Registry Distribution", (6, 78, 59), (16, 185, 129), (110, 231, 183)),
        ("☁️ Remote Cloud Storage", (88, 28, 135), (168, 85, 247), (216, 180, 254)),
    ]

    px = 70
    py = 370
    for label, bg, border, text_color in pills:
        pw = len(label) * 11 + 32
        draw.rounded_rectangle([px, py, px + pw, py + 42], radius=10, fill=bg, outline=border, width=1)
        draw.text((px + 16, py + 9), label, fill=text_color, font=font_pill)
        px += pw + 16

    # Terminal Quickstart Command Box
    y_cmd = 455
    draw.rounded_rectangle([70, y_cmd, 1130, y_cmd + 66], radius=14, fill=(2, 6, 23), outline=(51, 65, 85), width=1)
    draw.text((95, y_cmd + 20), "$ curl -fsSL https://poly.ritualdev.in/install.sh | sh", fill=(125, 211, 252), font=font_code)

    # Copy button indicator
    draw.rounded_rectangle([1020, y_cmd + 12, 1115, y_cmd + 54], radius=8, fill=(30, 41, 59), outline=(71, 85, 105), width=1)
    draw.text((1042, y_cmd + 22), "CLI", fill=(203, 213, 225), font=font_pill)

    # Bottom Footer
    draw.text((70, 555), "poly.ritualdev.in • ritualdev.in • MIT License", fill=(100, 116, 139), font=font_meta)

    # Save to both paths
    out_img1 = PUBLIC_DIR / "og-image.png"
    out_img2 = OG_DIR / "default.png"
    img.save(str(out_img1), "PNG", quality=95)
    img.save(str(out_img2), "PNG", quality=95)
    print(f"✔ Successfully generated {out_img1} and {out_img2}")

if __name__ == "__main__":
    generate_poly_og()
