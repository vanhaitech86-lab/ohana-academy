// ============================================================
// OHANA Academy – Data Layer v2.0 (LocalStorage DB)
// ============================================================

const DB_KEYS = {
  users:       'ohana_users',
  categories:  'ohana_categories',
  courses:     'ohana_courses',
  lessons:     'ohana_lessons',
  quizzes:     'ohana_quizzes',
  results:     'ohana_results',
  enrollments: 'ohana_enrollments',
  progress:    'ohana_progress',
  session:     'ohana_session',
  settings:    'ohana_settings',
};
const DB_VERSION = '1.0';

// ─── Default Users ─────────────────────────────────────────────
const DEFAULT_USERS = [
  {
    id: 1,
    name: 'Quản trị viên Ohana',
    email: 'admin@ohana.vn',
    password: 'admin123',
    role: 'admin',
    phone: '0988739896',
    department: 'Ban Giám Đốc Ohana',
    avatar: '',
    status: 'active',
    createdAt: '2026-01-01'
  },
  {
    id: 2,
    name: 'Nguyễn Văn Nam',
    email: 'nhanvien.moi@ohana.vn',
    password: '123456',
    role: 'employee_new',
    phone: '0912345678',
    department: 'Tư vấn Kinh doanh Ohana',
    avatar: '',
    status: 'active',
    createdAt: '2026-06-01'
  },
  {
    id: 3,
    name: 'Trần Mai Lan',
    email: 'nhanvien@ohana.vn',
    password: '123456',
    role: 'employee_old',
    phone: '0923456789',
    department: 'Đội ngũ Triển khai & AI',
    avatar: '',
    status: 'active',
    createdAt: '2025-03-15'
  },
  {
    id: 4,
    name: 'Lê Hoàng Phong',
    email: 'hocvien@ohana.vn',
    password: '123456',
    role: 'customer',
    phone: '0934567890',
    department: 'Học viên Độc lập',
    avatar: '',
    status: 'active',
    createdAt: '2026-04-10'
  }
];

// ─── Default Categories ─────────────────────────────────────────
const DEFAULT_CATEGORIES = [
  {
    id: 1,
    name: 'Tạo hình ảnh bằng AI',
    icon: '🎨',
    color: '#8b5cf6',
    description: 'Làm chủ Midjourney, Stable Diffusion, DALL-E 3, Leonardo AI để thiết kế hình ảnh chuyên nghiệp'
  },
  {
    id: 2,
    name: 'Tạo video bằng AI',
    icon: '🎬',
    color: '#ec4899',
    description: 'Sản xuất video marketing, video viral với Runway Gen-3, Kling AI, Pika, HeyGen & CapCut AI'
  },
  {
    id: 3,
    name: 'Khóa học về AI Agent',
    icon: '🤖',
    color: '#06b6d4',
    description: 'Xây dựng trợ lý ảo thông minh, Multi-agent workflows và tự động hóa quy trình nghiệp vụ'
  },
  {
    id: 4,
    name: 'Kỹ năng bán hàng',
    icon: '💼',
    color: '#f97316',
    description: 'Nghệ thuật tư vấn giải pháp, tâm lý hành vi khách hàng, xử lý từ chối và chốt sale đỉnh cao'
  },
  {
    id: 5,
    name: 'Kỹ năng giao tiếp',
    icon: '💬',
    color: '#10b981',
    description: 'Nghệ thuật giao tiếp thấu cảm, thuyết phục đối tác, lắng nghe chủ động và giải quyết mâu thuẫn'
  },
  {
    id: 6,
    name: 'Quy trình Ohana',
    icon: '🏢',
    color: '#ea580c',
    description: 'Quy trình vận hành chuẩn SOP, tiêu chuẩn dịch vụ 5 sao và văn hóa cốt lõi gia đình Ohana'
  }
];

