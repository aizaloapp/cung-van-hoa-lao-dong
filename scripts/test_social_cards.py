import os
import re
import sys
import urllib.parse
from pathlib import Path
from PIL import Image

PROJECT_ROOT = Path(r"d:\A-Du-An\Cung-van-hoa-lao-dong")
DOMAIN = "https://cungvanhoalaodong.com"

STOCK_PATTERNS = [
    r"images\.unsplash\.com",
    r"unsplash\.com",
    r"pexels\.com",
    r"pixabay\.com",
    r"shutterstock\.com",
    r"freepik\.com",
    r"placeholder\.com",
    r"via\.placeholder",
]

def run_tests():
    print("=" * 60)
    print("TEST SUITE: KIỂM THỬ THẺ XEM TRƯỚC MẠNG XÃ HỘI (RULE 8)")
    print("=" * 60)
    
    passed_tests = 0
    total_tests = 0
    failures = []

    # Test 1: Check Brand Fallback Image
    total_tests += 1
    brand_img = PROJECT_ROOT / "og-image.jpg"
    if brand_img.exists():
        try:
            with Image.open(brand_img) as im:
                w, h = im.size
                size_kb = brand_img.stat().st_size / 1024
                ratio = w / h
                # Accept 1.91:1 (approx 1.90 - 1.92) or 16:9 (approx 1.77 - 1.78)
                if (1.70 <= ratio <= 1.95) and w >= 1200 and size_kb <= 600:
                    passed_tests += 1
                    print(f"✅ [Rule 8.5] Brand Fallback Image tồn tại chuẩn ({w}x{h}, {size_kb:.1f} KB, ratio {ratio:.2f})")
                else:
                    failures.append(f"[Rule 8.5] Brand image có tỷ lệ hoặc kích thước chưa tối ưu: {w}x{h}, {size_kb:.1f}KB")
        except Exception as e:
            failures.append(f"[Rule 8.5] Lỗi đọc brand image: {e}")
    else:
        failures.append("[Rule 8.5] Chưa tồn tại tệp og-image.jpg tại root dự án")

    # Collect HTML files to test
    # Pages in sitemap + 404.html
    html_files = [
        PROJECT_ROOT / "index.html",
        PROJECT_ROOT / "404.html",
        PROJECT_ROOT / "cho-thue" / "index.html",
    ]
    course_dirs = (PROJECT_ROOT / "lop-hoc").glob("*/index.html")
    html_files.extend(list(course_dirs))

    print(f"\nKiểm tra {len(html_files)} trang HTML chính thức của dự án...\n")

    for html_file in html_files:
        rel_path = str(html_file.relative_to(PROJECT_ROOT)).replace("\\", "/")
        with open(html_file, "r", encoding="utf-8", errors="ignore") as f:
            content = f.read()

        # Check stock patterns
        total_tests += 1
        stock_found = []
        for pat in STOCK_PATTERNS:
            found = re.findall(pat, content, re.IGNORECASE)
            if found:
                stock_found.extend(found)
        if not stock_found:
            passed_tests += 1
        else:
            failures.append(f"[Rule 8.1] {rel_path} chứa link ảnh stock: {stock_found}")

        # Check 4x4 meta tags
        required_og = ["og:type", "og:title", "og:description", "og:url", "og:image"]
        required_tw = ["twitter:card", "twitter:title", "twitter:description", "twitter:image"]
        
        missing_in_file = []
        # Check OG
        for prop in required_og:
            m = re.search(rf'<meta\s+property=["\']{prop}["\']\s+content=["\']([^"\']+)["\']', content, re.IGNORECASE)
            if not m:
                m = re.search(rf'<meta\s+content=["\']([^"\']+)["\']\s+property=["\']{prop}["\']', content, re.IGNORECASE)
            if not m:
                missing_in_file.append(prop)

        # Check Twitter
        for tw in required_tw:
            m = re.search(rf'<meta\s+name=["\']{tw}["\']\s+content=["\']([^"\']+)["\']', content, re.IGNORECASE)
            if not m:
                m = re.search(rf'<meta\s+content=["\']([^"\']+)["\']\s+name=["\']{tw}["\']', content, re.IGNORECASE)
            if not m:
                missing_in_file.append(tw)

        total_tests += 1
        if not missing_in_file:
            passed_tests += 1
        else:
            failures.append(f"[Rule 8.4] {rel_path} thiếu thẻ chuẩn: {missing_in_file}")

        # Check Absolute URLs and Image Existence
        total_tests += 1
        img_match = re.search(r'<meta\s+property=["\']og:image["\']\s+content=["\']([^"\']+)["\']', content, re.IGNORECASE)
        if not img_match:
            img_match = re.search(r'<meta\s+content=["\']([^"\']+)["\']\s+property=["\']og:image["\']', content, re.IGNORECASE)
        
        if img_match:
            img_url = img_match.group(1)
            # Must be absolute
            if not img_url.startswith("https://") or not img_url.startswith(DOMAIN):
                failures.append(f"[Rule 8.2] {rel_path} og:image không phải URL tuyệt đối: {img_url}")
            else:
                # Must exist on disk
                rel_img = urllib.parse.unquote(img_url.replace(DOMAIN, "").lstrip("/"))
                local_file = PROJECT_ROOT / rel_img
                if not local_file.is_file():
                    failures.append(f"[Rule 8.3] {rel_path} og:image trỏ tới file không tồn tại: {rel_img}")
                else:
                    passed_tests += 1
        else:
            failures.append(f"[Rule 8.2/8.3] {rel_path} không tìm thấy thẻ og:image")

    print(f"KẾT QUẢ KIỂM THỬ: {passed_tests}/{total_tests} tiêu chí vượt qua")
    if failures:
        print("\n❌ CÁC LỖI CẦN KHẮC PHỤC:")
        for idx, fail in enumerate(failures, 1):
            print(f"  {idx}. {fail}")
        return False
    else:
        print("\n🎉 CHÚC MỪNG: 100% CÁC TRANG ĐÃ ĐẠT CHUẨN RULE 8 TUYỆT ĐỐI!")
        return True

if __name__ == "__main__":
    success = run_tests()
    sys.exit(0 if success else 1)
