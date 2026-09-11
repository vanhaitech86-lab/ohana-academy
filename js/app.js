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
  const catName = category ? category.name : 'Khóa học';
  const catColor = category ? category.color : '#1e3a8a';
  const catIcon = category ? category.icon : '📚';

  const enrolled = currentUser ? EnrollmentDB.isEnrolled(currentUser.id, course.id) : false;
  const progress = currentUser ? ProgressDB.get(currentUser.id, course.id) : { completedLessons: [] };
  const pct = Math.round((progress.completedLessons.length / Math.max(course.totalLessons, 1)) * 100);
  const levelColor = LEVEL_COLORS[course.level] || '#10b981';

  return `
    <div class="course-card fade-in-up" onclick="window.location='course-detail.html?id=${course.id}'">
      <div class="course-thumb">
        <div style="width:100%;height:100%;background:linear-gradient(135deg, ${catColor}, #0f172a);display:flex;align-items:center;justify-content:center;font-size:56px;color:white;">
          ${catIcon}
        </div>
        <div class="course-thumb-overlay"></div>
        <div class="course-play-btn">▶</div>
        <span class="course-level-badge" style="background:${levelColor};color:white;">${course.level}</span>
      </div>
      <div class="course-body">
        <div class="course-category" style="color:${catColor}">${catName}</div>
        <div class="course-title" title="${course.title}">${course.title}</div>
        <div class="course-instructor">👨‍🏫 ${course.instructor}</div>
        <div class="course-meta">
          <div class="course-meta-item"><span>⏱</span> ${course.duration}</div>
          <div class="course-meta-item"><span>📚</span> ${course.totalLessons} bài giảng</div>
        </div>
        <div class="course-rating">
          <span class="stars">${generateStars(course.rating)}</span>
          <span class="rating-val">${course.rating}</span>
        </div>

        ${enrolled && pct > 0 ? `
          <div style="margin-top:10px;margin-bottom:6px;">
            <div style="font-size:11px;color:var(--gray-500);display:flex;justify-content:space-between;margin-bottom:4px;">
              <span>Tiến độ học tập</span>
              <strong style="color:var(--ohana-orange);">${pct}%</strong>
            </div>
            <div class="progress-bar">
              <div class="progress-fill" style="width:${pct}%"></div>
            </div>
          </div>
        ` : ''}

        <div class="course-footer">
          <span class="course-enroll-count">👥 ${course.enrollCount || 0} học viên</span>
          <span class="course-cta ${enrolled ? 'enrolled' : ''}">
            ${enrolled ? '▶ Tiếp tục học' : 'Chi tiết khóa học'}
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
    grid.innerHTML = `
      <div class="empty-state" style="grid-column: 1 / -1;">
        <div class="empty-icon">📂</div>
        <div class="empty-title">Chưa có khóa học phù hợp</div>
        <div class="empty-desc">Không tìm thấy khóa học nào trong danh mục hoặc tiêu chí tìm kiếm này.</div>
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

  const filtered = catId === 'all'
    ? allCourses
    : allCourses.filter(c => c.categoryId === parseInt(catId));

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
    catBar.innerHTML = `
      <div class="cat-item active" data-cat="all" onclick="filterCourses('all', this)">
        <span class="cat-icon">🌟</span>
        <span class="cat-label">Tất cả khóa học</span>
      </div>
      ${categories.map(c => `
        <div class="cat-item" data-cat="${c.id}" onclick="filterCourses('${c.id}', this)">
          <span class="cat-icon">${c.icon}</span>
          <span class="cat-label">${c.name}</span>
        </div>
      `).join('')}`;
  }

  // Render course cards
  renderCourseGrid(allCourses, user);

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

// ─── Load Courses Catalog Page ─────────────────────────────────
function loadCoursesPage() {
  const user = Auth.getCurrentUser();
  const allCourses = user ? CourseDB.getByRole(user.role) : CourseDB.getAll().filter(c => c.status === 'active');
  const categories = CategoryDB.getAll();

  const params = new URLSearchParams(window.location.search);
  const searchQ = (params.get('q') || '').toLowerCase();
  const catFilter = params.get('cat') || '';
  const levelFilter = params.get('level') || '';

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
    filtered = filtered.filter(c => c.categoryId === parseInt(catFilter));
  }
  if (levelFilter) {
    filtered = filtered.filter(c => c.level === levelFilter);
  }

  // Populate Category Filter Dropdown
  const catSelect = document.getElementById('catFilter');
  if (catSelect) {
    catSelect.innerHTML = `<option value="">Tất cả danh mục</option>` +
      categories.map(c => `<option value="${c.id}" ${c.id == catFilter ? 'selected' : ''}>${c.name}</option>`).join('');
    catSelect.addEventListener('change', applyFilters);
  }

  // Populate Level Filter
  const levelSelect = document.getElementById('levelFilter');
  if (levelSelect) {
    levelSelect.value = levelFilter;
    levelSelect.addEventListener('change', applyFilters);
  }

  // Search input
  const searchInput = document.getElementById('courseSearch');
  if (searchInput) {
    searchInput.value = params.get('q') || '';
    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') applyFilters();
    });
    const searchBtn = document.getElementById('searchBtn');
    if (searchBtn) searchBtn.addEventListener('click', applyFilters);
  }

  const countEl = document.getElementById('filterCount');
  if (countEl) countEl.textContent = `Tìm thấy ${filtered.length} khóa học`;

  renderCourseGrid(filtered, user);
}

function applyFilters() {
  const q = document.getElementById('courseSearch')?.value || '';
  const cat = document.getElementById('catFilter')?.value || '';
  const level = document.getElementById('levelFilter')?.value || '';

  const url = new URL(window.location);
  if (q) url.searchParams.set('q', q); else url.searchParams.delete('q');
  if (cat) url.searchParams.set('cat', cat); else url.searchParams.delete('cat');
  if (level) url.searchParams.set('level', level); else url.searchParams.delete('level');

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