// ─── Default Courses ────────────────────────────────────────────
const DEFAULT_COURSES = [
  // ── Khóa 1: Tạo hình ảnh bằng AI ──
  {
    id: 1,
    title: 'Mastering Midjourney & Generative AI Design Thực Chiến',
    description: 'Khóa học hướng dẫn từ số 0 cách tạo hình ảnh siêu thực, thiết kế đồ họa quảng cáo, banner marketing, bộ nhận diện thương hiệu với Midjourney V6, Leonardo AI và Photoshop Generative Fill.',
    categoryId: 1,
    instructor: 'Alex Đặng – Giám đốc Sáng tạo AI Creative',
    thumbnail: '',
    duration: '6 giờ',
    totalLessons: 4,
    level: 'Cơ bản',
    allowedRoles: ['admin', 'employee_new', 'employee_old', 'customer'],
    lessonIds: [1, 2, 3, 4],
    quizId: 1,
    rating: 4.9,
    enrollCount: 142,
    status: 'active',
    createdAt: '2026-01-10',
    tags: ['Midjourney', 'AI Art', 'Leonardo AI', 'Design', 'Prompt Engineering']
  },

  // ── Khóa 2: Tạo video bằng AI ──
  {
    id: 2,
    title: 'Sản Xuất Video Viral & Quảng Cáo Triệu View Bằng AI',
    description: 'Nắm trọn quy trình sáng tạo video chuyên nghiệp: viết kịch bản với ChatGPT, tạo hình nhân vật đồng nhất, tạo chuyển động cinematic với Runway Gen-3/Kling AI, lồng tiếng AI và hậu kỳ CapCut.',
    categoryId: 2,
    instructor: 'Vũ Hải Long – Film Director & AI Video Specialist',
    thumbnail: '',
    duration: '7 giờ',
    totalLessons: 4,
    level: 'Trung cấp',
    allowedRoles: ['admin', 'employee_new', 'employee_old', 'customer'],
    lessonIds: [5, 6, 7, 8],
    quizId: 2,
    rating: 4.95,
    enrollCount: 218,
    status: 'active',
    createdAt: '2026-02-05',
    tags: ['Runway Gen-3', 'Kling AI', 'HeyGen', 'CapCut AI', 'Video Marketing']
  },

  // ── Khóa 3: AI Agent & Tự động hóa ──
  {
    id: 3,
    title: 'Xây Dựng AI Agent & Tự Động Hóa Vận Hành Doanh Nghiệp',
    description: 'Khóa học chuyên sâu hướng dẫn xây dựng trợ lý AI độc lập (AI Agents), kết nối hệ thống Multi-agent với Make.com, n8n, CrewAI, OpenAI Assistants API giúp tự động hóa chăm sóc khách hàng và xử lý công việc.',
    categoryId: 3,
    instructor: 'Dr. Minh Hoàng – Chuyên gia Kiến trúc AI Agent',
    thumbnail: '',
    duration: '8 giờ',
    totalLessons: 4,
    level: 'Nâng cao',
    allowedRoles: ['admin', 'employee_new', 'employee_old'],
    lessonIds: [9, 10, 11, 12],
    quizId: 3,
    rating: 4.88,
    enrollCount: 95,
    status: 'active',
    createdAt: '2026-02-20',
    tags: ['AI Agent', 'CrewAI', 'n8n', 'Make.com', 'Automation', 'Assistants API']
  },

  // ── Khóa 4: Kỹ năng bán hàng ──
  {
    id: 4,
    title: 'Kỹ Năng Bán Hàng Tư Vấn Đỉnh Cao & Nghệ Thuật Chốt Sale',
    description: 'Phương pháp bán hàng theo giải pháp giá trị: thấu hiểu insight tâm lý khách hàng, nghệ thuật đặt câu hỏi SPIN, kỹ năng bẻ gãy mọi lý do từ chối và chốt đơn tự nhiên không gượng ép.',
    categoryId: 4,
    instructor: 'Lê Thu Trang – Trưởng ban Đào tạo Bán hàng Ohana',
    thumbnail: '',
    duration: '6 giờ',
    totalLessons: 4,
    level: 'Cơ bản',
    allowedRoles: ['admin', 'employee_new', 'employee_old', 'customer'],
    lessonIds: [13, 14, 15, 16],
    quizId: 4,
    rating: 4.92,
    enrollCount: 310,
    status: 'active',
    createdAt: '2026-01-20',
    tags: ['Bán hàng', 'Tư vấn', 'Chốt sale', 'Tâm lý khách hàng', 'SPIN Selling']
  },

  // ── Khóa 5: Kỹ năng giao tiếp ──
  {
    id: 5,
    title: 'Giao Tiếp Thấu Cảm, Lắng Nghe Chủ Động & Thuyết Phục',
    description: 'Rèn luyện phong thái tự tin, kỹ năng giao tiếp tinh tế trong môi trường công sở và với khách hàng; giải quyết mâu thuẫn, kiểm soát cảm xúc và thuyết phục đối phương bằng tư duy Win-Win.',
    categoryId: 5,
    instructor: 'Ngô Thanh Sơn – Master Trainer Giao Tiếp Ứng Xử',
    thumbnail: '',
    duration: '5 giờ',
    totalLessons: 4,
    level: 'Cơ bản',
    allowedRoles: ['admin', 'employee_new', 'employee_old', 'customer'],
    lessonIds: [17, 18, 19, 20],
    quizId: 5,
    rating: 4.85,
    enrollCount: 260,
    status: 'active',
    createdAt: '2026-02-01',
    tags: ['Giao tiếp', 'Lắng nghe chủ động', 'Thuyết trình', 'Thương lượng', 'EQ']
  },

  // ── Khóa 6: Quy trình Ohana ──
  {
    id: 6,
    title: 'Quy Trình Chuẩn Vận Hành & Văn Hóa Doanh Nghiệp Ohana',
    description: 'Chương trình onboarding bắt buộc cho mọi thành viên Ohana: triết lý gia đình Ohana, tiêu chuẩn dịch vụ khách hàng 5 sao, quy trình phối hợp liên phòng ban và các quy định hành chính nội bộ.',
    categoryId: 6,
    instructor: 'Hội đồng Quản trị & Ban Văn hóa Ohana Group',
    thumbnail: '',
    duration: '4 giờ',
    totalLessons: 4,
    level: 'Cơ bản',
    allowedRoles: ['admin', 'employee_new', 'employee_old', 'customer'],
    lessonIds: [21, 22, 23, 24],
    quizId: 6,
    rating: 5.0,
    enrollCount: 420,
    status: 'active',
    createdAt: '2026-01-05',
    tags: ['Quy trình Ohana', 'Văn hóa Ohana', 'SOP', 'Onboarding', 'Dịch vụ 5 sao']
  }
];

