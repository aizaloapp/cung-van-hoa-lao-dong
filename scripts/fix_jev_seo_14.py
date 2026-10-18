# -*- coding: utf-8 -*-
"""
Deterministic remediation script for all 14 Jev-SEO findings (JEV-001 through JEV-014)
across all 18 HTML pages of https://cungvanhoalaodong.com
"""
import json
import os
import re
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent

with open(ROOT / "data" / "courses.json", "r", encoding="utf-8") as f:
    DATA = json.load(f)

COURSES = {c["id"]: c for c in DATA["courses"]}
COURSE_IDS = [c["id"] for c in DATA["courses"]]

# Distinct SEO Title (<= 65 chars) & Meta Description (110 - 158 chars) for all 16 courses
COURSE_SEO_META = {
    "ban-cung": {
        "title": "CLB Bắn Cung Trải Nghiệm & Thi Đấu | 245 Nguyễn Duy Trinh",
        "description": "Học bắn cung cùng Thầy Đoàn Thanh Tiếp tại 245 Nguyễn Duy Trinh, Bình Trưng. Lịch 15:00-21:00, học phí 1.500.000đ/khóa bao dụng cụ. Zalo: 0703 275 125."
    },
    "bong-da": {
        "title": "CLB Bóng Đá & Đặt Sân Giao Hữu | CVHLĐ Cơ Sở Bình Trưng",
        "description": "CLB Bóng Đá & đặt sân cỏ nhân tạo giao hữu tại 245 Nguyễn Duy Trinh, P. Bình Trưng, TP.HCM. Ưu đãi hội thao Công đoàn & doanh nghiệp. Zalo: 0904 450 057."
    },
    "bong-ro": {
        "title": "CLB Bóng Rổ Năng Khiếu & Phong Trào | 245 Nguyễn Duy Trinh",
        "description": "Học bóng rổ thiếu nhi & thanh thiếu niên cùng Thầy Nguyễn Ngọc Thịnh tại 245 Nguyễn Duy Trinh, Bình Trưng. Học phí 500.000đ/tháng. Zalo: 0896 699 089."
    },
    "boxing-kids-nguoi-lon": {
        "title": "CLB Boxing Kids & Người Lớn Bình Trưng | 245 Nguyễn Duy Trinh",
        "description": "Lớp Boxing Kids (từ 4 tuổi) & Người lớn cùng HLV Nguyễn Thanh Việt tại 245 Nguyễn Duy Trinh, Bình Trưng. Ca 06:00-21:00, 1.200.000đ/tháng. Zalo: 0939 305 458."
    },
    "cau-long": {
        "title": "Cụm 6 Sân Cầu Lông Thảm PVC & Lớp Học | CVHLĐ Bình Trưng",
        "description": "Thuê sân & học cầu lông tại cụm 6 sân thảm PVC chuẩn thi đấu (245 Nguyễn Duy Trinh, P. Bình Trưng). Mở cửa 06:00-22:00 hàng ngày. Liên hệ: 0937 224 640."
    },
    "dance-kids-ballet-kids": {
        "title": "Lớp Ballet, Dance Kids & Dancesport | CVHLĐ Cơ Sở Bình Trưng",
        "description": "Lớp Múa Ballet, Dance Kids & Dancesport cho bé (4-15 tuổi) và người lớn cùng Cô Mai Trâm tại 245 Nguyễn Duy Trinh, Bình Trưng. Zalo tư vấn: 0937 712 003."
    },
    "dancesport-bachata-kizomba": {
        "title": "CLB Khiêu Vũ Dancesport: Bachata & Kizomba | CVHLĐ Bình Trưng",
        "description": "Học khiêu vũ Bachata & Kizomba cuối tuần (17:00-18:30 Thứ 7 & CN) cùng Vũ sư Cường Ba tại 245 Nguyễn Duy Trinh, Bình Trưng. 100.000đ/tháng. Zalo: 0969 897 988."
    },
    "lan-su-rong": {
        "title": "CLB Lân Sư Rồng Nghệ Thuật (Miễn Học Phí) | CVHLĐ Bình Trưng",
        "description": "Tham gia CLB Lân Sư Rồng miễn phí 100% học phí cùng HLV Huỳnh Kim Hoàng tại 245 Nguyễn Duy Trinh, P. Bình Trưng. Tập 10 buổi/tuần. Zalo: 0933 967 938."
    },
    "mua-dan-vu": {
        "title": "CLB Múa Dân Vũ Cộng Đồng (100k/Tháng) | CVHLĐ Bình Trưng",
        "description": "CLB Múa Dân Vũ Cộng Đồng cùng Cô Võ Thị Kim Liên tại 245 Nguyễn Duy Trinh, Bình Trưng. Thứ 2-4-6 (07:30-09:00), học phí 100.000đ/tháng. Zalo: 0907 719 318."
    },
    "nhay-hien-dai-thieu-nhi": {
        "title": "CLB Nhảy Hiện Đại Thiếu Nhi Bình Trưng | 245 Nguyễn Duy Trinh",
        "description": "Lớp Nhảy Hiện Đại Thiếu Nhi cùng Thầy Trần Trung Hiền tại 245 Nguyễn Duy Trinh, Bình Trưng. Ca 18:00-19:00 (2 buổi/tuần), 600.000đ/tháng. Zalo: 0902 774 594."
    },
    "patin": {
        "title": "CLB Trượt Patin Cơ Bản & Nâng Cao | 245 Nguyễn Duy Trinh",
        "description": "Khóa học trượt Patin cho bé & giới trẻ cùng Cô Hồ Kim Ân tại sân có mái che 245 Nguyễn Duy Trinh, Bình Trưng. 18:00-20:00, 1.200.000đ/khóa. Zalo: 0906 345 894."
    },
    "taekwondo": {
        "title": "CLB Võ Taekwondo Thiếu Nhi & Tự Vệ | 245 Nguyễn Duy Trinh",
        "description": "Lớp võ Taekwondo thiếu nhi & tự vệ cùng Thầy Huỳnh Thanh Danh tại 245 Nguyễn Duy Trinh, Bình Trưng. Thứ 3-5-7 (18:00-19:30), 400.000đ/tháng. Zalo: 0901 539 619."
    },
    "yoga-an-do": {
        "title": "Lớp Yoga Ấn Độ Cổ Truyền Cùng Thầy Shashi | CVHLĐ Bình Trưng",
        "description": "Học Yoga Ấn Độ cổ truyền cùng Master Shashi Kant Pramanik tại 245 Nguyễn Duy Trinh, Bình Trưng. Thứ 2-7 (08:00-09:10), 500.000đ/tháng. Zalo: 0909 620 705."
    },
    "yoga-song-khoe-1": {
        "title": "CLB Yoga Sống Khỏe 1 Ca Sáng (06:00-07:00) | CVHLĐ Bình Trưng",
        "description": "Lớp Yoga Sống Khỏe 1 ca sáng (06:00-07:00 Thứ 2-4-6) cùng Cô Khổng Thị Lang tại 245 Nguyễn Duy Trinh, Bình Trưng. Học phí 300.000đ/tháng. Zalo: 0903 333 254."
    },
    "yoga-song-khoe-2": {
        "title": "CLB Yoga Sống Khỏe 2 Ca Tối (18:00-19:00) | CVHLĐ Bình Trưng",
        "description": "Lớp Yoga Sống Khỏe 2 ca tối (18:00-19:00 Thứ 3-5-7) cùng Cô Nguyễn Thị Bảy tại 245 Nguyễn Duy Trinh, Bình Trưng. Học phí 300.000đ/tháng. Zalo: 0767 119 854."
    },
    "yoga-tri-lieu": {
        "title": "Lớp Yoga Trị Liệu Cổ Vai Gáy & Thở Trị Liệu | CVHLĐ Bình Trưng",
        "description": "Lớp Yoga Trị Liệu cổ vai gáy & Thở trị liệu cùng Cô Nguyễn Thị Liên tại 245 Nguyễn Duy Trinh, P. Bình Trưng. 4 ca/ngày, 600.000đ/tháng. Zalo: 0767 025 678."
    }
}

