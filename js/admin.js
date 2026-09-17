// ============================================================
// OHANA Academy – Admin Dashboard Controller v2.1
// ============================================================

let currentAdminTab = 'dashboard';

// ─── Mobile Sidebar & Modal Helpers ──────────────────────────
window.toggleAdminSidebar = function() {
  const sb = document.getElementById('adminSidebar');
  const ov = document.getElementById('adminSidebarOverlay');
  if (sb) sb.classList.toggle('open');
  if (ov) ov.classList.toggle('show');
};

window.closeAdminSidebar = function() {
  const sb = document.getElementById('adminSidebar');
  const ov = document.getElementById('adminSidebarOverlay');
  if (sb) sb.classList.remove('open');
  if (ov) ov.classList.remove('show');
};

window.openAdminVideoPreview = function(embedUrl, title, meta) {
  const m = document.getElementById('adminVideoPreviewModal');
  const ifr = document.getElementById('avpIframe');
  const t = document.getElementById('avpTitle');
  const mt = document.getElementById('avpMeta');
  if (ifr) ifr.src = embedUrl;
  if (t) t.textContent = title || 'Xem trước Video Đào tạo';
  if (mt) mt.textContent = meta || '';
  if (m) m.classList.add('show');
};

window.closeAdminVideoPreview = function() {
  const m = document.getElementById('adminVideoPreviewModal');
  const ifr = document.getElementById('avpIframe');
  if (ifr) ifr.src = '';
  if (m) m.classList.remove('show');
};

// ─── Admin Authentication Gate ────────────────────────────────
function renderAdminAuthGate() {
  const content = document.getElementById('adminContent');
  const title = document.getElementById('adminPageTitle');
  const subtitle = document.getElementById('adminPageSubtitle');
  const actions = document.getElementById('adminHeaderActions');
  const sidebar = document.getElementById('adminSidebar');

  if (title) title.textContent = 'Xác Thực Quản Trị Viên';
  if (subtitle) subtitle.textContent = 'Khu vực bảo mật dành riêng cho Ban Quản trị OHANA Academy';
  if (actions) actions.innerHTML = '';
  if (sidebar) sidebar.style.pointerEvents = 'none';

  if (!content) return;
  content.innerHTML = `
    <div class="admin-auth-gate-wrap fade-in-up">
      <div class="admin-auth-gate-card">
        <div class="admin-gate-icon">🔐</div>
        <h2 class="admin-gate-title">Khu Vực Quản Trị Hệ Thống</h2>
        <p class="admin-gate-desc">
          Trang quản trị cho phép kiểm soát toàn bộ khóa học, video bài giảng, ngân hàng đề thi và tài khoản học viên. Vui lòng xác thực tài khoản Admin để tiếp tục.
        </p>

        <button class="admin-quick-login-btn" onclick="quickAdminLogin()">
          <span>⚡</span> Đăng nhập nhanh bằng Admin (vanhaitech.86@gmail.com)
        </button>

        <div style="display:flex; align-items:center; gap:12px; margin: 16px 0;">
          <div style="flex:1; height:1px; background:var(--gray-200);"></div>
          <span style="font-size:12px; color:var(--gray-400); font-weight:600;">HOẶC ĐĂNG NHẬP THỦ CÔNG</span>
          <div style="flex:1; height:1px; background:var(--gray-200);"></div>
        </div>

        <form onsubmit="handleManualAdminLogin(event)" style="text-align:left;">
          <div class="form-group">
            <label class="form-label">Email Quản trị viên</label>
            <input type="email" id="gateEmail" class="form-control" placeholder="vanhaitech.86@gmail.com" value="vanhaitech.86@gmail.com" required>
          </div>
          <div class="form-group">
            <label class="form-label">Mật khẩu</label>
            <input type="password" id="gatePass" class="form-control" placeholder="Admin123456a@" value="Admin123456a@" required>
          </div>
          <button type="submit" class="btn btn-primary" style="width:100%; padding:12px; font-weight:700;">
            🔑 Đăng Nhập Quản Trị
          </button>
        </form>

        <div style="margin-top:20px;">
          <a href="index.html" style="font-size:13px; color:var(--gray-500); text-decoration:underline;">
            ← Quay lại trang học viên
          </a>
        </div>
      </div>
    </div>
  `;
}

window.quickAdminLogin = function() {
  const res = Auth.login('vanhaitech.86@gmail.com', 'Admin123456a@');
  if (res.success) {
    showToast('Đăng nhập Quản trị viên thành công!', 'success');
    setTimeout(() => {
      window.location.reload();
    }, 400);
  } else {
    showToast(res.message, 'error');
  }
};

window.handleManualAdminLogin = function(e) {
  e.preventDefault();
  const email = document.getElementById('gateEmail').value.trim();
  const pass = document.getElementById('gatePass').value;
  const res = Auth.login(email, pass);
  if (res.success) {
    if (res.user.role !== 'admin') {
      showToast('Tài khoản này không có quyền Quản trị viên!', 'error');
      return;
    }
    showToast('Đăng nhập Quản trị thành công!', 'success');
    setTimeout(() => {
      window.location.reload();
    }, 400);
  } else {
    showToast(res.message, 'error');
  }
};

// ─── Initialize Admin ─────────────────────────────────────────
function initAdmin() {
  const user = Auth.getCurrentUser();
  if (!user || user.role !== 'admin') {
    renderAdminAuthGate();
    return;
  }

  // Update header avatar and name
  const uAvatar = document.getElementById('userAvatar');
  const uName = document.getElementById('userName');
  if (uAvatar) uAvatar.textContent = user.name ? user.name.charAt(0) : '👑';
  if (uName) uName.textContent = user.name || 'Quản trị viên';

  loadTab('dashboard');

  // Sidebar navigation listeners
  document.querySelectorAll('.admin-nav-item[data-tab]').forEach(item => {
    item.addEventListener('click', () => {
      document.querySelectorAll('.admin-nav-item').forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      closeAdminSidebar();
      loadTab(item.dataset.tab);
    });
  });
}

function loadTab(tab) {
  currentAdminTab = tab;
  const content = document.getElementById('adminContent');
  const title = document.getElementById('adminPageTitle');
  const subtitle = document.getElementById('adminPageSubtitle');
  const actions = document.getElementById('adminHeaderActions');
  if (!content) return;

  const titles = {
    dashboard: '📊 Bảng Điều Khiển Tổng Quan',
    courses:    '📚 Quản Lý Khóa Học OHANA',
    lessons:    '🎥 Quản Lý Bài Học & Video',
    youtube:    '📺 Kênh Video YouTube Ohana Astronixa VN',
    quizzes:    '📝 Quản Lý Đề Thi & Trắc Nghiệm',
    users:      '👥 Quản Lý Thành Viên & Học Viên',
    results:    '🏆 Bảng Điểm & Kết Quả Học Viên',
    settings:   '⚙️ Cài Đặt Hệ Thống & Sao Lưu'
  };

  const subtitles = {
    dashboard: 'Thống kê dữ liệu học tập và giám sát hệ thống thời gian thực',
    courses:    'Danh sách toàn bộ các chương trình đào tạo AI, Kỹ năng và Quy trình Ohana',
    lessons:    'Quản lý video bài giảng, tài liệu đính kèm và lộ trình học tập',
    youtube:    '7 video đào tạo quy trình SOP chính thức từ kênh @OhanaAstronixaVN',
    quizzes:    'Ngân hàng đề thi trắc nghiệm, cấu hình điểm đạt và câu hỏi kiểm tra',
    users:      'Phân quyền tài khoản học viên, nhân viên mới, nhân viên chính thức và admin',
    results:    'Xem chi tiết điểm số, tỷ lệ đạt/chưa đạt và xuất bảng điểm ra Excel',
    settings:   'Tùy chỉnh thông tin liên hệ, hotline, fanpage và công cụ sao lưu dữ liệu'
  };

  if (title) title.textContent = titles[tab] || tab;
  if (subtitle) subtitle.textContent = subtitles[tab] || '';
  if (actions) actions.innerHTML = '';

  if (tab === 'dashboard') renderDashboard(content);
  else if (tab === 'courses') renderCourses(content);
  else if (tab === 'lessons') renderLessons(content);
  else if (tab === 'youtube') renderYouTubeManager(content);
  else if (tab === 'quizzes') renderQuizzes(content);
  else if (tab === 'users') renderUsers(content);
  else if (tab === 'results') renderResults(content);
  else if (tab === 'settings') renderSettings(content);
}