// ─── Default Lessons ────────────────────────────────────────────
const DEFAULT_LESSONS = [
  // ── Khóa 1: Tạo ảnh bằng AI ──
  {
    id: 1, courseId: 1, order: 1,
    title: 'Bài 1: Cấu trúc Prompt chuẩn chỉnh & Tư duy mỹ thuật AI',
    description: 'Học cách tư duy câu lệnh (Prompt Structure): Chủ thể, ánh sáng, góc chụp (camera lens), phong cách nghệ thuật và các tham số kỹ thuật quan trọng.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    duration: '40 phút',
    docName: 'Giao-trinh-Prompt-Midjourney-Chuan.pdf',
    docUrl: '',
    type: 'video',
    interactiveQs: [
      {
        id: 101, timestamp: 60,
        text: 'Trong Midjourney, tham số nào dùng để thay đổi tỷ lệ khung hình của bức ảnh?',
        options: ['--ar (Aspect Ratio)', '--v (Version)', '--stylize', '--chaos'],
        correct: 0
      }
    ]
  },
  {
    id: 2, courseId: 1, order: 2,
    title: 'Bài 2: Làm chủ Midjourney V6 – Tham số chuyên sâu & Ảnh đồng nhất',
    description: 'Kỹ thuật giữ nhất quán khuôn mặt nhân vật (--cref) và phong cách thẩm mỹ (--sref), blend ảnh và upscale hình ảnh đạt độ phân giải in ấn 4K/8K.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    duration: '50 phút',
    docName: 'CheatSheet-Midjourney-V6-Parameters.pdf',
    docUrl: '',
    type: 'video',
    interactiveQs: [
      {
        id: 102, timestamp: 85,
        text: 'Lệnh tham số nào trong Midjourney V6 dùng để tham chiếu khuôn mặt nhân vật đồng nhất?',
        options: ['--sref', '--cref', '--iw', '--seed'],
        correct: 1
      }
    ]
  },
  {
    id: 3, courseId: 1, order: 3,
    title: 'Bài 3: Ứng dụng Leonardo AI & DALL-E 3 trong thiết kế thương mại',
    description: 'Sử dụng Leonardo AI với tính năng Canvas, Realtime Gen và DALL-E 3 để chèn chữ chính xác vào banner, poster và ảnh mockup sản phẩm.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    duration: '45 phút',
    docName: 'Huong-dan-Leonardo-AI-E-commerce.pdf',
    docUrl: '',
    type: 'video',
    interactiveQs: []
  },
  {
    id: 4, courseId: 1, order: 4,
    title: 'Bài 4: Hoàn thiện sản phẩm ảnh thương mại & Upscale chất lượng cao',
    description: 'Quy trình xuất file, tinh chỉnh chi tiết với Generative Fill và phần mềm upscale Magnific / Topaz Gigapixel chuẩn in ấn.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    duration: '45 phút',
    docName: 'Quy-trinh-Post-Processing-AI-Images.pdf',
    docUrl: '',
    type: 'video',
    interactiveQs: []
  },

  // ── Khóa 2: Tạo video bằng AI ──
  {
    id: 5, courseId: 2, order: 1,
    title: 'Bài 1: Xây dựng Kịch bản & Storyboard Video AI chuẩn Viral',
    description: 'Tận dụng ChatGPT và Claude để brainstorm ý tưởng hook 3 giây đầu, phân chia cảnh quay và viết prompt mô tả từng khung hình.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    duration: '45 phút',
    docName: 'Cong-thuc-Hook-Video-Viral.pdf',
    docUrl: '',
    type: 'video',
    interactiveQs: [
      {
        id: 201, timestamp: 50,
        text: 'Khoảng thời gian nào được coi là "cửa sổ vàng" để giữ chân người xem video ngắn?',
        options: ['3 giây đầu tiên', '30 giây đầu', '1 phút đầu', 'Bất kỳ lúc nào'],
        correct: 0
      }
    ]
  },
  {
    id: 6, courseId: 2, order: 2,
    title: 'Bài 2: Làm chủ Runway Gen-3 & Kling AI – Điều khiển camera chuyển động',
    description: 'Kỹ thuật Text-to-Video và Image-to-Video: điều khiển chuyển động camera pan, zoom, tilt mượt mà như máy quay điện ảnh chuyên nghiệp.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    duration: '55 phút',
    docName: 'Camera-Motion-Prompts-Runway.pdf',
    docUrl: '',
    type: 'video',
    interactiveQs: []
  },
  {
    id: 7, courseId: 2, order: 3,
    title: 'Bài 3: Tạo MC ảo nói chuyện như người thật với HeyGen & ElevenLabs',
    description: 'Tạo nhân vật Avatar AI nói tiếng Việt tự nhiên, khớp khẩu hình từng miligiây và lồng giọng đọc truyền cảm, chuyên nghiệp.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    duration: '50 phút',
    docName: 'Huong-dan-tao-MC-Ao-HeyGen.pdf',
    docUrl: '',
    type: 'video',
    interactiveQs: []
  },
  {
    id: 8, courseId: 2, order: 4,
    title: 'Bài 4: Hậu kỳ, Hiệu ứng âm thanh & Tối ưu xuất bản trên CapCut AI',
    description: 'Ghép nối các đoạn clip, thêm hiệu ứng âm thanh SFX, phụ đề tự động (auto captions) và tối ưu hóa tỷ lệ khung hình chuẩn TikTok/Reels/YouTube Shorts.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    duration: '60 phút',
    docName: 'Checklist-Xuat-Ban-Video-Ngan.pdf',
    docUrl: '',
    type: 'video',
    interactiveQs: []
  },

  // ── Khóa 3: AI Agent & Tự động hóa ──
  {
    id: 9, courseId: 3, order: 1,
    title: 'Bài 1: Tổng quan về AI Agent – Xu hướng tự động hóa tương lai',
    description: 'Phân biệt giữa Chatbot truyền thống và AI Agent: Khả năng tự lập kế hoạch (Reasoning), sử dụng công cụ (Tools) và ghi nhớ ngữ cảnh (Memory).',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    duration: '50 phút',
    docName: 'Kien-truc-Tong-quan-AI-Agent.pdf',
    docUrl: '',
    type: 'video',
    interactiveQs: [
      {
        id: 301, timestamp: 65,
        text: 'Điểm khác biệt căn bản nhất giữa AI Agent và Chatbot thông thường là gì?',
        options: [
          'AI Agent có giao diện đẹp hơn',
          'AI Agent có khả năng chủ động lập kế hoạch, sử dụng công cụ và hành động độc lập',
          'AI Agent chỉ trả lời câu hỏi văn bản',
          'AI Agent không dùng mô hình ngôn ngữ lớn'
        ],
        correct: 1
      }
    ]
  },
  {
    id: 10, courseId: 3, order: 2,
    title: 'Bài 2: Tự động hóa quy trình với Make.com & n8n kết hợp OpenAI API',
    description: 'Thiết kế kịch bản tự động xử lý email, phân loại đơn hàng, trích xuất dữ liệu hóa đơn và gửi thông báo qua Zalo/Telegram.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    duration: '60 phút',
    docName: 'Workflow-Templates-n8n-Make.pdf',
    docUrl: '',
    type: 'video',
    interactiveQs: []
  },
  {
    id: 11, courseId: 3, order: 3,
    title: 'Bài 3: Xây dựng hệ thống Multi-Agent cộng tác với CrewAI',
    description: 'Phân vai cho các AI Agent: Nhà nghiên cứu (Researcher), Biên tập viên (Writer), Kiểm định chất lượng (Reviewer) làm việc cùng nhau.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    duration: '65 phút',
    docName: 'Thuc-hanh-CrewAI-Can-ban.pdf',
    docUrl: '',
    type: 'video',
    interactiveQs: []
  },
  {
    id: 12, courseId: 3, order: 4,
    title: 'Bài 4: Triển khai Trợ lý AI Chăm Sóc Khách Hàng 24/7 cho Doanh nghiệp',
    description: 'Tích hợp Knowledge Base nội bộ (RAG), bảo mật thông tin doanh nghiệp và kiểm thử thực tế trước khi go-live.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    duration: '65 phút',
    docName: 'Bao-mat-va-Trien-khai-AI-Agent.pdf',
    docUrl: '',
    type: 'video',
    interactiveQs: []
  },

  // ── Khóa 4: Kỹ năng bán hàng ──
  {
    id: 13, courseId: 4, order: 1,
    title: 'Bài 1: Định vị tư duy Bán hàng theo Giải pháp giá trị',
    description: 'Chuyển đổi từ người chào bán sản phẩm (Salesperson) thành chuyên gia cố vấn đáng tin cậy (Trusted Advisor) của khách hàng.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    duration: '45 phút',
    docName: 'Tu-duy-Ban-hang-Gia-tri.pdf',
    docUrl: '',
    type: 'video',
    interactiveQs: [
      {
        id: 401, timestamp: 70,
        text: 'Khách hàng quyết định mua hàng chủ yếu dựa trên điều gì?',
        options: [
          'Tính năng kỹ thuật phức tạp',
          'Giá trị và giải pháp giải quyết nỗi đau của họ mang lại',
          'Sự nhiệt tình thái quá của người bán',
          'Thời lượng cuộc gọi chào hàng'
        ],
        correct: 1
      }
    ]
  },
  {
    id: 14, courseId: 4, order: 2,
    title: 'Bài 2: Bộ câu hỏi khám phá nhu cầu SPIN Selling chuẩn xác',
    description: 'Thực hành 4 bước câu hỏi: Tình hình (Situation), Vấn đề (Problem), Hậu quả (Implication), Lợi ích giải pháp (Need-Payoff).',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    duration: '50 phút',
    docName: 'Bo-cau-hoi-SPIN-Ohana.pdf',
    docUrl: '',
    type: 'video',
    interactiveQs: []
  },
  {
    id: 15, courseId: 4, order: 3,
    title: 'Bài 3: Nghệ thuật hóa giải phản đối & Xử lý giá cao',
    description: 'Công thức 3F (Feel - Felt - Found) và kỹ thuật phân tách chi phí (Cost of Inaction) để khách hàng thấy giá trị vượt trội so với giá tiền.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    duration: '50 phút',
    docName: 'Kich-ban-Xu-ly-Phan-doi-Kinh-dien.pdf',
    docUrl: '',
    type: 'video',
    interactiveQs: []
  },
  {
    id: 16, courseId: 4, order: 4,
    title: 'Bài 4: Kỹ thuật chốt sale tự nhiên & Chăm sóc sau bán để Referral',
    description: 'Nhận diện tín hiệu mua hàng của khách và áp dụng các đòn bẩy chốt sale uyển chuyển, gia tăng giá trị trọn đời của khách hàng.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    duration: '45 phút',
    docName: 'Quy-trinh-Cham-soc-Referral.pdf',
    docUrl: '',
    type: 'video',
    interactiveQs: []
  },

  // ── Khóa 5: Kỹ năng giao tiếp ──
  {
    id: 17, courseId: 5, order: 1,
    title: 'Bài 1: Sức mạnh của Lắng nghe Chủ động (Active Listening)',
    description: 'Kỹ thuật lắng nghe ở cấp độ 3: nghe bằng tai, bằng mắt và bằng trái tim; phản hồi gương (mirroring) để thiết lập kết nối sâu sắc.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    duration: '40 phút',
    docName: 'Bi-quyet-Lang-nghe-Chu-dong.pdf',
    docUrl: '',
    type: 'video',
    interactiveQs: [
      {
        id: 501, timestamp: 45,
        text: 'Hành động nào thể hiện sự lắng nghe chủ động tốt nhất?',
        options: [
          'Ngắt lời để đưa ra ý kiến của mình ngay',
          'Nhìn vào mắt, gật đầu và tóm tắt lại ý đối phương để xác nhận',
          'Xem điện thoại trong khi nghe',
          'Đồng ý mọi điều mà không cần hiểu'
        ],
        correct: 1
      }
    ]
  },
  {
    id: 18, courseId: 5, order: 2,
    title: 'Bài 2: Ngôn ngữ cơ thể & Giọng điệu trong giao tiếp tinh tế',
    description: 'Kiểm soát ánh mắt, nụ cười, dáng đứng và điều chỉnh ngữ điệu, nhịp điệu giọng nói để tạo thiện cảm ngay từ 30 giây đầu tiên.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    duration: '45 phút',
    docName: 'Ngon-ngu-Co-the-Chuyen-nghiep.pdf',
    docUrl: '',
    type: 'video',
    interactiveQs: []
  },
  {
    id: 19, courseId: 5, order: 3,
    title: 'Bài 3: Giao tiếp thấu cảm & Kỹ thuật hóa giải mâu thuẫn',
    description: 'Phương pháp Nonviolent Communication (NVC): Quan sát không phán xét, bày tỏ cảm xúc, nhu cầu và đưa ra lời đề nghị tích cực.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    duration: '45 phút',
    docName: 'Giao-tiep-Trac-an-NVC.pdf',
    docUrl: '',
    type: 'video',
    interactiveQs: []
  },
  {
    id: 20, courseId: 5, order: 4,
    title: 'Bài 4: Thuyết trình tự tin & Nghệ thuật Storytelling truyền cảm hứng',
    description: 'Cấu trúc bài thuyết trình 3 phần cuốn hút, cách lồng ghép câu chuyện thương hiệu để lay động và thúc đẩy người nghe hành động.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    duration: '50 phút',
    docName: 'Ky-nang-Storytelling-Dinh-cao.pdf',
    docUrl: '',
    type: 'video',
    interactiveQs: []
  },

  // ── Khóa 6: Quy trình Ohana ──
  {
    id: 21, courseId: 6, order: 1,
    title: 'Bài 1: Giá trị Cốt lõi & Văn hóa Gia đình Ohana',
    description: 'Khám phá ý nghĩa "Ohana nghĩa là Gia đình - Không ai bị bỏ lại phía sau": Sứ mệnh, tầm nhìn, 5 giá trị cốt lõi và niềm tự hào Ohana.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    duration: '35 phút',
    docName: 'So-tay-Van-hoa-Ohana.pdf',
    docUrl: '',
    type: 'video',
    interactiveQs: [
      {
        id: 601, timestamp: 40,
        text: 'Ý nghĩa thiêng liêng nhất của thông điệp "Ohana" là gì?',
        options: [
          'Chỉ là tên một thương hiệu',
          'Gia đình – Gắn kết, yêu thương và không ai bị bỏ lại phía sau',
          'Một câu chào thông thường',
          'Một kỹ thuật kinh doanh'
        ],
        correct: 1
      }
    ]
  },
  {
    id: 22, courseId: 6, order: 2,
    title: 'Bài 2: Quy trình Phối hợp Liên phòng ban & Chuẩn mực Tác phong',
    description: 'Nguyên tắc làm việc nhóm, giao việc và nghiệm thu (SLA), quy tắc ứng xử nơi công sở và văn hóa phản hồi tích cực (Feedback Culture).',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    duration: '40 phút',
    docName: 'Quy-che-Phoi-hop-Noi-bo-Ohana.pdf',
    docUrl: '',
    type: 'video',
    interactiveQs: []
  },
  {
    id: 23, courseId: 6, order: 3,
    title: 'Bài 3: Tiêu chuẩn Dịch vụ Khách hàng 5 Sao Ohana',
    description: 'Quy chuẩn chào đón, hỗ trợ tận tâm, đồng hành cùng khách hàng từ trước, trong và sau dịch vụ để tạo ra trải nghiệm "Wow Service".',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    duration: '45 phút',
    docName: 'Tieu-chuan-Dich-vu-5-Sao-Ohana.pdf',
    docUrl: '',
    type: 'video',
    interactiveQs: []
  },
  {
    id: 24, courseId: 6, order: 4,
    title: 'Bài 4: Quy trình Xử lý Sự cố & Chính sách Bảo mật Thông tin',
    description: 'Các bước xử lý tình huống khẩn cấp, bảo mật dữ liệu khách hàng theo quy định pháp luật và kênh hỗ trợ nội bộ nhanh chóng.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    duration: '35 phút',
    docName: 'Chinh-sach-Bao-mat-va-Ung-pho-Su-co.pdf',
    docUrl: '',
    type: 'video',
    interactiveQs: []
  }
];