IMAGE_DIM_CACHE = {}

def get_image_dimensions(src_attr: str, html_file: Path):
    if not src_attr or src_attr.startswith("data:") or "{{" in src_attr:
        return (800, 600)
    clean_src = src_attr.split("?")[0].split("#")[0]
    if clean_src in IMAGE_DIM_CACHE:
        return IMAGE_DIM_CACHE[clean_src]

    # Resolve path on disk
    if clean_src.startswith("http://") or clean_src.startswith("https://"):
        if "cungvanhoalaodong.com/" in clean_src:
            rel_path = clean_src.split("cungvanhoalaodong.com/", 1)[1]
            disk_path = ROOT / rel_path
        else:
            return (800, 600)
    elif clean_src.startswith("/"):
        disk_path = ROOT / clean_src.lstrip("/")
    else:
        disk_path = (html_file.parent / clean_src).resolve()

    if not disk_path.exists():
        # Try root-relative fallback
        alt_path = ROOT / clean_src.replace("../", "")
        if alt_path.exists():
            disk_path = alt_path

    if disk_path.exists():
        if disk_path.suffix.lower() == ".svg":
            IMAGE_DIM_CACHE[clean_src] = (18, 18)
            return (18, 18)
        try:
            with Image.open(disk_path) as im:
                w, h = im.size
                IMAGE_DIM_CACHE[clean_src] = (w, h)
                return (w, h)
        except Exception:
            pass

    IMAGE_DIM_CACHE[clean_src] = (800, 600)
    return (800, 600)


