---
name: course-article-builder
description: Sinh trang bài viết chi tiết lớp học chuẩn SEO, GEO (AI Search) và Storytelling từ data/courses.json cho dự án Cung Văn Hóa Lao Động Cơ Sở Bình Trưng, tự động cập nhật sitemap và liên kết trang chủ.
---

# Kỹ Năng: Xây Dựng Bài Viết Lớp Học (Course Article Builder)

> Kỹ năng chuyên trách sản xuất các trang bài viết chi tiết độc lập (`/lop-hoc/[slug]/`) cho 15 bộ môn tại **Cung Văn Hóa Lao Động TP. Hồ Chí Minh — Cơ Sở Bình Trưng**, tuân thủ 100% "Khuôn mẫu vàng" (Gold Standard) từ bài mẫu CLB Bắn Cung.

---

## 1. Ranh Giới Nghiệp Vụ Bắt Buộc (Hard Guardrails)

1. **Thông tin liên hệ & Địa chỉ bất biến:**
   - **Địa chỉ:** Số 245 Nguyễn Duy Trinh, Phường Bình Trưng Tây, TP. Hồ Chí Minh (KHÔNG dùng "TP. Thủ Đức", KHÔNG nhầm với 55B Nguyễn Thị Minh Khai Quận 1 hay Nhà thiếu nhi 200 Nguyễn Duy Trinh).
   - **Hotline cơ sở:** `0934 733 527`.
   - **Hotline & Zalo trên trang bài viết chi tiết:** **BẮT BUỘC** trỏ thẳng về số điện thoại của **Thầy/Cô chủ nhiệm lớp học đó**.
2. **Nguồn dữ liệu chân thực (Single Source of Truth):**
   - Chỉ dùng dữ liệu từ `data/courses.json` và `CONTEXT.md`. Tuyệt đối không tự bịa đặt học phí, lịch học, giảng viên.
3. **Giọng điệu (Tone of Voice):**
   - Kể chuyện (Storytelling), gần gũi, thấu hiểu phụ huynh và người lao động, truyền cảm hứng thể thao, không dùng lối hành văn hành chính.

---

## 2. Bảng Chuẩn Hóa Mapping `course_id` ↔ `slug` ↔ Thư Mục Ảnh

| course_id | slug (URL) | Tên Bộ Môn | Thư mục ảnh | Giáo viên phụ trách | SĐT Liên hệ |
|---|---|---|---|---|---|
| `ban-cung` | `ban-cung` | CLB Bắn Cung Trải Nghiệm | `LOP-HOC/ban-cung/` | Thầy Đoàn Thanh Tiếp | `0703 275 125` |
| `boxing-kids-nguoi-lon` | `boxing-kids-nguoi-lon` | CLB Boxing Kids & Người Lớn | `LOP-HOC/Boxing/` | Thầy Nguyễn Thanh Việt | `0939 305 458` |
| `yoga-tri-lieu` | `yoga-tri-lieu` | CLB Yoga Trị Liệu | `LOP-HOC/Yoga-tri-lieu/` | Cô Nguyễn Thị Liên | `0767 025 678` |
| `cau-long` | `cau-long` | CLB Cầu Lông (6 Sân PVC) | `LOP-HOC/cau-long/` | Đỗ Thanh Hòa | `0937 224 640` |
| `taekwondo` | `taekwondo` | CLB Taekwondo | `LOP-HOC/Teakwondo/` | Thầy Huỳnh Thanh Danh | `0901 539 619` |
| `nhay-hien-dai-thieu-nhi` | `nhay-hien-dai-thieu-nhi` | CLB Nhảy Hiện Đại Thiếu Nhi | `LOP-HOC/nhay-hien-dai/` | Thầy Trần Trung Hiền | `0902 774 594` |
| `dance-kids-ballet-kids` | `dance-kids-ballet-kids` | CLB Dance Kids & Ballet Kids | `LOP-HOC/nhay-hien-dai/` | Cô Nguyễn Ngọc Mai Trâm | `0937 712 003` |
| `yoga-an-do` | `yoga-an-do` | CLB Yoga Ấn Độ | `LOP-HOC/Yoga-An-Do/` | Thầy Shashi Kant Pramanik | `0909 620 705` |
| `yoga-song-khoe-1` | `yoga-song-khoe-1` | CLB Yoga Sống Khỏe 1 (Sáng) | `LOP-HOC/Yoga-song-khoe/` | Cô Khổng Thị Lang | `0903 333 254` |
| `yoga-song-khoe-2` | `yoga-song-khoe-2` | CLB Yoga Sống Khỏe 2 (Tối) | `LOP-HOC/Yoga-song-khoe/` | Cô Nguyễn Thị Bảy | `0767 119 854` |
| `lan-su-rong` | `lan-su-rong` | CLB Lân Sư Rồng Nghệ Thuật | `Hinh-co-so-moi/` | Huỳnh Kim Hoàng | `0933 967 938` |
| `mua-dan-vu` | `mua-dan-vu` | CLB Múa Dân Vũ | `LOP-HOC/mua-dan-gian/` | Cô Võ Thị Kim Liên | `0907 719 318` |
| `bong-ro` | `bong-ro` | CLB Bóng Rổ Năng Khiếu | `LOP-HOC/bong-ro/` | Thầy Nguyễn Ngọc Thịnh | `0896 699 089` |
| `patin` | `patin` | CLB Trượt Patin Cơ Bản | `Hinh-co-so-moi/` | Cô Hồ Kim Ân | `0906 345 894` |
| `bong-da` | `bong-da` | CLB Bóng Đá Phong Trào | `LOP-HOC/bong-da/` | Ban Thể thao cơ sở | `0934 733 527` |