// ─── Default Quizzes ────────────────────────────────────────────
const DEFAULT_QUIZZES = [
  {
    id: 1, courseId: 1, title: 'Bài Kiểm Tra: Tạo Hình Ảnh Bằng AI & Midjourney',
    timeLimit: 15, passingScore: 70,
    questions: [
      {
        id: 1, text: 'Tham số nào trong Midjourney dùng để điều chỉnh tỷ lệ khung hình bức ảnh (ví dụ 16:9)?',
        options: ['--v 6', '--ar 16:9', '--chaos 50', '--stylize 250'],
        correct: 1
      },
      {
        id: 2, text: 'Để giữ khuôn mặt nhân vật đồng nhất qua nhiều bức ảnh trong Midjourney V6, ta sử dụng tham số nào?',
        options: ['--sref', '--cref', '--weird', '--quality'],
        correct: 1
      },
      {
        id: 3, text: 'Prompt Engineering trong AI Image là gì?',
        options: [
          'Một loại máy tính chuyên dụng vẽ tranh',
          'Nghệ thuật và kỹ thuật thiết kế câu lệnh để AI tạo ra hình ảnh chuẩn xác nhất',
          'Chương trình diệt virus đồ họa',
          'Tính năng xuất ảnh thành file vector'
        ],
        correct: 1
      },
      {
        id: 4, text: 'Ưu điểm nổi bật nhất của DALL-E 3 khi tạo ảnh là gì?',
        options: [
          'Tạo ảnh siêu nhanh không cần prompt',
          'Khả năng hiểu ngữ cảnh phức tạp và tạo chữ (text) chính xác trên ảnh',
          'Chỉ chạy được trên điện thoại',
          'Không hỗ trợ ngôn ngữ tự nhiên'
        ],
        correct: 1
      },
      {
        id: 5, text: 'Công cụ nào sau đây thường được dùng để Upscale ảnh AI lên độ phân giải cao 4K/8K mà không bị vỡ nét?',
        options: ['MS Paint', 'Topaz Gigapixel / Magnific AI', 'Notepad', 'Excel'],
        correct: 1
      },
      {
        id: 6, text: 'Khi thiết kế ảnh sản phẩm quảng cáo bằng AI, yếu tố nào quan trọng nhất trong prompt?',
        options: [
          'Viết càng ngắn càng tốt',
          'Xác định rõ chủ thể, bố cục, góc ánh sáng và phong cách thị giác mong muốn',
          'Chỉ cần nhập tên sản phẩm',
          'Không cần miêu tả ánh sáng'
        ],
        correct: 1
      }
    ]
  },
  {
    id: 2, courseId: 2, title: 'Bài Kiểm Tra: Sản Xuất Video Bằng AI Chuyên Nghiệp',
    timeLimit: 15, passingScore: 70,
    questions: [
      {
        id: 1, text: 'Trong quy trình làm video AI, bước đầu tiên quan trọng nhất là gì?',
        options: ['Render video ngay', 'Xây dựng kịch bản (Script) và Storyboard chi tiết', 'Tải nhạc bản quyền', 'Mua phần mềm đắt tiền nhất'],
        correct: 1
      },
      {
        id: 2, text: 'Runway Gen-3 và Kling AI thuộc nhóm công cụ nào?',
        options: ['Phần mềm kế toán', 'Công cụ AI tạo video chuyển động từ Text và Image', 'Trình duyệt web', 'Game giải trí'],
        correct: 1
      },
      {
        id: 3, text: 'Công cụ HeyGen thường được sử dụng nhiều nhất cho mục đích nào?',
        options: ['Cắt ghép âm thanh', 'Tạo nhân vật MC/Avatar AI nói chuyện khớp khẩu hình đa ngôn ngữ', 'Dò lỗi chính tả', 'Quét virus'],
        correct: 1
      },
      {
        id: 4, text: 'Để video ngắn giữ chân người xem cao trên TikTok/Reels, kỹ thuật "Hook" cần xuất hiện trong bao lâu?',
        options: ['3 giây đầu tiên', '30 giây sau', 'Cuối video', 'Không cần thiết'],
        correct: 0
      },
      {
        id: 5, text: 'Tỷ lệ khung hình chuẩn cho video ngắn dạng dọc trên điện thoại là bao nhiêu?',
        options: ['16:9', '4:3', '9:16', '21:9'],
        correct: 2
      },
      {
        id: 6, text: 'ElevenLabs là công cụ AI hàng đầu thế giới về lĩnh vực gì?',
        options: ['Tạo ảnh 3D', 'Chuyển văn bản thành giọng đọc tự nhiên (Text-to-Speech) & Clone voice', 'Dịch video không tiếng', 'Thiết kế logo'],
        correct: 1
      }
    ]
  },
  {
    id: 3, courseId: 3, title: 'Bài Kiểm Tra: Xây Dựng AI Agent & Tự Động Hóa',
    timeLimit: 15, passingScore: 75,
    questions: [
      {
        id: 1, text: 'Khái niệm "AI Agent" khác biệt với Chatbot thông thường ở điểm cốt lõi nào?',
        options: [
          'AI Agent có thể tự lập kế hoạch, sử dụng công cụ bên ngoài và thực hiện chuỗi hành động độc lập',
          'AI Agent không cần internet',
          'AI Agent chỉ là một trang HTML đơn giản',
          'Không có điểm khác biệt'
        ],
        correct: 0
      },
      {
        id: 2, text: 'Make.com và n8n là các nền tảng dùng để:',
        options: ['Vẽ hình minh họa', 'Thiết kế quy trình tự động hóa workflow kết nối các phần mềm và AI', 'Chơi game online', 'Chỉnh sửa ảnh thẻ'],
        correct: 1
      },
      {
        id: 3, text: 'Hệ thống Multi-Agent (như CrewAI) hoạt động dựa trên nguyên lý nào?',
        options: [
          'Một AI làm tất cả mọi việc',
          'Nhiều AI Agent với vai trò chuyên biệt (Role, Goal, Backstory) phối hợp với nhau để hoàn thành nhiệm vụ phức tạp',
          'Chạy ngẫu nhiên không kiểm soát',
          'Chỉ dùng để gửi email spam'
        ],
        correct: 1
      },
      {
        id: 4, text: 'Kỹ thuật RAG (Retrieval-Augmented Generation) giúp AI Agent:',
        options: [
          'Truy xuất và trả lời dựa trên kho dữ liệu tài liệu nội bộ chính xác của doanh nghiệp',
          'Tăng tốc độ kết nối wifi',
          'Thay thế hoàn toàn nhân sự giám đốc',
          'Tự động tắt máy tính'
        ],
        correct: 0
      },
      {
        id: 5, text: 'Khi thiết lập AI Agent chăm sóc khách hàng, yếu tố nào cần chú trọng hàng đầu?',
        options: [
          'Cho phép Agent tự ý hứa hẹn vô điều kiện',
          'Đặt rào chắn an toàn (Guardrails), giới hạn thẩm quyền và chuyển người thật khi cần thiết',
          'Để Agent hoạt động không cần kiểm thử',
          'Ẩn đi việc khách hàng đang chat với AI'
        ],
        correct: 1
      }
    ]
  },
  {
    id: 4, courseId: 4, title: 'Bài Kiểm Tra: Kỹ Năng Bán Hàng Tư Vấn Đỉnh Cao',
    timeLimit: 15, passingScore: 70,
    questions: [
      {
        id: 1, text: 'Bước đầu tiên trong quy trình bán hàng tư vấn chuyên nghiệp là gì?',
        options: ['Báo giá ngay lập tức', 'Khảo sát, lắng nghe và thấu hiểu nỗi đau/nhu cầu của khách hàng', 'Yêu cầu đặt cọc trước', 'Phê bình đối thủ'],
        correct: 1
      },
      {
        id: 2, text: 'Trong phương pháp SPIN Selling, chữ "I" đại diện cho loại câu hỏi nào?',
        options: ['Information (Thông tin)', 'Implication (Gợi ý hậu quả nếu không giải quyết vấn đề)', 'Important (Quan trọng)', 'Interest (Sở thích)'],
        correct: 1
      },
      {
        id: 3, text: 'Khi khách hàng nói "Giá bên em đắt quá", cách phản hồi thông minh nhất là:',
        options: [
          'Giảm giá 50% ngay',
          'Lắng nghe đồng cảm (3F), làm rõ tiêu chuẩn so sánh và phân tích giá trị/lợi ích vượt trội mà họ nhận được',
          'Bảo khách hàng đi mua bên khác',
          'Phủ nhận ý kiến của khách'
        ],
        correct: 1
      },
      {
        id: 4, text: 'Mục đích lớn nhất của việc chăm sóc khách hàng chu đáo sau bán hàng là gì?',
        options: [
          'Chỉ để xong việc',
          'Xây dựng mối quan hệ tin cậy, tăng tỷ lệ mua lại (Upsell/Cross-sell) và nhận lời giới thiệu khách hàng mới (Referral)',
          'Không có mục đích gì',
          'Yêu cầu khách hàng đánh giá 5 sao ép buộc'
        ],
        correct: 1
      },
      {
        id: 5, text: 'Một chuyên gia bán hàng thành công nhất là người:',
        options: [
          'Nói liên tục không cho khách chen vào',
          'Biết đặt câu hỏi sắc bén, lắng nghe 70% thời lượng và tư vấn đúng giải pháp khách hàng cần',
          'Ép khách mua bằng mọi giá',
          'Chỉ nói về tính năng kỹ thuật'
        ],
        correct: 1
      }
    ]
  },
  {
    id: 5, courseId: 5, title: 'Bài Kiểm Tra: Kỹ Năng Giao Tiếp & Lắng Nghe',
    timeLimit: 15, passingScore: 70,
    questions: [
      {
        id: 1, text: 'Lắng nghe chủ động (Active Listening) đòi hỏi người nghe phải làm gì?',
        options: [
          'Chờ đối phương dứt lời để nói suy nghĩ của mình',
          'Tập trung toàn diện, quan sát ngôn ngữ cơ thể, không phán xét và nhắc lại để xác nhận thấu hiểu',
          'Cắt ngang khi thấy đối phương nói sai',
          'Đồng ý chiếu lệ'
        ],
        correct: 1
      },
      {
        id: 2, text: 'Theo quy luật Mehrabian, yếu tố nào chiếm tỷ trọng lớn nhất trong ấn tượng giao tiếp trực tiếp?',
        options: ['Ngôn ngữ cơ thể (Body Language)', 'Nội dung từ ngữ đơn thuần', 'Ngữ điệu giọng nói', 'Trang phục đắt tiền'],
        correct: 0
      },
      {
        id: 3, text: 'Khi xảy ra bất đồng ý kiến với đồng nghiệp hoặc khách hàng, nguyên tắc giao tiếp Win-Win là gì?',
        options: [
          'Một bên phải chịu thua hoàn toàn',
          'Tìm kiếm giải pháp cùng có lợi dựa trên sự tôn trọng và thấu hiểu nhu cầu của nhau',
          'Bỏ qua không thèm giải quyết',
          'Cố gắng tranh luận để chứng minh mình luôn đúng'
        ],
        correct: 1
      },
      {
        id: 4, text: 'Trong thuyết trình, kỹ thuật kể chuyện (Storytelling) mang lại hiệu quả gì?',
        options: [
          'Làm bài thuyết trình dài dòng hơn',
          'Chạm vào cảm xúc người nghe, giúp thông điệp dễ nhớ, dễ hiểu và truyền cảm hứng hành động',
          'Gây hoang mang cho người nghe',
          'Không có tác dụng thực tế'
        ],
        correct: 1
      },
      {
        id: 5, text: 'Để gửi một lời góp ý (Feedback) mang tính xây dựng cao, ta nên áp dụng nguyên tắc nào?',
        options: [
          'Chỉ trích gay gắt trước đám đông',
          'Góp ý trên hành vi cụ thể (không quy chụp nhân cách), trao đổi riêng tư và đưa ra giải pháp cải thiện',
          'Góp ý bóng gió mỉa mai',
          'Không bao giờ góp ý'
        ],
        correct: 1
      }
    ]
  },
  {
    id: 6, courseId: 6, title: 'Bài Kiểm Tra: Quy Trình Chuẩn & Văn Hóa Ohana',
    timeLimit: 15, passingScore: 80,
    questions: [
      {
        id: 1, text: 'Ý nghĩa triết lý cốt lõi của thương hiệu "Ohana" là gì?',
        options: [
          'Kinh doanh vì lợi nhuận trên hết',
          'Gia đình – Yêu thương, gắn kết bền chặt, đồng lòng phát triển và không ai bị bỏ lại phía sau',
          'Một từ ngữ nước ngoài không mang ý nghĩa',
          'Chỉ áp dụng cho ban giám đốc'
        ],
        correct: 1
      },
      {
        id: 2, text: 'Tiêu chuẩn Dịch vụ 5 Sao của Ohana hướng đến điều gì cao nhất?',
        options: [
          'Làm vừa đủ theo hợp đồng',
          'Tạo ra trải nghiệm khách hàng vượt trên mong đợi (Wow Experience) bằng sự chân thành và chuyên nghiệp',
          'Chỉ phục vụ khách hàng VIP',
          'Không cần quan tâm phản hồi của khách'
        ],
        correct: 1
      },
      {
        id: 3, text: 'Khi tiếp nhận yêu cầu hỗ trợ từ khách hàng hoặc đồng nghiệp, thái độ chuẩn mực Ohana là:',
        options: [
          'Từ chối nếu không thuộc đúng phạm vi việc của mình',
          'Chủ động lắng nghe, tiếp nhận với tinh thần trách nhiệm cao nhất và theo sát đến khi vấn đề được giải quyết triệt để',
          'Đùn đẩy trách nhiệm cho phòng ban khác',
          'Bỏ qua nếu đang bận việc riêng'
        ],
        correct: 1
      },
      {
        id: 4, text: 'Quy định bảo mật thông tin khách hàng tại Ohana được thực hiện như thế nào?',
        options: [
          'Có thể chia sẻ tự do ra bên ngoài',
          'Tuyệt đối bảo mật, lưu trữ theo quy chuẩn an toàn và chỉ sử dụng đúng mục đích phục vụ khách hàng đã đồng ý',
          'Không có quy định bảo mật nào',
          'Tùy từng nhân viên tự quyết định'
        ],
        correct: 1
      },
      {
        id: 5, text: 'Tinh thần làm việc đội ngũ Ohana biểu hiện rõ nét nhất qua hành động nào?',
        options: [
          'Mỗi người chỉ biết việc của mình',
          'Tương trợ đồng đội, sẵn sàng chia sẻ kiến thức, cùng học hỏi cùng tiến bộ vì mục tiêu chung của tổ chức',
          'Giấu nghề và cạnh tranh tiêu cực',
          'Không tham gia các hoạt động tập thể'
        ],
        correct: 1
      }
    ]
  }
];

