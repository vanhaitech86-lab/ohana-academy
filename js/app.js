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
    slides.forEach((s, i) => {
      if (i === idx) {
        s.classList.remove('active');
        void s.offsetWidth; // Re-trigger smooth left-to-right entrance animation
        s.classList.add('active');
      } else {
        s.classList.remove('active');
      }
    });
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
  const ctaText = enrolled 
    ? (window.I18n ? window.I18n.t('btn_continue') : '▶ Tiếp tục học') 
    : (currentUser ? '▶ Vào học thử' : (window.I18n ? window.I18n.t('btn_details') : 'Chi tiết khóa học'));
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
        <div class="course-play-btn" title="Xem video demo học thử" onclick="event.stopPropagation(); window.openDemoModalByCourse(${course.id})">▶</div>
        
        <!-- Badges on Thumbnail -->
        ${isPaid || hasCert ? `
          <span class="course-type-badge cert">${badgeCertText}</span>
        ` : `
          <span class="course-type-badge free">${badgeFreeText}</span>
        `}
        ${currentUser ? `
          <span class="course-type-badge" style="left:auto;right:10px;top:10px;background:rgba(0,223,216,0.22);color:#00dfd8;border:1px solid rgba(0,223,216,0.5);font-size:11px;font-weight:700;">🔓 Mở khóa học thử</span>
        ` : ''}
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
          <div style="display:flex;gap:6px;align-items:center;">
            <button class="course-demo-btn" onclick="event.stopPropagation(); window.openDemoModalByCourse(${course.id})" title="Xem trước video bài học demo">
              🎬 Demo
            </button>
            <span class="course-cta ${enrolled ? 'enrolled' : ''}">
              ${ctaText}
            </span>
          </div>
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

// ─── Render Official YouTube Videos & Demo Showcase ───────────
let currentDemoGroup = 'all';

window.filterDemoVideos = function(group, el) {
  currentDemoGroup = group;
  document.querySelectorAll('.demo-tab-btn').forEach(btn => btn.classList.remove('active'));
  if (el) el.classList.add('active');
  renderYtVideos(group);
};

function renderYtVideos(group = currentDemoGroup || 'all') {
  const container = document.getElementById('ytVideosGrid');
  if (!container || !window.OFFICIAL_YOUTUBE_VIDEOS) return;

  const list = group === 'all'
    ? window.OFFICIAL_YOUTUBE_VIDEOS
    : window.OFFICIAL_YOUTUBE_VIDEOS.filter(v => v.group === group);

  if (!list.length) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: var(--gray-500);">
        <div style="font-size: 36px; margin-bottom: 8px;">🎬</div>
        <div>Không có video nào trong danh mục này.</div>
      </div>`;
    return;
  }

  container.innerHTML = list.map(v => `
    <div class="yt-video-card fade-in-up">
      <div class="yt-video-thumb-wrap" onclick="openDemoModal('${v.id}')">
        <img src="${v.thumbnail}" alt="${v.title}" class="yt-video-thumb" loading="lazy">
        <div class="yt-video-overlay">
          <div class="yt-play-icon">▶</div>
        </div>
        <span class="yt-video-duration">${v.duration}</span>
        <span class="yt-video-badge">${v.badge || 'Demo'}</span>
      </div>
      <div class="yt-video-info">
        <div class="yt-video-category">${v.category}</div>
        <div class="yt-video-title" title="${v.title}" onclick="openDemoModal('${v.id}')">${v.title}</div>
        <div class="yt-video-footer">
          <span class="yt-channel-tag">📺 ${v.channel || 'Ohana Astronixa VN'}</span>
          <div style="display: flex; gap: 8px; align-items: center;">
            <button class="course-demo-btn" onclick="event.stopPropagation(); openDemoModal('${v.id}')" title="Xem trước video demo">
              🎬 Xem demo
            </button>
            <a href="lesson.html?course=${v.courseId}&lesson=${v.lessonId}" class="yt-watch-cta" onclick="event.stopPropagation()">
              Học thử →
            </a>
          </div>
        </div>
      </div>
    </div>
  `).join('');
}

// ─── Quick Demo Video Modal Controller ─────────────────────────
window.openDemoModal = function(videoId) {
  const video = (window.OFFICIAL_YOUTUBE_VIDEOS || []).find(v => v.id === videoId);
  if (!video) return;

  const modal = document.getElementById('demoVideoModal');
  const iframe = document.getElementById('demoModalIframe');
  const title = document.getElementById('demoModalTitle');
  const tag = document.getElementById('demoModalTag');
  const desc = document.getElementById('demoModalDesc');
  const dur = document.getElementById('demoModalDuration');
  const chan = document.getElementById('demoModalChannel');
  const fullLessonBtn = document.getElementById('demoModalFullLessonBtn');
  const ytBtn = document.getElementById('demoModalYtBtn');
  const watermark = document.getElementById('demoWatermarkOverlay');

  if (!modal || !iframe) return;

  if (title) title.textContent = video.title;
  if (tag) tag.textContent = `🪐 ${video.category.toUpperCase()}`;
  if (desc) desc.textContent = video.description || '';
  if (dur) dur.textContent = `⏱ ${video.duration}`;
  if (chan) chan.textContent = `📺 ${video.channel || 'Ohana Astronixa VN'}`;

  // Student Security Watermark
  const currentUser = Auth.getCurrentUser();
  const wmText = currentUser ? `HỌC VIÊN: ${currentUser.name} (${currentUser.email}) · OHANA SECURE DEMO` : 'OHANA ACADEMY · SECURE DEMO VIEW';
  if (watermark) watermark.textContent = wmText;

  // Set Embed URL with autoplay=1&rel=0&modestbranding=1
  iframe.src = `https://www.youtube.com/embed/${video.id}?autoplay=1&rel=0&modestbranding=1`;

  // Full lesson button
  if (fullLessonBtn) {
    fullLessonBtn.href = `lesson.html?course=${video.courseId}&lesson=${video.lessonId}`;
  }

  // YouTube Channel button
  if (ytBtn) {
    if (video.group === 'ohana') {
      ytBtn.href = 'https://www.youtube.com/@OhanaAstronixaVN';
      ytBtn.textContent = '▶ Kênh YouTube @OhanaAstronixaVN';
      ytBtn.style.display = 'inline-flex';
    } else {
      ytBtn.href = video.watchUrl || `https://www.youtube.com/watch?v=${video.id}`;
      ytBtn.textContent = '▶ Xem trên YouTube ↗';
      ytBtn.style.display = 'inline-flex';
    }
  }

  modal.classList.add('show');
  document.body.style.overflow = 'hidden';
};

