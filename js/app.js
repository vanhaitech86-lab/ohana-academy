// ============================================================
// OHANA Academy – Main Application Logic
// ============================================================

// ─── Hero Slider ──────────────────────────────────────────────
let sliderIndex = 0;
let sliderTimer = null;

function initSlider() {
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.hero-dot');
  if (!slides.length) return;

  function goTo(idx) {
    slides.forEach((s, i) => s.classList.toggle('active', i === idx));
    dots.forEach((d, i) => d.classList.toggle('active', i === idx));
    sliderIndex = idx;
  }

  function next() {
    goTo((sliderIndex + 1) % slides.length);
  }
  function prev() {
    goTo((sliderIndex - 1 + slides.length) % slides.length);
  }

  const nextBtn = document.getElementById('sliderNext');
  const prevBtn = document.getElementById('sliderPrev');

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      clearInterval(sliderTimer);
      next();
      sliderTimer = setInterval(next, 5000);
    });
  }
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      clearInterval(sliderTimer);
      prev();
      sliderTimer = setInterval(next, 5000);
    });
  }

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      clearInterval(sliderTimer);
      goTo(i);
      sliderTimer = setInterval(next, 5000);
    });
  });

  sliderTimer = setInterval(next, 5500);
  goTo(0);
}

// ─── Course Card Builder ───────────────────────────────────────
function buildCourseCard(course, currentUser) {
  const category = CategoryDB.getById(course.categoryId);
  const catName = window.I18n ? window.I18n.getCategoryName(category) : (category ? category.name : 'Khóa học');
  const catColor = category ? category.color : '#1e3a8a';
  const catIcon = category ? category.icon : '📚';

  const enrolled = currentUser ? EnrollmentDB.isEnrolled(currentUser.id, course.id) : false;
  const progress = currentUser ? ProgressDB.get(currentUser.id, course.id) : { completedLessons: [] };
  const pct = Math.round((progress.completedLessons.length / Math.max(course.totalLessons, 1)) * 100);
  const levelColor = LEVEL_COLORS[course.level] || '#10b981';
  const levelText = window.I18n ? window.I18n.getLevelLabel(course.level) : course.level;

  const isPaid = course.priceType === 'paid' || (course.price && course.price > 0);
  const hasCert = !!course.hasCertificate;

  const badgeCertText = window.I18n ? window.I18n.t('badge_cert') : '🎓 Cấp chứng chỉ';
  const badgeFreeText = window.I18n ? window.I18n.t('badge_free') : '🎁 Miễn phí';
  const badgeWithCertText = window.I18n ? window.I18n.t('badge_with_cert') : '🎖️ Kèm Chứng chỉ tốt nghiệp';
  const priceFreeText = window.I18n ? window.I18n.t('price_free') : '🎁 Miễn phí 100%';
  const lessonsCountText = window.I18n ? window.I18n.t('lessons_count') : 'bài giảng';
  const studentsCountText = window.I18n ? window.I18n.t('students_count') : 'học viên';
  const ctaText = enrolled ? (window.I18n ? window.I18n.t('btn_continue') : '▶ Tiếp tục học') : (window.I18n ? window.I18n.t('btn_details') : 'Chi tiết khóa học');
  const progressText = window.I18n ? window.I18n.t('progress_label') : 'Tiến độ học tập';

  return `
    <div class="course-card fade-in-up" onclick="window.location='course-detail.html?id=${course.id}'">
      <div class="course-thumb">
        ${course.thumbnail ? `
          <img src="${course.thumbnail}" alt="${course.title}" style="width:100%;height:100%;object-fit:cover;">
        ` : `
          <div style="width:100%;height:100%;background:linear-gradient(135deg, ${catColor}, #0f172a);display:flex;align-items:center;justify-content:center;font-size:56px;color:white;">
            ${catIcon}
          </div>
        `}
        <div class="course-thumb-overlay"></div>
        <div class="course-play-btn">▶</div>
        
        <!-- Badges on Thumbnail -->
        ${isPaid || hasCert ? `
          <span class="course-type-badge cert">${badgeCertText}</span>
        ` : `
          <span class="course-type-badge free">${badgeFreeText}</span>
        `}
        <span class="course-level-badge" style="background:${levelColor};color:white;">${levelText}</span>
      </div>
      <div class="course-body">
        <div class="course-category" style="color:${catColor}">${catName}</div>
        <div class="course-title" title="${course.title}">${course.title}</div>
        <div class="course-instructor">👨‍🏫 ${course.instructor}</div>

        <!-- Pricing & Certificate Badges -->
        ${hasCert ? `<div class="course-cert-pill">${badgeWithCertText}</div>` : ''}

        <div class="course-pricing-row">
          ${isPaid ? `
            <span class="course-price-val">${window.formatMoney ? window.formatMoney(course.price) : course.price + ' đ'}</span>
            ${course.originalPrice ? `<span class="course-price-orig">${window.formatMoney ? window.formatMoney(course.originalPrice) : ''}</span>` : ''}
          ` : `
            <span class="course-price-val free">${priceFreeText}</span>
            ${course.originalPrice ? `<span class="course-price-orig">${window.formatMoney ? window.formatMoney(course.originalPrice) : ''}</span>` : ''}
          `}
        </div>

        <div class="course-meta">
          <div class="course-meta-item"><span>⏱</span> ${course.duration}</div>
          <div class="course-meta-item"><span>📚</span> ${course.totalLessons} ${lessonsCountText}</div>
        </div>
        <div class="course-rating">
          <span class="stars">${generateStars(course.rating)}</span>
          <span class="rating-val">${course.rating}</span>
        </div>

        ${enrolled && pct > 0 ? `
          <div style="margin-top:10px;margin-bottom:6px;">
            <div style="font-size:11px;color:var(--gray-500);display:flex;justify-content:space-between;margin-bottom:4px;">
              <span>${progressText}</span>
              <strong style="color:var(--ohana-orange);">${pct}%</strong>
            </div>
            <div class="progress-bar">
              <div class="progress-fill" style="width:${pct}%"></div>
            </div>
          </div>
        ` : ''}

        <div class="course-footer">
          <span class="course-enroll-count">👥 ${course.enrollCount || 0} ${studentsCountText}</span>
          <span class="course-cta ${enrolled ? 'enrolled' : ''}">
            ${ctaText}
          </span>
        </div>
      </div>
    </div>`;
}

