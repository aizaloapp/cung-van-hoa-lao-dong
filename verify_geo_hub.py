import os
import glob
import re
import sys

def verify():
    print("=== BẮT ĐẦU KIỂM THỬ TOÀN DIỆN GEO AGENT HUB ===")
    errors = []
    warnings = []

    # 1. Kiểm tra tồn tại các file dữ liệu máy đọc & tài nguyên
    required_files = [
        "llms.txt",
        "llms-full.txt",
        "features.md",
        "services.md",
        "courses.md",
        "faq.md",
        ".well-known/agent-instructions.md",
        "openapi.json",
        "logos/openai.svg",
        "logos/claude.svg",
        "logos/perplexity.svg",
        "logos/gemini.svg",
        "logos/grok.svg"
    ]

    print("\n[1/5] Kiểm tra sự tồn tại của tệp dữ liệu máy đọc & SVG:")
    for f in required_files:
        if not os.path.exists(f):
            errors.append(f"Tệp thiếu: {f}")
            print(f"  ❌ THIẾU: {f}")
        else:
            size = os.path.getsize(f)
            if size == 0:
                errors.append(f"Tệp rỗng (0 bytes): {f}")
                print(f"  ❌ RỖNG: {f}")
            else:
                print(f"  ✅ OK: {f} ({size:,} bytes)")

    # 2. Kiểm tra Hard Guardrails trong các tệp nội dung
    print("\n[2/5] Kiểm tra Hard Guardrails (Bảo vệ dữ liệu & danh tính):")
    text_files = [
        "llms.txt",
        "llms-full.txt",
        "features.md",
        "services.md",
        "courses.md",
        "faq.md",
        ".well-known/agent-instructions.md"
    ]

    for tf in text_files:
        if not os.path.exists(tf):
            continue
        with open(tf, 'r', encoding='utf-8') as fp:
            content = fp.read()
        
        # Check forbidden: "TP. Thủ Đức"
        if "TP. Thủ Đức" in content or "Thành phố Thủ Đức" in content:
            errors.append(f"{tf} chứa 'TP. Thủ Đức'")
            print(f"  ❌ LỖI ĐỊA GIỚI trong {tf}: chứa TP. Thủ Đức")
        
        # Check forbidden: "miễn phí gửi xe" / "miễn phí đỗ xe"
        forbidden_parking = ["miễn phí gửi xe", "miễn phí đỗ xe", "free parking", "gửi xe miễn phí", "đỗ xe miễn phí"]
        for fp_phrase in forbidden_parking:
            if fp_phrase in content.lower():
                errors.append(f"{tf} chứa cụm từ cấm: '{fp_phrase}'")
                print(f"  ❌ LỖI BÃI XE trong {tf}: chứa '{fp_phrase}'")

        # Check required: Hotline 0904 450 057
        if "0904 450 057" not in content and "0904450057" not in content:
            warnings.append(f"{tf} không chứa Hotline 0904 450 057")
            print(f"  ⚠️ CẢNH BÁO trong {tf}: thiếu Hotline 0904 450 057")
        else:
            print(f"  ✅ {tf}: Tuân thủ Hard Guardrails")

    # 3. Kiểm tra _headers
    print("\n[3/5] Kiểm tra cấu hình Cloudflare Pages _headers:")
    with open("_headers", 'r', encoding='utf-8') as fp:
        headers_content = fp.read()

    headers_checks = [
        ("/*.md", "Quy tắc MIME cho *.md"),
        ("/llms-full.txt", "Quy tắc MIME cho llms-full.txt"),
        ("/.well-known/agent-instructions.md", "Quy tắc MIME cho agent-instructions.md"),
        ("/logos/*", "Quy tắc Cache cho /logos/*"),
        ("/openapi.json", "Quy tắc MIME cho /openapi.json"),
        ("text/markdown; charset=utf-8", "Content-Type text/markdown"),
        ("Access-Control-Allow-Origin: *", "CORS Allow Origin *")
    ]

    for pattern, desc in headers_checks:
        if pattern in headers_content:
            print(f"  ✅ {desc}: Đã cấu hình")
        else:
            errors.append(f"_headers thiếu: {desc} ('{pattern}')")
            print(f"  ❌ {desc}: THIẾU")

    # 4. Kiểm tra robots.txt & sitemap.xml
    print("\n[4/5] Kiểm tra robots.txt & sitemap.xml:")
    with open("robots.txt", 'r', encoding='utf-8') as fp:
        robots = fp.read()

    robots_bots = ["GPTBot", "ClaudeBot", "PerplexityBot", "Applebot-Extended", "Google-Extended", "llms.txt"]
    for b in robots_bots:
        if b in robots:
            print(f"  ✅ robots.txt cho phép: {b}")
        else:
            errors.append(f"robots.txt thiếu: {b}")
            print(f"  ❌ robots.txt thiếu: {b}")

    with open("sitemap.xml", 'r', encoding='utf-8') as fp:
        sitemap = fp.read()

    sitemap_entries = ["llms.txt", "llms-full.txt", "features.md", "services.md", "courses.md", "faq.md"]
    for se in sitemap_entries:
        if se in sitemap:
            print(f"  ✅ sitemap.xml chứa: {se}")
        else:
            errors.append(f"sitemap.xml thiếu: {se}")
            print(f"  ❌ sitemap.xml thiếu: {se}")

    # 5. Kiểm tra Footer Snippet trong toàn bộ các trang HTML
    print("\n[5/5] Kiểm tra cấy Footer trên toàn bộ các trang:")
    all_html = ["index.html", "cho-thue/index.html"] + glob.glob("lop-hoc/*/index.html")
    
    for h in all_html:
        with open(h, 'r', encoding='utf-8') as fp:
            html_text = fp.read()
        
        has_snippet = "<!-- GEO & AI AGENTS FOOTER SNIPPET" in html_text
        has_chatgpt = "chatgpt.com/?q=" in html_text
        has_claude = "claude.ai/new?q=" in html_text
        has_perplexity = "perplexity.ai/search?q=" in html_text
        has_gemini_udm = "google.com/search?udm=50&amp;q=" in html_text or "google.com/search?udm=50&q=" in html_text
        has_grok = "grok.com/?q=" in html_text

        if has_snippet and has_chatgpt and has_claude and has_perplexity and has_gemini_udm and has_grok:
            print(f"  ✅ {h}: Đầy đủ 5 AI Jump Links (Gemini udm=50) & Machine Context")
        else:
            errors.append(f"{h} thiếu một số jump links hoặc snippet")
            print(f"  ❌ {h}: THIẾU CẤU HÌNH FOOTER")

    print("\n" + "="*50)
    if errors:
        print(f"❌ KẾT QUẢ: Phát hiện {len(errors)} lỗi cần khắc phục:")
        for err in errors:
            print(f"  - {err}")
        sys.exit(1)
    else:
        print("🎉 TẤT CẢ 5 HẠNG MỤC KIỂM THỬ ĐỀU ĐẠT 100%!")
        print("Tầng Dữ Liệu Máy Đọc và Bộ 5 Trợ Lý AI Jump Links đã được cấu hình hoàn hảo.")
        sys.exit(0)

if __name__ == "__main__":
    verify()