// ─── Tab: Dashboard ───────────────────────────────────────────
function renderDashboard(el) {
  const users = UserDB.getAll();
  const courses = CourseDB.getAll();
  const lessons = LessonDB.getAll();
  const results = ResultDB.getAll();
  const enrollments = EnrollmentDB.getAll();

  const actions = document.getElementById('adminHeaderActions');
  if (actions) {
    actions.innerHTML = `
      <button class="btn btn-primary btn-sm" onclick="openCourseModal()">+ Thêm Khóa Học</button>
      <button class="btn btn-secondary btn-sm" onclick="openLessonModal()">+ Thêm Bài Giảng</button>
      <button class="btn btn-secondary btn-sm" onclick="exportData()">📥 Xuất Dữ Liệu</button>
    `;
  }

  const passedCount = results.filter(r => r.passed).length;
  const avgScore = results.length ? Math.round(results.reduce((a, r) => a + r.score, 0) / results.length) : 0;
  const passRate = results.length ? Math.round((passedCount / results.length) * 100) : 100;

  // Course submissions data
  const courseCounts = courses.map(c => ({
    name: c.title.length > 25 ? c.title.substring(0, 25) + '...' : c.title,
    count: results.filter(r => r.courseId === c.id).length
  }));
  const maxCount = Math.max(...courseCounts.map(c => c.count), 1);
  const recentResults = [...results].sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt)).slice(0, 6);

  el.innerHTML = `
    <!-- Quick Actions Banner -->
    <div class="quick-actions-bar fade-in-up">
      <span style="font-size:13px; font-weight:700; color:var(--gray-600); margin-right:4px;">⚡ Thao tác nhanh:</span>
      <button class="quick-action-btn" onclick="openCourseModal()">
        <span>📚</span> + Thêm Khóa học
      </button>
      <button class="quick-action-btn" onclick="openLessonModal()">
        <span>🎥</span> + Thêm Bài giảng
      </button>
      <button class="quick-action-btn" onclick="openUserModal()">
        <span>👥</span> + Thêm Tài khoản
      </button>
      <button class="quick-action-btn" onclick="loadTab('youtube')">
        <span>📺</span> Video YouTube SOP (${(window.OFFICIAL_YOUTUBE_VIDEOS || []).length})
      </button>
      <button class="quick-action-btn" onclick="exportData()">
        <span>📥</span> Sao lưu JSON
      </button>
    </div>

    <div class="stats-grid fade-in-up">
      <div class="stat-card">
        <div class="stat-icon" style="background: rgba(30, 58, 138, 0.1); color: var(--primary);">👥</div>
        <div class="stat-info">
          <div class="label">Tổng thành viên</div>
          <div class="value">${users.length}</div>
          <div class="change" style="color: var(--ohana-orange);">▲ ${users.filter(u => u.role === 'employee_new').length} nhân viên mới</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon" style="background: rgba(249, 115, 22, 0.1); color: var(--ohana-orange);">📚</div>
        <div class="stat-info">
          <div class="label">Khóa học Ohana</div>
          <div class="value">${courses.length}</div>
          <div class="change">${lessons.length} bài giảng video</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon" style="background: rgba(16, 185, 129, 0.1); color: var(--success);">📝</div>
        <div class="stat-info">
          <div class="label">Bài kiểm tra đã nộp</div>
          <div class="value">${results.length}</div>
          <div class="change" style="color: var(--success);">✅ ${passedCount} bài đạt (${passRate}%)</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon" style="background: rgba(6, 182, 212, 0.1); color: var(--accent);">📊</div>
        <div class="stat-info">
          <div class="label">Điểm trung bình</div>
          <div class="value">${avgScore}%</div>
          <div class="change">Tổng ${enrollments.length} lượt ghi danh</div>
        </div>
      </div>
    </div>

    <div style="display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 24px; margin-bottom: 28px;">
      <!-- Biểu đồ phân bổ bài thi -->
      <div class="admin-table-card">
        <div class="table-header">
          <span class="table-title">📈 Lượt làm bài theo Khóa học</span>
        </div>
        <div style="padding: 24px;">
          <div class="chart-bars">
            ${courseCounts.map(c => `
              <div class="chart-bar-wrap">
                <div class="chart-bar" style="height: ${Math.max(Math.round((c.count / maxCount) * 90), 8)}px" title="${c.name}: ${c.count} bài thi"></div>
                <div class="chart-bar-label" style="font-size: 11px;">${c.count}</div>
              </div>
            `).join('')}
          </div>
          <div style="display: flex; gap: 4px; margin-top: 10px;">
            ${courses.map((c, i) => `
              <div style="flex: 1; font-size: 10px; color: var(--gray-500); text-align: center; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="${c.title}">
                K${i + 1}
              </div>
            `).join('')}
          </div>
          <div style="margin-top: 12px; font-size: 11.5px; color: var(--gray-400);">
            * Ghi chú: K1 đến K${courses.length} tương ứng với danh sách các khóa học Ohana hiện hữu.
          </div>
        </div>
      </div>

      <!-- Phân bổ học viên theo nhóm -->
      <div class="admin-table-card">
        <div class="table-header">
          <span class="table-title">👥 Phân bổ Học viên theo Vai trò</span>
        </div>
        <div style="padding: 24px;">
          ${Object.entries(ROLE_LABELS).map(([role, label]) => {
            const count = users.filter(u => u.role === role).length;
            const pct = Math.round((count / Math.max(users.length, 1)) * 100);
            return `
              <div style="margin-bottom: 16px;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
                  <span style="font-size: 13px; font-weight: 700; color: var(--gray-700);">${label}</span>
                  <span style="font-size: 13px; color: var(--gray-500);">${count} người (${pct}%)</span>
                </div>
                <div class="progress-bar" style="height: 8px;">
                  <div class="progress-fill" style="width: ${pct}%; background: ${ROLE_COLORS[role]}"></div>
                </div>
              </div>`;
          }).join('')}
        </div>
      </div>
    </div>

    <!-- Kết quả thi mới nhất -->
    <div class="admin-table-card">
      <div class="table-header">
        <span class="table-title">🕐 Bài Kiểm Tra Gần Đây</span>
        <button class="btn btn-primary btn-sm" onclick="loadTab('results')">Xem toàn bộ bảng điểm →</button>
      </div>
      ${recentResults.length ? `
        <table class="data-table">
          <thead>
            <tr>
              <th>Học viên</th>
              <th>Khóa học</th>
              <th>Điểm số</th>
              <th>Đánh giá</th>
              <th>Thời gian nộp</th>
            </tr>
          </thead>
          <tbody>
            ${recentResults.map(r => {
              const u = UserDB.getById(r.userId);
              const c = CourseDB.getById(r.courseId);
              return `
                <tr>
                  <td>
                    <div class="user-cell">
                      <div class="avatar">${u ? u.name.charAt(0) : '?'}</div>
                      <div>
                        <div class="u-name">${u ? u.name : 'Người dùng đã xóa'}</div>
                        <div class="u-email">${u ? u.email : ''}</div>
                      </div>
                    </div>
                  </td>
                  <td style="font-size: 13.5px; font-weight: 600;">${c ? c.title : 'Khóa học đã xóa'}</td>
                  <td>
                    <strong style="font-size: 16px; color: ${r.passed ? 'var(--success)' : 'var(--danger)'};">
                      ${r.score}%
                    </strong>
                  </td>
                  <td>
                    <span class="badge ${r.passed ? 'badge-active' : 'badge-inactive'}">
                      ${r.passed ? '✅ Đạt yêu cầu' : '❌ Chưa đạt'}
                    </span>
                  </td>
                  <td style="font-size: 12.5px; color: var(--gray-500);">${formatDate(r.submittedAt)}</td>
                </tr>`;
            }).join('')}
          </tbody>
        </table>
      ` : `
        <div class="empty-state">
          <div class="empty-icon">📭</div>
          <div class="empty-title">Chưa có bài thi nào được nộp</div>
        </div>
      `}
    </div>`;
}

// ─── Tab: Users Management ────────────────────────────────────
function renderUsers(el) {
  const users = UserDB.getAll();
  el.innerHTML = `
    <div class="admin-table-card">
      <div class="table-header">
        <span class="table-title">Danh sách Người dùng & Học viên (${users.length})</span>
        <div class="table-actions">
          <input type="text" class="search-input" placeholder="Tìm kiếm tên, email..." oninput="filterUsers(this.value)">
          <button class="btn btn-primary btn-sm" onclick="openUserModal()">+ Thêm tài khoản</button>
        </div>
      </div>
      <table class="data-table">
        <thead>
          <tr>
            <th>Người dùng</th>
            <th>Vai trò</th>
            <th>Phòng ban / Đơn vị</th>
            <th>Trạng thái</th>
            <th>Ngày tạo</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody id="usersBody">
          ${renderUsersRows(users)}
        </tbody>
      </table>
    </div>
    ${userModalHTML()}`;
}