// ─── Storage Helpers ──────────────────────────────────────────
function getDB(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('getDB error:', e);
    return [];
  }
}

function setDB(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error('setDB error:', e);
  }
}

// ─── Initialize Database ──────────────────────────────────────
function initDB() {
  const storedVer = localStorage.getItem('ohana_db_version');

  // Khởi tạo các bảng dữ liệu nếu chưa có
  if (!localStorage.getItem(DB_KEYS.users))       setDB(DB_KEYS.users, DEFAULT_USERS);
  if (!localStorage.getItem(DB_KEYS.categories))  setDB(DB_KEYS.categories, DEFAULT_CATEGORIES);
  if (!localStorage.getItem(DB_KEYS.courses))     setDB(DB_KEYS.courses, DEFAULT_COURSES);
  if (!localStorage.getItem(DB_KEYS.lessons))     setDB(DB_KEYS.lessons, DEFAULT_LESSONS);
  if (!localStorage.getItem(DB_KEYS.quizzes))     setDB(DB_KEYS.quizzes, DEFAULT_QUIZZES);
  if (!localStorage.getItem(DB_KEYS.results))     setDB(DB_KEYS.results, []);
  if (!localStorage.getItem(DB_KEYS.enrollments)) setDB(DB_KEYS.enrollments, []);
  if (!localStorage.getItem(DB_KEYS.progress))    setDB(DB_KEYS.progress, []);
  if (!localStorage.getItem(DB_KEYS.settings)) {
    setDB(DB_KEYS.settings, {
      siteName: 'OHANA Academy',
      hotline: '0988 739 896',
      email: 'contact@ohana.vn',
      website: 'https://ohana.vn',
      address: 'Hà Nội & TP. Hồ Chí Minh, Việt Nam',
      facebook: 'https://facebook.com/ohana.academy',
      youtube: 'https://youtube.com/@ohana.academy',
      zalo: 'https://zalo.me/ohana'
    });
  }

  // Version tagging
  localStorage.setItem('ohana_db_version', DB_VERSION);
}

