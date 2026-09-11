// ============================================================
// OHANA Academy – Admin Dashboard Controller
// ============================================================

let currentAdminTab = 'dashboard';

function initAdmin() {
  if (!Auth.requireAdmin()) return;

  loadTab('dashboard');

  // Sidebar navigation listeners
  document.querySelectorAll('.admin-nav-item[data-tab]').forEach(item => {
    item.addEventListener('click', () => {
      document.querySelectorAll('.admin-nav-item').forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      loadTab(item.dataset.tab);
    });
  });
}

function loadTab(tab) {
  currentAdminTab = tab;
  const content = document.getElementById('adminContent');
  const title = document.getElementById('adminPageTitle');
  if (!content) return;

  const titles = {
    dashboard: '📊 Bảng Điều Khiển Tổng Quan',
    users:      '👥 Quản Lý Thành Viên & Học Viên',
    courses:    '📚 Quản Lý Khóa Học OHANA',
    lessons:    '🎥 Quản Lý Bài Học & Video',
    quizzes:    '📝 Quản Lý Đề Thi & Trắc Nghiệm',
    results:    '🏆 Bảng Điểm & Kết Quả Học Viên',
    settings:   '🌐 Cài Đặt Hệ Thống & Sao Lưu'
  };

  if (title) title.textContent = titles[tab] || tab;

  if (tab === 'dashboard') renderDashboard(content);
  else if (tab === 'users') renderUsers(content);
  else if (tab === 'courses') renderCourses(content);
  else if (tab === 'lessons') renderLessons(content);
  else if (tab === 'quizzes') renderQuizzes(content);
  else if (tab === 'results') renderResults(content);
  else if (tab === 'settings') renderSettings(content);
}

// ─── Tab: Dashboard ───────────────────────────────────────────
function renderDashboard(el) {
  const users = UserDB.getAll();
  const courses = CourseDB.getAll();
  const results = ResultDB.getAll();
  const enrollments = EnrollmentDB.getAll();

  const passedCount = results.filter(r => r.passed).length;
  const avgScore = results.length ? Math.round(results.reduce((a, r) => a + r.score, 0) / results.length) : 0;

  // Course submissions data
  const courseCounts = courses.map(c => ({
    name: c.title.length > 25 ? c.title.substring(0, 25) + '...' : c.title,
    count: results.filter(r => r.courseId === c.id).length
  }));
  const maxCount = Math.max(...courseCounts.map(c => c.count), 1);
  const recentResults = [...results].sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt)).slice(0, 6);

  el.innerHTML = `
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
          <div class="change">Đang kích hoạt toàn bộ</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon" style="background: rgba(16, 185, 129, 0.1); color: var(--success);">📝</div>
        <div class="stat-info">
          <div class="label">Bài kiểm tra đã nộp</div>
          <div class="value">${results.length}</div>
          <div class="change" style="color: var(--success);">✅ ${passedCount} bài đạt chuẩn</div>
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
          ${u.role !== 'admin' ? `<button class="action-btn del" onclick="deleteUser(${u.id})">🗑️ Xóa</button>` : ''}
        </div>
      </td>
    </tr>
  `).join('');
}

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

  el.innerHTML = `
    <div class="admin-table-card">
      <div class="table-header">
        <span class="table-title">Quản lý Khóa học OHANA (${courses.length})</span>
        <button class="btn btn-primary btn-sm" onclick="openCourseModal()">+ Thêm Khóa học mới</button>
      </div>
      <table class="data-table">
        <thead>
          <tr>
            <th>Tên khóa học</th>
            <th>Danh mục</th>
            <th>Cấp độ</th>
            <th>Thời lượng</th>
            <th>Học viên</th>
            <th>Trạng thái</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          ${courses.map(c => {
            const cat = CategoryDB.getById(c.categoryId);
            return `
              <tr>
                <td>
                  <strong style="font-size: 14px; color: var(--gray-900); display: block;">${c.title}</strong>
                  <span style="font-size: 12px; color: var(--gray-500);">Giảng viên: ${c.instructor}</span>
                </td>
                <td><span style="color:${cat ? cat.color : '#000'}; font-weight: 700;">${cat ? cat.name : '—'}</span></td>
                <td><span class="course-level-badge" style="position:static; background:${LEVEL_COLORS[c.level]}; color:white;">${c.level}</span></td>
                <td>${c.duration} (${c.totalLessons} bài)</td>
                <td><strong>${c.enrollCount || 0}</strong></td>
                <td><span class="badge ${c.status === 'active' ? 'badge-active' : 'badge-inactive'}">${c.status === 'active' ? 'Đang mở' : 'Đã đóng'}</span></td>
                <td>
                  <div class="action-btns">
                    <button class="action-btn edit" onclick="openCourseModal(${c.id})">✏️ Sửa</button>
                    <button class="action-btn del" onclick="deleteCourse(${c.id})">🗑️ Xóa</button>
                  </div>
                </td>
              </tr>`;
          }).join('')}
        </tbody>
      </table>
    </div>
    ${courseModalHTML(categories)}`;
}