function renderUsersRows(users) {
  return users.map(u => `
    <tr>
      <td>
        <div class="user-cell">
          <div class="avatar" style="background: ${ROLE_COLORS[u.role]};">${u.name.charAt(0)}</div>
          <div>
            <div class="u-name">${u.name}</div>
            <div class="u-email">${u.email}</div>
          </div>
        </div>
      </td>
      <td><span class="badge badge-${u.role}">${ROLE_LABELS[u.role] || u.role}</span></td>
      <td style="font-size: 13px;">${u.department || '—'}</td>
      <td><span class="badge badge-${u.status}">${u.status === 'active' ? '✅ Hoạt động' : '❌ Vô hiệu'}</span></td>
      <td style="font-size: 12.5px; color: var(--gray-500);">${formatDate(u.createdAt)}</td>
      <td>
        <div class="action-btns">
          <button class="action-btn edit" onclick="openUserModal(${u.id})">✏️ Sửa</button>
          <button class="action-btn" onclick="resetUserPassword(${u.id})" title="Đặt lại mật khẩu về 123456">🔑 Reset</button>
          ${u.role !== 'admin' ? `
            <button class="action-btn" onclick="toggleUserStatus(${u.id})">${u.status === 'active' ? '🔒 Khóa' : '🔓 Mở'}</button>
            <button class="action-btn del" onclick="deleteUser(${u.id})">🗑️ Xóa</button>
          ` : ''}
        </div>
      </td>
    </tr>
  `).join('');
}

window.resetUserPassword = function(id) {
  const u = UserDB.getById(id);
  if (!u) return;
  if (confirm(`Bạn có chắc muốn đặt lại mật khẩu của ${u.name} về mặc định "123456"?`)) {
    UserDB.update(id, { password: '123456' });
    showToast(`Đã đặt lại mật khẩu của ${u.name} thành "123456"!`, 'success');
  }
};

window.toggleUserStatus = function(id) {
  const u = UserDB.getById(id);
  if (!u) return;
  if (u.role === 'admin') {
    showToast('Không thể khóa tài khoản Quản trị viên chính!', 'error');
    return;
  }
  const newStatus = u.status === 'active' ? 'inactive' : 'active';
  UserDB.update(id, { status: newStatus });
  showToast(`Đã ${newStatus === 'active' ? 'kích hoạt' : 'tạm khóa'} tài khoản ${u.name}!`, 'info');
  loadTab('users');
};

window.filterUsers = function(query) {
  const q = query.toLowerCase();
  const filtered = UserDB.getAll().filter(u =>
    u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
  );
  const body = document.getElementById('usersBody');
  if (body) body.innerHTML = renderUsersRows(filtered);
};

function userModalHTML() {
  return `
  <div class="modal-overlay" id="userModal">
    <div class="modal">
      <div class="modal-header">
        <h3 class="modal-title" id="userModalTitle">Thêm người dùng mới</h3>
        <button class="modal-close" onclick="closeModal('userModal')">✕</button>
      </div>
      <div class="modal-body">
        <input type="hidden" id="umId">
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Họ và tên <span class="required">*</span></label>
            <input type="text" class="form-control" id="umName" placeholder="Nguyễn Văn A">
          </div>
          <div class="form-group">
            <label class="form-label">Email đăng nhập <span class="required">*</span></label>
            <input type="email" class="form-control" id="umEmail" placeholder="user@ohana.vn">
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Mật khẩu</label>
            <input type="password" class="form-control" id="umPass" placeholder="Để trống nếu không đổi">
          </div>
          <div class="form-group">
            <label class="form-label">Số điện thoại</label>
            <input type="tel" class="form-control" id="umPhone" placeholder="0901234567">
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Vai trò <span class="required">*</span></label>
            <select class="form-control" id="umRole">
              <option value="employee_new">Nhân viên mới</option>
              <option value="employee_old">Nhân viên Ohana</option>
              <option value="customer">Học viên</option>
              <option value="admin">Quản trị viên (Admin)</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Phòng ban / Đơn vị</label>
            <input type="text" class="form-control" id="umDept" placeholder="Phòng Kinh doanh Ohana">
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Trạng thái tài khoản</label>
          <select class="form-control" id="umStatus">
            <option value="active">Hoạt động bình thường</option>
            <option value="inactive">Khóa tài khoản</option>
          </select>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-secondary" onclick="closeModal('userModal')">Hủy bỏ</button>
        <button class="btn btn-primary" onclick="saveUser()">💾 Lưu tài khoản</button>
      </div>
    </div>
  </div>`;
}

window.openUserModal = function(id) {
  const title = document.getElementById('userModalTitle');
  const idEl = document.getElementById('umId');
  if (id) {
    const u = UserDB.getById(id);
    if (!u) return;
    title.textContent = 'Chỉnh sửa tài khoản người dùng';
    idEl.value = u.id;
    document.getElementById('umName').value = u.name;
    document.getElementById('umEmail').value = u.email;
    document.getElementById('umPass').value = '';
    document.getElementById('umPhone').value = u.phone || '';
    document.getElementById('umRole').value = u.role;
    document.getElementById('umDept').value = u.department || '';
    document.getElementById('umStatus').value = u.status || 'active';
  } else {
    title.textContent = 'Thêm người dùng mới';
    idEl.value = '';
    document.getElementById('umName').value = '';
    document.getElementById('umEmail').value = '';
    document.getElementById('umPass').value = '';
    document.getElementById('umPhone').value = '';
    document.getElementById('umRole').value = 'employee_new';
    document.getElementById('umDept').value = '';
    document.getElementById('umStatus').value = 'active';
  }
  openModal('userModal');
};

window.saveUser = function() {
  const id = document.getElementById('umId').value;
  const name = document.getElementById('umName').value.trim();
  const email = document.getElementById('umEmail').value.trim();
  const pass = document.getElementById('umPass').value.trim();
  const phone = document.getElementById('umPhone').value.trim();
  const role = document.getElementById('umRole').value;
  const department = document.getElementById('umDept').value.trim();
  const status = document.getElementById('umStatus').value;

  if (!name || !email) {
    showToast('Vui lòng điền đầy đủ Họ tên và Email!', 'error');
    return;
  }

  if (id) {
    const updateData = { name, email, phone, role, department, status };
    if (pass) updateData.password = pass;
    UserDB.update(id, updateData);
    showToast('Đã cập nhật thông tin thành công!', 'success');
  } else {
    if (!pass) {
      showToast('Vui lòng nhập mật khẩu cho tài khoản mới!', 'error');
      return;
    }
    UserDB.create({ name, email, password: pass, phone, role, department, status });
    showToast('Đã thêm người dùng mới thành công!', 'success');
  }

  closeModal('userModal');
  loadTab('users');
};

window.deleteUser = function(id) {
  if (confirm('Bạn có chắc chắn muốn xóa tài khoản này không?')) {
    UserDB.delete(id);
    showToast('Đã xóa người dùng thành công!', 'info');
    loadTab('users');
  }
};

// ─── Tab: Courses Management ──────────────────────────────────
function renderCourses(el) {
  const courses = CourseDB.getAll();
  const categories = CategoryDB.getAll();

  const actions = document.getElementById('adminHeaderActions');
  if (actions) {
    actions.innerHTML = `
      <button class="btn btn-primary btn-sm" onclick="openCourseModal()">+ Thêm Khóa học mới</button>
    `;
  }

  el.innerHTML = `
    <div class="admin-table-card">
      <div class="table-header">
        <div>
          <span class="table-title">Quản lý Khóa học OHANA (${courses.length})</span>
          <p style="font-size:13px; color:var(--gray-500); margin-top:4px;">
            Danh sách khóa học Miễn phí, Trả phí Cấp chứng chỉ, AI và Quy trình Ohana
          </p>
        </div>
        <div style="display:flex; align-items:center; gap:10px; flex-wrap:wrap;">
          <select id="adminCourseTypeFilter" class="form-control" style="width:auto; padding:6px 12px; font-size:13px;" onchange="filterAdminCourseType(this.value)">
            <option value="all">🌟 Tất cả khóa học</option>
            <option value="free">🎁 Khóa học Miễn phí</option>
            <option value="paid">🎓 Trả phí · Cấp chứng chỉ</option>
          </select>
          <input type="text" id="adminCourseSearchInput" class="search-input" placeholder="Tìm tên khóa học..." oninput="filterCoursesList(this.value)" style="max-width:200px;">
          <button class="btn btn-primary btn-sm" onclick="openCourseModal()">+ Thêm Khóa học</button>
        </div>
      </div>
      <table class="data-table">
        <thead>
          <tr>
            <th style="width:70px;">Ảnh</th>
            <th>Tên khóa học</th>
            <th>Phân loại & Học phí</th>
            <th>Danh mục</th>
            <th>Cấp độ</th>
            <th>Thời lượng</th>
            <th>Học viên</th>
            <th>Trạng thái</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody id="coursesBody">
          ${renderCoursesRows(courses)}
        </tbody>
      </table>
    </div>
    ${courseModalHTML(categories)}`;
}