---

## 3. Quy Trình 4 Bước Thực Thi Chi Tiết

### Bước 1: Thu Thập & Chuẩn Hóa Dữ Liệu Đầu Vào
1. **Lấy `course_id` mục tiêu:** Đọc entry tương ứng trong `data/courses.json`.
2. **Chuẩn hóa số điện thoại (Phone Normalization):**
   - Loại bỏ toàn bộ khoảng trắng, dấu chấm, dấu gạch ngang: `cleanPhone = rawPhone.replace(/\D/g, '')`.
   - Nếu bắt đầu bằng `84` hoặc `+84` → đổi thành `0`.
   - Chuẩn bị số hiển thị định dạng chuẩn: `09xx xxx xxx`.
3. **Chuẩn bị nội dung Zalo mẫu (URL-encoded):**
   - Cú pháp: `encodeURIComponent("Xin chao [Thay/Co], toi muon tu van lop [Ten Lop] tai Co So Binh Trung")`.
4. **Chiến lược kiểm tra & Fallback hình ảnh 3 tầng:**
   - *Tầng 1 (Ưu tiên):* Quét thư mục ảnh riêng của môn trong `Cung-Van-Hoa-Lao-Dong-Co-So-Binh-Trung/[imageFolder]/`.
   - *Tầng 2 (Dự phòng):* Nếu thư mục không có ảnh hoặc chỉ có 1 ảnh, lấy bổ sung ảnh tòa nhà và sân thể thao từ `Cung-Van-Hoa-Lao-Dong-Co-So-Binh-Trung/Hinh-co-so-moi/` (`1.jpg`, `2.jpg`, `unnamed.webp`).
   - *Tầng 3:* Đảm bảo tối thiểu 1 ảnh bìa (Hero) và ít nhất 2 ảnh gallery.

---

### Bước 2: Sáng Tác Nội Dung Theo Cấu Trúc Storytelling
Mỗi bài viết phải được viết giàu cảm xúc, chạm đúng tâm lý người học theo 5 phần:
1. **Tiêu đề hấp dẫn (H1):** `[Tên CLB] Bình Trưng: [Lợi ích cảm xúc / Thể chất] Tại 245 Nguyễn Duy Trinh`.
2. **Khơi gợi nỗi niềm (Emotional Hook):** Nỗi trăn trở của cha mẹ (con nghiện game, sợ bị bắt nạt, rụt rè) hoặc của người đi làm (đau cổ vai gáy, áp lực công việc, thiếu năng lượng).
3. **Không khí luyện tập thực tế:** Miêu tả âm thanh, hình ảnh sống động của lớp học và sự tận tình kèm cặp của Thầy/Cô chủ nhiệm.
4. **3 Lợi ích vàng:** Chia thành 3 khối trực quan (Thể chất dẻo dai, Tự tin & Bản lĩnh, Tinh thần sảng khoái).
5. **Khối Hỏi - Đáp (FAQ thực chiến):** 2 - 3 câu hỏi thực tế (chưa có kinh nghiệm có học được không, cần chuẩn bị dụng cụ gì, chính sách học phí công đoàn).

---

### Bước 3: Điền Dữ Liệu Vào Template & Render HTML
Sử dụng tệp mẫu tiêu chuẩn tại:
📁 `.agents/skills/course-article-builder/templates/course-template.html`

Thay thế chính xác các placeholder:
- `{{PAGE_TITLE}}`, `{{META_DESCRIPTION}}`, `{{META_KEYWORDS}}`
- `{{CANONICAL_URL}}`: `https://cungvanhoalaodong.com/lop-hoc/[slug]/` (bắt buộc kết thúc bằng `/`)
- `{{OG_TITLE}}`, `{{OG_DESCRIPTION}}`, `{{OG_IMAGE}}`
- `{{INSTRUCTOR_NAME}}`, `{{INSTRUCTOR_SHORT_NAME}}`, `{{INSTRUCTOR_PHONE_DISPLAY}}`, `{{INSTRUCTOR_PHONE_CLEAN}}`
- `{{ZALO_MSG_ENCODED}}`
- `{{SCHEMA_JSON_LD}}`: Chứa cả 3 Schema: `Course`, `BreadcrumbList`, `FAQPage`.
- Ghi tệp kết quả ra: `lop-hoc/[slug]/index.html`.

