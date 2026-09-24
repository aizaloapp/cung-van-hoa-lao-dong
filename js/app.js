/**
 * Main Application Logic - Cung Văn Hóa Lao Động Cơ Sở Bình Trưng
 * Tích hợp tìm kiếm live, gợi ý từ khóa, bộ lọc đa năng, chuyển đổi thời khóa biểu, photo viewer modal và FAQ
 */

document.addEventListener('DOMContentLoaded', () => {
  const data = window.CVHLD_DATA;
  if (!data || !data.courses) return;

  const coursesGrid = document.getElementById('courses-grid');
  const timetableContainer = document.getElementById('timetable-container');
  const searchInput = document.getElementById('search-input');
  const clearSearchBtn = document.getElementById('clear-search-btn');
  const filterButtons = document.querySelectorAll('.filter-btn');
  const courseCountBadge = document.getElementById('course-count-badge');
  const modal = document.getElementById('course-modal');
  const modalContent = document.getElementById('modal-body');
  const closeModalBtn = document.getElementById('close-modal-btn');
  const regForm = document.getElementById('consultation-form');
  const formSuccess = document.getElementById('form-success-toast');
  const backToTopBtn = document.getElementById('back-to-top');

  // View Switcher Buttons
  const btnViewCards = document.getElementById('btn-view-cards');
  const btnViewTimetable = document.getElementById('btn-view-timetable');
  let currentView = 'cards'; // 'cards' | 'timetable'

  let activeCategory = 'all';
  let searchQuery = '';

  const courseArticleMap = {
    'nhay-hien-dai-thieu-nhi': 'lop-hoc/nhay-hien-dai-thieu-nhi/',
    'yoga-tri-lieu': 'lop-hoc/yoga-tri-lieu/',
    'ban-cung': 'lop-hoc/ban-cung/',
    'boxing-kids-nguoi-lon': 'lop-hoc/boxing-kids-nguoi-lon/',
    'yoga-song-khoe-1': 'lop-hoc/yoga-song-khoe-1/',
    'lan-su-rong': 'lop-hoc/lan-su-rong/',
    'mua-dan-vu': 'lop-hoc/mua-dan-vu/',
    'yoga-song-khoe-2': 'lop-hoc/yoga-song-khoe-2/',
    'taekwondo': 'lop-hoc/taekwondo/',
    'yoga-an-do': 'lop-hoc/yoga-an-do/',
    'dance-kids-ballet-kids': 'lop-hoc/dance-kids-ballet-kids/',
    'bong-ro': 'lop-hoc/bong-ro/',
    'patin': 'lop-hoc/patin/',
    'cau-long': 'lop-hoc/cau-long/',
    'bong-da': 'lop-hoc/bong-da/'
  };

  // Filter courses logic
  function getFilteredCourses() {
    return data.courses.filter(course => {
      const matchCategory = activeCategory === 'all' || course.category === activeCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchSearch = !q || 
        course.name.toLowerCase().includes(q) ||
        course.instructor.toLowerCase().includes(q) ||
        course.target.toLowerCase().includes(q) ||
        course.schedule.toLowerCase().includes(q) ||
        course.location.toLowerCase().includes(q) ||
        (q === 'miễn phí' && course.fee === 0);

      return matchCategory && matchSearch;
    });
  }

  // Render course list (Card Grid)
  function renderCourses() {
    if (!coursesGrid) return;

    const filtered = getFilteredCourses();

    if (courseCountBadge) {
      courseCountBadge.textContent = `${filtered.length} lớp học`;
    }

    // Toggle clear search button
    if (clearSearchBtn) {
      if (searchQuery) {
        clearSearchBtn.classList.remove('hidden');
      } else {
        clearSearchBtn.classList.add('hidden');
      }
    }

    if (filtered.length === 0) {
      coursesGrid.innerHTML = `
        <div class="col-span-full py-16 text-center bg-white rounded-3xl border border-dashed border-slate-300 p-8 shadow-sm">
          <div class="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-3">
            <i data-lucide="search-x" class="w-8 h-8"></i>
          </div>
          <h3 class="text-lg font-bold text-slate-800">Không tìm thấy lớp học phù hợp với từ khóa "${searchQuery}"</h3>
          <p class="text-slate-500 text-sm mt-1 max-w-md mx-auto">Vui lòng thử tìm với từ khóa khác hoặc liên hệ bộ phận tiếp nhận qua Hotline / Zalo <strong>${data.facility.hotlineDisplay}</strong> để được hỗ trợ xếp lớp ngay.</p>
          <button onclick="resetFilters()" class="mt-5 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition shadow-md">
            Xem lại tất cả 15 lớp học
          </button>
        </div>
      `;
      if (window.lucide) window.lucide.createIcons();
      return;
    }

    coursesGrid.innerHTML = filtered.map(course => {
      const instructorPhone = course.phone ? course.phone.replace(/\D/g, '') : data.facility.zalo;
      const zaloMsg = encodeURIComponent(`Xin chào ${course.instructor}, tôi muốn đăng ký tư vấn lớp: ${course.name} (${course.schedule})`);
      const zaloLink = `https://zalo.me/${instructorPhone}?text=${zaloMsg}`;

      let badgeHtml = '';
      if (course.fee === 0) {
        badgeHtml = `<span class="badge-free text-white text-[11px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">Miễn Phí Học Phí</span>`;
      } else if (course.fee && course.fee <= 300000) {
        badgeHtml = `<span class="badge-union text-white text-[11px] font-extrabold px-2.5 py-1 rounded-full">Trợ Giá Công Đoàn</span>`;
      } else {
        badgeHtml = `<span class="bg-blue-900/85 backdrop-blur-sm text-white text-[11px] font-semibold px-2.5 py-1 rounded-full">${course.categoryName}</span>`;
      }

      const articleUrl = courseArticleMap[course.id] || '#';

      return `
        <div class="course-card flex flex-col bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-sm hover:border-blue-400 hover:shadow-md transition">
          <!-- Thumbnail & Badges - Click to Article -->
          <a href="${articleUrl}" class="relative overflow-hidden group block cursor-pointer" title="Đọc bài viết chi tiết ${course.name}">
            <img src="${course.coverImage}" alt="${course.name}" 
                 class="w-full aspect-card object-cover group-hover:scale-105 transition duration-500"
                 loading="lazy"
                 onerror="this.src='Cung-Van-Hoa-Lao-Dong-Co-So-Binh-Trung/Hinh-co-so-moi/1.jpg'" />
            <div class="absolute top-3 left-3 z-10 flex gap-1.5 flex-wrap">
              ${badgeHtml}
            </div>
            <div class="absolute bottom-3 right-3 bg-slate-900/90 backdrop-blur-md text-amber-300 font-black text-xs sm:text-sm px-3 py-1 rounded-xl border border-amber-400/30 shadow-lg">
              ${course.feeFormatted}
            </div>
          </a>

          <!-- Body -->
          <div class="p-5 flex-1 flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between gap-2 mb-1.5">
                <span class="text-[11px] text-blue-700 font-bold uppercase tracking-wider">${course.categoryName}</span>
                <span class="text-[11px] text-slate-400 font-medium">${course.duration}</span>
              </div>
              <h3 class="font-extrabold text-slate-900 text-lg leading-snug hover:text-blue-600 transition">
                <a href="${articleUrl}" class="hover:underline flex items-start justify-between group gap-2" title="Đọc bài viết chi tiết ${course.name}">
                  <span>${course.name}</span>
                  <i data-lucide="arrow-up-right" class="w-4 h-4 text-slate-400 group-hover:text-blue-600 shrink-0 mt-1 transition"></i>
                </a>
              </h3>
              <p class="text-xs text-slate-600 font-semibold mt-1 flex items-center gap-1.5">
                <i data-lucide="user-check" class="w-3.5 h-3.5 text-blue-600"></i> ${course.instructor}
              </p>

              <!-- Meta info -->
              <div class="mt-3.5 space-y-2 text-xs text-slate-600 border-t border-slate-100 pt-3">
                <div class="flex items-start gap-2">
                  <i data-lucide="clock" class="w-4 h-4 text-blue-500 shrink-0 mt-0.5"></i>
                  <span class="font-semibold text-slate-800">${course.schedule}</span>
                </div>
                <div class="flex items-center gap-2">
                  <i data-lucide="calendar" class="w-4 h-4 text-slate-400 shrink-0"></i>
                  <span>${course.frequency}</span>
                </div>
                <div class="flex items-center gap-2">
                  <i data-lucide="map-pin" class="w-4 h-4 text-red-500 shrink-0"></i>
                  <span class="text-slate-700">${course.location}</span>
                </div>
              </div>
            </div>

            <!-- Actions -->
            <div class="mt-5 pt-3.5 border-t border-slate-100 flex flex-col gap-2">
              <a href="${articleUrl}" 
                 class="w-full py-2.5 px-3 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300/90 font-extrabold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-sm transition transform hover:-translate-y-0.5">
                <i data-lucide="book-open" class="w-3.5 h-3.5 text-amber-600"></i> Đọc bài viết giới thiệu chi tiết &rarr;
              </a>
              <div class="grid grid-cols-2 gap-2">
                <button onclick="openCourseModal('${course.id}')" 
                        class="w-full py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition">
                  <i data-lucide="eye" class="w-3.5 h-3.5 text-slate-500"></i> Xem nhanh
                </button>
                <a href="${zaloLink}" target="_blank" rel="noopener noreferrer"
                   class="w-full py-2.5 px-3 bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-700 hover:to-sky-700 text-white font-extrabold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-sm transition">
                  <i data-lucide="message-circle" class="w-3.5 h-3.5"></i> Tư vấn Zalo
                </a>
              </div>
            </div>
          </div>
        </div>
      `;
    }).join('');

    if (window.lucide) window.lucide.createIcons();
  }

  // Render Weekly Timetable Matrix
  function renderTimetable() {
    if (!timetableContainer) return;

    // Filter into 4 time blocks
    const morningCourses = data.courses.filter(c => 
      c.schedule.includes('05:00') || c.schedule.includes('06:00') || c.schedule.includes('07:30') || c.schedule.includes('08:00')
    );

    const afternoonCourses = data.courses.filter(c => 
      c.schedule.includes('15:00') || c.schedule.includes('16:00') || c.schedule.includes('16:30') || c.schedule.includes('14:30')
    );

    const eveningCourses = data.courses.filter(c => 
      c.schedule.includes('17:00') || c.schedule.includes('18:00') || c.schedule.includes('18:30')
    );

    const allDayCourses = data.courses.filter(c => 
      c.schedule.includes('06:00 - 22:00') || c.schedule.includes('Theo lịch')
    );

    function renderTimeBlock(title, iconColor, iconName, courses, badgeText) {
      return `
        <div class="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm mb-6">
          <div class="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
            <div class="flex items-center gap-2.5">
              <div class="p-2.5 rounded-xl ${iconColor} flex items-center justify-center">
                <i data-lucide="${iconName}" class="w-5 h-5"></i>
              </div>
              <div>
                <h4 class="font-extrabold text-slate-900 text-base sm:text-lg">${title}</h4>
                <div class="text-xs text-slate-500">${badgeText}</div>
              </div>
            </div>
            <span class="text-xs font-bold bg-slate-100 text-slate-700 px-3 py-1 rounded-full">${courses.length} bộ môn</span>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            ${courses.map(course => `
              <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 hover:border-blue-400 transition flex flex-col justify-between">
                <div>
                  <div class="flex justify-between items-start gap-2">
                    <span class="text-[11px] font-bold text-blue-700 uppercase">${course.categoryName}</span>
                    <span class="text-xs font-extrabold text-emerald-600">${course.feeFormatted}</span>
                  </div>
                  <h5 class="font-bold text-slate-900 text-sm mt-1 hover:text-blue-600 transition">
                    <a href="${courseArticleMap[course.id] || '#'}" class="hover:underline flex items-center justify-between gap-1.5" title="Đọc bài viết chi tiết ${course.name}">
                      <span>${course.name}</span>
                      <i data-lucide="arrow-up-right" class="w-3.5 h-3.5 text-slate-400 shrink-0"></i>
                    </a>
                  </h5>
                  <div class="mt-2.5 space-y-1 text-xs text-slate-600">
                    <div class="flex items-center gap-1.5 font-semibold text-slate-800">
                      <i data-lucide="clock" class="w-3.5 h-3.5 text-blue-500"></i> ${course.schedule}
                    </div>
                    <div class="flex items-center gap-1.5 text-slate-500">
                      <i data-lucide="calendar" class="w-3.5 h-3.5"></i> ${course.frequency}
                    </div>
                    <div class="flex items-center gap-1.5 text-slate-500">
                      <i data-lucide="user" class="w-3.5 h-3.5"></i> ${course.instructor}
                    </div>
                  </div>
                </div>

                <div class="mt-3.5 pt-2.5 border-t border-slate-200/60 flex items-center justify-between">
                  <button onclick="openCourseModal('${course.id}')" class="text-xs font-semibold text-slate-500 hover:text-slate-800 transition flex items-center gap-1">
                    <i data-lucide="eye" class="w-3.5 h-3.5"></i> Xem nhanh
                  </button>
                  <a href="${courseArticleMap[course.id] || '#'}" class="text-xs font-extrabold text-blue-600 hover:text-blue-800 transition flex items-center gap-1">
                    Bài viết chi tiết &rarr;
                  </a>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    timetableContainer.innerHTML = `
      ${renderTimeBlock('Ca Sáng Sớm (05:00 — 09:10)', 'bg-amber-100 text-amber-700', 'sunrise', morningCourses, 'Khởi đầu ngày mới giàu năng lượng, phù hợp người lao động & người cao tuổi')}
      ${renderTimeBlock('Ca Chiều (15:00 — 17:30)', 'bg-sky-100 text-sky-700', 'sun', afternoonCourses, 'Giờ tập thể thao ngoài trời, bắn cung & câu lạc bộ thanh thiếu nhi')}
      ${renderTimeBlock('Ca Tối (18:00 — 21:00)', 'bg-indigo-100 text-indigo-700', 'moon', eveningCourses, 'Khung giờ vàng sau giờ tan ca và tan học, rèn luyện thể lực & xả stress')}
      ${renderTimeBlock('Cụm Sân Bãi Mở Cửa Suốt Tuần (06:00 — 22:00)', 'bg-emerald-100 text-emerald-700', 'zap', allDayCourses, 'Cụm 6 sân cầu lông thảm PVC và sân bóng đá, nhận đặt sân theo giờ & hội viên')}
    `;

    if (window.lucide) window.lucide.createIcons();
  }

  // View Switcher Handlers
  if (btnViewCards && btnViewTimetable) {
    btnViewCards.addEventListener('click', () => {
      currentView = 'cards';
      btnViewCards.classList.remove('bg-white', 'text-slate-700', 'border');
      btnViewCards.classList.add('bg-blue-600', 'text-white', 'shadow-sm');
      btnViewTimetable.classList.remove('bg-blue-600', 'text-white', 'shadow-sm');
      btnViewTimetable.classList.add('bg-white', 'text-slate-700', 'border');

      coursesGrid.classList.remove('hidden');
      timetableContainer.classList.add('hidden');
      renderCourses();
    });

    btnViewTimetable.addEventListener('click', () => {
      currentView = 'timetable';
      btnViewTimetable.classList.remove('bg-white', 'text-slate-700', 'border');
      btnViewTimetable.classList.add('bg-blue-600', 'text-white', 'shadow-sm');
      btnViewCards.classList.remove('bg-blue-600', 'text-white', 'shadow-sm');
      btnViewCards.classList.add('bg-white', 'text-slate-700', 'border');

      coursesGrid.classList.add('hidden');
      timetableContainer.classList.remove('hidden');
      renderTimetable();
    });
  }

  // Filter Buttons Click
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

  // Search Input with Debounce
  if (searchInput) {
    let debounceTimer;
    searchInput.addEventListener('input', (e) => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        searchQuery = e.target.value;
        renderCourses();
      }, 150);
    });
  }

  // Clear search button
  if (clearSearchBtn) {
    clearSearchBtn.addEventListener('click', () => {
      if (searchInput) searchInput.value = '';
      searchQuery = '';
      renderCourses();
      if (searchInput) searchInput.focus();
    });
  }

  // Quick Suggestion Pills
  window.setQuickSearch = function(keyword) {
    if (searchInput) {
      searchInput.value = keyword;
      searchQuery = keyword;
      renderCourses();
      // Switch back to cards view if in timetable
      if (currentView === 'timetable' && btnViewCards) {
        btnViewCards.click();
      }
    }
  };

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

  // Modal Interactive Photo Viewer
  window.openCourseModal = function(courseId) {
    const course = data.courses.find(c => c.id === courseId);
    if (!course || !modal || !modalContent) return;

    const instructorPhone = course.phone ? course.phone.replace(/\D/g, '') : data.facility.zalo;
    const zaloMsg = encodeURIComponent(`Chào ${course.instructor}, tôi muốn đăng ký xếp lớp môn ${course.name}. Xin tư vấn giúp tôi!`);
    const zaloLink = `https://zalo.me/${instructorPhone}?text=${zaloMsg}`;

    // Active main image
    let currentMainImg = course.coverImage;

    modalContent.innerHTML = `
      <div class="space-y-6">
        <!-- Header -->
        <div class="border-b border-slate-100 pb-4 pr-10">
          <div class="flex items-center gap-2 mb-2 flex-wrap">
            <span class="bg-blue-100 text-blue-800 text-xs font-bold px-2.5 py-0.5 rounded-full">${course.categoryName}</span>
            <span class="bg-emerald-100 text-emerald-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">Khai giảng Quý 4/2026</span>
          </div>
          <h2 class="text-2xl font-black text-slate-900 tracking-tight leading-snug">${course.name}</h2>
          <p class="text-slate-600 text-sm mt-2 leading-relaxed">${course.description}</p>
        </div>

        <!-- Interactive Photo Gallery -->
        <div>
          <div class="rounded-2xl overflow-hidden border border-slate-200 bg-slate-900 mb-3 relative group">
            <img id="modal-main-image" src="${currentMainImg}" alt="${course.name}" 
                 class="w-full h-64 sm:h-80 object-cover transition duration-300">
            <div class="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-semibold px-3 py-1 rounded-lg">
              <i data-lucide="image" class="w-3.5 h-3.5 inline mr-1"></i> Bấm ảnh nhỏ bên dưới để chuyển đổi góc nhìn
            </div>
          </div>

          <!-- Thumbnails Strip -->
          <div class="grid grid-cols-4 sm:grid-cols-5 gap-2">
            ${course.images.map((img, idx) => `
              <div onclick="switchModalImage('${img}', this)" 
                   class="modal-thumb-box cursor-pointer rounded-xl overflow-hidden border-2 ${idx === 0 ? 'modal-thumb-active' : 'border-slate-200'} hover:border-blue-400 transition">
                <img src="${img}" alt="${course.name} ${idx + 1}" class="w-full h-16 object-cover" />
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Specifications Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5 bg-slate-50 p-4 rounded-2xl border border-slate-200/70">
          <div class="flex items-start gap-2.5">
            <i data-lucide="user-check" class="w-5 h-5 text-blue-600 shrink-0 mt-0.5"></i>
            <div>
              <div class="text-xs text-slate-500">Giáo viên phụ trách</div>
              <div class="text-sm font-bold text-slate-800">${course.instructor}</div>
              <a href="tel:${course.phone}" class="text-xs text-blue-600 font-semibold hover:underline">SĐT: ${course.phone}</a>
            </div>
          </div>

          <div class="flex items-start gap-2.5">
            <i data-lucide="badge-dollar-sign" class="w-5 h-5 text-emerald-600 shrink-0 mt-0.5"></i>
            <div>
              <div class="text-xs text-slate-500">Mức học phí / Đơn giá</div>
              <div class="text-base font-black text-emerald-600">${course.feeFormatted}</div>
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
              <div class="text-xs text-slate-500">Địa điểm phòng tập</div>
              <div class="text-sm font-bold text-slate-800">${course.location}</div>
              <div class="text-xs text-slate-500">Số 245 Nguyễn Duy Trinh, P. Bình Trưng</div>
            </div>
          </div>
        </div>

        <!-- Target Audience -->
        <div class="bg-blue-50 border border-blue-200 rounded-2xl p-4 flex items-start gap-3">
          <i data-lucide="users" class="w-5 h-5 text-blue-600 shrink-0 mt-0.5"></i>
          <div>
            <div class="text-xs font-bold text-blue-900 uppercase">Đối tượng tiếp nhận</div>
            <div class="text-sm text-blue-800 font-medium mt-0.5">${course.target}</div>
          </div>
        </div>

        ${courseArticleMap[course.id] ? `
          <!-- Article Link Highlight -->
          <div class="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/90 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-sm">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold shrink-0 shadow-sm">
                <i data-lucide="book-open" class="w-5 h-5"></i>
              </div>
              <div class="text-left">
                <div class="text-sm font-extrabold text-slate-900">Bài viết chi tiết & kinh nghiệm học</div>
                <div class="text-xs text-slate-600 mt-0.5">Khám phá câu chuyện học viên, hướng dẫn và hình ảnh lớp học</div>
              </div>
            </div>
            <a href="${courseArticleMap[course.id]}" class="w-full sm:w-auto px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-xs rounded-xl shadow-md transition text-center shrink-0">
              Đọc bài viết →
            </a>
          </div>
        ` : ''}

        <!-- Action Buttons -->
        <div class="pt-4 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
          <a href="${zaloLink}" target="_blank" rel="noopener noreferrer"
             class="flex-1 py-3 px-5 bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-700 hover:to-sky-700 text-white font-extrabold text-sm rounded-xl text-center flex items-center justify-center gap-2 shadow-md transition">
            <i data-lucide="message-circle" class="w-4 h-4"></i> Nhắn Zalo ${course.instructor}
          </a>
          <a href="tel:${instructorPhone}"
             class="py-3 px-5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm rounded-xl text-center flex items-center justify-center gap-2 shadow-md transition">
            <i data-lucide="phone-call" class="w-4 h-4"></i> Gọi ${course.instructor}: ${course.phone}
          </a>
        </div>
      </div>
    `;

    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';

    if (window.lucide) window.lucide.createIcons();
  };

  // Switch Modal Main Image
  window.switchModalImage = function(imgSrc, element) {
    const mainImg = document.getElementById('modal-main-image');
    if (mainImg) {
      mainImg.style.opacity = '0.5';
      setTimeout(() => {
        mainImg.src = imgSrc;
        mainImg.style.opacity = '1';
      }, 100);
    }
    // Update active thumb border
    document.querySelectorAll('.modal-thumb-box').forEach(b => b.classList.remove('modal-thumb-active'));
    if (element) element.classList.add('modal-thumb-active');
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

  // FAQ Accordion Handler
  document.querySelectorAll('.faq-header').forEach(header => {
    header.addEventListener('click', () => {
      const parent = header.closest('.faq-item');
      const isActive = parent.classList.contains('active');

      // Close all others
      document.querySelectorAll('.faq-item').forEach(item => item.classList.remove('active'));

      // Toggle current
      if (!isActive) {
        parent.classList.add('active');
      }
    });
  });

  // Registration Form
  if (regForm) {
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

      try {
        const history = JSON.parse(localStorage.getItem('cvhld_registrations') || '[]');
        history.push({ name, phone, course, note, timestamp: new Date().toISOString() });
        localStorage.setItem('cvhld_registrations', JSON.stringify(history));
      } catch (err) {
        console.warn('LocalStorage error', err);
      }

      const msg = encodeURIComponent(`[ĐĂNG KÝ GHI DANH ONLINE]\n- Họ tên: ${name}\n- SĐT: ${phone}\n- Khóa học quan tâm: ${course}\n- Ghi chú: ${note}`);
      const zaloUrl = `https://zalo.me/${data.facility.zalo}?text=${msg}`;

      if (formSuccess) {
        formSuccess.classList.remove('hidden');
        setTimeout(() => {
          formSuccess.classList.add('hidden');
        }, 6000);
      }

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

  // Back to Top Button
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Initial render
  renderCourses();
  renderTimetable();
  if (window.lucide) window.lucide.createIcons();
});