function renderCoursesRows(courses) {
  return courses.map(c => {
    const cat = CategoryDB.getById(c.categoryId);
    const isPaid = c.priceType === 'paid' || (c.price && c.price > 0);
    const hasCert = !!c.hasCertificate;
    return `
      <tr>
        <td>
          <div style="width:54px; height:36px; border-radius:6px; overflow:hidden; background:#0f172a; display:flex; align-items:center; justify-content:center;">
            ${c.thumbnail ? `
              <img src="${c.thumbnail}" alt="" style="width:100%; height:100%; object-fit:cover;">
            ` : `
              <span style="font-size:18px;">${cat ? cat.icon : '📚'}</span>
            `}
          </div>
        </td>
        <td>
          <strong style="font-size: 14px; color: var(--gray-900); display: block;">${c.title}</strong>
          <span style="font-size: 12px; color: var(--gray-500);">Giảng viên: ${c.instructor}</span>
        </td>
        <td>
          ${isPaid ? `
            <div style="display:flex; flex-direction:column; gap:2px;">
              <span class="badge" style="background:rgba(217,119,6,0.12); color:#b45309; font-weight:800; width:fit-content;">🎓 Trả phí: ${formatMoney(c.price)}</span>
              ${hasCert ? `<small style="font-size:11px; color:#d97706; font-weight:600;">🎖️ Có cấp chứng chỉ</small>` : ''}
            </div>
          ` : `
            <span class="badge" style="background:rgba(16,185,129,0.12); color:#059669; font-weight:800;">🎁 Miễn phí 100%</span>
          `}
        </td>
        <td><span style="color:${cat ? cat.color : '#000'}; font-weight: 700;">${cat ? cat.name : '—'}</span></td>
        <td><span class="course-level-badge" style="position:static; background:${LEVEL_COLORS[c.level]}; color:white;">${c.level}</span></td>
        <td>${c.duration} (${c.totalLessons} bài)</td>
        <td><strong>${c.enrollCount || 0}</strong></td>
        <td>
          <span class="badge ${c.status === 'active' ? 'badge-active' : 'badge-inactive'}" style="cursor:pointer;" onclick="toggleCourseStatus(${c.id})" title="Bấm để bật/tắt khóa học">
            ${c.status === 'active' ? '✅ Đang mở' : '🔒 Đã đóng'}
          </span>
        </td>
        <td>
          <div class="action-btns">
            <button class="action-btn edit" onclick="openCourseModal(${c.id})">✏️ Sửa</button>
            <a href="course-detail.html?id=${c.id}" target="_blank" class="action-btn" style="text-decoration:none;">👁️ Xem</a>
            <button class="action-btn del" onclick="deleteCourse(${c.id})">🗑️ Xóa</button>
          </div>
        </td>
      </tr>`;
  }).join('');
}

window.filterAdminCourseType = function(type) {
  const q = (document.getElementById('adminCourseSearchInput')?.value || '').toLowerCase();
  let courses = CourseDB.getAll();
  if (type === 'free') {
    courses = courses.filter(c => c.priceType === 'free' || (!c.priceType && (!c.price || c.price === 0)));
  } else if (type === 'paid') {
    courses = courses.filter(c => c.priceType === 'paid' || c.hasCertificate || (c.price && c.price > 0));
  }
  if (q) {
    courses = courses.filter(c => c.title.toLowerCase().includes(q) || c.instructor.toLowerCase().includes(q));
  }
  const body = document.getElementById('coursesBody');
  if (body) body.innerHTML = renderCoursesRows(courses);
};

window.filterCoursesList = function(query) {
  const type = document.getElementById('adminCourseTypeFilter')?.value || 'all';
  window.filterAdminCourseType(type);
};

window.toggleCourseStatus = function(id) {
  const c = CourseDB.getById(id);
  if (!c) return;
  const newStatus = c.status === 'active' ? 'inactive' : 'active';
  CourseDB.update(id, { status: newStatus });
  showToast(`Đã ${newStatus === 'active' ? 'mở khóa' : 'đóng'} khóa học: ${c.title}`, 'info');
  loadTab('courses');
};

function courseModalHTML(categories) {
  return `
  <div class="modal-overlay" id="courseModal">
    <div class="modal modal-lg">
      <div class="modal-header">
        <h3 class="modal-title" id="courseModalTitle">Thêm Khóa Học Mới</h3>
        <button class="modal-close" onclick="closeModal('courseModal')">✕</button>
      </div>
      <div class="modal-body" style="max-height:76vh; overflow-y:auto;">
        <input type="hidden" id="cmId">
        <div class="form-group">
          <label class="form-label">Tên khóa học <span class="required">*</span></label>
          <input type="text" class="form-control" id="cmTitle" placeholder="Ví dụ: Làm chủ AI Agent trong Doanh nghiệp">
        </div>
        <div class="form-group">
          <label class="form-label">Mô tả tổng quan khóa học</label>
          <textarea class="form-control" id="cmDesc" rows="3" placeholder="Nội dung tổng quan, mục tiêu khóa học..."></textarea>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Loại khóa học <span class="required">*</span></label>
            <select class="form-control" id="cmPriceType" onchange="onAdminPriceTypeChange(this.value)">
              <option value="free">🎁 Khóa học Miễn phí</option>
              <option value="paid">🎓 Khóa học Trả phí Cấp chứng chỉ</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Danh mục chuyên môn <span class="required">*</span></label>
            <select class="form-control" id="cmCat">
              ${categories.map(c => `<option value="${c.id}">${c.name}</option>`).join('')}
            </select>
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Học phí ưu đãi (VNĐ - Nhập 0 nếu miễn phí)</label>
            <input type="number" class="form-control" id="cmPrice" placeholder="Ví dụ: 890000" min="0" step="10000">
          </div>
          <div class="form-group">
            <label class="form-label">Học phí gốc niêm yết (VNĐ - Gạch ngang)</label>
            <input type="number" class="form-control" id="cmOriginalPrice" placeholder="Ví dụ: 1800000" min="0" step="10000">
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Cấp chứng chỉ tốt nghiệp</label>
            <select class="form-control" id="cmHasCert">
              <option value="0">❌ Không cấp chứng chỉ</option>
              <option value="1">🎓 Có cấp chứng chỉ tốt nghiệp</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Giảng viên / Chuyên gia <span class="required">*</span></label>
            <input type="text" class="form-control" id="cmInstructor" placeholder="Alex Đặng – Giám đốc Sáng tạo">
          </div>
        </div>

        <div class="form-group" id="cmCertTitleGroup">
          <label class="form-label">Tên chứng chỉ cấp phát (In trên bằng)</label>
          <input type="text" class="form-control" id="cmCertTitle" placeholder="Ví dụ: Chứng Chỉ Chuyên Gia Thiết Kế Hình Ảnh AI">
        </div>

        <div class="form-group">
          <label class="form-label">Ảnh đại diện / Thumbnail URL (Link ảnh banner)</label>
          <input type="text" class="form-control" id="cmThumbnail" placeholder="https://i.ytimg.com/vi/G2KI_UpLvj4/hqdefault.jpg">
        </div>

        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Thời lượng ước tính</label>
            <input type="text" class="form-control" id="cmDuration" placeholder="6 giờ">
          </div>
          <div class="form-group">
            <label class="form-label">Cấp độ</label>
            <select class="form-control" id="cmLevel">
              <option value="Cơ bản">Cơ bản</option>
              <option value="Trung cấp">Trung cấp</option>
              <option value="Nâng cao">Nâng cao</option>
            </select>
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Tags từ khóa (cách nhau bằng dấu phẩy)</label>
          <input type="text" class="form-control" id="cmTags" placeholder="AI, Midjourney, Bán hàng, Ohana">
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-secondary" onclick="closeModal('courseModal')">Hủy bỏ</button>
        <button class="btn btn-primary" onclick="saveCourse()">💾 Lưu khóa học</button>
      </div>
    </div>
  </div>`;
}

window.onAdminPriceTypeChange = function(type) {
  const priceInput = document.getElementById('cmPrice');
  const hasCertSelect = document.getElementById('cmHasCert');
  if (type === 'free') {
    if (priceInput) priceInput.value = 0;
    if (hasCertSelect) hasCertSelect.value = '0';
  } else if (type === 'paid') {
    if (priceInput && (!priceInput.value || parseInt(priceInput.value) === 0)) priceInput.value = 890000;
    if (hasCertSelect) hasCertSelect.value = '1';
  }
};

