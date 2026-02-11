#!/usr/bin/env python3
"""다솔물환경연구소 PWA 아이콘 생성기"""

from PIL import Image, ImageDraw, ImageFont
import os

# 아이콘 크기들
ICON_SIZES = [72, 96, 128, 144, 152, 192, 384, 512]

# 색상 테마
GRADIENT_START = (102, 126, 234)  # #667eea
GRADIENT_END = (118, 75, 162)     # #764ba2

def create_gradient(width, height, start_color, end_color):
    """그라디언트 배경 생성"""
    base = Image.new('RGB', (width, height), start_color)
    top = Image.new('RGB', (width, height), end_color)
    mask = Image.new('L', (width, height))
    mask_data = []
    
    for y in range(height):
        for x in range(width):
            # 대각선 그라디언트
            progress = (x + y) / (width + height)
            mask_data.append(int(255 * progress))
    
    mask.putdata(mask_data)
    base.paste(top, (0, 0), mask)
    return base

def create_icon(size, output_path):
    """단일 크기 아이콘 생성"""
    print(f"생성 중: {size}x{size} 아이콘...")
    
    # 그라디언트 배경
    img = create_gradient(size, size, GRADIENT_START, GRADIENT_END)
    draw = ImageDraw.Draw(img)
    
    # 물방울 모양 (간단한 원으로 표현)
    margin = size * 0.2
    droplet_size = size - (margin * 2)
    
    # 메인 물방울 (흰색)
    draw.ellipse(
        [margin, margin, size - margin, size - margin],
        fill=(255, 255, 255, 255),
        outline=None
    )
    
    # 중앙에 "DS" 텍스트
    text = "DS"
    font_size = int(size * 0.35)
    
    try:
        # 시스템 폰트 사용
        font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", font_size)
    except:
        # 폰트 없으면 기본 폰트
        font = ImageFont.load_default()
    
    # 텍스트 중앙 정렬
    bbox = draw.textbbox((0, 0), text, font=font)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]
    
    text_x = (size - text_width) / 2 - bbox[0]
    text_y = (size - text_height) / 2 - bbox[1]
    
    # 텍스트 그리기 (보라색)
    draw.text((text_x, text_y), text, fill=(118, 75, 162), font=font)
    
    # 저장
    img.save(output_path, 'PNG', quality=95)
    print(f"✓ 저장 완료: {output_path}")

def main():
    """모든 아이콘 생성"""
    icons_dir = "/home/claude/dasol-approval/icons"
    
    print("=" * 50)
    print("다솔물환경연구소 PWA 아이콘 생성기")
    print("=" * 50)
    
    for size in ICON_SIZES:
        output_path = os.path.join(icons_dir, f"icon-{size}x{size}.png")
        create_icon(size, output_path)
    
    print("\n" + "=" * 50)
    print(f"✓ 모든 아이콘 생성 완료! ({len(ICON_SIZES)}개)")
    print("=" * 50)

if __name__ == "__main__":
    main()