// ─── User CRUD ────────────────────────────────────────────────
const UserDB = {
  getAll: () => getDB(DB_KEYS.users),
  getById: (id) => getDB(DB_KEYS.users).find(u => u.id === parseInt(id)),
  getByEmail: (email) => getDB(DB_KEYS.users).find(u => u.email.toLowerCase() === email.trim().toLowerCase()),
  create: (data) => {
    const users = getDB(DB_KEYS.users);
    const u = {
      ...data,
      id: Date.now(),
      status: data.status || 'active',
      createdAt: new Date().toISOString().split('T')[0]
    };
    users.push(u);
    setDB(DB_KEYS.users, users);
    return u;
  },
  update: (id, data) => {
    const users = getDB(DB_KEYS.users);
    const i = users.findIndex(u => u.id === parseInt(id));
    if (i < 0) return null;
    users[i] = { ...users[i], ...data };
    setDB(DB_KEYS.users, users);
    return users[i];
  },
  delete: (id) => {
    const users = getDB(DB_KEYS.users).filter(u => u.id !== parseInt(id));
    setDB(DB_KEYS.users, users);
  }
};

// ─── Course CRUD ──────────────────────────────────────────────
const CourseDB = {
  getAll: () => getDB(DB_KEYS.courses),
  getById: (id) => getDB(DB_KEYS.courses).find(c => c.id === parseInt(id)),
  getByCategory: (catId) => getDB(DB_KEYS.courses).filter(c => c.categoryId === parseInt(catId) && c.status === 'active'),
  getByRole: (role) => {
    const all = getDB(DB_KEYS.courses);
    if (role === 'admin') return all;
    return all.filter(c => c.allowedRoles.includes(role) && c.status === 'active');
  },
  create: (data) => {
    const courses = getDB(DB_KEYS.courses);
    const c = {
      ...data,
      id: Date.now(),
      enrollCount: 0,
      rating: 5.0,
      createdAt: new Date().toISOString().split('T')[0]
    };
    courses.push(c);
    setDB(DB_KEYS.courses, courses);
    return c;
  },
  update: (id, data) => {
    const courses = getDB(DB_KEYS.courses);
    const i = courses.findIndex(c => c.id === parseInt(id));
    if (i < 0) return null;
    courses[i] = { ...courses[i], ...data };
    setDB(DB_KEYS.courses, courses);
    return courses[i];
  },
  delete: (id) => {
    const courses = getDB(DB_KEYS.courses).filter(c => c.id !== parseInt(id));
    setDB(DB_KEYS.courses, courses);
  }
};