window.openCourseModal = function(id) {
  const title = document.getElementById('courseModalTitle');
  const idEl = document.getElementById('cmId');
  if (id) {
    const c = CourseDB.getById(id);
    if (!c) return;
    title.textContent = 'Chỉnh sửa Khóa học';
    idEl.value = c.id;
    document.getElementById('cmTitle').value = c.title;
    document.getElementById('cmDesc').value = c.description;
    document.getElementById('cmCat').value = c.categoryId;
    document.getElementById('cmPriceType').value = c.priceType || (c.price > 0 ? 'paid' : 'free');
    document.getElementById('cmPrice').value = c.price !== undefined ? c.price : 0;
    document.getElementById('cmOriginalPrice').value = c.originalPrice !== undefined ? c.originalPrice : 0;
    document.getElementById('cmHasCert').value = c.hasCertificate ? '1' : '0';
    document.getElementById('cmCertTitle').value = c.certificateTitle || '';
    document.getElementById('cmInstructor').value = c.instructor;
    document.getElementById('cmThumbnail').value = c.thumbnail || '';
    document.getElementById('cmDuration').value = c.duration;
    document.getElementById('cmLevel').value = c.level;
    document.getElementById('cmTags').value = (c.tags || []).join(', ');
  } else {
    title.textContent = 'Thêm Khóa Học Mới';
    idEl.value = '';
    document.getElementById('cmTitle').value = '';
    document.getElementById('cmDesc').value = '';
    document.getElementById('cmPriceType').value = 'free';
    document.getElementById('cmPrice').value = 0;
    document.getElementById('cmOriginalPrice').value = 0;
    document.getElementById('cmHasCert').value = '0';
    document.getElementById('cmCertTitle').value = '';
    document.getElementById('cmInstructor').value = '';
    document.getElementById('cmThumbnail').value = '';
    document.getElementById('cmDuration').value = '5 giờ';
    document.getElementById('cmLevel').value = 'Cơ bản';
    document.getElementById('cmTags').value = '';
  }
  openModal('courseModal');
};

window.saveCourse = function() {
  const id = document.getElementById('cmId').value;
  const title = document.getElementById('cmTitle').value.trim();
  const description = document.getElementById('cmDesc').value.trim();
  const categoryId = parseInt(document.getElementById('cmCat').value);
  const priceType = document.getElementById('cmPriceType').value;
  const price = parseInt(document.getElementById('cmPrice').value) || 0;
  const originalPrice = parseInt(document.getElementById('cmOriginalPrice').value) || 0;
  const hasCertificate = document.getElementById('cmHasCert').value === '1';
  const certificateTitle = document.getElementById('cmCertTitle').value.trim();
  const instructor = document.getElementById('cmInstructor').value.trim();
  const thumbnail = document.getElementById('cmThumbnail').value.trim();
  const duration = document.getElementById('cmDuration').value.trim();
  const level = document.getElementById('cmLevel').value;
  const tags = document.getElementById('cmTags').value.split(',').map(t => t.trim()).filter(Boolean);

  if (!title || !instructor) {
    showToast('Vui lòng điền tên khóa học và giảng viên!', 'error');
    return;
  }

  if (id) {
    CourseDB.update(id, { title, description, categoryId, instructor, thumbnail, duration, level, tags, priceType, price, originalPrice, hasCertificate, certificateTitle });
    showToast('Đã cập nhật khóa học thành công!', 'success');
  } else {
    CourseDB.create({
      title,
      description,
      categoryId,
      instructor,
      thumbnail,
      duration,
      level,
      tags,
      priceType,
      price,
      originalPrice,
      hasCertificate,
      certificateTitle,
      totalLessons: 0,
      allowedRoles: ['admin', 'employee_new', 'employee_old', 'customer'],
      status: 'active'
    });
    showToast('Đã tạo khóa học mới thành công!', 'success');
  }

  closeModal('courseModal');
  loadTab('courses');
};

window.deleteCourse = function(id) {
  if (confirm('Bạn có chắc muốn xóa khóa học này và các bài học liên quan không?')) {
    CourseDB.delete(id);
    showToast('Đã xóa khóa học thành công!', 'info');
    loadTab('courses');
  }
};

// ─── Format Video URL Helper ──────────────────────────────────
function formatVideoUrl(url) {
  if (!url) return '';
  url = url.trim();
  const watchMatch = url.match(/[?&]v=([^&]+)/);
  if (watchMatch) return `https://www.youtube.com/embed/${watchMatch[1]}`;
  const shortMatch = url.match(/youtu\.be\/([^?&]+)/);
  if (shortMatch) return `https://www.youtube.com/embed/${shortMatch[1]}`;
  return url;
}

// ─── Tab: Lessons Management ──────────────────────────────────
function renderLessons(el) {
  const courses = CourseDB.getAll();
  const lessons = LessonDB.getAll();

  const actions = document.getElementById('adminHeaderActions');
  if (actions) {
    actions.innerHTML = `
      <button class="btn btn-primary btn-sm" onclick="openLessonModal()">+ Thêm Bài học mới</button>
    `;
  }

  el.innerHTML = `
    <div class="admin-table-card">
      <div class="table-header">
        <div>
          <span class="table-title">Quản lý Bài giảng (${lessons.length})</span>
          <p style="font-size:13px; color:var(--gray-500); margin-top:4px;">
            Video bài học, tài liệu đính kèm và lộ trình chi tiết từng khóa
          </p>
        </div>
        <button class="btn btn-primary btn-sm" onclick="openLessonModal()">+ Thêm Bài học mới</button>
      </div>
      <div style="padding: 16px 24px; background: var(--gray-50); border-bottom: 1px solid var(--gray-200); display: flex; align-items: center; gap: 12px; flex-wrap:wrap;">
        <span style="font-size: 13.5px; font-weight: 700; color: var(--gray-700);">Lọc theo khóa học:</span>
        <select class="form-control" style="width: auto; max-width: 380px;" onchange="filterLessonsByCourse(this.value)">
          <option value="">Tất cả các khóa học</option>
          ${courses.map(c => `<option value="${c.id}">${c.title}</option>`).join('')}
        </select>
      </div>
      <table class="data-table">
        <thead>
          <tr>
            <th>Bài học</th>
            <th>Thuộc khóa học</th>
            <th>Thời lượng</th>
            <th>Video bài giảng</th>
            <th>Tài liệu đính kèm</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody id="lessonsBody">
          ${renderLessonRows(lessons)}
        </tbody>
      </table>
    </div>
    ${lessonModalHTML(courses)}`;
}

function renderLessonRows(lessons) {
  return lessons.map(l => {
    const course = CourseDB.getById(l.courseId);
    return `
      <tr>
        <td>
          <strong style="font-size: 14px; color: var(--gray-900); display: block;">${l.title}</strong>
          <span style="font-size: 12px; color: var(--gray-500);">${l.description || 'Không có mô tả'}</span>
        </td>
        <td style="font-size: 13.5px; font-weight: 600; color: var(--primary);">${course ? course.title : '—'}</td>
        <td>${l.duration}</td>
        <td>
          ${l.videoUrl ? `
            <button class="action-btn" onclick="openAdminVideoPreview('${l.videoUrl}', '${l.title.replace(/'/g, "\\'")}', 'Thời lượng: ${l.duration}')" style="background:#fef2f2; color:#ef4444; border:1px solid #fecaca;">
              ▶ Xem video
            </button>
          ` : '<span style="color:var(--gray-400);">Chưa có</span>'}
        </td>
        <td>${l.docName ? `📄 ${l.docName}` : '<span style="color:var(--gray-400)">Không có</span>'}</td>
        <td>
          <div class="action-btns">
            <button class="action-btn edit" onclick="openLessonModal(${l.id})">✏️ Sửa</button>
            <button class="action-btn del" onclick="deleteLesson(${l.id})">🗑️ Xóa</button>
          </div>
        </td>
      </tr>`;
  }).join('');
}

window.filterLessonsByCourse = function(courseId) {
  const all = LessonDB.getAll();
  const filtered = courseId ? all.filter(l => l.courseId === parseInt(courseId)) : all;
  const body = document.getElementById('lessonsBody');
  if (body) body.innerHTML = renderLessonRows(filtered);
};

function lessonModalHTML(courses) {
  return `
  <div class="modal-overlay" id="lessonModal">
    <div class="modal modal-lg">
      <div class="modal-header">
        <h3 class="modal-title" id="lessonModalTitle">Thêm Bài Học Mới</h3>
        <button class="modal-close" onclick="closeModal('lessonModal')">✕</button>
      </div>
      <div class="modal-body">
        <input type="hidden" id="lmId">
        <div class="form-group">
          <label class="form-label">Thuộc khóa học <span class="required">*</span></label>
          <select class="form-control" id="lmCourse">
            ${courses.map(c => `<option value="${c.id}">${c.title}</option>`).join('')}
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Tiêu đề bài học <span class="required">*</span></label>
          <input type="text" class="form-control" id="lmTitle" placeholder="Ví dụ: Bài 1: Cấu trúc câu lệnh Prompt chuẩn chỉnh">
        </div>
        <div class="form-group">
          <label class="form-label">Mô tả bài học</label>
          <textarea class="form-control" id="lmDesc" rows="2" placeholder="Tóm tắt nội dung bài học..."></textarea>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">URL Video (YouTube / MP4 / nhúng)</label>
            <div style="display:flex; gap:8px;">
              <input type="text" class="form-control" id="lmVideo" placeholder="https://www.youtube.com/watch?v=... hoặc embed">
              <button type="button" class="btn btn-secondary btn-sm" onclick="previewModalVideo()" style="white-space:nowrap;">▶ Thử</button>
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">Thời lượng bài học</label>
            <input type="text" class="form-control" id="lmDuration" placeholder="45 phút hoặc 4:55">
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Tên tài liệu đính kèm</label>
          <input type="text" class="form-control" id="lmDoc" placeholder="Giao-trinh-Ohana.pdf">
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-secondary" onclick="closeModal('lessonModal')">Hủy bỏ</button>
        <button class="btn btn-primary" onclick="saveLesson()">💾 Lưu bài học</button>
      </div>
    </div>
  </div>`;
}