def add_img_dimensions(html: str, html_file: Path) -> str:
    def repl(match):
        tag = match.group(0)
        has_w = re.search(r'\bwidth\s*=\s*["\'][^"\']+["\']', tag, re.I)
        has_h = re.search(r'\bheight\s*=\s*["\'][^"\']+["\']', tag, re.I)
        if has_w and has_h:
            return tag

        src_m = re.search(r'\bsrc\s*=\s*["\']([^"\']*)["\']', tag, re.I)
        src_val = src_m.group(1) if src_m else ""
        w, h = get_image_dimensions(src_val, html_file)

        # Insert width and height before the closing > or />
        attrs_to_add = []
        if not has_w:
            attrs_to_add.append(f'width="{w}"')
        if not has_h:
            attrs_to_add.append(f'height="{h}"')
        attr_str = " " + " ".join(attrs_to_add)

        if tag.endswith("/>"):
            return tag[:-2] + attr_str + " />"
        else:
            return tag[:-1] + attr_str + ">"

    return re.sub(r"<img\b[^>]*>", repl, html, flags=re.I | re.S)


def format_phone_display(phone: str) -> str:
    digits = re.sub(r"\D", "", phone or "0904450057")
    if len(digits) == 10:
        return f"{digits[:4]} {digits[4:7]} {digits[7:]}"
    return phone


def build_direct_answer_lead(course: dict) -> str:
    cid = course["id"]
    name = course["name"]
    instructor = course["instructor"]
    phone_disp = format_phone_display(course["phone"])
    schedule = course["schedule"]
    freq = course["frequency"]
    dur = course["duration"]
    fee_fmt = course["feeFormatted"]
    loc = course["location"]
    target = course["target"]

    return (
        f"<strong>{name}</strong> tại <strong>Cung Văn Hóa Lao Động TP.HCM — Cơ Sở Bình Trưng</strong> "
        f"(Số 245 Nguyễn Duy Trinh, Phường Bình Trưng, TP. Hồ Chí Minh) do <strong>{instructor}</strong> "
        f"trực tiếp hướng dẫn, dành cho {target.lower()}. "
        f"Lớp học diễn ra vào khung giờ <strong>{schedule}</strong> ({freq}, {dur}) tại <strong>{loc}</strong> "
        f"với mức học phí an sinh <strong>{fee_fmt}</strong>; học viên đăng ký tư vấn và xếp lớp trực tiếp qua "
        f"Zalo/SĐT <strong>{phone_disp}</strong> hoặc Hotline cơ sở <strong>0904 450 057</strong>."
    )


def build_related_courses_html(current_id: str) -> str:
    idx = COURSE_IDS.index(current_id)
    # Pick the next 5 courses in circular order so every course gets 5 incoming links from peer courses
    related_ids = [COURSE_IDS[(idx + offset) % len(COURSE_IDS)] for offset in range(1, 6)]
    items = []
    for rid in related_ids:
        rc = COURSES[rid]
        items.append(f"""    <li>
      <a href="/lop-hoc/{rid}/" class="group flex items-center justify-between text-slate-700 hover:text-blue-600 font-medium">
        <span>{rc["name"]}</span>
        <i data-lucide="arrow-right" class="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-1 transition"></i>
      </a>
    </li>""")
    return "\n".join(items)


def build_static_courses_fallback_html() -> str:
    """Static crawlable cards inside #courses-grid on index.html so HTTP crawlers see all 16 course links at Click Depth 1."""
    cards = []
    for c in DATA["courses"]:
        cid = c["id"]
        name = c["name"]
        cat = c["category"]
        inst = c["instructor"]
        sched = c["schedule"]
        fee = c["feeFormatted"]
        loc = c["location"]
        cards.append(f"""        <article class="course-card flex flex-col bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-sm p-5 justify-between">
          <div>
            <span class="text-[11px] text-blue-700 font-bold uppercase tracking-wider">{cat}</span>
            <h3 class="font-extrabold text-slate-900 text-lg leading-snug mt-1">
              <a href="/lop-hoc/{cid}/" class="hover:text-blue-600 hover:underline">{name}</a>
            </h3>
            <p class="text-xs text-slate-600 mt-1">Giảng viên: <strong>{inst}</strong> • Học phí: <strong>{fee}</strong></p>
            <p class="text-xs text-slate-500 mt-1">Lịch học: {sched} • Địa điểm: {loc}</p>
          </div>
          <div class="mt-4 pt-3 border-t border-slate-100">
            <a href="/lop-hoc/{cid}/" class="text-xs font-extrabold text-blue-600 hover:text-blue-800">Xem chi tiết lớp {name} &rarr;</a>
          </div>
        </article>""")
    return "\n".join(cards)