// ─── Render Course Grid ────────────────────────────────────────
function renderCourseGrid(courses, user) {
  const grid = document.getElementById('coursesGrid');
  if (!grid) return;

  if (!courses.length) {
    const emptyTitle = window.I18n ? window.I18n.t('empty_courses_title') : 'Chưa có khóa học phù hợp';
    const emptyDesc = window.I18n ? window.I18n.t('empty_courses_desc') : 'Không tìm thấy khóa học nào trong danh mục hoặc tiêu chí tìm kiếm này.';
    grid.innerHTML = `
      <div class="empty-state" style="grid-column: 1 / -1;">
        <div class="empty-icon">📂</div>
        <div class="empty-title">${emptyTitle}</div>
        <div class="empty-desc">${emptyDesc}</div>
      </div>`;
    return;
  }
  grid.innerHTML = courses.map(c => buildCourseCard(c, user)).join('');
}

// ─── Filter Courses on Homepage ────────────────────────────────
window.filterCourses = function(catId, el) {
  document.querySelectorAll('.cat-item').forEach(i => i.classList.remove('active'));
  if (el) el.classList.add('active');

  const user = Auth.getCurrentUser();
  const allCourses = user ? CourseDB.getByRole(user.role) : CourseDB.getAll().filter(c => c.status === 'active');

  let filtered = allCourses;
  if (catId === 'all') {
    filtered = allCourses;
  } else if (catId === '7' || catId === 'free') {
    filtered = allCourses.filter(c => c.priceType === 'free' || c.categoryId === 7 || (!c.priceType && (!c.price || c.price === 0)));
  } else if (catId === '8' || catId === 'paid-cert' || catId === 'paid') {
    filtered = allCourses.filter(c => c.priceType === 'paid' || c.hasCertificate || c.categoryId === 8);
  } else {
    filtered = allCourses.filter(c => c.categoryId === parseInt(catId));
  }

  renderCourseGrid(filtered, user);
};

