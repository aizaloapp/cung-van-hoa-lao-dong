import os
from pathlib import Path

PROJECT_ROOT = Path(r"d:\A-Du-An\Cung-van-hoa-lao-dong")

STANDARD_SNIPPET = (
    '  <!-- Traks Web Analytics -->\n'
    '  <script>window.traks=window.traks||function(){(window.traks.q=window.traks.q||[]).push(arguments)}</script>'
    '<script defer data-site="pb_live_zirw1qdt9k2j4k8me578e12w" src="https://traks-collect.dragonfarm2509.workers.dev/t.js"></script>\n'
)

NOT_FOUND_SNIPPET = (
    '  <!-- Traks Web Analytics -->\n'
    '  <script>window.traks=window.traks||function(){(window.traks.q=window.traks.q||[]).push(arguments)}</script>'
    '<script defer data-site="pb_live_zirw1qdt9k2j4k8me578e12w" data-404 src="https://traks-collect.dragonfarm2509.workers.dev/t.js"></script>\n'
)

def inject():
    html_files = [
        PROJECT_ROOT / "index.html",
        PROJECT_ROOT / "404.html",
        PROJECT_ROOT / "cho-thue" / "index.html",
        PROJECT_ROOT / ".agents" / "skills" / "course-article-builder" / "templates" / "course-template.html"
    ]
    
    course_dirs = list((PROJECT_ROOT / "lop-hoc").glob("*/index.html"))
    html_files.extend(course_dirs)
    
    updated = 0
    skipped = 0
    
    for file_path in html_files:
        if not file_path.exists():
            print(f"⚠️ Không tìm thấy file: {file_path}")
            continue
            
        content = file_path.read_text(encoding="utf-8")
        
        if "data-site=\"pb_live_zirw1qdt9k2j4k8me578e12w\"" in content:
            print(f"⏩ Đã có Traks: {file_path.relative_to(PROJECT_ROOT)}")
            skipped += 1
            continue
            
        snippet = NOT_FOUND_SNIPPET if file_path.name == "404.html" else STANDARD_SNIPPET
        
        # Insert before </head>
        if "</head>" in content:
            new_content = content.replace("</head>", snippet + "</head>")
            file_path.write_text(new_content, encoding="utf-8")
            print(f"✅ Đã thêm Traks vào: {file_path.relative_to(PROJECT_ROOT)}")
            updated += 1
        else:
            print(f"❌ Không tìm thấy thẻ </head> trong: {file_path.relative_to(PROJECT_ROOT)}")
            
    print(f"\nTổng kết: Đã cập nhật {updated} files, Bỏ qua {skipped} files.")

if __name__ == "__main__":
    inject()