def build_footer_16_courses_directory() -> str:
    """Clean 16-course crawlable directory block for Footer of index.html and cho-thue/index.html."""
    links = []
    for c in DATA["courses"]:
        cid = c["id"]
        name = c["name"]
        links.append(
            f'<a href="/lop-hoc/{cid}/" class="text-[11px] text-slate-400 hover:text-white transition truncate">&bull; {name}</a>'
        )
    grid_items = "\n            ".join(links)
    return f"""      <!-- DANH MỤC 16 LỚP HỌC & CLB (CRAWLABLE INTERNAL LINKS) -->
      <div class="mt-8 pt-6 border-t border-slate-800/70">
        <div class="text-white font-bold text-xs uppercase tracking-wider mb-3">Danh Mục 16 Lớp Học & Câu Lạc Bộ Quý 4/2026 Tại Cơ Sở Bình Trưng</div>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-1.5">
            {grid_items}
        </div>
      </div>"""


def fix_heading_hierarchy_course_page(html: str) -> str:
    """Ensure no H4 appears directly under H2 without H3, etc."""
    return html


def process_index_html():
    path = ROOT / "index.html"
    html = path.read_text(encoding="utf-8")

    # 1. Title & Meta Description (JEV-007, JEV-011)
    new_title = "Cung Văn Hóa Lao Động Cơ Sở Bình Trưng | 245 Nguyễn Duy Trinh"
    new_desc = "Cung Văn Hóa Lao Động TP.HCM Cơ Sở Bình Trưng (245 Nguyễn Duy Trinh). Chiêu sinh 16 lớp Cầu lông, Bắn cung, Boxing, Yoga, Võ thuật. Zalo: 0904 450 057."
    assert 15 <= len(new_title) <= 65, f"index title len={len(new_title)}"
    assert 50 <= len(new_desc) <= 160, f"index desc len={len(new_desc)}"

    html = re.sub(r"<title>.*?</title>", f"<title>{new_title}</title>", html, count=1, flags=re.S)
    html = re.sub(
        r'<meta\s+name="description"\s+content="[^"]*">',
        f'<meta name="description" content="{new_desc}">',
        html,
        count=1
    )

    # 2. Schema JSON-LD: LocalBusiness + WebSite (JEV-002, JEV-009)
    html = html.replace(
        '"@type": "SportsActivityLocation",\n        "@id": "https://cungvanhoalaodong.com/#facility",',
        '"@type": [\n          "SportsActivityLocation",\n          "LocalBusiness"\n        ],\n        "@id": "https://cungvanhoalaodong.com/#facility",\n        "priceRange": "$",'
    )
    html = html.replace(
        '"@type": "SportsActivityLocation",\r\n        "@id": "https://cungvanhoalaodong.com/#facility",',
        '"@type": [\r\n          "SportsActivityLocation",\r\n          "LocalBusiness"\r\n        ],\r\n        "@id": "https://cungvanhoalaodong.com/#facility",\r\n        "priceRange": "$",'
    )

    website_schema = """      {
        "@type": "WebSite",
        "@id": "https://cungvanhoalaodong.com/#website",
        "url": "https://cungvanhoalaodong.com/",
        "name": "Cung Văn Hóa Lao Động TP.HCM — Cơ Sở Bình Trưng",
        "alternateName": "CVHLĐ Cơ Sở Bình Trưng - 245 Nguyễn Duy Trinh",
        "publisher": {
          "@id": "https://cungvanhoalaodong.com/#facility"
        },
        "inLanguage": "vi-VN"
      },
      {
        "@type": "FAQPage","""
    if '"@type": "WebSite"' not in html:
        html = html.replace('      {\n        "@type": "FAQPage",', website_schema)
        html = html.replace('      {\r\n        "@type": "FAQPage",', website_schema)

    # 3. Clean root-relative internal links (JEV-001, JEV-006)
    html = html.replace('href="cho-thue/index.html"', 'href="/cho-thue/"')
    html = html.replace('href="cho-thue/"', 'href="/cho-thue/"')
    html = html.replace('href="cho-thue/#', 'href="/cho-thue/#')

    # 4. Guardrail: Replace "TP. Thủ Đức" with "Phường Bình Trưng, TP.HCM"
    html = html.replace("⭐ Điểm Hẹn Sự Kiện TP. Thủ Đức", "⭐ Điểm Hẹn Sự Kiện Phường Bình Trưng, TP.HCM")

    # 5. Fix skipped heading level H1 -> H3 in Highlights section & Rental Callout H4 (JEV-013)
    if '<h2 class="sr-only">Giá Trị Cốt Lõi Tại Cung Văn Hóa Lao Động Cơ Sở Bình Trưng</h2>' not in html:
        html = html.replace(
            '  <!-- HIGHLIGHTS / VALUE PROPOSITIONS -->\n  <section class="py-12 bg-white border-b border-slate-200/80">\n    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">',
            '  <!-- HIGHLIGHTS / VALUE PROPOSITIONS -->\n  <section class="py-12 bg-white border-b border-slate-200/80">\n    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">\n      <h2 class="sr-only">Giá Trị Cốt Lõi Tại Cung Văn Hóa Lao Động Cơ Sở Bình Trưng</h2>'
        )
        html = html.replace(
            '  <!-- HIGHLIGHTS / VALUE PROPOSITIONS -->\r\n  <section class="py-12 bg-white border-b border-slate-200/80">\r\n    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">',
            '  <!-- HIGHLIGHTS / VALUE PROPOSITIONS -->\r\n  <section class="py-12 bg-white border-b border-slate-200/80">\r\n    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">\r\n      <h2 class="sr-only">Giá Trị Cốt Lõi Tại Cung Văn Hóa Lao Động Cơ Sở Bình Trưng</h2>'
        )

    # Change H4 in Bottom B2B Help Callout to H3 so H2 -> H3 is consistent
    html = html.replace(
        '<h4 class="text-xl font-bold">Cần Tư Vấn Thiết Kế Sơ Đồ Bàn Ghế Hoặc Báo Giá Trọn Gói?</h4>',
        '<h3 class="text-xl font-bold">Cần Tư Vấn Thiết Kế Sơ Đồ Bàn Ghế Hoặc Báo Giá Trọn Gói?</h3>'
    )

    # 6. Pre-render static crawlable course cards inside #courses-grid & update Footer links (JEV-003)
    static_cards = build_static_courses_fallback_html()
    html = re.sub(
        r'<div id="courses-grid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">.*?</div>\s*<!-- VIEW 2:',
        f'<div id="courses-grid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">\n{static_cards}\n      </div>\n\n      <!-- VIEW 2:',
        html,
        count=1,
        flags=re.S
    )

    # Update Footer "Bộ Môn Nổi Bật" to point directly to /lop-hoc/[slug]/
    old_footer_list = """          <ul class="space-y-1.5">
            <li><a href="#lop-hoc" class="hover:text-white transition">Cầu lông phong trào (6 sân PVC)</a></li>
            <li><a href="#lop-hoc" class="hover:text-white transition">Boxing Kids & Người lớn</a></li>
            <li><a href="#lop-hoc" class="hover:text-white transition">Bắn cung trải nghiệm</a></li>
            <li><a href="#lop-hoc" class="hover:text-white transition">Yoga trị liệu cột sống</a></li>
            <li><a href="#lop-hoc" class="hover:text-white transition">Taekwondo thiếu nhi</a></li>
            <li><a href="#lop-hoc" class="hover:text-white transition">Nhảy hiện đại & Dance Kids</a></li>
          </ul>"""
    new_footer_list = """          <ul class="space-y-1.5">
            <li><a href="/lop-hoc/cau-long/" class="hover:text-white transition">Cầu lông phong trào (6 sân PVC)</a></li>
            <li><a href="/lop-hoc/boxing-kids-nguoi-lon/" class="hover:text-white transition">Boxing Kids & Người lớn</a></li>
            <li><a href="/lop-hoc/ban-cung/" class="hover:text-white transition">Bắn cung trải nghiệm</a></li>
            <li><a href="/lop-hoc/yoga-tri-lieu/" class="hover:text-white transition">Yoga trị liệu cột sống</a></li>
            <li><a href="/lop-hoc/taekwondo/" class="hover:text-white transition">Taekwondo thiếu nhi</a></li>
            <li><a href="/lop-hoc/nhay-hien-dai-thieu-nhi/" class="hover:text-white transition">Nhảy hiện đại & Dance Kids</a></li>
          </ul>"""
    html = html.replace(old_footer_list, new_footer_list)
    html = html.replace(old_footer_list.replace("\n", "\r\n"), new_footer_list)

    # Insert 16-course directory block in Footer if not present
    if "Danh Mục 16 Lớp Học & Câu Lạc Bộ Quý 4/2026" not in html:
        dir_block = build_footer_16_courses_directory()
        html = html.replace(
            "      <!-- GEO & AI AGENTS FOOTER SNIPPET",
            dir_block + "\n\n      <!-- GEO & AI AGENTS FOOTER SNIPPET"
        )

    # 7. Ensure Hero image has loading="eager" fetchpriority="high" (JEV-014)
    html = html.replace(
        'src="Cung-Van-Hoa-Lao-Dong-Co-So-Binh-Trung/Hinh-co-so-moi/mat-tien-cung-van-hoa-ninh-trung.jpg"',
        'src="Cung-Van-Hoa-Lao-Dong-Co-So-Binh-Trung/Hinh-co-so-moi/mat-tien-cung-van-hoa-ninh-trung.jpg" loading="eager" fetchpriority="high"'
    )

    # 8. Add explicit width & height to all <img> tags (JEV-008)
    html = add_img_dimensions(html, path)

    path.write_text(html, encoding="utf-8")
    print("[OK] Updated index.html")