// ─── Load Homepage ─────────────────────────────────────────────
function loadHomepage() {
  const user = Auth.getCurrentUser();
  const allCourses = user ? CourseDB.getByRole(user.role) : CourseDB.getAll().filter(c => c.status === 'active');
  const categories = CategoryDB.getAll();

  // Category bar
  const catBar = document.getElementById('categoryBar');
  if (catBar) {
    const specialCats = categories.filter(c => c.id === 7 || c.id === 8);
    const standardCats = categories.filter(c => c.id !== 7 && c.id !== 8);
    const orderedCats = [...specialCats, ...standardCats];

    catBar.innerHTML = `
      <div class="cat-item active" data-cat="all" onclick="filterCourses('all', this)">
        <span class="cat-icon">🌟</span>
        <span class="cat-label">${window.I18n ? window.I18n.t('cat_all') : 'Tất cả khóa học'}</span>
      </div>
      ${orderedCats.map(c => `
        <div class="cat-item" data-cat="${c.id}" onclick="filterCourses('${c.id}', this)">
          <span class="cat-icon">${c.icon}</span>
          <span class="cat-label">${window.I18n ? window.I18n.getCategoryName(c) : c.name}</span>
        </div>
      `).join('')}`;
  }

  // Render course cards
  renderCourseGrid(allCourses, user);

  // Render Official YouTube Videos Showcase
  renderYtVideos();

  // Live Stats Counter
  const totalCourses = CourseDB.getAll().length;
  const totalUsers = UserDB.getAll().length;
  const totalResults = ResultDB.getAll().length;

  const statC = document.getElementById('statCourses');
  const statU = document.getElementById('statUsers');
  const statR = document.getElementById('statResults');

  if (statC) statC.textContent = totalCourses;
  if (statU) statU.textContent = totalUsers;
  if (statR) statR.textContent = totalResults;
}

// ─── Render Official YouTube Videos ────────────────────────────
function renderYtVideos() {
  const container = document.getElementById('ytVideosGrid');
  if (!container || !window.OFFICIAL_YOUTUBE_VIDEOS) return;

  container.innerHTML = window.OFFICIAL_YOUTUBE_VIDEOS.map(v => `
    <div class="yt-video-card fade-in-up" onclick="window.location='lesson.html?course=${v.courseId}&lesson=${v.lessonId}'">
      <div class="yt-video-thumb-wrap">
        <img src="${v.thumbnail}" alt="${v.title}" class="yt-video-thumb" loading="lazy">
        <div class="yt-video-overlay">
          <div class="yt-play-icon">▶</div>
        </div>
        <span class="yt-video-duration">${v.duration}</span>
        <span class="yt-video-badge">Ohana SOP</span>
      </div>
      <div class="yt-video-info">
        <div class="yt-video-category">${v.category}</div>
        <div class="yt-video-title" title="${v.title}">${v.title}</div>
        <div class="yt-video-footer">
          <span class="yt-channel-tag">📺 Ohana Astronixa VN</span>
          <span class="yt-watch-cta">Xem bài học →</span>
        </div>
      </div>
    </div>
  `).join('');
}

