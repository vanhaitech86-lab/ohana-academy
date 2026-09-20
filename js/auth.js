// ============================================================
// OHANA Academy – Authentication & Authorization Service
// ============================================================

const Auth = {
  // Lấy thông tin user hiện tại từ LocalStorage
  getCurrentUser: () => {
    try {
      const raw = localStorage.getItem(DB_KEYS.session);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  },

  // Lưu phiên đăng nhập
  setCurrentUser: (user) => {
    if (user) {
      // Bỏ mật khẩu khi lưu session
      const safe = { ...user };
      delete safe.password;
      localStorage.setItem(DB_KEYS.session, JSON.stringify(safe));
    } else {
      localStorage.removeItem(DB_KEYS.session);
    }
    Auth.updateHeaderUI();
  },

  // Kiểm tra đã đăng nhập chưa
  isLoggedIn: () => {
    return !!Auth.getCurrentUser();
  },

  // Kiểm tra quyền Admin
  isAdmin: () => {
    const user = Auth.getCurrentUser();
    return user && user.role === 'admin';
  },

  // Đăng nhập
  login: (email, password) => {
    const user = UserDB.getByEmail(email);
    if (!user) {
      return { success: false, message: 'Email này chưa được đăng ký trong hệ thống.' };
    }
    if (user.status === 'inactive') {
      return { success: false, message: 'Tài khoản của bạn hiện đang bị tạm khóa.' };
    }
    if (user.password !== password) {
      return { success: false, message: 'Mật khẩu không chính xác. Vui lòng thử lại!' };
    }

    Auth.setCurrentUser(user);
    // Tự động mở khóa toàn bộ khóa học cho người dùng khi đăng nhập
    try {
      if (window.CourseDB && window.EnrollmentDB) {
        const allCourses = CourseDB.getAll();
        allCourses.forEach(c => {
          if (!EnrollmentDB.isEnrolled(user.id, c.id)) {
            EnrollmentDB.enroll(user.id, c.id);
          }
        });
      }
    } catch (e) {
      console.error('Auto enroll on login error:', e);
    }
    return { success: true, user };
  },

  // Đăng xuất
  logout: () => {
    Auth.setCurrentUser(null);
    showToast('Đã đăng xuất tài khoản thành công.', 'info');
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 400);
  },

  // Đăng ký tài khoản mới
  register: (data) => {
    const exists = UserDB.getByEmail(data.email);
    if (exists) {
      return { success: false, message: 'Email này đã tồn tại trên hệ thống Ohana.' };
    }
    const newUser = UserDB.create({
      name: data.name,
      email: data.email,
      password: data.password,
      role: data.role || 'customer',
      phone: data.phone || '',
      department: data.department || '',
      avatar: '',
      status: 'active'
    });

    // Tự động mở khóa toàn bộ khóa học cho học viên mới đăng ký để vào học thử ngay
    try {
      if (window.CourseDB && window.EnrollmentDB) {
        const allCourses = CourseDB.getAll();
        allCourses.forEach(c => {
          EnrollmentDB.enroll(newUser.id, c.id);
        });
      }
    } catch (e) {
      console.error('Auto enroll on register error:', e);
    }

    Auth.setCurrentUser(newUser);
    return { success: true, user: newUser };
  },

  // Kiểm tra quyền truy cập một khóa học
  canAccessCourse: (course) => {
    const user = Auth.getCurrentUser();
    if (!user) return false;
    // Mở khóa toàn bộ khóa học cho mọi học viên đã đăng ký/đăng nhập vào học thử
    return true;
  },

  // Bắt buộc đăng nhập nếu muốn vào trang
  requireLogin: () => {
    if (!Auth.isLoggedIn()) {
      const currentUrl = window.location.href;
      window.location.href = `auth.html?redirect=${encodeURIComponent(currentUrl)}`;
      return false;
    }
    return true;
  },

  // Bắt buộc quyền Admin
  requireAdmin: () => {
    if (!Auth.isAdmin()) {
      showToast('Bạn không có quyền truy cập trang Quản trị!', 'error');
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 1200);
      return false;
    }
    return true;
  },

  // Cập nhật giao diện Header theo trạng thái đăng nhập
  updateHeaderUI: () => {
    const user = Auth.getCurrentUser();
    const loginBtn = document.getElementById('loginBtn');
    const registerNavBtn = document.getElementById('registerNavBtn');
    const userMenu = document.getElementById('userMenu');
    const adminNavLink = document.getElementById('adminNavLink');
    const userAvatar = document.getElementById('userAvatar');
    const userName = document.getElementById('userName');
    const userRoleBadge = document.getElementById('userRoleBadge');

    // Mobile nav elements
    const mobileLoginBtn = document.getElementById('mobileLoginBtn');
    const mobileRegisterBtn = document.getElementById('mobileRegisterBtn');
    const mobileUserInfo = document.getElementById('mobileUserInfo');
    const mobileUserName = document.getElementById('mobileUserName');
    const mobileUserRole = document.getElementById('mobileUserRole');
    const mobileAdminLink = document.getElementById('mobileAdminLink');
    const bnAdmin = document.getElementById('bnAdmin');
    const bnLogin = document.getElementById('bnLogin');

    if (user) {
      if (loginBtn) loginBtn.style.display = 'none';
      if (registerNavBtn) registerNavBtn.style.display = 'none';
      if (userMenu) userMenu.style.display = 'flex';
      if (userAvatar) userAvatar.textContent = user.name.charAt(0).toUpperCase();
      if (userName) userName.textContent = user.name;
      if (userRoleBadge) {
        userRoleBadge.textContent = ROLE_LABELS[user.role] || user.role;
        userRoleBadge.style.color = ROLE_COLORS[user.role] || '#ea580c';
      }

      // Link Admin
      if (adminNavLink) {
        adminNavLink.style.display = user.role === 'admin' ? 'inline-flex' : 'none';
      }

      // Mobile
      if (mobileLoginBtn) mobileLoginBtn.style.display = 'none';
      if (mobileRegisterBtn) mobileRegisterBtn.style.display = 'none';
      if (mobileUserInfo) {
        mobileUserInfo.style.display = 'block';
        if (mobileUserName) mobileUserName.textContent = user.name;
        if (mobileUserRole) mobileUserRole.textContent = ROLE_LABELS[user.role] || user.role;
      }
      if (mobileAdminLink && user.role === 'admin') {
        mobileAdminLink.style.display = 'flex';
        mobileAdminLink.href = 'admin.html';
      }
      if (bnAdmin && user.role === 'admin') {
        bnAdmin.style.display = 'flex';
      }
      if (bnLogin) {
        bnLogin.innerHTML = `<span class="bn-icon">👤</span><span class="bn-label">${user.name.split(' ').pop()}</span>`;
        bnLogin.href = '#';
        bnLogin.onclick = (e) => {
          e.preventDefault();
          if (confirm('Bạn có muốn đăng xuất tài khoản không?')) {
            Auth.logout();
          }
        };
      }
    } else {
      if (loginBtn) loginBtn.style.display = 'inline-flex';
      if (registerNavBtn) registerNavBtn.style.display = 'inline-flex';
      if (userMenu) userMenu.style.display = 'none';
      if (adminNavLink) adminNavLink.style.display = 'none';

      // Mobile
      if (mobileLoginBtn) mobileLoginBtn.style.display = 'block';
      if (mobileRegisterBtn) mobileRegisterBtn.style.display = 'block';
      if (mobileUserInfo) mobileUserInfo.style.display = 'none';
      if (mobileAdminLink) mobileAdminLink.style.display = 'none';
      if (bnAdmin) bnAdmin.style.display = 'none';
      if (bnLogin) {
        bnLogin.innerHTML = `<span class="bn-icon">🔐</span><span class="bn-label">Đăng nhập</span>`;
        bnLogin.href = 'auth.html';
        bnLogin.onclick = null;
      }
    }
  }
};

// Khởi tạo toggle dropdown & sự kiện logout
document.addEventListener('DOMContentLoaded', () => {
  Auth.updateHeaderUI();

  // Toggle user dropdown
  const avatarBtn = document.getElementById('userAvatarBtn');
  const dropdown = document.getElementById('userDropdown');
  if (avatarBtn && dropdown) {
    avatarBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      dropdown.classList.toggle('show');
    });
    document.addEventListener('click', (e) => {
      if (!dropdown.contains(e.target) && e.target !== avatarBtn) {
        dropdown.classList.remove('show');
      }
    });
  }

  // Handle logout buttons
  document.querySelectorAll('[data-action="logout"]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      Auth.logout();
    });
  });
});

window.Auth = Auth;