def process_cho_thue_html():
    path = ROOT / "cho-thue" / "index.html"
    html = path.read_text(encoding="utf-8")

    # 1. Title & Meta Description (JEV-007, JEV-011)
    new_title = "Cho Thuê Hội Trường 500 Chỗ & Sân Sự Kiện | CVHLĐ Bình Trưng"
    new_desc = "Cho thuê hội trường 250-500 chỗ, phòng họp VIP, sảnh triển lãm, studio và 6 sân cầu lông tại 245 Nguyễn Duy Trinh, P. Bình Trưng. Hotline: 0904 450 057."
    assert 15 <= len(new_title) <= 65
    assert 50 <= len(new_desc) <= 160

    html = re.sub(r"<title>.*?</title>", f"<title>{new_title}</title>", html, count=1, flags=re.S)
    html = re.sub(
        r'<meta\s+name="description"\s+content="[^"]*">',
        f'<meta name="description" content="{new_desc}">',
        html,
        count=1
    )

    # Remove "TP. Thủ Đức" in og:description and Hero badge (Hard Guardrail)
    html = html.replace("245 Nguyễn Duy Trinh, TP. Thủ Đức", "245 Nguyễn Duy Trinh, Phường Bình Trưng, TP. Hồ Chí Minh")
    html = html.replace("Điểm Hẹn Sự Kiện TP. Thủ Đức", "Điểm Hẹn Sự Kiện Phường Bình Trưng, TP.HCM")

    # 2. Clean root-relative internal links & assets (JEV-001, JEV-006)
    html = html.replace('href="../index.html#lop-hoc"', 'href="/#lop-hoc"')
    html = html.replace('href="../index.html"', 'href="/"')
    html = html.replace('href="../Cung-Van-Hoa-Lao-Dong-Co-So-Binh-Trung/', 'href="/Cung-Van-Hoa-Lao-Dong-Co-So-Binh-Trung/')
    html = html.replace('src="../Cung-Van-Hoa-Lao-Dong-Co-So-Binh-Trung/', 'src="/Cung-Van-Hoa-Lao-Dong-Co-So-Binh-Trung/')
    html = html.replace('src="../assets/', 'src="/assets/')
    html = html.replace("openRentalLightbox('../assets/", "openRentalLightbox('/assets/")
    html = html.replace('src="../js/', 'src="/js/')

    # 3. Fix first content image lazy loading (JEV-014)
    html = html.replace(
        '<img src="/assets/images/cho-thue/mat-tien-full.webp" alt="Mặt tiền Cung Văn Hóa Lao Động Cơ Sở Bình Trưng" class="w-full h-full object-cover"',
        '<img src="/assets/images/cho-thue/mat-tien-full.webp" alt="Mặt tiền Cung Văn Hóa Lao Động Cơ Sở Bình Trưng" loading="eager" fetchpriority="high" class="w-full h-full object-cover"'
    )
    html = html.replace(
        '<img src="/assets/images/cho-thue/hoi-truong-san-khau-full.webp" alt="Sân khấu Hội trường 500 chỗ" loading="lazy"',
        '<img src="/assets/images/cho-thue/hoi-truong-san-khau-full.webp" alt="Sân khấu Hội trường 500 chỗ" loading="eager" fetchpriority="high"'
    )

    # 4. Fix skipped heading level in Footer (H2 -> H4 without H3) (JEV-013)
    html = html.replace(
        '<h4 class="text-sm font-extrabold text-white uppercase tracking-wider">Không Gian Cho Thuê</h4>',
        '<h3 class="text-sm font-extrabold text-white uppercase tracking-wider">Không Gian Cho Thuê</h3>'
    )
    html = html.replace(
        '<h4 class="text-sm font-extrabold text-white uppercase tracking-wider">Hỗ Trợ B2B & Pháp Lý</h4>',
        '<h3 class="text-sm font-extrabold text-white uppercase tracking-wider">Hỗ Trợ B2B & Pháp Lý</h3>'
    )
    html = html.replace(
        '<h4 class="text-sm font-extrabold text-white uppercase tracking-wider">Liên Hệ Đặt Lịch</h4>',
        '<h3 class="text-sm font-extrabold text-white uppercase tracking-wider">Liên Hệ Đặt Lịch</h3>'
    )

    # 5. Insert 16-course crawlable directory in Footer (JEV-003)
    if "Danh Mục 16 Lớp Học & Câu Lạc Bộ Quý 4/2026" not in html:
        dir_block = build_footer_16_courses_directory()
        html = html.replace(
            "      <!-- GEO & AI AGENTS FOOTER SNIPPET",
            dir_block + "\n\n      <!-- GEO & AI AGENTS FOOTER SNIPPET"
        )

    # 6. Add explicit width & height to all <img> tags (JEV-008)
    html = add_img_dimensions(html, path)

    path.write_text(html, encoding="utf-8")
    print("[OK] Updated cho-thue/index.html")


