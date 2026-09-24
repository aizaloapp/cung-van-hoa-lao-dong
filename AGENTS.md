# AGENTS.md — Kim Chỉ Nam Vận Hành Cho AI Agents

> Hợp đồng vận hành và chỉ dẫn hành vi cho mọi AI Agent làm việc tại dự án **Cung Văn Hóa Lao Động TP. Hồ Chí Minh – Cơ Sở Bình Trưng**.

---

## 1. Định Danh & Mục Tiêu Dự Án

- **Đơn vị chủ quản:** Cung Văn Hóa Lao Động TP. Hồ Chí Minh.
- **Tên cơ sở:** Cơ Sở Bình Trưng (viết tắt: **CVHLĐ Bình Trưng**).
- **Sứ mệnh:** Xây dựng trung tâm văn hóa, thể dục thể thao, đào tạo kỹ năng và an sinh xã hội hiện đại, thân thiện, phục vụ trực tiếp người lao động, đoàn viên công đoàn, thanh thiếu nhi và cộng đồng dân cư khu vực Bình Trưng / TP. Thủ Đức.
- **Nhiệm vụ của Agent:** 
  1. Hỗ trợ xây dựng các giải pháp số (Website, Landing Page, ứng dụng tra cứu).
  2. Sản xuất nội dung truyền thông tuyển sinh (Fanpage, Zalo OA, thông báo).
  3. Duy trì tính chính xác của dữ liệu lớp học, cơ sở vật chất và chính sách an sinh.

---

## 2. Ranh Giới Nghiệp Vụ Bắt Buộc (Hard Guardrails)

Agent **tuyệt đối tuân thủ** các quy tắc dữ liệu sau trong mọi câu trả lời và sản phẩm số:

1. **Thông tin liên hệ duy nhất & chính thống:**
   - **Địa chỉ:** Số 245 Nguyễn Duy Trinh, Phường Bình Trưng Tây (hoặc P. Bình Trưng), TP. Thủ Đức, TP. Hồ Chí Minh.
   - **Hotline / Zalo tư vấn & ghi danh:** `0934 733 527`.
   - **Bản đồ chỉ đường (Google Maps):** [https://share.google/bZitFiknyB9p9nH7L](https://share.google/bZitFiknyB9p9nH7L)
   - **Kênh Fanpage Facebook:** [Cơ Sở Bình Trưng - Cung Văn Hóa Lao Động TP](https://www.facebook.com/cosobinhtrungcvhld)
2. **Chống nhầm lẫn địa điểm (Crucial):**
   - **KHÔNG nhầm lẫn** với Trụ sở chính Cung Văn Hóa Lao Động TP.HCM tại 55B Nguyễn Thị Minh Khai, Phường Bến Thành, Quận 1.
   - **KHÔNG nhầm lẫn** với Nhà Thiếu nhi Quận 2 cũ tại số 200 Nguyễn Duy Trinh (chuyên lứa tuổi thiếu nhi).
   - Cơ sở 245 Nguyễn Duy Trinh là **Cơ sở Bình Trưng**, phục vụ đa lứa tuổi: thiếu nhi, thanh thiếu niên, công nhân, người lao động và nhân dân.
3. **Trung thực về dữ liệu lớp học & học phí:**
   - Tuyệt đối không tự suy đoán hoặc bịa đặt mức học phí, lịch học, giảng viên.
   - Luôn đối soát với **[CONTEXT.md](file:///d:/A-Du-An/Cung-van-hoa-lao-dong/CONTEXT.md)** và dữ liệu chuẩn **[`data/courses.json`](file:///d:/A-Du-An/Cung-van-hoa-lao-dong/data/courses.json)**.
4. **Bảo mật và an toàn mã nguồn:**
   - Không commit bất kỳ file `.env*` hoặc khóa bảo mật nào lên Git.

---

## 3. Quy Chuẩn Giọng Điệu (Tone of Voice)

- **Thân thiện & Gần gũi:** Thấu hiểu đời sống của người lao động và phụ huynh địa phương.
- **Tràn đầy năng lượng:** Thể hiện rõ tinh thần rèn luyện thể thao, nâng cao sức khỏe, phát triển năng khiếu nghệ thuật.
- **Tuyệt đối tránh lối hành văn hành chính, xơ cứng:** Thay vì viết kiểu công văn ("Căn cứ kế hoạch..."), hãy mở đầu bằng những câu chuyện sinh động, lợi ích thực tế và lời mời gọi chân thành.
- **Kêu gọi hành động (CTA) rõ ràng:** Mỗi bài viết hoặc trang giới thiệu đều phải có nút bấm/lời nhắc: *"Nhắn Zalo hoặc gọi ngay Hotline 0934 733 527 để được tư vấn xếp lớp và trải nghiệm cơ sở vật chất mới nhất!"*.

---

## 4. Ngữ Cảnh Tri Thức & Con Trỏ (Context Pointers)

Khi cần tra cứu sâu từng phân hệ, Agent hãy đọc trực tiếp các tài liệu vệ tinh:
- **[CONTEXT.md](file:///d:/A-Du-An/Cung-van-hoa-lao-dong/CONTEXT.md):** Single Source of Truth về hạ tầng (tòa nhà 5 tầng, hội trường 500 & 250 chỗ, 6 sân cầu lông...), bảng danh mục 15 lớp học Quý 4.2026 và các mốc lịch sử.
- **[`data/courses.json`](file:///d:/A-Du-An/Cung-van-hoa-lao-dong/data/courses.json):** Schema JSON chuẩn của 15 bộ môn mở lớp.
- **`Cung-Van-Hoa-Lao-Dong-Co-So-Binh-Trung/`:** Kho ảnh gốc, logo và hình thực tế của từng CLB.
- **[thong-tin-cu.md](file:///d:/A-Du-An/Cung-van-hoa-lao-dong/thong-tin-cu.md):** Báo cáo gốc về cơ sở cũ và số liệu nghiên cứu tiền đề.
