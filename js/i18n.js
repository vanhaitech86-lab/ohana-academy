// ============================================================
// ASTRONIXA Academy – Multi-Language Internationalization (i18n)
// Supported 5 Languages: vi (Tiếng Việt), en (English), fr (Français), zh (中文), ja (日本語)
// ============================================================

const I18n = {
  currentLang: 'vi',
  languages: {
    vi: { name: 'Tiếng Việt', code: 'VI', flag: '🇻🇳' },
    en: { name: 'English', code: 'EN', flag: '🇬🇧' },
    fr: { name: 'Français', code: 'FR', flag: '🇫🇷' },
    zh: { name: '中文', code: 'ZH', flag: '🇨🇳' },
    ja: { name: '日本語', code: 'JA', flag: '🇯🇵' }
  },

  translations: {
    vi: {
      slogan: 'One Universe. One Family.',
      search_placeholder: 'Tìm khóa học AI, Bán hàng, Giao tiếp, Ohana...',
      nav_home: 'Trang chủ',
      nav_courses: 'Khóa học',
      nav_admin: 'Quản trị',
      nav_qr: 'QR Login',
      nav_register: 'Đăng ký',
      nav_login: 'Đăng nhập',
      nav_logout: 'Đăng xuất',
      nav_my_courses: 'Khóa học của tôi',
      nav_admin_panel: 'Trang Quản trị',
      logged_in_as: 'Đang đăng nhập:',

      // Hero
      hero_badge: 'DECENTRALIZED INTELLIGENCE',
      hero_title_1: 'The Unified Universe of',
      hero_title_grad: 'Value & Digital Prosperity',
      hero_desc: 'Hệ sinh thái phi tập trung chuẩn mực kết hợp mạng lưới AI tiên tiến, kiến trúc Web3 thế hệ mới và khai phóng tiềm năng con người. Bước vào không gian học tập phi biên giới nơi trí tuệ nhân tạo tạo ra cơ hội vô tận.',
      hero_btn_app: 'Launch Ohana App',
      hero_btn_universe: 'Explore Astronixa Universe',

      // 4 Pillars
      pillar_1_title: 'Unified Ecosystem',
      pillar_1_desc: 'Kết nối mượt mà dữ liệu, công cụ AI và quy trình làm việc.',
      pillar_2_title: 'AI + Web3 Powered',
      pillar_2_desc: 'Trí tuệ nhân tạo thế hệ mới kết hợp hợp đồng thông minh minh bạch.',
      pillar_3_title: 'Decentralized',
      pillar_3_desc: 'Bảo vệ chủ quyền tri thức và dữ liệu học tập cá nhân.',
      pillar_4_title: 'One Universe',
      pillar_4_desc: 'Cộng đồng học tập toàn cầu liên kết không khoảng cách.',

      // Categories
      cat_all: 'Tất cả khóa học',
      cat_free: 'Khóa học miễn phí',
      cat_paid_cert: 'Khóa học trả phí cấp chứng chỉ',
      cat_ai_img: 'Tạo hình ảnh bằng AI',
      cat_ai_video: 'Tạo video bằng AI',
      cat_ai_agent: 'Khóa học về AI Agent',
      cat_sales: 'Kỹ năng bán hàng',
      cat_comm: 'Kỹ năng giao tiếp',
      cat_sop: 'Quy trình Ohana',

      // Course Badges & Labels
      badge_free: '🎁 Miễn phí',
      badge_cert: '🎓 Cấp chứng chỉ',
      badge_with_cert: '🎖️ Kèm Chứng chỉ tốt nghiệp',
      price_free: '🎁 Miễn phí 100%',
      btn_continue: '▶ Tiếp tục học',
      btn_details: 'Chi tiết khóa học',
      students_count: 'học viên',
      lessons_count: 'bài giảng',
      level_basic: 'Cơ bản',
      level_intermediate: 'Trung cấp',
      level_advanced: 'Nâng cao',
      progress_label: 'Tiến độ học tập',
      empty_courses_title: 'Chưa có khóa học phù hợp',
      empty_courses_desc: 'Không tìm thấy khóa học nào trong danh mục hoặc tiêu chí tìm kiếm này.',

      // Sections
      sec_featured_title: 'Khóa Học Đào Tạo',
      sec_featured_title_grad: 'Nổi Bật',
      sec_featured_desc: 'Chương trình chuẩn hóa từ cơ bản đến chuyên sâu, đào tạo AI thực chiến và kỹ năng nghiệp vụ thực tế',
      sec_see_all: 'Xem tất cả khóa học →',

      sec_yt_badge: 'KÊNH YOUTUBE CHÍNH THỨC · @OhanaAstronixaVN',
      sec_yt_title: 'Video Đào Tạo',
      sec_yt_title_grad: 'Ohana Astronixa VN',
      sec_yt_desc: 'Trọn bộ video văn hóa mái nhà Ohana và hướng dẫn thao tác đăng ký, KYC, nạp rút tiền ví Astronixa',
      sec_yt_all: 'Xem tất cả trên YouTube ↗',

      sec_why_title: 'Tại sao chọn',
      sec_why_title_grad: 'OHANA Academy?',
      sec_why_desc: 'Nền tảng đào tạo toàn diện kết hợp công nghệ AI tiên tiến và văn hóa gắn kết gia đình',

      val_ai_title: 'Đón đầu Kỷ nguyên AI',
      val_ai_desc: 'Cập nhật liên tục các công nghệ tạo hình ảnh, video và xây dựng AI Agent hiện đại nhất.',
      val_practical_title: 'Thực chiến 100%',
      val_practical_desc: 'Giáo trình đúc kết từ kinh nghiệm thực tế, áp dụng ngay vào công việc để tạo ra kết quả doanh số đột phá.',
      val_cert_title: 'Đánh giá & Cấp Chứng chỉ',
      val_cert_desc: 'Hệ thống bài trắc nghiệm thông minh, câu hỏi tương tác giữa video giúp ghi nhớ và đo lường năng lực chuẩn xác.',
      val_family_title: 'Văn hóa Gia đình Ohana',
      val_family_desc: '"Ohana nghĩa là gia đình, và gia đình nghĩa là không ai bị bỏ lại phía sau." Đồng hành trọn đời cùng học viên.',

      // Catalog Page
      catalog_badge: 'THƯ VIỆN ĐÀO TẠO ASTRONIXA',
      catalog_title_1: 'Tất Cả',
      catalog_title_grad: 'Khóa Học',
      catalog_desc: 'Chương trình đào tạo thực chiến từ cơ bản đến nâng cao: Khóa học AI, Kỹ năng bán hàng, Giao tiếp và Quy trình chuẩn Astronixa.',
      filter_search_ph: '🔍 Nhập từ khóa, tên khóa học, giảng viên...',
      filter_all_cats: 'Tất cả danh mục',
      filter_all_types: 'Tất cả học phí / Phân loại',
      filter_type_free: '🎁 Khóa học Miễn phí',
      filter_type_paid: '🎓 Trả phí · Cấp chứng chỉ',
      filter_all_levels: 'Tất cả trình độ',
      filter_found_prefix: 'Tìm thấy',
      filter_found_suffix: 'khóa học',

      // Course Detail & Lesson
      detail_free_badge: '🎁 Khóa học Miễn phí',
      detail_cert_badge: '🎓 Cấp Chứng chỉ Tốt nghiệp',
      detail_btn_enroll_free: '🎁 Đăng ký học Miễn phí ngay',
      detail_btn_enroll_paid: '💳 Đăng ký khóa học ngay',
      detail_btn_view_cert: '👁️ Xem mẫu chứng chỉ tốt nghiệp',
      detail_curriculum: 'Nội dung khóa học',
      lesson_online_only: 'Video chỉ xem trực tuyến · Không hỗ trợ tải về',
      lesson_anti_skip_warning: '⚠️ Chú ý: Bạn không được tua vượt quá nội dung chưa xem! Hãy xem tuần tự để nắm vững kiến thức.',
      lesson_mark_completed: 'Đánh dấu hoàn thành bài học',
      lesson_completed: '✅ Đã hoàn thành',
      lesson_prev: '← Bài trước',
      lesson_next: 'Bài tiếp theo →',
      lesson_gate_prefix: '🔒 Đã xem',
      lesson_gate_suffix: '(Cần đạt 90% để hoàn thành)',
      lesson_list_title: 'Danh sách bài học',

      // Auth & QR
      auth_login_tab: 'Đăng nhập',
      auth_register_tab: 'Đăng ký',
      auth_demo_title: '🔑 Tài khoản demo (click để tự động điền):',
      auth_demo_admin: '👑 Admin Vũ Hải',
      auth_demo_new: '🆕 Nhân viên mới',
      auth_demo_old: '👨‍💼 Nhân viên Ohana',
      auth_demo_student: '🎓 Học viên ngoài',
      auth_email: 'Địa chỉ Email',
      auth_pass: 'Mật khẩu',
      auth_btn_login: '🔐 Đăng Nhập',
      auth_btn_register: '✨ Đăng Ký Tài Khoản',
      qr_title: '📱 Quét mã QR để đăng nhập',
      qr_sub: 'Mở camera điện thoại quét mã QR hoặc chọn tài khoản demo để đăng nhập tức thì',
      qr_or_manual: '🔐 Đăng nhập bằng Email & Mật khẩu',

      // Admin
      admin_portal_title: 'ASTRONIXA ADMIN PORTAL',
      admin_portal_sub: 'Hệ thống Quản trị Đào tạo Trực tuyến',
      admin_gate_title: 'Khu Vực Quản Trị Hệ Thống',
      admin_gate_desc: 'Trang quản trị cho phép kiểm soát toàn bộ khóa học, video bài giảng, ngân hàng đề thi và tài khoản học viên. Vui lòng xác thực tài khoản Admin để tiếp tục.',
      admin_quick_login: '⚡ Đăng nhập nhanh bằng Admin (vanhaitech.86@gmail.com)',
      admin_btn_login: '🔑 Đăng Nhập Quản Trị',
      admin_back_home: '← Quay lại trang học viên',

      // Roles
      role_admin: 'Quản trị viên',
      role_employee_new: 'Nhân viên mới',
      role_employee_old: 'Nhân viên Ohana',
      role_customer: 'Học viên',

      // Footer
      footer_slogan: 'Hệ thống đào tạo trực tuyến chuẩn mực thuộc Hệ sinh thái ASTRONIXA. Khai phóng tiềm năng với AI và kỹ năng thực chiến.',
      footer_quick_links: 'Liên Kết Nhanh',
      footer_support: 'Hỗ Trợ Học Viên',
      footer_contact: 'Thông Tin Liên Hệ',
      footer_rights: '© 2026 ASTRONIXA Academy. Bản quyền thuộc về ASTRONIXA Group.',
      footer_version: 'Phiên bản 2.3.0 – AI E-Learning Platform',
      lang_label: 'Ngôn ngữ:'
    },

    en: {
      slogan: 'One Universe. One Family.',
      search_placeholder: 'Search AI, Sales, Communication, Ohana courses...',
      nav_home: 'Home',
      nav_courses: 'Courses',
      nav_admin: 'Admin',
      nav_qr: 'QR Login',
      nav_register: 'Register',
      nav_login: 'Login',
      nav_logout: 'Logout',
      nav_my_courses: 'My Courses',
      nav_admin_panel: 'Admin Portal',
      logged_in_as: 'Signed in as:',

      // Hero
      hero_badge: 'DECENTRALIZED INTELLIGENCE',
      hero_title_1: 'The Unified Universe of',
      hero_title_grad: 'Value & Digital Prosperity',
      hero_desc: 'A sovereign, decentralized ecosystem harmonizing cutting-edge AI networks, next-gen Web3 architecture, and human-centric empowerment. Step into a borderless realm where intelligence creates infinite opportunities.',
      hero_btn_app: 'Launch Ohana App',
      hero_btn_universe: 'Explore Astronixa Universe',

      // 4 Pillars
      pillar_1_title: 'Unified Ecosystem',
      pillar_1_desc: 'Seamlessly connecting data, AI tools, and smart workflows.',
      pillar_2_title: 'AI + Web3 Powered',
      pillar_2_desc: 'Next-gen artificial intelligence meets transparent smart contracts.',
      pillar_3_title: 'Decentralized',
      pillar_3_desc: 'Protecting personal knowledge sovereignty and learning data.',
      pillar_4_title: 'One Universe',
      pillar_4_desc: 'Global learning community connected without borders.',

      // Categories
      cat_all: 'All Courses',
      cat_free: 'Free Courses',
      cat_paid_cert: 'Certified Paid Courses',
      cat_ai_img: 'AI Image Creation',
      cat_ai_video: 'AI Video Creation',
      cat_ai_agent: 'AI Agent Courses',
      cat_sales: 'Sales Skills',
      cat_comm: 'Communication Skills',
      cat_sop: 'Ohana SOP & Processes',

      // Course Badges & Labels
      badge_free: '🎁 Free',
      badge_cert: '🎓 Certified',
      badge_with_cert: '🎖️ With Graduation Certificate',
      price_free: '🎁 100% Free',
      btn_continue: '▶ Continue Learning',
      btn_details: 'Course Details',
      students_count: 'students',
      lessons_count: 'lessons',
      level_basic: 'Basic',
      level_intermediate: 'Intermediate',
      level_advanced: 'Advanced',
      progress_label: 'Learning Progress',
      empty_courses_title: 'No Matching Courses Found',
      empty_courses_desc: 'No courses found matching this category or search criteria.',

      // Sections
      sec_featured_title: 'Featured',
      sec_featured_title_grad: 'Training Courses',
      sec_featured_desc: 'Standardized curriculum from fundamentals to mastery, training practical AI and business skills',
      sec_see_all: 'View All Courses →',

      sec_yt_badge: 'OFFICIAL YOUTUBE CHANNEL · @OhanaAstronixaVN',
      sec_yt_title: 'Training Videos',
      sec_yt_title_grad: 'Ohana Astronixa VN',
      sec_yt_desc: 'Complete series on Ohana family culture, account setup, KYC, and Astronixa wallet operations',
      sec_yt_all: 'View all on YouTube ↗',

      sec_why_title: 'Why Choose',
      sec_why_title_grad: 'OHANA Academy?',
      sec_why_desc: 'Comprehensive training platform combining cutting-edge AI and family bonding culture',

      val_ai_title: 'Pioneering the AI Era',
      val_ai_desc: 'Continuously updated with the latest AI image, video, and autonomous AI Agent technologies.',
      val_practical_title: '100% Practical',
      val_practical_desc: 'Curriculum distilled from real-world practice, ready to apply immediately for breakthrough revenue.',
      val_cert_title: 'Evaluation & Certification',
      val_cert_desc: 'Smart quiz system with interactive in-video checkpoints ensures deep mastery and precise competency assessment.',
      val_family_title: 'Ohana Family Culture',
      val_family_desc: '"Ohana means family, and family means nobody gets left behind." Lifelong companion for every student.',

      // Catalog Page
      catalog_badge: 'ASTRONIXA TRAINING REPOSITORY',
      catalog_title_1: 'All',
      catalog_title_grad: 'Courses',
      catalog_desc: 'Practical courses from fundamentals to advanced: AI generation, Sales, Communication, and Astronixa SOPs.',
      filter_search_ph: '🔍 Search keywords, course titles, instructors...',
      filter_all_cats: 'All Categories',
      filter_all_types: 'All Pricing / Types',
      filter_type_free: '🎁 Free Courses',
      filter_type_paid: '🎓 Certified Paid Courses',
      filter_all_levels: 'All Levels',
      filter_found_prefix: 'Found',
      filter_found_suffix: 'courses',

      // Course Detail & Lesson
      detail_free_badge: '🎁 Free Course',
      detail_cert_badge: '🎓 Graduation Certificate Included',
      detail_btn_enroll_free: '🎁 Enroll For Free Now',
      detail_btn_enroll_paid: '💳 Enroll Course Now',
      detail_btn_view_cert: '👁️ View Sample Certificate',
      detail_curriculum: 'Course Curriculum',
      lesson_online_only: 'Online Streaming Only · Download Not Supported',
      lesson_anti_skip_warning: '⚠️ Notice: Skipping forward past unwatched content is restricted! Please watch sequentially.',
      lesson_mark_completed: 'Mark Lesson as Completed',
      lesson_completed: '✅ Completed',
      lesson_prev: '← Previous Lesson',
      lesson_next: 'Next Lesson →',
      lesson_gate_prefix: '🔒 Watched',
      lesson_gate_suffix: '(90% required to complete)',
      lesson_list_title: 'Lesson Curriculum',

      // Auth & QR
      auth_login_tab: 'Login',
      auth_register_tab: 'Register',
      auth_demo_title: '🔑 Demo accounts (click to auto-fill):',
      auth_demo_admin: '👑 Admin Vu Hai',
      auth_demo_new: '🆕 New Employee',
      auth_demo_old: '👨‍💼 Ohana Staff',
      auth_demo_student: '🎓 External Student',
      auth_email: 'Email Address',
      auth_pass: 'Password',
      auth_btn_login: '🔐 Log In',
      auth_btn_register: '✨ Create Account',
      qr_title: '📱 Scan QR Code to Login',
      qr_sub: 'Open your mobile camera to scan QR or select a demo account for instant access',
      qr_or_manual: '🔐 Login with Email & Password',

      // Admin
      admin_portal_title: 'ASTRONIXA ADMIN PORTAL',
      admin_portal_sub: 'E-Learning Management System',
      admin_gate_title: 'System Administration Gateway',
      admin_gate_desc: 'Manage all courses, video lessons, quiz banks, and student accounts. Please authenticate as Administrator.',
      admin_quick_login: '⚡ Quick Admin Login (vanhaitech.86@gmail.com)',
      admin_btn_login: '🔑 Admin Login',
      admin_back_home: '← Return to Student Portal',

      // Roles
      role_admin: 'Administrator',
      role_employee_new: 'New Employee',
      role_employee_old: 'Ohana Member',
      role_customer: 'Student',

      // Footer
      footer_slogan: 'Official online learning platform of the ASTRONIXA Ecosystem. Empowering human potential with AI and practical skills.',
      footer_quick_links: 'Quick Links',
      footer_support: 'Student Support',
      footer_contact: 'Contact Info',
      footer_rights: '© 2026 ASTRONIXA Academy. All rights reserved by ASTRONIXA Group.',
      footer_version: 'Version 2.3.0 – AI E-Learning Platform',
      lang_label: 'Language:'
    },

    fr: {
      slogan: 'One Universe. One Family.',
      search_placeholder: 'Rechercher cours IA, Vente, Communication, Ohana...',
      nav_home: 'Accueil',
      nav_courses: 'Cours',
      nav_admin: 'Admin',
      nav_qr: 'QR Connexion',
      nav_register: 'Inscription',
      nav_login: 'Connexion',
      nav_logout: 'Déconnexion',
      nav_my_courses: 'Mes Cours',
      nav_admin_panel: 'Portail Admin',
      logged_in_as: 'Connecté en tant que :',

      // Hero
      hero_badge: 'DECENTRALIZED INTELLIGENCE',
      hero_title_1: 'L\'Univers Unifié de la',
      hero_title_grad: 'Valeur et Prospérité Numérique',
      hero_desc: 'Un écosystème souverain et décentralisé harmonisant réseaux d\'IA de pointe, architecture Web3 de nouvelle génération et autonomisation humaine. Entrez dans un univers sans frontières où l\'intelligence crée des opportunités infinies.',
      hero_btn_app: 'Lancer l\'App Ohana',
      hero_btn_universe: 'Explorer l\'Univers Astronixa',

      // 4 Pillars
      pillar_1_title: 'Unified Ecosystem',
      pillar_1_desc: 'Connectez fluidement données, outils d\'IA et flux de travail.',
      pillar_2_title: 'AI + Web3 Powered',
      pillar_2_desc: 'L\'IA de pointe rencontre des contrats intelligents transparents.',
      pillar_3_title: 'Decentralized',
      pillar_3_desc: 'Protégez la souveraineté de vos connaissances et données.',
      pillar_4_title: 'One Universe',
      pillar_4_desc: 'Communauté mondiale connectée sans aucune frontière.',

      // Categories
      cat_all: 'Tous les cours',
      cat_free: 'Cours gratuits',
      cat_paid_cert: 'Cours certifiés payants',
      cat_ai_img: 'Création d\'images IA',
      cat_ai_video: 'Création de vidéos IA',
      cat_ai_agent: 'Cours Agents IA',
      cat_sales: 'Compétences de vente',
      cat_comm: 'Communication',
      cat_sop: 'Processus Ohana',

      // Course Badges & Labels
      badge_free: '🎁 Gratuit',
      badge_cert: '🎓 Certifié',
      badge_with_cert: '🎖️ Avec Certificat de Réussite',
      price_free: '🎁 100% Gratuit',
      btn_continue: '▶ Continuer',
      btn_details: 'Détails du cours',
      students_count: 'apprenants',
      lessons_count: 'leçons',
      level_basic: 'Débutant',
      level_intermediate: 'Intermédiaire',
      level_advanced: 'Avancé',
      progress_label: 'Progression du cours',
      empty_courses_title: 'Aucun cours trouvé',
      empty_courses_desc: 'Aucun cours ne correspond à cette catégorie ou recherche.',

      // Sections
      sec_featured_title: 'Formations',
      sec_featured_title_grad: 'Populaires',
      sec_featured_desc: 'Cursus standardisé des bases à l\'expertise, formation concrète à l\'IA et compétences métier',
      sec_see_all: 'Voir tous les cours →',

      sec_yt_badge: 'CHAÎNE YOUTUBE OFFICIELLE · @OhanaAstronixaVN',
      sec_yt_title: 'Vidéos de Formation',
      sec_yt_title_grad: 'Ohana Astronixa VN',
      sec_yt_desc: 'Guides complets sur la culture Ohana, KYC et utilisation du portefeuille Astronixa',
      sec_yt_all: 'Voir tout sur YouTube ↗',

      sec_why_title: 'Pourquoi choisir',
      sec_why_title_grad: 'OHANA Academy ?',
      sec_why_desc: 'Plateforme complète combinant intelligence artificielle de pointe et culture familiale bienveillante',

      val_ai_title: 'Pionnier de l\'Ère IA',
      val_ai_desc: 'Mises à jour permanentes sur les technologies d\'images, de vidéos et d\'Agents IA autonomes.',
      val_practical_title: '100% Pratique',
      val_practical_desc: 'Contenu issu du terrain, directement applicable pour transformer vos résultats.',
      val_cert_title: 'Évaluation & Certificat',
      val_cert_desc: 'Quiz interactifs dans les vidéos pour valider et certifier vos compétences avec précision.',
      val_family_title: 'Culture Familiale Ohana',
      val_family_desc: '"Ohana signifie famille, et la famille signifie que personne n\'est abandonné."',

      // Catalog Page
      catalog_badge: 'BIBLIOTHÈQUE DE FORMATION ASTRONIXA',
      catalog_title_1: 'Tous les',
      catalog_title_grad: 'Cours',
      catalog_desc: 'Programmes du niveau débutant à avancé : IA générative, Vente, Communication et Standards Ohana.',
      filter_search_ph: '🔍 Mots-clés, nom du cours, formateur...',
      filter_all_cats: 'Toutes les catégories',
      filter_all_types: 'Tous les tarifs / types',
      filter_type_free: '🎁 Cours Gratuits',
      filter_type_paid: '🎓 Certifiés Payants',
      filter_all_levels: 'Tous niveaux',
      filter_found_prefix: '',
      filter_found_suffix: 'cours trouvés',

      // Course Detail & Lesson
      detail_free_badge: '🎁 Cours Gratuit',
      detail_cert_badge: '🎓 Certificat de Réussite Inclus',
      detail_btn_enroll_free: '🎁 S\'inscrire Gratuitement',
      detail_btn_enroll_paid: '💳 S\'inscrire à la Formation',
      detail_btn_view_cert: '👁️ Voir Modèle de Certificat',
      detail_curriculum: 'Programme du Cours',
      lesson_online_only: 'Diffusion en ligne uniquement · Téléchargement non autorisé',
      lesson_anti_skip_warning: '⚠️ Attention : Il est interdit d\'avancer au-delà du contenu non visionné !',
      lesson_mark_completed: 'Marquer comme terminé',
      lesson_completed: '✅ Terminé',
      lesson_prev: '← Leçon précédente',
      lesson_next: 'Leçon suivante →',
      lesson_gate_prefix: '🔒 Visionné',
      lesson_gate_suffix: '(90% requis pour valider)',
      lesson_list_title: 'Liste des leçons',

      // Auth & QR
      auth_login_tab: 'Connexion',
      auth_register_tab: 'Inscription',
      auth_demo_title: '🔑 Comptes démo (cliquez pour remplir) :',
      auth_demo_admin: '👑 Admin Vu Hai',
      auth_demo_new: '🆕 Nouvel Employé',
      auth_demo_old: '👨‍💼 Membre Ohana',
      auth_demo_student: '🎓 Étudiant Externe',
      auth_email: 'Adresse Email',
      auth_pass: 'Mot de passe',
      auth_btn_login: '🔐 Se Connecter',
      auth_btn_register: '✨ Créer un Compte',
      qr_title: '📱 Scanner le QR Code pour se connecter',
      qr_sub: 'Ouvrez la caméra de votre smartphone ou utilisez un compte démo',
      qr_or_manual: '🔐 Connexion par Email & Mot de passe',

      // Admin
      admin_portal_title: 'ASTRONIXA ADMIN PORTAL',
      admin_portal_sub: 'Gestion de la Plateforme Éducative',
      admin_gate_title: 'Passerelle d\'Administration',
      admin_gate_desc: 'Contrôlez l\'ensemble des cours, vidéos, quiz et comptes. Veuillez vous authentifier en tant qu\'Admin.',
      admin_quick_login: '⚡ Connexion Rapide Admin (vanhaitech.86@gmail.com)',
      admin_btn_login: '🔑 Connexion Admin',
      admin_back_home: '← Retour à l\'espace apprenant',

      // Roles
      role_admin: 'Administrateur',
      role_employee_new: 'Nouvel Employé',
      role_employee_old: 'Membre Ohana',
      role_customer: 'Étudiant',

      // Footer
      footer_slogan: 'Plateforme officielle d\'apprentissage en ligne de l\'écosystème ASTRONIXA.',
      footer_quick_links: 'Liens Rapides',
      footer_support: 'Support Étudiants',
      footer_contact: 'Coordonnées',
      footer_rights: '© 2026 ASTRONIXA Academy. Tous droits réservés par ASTRONIXA Group.',
      footer_version: 'Version 2.3.0 – AI E-Learning Platform',
      lang_label: 'Langue :'
    },

    zh: {
      slogan: 'One Universe. One Family.',
      search_placeholder: '搜索AI、销售、沟通、Ohana流程课程...',
      nav_home: '首页',
      nav_courses: '全部课程',
      nav_admin: '系统管理',
      nav_qr: '扫码登录',
      nav_register: '注册',
      nav_login: '登录',
      nav_logout: '退出登录',
      nav_my_courses: '我的课程',
      nav_admin_panel: '管理后台',
      logged_in_as: '当前登录：',

      // Hero
      hero_badge: 'DECENTRALIZED INTELLIGENCE',
      hero_title_1: '统一价值与数字繁荣的',
      hero_title_grad: '浩瀚宇宙',
      hero_desc: '一个主权的去中心化生态系统，融合了先进的AI网络、新一代Web3架构和以人为本的赋能。步入无国界学习领域，让人工智能创造无限机遇。',
      hero_btn_app: '启动 Ohana App',
      hero_btn_universe: '探索 Astronixa 宇宙',

      // 4 Pillars
      pillar_1_title: 'Unified Ecosystem',
      pillar_1_desc: '无缝连接数据、AI工具与智能工作流。',
      pillar_2_title: 'AI + Web3 Powered',
      pillar_2_desc: '新一代人工智能结合透明的智能合约。',
      pillar_3_title: 'Decentralized',
      pillar_3_desc: '保护个人知识主权与学习数据安全。',
      pillar_4_title: 'One Universe',
      pillar_4_desc: '打破界限的全球互联互通学习社区。',

      // Categories
      cat_all: '全部课程',
      cat_free: '免费课程',
      cat_paid_cert: '认证付费课程',
      cat_ai_img: 'AI图像生成',
      cat_ai_video: 'AI视频生成',
      cat_ai_agent: 'AI智能体课程',
      cat_sales: '销售与成交技巧',
      cat_comm: '沟通与表达艺术',
      cat_sop: 'Ohana标准流程',

      // Course Badges & Labels
      badge_free: '🎁 免费',
      badge_cert: '🎓 含证书',
      badge_with_cert: '🎖️ 颁发官方结业证书',
      price_free: '🎁 100% 免费',
      btn_continue: '▶ 继续学习',
      btn_details: '查看课程详情',
      students_count: '位学员',
      lessons_count: '课时',
      level_basic: '初级',
      level_intermediate: '中级',
      level_advanced: '高级',
      progress_label: '学习进度',
      empty_courses_title: '未找到相关课程',
      empty_courses_desc: '在此分类或筛选条件下暂未找到匹配课程。',

      // Sections
      sec_featured_title: '精选推荐',
      sec_featured_title_grad: '热门课程',
      sec_featured_desc: '从基础到精通的标准化体系，深入培训实战AI与核心商业技能',
      sec_see_all: '查看全部课程 →',

      sec_yt_badge: '官方 YOUTUBE 频道 · @OhanaAstronixaVN',
      sec_yt_title: '官方培训视频',
      sec_yt_title_grad: 'Ohana Astronixa VN',
      sec_yt_desc: '全套Ohana企业文化与Astronixa钱包注册、实名认证(KYC)、充值提现操作教程',
      sec_yt_all: '在 YouTube 上查看全部 ↗',

      sec_why_title: '为什么选择',
      sec_why_title_grad: 'OHANA Academy？',
      sec_why_desc: '结合前沿AI科技与温暖大家庭文化的全方位在线培训平台',

      val_ai_title: '引领 AI 时代浪潮',
      val_ai_desc: '持续追踪并更新最新的AI图像生成、AI视频制作和自主AI Agent开发技术。',
      val_practical_title: '100% 落地实战',
      val_practical_desc: '课程大纲源于实战经验萃取，学完即刻落地运用，助力业绩爆发式增长。',
      val_cert_title: '智能评估与官方认证',
      val_cert_desc: '智能测验系统与视频互动答题，确保知识牢固掌握并精准衡量学员能力。',
      val_family_title: 'Ohana 温暖家族文化',
      val_family_desc: '“Ohana意味着家人，家人意味着没有任何人会被抛下。” 终身陪伴每位学员成长。',

      // Catalog Page
      catalog_badge: 'ASTRONIXA 培训课程库',
      catalog_title_1: '全部',
      catalog_title_grad: '专业课程',
      catalog_desc: '从入门到进阶的实战体系：AI工具应用、销售心理学、高效沟通与Astronixa标准SOP。',
      filter_search_ph: '🔍 输入关键词、课程名称、讲师姓名...',
      filter_all_cats: '全部分类',
      filter_all_types: '全部收费 / 分类',
      filter_type_free: '🎁 免费课程',
      filter_type_paid: '🎓 付费认证课程',
      filter_all_levels: '全部等级',
      filter_found_prefix: '共找到',
      filter_found_suffix: '门课程',

      // Course Detail & Lesson
      detail_free_badge: '🎁 免费课程',
      detail_cert_badge: '🎓 附带官方结业证书',
      detail_btn_enroll_free: '🎁 立即免费参加学习',
      detail_btn_enroll_paid: '💳 立即购买报名课程',
      detail_btn_view_cert: '👁️ 查看证书样本',
      detail_curriculum: '课程大纲目录',
      lesson_online_only: '仅限在线观看 · 不支持视频下载',
      lesson_anti_skip_warning: '⚠️ 注意：严禁快进跳过未观看内容！请循序渐进以全面掌握知识。',
      lesson_mark_completed: '标记本节课已完成',
      lesson_completed: '✅ 已完成',
      lesson_prev: '← 上一节课',
      lesson_next: '下一节课 →',
      lesson_gate_prefix: '🔒 已观看',
      lesson_gate_suffix: '(需观看达90%方可完成)',
      lesson_list_title: '课程章节列表',

      // Auth & QR
      auth_login_tab: '登录账号',
      auth_register_tab: '注册账号',
      auth_demo_title: '🔑 演示账号（点击即可自动填写）：',
      auth_demo_admin: '👑 超级管理员 武海',
      auth_demo_new: '🆕 新入职员工',
      auth_demo_old: '👨‍💼 Ohana 正式员工',
      auth_demo_student: '🎓 外部学员',
      auth_email: '电子邮箱',
      auth_pass: '登录密码',
      auth_btn_login: '🔐 立即登录',
      auth_btn_register: '✨ 注册新账号',
      qr_title: '📱 扫描二维码登录',
      qr_sub: '使用手机相机扫码或选择下方演示账号快速登录',
      qr_or_manual: '🔐 使用邮箱和密码登录',

      // Admin
      admin_portal_title: 'ASTRONIXA ADMIN PORTAL',
      admin_portal_sub: '在线教育与培训系统后台',
      admin_gate_title: '系统管理中心',
      admin_gate_desc: '管理中心可统一控制所有课程、视频课件、题库与学员信息。请验证管理员身份后继续。',
      admin_quick_login: '⚡ 管理员快捷登录 (vanhaitech.86@gmail.com)',
      admin_btn_login: '🔑 登录管理后台',
      admin_back_home: '← 返回学员中心',

      // Roles
      role_admin: '系统管理员',
      role_employee_new: '新入职员工',
      role_employee_old: '正式员工',
      role_customer: '注册学员',

      // Footer
      footer_slogan: 'ASTRONIXA 生态官方在线培训平台。借助先进AI与实战技能，赋能无限潜能。',
      footer_quick_links: '快速链接',
      footer_support: '学员支持',
      footer_contact: '联系方式',
      footer_rights: '© 2026 ASTRONIXA Academy. 版权所有 ASTRONIXA Group.',
      footer_version: '版本 2.3.0 – AI E-Learning Platform',
      lang_label: '语言：'
    },

    ja: {
      slogan: 'One Universe. One Family.',
      search_placeholder: 'AI、営業、コミュニケーション、Ohana業務コースを検索...',
      nav_home: 'ホーム',
      nav_courses: 'コース一覧',
      nav_admin: 'システム管理',
      nav_qr: 'QRログイン',
      nav_register: '新規登録',
      nav_login: 'ログイン',
      nav_logout: 'ログアウト',
      nav_my_courses: 'マイコース',
      nav_admin_panel: '管理ポータル',
      logged_in_as: 'ログイン中：',

      // Hero
      hero_badge: 'DECENTRALIZED INTELLIGENCE',
      hero_title_1: '価値とデジタルの繁栄の',
      hero_title_grad: '統合ユニバース',
      hero_desc: '最先端のAIネットワーク、次世代Web3アーキテクチャ、人間中心のエンパワーメントを融合した自律分散型エコシステム。知性が無限の機会を創出する国境なき領域へ。',
      hero_btn_app: 'Ohana アプリを起動',
      hero_btn_universe: 'Astronixa ユニバースを探索',

      // 4 Pillars
      pillar_1_title: 'Unified Ecosystem',
      pillar_1_desc: 'データ、AIツール、ワークフローをシームレスに連携。',
      pillar_2_title: 'AI + Web3 Powered',
      pillar_2_desc: '次世代AIと透明性の高いスマートコントラクトの融合。',
      pillar_3_title: 'Decentralized',
      pillar_3_desc: '個人の知識主権と学習データを安全に保護。',
      pillar_4_title: 'One Universe',
      pillar_4_desc: '国境を越えてつながるグローバル学習コミュニティ。',

      // Categories
      cat_all: 'すべてのコース',
      cat_free: '無料コース',
      cat_paid_cert: '修了証付き有料コース',
      cat_ai_img: 'AI画像生成',
      cat_ai_video: 'AI動画生成',
      cat_ai_agent: 'AIエージェントコース',
      cat_sales: '営業・セールススキル',
      cat_comm: 'コミュニケーション術',
      cat_sop: 'Ohana標準業務プロセス',

      // Course Badges & Labels
      badge_free: '🎁 無料',
      badge_cert: '🎓 修了証付き',
      badge_with_cert: '🎖️ 公式修了証明書を授与',
      price_free: '🎁 完全無料',
      btn_continue: '▶ 学習を続ける',
      btn_details: 'コース詳細を見る',
      students_count: '名の受講生',
      lessons_count: 'レッスン',
      level_basic: '初級',
      level_intermediate: '中級',
      level_advanced: '上級',
      progress_label: '学習進捗状況',
      empty_courses_title: '該当するコースがありません',
      empty_courses_desc: '指定されたカテゴリーや条件に一致するコースは見つかりませんでした。',

      // Sections
      sec_featured_title: '注目の',
      sec_featured_title_grad: 'トレーニングコース',
      sec_featured_desc: '基礎から応用までの標準化されたカリキュラムで、実践的なAIと業務スキルを習得',
      sec_see_all: 'すべてのコースを見る →',

      sec_yt_badge: '公式 YOUTUBE チャンネル · @OhanaAstronixaVN',
      sec_yt_title: '公式トレーニング動画',
      sec_yt_title_grad: 'Ohana Astronixa VN',
      sec_yt_desc: 'Ohanaファミリーの企業文化やAstronixaウォレットの登録・KYC認証・入出金ガイド動画',
      sec_yt_all: 'YouTubeですべて見る ↗',

      sec_why_title: 'なぜ',
      sec_why_title_grad: 'OHANA Academyなのか？',
      sec_why_desc: '最先端のAIテクノロジーと温かいファミリー文化を融合した総合オンライン教育プラットフォーム',

      val_ai_title: 'AI新時代をリード',
      val_ai_desc: '最新のAI画像・動画生成および自律型AIエージェント構築技術を継続的にアップデート。',
      val_practical_title: '100% 実践的',
      val_practical_desc: '現場の実務経験から凝縮されたカリキュラムで、即座に業務に活かして成果を出せます。',
      val_cert_title: 'スマート評価と公式修了証',
      val_cert_desc: '動画内のインタラクティブな確認テストとスマートな理解度チェックで、確実な習得をサポート。',
      val_family_title: '温かい Ohana ファミリー文化',
      val_family_desc: '「Ohanaは家族を意味し、家族とは誰も見捨てられないこと。」学習者を生涯サポートします。',

      // Catalog Page
      catalog_badge: 'ASTRONIXA 学習リポジトリ',
      catalog_title_1: 'すべての',
      catalog_title_grad: 'コース一覧',
      catalog_desc: '基礎から応用までの実践カリキュラム：AIツール活用、営業スキル、コミュニケーション、Astronixa標準業務。',
      filter_search_ph: '🔍 キーワード、コース名、講師名で検索...',
      filter_all_cats: 'すべてのカテゴリー',
      filter_all_types: 'すべての料金 / 区分',
      filter_type_free: '🎁 無料コース',
      filter_type_paid: '🎓 修了証付き有料コース',
      filter_all_levels: 'すべてのレベル',
      filter_found_prefix: '合計',
      filter_found_suffix: '件のコースが見つかりました',

      // Course Detail & Lesson
      detail_free_badge: '🎁 無料コース',
      detail_cert_badge: '🎓 公式修了証授与',
      detail_btn_enroll_free: '🎁 今すぐ無料で受講する',
      detail_btn_enroll_paid: '💳 今すぐコースを受講する',
      detail_btn_view_cert: '👁️ 修了証サンプルを見る',
      detail_curriculum: 'コースカリキュラム',
      lesson_online_only: 'オンラインストリーミング限定 · ダウンロード非対応',
      lesson_anti_skip_warning: '⚠️ 注意：未視聴の動画内容を早送りすることは禁止されています！順番にご視聴ください。',
      lesson_mark_completed: 'レッスンを完了としてマーク',
      lesson_completed: '✅ 完了済み',
      lesson_prev: '← 前のレッスン',
      lesson_next: '次のレッスン →',
      lesson_gate_prefix: '🔒 視聴済み',
      lesson_gate_suffix: '(完了には90%以上の視聴が必要)',
      lesson_list_title: 'レッスン一覧',

      // Auth & QR
      auth_login_tab: 'ログイン',
      auth_register_tab: '新規登録',
      auth_demo_title: '🔑 デモアカウント（クリックで自動入力）：',
      auth_demo_admin: '👑 管理者 Vu Hai',
      auth_demo_new: '🆕 新入社員',
      auth_demo_old: '👨‍💼 Ohana メンバー',
      auth_demo_student: '🎓 外部受講生',
      auth_email: 'メールアドレス',
      auth_pass: 'パスワード',
      auth_btn_login: '🔐 ログインする',
      auth_btn_register: '✨ 新規アカウント作成',
      qr_title: '📱 QRコードをスキャンしてログイン',
      qr_sub: 'スマートフォンのカメラでQRコードを読み取るか、デモアカウントを選択してください',
      qr_or_manual: '🔐 メールとパスワードでログイン',

      // Admin
      admin_portal_title: 'ASTRONIXA ADMIN PORTAL',
      admin_portal_sub: 'オンライン教育管理システム',
      admin_gate_title: 'システム管理者ゲートウェイ',
      admin_gate_desc: 'すべてのコース、動画教材、テスト問題、受講生アカウントを集中管理します。管理者としてログインしてください。',
      admin_quick_login: '⚡ 管理者クイックログイン (vanhaitech.86@gmail.com)',
      admin_btn_login: '🔑 管理者としてログイン',
      admin_back_home: '← 受講生ポータルに戻る',

      // Roles
      role_admin: '管理者',
      role_employee_new: '新入社員',
      role_employee_old: 'Ohana 正社員',
      role_customer: '受講生',

      // Footer
      footer_slogan: 'ASTRONIXA エコシステム公式オンライン学習プラットフォーム。AIと実践スキルで可能性を最大化。',
      footer_quick_links: 'クイックリンク',
      footer_support: '受講生サポート',
      footer_contact: 'お問い合わせ',
      footer_rights: '© 2026 ASTRONIXA Academy. All rights reserved by ASTRONIXA Group.',
      footer_version: 'バージョン 2.3.0 – AI E-Learning Platform',
      lang_label: '言語：'
    }
  },

  // Khởi tạo
  init: function() {
    const saved = localStorage.getItem('astronixa_lang');
    if (saved && this.languages[saved]) {
      this.currentLang = saved;
    } else {
      const navLang = (navigator.language || '').substring(0, 2).toLowerCase();
      if (this.languages[navLang]) {
        this.currentLang = navLang;
      } else {
        this.currentLang = 'vi';
      }
    }

    document.documentElement.lang = this.currentLang;
    this.updateSelectorUI();
    this.applyTranslations();

    // Đóng dropdown khi click ngoài
    document.addEventListener('click', (e) => {
      const dropdown = document.getElementById('langSelector');
      if (dropdown && !dropdown.contains(e.target)) {
        dropdown.classList.remove('open');
      }
    });
  },

  // Đổi ngôn ngữ
  setLanguage: function(lang) {
    if (!this.languages[lang]) return;
    this.currentLang = lang;
    localStorage.setItem('astronixa_lang', lang);
    document.documentElement.lang = lang;

    this.updateSelectorUI();
    this.applyTranslations();

    // Bắn event
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));

    // Re-render nếu đang ở trang có dynamic grid
    if (window.loadHomepage && document.body.dataset.page === 'home') {
      try { window.loadHomepage(); } catch(e) {}
    } else if (window.loadCoursesPage && document.body.dataset.page === 'courses') {
      try { window.loadCoursesPage(); } catch(e) {}
    }

    if (window.Auth && window.Auth.updateHeaderUI) {
      try { window.Auth.updateHeaderUI(); } catch(e) {}
    }

    const toastMsgs = {
      vi: 'Đã chuyển sang Tiếng Việt 🇻🇳',
      en: 'Switched to English 🇬🇧',
      fr: 'Changé en Français 🇫🇷',
      zh: '已切换为中文 🇨🇳',
      ja: '日本語に切り替えました 🇯🇵'
    };
    if (window.showToast) {
      window.showToast(toastMsgs[lang] || 'Language updated', 'info');
    }
  },

  // Toggle Dropdown
  toggleDropdown: function(e) {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    const el = document.getElementById('langSelector');
    if (el) el.classList.toggle('open');
  },

  // Lấy text theo key
  t: function(key, fallback) {
    const dict = this.translations[this.currentLang] || this.translations['vi'];
    if (dict && dict[key] !== undefined) return dict[key];
    const fallbackDict = this.translations['vi'];
    if (fallbackDict && fallbackDict[key] !== undefined) return fallbackDict[key];
    return fallback || key;
  },

  // Cập nhật giao diện nút chọn ngôn ngữ
  updateSelectorUI: function() {
    const current = this.languages[this.currentLang] || this.languages['vi'];

    const flagEl = document.getElementById('langFlag');
    const textEl = document.getElementById('langText');
    if (flagEl) flagEl.textContent = current.flag;
    if (textEl) textEl.textContent = current.code;

    // Menu options active state
    document.querySelectorAll('.lang-item').forEach(item => {
      const l = item.getAttribute('data-lang');
      item.classList.toggle('active', l === this.currentLang);
    });

    // Mobile buttons active state
    document.querySelectorAll('.m-lang-btn').forEach(btn => {
      const l = btn.getAttribute('data-lang');
      btn.classList.toggle('active', l === this.currentLang);
    });

    const selectorWrap = document.getElementById('langSelector');
    if (selectorWrap) selectorWrap.classList.remove('open');
  },

  // Dịch các phần tử DOM có attribute data-i18n
  applyTranslations: function() {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
      const key = el.getAttribute('data-i18n');
      const translation = this.t(key);
      if (translation !== undefined) {
        if (el.getAttribute('data-i18n-html') === 'true') {
          el.innerHTML = translation;
        } else {
          el.textContent = translation;
        }
      }
    });

    // Placeholders
    const placeholders = document.querySelectorAll('[data-i18n-placeholder]');
    placeholders.forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      const translation = this.t(key);
      if (translation !== undefined) {
        el.placeholder = translation;
      }
    });
  },

  // Helper lấy tên Category theo ngôn ngữ
  getCategoryName: function(cat) {
    if (!cat) return '';
    const map = {
      1: 'cat_ai_img',
      2: 'cat_ai_video',
      3: 'cat_ai_agent',
      4: 'cat_sales',
      5: 'cat_comm',
      6: 'cat_sop',
      7: 'cat_free',
      8: 'cat_paid_cert'
    };
    const key = map[cat.id];
    return key ? this.t(key) : cat.name;
  },

  // Helper lấy nhãn trình độ
  getLevelLabel: function(level) {
    if (level === 'Cơ bản') return this.t('level_basic');
    if (level === 'Trung cấp') return this.t('level_intermediate');
    if (level === 'Nâng cao') return this.t('level_advanced');
    return level;
  },

  // Helper lấy tên vai trò
  getRoleLabel: function(role) {
    const key = 'role_' + role;
    return this.t(key) || (window.ROLE_LABELS && window.ROLE_LABELS[role]) || role;
  }
};

// Tự động khởi chạy
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => I18n.init());
} else {
  I18n.init();
}

window.I18n = I18n;