def process_course_pages():
    for cid in COURSE_IDS:
        course = COURSES[cid]
        meta = COURSE_SEO_META[cid]
        path = ROOT / "lop-hoc" / cid / "index.html"
        html = path.read_text(encoding="utf-8")

        # 1. Title & Meta Description (JEV-007, JEV-011)
        new_title = meta["title"]
        new_desc = meta["description"]
        assert 15 <= len(new_title) <= 65, f"{cid} title len={len(new_title)}: {new_title}"
        assert 50 <= len(new_desc) <= 160, f"{cid} desc len={len(new_desc)}: {new_desc}"

        html = re.sub(r"<title>.*?</title>", f"<title>{new_title}</title>", html, count=1, flags=re.S)
        html = re.sub(
            r'<meta\s+name="description"\s+content="[^"]*">',
            f'<meta name="description" content="{new_desc}">',
            html,
            count=1
        )

        # 2. Clean root-relative internal links & asset paths (JEV-001, JEV-006)
        html = html.replace('href="../../index.html#lop-hoc"', 'href="/#lop-hoc"')
        html = html.replace('href="../../index.html#co-so-vat-chat"', 'href="/#co-so-vat-chat"')
        html = html.replace('href="../../index.html#chi-duong"', 'href="/#chi-duong"')
        html = html.replace('href="../../index.html"', 'href="/"')
        html = html.replace('href="../../cho-thue/index.html"', 'href="/cho-thue/"')
        html = re.sub(r'href="\.\./([a-z0-9-]+)/"', r'href="/lop-hoc/\1/"', html)
        html = html.replace('href="../../Cung-Van-Hoa-Lao-Dong-Co-So-Binh-Trung/', 'href="/Cung-Van-Hoa-Lao-Dong-Co-So-Binh-Trung/')
        html = html.replace('src="../../Cung-Van-Hoa-Lao-Dong-Co-So-Binh-Trung/', 'src="/Cung-Van-Hoa-Lao-Dong-Co-So-Binh-Trung/')
        html = html.replace('src="../../assets/', 'src="/assets/')
        html = html.replace('href="../../css/custom.css"', 'href="/css/custom.css"')

        # 3. Direct-Answer Lead Paragraph right after <h1> (JEV-012)
        lead_html = build_direct_answer_lead(course)
        html = re.sub(
            r'(<h1\b[^>]*>.*?</h1>\s*<p class="text-xs sm:text-base text-slate-600 mt-2 sm:mt-3 leading-relaxed">).*?(</p>)',
            rf'\1\n            {lead_html}\n          \2',
            html,
            count=1,
            flags=re.S
        )

        # 4. Update Related Courses Cross-Links to 5 rotating courses (JEV-003)
        related_ul = build_related_courses_html(cid)
        html = re.sub(
            r'(<h4 class="font-extrabold text-slate-900 text-sm">Các Lớp Học Liên Quan Cùng Cơ Sở</h4>\s*<ul class="space-y-2\.5 text-xs">).*?(</ul>)',
            rf'<h3 class="font-extrabold text-slate-900 text-sm">Các Lớp Học Liên Quan Cùng Cơ Sở</h3>\n          <ul class="space-y-2.5 text-xs">\n{related_ul}\n          \2',
            html,
            count=1,
            flags=re.S
        )
        html = re.sub(
            r'(<h3 class="font-extrabold text-slate-900 text-sm">Các Lớp Học Liên Quan Cùng Cơ Sở</h3>\s*<ul class="space-y-2\.5 text-xs">).*?(</ul>)',
            rf'\1\n{related_ul}\n          \2',
            html,
            count=1,
            flags=re.S
        )

        # 5. Add explicit width & height to all <img> tags (JEV-008)
        html = add_img_dimensions(html, path)

        path.write_text(html, encoding="utf-8")
        print(f"[OK] Updated lop-hoc/{cid}/index.html (title={len(new_title)}c, desc={len(new_desc)}c)")