// ─── Load Courses Catalog Page ─────────────────────────────────
function loadCoursesPage() {
  const user = Auth.getCurrentUser();
  const allCourses = user ? CourseDB.getByRole(user.role) : CourseDB.getAll().filter(c => c.status === 'active');
  const categories = CategoryDB.getAll();

  const params = new URLSearchParams(window.location.search);
  const searchQ = (params.get('q') || '').toLowerCase();
  const catFilter = params.get('cat') || '';
  const levelFilter = params.get('level') || '';
  const typeFilter = params.get('type') || '';

  let filtered = allCourses;
  if (searchQ) {
    filtered = filtered.filter(c =>
      c.title.toLowerCase().includes(searchQ) ||
      c.description.toLowerCase().includes(searchQ) ||
      c.instructor.toLowerCase().includes(searchQ) ||
      (c.tags && c.tags.some(t => t.toLowerCase().includes(searchQ)))
    );
  }
  if (catFilter) {
    if (catFilter === '7' || catFilter === 'free') {
      filtered = filtered.filter(c => c.priceType === 'free' || c.categoryId === 7 || (!c.priceType && (!c.price || c.price === 0)));
    } else if (catFilter === '8' || catFilter === 'paid-cert' || catFilter === 'paid') {
      filtered = filtered.filter(c => c.priceType === 'paid' || c.hasCertificate || c.categoryId === 8);
    } else {
      filtered = filtered.filter(c => c.categoryId === parseInt(catFilter));
    }
  }
  if (typeFilter) {
    if (typeFilter === 'free') {
      filtered = filtered.filter(c => c.priceType === 'free' || c.categoryId === 7 || (!c.priceType && (!c.price || c.price === 0)));
    } else if (typeFilter === 'paid') {
      filtered = filtered.filter(c => c.priceType === 'paid' || c.hasCertificate || c.categoryId === 8);
    }
  }
  if (levelFilter) {
    filtered = filtered.filter(c => c.level === levelFilter);
  }

  // Populate Category Filter Dropdown
  const catSelect = document.getElementById('catFilter');
  if (catSelect) {
    const allCatText = window.I18n ? window.I18n.t('filter_all_cats') : 'Tất cả danh mục';
    catSelect.innerHTML = `<option value="">${allCatText}</option>` +
      categories.map(c => `<option value="${c.id}" ${c.id == catFilter ? 'selected' : ''}>${c.icon} ${window.I18n ? window.I18n.getCategoryName(c) : c.name}</option>`).join('');
    catSelect.addEventListener('change', applyFilters);
  }

  // Populate Type Filter Dropdown if exists
  const typeSelect = document.getElementById('typeFilter');
  if (typeSelect) {
    const allTypeText = window.I18n ? window.I18n.t('filter_all_types') : 'Tất cả học phí / Phân loại';
    const freeText = window.I18n ? window.I18n.t('filter_type_free') : '🎁 Khóa học Miễn phí';
    const paidText = window.I18n ? window.I18n.t('filter_type_paid') : '🎓 Trả phí · Cấp chứng chỉ';
    typeSelect.innerHTML = `
      <option value="">${allTypeText}</option>
      <option value="free" ${typeFilter === 'free' ? 'selected' : ''}>${freeText}</option>
      <option value="paid" ${typeFilter === 'paid' ? 'selected' : ''}>${paidText}</option>
    `;
    typeSelect.value = typeFilter;
    typeSelect.addEventListener('change', applyFilters);
  }

  // Populate Level Filter
  const levelSelect = document.getElementById('levelFilter');
  if (levelSelect) {
    const allLevelText = window.I18n ? window.I18n.t('filter_all_levels') : 'Tất cả trình độ';
    const basicText = window.I18n ? window.I18n.t('level_basic') : 'Cơ bản';
    const interText = window.I18n ? window.I18n.t('level_intermediate') : 'Trung cấp';
    const advText = window.I18n ? window.I18n.t('level_advanced') : 'Nâng cao';
    levelSelect.innerHTML = `
      <option value="">${allLevelText}</option>
      <option value="Cơ bản" ${levelFilter === 'Cơ bản' ? 'selected' : ''}>${basicText}</option>
      <option value="Trung cấp" ${levelFilter === 'Trung cấp' ? 'selected' : ''}>${interText}</option>
      <option value="Nâng cao" ${levelFilter === 'Nâng cao' ? 'selected' : ''}>${advText}</option>
    `;
    levelSelect.value = levelFilter;
    levelSelect.addEventListener('change', applyFilters);
  }

  // Search input
  const searchInput = document.getElementById('courseSearch');
  if (searchInput) {
    searchInput.value = params.get('q') || '';
    if (window.I18n) searchInput.placeholder = window.I18n.t('filter_search_ph');
    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') applyFilters();
    });
    const searchBtn = document.getElementById('searchBtn');
    if (searchBtn) searchBtn.addEventListener('click', applyFilters);
  }

  const countEl = document.getElementById('filterCount');
  if (countEl) {
    const prefix = window.I18n ? window.I18n.t('filter_found_prefix') : 'Tìm thấy';
    const suffix = window.I18n ? window.I18n.t('filter_found_suffix') : 'khóa học';
    countEl.textContent = `${prefix} ${filtered.length} ${suffix}`.trim();
  }

  renderCourseGrid(filtered, user);
}