// ─── Lesson CRUD ──────────────────────────────────────────────
const LessonDB = {
  getAll: () => getDB(DB_KEYS.lessons),
  getById: (id) => getDB(DB_KEYS.lessons).find(l => l.id === parseInt(id)),
  getByCourse: (courseId) => getDB(DB_KEYS.lessons).filter(l => l.courseId === parseInt(courseId)).sort((a, b) => a.order - b.order),
  create: (data) => {
    const lessons = getDB(DB_KEYS.lessons);
    const l = { ...data, id: Date.now() };
    lessons.push(l);
    setDB(DB_KEYS.lessons, lessons);
    return l;
  },
  update: (id, data) => {
    const lessons = getDB(DB_KEYS.lessons);
    const i = lessons.findIndex(x => x.id === parseInt(id));
    if (i < 0) return null;
    lessons[i] = { ...lessons[i], ...data };
    setDB(DB_KEYS.lessons, lessons);
    return lessons[i];
  },
  delete: (id) => {
    const lessons = getDB(DB_KEYS.lessons).filter(l => l.id !== parseInt(id));
    setDB(DB_KEYS.lessons, lessons);
  }
};

// ─── Quiz CRUD ────────────────────────────────────────────────
const QuizDB = {
  getAll: () => getDB(DB_KEYS.quizzes),
  getById: (id) => getDB(DB_KEYS.quizzes).find(q => q.id === parseInt(id)),
  getByCourse: (courseId) => getDB(DB_KEYS.quizzes).find(q => q.courseId === parseInt(courseId)),
  create: (data) => {
    const quizzes = getDB(DB_KEYS.quizzes);
    const q = { ...data, id: Date.now() };
    quizzes.push(q);
    setDB(DB_KEYS.quizzes, quizzes);
    return q;
  },
  update: (id, data) => {
    const quizzes = getDB(DB_KEYS.quizzes);
    const i = quizzes.findIndex(x => x.id === parseInt(id));
    if (i < 0) return null;
    quizzes[i] = { ...quizzes[i], ...data };
    setDB(DB_KEYS.quizzes, quizzes);
    return quizzes[i];
  },
  delete: (id) => {
    const quizzes = getDB(DB_KEYS.quizzes).filter(q => q.id !== parseInt(id));
    setDB(DB_KEYS.quizzes, quizzes);
  }
};

