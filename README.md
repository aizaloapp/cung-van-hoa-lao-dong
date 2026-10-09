# Cung Văn Hóa Lao Động TP. Hồ Chí Minh — Cơ Sở Bình Trưng

Chào mừng bạn đến với kho lưu trữ dự án số hóa và cổng thông tin chính thức của **Cung Văn Hóa Lao Động TP. Hồ Chí Minh — Cơ Sở Bình Trưng** (Số 245 Nguyễn Duy Trinh, Phường Bình Trưng, TP. Hồ Chí Minh) — Truy cập website: [cungvanhoalaodong.com](https://cungvanhoalaodong.com/).

---

## 📌 Thông Tin Liên Hệ & Kênh Chính Thức

- **Website chính thức:** [https://cungvanhoalaodong.com/](https://cungvanhoalaodong.com/)
- **Danh sách 15 CLB & Lớp năng khiếu:** [https://cungvanhoalaodong.com/lop-hoc/](https://cungvanhoalaodong.com/lop-hoc/)
- **Địa chỉ:** 245 Nguyễn Duy Trinh, P. Bình Trưng, TP. Hồ Chí Minh
- **Hotline / Zalo tư vấn & tuyển sinh:** `0904 450 057`
- **Bản đồ chỉ đường (Google Maps):** [Chỉ đường tại đây](https://share.google/bZitFiknyB9p9nH7L)
- **Fanpage chính thức:** [Cơ Sở Bình Trưng - Cung Văn Hóa Lao Động TP](https://www.facebook.com/cosobinhtrungcvhld)
- **Kênh YouTube chính thức:** [Cơ Sở Bình Trưng - Cung Văn Hóa Lao Động TP](https://www.youtube.com/@cosobinhtrungcvhld)
- **Trang Wikipedia tham chiếu:** [Cung Văn hóa Lao động Thành phố Hồ Chí Minh](https://vi.wikipedia.org/wiki/Cung_V%C4%83n_h%C3%B3a_Lao_%C4%91%E1%BB%99ng_Th%C3%A0nh_ph%E1%BB%91_H%E1%BB%93_Ch%C3%AD_Minh)

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

## 🚀 Hiện Trạng Triển Khai & Vận Hành

- **Website Production:** [https://cungvanhoalaodong.com/](https://cungvanhoalaodong.com/) (Vận hành trên hạ tầng Cloudflare Pages toàn cầu).
- **Hệ thống 15 chuyên trang Lớp học / CLB:** Đầy đủ dữ liệu Schema JSON-LD, Open Graph, tối ưu SEO & GEO (AI Search).
- **Tích hợp Wikipedia:** Cập nhật mục Cơ sở Bình Trưng vào [Wikipedia Cung Văn hóa Lao động TP.HCM](https://vi.wikipedia.org/wiki/Cung_V%C4%83n_h%C3%B3a_Lao_%C4%91%E1%BB%99ng_Th%C3%A0nh_ph%E1%BB%91_H%E1%BB%93_Ch%C3%AD_Minh).
- **Lập chỉ mục tự động:** Tích hợp bộ script Instant Indexing gửi Google Indexing API & IndexNow (Bing / ChatGPT Search) cho 100% URL sitemap.
- **Kênh tiếp nhận tư vấn:** Kết nối Hotline/Zalo `0904 450 057` và Fanpage chính thức.
