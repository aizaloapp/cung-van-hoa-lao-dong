/**
 * Main Application Logic - Cung Văn Hóa Lao Động Cơ Sở Bình Trưng
 */

document.addEventListener('DOMContentLoaded', () => {
  const data = window.CVHLD_DATA;
  if (!data || !data.courses) return;

  const coursesGrid = document.getElementById('courses-grid');
  const searchInput = document.getElementById('search-input');
  const filterButtons = document.querySelectorAll('.filter-btn');
  const courseCountBadge = document.getElementById('course-count-badge');
  const modal = document.getElementById('course-modal');
  const modalContent = document.getElementById('modal-body');
  const closeModalBtn = document.getElementById('close-modal-btn');
  const regForm = document.getElementById('consultation-form');
  const formSuccess = document.getElementById('form-success-toast');

  let activeCategory = 'all';
  let searchQuery = '';

  // Render course list
  function renderCourses() {
    if (!coursesGrid) return;

    const filtered = data.courses.filter(course => {
      const matchCategory = activeCategory === 'all' || course.category === activeCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchSearch = !q || 
        course.name.toLowerCase().includes(q) ||
        course.instructor.toLowerCase().includes(q) ||
        course.target.toLowerCase().includes(q) ||
        course.location.toLowerCase().includes(q);

      return matchCategory && matchSearch;
    });

    if (courseCountBadge) {
      courseCountBadge.textContent = `${filtered.length} lớp học`;
    }

    if (filtered.length === 0) {
      coursesGrid.innerHTML = `
        <div class="col-span-full py-16 text-center bg-white rounded-2xl border border-dashed border-slate-300">
          <i data-lucide="search-x" class="w-12 h-12 mx-auto text-slate-400 mb-3"></i>
          <h3 class="text-lg font-bold text-slate-700">Không tìm thấy lớp học phù hợp</h3>
          <p class="text-slate-500 text-sm mt-1">Vui lòng thử tìm với từ khóa khác hoặc liên hệ hotline <strong>${data.facility.hotlineDisplay}</strong> để được tư vấn xếp lớp.</p>
          <button onclick="resetFilters()" class="mt-4 px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition">
            Xem tất cả các lớp
          </button>
        </div>
      `;
      if (window.lucide) window.lucide.createIcons();
      return;
    }

    coursesGrid.innerHTML = filtered.map(course => {
      // Encode Zalo message
      const zaloMsg = encodeURIComponent(`Xin chào Cung Văn Hóa Lao Động Cơ Sở Bình Trưng, tôi muốn đăng ký tư vấn lớp: ${course.name} (${course.schedule})`);
      const zaloLink = `https://zalo.me/${data.facility.zalo}?text=${zaloMsg}`;

      // Badge style
      let badgeHtml = '';
      if (course.fee === 0) {
        badgeHtml = `<span class="badge-free text-white text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">Miễn Phí Học Phí</span>`;
      } else if (course.fee && course.fee <= 300000) {
        badgeHtml = `<span class="badge-union text-white text-xs font-bold px-2.5 py-1 rounded-full">Trợ Giá Công Đoàn</span>`;
      } else {
        badgeHtml = `<span class="bg-blue-900/80 backdrop-blur-sm text-white text-xs font-semibold px-2.5 py-1 rounded-full">${course.categoryName}</span>`;
      }

      return `
        <div class="course-card flex flex-col bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm hover:border-blue-400">
          <!-- Thumbnail & Badges -->
          <div class="relative overflow-hidden group">
            <img src="${course.coverImage}" alt="${course.name}" 
                 class="w-full aspect-card object-cover group-hover:scale-105 transition duration-500"
                 loading="lazy"
                 onerror="this.src='Cung-Van-Hoa-Lao-Dong-Co-So-Binh-Trung/Hinh-co-so-moi/1.jpg'" />
            <div class="absolute top-3 left-3 z-10">
              ${badgeHtml}
            </div>
            <div class="absolute bottom-3 right-3 bg-slate-900/85 backdrop-blur-md text-amber-300 font-extrabold text-sm px-3 py-1 rounded-lg border border-amber-400/30">
              ${course.feeFormatted}
            </div>
          </div>

          <!-- Body -->
          <div class="p-5 flex-1 flex flex-col justify-between">
            <div>
              <h3 class="font-bold text-slate-900 text-lg leading-snug hover:text-blue-600 transition cursor-pointer" onclick="openCourseModal('${course.id}')">
                ${course.name}
              </h3>
              <p class="text-xs text-blue-700 font-medium mt-1 flex items-center gap-1.5">
                <i data-lucide="user-check" class="w-3.5 h-3.5"></i> ${course.instructor}
              </p>

              <!-- Meta info -->
              <div class="mt-3.5 space-y-1.5 text-xs text-slate-600 border-t border-slate-100 pt-3">
                <div class="flex items-center gap-2">
                  <i data-lucide="clock" class="w-4 h-4 text-slate-400 shrink-0"></i>
                  <span class="font-medium text-slate-800">${course.schedule}</span>
                </div>
                <div class="flex items-center gap-2">
                  <i data-lucide="calendar" class="w-4 h-4 text-slate-400 shrink-0"></i>
                  <span>${course.frequency}</span>
                </div>
                <div class="flex items-center gap-2">
                  <i data-lucide="map-pin" class="w-4 h-4 text-slate-400 shrink-0"></i>
                  <span class="text-slate-700">${course.location}</span>
                </div>
              </div>
            </div>

            <!-- Actions -->
            <div class="mt-5 pt-3 border-t border-slate-100 grid grid-cols-2 gap-2">
              <button onclick="openCourseModal('${course.id}')" 
                      class="w-full py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl flex items-center justify-center gap-1.5 transition">
                <i data-lucide="info" class="w-3.5 h-3.5"></i> Chi tiết
              </button>
              <a href="${zaloLink}" target="_blank" rel="noopener noreferrer"
                 class="w-full py-2 px-3 bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-700 hover:to-sky-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-sm transition">
                <i data-lucide="message-circle" class="w-3.5 h-3.5"></i> Tư vấn Zalo
              </a>
            </div>
          </div>
        </div>
      `;
    }).join('');

    if (window.lucide) window.lucide.createIcons();
  }

  // Filter Click Handler
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => {
        b.classList.remove('bg-blue-600', 'text-white', 'shadow-md');
        b.classList.add('bg-white', 'text-slate-700', 'border', 'border-slate-200');
      });
      btn.classList.remove('bg-white', 'text-slate-700', 'border', 'border-slate-200');
      btn.classList.add('bg-blue-600', 'text-white', 'shadow-md');

      activeCategory = btn.getAttribute('data-category');
      renderCourses();
    });
  });

  // Search Input Handler with debounce
  if (searchInput) {
    let debounceTimer;
    searchInput.addEventListener('input', (e) => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        searchQuery = e.target.value;
        renderCourses();
      }, 200);
    });
  }

  // Reset Filters Helper
  window.resetFilters = function() {
    activeCategory = 'all';
    searchQuery = '';
    if (searchInput) searchInput.value = '';
    filterButtons.forEach(b => {
      if (b.getAttribute('data-category') === 'all') {
        b.click();
      }
    });
  };

  // Open Course Modal
  window.openCourseModal = function(courseId) {
    const course = data.courses.find(c => c.id === courseId);
    if (!course || !modal || !modalContent) return;

    const zaloMsg = encodeURIComponent(`Chào Cung Văn Hóa Lao Động Cơ Sở Bình Trưng, tôi muốn đăng ký xếp lớp môn ${course.name}. Xin tư vấn giúp tôi!`);
    const zaloLink = `https://zalo.me/${data.facility.zalo}?text=${zaloMsg}`;

    // Gallery images
    const imagesHtml = course.images.map(img => `
      <div class="rounded-xl overflow-hidden border border-slate-200">
        <img src="${img}" alt="${course.name}" class="w-full h-40 object-cover hover:scale-105 transition duration-300 cursor-pointer"
             onclick="window.open('${img}', '_blank')" />
      </div>
    `).join('');

    modalContent.innerHTML = `
      <div class="space-y-6">
        <!-- Title and Category -->
        <div class="border-b border-slate-100 pb-4">
          <div class="flex items-center gap-2 mb-2">
            <span class="bg-blue-100 text-blue-800 text-xs font-bold px-2.5 py-0.5 rounded-full">${course.categoryName}</span>
            <span class="text-xs text-slate-500 font-medium">Khai giảng Quý 4/2026</span>
          </div>
          <h2 class="text-2xl font-extrabold text-slate-900">${course.name}</h2>
          <p class="text-slate-600 text-sm mt-2 leading-relaxed">${course.description}</p>
        </div>

        <!-- Specifications Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5 bg-slate-50 p-4 rounded-2xl border border-slate-200/70">
          <div class="flex items-start gap-2.5">
            <i data-lucide="user-check" class="w-5 h-5 text-blue-600 shrink-0 mt-0.5"></i>
            <div>
              <div class="text-xs text-slate-500">Giáo viên phụ trách</div>
              <div class="text-sm font-bold text-slate-800">${course.instructor}</div>
              <div class="text-xs text-blue-600 font-semibold">${course.phone}</div>
            </div>
          </div>

          <div class="flex items-start gap-2.5">
            <i data-lucide="badge-dollar-sign" class="w-5 h-5 text-emerald-600 shrink-0 mt-0.5"></i>
            <div>
              <div class="text-xs text-slate-500">Mức học phí / Đơn giá</div>
              <div class="text-base font-extrabold text-emerald-600">${course.feeFormatted}</div>
              <div class="text-[11px] text-slate-500">Ưu đãi đoàn viên công đoàn</div>
            </div>
          </div>

          <div class="flex items-start gap-2.5">
            <i data-lucide="clock" class="w-5 h-5 text-blue-600 shrink-0 mt-0.5"></i>
            <div>
              <div class="text-xs text-slate-500">Khung giờ tập luyện</div>
              <div class="text-sm font-semibold text-slate-800">${course.schedule}</div>
              <div class="text-xs text-slate-500">${course.frequency} • ${course.duration}</div>
            </div>
          </div>

          <div class="flex items-start gap-2.5">
            <i data-lucide="map-pin" class="w-5 h-5 text-red-500 shrink-0 mt-0.5"></i>
            <div>
              <div class="text-xs text-slate-500">Địa điểm tập luyện</div>
              <div class="text-sm font-bold text-slate-800">${course.location}</div>
              <div class="text-xs text-slate-500">Số 245 Nguyễn Duy Trinh, P. Bình Trưng</div>
            </div>
          </div>
        </div>

        <!-- Target Audience -->
        <div class="bg-blue-50 border border-blue-200 rounded-xl p-3.5 flex items-start gap-3">
          <i data-lucide="users" class="w-5 h-5 text-blue-600 shrink-0 mt-0.5"></i>
          <div>
            <div class="text-xs font-bold text-blue-900 uppercase">Đối tượng tiếp nhận</div>
            <div class="text-sm text-blue-800 font-medium">${course.target}</div>
          </div>
        </div>

        <!-- Image Gallery -->
        <div>
          <h4 class="font-bold text-slate-800 text-sm mb-3 flex items-center gap-1.5">
            <i data-lucide="camera" class="w-4 h-4 text-slate-500"></i> Hình ảnh thực tế bộ môn
          </h4>
          <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
            ${imagesHtml}
          </div>
        </div>

        <!-- Call to Actions -->
        <div class="pt-4 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
          <a href="${zaloLink}" target="_blank" rel="noopener noreferrer"
             class="flex-1 py-3 px-5 bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-700 hover:to-sky-700 text-white font-bold text-sm rounded-xl text-center flex items-center justify-center gap-2 shadow-md transition">
            <i data-lucide="message-circle" class="w-4 h-4"></i> Đăng Ký Xếp Lớp Qua Zalo
          </a>
          <a href="tel:${data.facility.hotline}"
             class="py-3 px-5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl text-center flex items-center justify-center gap-2 shadow-md transition">
            <i data-lucide="phone-call" class="w-4 h-4"></i> Gọi Hotline ${data.facility.hotlineDisplay}
          </a>
        </div>
      </div>
    `;

    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';

    if (window.lucide) window.lucide.createIcons();
  };

  // Close Modal
  function closeModal() {
    if (!modal) return;
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = '';
  }

  if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  // Registration Form Submission Handler
  if (regForm) {
    // Populate select course options
    const selectEl = document.getElementById('form-course');
    if (selectEl) {
      selectEl.innerHTML = '<option value="">-- Chọn khóa học bạn quan tâm --</option>' +
        data.courses.map(c => `<option value="${c.name}">${c.name} (${c.feeFormatted})</option>`).join('');
    }

    regForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('form-name')?.value || '';
      const phone = document.getElementById('form-phone')?.value || '';
      const course = document.getElementById('form-course')?.value || 'Tư vấn chung';
      const note = document.getElementById('form-note')?.value || '';

      // Save to localStorage
      try {
        const history = JSON.parse(localStorage.getItem('cvhld_registrations') || '[]');
        history.push({ name, phone, course, note, timestamp: new Date().toISOString() });
        localStorage.setItem('cvhld_registrations', JSON.stringify(history));
      } catch (err) {
        console.warn('LocalStorage error', err);
      }

      // Pre-filled Zalo message
      const msg = encodeURIComponent(`[ĐĂNG KÝ GHI DANH ONLINE]\n- Họ tên: ${name}\n- SĐT: ${phone}\n- Khóa học quan tâm: ${course}\n- Ghi chú: ${note}`);
      const zaloUrl = `https://zalo.me/${data.facility.zalo}?text=${msg}`;

      // Show toast notification
      if (formSuccess) {
        formSuccess.classList.remove('hidden');
        setTimeout(() => {
          formSuccess.classList.add('hidden');
        }, 5000);
      }

      // Reset form & Open Zalo
      regForm.reset();
      window.open(zaloUrl, '_blank');
    });
  }

  // Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    document.querySelectorAll('#mobile-menu a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }

  // Initial render
  renderCourses();
  if (window.lucide) window.lucide.createIcons();
});
