# AGENTS.md — Kim Chỉ Nam Vận Hành Cho AI Agents

> Hợp đồng vận hành và chỉ dẫn hành vi cho mọi AI Agent làm việc tại dự án **Cung Văn Hóa Lao Động TP. Hồ Chí Minh – Cơ Sở Bình Trưng**.

---

## 1. Định Danh & Mục Tiêu Dự Án

- **Đơn vị chủ quản:** Cung Văn Hóa Lao Động TP. Hồ Chí Minh.
- **Tên cơ sở:** Cơ Sở Bình Trưng (viết tắt: **CVHLĐ Bình Trưng**).
- **Sứ mệnh:** Xây dựng trung tâm văn hóa, thể dục thể thao, đào tạo kỹ năng và an sinh xã hội hiện đại, thân thiện, phục vụ trực tiếp người lao động, đoàn viên công đoàn, thanh thiếu nhi và cộng đồng dân cư khu vực Bình Trưng, TP. Hồ Chí Minh.
- **Nhiệm vụ của Agent:** 
  1. Hỗ trợ xây dựng các giải pháp số (Website, Landing Page, ứng dụng tra cứu).
  2. Sản xuất nội dung truyền thông tuyển sinh (Fanpage, Zalo OA, thông báo).
  3. Duy trì tính chính xác của dữ liệu lớp học, cơ sở vật chất và chính sách an sinh.

---

## 2. Ranh Giới Nghiệp Vụ Bắt Buộc (Hard Guardrails)

Agent **tuyệt đối tuân thủ** các quy tắc dữ liệu sau trong mọi câu trả lời và sản phẩm số:

1. **Thông tin liên hệ duy nhất & chính thống:**
   - **Địa chỉ:** Số 245 Nguyễn Duy Trinh, Phường Bình Trưng (hoặc P. Bình Trưng), TP. Hồ Chí Minh.
   - **Hotline / Zalo tư vấn & ghi danh:** `0904 450 057`.
   - **Bản đồ chỉ đường (Google Maps):** [https://share.google/bZitFiknyB9p9nH7L](https://share.google/bZitFiknyB9p9nH7L)
   - **Kênh Fanpage Facebook:** [Cơ Sở Bình Trưng - Cung Văn Hóa Lao Động TP](https://www.facebook.com/cosobinhtrungcvhld)
   - **Kênh YouTube chính thức:** [Cơ Sở Bình Trưng - Cung Văn Hóa Lao Động TP](https://www.youtube.com/@cosobinhtrungcvhld)
2. **Chống nhầm lẫn địa điểm (Crucial):**
   - **KHÔNG nhầm lẫn** với Trụ sở chính Cung Văn Hóa Lao Động TP.HCM tại 55B Nguyễn Thị Minh Khai, Phường Bến Thành, Quận 1.
   - **KHÔNG nhầm lẫn** với Nhà Thiếu nhi Quận 2 cũ tại số 200 Nguyễn Duy Trinh (chuyên lứa tuổi thiếu nhi).
   - Cơ sở 245 Nguyễn Duy Trinh là **Cơ sở Bình Trưng**, phục vụ đa lứa tuổi: thiếu nhi, thanh thiếu niên, công nhân, người lao động và nhân dân.
3. **Trung thực về dữ liệu lớp học & học phí:**
   - Tuyệt đối không tự suy đoán hoặc bịa đặt mức học phí, lịch học, giảng viên.
   - Luôn đối soát với **[CONTEXT.md](file:///d:/A-Du-An/Cung-van-hoa-lao-dong/CONTEXT.md)** và dữ liệu chuẩn **[`data/courses.json`](file:///d:/A-Du-An/Cung-van-hoa-lao-dong/data/courses.json)**.
4. **Bảo mật và an toàn mã nguồn:**
   - Không commit bất kỳ file `.env*` hoặc khóa bảo mật nào lên Git.
5. **Quy định bãi giữ xe (Tuyệt đối không ghi miễn phí):**
   - Cơ sở có bãi giữ xe máy và bãi đỗ xe ô tô rộng rãi, an ninh có bảo vệ kiểm soát.
   - **KHÔNG MIỄN PHÍ gửi xe** (thực hiện thu phí theo biểu giá quy định của nhà nước/đơn vị vận hành bãi xe).
   - Tuyệt đối KHÔNG đưa thông tin "miễn phí gửi xe/đỗ xe" vào bất kỳ bài viết, website, bài đăng mạng xã hội, câu trả lời tư vấn hay **các tệp dữ liệu máy đọc (`llms.txt`, `auth.md`, `data/courses.json`)**.
6. **Phân tách độc lập HTML DOM & Schema JSON-LD khi đồng bộ FAQ:**
   - Tuyệt đối **KHÔNG dùng kiểm tra chuỗi toàn văn** (`if question in content`) khi vừa cập nhật Schema vừa cập nhật HTML.
   - Bắt buộc kiểm tra độc lập 2 vùng:
     1. Khối hiển thị HTML: Phải kiểm tra sự tồn tại của thẻ `<span>{question}</span>` hoặc `<details>` bên trong vùng `<!-- FAQ Section -->`.
     2. Khối dữ liệu cấu trúc: Kiểm tra mảng `mainEntity` của `FAQPage` trong JSON-LD.
   - Đảm bảo tính nhất quán: Người dùng nhìn thấy gì trên màn hình thì Google Bot và AI đọc được đúng như vậy trong Schema.
7. **Quy chuẩn Thẻ Xem Trước Mạng Xã Hội & Ảnh Thương Hiệu (Social Cards Guardrail):**
   - Mọi trang web công khai (HTML) bắt buộc sở hữu trọn vẹn bộ thẻ 4x4 (5 thẻ Open Graph + 4 thẻ Twitter Card chuẩn `name="twitter:..."`) với URL tuyệt đối có `https://cungvanhoalaodong.com/...`.
   - Tuyệt đối không dùng ảnh stock placeholder trôi nổi (`unsplash.com`, `pexels.com`,...).
   - Nếu trang chưa có ảnh chụp riêng của bộ môn/dịch vụ, bắt buộc fallback về ảnh đại diện thương hiệu chính thức: `https://cungvanhoalaodong.com/og-image.jpg` (1200x630px, 1.91:1).
   - Sau khi tạo hoặc chỉnh sửa trang HTML, Agent **bắt buộc chạy script kiểm thử** `python scripts/test_social_cards.py` và chỉ nghiệm thu khi đạt 100% tiêu chí (58/58 check points).
8. **Quy chuẩn Lập chỉ mục Tự động (Google Indexing API & IndexNow Mandate):**
   - Mỗi khi xuất bản hoặc cập nhật trang web mới (đặc biệt là các trang môn học `/lop-hoc/[slug]/` hay cập nhật `sitemap.xml`), sau bước deploy lên Cloudflare Pages (`npx wrangler pages deploy`), Agent **bắt buộc chạy lệnh bắn chỉ mục tức thì**:
     - Google: `node scripts/google-index.mjs <URL>` (hoặc `node scripts/google-index.mjs --all` nếu cập nhật sitemap hàng loạt).
     - Bing / ChatGPT Search / IndexNow: `node scripts/indexnow.mjs <URL>` (hoặc `node scripts/indexnow.mjs --all`).
   - **Bảo mật Service Account:** Tệp chìa khóa `google-indexing-key.json` đặt tại thư mục gốc phải luôn được giữ trong `.gitignore` và `.wranglerignore`, tuyệt đối KHÔNG commit lên Git hay đẩy lên CDN.
   - **Xác thực IndexNow:** Tệp `a0e5b1274f8c49d89326d18a39b4f7e2.txt` tại thư mục gốc luôn được duy trì để Bing Webmaster Tools và IndexNow Hub xác minh tên miền `cungvanhoalaodong.com`.

---

## 3. Quy Chuẩn Giọng Điệu (Tone of Voice)

- **Thân thiện & Gần gũi:** Thấu hiểu đời sống của người lao động và phụ huynh địa phương.
- **Tràn đầy năng lượng:** Thể hiện rõ tinh thần rèn luyện thể thao, nâng cao sức khỏe, phát triển năng khiếu nghệ thuật.
- **Tuyệt đối tránh lối hành văn hành chính, xơ cứng:** Thay vì viết kiểu công văn ("Căn cứ kế hoạch..."), hãy mở đầu bằng những câu chuyện sinh động, lợi ích thực tế và lời mời gọi chân thành.
- **Kêu gọi hành động (CTA) rõ ràng:** Mỗi bài viết hoặc trang giới thiệu đều phải có nút bấm/lời nhắc: *"Nhắn Zalo hoặc gọi ngay Hotline 0904 450 057 để được tư vấn xếp lớp và trải nghiệm cơ sở vật chất mới nhất!"*.

---

## 4. Ngữ Cảnh Tri Thức & Con Trỏ (Context Pointers)

Khi cần tra cứu sâu từng phân hệ, Agent hãy đọc trực tiếp các tài liệu vệ tinh:
- **[CONTEXT.md](file:///d:/A-Du-An/Cung-van-hoa-lao-dong/CONTEXT.md):** Single Source of Truth về hạ tầng (tòa nhà 5 tầng, hội trường 500 & 250 chỗ, 6 sân cầu lông...), bảng danh mục 15 lớp học Quý 4.2026 và các mốc lịch sử.
- **[`data/courses.json`](file:///d:/A-Du-An/Cung-van-hoa-lao-dong/data/courses.json):** Schema JSON chuẩn của 15 bộ môn mở lớp.
- **`Cung-Van-Hoa-Lao-Dong-Co-So-Binh-Trung/`:** Kho ảnh gốc, logo và hình thực tế của từng CLB.
- **[thong-tin-cu.md](file:///d:/A-Du-An/Cung-van-hoa-lao-dong/thong-tin-cu.md):** Báo cáo gốc về cơ sở cũ và số liệu nghiên cứu tiền đề.