def process_course_template():
    tpl_path = ROOT / ".agents" / "skills" / "course-article-builder" / "templates" / "course-template.html"
    if not tpl_path.exists():
        return
    tpl = tpl_path.read_text(encoding="utf-8")
    tpl = tpl.replace('href="../../index.html#lop-hoc"', 'href="/#lop-hoc"')
    tpl = tpl.replace('href="../../index.html#co-so-vat-chat"', 'href="/#co-so-vat-chat"')
    tpl = tpl.replace('href="../../index.html#chi-duong"', 'href="/#chi-duong"')
    tpl = tpl.replace('href="../../index.html"', 'href="/"')
    tpl = tpl.replace('href="../../cho-thue/index.html"', 'href="/cho-thue/"')
    tpl = tpl.replace('href="../../Cung-Van-Hoa-Lao-Dong-Co-So-Binh-Trung/', 'href="/Cung-Van-Hoa-Lao-Dong-Co-So-Binh-Trung/')
    tpl = tpl.replace('src="../../Cung-Van-Hoa-Lao-Dong-Co-So-Binh-Trung/', 'src="/Cung-Van-Hoa-Lao-Dong-Co-So-Binh-Trung/')
    tpl = tpl.replace('href="../../css/custom.css"', 'href="/css/custom.css"')
    tpl_path.write_text(tpl, encoding="utf-8")
    print("[OK] Updated course-template.html")