function courseModalHTML(categories) {
  return `
  <div class="modal-overlay" id="courseModal">
    <div class="modal">
      <div class="modal-header">
        <h3 class="modal-title" id="courseModalTitle">Thêm Khóa Học Mới</h3>
        <button class="modal-close" onclick="closeModal('courseModal')">✕</button>
      </div>
      <div class="modal-body">
        <input type="hidden" id="cmId">
        <div class="form-group">
          <label class="form-label">Tên khóa học <span class="required">*</span></label>
          <input type="text" class="form-control" id="cmTitle" placeholder="Ví dụ: Làm chủ AI Agent trong Doanh nghiệp">
        </div>
        <div class="form-group">
          <label class="form-label">Mô tả khóa học</label>
          <textarea class="form-control" id="cmDesc" rows="3" placeholder="Nội dung tổng quan, mục tiêu khóa học..."></textarea>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Danh mục đào tạo <span class="required">*</span></label>
            <select class="form-control" id="cmCat">
              ${categories.map(c => `<option value="${c.id}">${c.name}</option>`).join('')}
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Giảng viên / Chuyên gia <span class="required">*</span></label>
            <input type="text" class="form-control" id="cmInstructor" placeholder="Alex Đặng – Giám đốc Sáng tạo">
          </div>
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
          <label class="form-label">Tags (cách nhau bằng dấu phẩy)</label>
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
    document.getElementById('cmInstructor').value = c.instructor;
    document.getElementById('cmDuration').value = c.duration;
    document.getElementById('cmLevel').value = c.level;
    document.getElementById('cmTags').value = (c.tags || []).join(', ');
  } else {
    title.textContent = 'Thêm Khóa Học Mới';
    idEl.value = '';
    document.getElementById('cmTitle').value = '';
    document.getElementById('cmDesc').value = '';
    document.getElementById('cmInstructor').value = '';
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
  const instructor = document.getElementById('cmInstructor').value.trim();
  const duration = document.getElementById('cmDuration').value.trim();
  const level = document.getElementById('cmLevel').value;
  const tags = document.getElementById('cmTags').value.split(',').map(t => t.trim()).filter(Boolean);

  if (!title || !instructor) {
    showToast('Vui lòng điền tên khóa học và giảng viên!', 'error');
    return;
  }

  if (id) {
    CourseDB.update(id, { title, description, categoryId, instructor, duration, level, tags });
    showToast('Đã cập nhật khóa học thành công!', 'success');
  } else {
    CourseDB.create({
      title,
      description,
      categoryId,
      instructor,
      duration,
      level,
      tags,
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

// ─── Tab: Lessons Management ──────────────────────────────────
function renderLessons(el) {
  const courses = CourseDB.getAll();
  const lessons = LessonDB.getAll();

  el.innerHTML = `
    <div class="admin-table-card">
      <div class="table-header">
        <span class="table-title">Quản lý Bài giảng (${lessons.length})</span>
        <button class="btn btn-primary btn-sm" onclick="openLessonModal()">+ Thêm Bài học mới</button>
      </div>
      <div style="padding: 16px 24px; background: var(--gray-50); border-bottom: 1px solid var(--gray-200); display: flex; align-items: center; gap: 12px;">
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
    <div class="modal">
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
            <label class="form-label">URL Video (YouTube / MP4)</label>
            <input type="text" class="form-control" id="lmVideo" placeholder="https://www.youtube.com/embed/...">
          </div>
          <div class="form-group">
            <label class="form-label">Thời lượng (phút)</label>
            <input type="text" class="form-control" id="lmDuration" placeholder="45 phút">
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
  const videoUrl = document.getElementById('lmVideo').value.trim();
  const duration = document.getElementById('lmDuration').value.trim();
  const docName = document.getElementById('lmDoc').value.trim();

  if (!title) {
    showToast('Vui lòng điền tiêu đề bài học!', 'error');
    return;
  }

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

// ─── Tab: Quizzes Management ──────────────────────────────────
function renderQuizzes(el) {
  const quizzes = QuizDB.getAll();
  el.innerHTML = `
    <div class="admin-table-card">
      <div class="table-header">
        <span class="table-title">Quản lý Đề thi Trắc nghiệm (${quizzes.length})</span>
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
                <td>${course ? course.title : '—'}</td>
                <td>⏱ ${q.timeLimit} phút</td>
                <td><strong style="color: var(--success);">${q.passingScore}%</strong></td>
                <td>${q.questions ? q.questions.length : 0} câu</td>
                <td>
                  <a href="quiz.html?course=${q.courseId}" target="_blank" class="action-btn" style="text-decoration:none;">
                    👁️ Làm thử đề
                  </a>
                </td>
              </tr>`;
          }).join('')}
        </tbody>
      </table>
    </div>`;
}

// ─── Tab: Results Management ──────────────────────────────────
function renderResults(el) {
  const results = ResultDB.getAll();
  el.innerHTML = `
    <div class="admin-table-card">
      <div class="table-header">
        <span class="table-title">Bảng điểm & Kết quả Học viên (${results.length})</span>
      </div>
      ${results.length ? `
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
                </tr>`;
            }).join('')}
          </tbody>
        </table>
      ` : `
        <div class="empty-state">
          <div class="empty-icon">🏆</div>
          <div class="empty-title">Chưa có kết quả bài thi nào được ghi nhận</div>
        </div>
      `}
    </div>`;
}

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