function applyFilters() {
  const q = document.getElementById('courseSearch')?.value || '';
  const cat = document.getElementById('catFilter')?.value || '';
  const level = document.getElementById('levelFilter')?.value || '';
  const type = document.getElementById('typeFilter')?.value || '';

  const url = new URL(window.location);
  if (q) url.searchParams.set('q', q); else url.searchParams.delete('q');
  if (cat) url.searchParams.set('cat', cat); else url.searchParams.delete('cat');
  if (level) url.searchParams.set('level', level); else url.searchParams.delete('level');
  if (type) url.searchParams.set('type', type); else url.searchParams.delete('type');

  window.history.replaceState({}, '', url);
  loadCoursesPage();
}

// ─── Global Search Handler ─────────────────────────────────────
function initGlobalSearch() {
  const form = document.getElementById('globalSearchForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const q = document.getElementById('globalSearchInput')?.value?.trim();
      if (q) window.location.href = `courses.html?q=${encodeURIComponent(q)}`;
    });
  }
}

// ─── QR Login Modal Controls ───────────────────────────────────
window.openQR = function() {
  const modal = document.getElementById('qrLoginModal');
  if (modal) {
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
  }
};

window.closeQR = function() {
  const modal = document.getElementById('qrLoginModal');
  if (modal) {
    modal.classList.remove('show');
    document.body.style.overflow = '';
  }
};

window.qrLogin = function(email, pass) {
  const result = Auth.login(email, pass);
  if (result.success) {
    closeQR();
    showToast(`Đăng nhập thành công! Chào mừng ${result.user.name}`, 'success');
    setTimeout(() => window.location.reload(), 700);
  } else {
    showToast(result.message, 'error');
  }
};

// ─── Mobile Navigation Toggle ──────────────────────────────────
window.toggleMobileNav = function() {
  const panel = document.getElementById('mobileNavPanel');
  const overlay = document.getElementById('mobileNavOverlay');
  const btn = document.getElementById('mobileMenuBtn');
  if (!panel) return;

  const isOpen = panel.classList.contains('open');
  if (isOpen) {
    panel.classList.remove('open');
    if (overlay) overlay.classList.remove('show');
    if (btn) btn.classList.remove('open');
    document.body.style.overflow = '';
  } else {
    panel.classList.add('open');
    if (overlay) overlay.classList.add('show');
    if (btn) btn.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
};

window.closeMobileNav = function() {
  const panel = document.getElementById('mobileNavPanel');
  const overlay = document.getElementById('mobileNavOverlay');
  const btn = document.getElementById('mobileMenuBtn');
  if (panel) panel.classList.remove('open');
  if (overlay) overlay.classList.remove('show');
  if (btn) btn.classList.remove('open');
  document.body.style.overflow = '';
};

// ─── Page Lifecycle ────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initGlobalSearch();
  const page = document.body.dataset.page;
  if (page === 'home') {
    initSlider();
    loadHomepage();
  } else if (page === 'courses') {
    loadCoursesPage();
  }

  // Load site settings (hotline, social links)
  try {
    const s = SettingsDB.get();
    const fbLink = document.getElementById('fbLink');
    const ytLink = document.getElementById('ytLink');
    const zaloLink = document.getElementById('zaloLink');
    if (fbLink && s.facebook) fbLink.href = s.facebook;
    if (ytLink && s.youtube) ytLink.href = s.youtube;
    if (zaloLink && s.zalo) zaloLink.href = s.zalo;
  } catch (e) {}

  // Close QR modal on backdrop click
  const qrModal = document.getElementById('qrLoginModal');
  if (qrModal) {
    qrModal.addEventListener('click', (e) => {
      if (e.target === qrModal) closeQR();
    });
  }
});