window.closeDemoModal = function(e) {
  if (e && e.target && e.target.id !== 'demoVideoModal' && !e.target.classList.contains('demo-modal-close')) {
    return;
  }
  const modal = document.getElementById('demoVideoModal');
  const iframe = document.getElementById('demoModalIframe');
  if (modal) modal.classList.remove('show');
  if (iframe) iframe.src = '';
  document.body.style.overflow = '';
};

window.openDemoModalByCourse = function(courseId) {
  const videos = window.OFFICIAL_YOUTUBE_VIDEOS || [];
  const found = videos.find(v => v.courseId === parseInt(courseId));
  if (found) {
    window.openDemoModal(found.id);
  } else {
    const course = CourseDB.getById(courseId);
    const lessons = LessonDB.getByCourse(courseId);
    if (lessons && lessons.length) {
      window.location.href = `lesson.html?course=${courseId}&lesson=${lessons[0].id}`;
    }
  }
};

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

// ─── Interactive Cosmic Falling Snow System ─────────────────────
let snowAnimationId = null;
let isSnowActive = true;

function initHeroSnow() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  const canvas = document.getElementById('heroSnowCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let width = 0;
  let height = 0;
  let flakes = [];
  const mouse = { x: -9999, y: -9999 };

  function resizeCanvas() {
    const rect = hero.getBoundingClientRect();
    width = rect.width;
    height = rect.height;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);
  }

  const isMobile = window.innerWidth < 768;
  const flakeCount = isMobile ? 65 : 125;

  class Snowflake {
    constructor(initial = false) {
      this.reset(initial);
    }

    reset(initial = false) {
      this.x = Math.random() * (width + 120) - 80;
      this.y = initial ? Math.random() * height : -15;

      const rand = Math.random();
      if (rand < 0.55) {
        // Deep background layer: small, gentle, subtle drift
        this.radius = Math.random() * 1.3 + 0.8;
        this.vy = Math.random() * 0.7 + 0.5;
        this.vx = Math.random() * 0.4 + 0.25; // Drifting left to right
        this.alpha = Math.random() * 0.35 + 0.2;
        this.isCrystal = false;
      } else if (rand < 0.88) {
        // Midground layer: sparkling flake
        this.radius = Math.random() * 1.5 + 1.8;
        this.vy = Math.random() * 1.1 + 0.8;
        this.vx = Math.random() * 0.6 + 0.45; // Drifting left to right
        this.alpha = Math.random() * 0.4 + 0.45;
        this.isCrystal = Math.random() < 0.22;
      } else {
        // Foreground hero layer: luminous cosmic snow
        this.radius = Math.random() * 2.0 + 2.5;
        this.vy = Math.random() * 1.5 + 1.2;
        this.vx = Math.random() * 0.9 + 0.6; // Dynamic drift left to right
        this.alpha = Math.random() * 0.35 + 0.65;
        this.isCrystal = Math.random() < 0.35;
      }

      this.angle = Math.random() * Math.PI * 2;
      this.spinSpeed = (Math.random() - 0.5) * 0.04;
      this.swayRate = Math.random() * 0.02 + 0.01;
      this.swayDistance = Math.random() * 0.6 + 0.3;

      // Color tints: pure white, cosmic cyan, and stardust violet
      const colorRoll = Math.random();
      if (colorRoll > 0.45) {
        this.color = '255, 255, 255'; // Pure crystalline white
      } else if (colorRoll > 0.15) {
        this.color = '0, 223, 216'; // Astronixa Cyan
      } else {
        this.color = '168, 85, 247'; // Stardust Purple
      }
    }

    update() {
      this.angle += this.swayRate;
      // Drift predominantly from left to right with a gentle wind wave
      this.x += this.vx + Math.sin(this.angle) * this.swayDistance;
      this.y += this.vy;

      // Gentle mouse interaction breeze
      const dx = this.x - mouse.x;
      const dy = this.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 110) {
        const force = (110 - dist) / 110;
        this.x += (dx / dist) * force * 2.6;
        this.y += (dy / dist) * force * 1.6;
      }

      // Recycle when out of bounds
      if (this.y > height + 20 || this.x > width + 60) {
        this.reset(false);
      }
      if (this.x < -80) {
        this.x = width + 50;
      }
    }

    draw() {
      ctx.save();
      if (this.isCrystal) {
        // Draw 6-branch stellar snowflake
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.strokeStyle = `rgba(${this.color}, ${this.alpha})`;
        ctx.lineWidth = 1.3;
        ctx.lineCap = 'round';
        ctx.beginPath();
        for (let i = 0; i < 3; i++) {
          ctx.rotate(Math.PI / 3);
          ctx.moveTo(-this.radius * 2, 0);
          ctx.lineTo(this.radius * 2, 0);
          // Tiny branchlets on ends
          const branch = this.radius * 0.75;
          ctx.moveTo(this.radius * 1.3, -branch * 0.4);
          ctx.lineTo(this.radius * 1.3, branch * 0.4);
          ctx.moveTo(-this.radius * 1.3, -branch * 0.4);
          ctx.lineTo(-this.radius * 1.3, branch * 0.4);
        }
        ctx.stroke();
      } else {
        // Soft glowing snow pellet
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.color}, ${this.alpha})`;
        if (this.radius > 2.2) {
          ctx.shadowColor = `rgba(${this.color}, 0.8)`;
          ctx.shadowBlur = 10;
        }
        ctx.fill();
      }
      ctx.restore();
    }
  }

  function createFlakes() {
    flakes = [];
    for (let i = 0; i < flakeCount; i++) {
      flakes.push(new Snowflake(true));
    }
  }

  function renderSnow() {
    if (!isSnowActive) return;
    ctx.clearRect(0, 0, width, height);
    for (let i = 0; i < flakes.length; i++) {
      flakes[i].update();
      flakes[i].draw();
    }
    snowAnimationId = requestAnimationFrame(renderSnow);
  }

  window.addEventListener('resize', () => {
    resizeCanvas();
  });

  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });

  hero.addEventListener('mouseleave', () => {
    mouse.x = -9999;
    mouse.y = -9999;
  });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      if (snowAnimationId) cancelAnimationFrame(snowAnimationId);
    } else if (isSnowActive) {
      renderSnow();
    }
  });

  resizeCanvas();
  createFlakes();
  renderSnow();

  // Window toggle helper
  window.toggleHeroSnow = function() {
    isSnowActive = !isSnowActive;
    const btn = document.getElementById('snowToggleBtn');
    if (isSnowActive) {
      if (btn) {
        btn.classList.remove('snow-paused');
        const lbl = btn.querySelector('.snow-label');
        if (lbl) lbl.textContent = 'Tuyết rơi';
        btn.title = 'Tạm dừng hiệu ứng tuyết rơi';
      }
      renderSnow();
    } else {
      if (snowAnimationId) cancelAnimationFrame(snowAnimationId);
      ctx.clearRect(0, 0, width, height);
      if (btn) {
        btn.classList.add('snow-paused');
        const lbl = btn.querySelector('.snow-label');
        if (lbl) lbl.textContent = 'Tuyết: Tắt';
        btn.title = 'Bật lại hiệu ứng tuyết rơi';
      }
    }
  };
}

// ─── Page Lifecycle ────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initGlobalSearch();
  const page = document.body.dataset.page;
  if (page === 'home') {
    initSlider();
    initHeroSnow();
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