---

### Bước 4: Tự Động Kết Nối & Kiểm Thử 7 Điểm (Verification)

1. **Cập nhật `sitemap.xml`:** Thêm entry `<url>` của lớp mới với `<priority>0.9</priority>` và `<lastmod>` hiện tại.
2. **Cập nhật `courseArticleMap` trong `js/app.js`:** Thêm `"[course_id]": "lop-hoc/[slug]/"` để trang chủ tự động hiện nút *"Đọc bài viết giới thiệu chi tiết →"*.
3. **Chạy Checklist Kiểm Thử 7 Điểm:**
   - [ ] 1. Gửi HTTP GET trên server cục bộ (`http://127.0.0.1:8788/lop-hoc/[slug]/`) trả về `200 OK`.
   - [ ] 2. Kiểm tra `<link rel="canonical">` khớp đúng `https://cungvanhoalaodong.com/lop-hoc/[slug]/`.
   - [ ] 3. Kiểm tra toàn bộ link `tel:` và `zalo.me/` đều trỏ đúng số sạch của Thầy/Cô.
   - [ ] 4. Kiểm tra Open Graph tags (`og:title`, `og:image`, `og:url`) đầy đủ.
   - [ ] 5. Kiểm tra tất cả đường dẫn ảnh `src` không bị lỗi 404.
   - [ ] 6. Kiểm tra `sitemap.xml` đúng cú pháp XML.
   - [ ] 7. Kiểm tra thẻ lớp trên trang chủ xuất hiện nút dẫn tới bài viết mới.

---

## 4. Cách Sử Dụng Lệnh
Người dùng chỉ cần yêu cầu:
- *"Tạo bài viết cho lớp Taekwondo"* ➔ Chạy skill với `course_id: taekwondo`.
- *"Tạo bài viết cho lớp Nhảy hiện đại"* ➔ Chạy skill với `course_id: nhay-hien-dai-thieu-nhi`.
- *"Tạo bài viết cho tất cả các lớp còn lại"* ➔ Lần lượt chạy quy trình theo bảng mapping.

---

## 5. Quy Chuẩn Thiết Kế Mobile & Tính Toàn Vẹn Dữ Liệu (Mobile UX & Data Invariants)

Khi xây dựng hoặc chỉnh sửa trang chi tiết lớp học (`/lop-hoc/[slug]/`), Agent bắt buộc tuân thủ:

### 1. Quy chuẩn Responsive & Phân bổ CTA:
- **Khối Aside Card:** BẮT BUỘC dùng `lg:sticky lg:top-24`. Tuyệt đối không dùng `sticky` trần trụi trên mobile để tránh đè lấn với Header cố định.
- **Phân bổ nút bấm (CTA Hierarchy):**
  - *Header CTA:* Ẩn trên mobile (`hidden sm:flex`).
  - *Sticky Bottom Bar:* Chuyên trách toàn bộ tương tác Zalo, Gọi điện, Chỉ đường trên di động.
  - *Card Aside CTA:* Bổ sung nút chia sẻ tương tác `[Rủ bạn cùng học]` tận dụng Native Web Share API (`navigator.share`).
- **Khoảng đệm chân trang (Safe Bottom Padding):** Thẻ `<footer>` bắt buộc có `pb-28 md:pb-12` để thanh Sticky Bottom Bar không che khuất chữ bản quyền và địa chỉ.

### 2. Tính toàn vẹn dữ liệu học phí (Fee Logic Invariant):
Tuyệt đối không dùng toán tử bậc hai (`course.fee ? ... : ...`) để suy đoán học phí. Bắt buộc phân định 3 trường hợp:
- `course.fee === 0`: Nhãn `"Chính sách an sinh: Miễn 100% học phí"`.
- `course.fee === null`: Nhãn `"Nhiều gói học phí linh hoạt theo số buổi"` hoặc `"Ưu đãi đặt sân cố định / Giao lưu cơ quan"`.
- `course.fee > 0`: Nhãn `"Mức học phí an sinh công đoàn"`.

### 3. Vùng chạm & Điều hướng (Navigation & Touch Targets):
- Breadcrumb trên mobile phải giữ chữ "Trang chủ" kèm padding bấm thoải mái (`py-1 px-1.5`).
- Bổ sung nút quay lại nhanh `‹ Tất cả lớp` ở góc phải breadcrumb để người dùng dễ khám phá các môn khác.