window.previewModalVideo = function() {
  const url = formatVideoUrl(document.getElementById('lmVideo').value.trim());
  const title = document.getElementById('lmTitle').value.trim() || 'Xem thử video';
  if (!url) {
    showToast('Vui lòng nhập đường dẫn video để xem thử!', 'error');
    return;
  }
  openAdminVideoPreview(url, title, 'Xem thử video bài giảng');
};

window.openLessonModal = function(id) {
  const title = document.getElementById('lessonModalTitle');
  const idEl = document.getElementById('lmId');
  if (id) {
    const l = LessonDB.getById(id);
    if (!l) return;
    title.textContent = 'Chỉnh sửa Bài Học';
    idEl.value = l.id;
    document.getElementById('lmCourse').value = l.courseId;
    document.getElementById('lmTitle').value = l.title;
    document.getElementById('lmDesc').value = l.description;
    document.getElementById('lmVideo').value = l.videoUrl || '';
    document.getElementById('lmDuration').value = l.duration;
    document.getElementById('lmDoc').value = l.docName || '';
  } else {
    title.textContent = 'Thêm Bài Học Mới';
    idEl.value = '';
    document.getElementById('lmTitle').value = '';
    document.getElementById('lmDesc').value = '';
    document.getElementById('lmVideo').value = '';
    document.getElementById('lmDuration').value = '40 phút';
    document.getElementById('lmDoc').value = '';
  }
  openModal('lessonModal');
};

window.saveLesson = function() {
  const id = document.getElementById('lmId').value;
  const courseId = parseInt(document.getElementById('lmCourse').value);
  const title = document.getElementById('lmTitle').value.trim();
  const description = document.getElementById('lmDesc').value.trim();
  let videoUrl = document.getElementById('lmVideo').value.trim();
  const duration = document.getElementById('lmDuration').value.trim();
  const docName = document.getElementById('lmDoc').value.trim();

  if (!title) {
    showToast('Vui lòng điền tiêu đề bài học!', 'error');
    return;
  }

  videoUrl = formatVideoUrl(videoUrl);

  if (id) {
    LessonDB.update(id, { courseId, title, description, videoUrl, duration, docName });
    showToast('Đã cập nhật bài học thành công!', 'success');
  } else {
    LessonDB.create({
      courseId,
      title,
      description,
      videoUrl,
      duration,
      docName,
      order: LessonDB.getByCourse(courseId).length + 1
    });
    // Update totalLessons in course
    const course = CourseDB.getById(courseId);
    if (course) {
      CourseDB.update(courseId, { totalLessons: (course.totalLessons || 0) + 1 });
    }
    showToast('Đã thêm bài học mới!', 'success');
  }

  closeModal('lessonModal');
  loadTab('lessons');
};

window.deleteLesson = function(id) {
  if (confirm('Bạn có chắc chắn muốn xóa bài học này không?')) {
    LessonDB.delete(id);
    showToast('Đã xóa bài học thành công!', 'info');
    loadTab('lessons');
  }
};

// ─── Tab: YouTube Video Manager ───────────────────────────────
function renderYouTubeManager(el) {
  const videos = window.OFFICIAL_YOUTUBE_VIDEOS || [];

  const actions = document.getElementById('adminHeaderActions');
  if (actions) {
    actions.innerHTML = `
      <button class="btn btn-secondary btn-sm" onclick="syncYouTubeToCourse6()">🔄 Đồng bộ vào Khóa học 6</button>
      <a href="https://www.youtube.com/@OhanaAstronixaVN" target="_blank" class="btn btn-primary btn-sm" style="background:#ef4444; border-color:#ef4444;">▶ Mở Kênh YouTube ↗</a>
    `;
  }

  el.innerHTML = `
    <div class="admin-table-card">
      <div class="table-header">
        <div>
          <span class="table-title">📺 Kênh YouTube Chính Thức: Ohana Astronixa VN (${videos.length} video)</span>
          <p style="font-size:13px; color:var(--gray-500); margin-top:4px;">
            Trọn bộ 7 video chuẩn hóa quy trình SOP, văn hóa và thao tác vận hành Astronixa trên kênh <strong>@OhanaAstronixaVN</strong>
          </p>
        </div>
        <div style="display:flex; gap:10px; flex-wrap:wrap;">
          <button class="btn btn-secondary btn-sm" onclick="syncYouTubeToCourse6()">
            🔄 Đồng bộ vào Khóa học 6
          </button>
          <a href="https://www.youtube.com/@OhanaAstronixaVN" target="_blank" class="btn btn-primary btn-sm" style="background:#ef4444; border-color:#ef4444;">
            ▶ Mở kênh YouTube ↗
          </a>
        </div>
      </div>
      <div style="padding:24px;">
        <div class="admin-yt-grid">
          ${videos.map((v, i) => `
            <div class="admin-yt-card">
              <div class="admin-yt-thumb" onclick="openAdminVideoPreview('${v.embedUrl}', '${v.title.replace(/'/g, "\\'")}', 'Bài ${i + 1} · Thời lượng ${v.duration}')" style="cursor:pointer;" title="Bấm để xem video">
                <img src="${v.thumbnail}" alt="${v.title}" loading="lazy">
                <span class="admin-yt-time">${v.duration}</span>
                <span class="admin-yt-badge">Bài ${i + 1}</span>
                <div style="position:absolute; inset:0; background:rgba(0,0,0,0.3); display:flex; align-items:center; justify-content:center;">
                  <div style="width:42px; height:42px; border-radius:50%; background:#ef4444; color:white; display:flex; align-items:center; justify-content:center; font-size:16px; padding-left:2px; box-shadow:0 4px 14px rgba(0,0,0,0.5);">▶</div>
                </div>
              </div>
              <div class="admin-yt-body">
                <span class="admin-yt-cat">${v.category}</span>
                <h4 class="admin-yt-title" title="${v.title}">${v.title}</h4>
                <div style="display:flex; justify-content:space-between; align-items:center; font-size:12px; color:var(--gray-500); padding-top:10px; border-top:1px solid var(--gray-100);">
                  <span>ID: <code>${v.id}</code></span>
                  <div style="display:flex; gap:8px;">
                    <button class="action-btn" onclick="openAdminVideoPreview('${v.embedUrl}', '${v.title.replace(/'/g, "\\'")}', 'Bài ${i + 1} · Thời lượng ${v.duration}')">👁️ Xem</button>
                    <a href="lesson.html?course=${v.courseId}&lesson=${v.lessonId}" target="_blank" class="action-btn" style="text-decoration:none;">🎓 Bài học</a>
                  </div>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

window.syncYouTubeToCourse6 = function() {
  const course6 = CourseDB.getById(6);
  if (!course6) {
    showToast('Không tìm thấy Khóa học số 6!', 'error');
    return;
  }
  CourseDB.update(6, {
    totalLessons: 7,
    lessonIds: [21, 22, 23, 24, 25, 26, 27],
    thumbnail: 'https://i.ytimg.com/vi/G2KI_UpLvj4/hqdefault.jpg'
  });
  showToast('Đã đồng bộ 7 video YouTube chính thức vào Khóa học 6!', 'success');
  setTimeout(() => loadTab('youtube'), 400);
};

// ─── Tab: Quizzes Management ──────────────────────────────────
function renderQuizzes(el) {
  const quizzes = QuizDB.getAll();

  const actions = document.getElementById('adminHeaderActions');
  if (actions) {
    actions.innerHTML = `
      <span style="font-size:13px; color:var(--gray-500);">Tổng ${quizzes.length} bài kiểm tra</span>
    `;
  }

  el.innerHTML = `
    <div class="admin-table-card">
      <div class="table-header">
        <div>
          <span class="table-title">Quản lý Đề thi Trắc nghiệm & Đánh giá (${quizzes.length})</span>
          <p style="font-size:13px; color:var(--gray-500); margin-top:4px;">
            Cấu hình thời gian làm bài, điểm số qua môn và chỉnh sửa ngân hàng câu hỏi trắc nghiệm
          </p>
        </div>
      </div>
      <table class="data-table">
        <thead>
          <tr>
            <th>Tên bài kiểm tra</th>
            <th>Khóa học</th>
            <th>Thời gian</th>
            <th>Điểm đạt</th>
            <th>Số câu hỏi</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          ${quizzes.map(q => {
            const course = CourseDB.getById(q.courseId);
            return `
              <tr>
                <td><strong style="color: var(--gray-900);">${q.title}</strong></td>
                <td><span style="color:var(--primary); font-weight:600;">${course ? course.title : '—'}</span></td>
                <td>⏱ ${q.timeLimit} phút</td>
                <td><strong style="color: var(--success);">${q.passingScore}%</strong></td>
                <td><span class="badge" style="background:var(--gray-100); color:var(--gray-800);">${q.questions ? q.questions.length : 0} câu</span></td>
                <td>
                  <div class="action-btns">
                    <button class="action-btn edit" onclick="openQuizEditor(${q.id})">✏️ Sửa đề & câu hỏi</button>
                    <a href="quiz.html?course=${q.courseId}" target="_blank" class="action-btn" style="text-decoration:none;">
                      👁️ Làm thử đề
                    </a>
                  </div>
                </td>
              </tr>`;
          }).join('')}
        </tbody>
      </table>
    </div>`;
}

