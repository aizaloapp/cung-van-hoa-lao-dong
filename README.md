# Cung Văn Hóa Lao Động TP. Hồ Chí Minh — Cơ Sở Bình Trưng

Chào mừng bạn đến với kho lưu trữ dự án số hóa và truyền thông của **Cung Văn Hóa Lao Động TP. Hồ Chí Minh — Cơ Sở Bình Trưng** (Số 245 Nguyễn Duy Trinh, Phường Bình Trưng Tây / P. Bình Trưng, TP. Thủ Đức).

---

## 📌 Thông Tin Liên Hệ & Kênh Chính Thức

- **Địa chỉ:** 245 Nguyễn Duy Trinh, P. Bình Trưng Tây, TP. Thủ Đức, TP.HCM
- **Hotline / Zalo tư vấn & tuyển sinh:** `0934 733 527`
- **Google Maps:** [Chỉ đường tại đây](https://share.google/bZitFiknyB9p9nH7L)
- **Fanpage chính thức:** [Cơ Sở Bình Trưng - Cung Văn Hóa Lao Động TP](https://www.facebook.com/cosobinhtrungcvhld)

---

## 📂 Cấu Trúc Thư Mục Repository

```text
├── .gitignore                                          # Loại trừ secrets (.env*), cache và file rác OS
├── AGENTS.md                                           # Hợp đồng vận hành & quy tắc ứng xử của AI Agent
├── CONTEXT.md                                          # Single Source of Truth (Hạ tầng, biểu phí, liên hệ)
├── README.md                                           # Tài liệu tổng quan dự án
├── thong-tin-cu.md                                     # Nghiên cứu lịch sử & cơ sở vật chất cũ (Quận 2)
├── data/
│   └── courses.json                                    # Dữ liệu JSON 15 lớp học & CLB Quý 4/2026
└── Cung-Van-Hoa-Lao-Dong-Co-So-Binh-Trung/             # Thư mục tài nguyên Media & Hình ảnh gốc
    ├── logo.jpg                                        # Logo chính thức
    ├── Hinh-co-so-moi/                                 # Ảnh phối cảnh và thực tế tòa nhà mới
    └── LOP-HOC/                                        # Ảnh tư liệu chi tiết 15 bộ môn
        ├── ban-cung/                                   # Bộ môn Bắn cung
        ├── bong-da/                                    # Bộ môn Bóng đá phong trào
        ├── bong-ro/                                    # Bộ môn Bóng rổ
        ├── Boxing/                                     # Bộ môn Boxing Kids & Người lớn
        ├── cau-long/                                   # Cụm 6 sân Cầu lông
        ├── mua-dan-gian/                               # Lớp Múa dân vũ & dân gian
        ├── nhay-hien-dai/                              # Nhảy hiện đại & Dance Kids
        ├── Teakwondo/                                  # Võ thuật Taekwondo
        ├── Yoga-An-Do/                                 # Lớp Yoga chuẩn Ấn Độ
        ├── Yoga-song-khoe/                             # Yoga Sống Khỏe (sáng & tối)
        ├── Yoga-tri-lieu/                              # Yoga Trị liệu chuyên sâu
        └── DS mở lớp lam website.xlsx                  # Bảng đề xuất mở lớp gốc Quý 4.2026
```

---

## 🚀 Lộ Trình Phát Triển Đề Xuất

1. **Xây dựng Landing Page Tuyển Sinh Quý 4/2026:**
   - Sử dụng dữ liệu có sẵn từ `data/courses.json`.
   - Giao diện thân thiện trên di động, hỗ trợ gọi Hotline hoặc bấm chat Zalo 1-chạm.
   - Trình bày trực quan từng bộ môn kèm hình ảnh và bảng giờ học chi tiết.
2. **Kế hoạch Truyền thông Mạng xã hội:**
   - Chuỗi bài viết thông báo diện mạo mới của Cơ sở Bình Trưng trên Fanpage.
   - Giới thiệu từng câu lạc bộ và các ưu đãi đặc biệt cho đoàn viên công đoàn.
3. **Tự động hóa tư vấn:**
   - Tích hợp kịch bản trả lời tự động trên Fanpage / Zalo OA dựa trên thông tin đã chuẩn hóa trong `CONTEXT.md`.