// ─── Results DB ───────────────────────────────────────────────
const ResultDB = {
  getAll: () => getDB(DB_KEYS.results),
  getByUser: (userId) => getDB(DB_KEYS.results).filter(r => r.userId === parseInt(userId)),
  getByCourse: (courseId) => getDB(DB_KEYS.results).filter(r => r.courseId === parseInt(courseId)),
  getUserCourseResult: (userId, courseId) => getDB(DB_KEYS.results).find(r => r.userId === parseInt(userId) && r.courseId === parseInt(courseId)),
  save: (data) => {
    const results = getDB(DB_KEYS.results);
    const i = results.findIndex(r => r.userId === data.userId && r.courseId === data.courseId);
    const n = {
      ...data,
      id: i >= 0 ? results[i].id : Date.now(),
      submittedAt: new Date().toISOString()
    };
    if (i >= 0) results[i] = n;
    else results.push(n);
    setDB(DB_KEYS.results, results);
    return n;
  }
};

// ─── Progress DB ──────────────────────────────────────────────
const ProgressDB = {
  get: (userId, courseId) => {
    const all = getDB(DB_KEYS.progress);
    return all.find(p => p.userId === parseInt(userId) && p.courseId === parseInt(courseId)) || { completedLessons: [] };
  },
  markComplete: (userId, courseId, lessonId) => {
    const all = getDB(DB_KEYS.progress);
    const i = all.findIndex(p => p.userId === parseInt(userId) && p.courseId === parseInt(courseId));
    if (i >= 0) {
      if (!all[i].completedLessons.includes(lessonId)) {
        all[i].completedLessons.push(lessonId);
      }
      all[i].lastActivity = new Date().toISOString();
    } else {
      all.push({
        userId: parseInt(userId),
        courseId: parseInt(courseId),
        completedLessons: [lessonId],
        lastActivity: new Date().toISOString()
      });
    }
    setDB(DB_KEYS.progress, all);
  }
};

// ─── Enrollment DB ────────────────────────────────────────────
const EnrollmentDB = {
  getAll: () => getDB(DB_KEYS.enrollments),
  isEnrolled: (userId, courseId) => getDB(DB_KEYS.enrollments).some(e => e.userId === parseInt(userId) && e.courseId === parseInt(courseId)),
  enroll: (userId, courseId) => {
    const e = getDB(DB_KEYS.enrollments);
    if (!e.some(x => x.userId === parseInt(userId) && x.courseId === parseInt(courseId))) {
      e.push({
        userId: parseInt(userId),
        courseId: parseInt(courseId),
        enrolledAt: new Date().toISOString()
      });
      setDB(DB_KEYS.enrollments, e);

      // Tăng biến đếm học viên của khóa học
      const courses = getDB(DB_KEYS.courses);
      const idx = courses.findIndex(c => c.id === parseInt(courseId));
      if (idx >= 0) {
        courses[idx].enrollCount = (courses[idx].enrollCount || 0) + 1;
        setDB(DB_KEYS.courses, courses);
      }
    }
  },
  getByUser: (userId) => getDB(DB_KEYS.enrollments).filter(e => e.userId === parseInt(userId))
};

// ─── Category DB ──────────────────────────────────────────────
const CategoryDB = {
  getAll: () => getDB(DB_KEYS.categories),
  getById: (id) => getDB(DB_KEYS.categories).find(c => c.id === parseInt(id)),
  create: (data) => {
    const cats = getDB(DB_KEYS.categories);
    const n = { ...data, id: Date.now() };
    cats.push(n);
    setDB(DB_KEYS.categories, cats);
    return n;
  },
  update: (id, data) => {
    const cats = getDB(DB_KEYS.categories);
    const i = cats.findIndex(c => c.id === parseInt(id));
    if (i < 0) return null;
    cats[i] = { ...cats[i], ...data };
    setDB(DB_KEYS.categories, cats);
    return cats[i];
  },
  delete: (id) => {
    const cats = getDB(DB_KEYS.categories).filter(c => c.id !== parseInt(id));
    setDB(DB_KEYS.categories, cats);
  }
};

// ─── Settings DB ──────────────────────────────────────────────
const SettingsDB = {
  get: () => {
    try {
      return JSON.parse(localStorage.getItem(DB_KEYS.settings)) || {};
    } catch {
      return {};
    }
  },
  save: (data) => {
    localStorage.setItem(DB_KEYS.settings, JSON.stringify(data));
  }
};

// ─── Constants & UI Helpers ───────────────────────────────────
const ROLE_LABELS = {
  admin: 'Quản trị viên',
  employee_new: 'Nhân viên mới',
  employee_old: 'Nhân viên Ohana',
  customer: 'Học viên'
};

const ROLE_COLORS = {
  admin: '#dc2626',
  employee_new: '#0284c7',
  employee_old: '#ea580c',
  customer: '#16a34a'
};

const LEVEL_COLORS = {
  'Cơ bản': '#10b981',
  'Trung cấp': '#f59e0b',
  'Nâng cao': '#ef4444'
};

function formatDate(iso) {
  if (!iso) return '—';
  const d = new Date(iso);
  return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;
}

function generateStars(rating) {
  let str = '';
  const r = parseFloat(rating) || 5;
  for (let i = 0; i < Math.floor(r); i++) str += '★';
  if (r % 1 >= 0.5) str += '☆';
  return str;
}

function showToast(msg, type = 'info') {
  let cont = document.getElementById('toastContainer');
  if (!cont) {
    cont = document.createElement('div');
    cont.id = 'toastContainer';
    document.body.appendChild(cont);
  }
  const t = document.createElement('div');
  t.className = `toast ${type}`;
  const icon = type === 'success' ? '✅' : (type === 'error' ? '❌' : 'ℹ️');
  t.innerHTML = `<span>${icon}</span> <span>${msg}</span>`;
  cont.appendChild(t);
  setTimeout(() => {
    t.style.opacity = '0';
    t.style.transform = 'translateY(10px)';
    setTimeout(() => t.remove(), 300);
  }, 3500);
}

// Khởi chạy khởi tạo ban đầu
initDB();

// Expose globals
window.DB_KEYS = DB_KEYS;
window.UserDB = UserDB;
window.CourseDB = CourseDB;
window.LessonDB = LessonDB;
window.QuizDB = QuizDB;
window.ResultDB = ResultDB;
window.ProgressDB = ProgressDB;
window.EnrollmentDB = EnrollmentDB;
window.CategoryDB = CategoryDB;
window.SettingsDB = SettingsDB;
window.ROLE_LABELS = ROLE_LABELS;
window.ROLE_COLORS = ROLE_COLORS;
window.LEVEL_COLORS = LEVEL_COLORS;
window.formatDate = formatDate;
window.generateStars = generateStars;
window.showToast = showToast;