// ─── Quiz Question Editor Engine ──────────────────────────────
let editingQuizQuestions = [];

window.openQuizEditor = function(quizId) {
  const q = QuizDB.getById(quizId);
  if (!q) return;

  const course = CourseDB.getById(q.courseId);
  document.getElementById('qemQuizId').value = q.id;
  document.getElementById('qemName').value = q.title;
  document.getElementById('qemTime').value = q.timeLimit || 15;
  document.getElementById('qemPass').value = q.passingScore || 70;
  document.getElementById('qemCourseTitle').value = course ? course.title : `Khóa học #${q.courseId}`;

  editingQuizQuestions = JSON.parse(JSON.stringify(q.questions || []));
  renderQuizEditorQuestions();
  openModal('quizEditorModal');
};

function renderQuizEditorQuestions() {
  const container = document.getElementById('qemQuestionsList');
  const countEl = document.getElementById('qemQuestionCount');
  if (!container) return;

  countEl.textContent = editingQuizQuestions.length;

  if (!editingQuizQuestions.length) {
    container.innerHTML = `
      <div style="text-align:center; padding:30px; background:var(--gray-50); border-radius:var(--radius); border:1px dashed var(--gray-300);">
        <p style="color:var(--gray-500); margin-bottom:12px;">Đề thi hiện chưa có câu hỏi nào.</p>
        <button type="button" class="btn btn-secondary btn-sm" onclick="addQuestionItem()">+ Thêm câu hỏi đầu tiên</button>
      </div>`;
    return;
  }

  container.innerHTML = editingQuizQuestions.map((item, idx) => `
    <div class="qem-question-card" id="qemCard_${idx}">
      <div class="qem-q-head">
        <span class="qem-q-num">Câu hỏi ${idx + 1}</span>
        <button type="button" class="action-btn del" onclick="deleteQuestionItem(${idx})">🗑️ Xóa câu này</button>
      </div>
      <div class="form-group" style="margin-bottom:12px;">
        <label class="form-label" style="font-size:12.5px;">Nội dung câu hỏi:</label>
        <input type="text" class="form-control" value="${(item.text || '').replace(/"/g, '&quot;')}" oninput="updateQuestionText(${idx}, this.value)" placeholder="Nhập nội dung câu hỏi trắc nghiệm...">
      </div>
      <div>
        <label class="form-label" style="font-size:12.5px;">Các lựa chọn trả lời (Chọn nút tròn đáp án đúng):</label>
        ${[0, 1, 2, 3].map(optIdx => `
          <div class="qem-opt-row">
            <input type="radio" name="qemCorrect_${idx}" class="qem-radio" ${item.correct === optIdx ? 'checked' : ''} onchange="setQuestionCorrect(${idx}, ${optIdx})" title="Chọn đáp án này là đúng">
            <input type="text" class="form-control" style="font-size:13px;" value="${(item.options && item.options[optIdx] ? item.options[optIdx] : '').replace(/"/g, '&quot;')}" oninput="updateQuestionOption(${idx}, ${optIdx}, this.value)" placeholder="Đáp án ${String.fromCharCode(65 + optIdx)}">
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');
}

window.addQuestionItem = function() {
  editingQuizQuestions.push({
    id: Date.now(),
    text: '',
    options: ['', '', '', ''],
    correct: 0
  });
  renderQuizEditorQuestions();
};

window.deleteQuestionItem = function(idx) {
  if (confirm(`Bạn có chắc muốn xóa câu hỏi ${idx + 1} không?`)) {
    editingQuizQuestions.splice(idx, 1);
    renderQuizEditorQuestions();
  }
};

window.updateQuestionText = function(idx, val) {
  if (editingQuizQuestions[idx]) editingQuizQuestions[idx].text = val;
};

window.updateQuestionOption = function(qIdx, optIdx, val) {
  if (editingQuizQuestions[qIdx]) {
    if (!editingQuizQuestions[qIdx].options) editingQuizQuestions[qIdx].options = ['', '', '', ''];
    editingQuizQuestions[qIdx].options[optIdx] = val;
  }
};

window.setQuestionCorrect = function(qIdx, optIdx) {
  if (editingQuizQuestions[qIdx]) {
    editingQuizQuestions[qIdx].correct = optIdx;
  }
};

window.saveQuizEditor = function() {
  const quizId = parseInt(document.getElementById('qemQuizId').value);
  const title = document.getElementById('qemName').value.trim();
  const timeLimit = parseInt(document.getElementById('qemTime').value) || 15;
  const passingScore = parseInt(document.getElementById('qemPass').value) || 70;

  if (!title) {
    showToast('Vui lòng nhập tên bài kiểm tra!', 'error');
    return;
  }

  // Validate questions
  for (let i = 0; i < editingQuizQuestions.length; i++) {
    const q = editingQuizQuestions[i];
    if (!q.text.trim()) {
      showToast(`Câu hỏi ${i + 1} chưa có nội dung!`, 'error');
      return;
    }
  }

  QuizDB.update(quizId, {
    title,
    timeLimit,
    passingScore,
    questions: editingQuizQuestions
  });

  showToast('Đã lưu thay đổi đề thi thành công!', 'success');
  closeModal('quizEditorModal');
  loadTab('quizzes');
};

// ─── Tab: Results Management ──────────────────────────────────
function renderResults(el) {
  const results = ResultDB.getAll();
  const courses = CourseDB.getAll();

  const actions = document.getElementById('adminHeaderActions');
  if (actions) {
    actions.innerHTML = `
      <button class="btn btn-secondary btn-sm" onclick="exportResultsToCSV()">📥 Xuất Excel (CSV)</button>
    `;
  }

  el.innerHTML = `
    <div class="admin-table-card">
      <div class="table-header">
        <div>
          <span class="table-title">Bảng điểm & Kết quả Học viên (${results.length})</span>
          <p style="font-size:13px; color:var(--gray-500); margin-top:4px;">
            Lịch sử nộp bài, điểm số và kết quả đánh giá chứng chỉ của toàn bộ học viên
          </p>
        </div>
        <div style="display:flex; gap:10px; flex-wrap:wrap;">
          <button class="btn btn-secondary btn-sm" onclick="exportResultsToCSV()">
            📥 Xuất Excel (CSV)
          </button>
        </div>
      </div>
      <div style="padding: 14px 24px; background: var(--gray-50); border-bottom: 1px solid var(--gray-200); display: flex; align-items: center; gap: 14px; flex-wrap: wrap;">
        <span style="font-size: 13px; font-weight: 700; color: var(--gray-700);">Lọc kết quả:</span>
        <select class="form-control" style="width: auto; max-width: 280px;" id="resCourseFilter" onchange="filterResultsList()">
          <option value="">Tất cả các khóa học</option>
          ${courses.map(c => `<option value="${c.id}">${c.title}</option>`).join('')}
        </select>
        <select class="form-control" style="width: auto; max-width: 180px;" id="resStatusFilter" onchange="filterResultsList()">
          <option value="">Tất cả trạng thái</option>
          <option value="passed">✅ Đạt yêu cầu</option>
          <option value="failed">❌ Chưa đạt</option>
        </select>
        <input type="text" class="search-input" id="resSearch" placeholder="Tìm theo tên học viên..." oninput="filterResultsList()" style="max-width:240px;">
      </div>
      <div id="resultsTableWrap">
        ${renderResultsTableRows(results)}
      </div>
    </div>`;
}