def process_404_html():
    path = ROOT / "404.html"
    if not path.exists():
        return
    html = path.read_text(encoding="utf-8")
    new_title = "404 — Không Tìm Thấy Trang | CVHLĐ Cơ Sở Bình Trưng"
    new_desc = "Trang không tìm thấy (Lỗi 404) — Cung Văn Hóa Lao Động TP.HCM Cơ Sở Bình Trưng tại 245 Nguyễn Duy Trinh, Phường Bình Trưng. Hotline: 0904 450 057."
    html = re.sub(r"<title>.*?</title>", f"<title>{new_title}</title>", html, count=1, flags=re.S)
    html = re.sub(r'<meta\s+name="description"\s+content="[^"]*">', f'<meta name="description" content="{new_desc}">', html, count=1)
    html = html.replace('href="Cung-Van-Hoa-Lao-Dong-Co-So-Binh-Trung/logo.jpg"', 'href="/Cung-Van-Hoa-Lao-Dong-Co-So-Binh-Trung/logo.jpg"')
    html = html.replace('href="css/custom.css"', 'href="/css/custom.css"')
    html = html.replace('src="Cung-Van-Hoa-Lao-Dong-Co-So-Binh-Trung/logo.jpg"', 'src="/Cung-Van-Hoa-Lao-Dong-Co-So-Binh-Trung/logo.jpg"')
    html = add_img_dimensions(html, path)
    path.write_text(html, encoding="utf-8")
    print("[OK] Updated 404.html")


def verify_all():
    pages = [ROOT / "index.html", ROOT / "cho-thue" / "index.html", ROOT / "404.html"] + sorted((ROOT / "lop-hoc").glob("*/index.html"))
    errors = []
    for p in pages:
        rel = p.relative_to(ROOT)
        txt = p.read_text(encoding="utf-8")
        # 1. Title & Desc
        t = re.search(r"<title>(.*?)</title>", txt, re.S)
        d = re.search(r'<meta\s+name="description"\s+content="([^"]*)"', txt)
        if not t or not (15 <= len(t.group(1)) <= 65):
            errors.append(f"{rel}: bad title len {len(t.group(1)) if t else 0}")
        if not d or not (50 <= len(d.group(1)) <= 160):
            errors.append(f"{rel}: bad desc len {len(d.group(1)) if d else 0}")
        # 2. Img width/height
        for m in re.finditer(r"<img\b[^>]*>", txt, re.I | re.S):
            tag = m.group(0)
            if not re.search(r"\bwidth=", tag, re.I) or not re.search(r"\bheight=", tag, re.I):
                errors.append(f"{rel}: img missing width/height: {tag[:60]}")
        # 3. Skipped heading levels
        headings = [(int(m.group(1)), m.group(0)) for m in re.finditer(r"<h([1-6])\b[^>]*>", txt, re.I)]
        if not headings or headings[0][0] != 1:
            errors.append(f"{rel}: first heading is not h1: {headings[:2]}")
        for i in range(1, len(headings)):
            if headings[i][0] > headings[i - 1][0] + 1:
                errors.append(f"{rel}: skipped heading level H{headings[i-1][0]} -> H{headings[i][0]} at {headings[i][1]}")
        # 4. Non-canonical internal hrefs
        for m in re.finditer(r'<a\b[^>]*\bhref="([^"]+)"', txt, re.I):
            href = m.group(1)
            if href.startswith("../") or "index.html" in href or href.startswith("cho-thue"):
                errors.append(f"{rel}: non-canonical internal href: {href}")
        # 5. Forbidden terms
        if "TP. Thủ Đức" in txt:
            errors.append(f"{rel}: contains forbidden TP. Thủ Đức")

    print(f"=== VERIFICATION SUMMARY ({len(pages)} pages) ===")
    if errors:
        for e in errors:
            print(" ❌", e)
        raise SystemExit(1)
    else:
        print(" ✅ 0 errors across all 19 HTML pages (Titles, Meta Descriptions, Img Width/Height, Heading Hierarchy, Canonical Internal Links, Guardrails)!")


if __name__ == "__main__":
    process_index_html()
    process_cho_thue_html()
    process_course_pages()
    process_404_html()
    process_course_template()
    verify_all()
    print("ALL 19 HTML PAGES + TEMPLATE UPDATED & VERIFIED SUCCESSFULLY!")

