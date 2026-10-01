/**
 * Module Cho Thuê Hội Trường, Phòng Chức Năng & Sân Bãi Sự Kiện
 * Cung Văn Hóa Lao Động TP.HCM — Cơ Sở Bình Trưng
 * Độc lập 100% với app.js để bảo toàn tính toàn vẹn hệ thống
 */

(function () {
  'use strict';

  // Khởi tạo bộ lọc tab cho trang chủ
  function initRentalTabs() {
    const tabButtons = document.querySelectorAll('.rental-tab-btn');
    const cards = document.querySelectorAll('.rental-card-item');

    if (!tabButtons.length || !cards.length) return;

    tabButtons.forEach(btn => {
      btn.addEventListener('click', function () {
        const filter = this.getAttribute('data-filter');

        // Cập nhật trạng thái active của tab buttons
        tabButtons.forEach(b => {
          b.classList.remove('bg-blue-600', 'text-white', 'shadow-sm', 'active');
          b.classList.add('bg-white', 'text-slate-700', 'border', 'border-slate-200');
        });

        this.classList.remove('bg-white', 'text-slate-700', 'border', 'border-slate-200');
        this.classList.add('bg-blue-600', 'text-white', 'shadow-sm', 'active');

        // Lọc danh sách thẻ
        cards.forEach(card => {
          const category = card.getAttribute('data-category');
          if (filter === 'all' || category === filter) {
            card.classList.remove('hidden');
            card.style.opacity = '0';
            card.style.transform = 'translateY(8px)';
            setTimeout(() => {
              card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, 20);
          } else {
            card.classList.add('hidden');
          }
        });
      });
    });
  }

  // Quản lý Modal liên hệ & Fallback thông minh
  window.openRentalContactModal = function (spaceName) {
    const modal = document.getElementById('rental-contact-modal');
    if (!modal) return;

    const titleEl = document.getElementById('rental-modal-space-title');
    if (titleEl) {
      titleEl.textContent = spaceName || 'Không gian hội nghị & sự kiện';
    }

    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.classList.add('overflow-hidden');

    if (window.lucide) {
      window.lucide.createIcons();
    }
  };

  window.closeRentalContactModal = function () {
    const modal = document.getElementById('rental-contact-modal');
    if (!modal) return;

    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.classList.remove('overflow-hidden');
  };

  // Sao chép số điện thoại Hotline vào Clipboard kèm phản hồi trực quan
  window.copyRentalHotline = function () {
    const phone = '0904450057';
    navigator.clipboard.writeText(phone).then(() => {
      const copyBtnText = document.getElementById('copy-hotline-btn-text');
      const copyBtnIcon = document.getElementById('copy-hotline-btn-icon');
      if (copyBtnText) {
        const originalText = copyBtnText.textContent;
        copyBtnText.textContent = 'ĐÃ SAO CHÉP!';
        if (copyBtnIcon) copyBtnIcon.setAttribute('data-lucide', 'check');
        if (window.lucide) window.lucide.createIcons();

        setTimeout(() => {
          copyBtnText.textContent = originalText;
          if (copyBtnIcon) copyBtnIcon.setAttribute('data-lucide', 'copy');
          if (window.lucide) window.lucide.createIcons();
        }, 2000);
      }
    }).catch(err => {
      console.error('Không thể sao chép số:', err);
    });
  };

  // Quản lý Lightbox phóng to ảnh
  window.openRentalLightbox = function (imageSrc, caption) {
    const lightbox = document.getElementById('rental-lightbox-modal');
    if (!lightbox) return;

    const imgEl = document.getElementById('rental-lightbox-img');
    const capEl = document.getElementById('rental-lightbox-caption');

    if (imgEl) imgEl.src = imageSrc;
    if (capEl) capEl.textContent = caption || 'Hình ảnh thực tế cơ sở';

    lightbox.classList.remove('hidden');
    lightbox.classList.add('flex');
    document.body.classList.add('overflow-hidden');

    if (window.lucide) window.lucide.createIcons();
  };

  window.closeRentalLightbox = function () {
    const lightbox = document.getElementById('rental-lightbox-modal');
    if (!lightbox) return;

    lightbox.classList.add('hidden');
    lightbox.classList.remove('flex');
    document.body.classList.remove('overflow-hidden');
  };

  // Đóng modal khi bấm phím ESC hoặc bấm ra ngoài nền xám
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      window.closeRentalContactModal();
      window.closeRentalLightbox();
    }
  });

  // Tự động khởi chạy khi DOM sẵn sàng
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initRentalTabs);
  } else {
    initRentalTabs();
  }

})();