function renderResultsTableRows(results) {
  if (!results.length) {
    return `
      <div class="empty-state">
        <div class="empty-icon">🏆</div>
        <div class="empty-title">Không tìm thấy kết quả phù hợp</div>
      </div>`;
  }

  return `
    <table class="data-table">
      <thead>
        <tr>
          <th>Học viên</th>
          <th>Khóa học</th>
          <th>Điểm số</th>
          <th>Số câu đúng</th>
          <th>Thời gian làm bài</th>
          <th>Kết quả</th>
          <th>Ngày thi</th>
          <th>Thao tác</th>
        </tr>
      </thead>
      <tbody>
        ${results.map(r => {
          const u = UserDB.getById(r.userId);
          const c = CourseDB.getById(r.courseId);
          const mins = Math.floor((r.timeTaken || 0) / 60);
          const secs = (r.timeTaken || 0) % 60;
          return `
            <tr>
              <td>
                <div class="user-cell">
                  <div class="avatar">${u ? u.name.charAt(0) : '?'}</div>
                  <div>
                    <div class="u-name">${u ? u.name : 'Người dùng đã xóa'}</div>
                    <div class="u-email">${u ? u.email : ''}</div>
                  </div>
                </div>
              </td>
              <td><strong>${c ? c.title : 'Khóa học đã xóa'}</strong></td>
              <td><strong style="font-size: 16px; color: ${r.passed ? 'var(--success)' : 'var(--danger)'};">${r.score}%</strong></td>
              <td>${r.correctCount} / ${r.totalQuestions}</td>
              <td>${mins}p ${secs}s</td>
              <td>
                <span class="badge ${r.passed ? 'badge-active' : 'badge-inactive'}">
                  ${r.passed ? '✅ Đạt' : '❌ Chưa đạt'}
                </span>
              </td>
              <td>${formatDate(r.submittedAt)}</td>
              <td>
                <button class="action-btn del" onclick="deleteResultItem(${r.id})" title="Xóa kết quả này">🗑️ Xóa</button>
              </td>
            </tr>`;
        }).join('')}
      </tbody>
    </table>`;
}

window.filterResultsList = function() {
  const courseId = document.getElementById('resCourseFilter') ? document.getElementById('resCourseFilter').value : '';
  const status = document.getElementById('resStatusFilter') ? document.getElementById('resStatusFilter').value : '';
  const search = document.getElementById('resSearch') ? document.getElementById('resSearch').value.trim().toLowerCase() : '';

  let list = ResultDB.getAll();
  if (courseId) {
    list = list.filter(r => r.courseId === parseInt(courseId));
  }
  if (status) {
    if (status === 'passed') list = list.filter(r => r.passed);
    else if (status === 'failed') list = list.filter(r => !r.passed);
  }
  if (search) {
    list = list.filter(r => {
      const u = UserDB.getById(r.userId);
      return u && u.name.toLowerCase().includes(search);
    });
  }

  const wrap = document.getElementById('resultsTableWrap');
  if (wrap) wrap.innerHTML = renderResultsTableRows(list);
};

window.deleteResultItem = function(id) {
  if (confirm('Bạn có chắc muốn xóa kết quả thi này không?')) {
    const list = ResultDB.getAll().filter(r => r.id !== parseInt(id));
    setDB(DB_KEYS.results, list);
    showToast('Đã xóa kết quả thi thành công!', 'info');
    filterResultsList();
  }
};

window.exportResultsToCSV = function() {
  const results = ResultDB.getAll();
  if (!results.length) {
    showToast('Chưa có kết quả bài thi nào để xuất!', 'info');
    return;
  }
  let csv = '\uFEFF'; // UTF-8 BOM for Excel
  csv += 'STT,Họ tên học viên,Email,Khóa học,Điểm số (%),Số câu đúng,Tổng câu hỏi,Thời gian làm bài,Đánh giá,Ngày nộp\n';
  results.forEach((r, i) => {
    const u = UserDB.getById(r.userId) || { name: 'Người dùng', email: '—' };
    const c = CourseDB.getById(r.courseId) || { title: 'Khóa học' };
    const mins = Math.floor((r.timeTaken || 0) / 60);
    const secs = (r.timeTaken || 0) % 60;
    csv += `"${i + 1}","${u.name.replace(/"/g, '""')}","${u.email}","${c.title.replace(/"/g, '""')}",${r.score},${r.correctCount},${r.totalQuestions},"${mins}p ${secs}s","${r.passed ? 'Đạt yêu cầu' : 'Chưa đạt'}","${formatDate(r.submittedAt)}"\n`;
  });

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.setAttribute('download', `ohana_bang_diem_${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  link.remove();
  showToast('Đã xuất bảng điểm ra file CSV thành công!', 'success');
};


// ─── Tab: Settings & Backup ───────────────────────────────────
function renderSettings(el) {
  const s = SettingsDB.get();
  el.innerHTML = `
    <div class="admin-table-card">
      <div class="table-header">
        <span class="table-title">Cấu hình Hệ thống Website OHANA Academy</span>
      </div>
      <div style="padding: 24px;">
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Tên nền tảng</label>
            <input type="text" class="form-control" id="stName" value="${s.siteName || 'OHANA Academy'}">
          </div>
          <div class="form-group">
            <label class="form-label">Hotline tư vấn</label>
            <input type="text" class="form-control" id="stHotline" value="${s.hotline || '0988 739 896'}">
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Email liên hệ</label>
            <input type="email" class="form-control" id="stEmail" value="${s.email || 'contact@ohana.vn'}">
          </div>
          <div class="form-group">
            <label class="form-label">Website</label>
            <input type="text" class="form-control" id="stWeb" value="${s.website || 'https://ohana.vn'}">
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Địa chỉ trụ sở</label>
          <input type="text" class="form-control" id="stAddr" value="${s.address || 'Hà Nội & TP. Hồ Chí Minh'}">
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Facebook Fanpage</label>
            <input type="text" class="form-control" id="stFb" value="${s.facebook || ''}">
          </div>
          <div class="form-group">
            <label class="form-label">YouTube Channel</label>
            <input type="text" class="form-control" id="stYt" value="${s.youtube || ''}">
          </div>
        </div>
        <button class="btn btn-primary" onclick="saveSettings()">💾 Lưu cài đặt</button>
      </div>
    </div>

    <!-- Backup & Restore Data -->
    <div class="admin-table-card">
      <div class="table-header">
        <span class="table-title">Sao lưu & Khôi phục Dữ liệu (Backup & Restore)</span>
      </div>
      <div style="padding: 24px; display: flex; gap: 16px; flex-wrap: wrap;">
        <button class="btn btn-secondary" onclick="exportData()">
          📥 Xuất toàn bộ dữ liệu ra file JSON
        </button>
        <button class="btn btn-secondary" onclick="document.getElementById('importFile').click()">
          📤 Khôi phục dữ liệu từ file JSON
        </button>
        <button class="btn btn-secondary" style="color: var(--danger); border: 1px solid #fecaca;" onclick="resetDefaultData()">
          ⚠️ Khôi phục dữ liệu mẫu Ohana ban đầu
        </button>
        <input type="file" id="importFile" style="display:none;" accept=".json" onchange="importData(event)">
      </div>
    </div>`;
}

window.saveSettings = function() {
  const data = {
    siteName: document.getElementById('stName').value.trim(),
    hotline:  document.getElementById('stHotline').value.trim(),
    email:    document.getElementById('stEmail').value.trim(),
    website:  document.getElementById('stWeb').value.trim(),
    address:  document.getElementById('stAddr').value.trim(),
    facebook: document.getElementById('stFb').value.trim(),
    youtube:  document.getElementById('stYt').value.trim()
  };
  SettingsDB.save(data);
  showToast('Đã lưu thông tin cài đặt thành công!', 'success');
};

window.exportData = function() {
  const exportObj = {};
  Object.keys(DB_KEYS).forEach(k => {
    exportObj[k] = getDB(DB_KEYS[k]);
  });
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", `ohana_academy_backup_${new Date().toISOString().split('T')[0]}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
  showToast('Đã xuất file sao lưu dữ liệu thành công!', 'success');
};

window.importData = function(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const data = JSON.parse(e.target.result);
      Object.keys(DB_KEYS).forEach(k => {
        if (data[k]) setDB(DB_KEYS[k], data[k]);
      });
      showToast('Đã khôi phục dữ liệu thành công!', 'success');
      setTimeout(() => window.location.reload(), 800);
    } catch (err) {
      showToast('File JSON không hợp lệ!', 'error');
    }
  };
  reader.readAsText(file);
};

window.resetDefaultData = function() {
  if (confirm('CẢNH BÁO: Thao tác này sẽ đặt lại toàn bộ dữ liệu mẫu ban đầu của Ohana. Bạn có chắc chắn không?')) {
    localStorage.clear();
    initDB();
    showToast('Đã khôi phục dữ liệu mẫu thành công!', 'success');
    setTimeout(() => window.location.reload(), 800);
  }
};

// ─── Modal Helpers ────────────────────────────────────────────
function openModal(id) {
  const m = document.getElementById(id);
  if (m) m.classList.add('show');
}
function closeModal(id) {
  const m = document.getElementById(id);
  if (m) m.classList.remove('show');
}
window.closeModal = closeModal;

// Khởi chạy admin khi load trang
document.addEventListener('DOMContentLoaded', () => {
  if (document.body.dataset.page === 'admin') {
    initAdmin();
  }
});
