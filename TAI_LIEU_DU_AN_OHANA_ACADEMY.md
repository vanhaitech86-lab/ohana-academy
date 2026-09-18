# 🌺 TÀI LIỆU TOÀN DIỆN DỰ ÁN OHANA ACADEMY (E-LEARNING LMS)

> **OHANA Academy** – Hệ sinh thái đào tạo trực tuyến chính thức của **OHANA Group**, chuyên sâu về **Trí Tuệ Nhân Tạo (AI)**, **Kỹ Năng Bán Hàng**, **Kỹ Năng Giao Tiếp** và **Quy Trình Chuẩn Vận Hành SOP Ohana Astronixa**.

---

## 📌 MỤC LỤC
1. [Thông Tin Truy Cập & Tài Khoản Hệ Thống](#1-thông-tin-truy-cập--tài-khoản-hệ-thống)
2. [Hệ Thống Danh Mục & Bảng Phân Loại Khóa Học](#2-hệ-thống-danh-mục--bảng-phân-loại-khóa-học)
3. [Tích Hợp 7 Video SOP Chính Thức Từ Kênh YouTube Ohana Astronixa VN](#3-tích-hợp-7-video-sop-chính-thức-từ-kênh-youtube-ohana-astronixa-vn)
4. [Các Tính Năng Trọng Tâm Của Nền Tảng](#4-các-tính-năng-trọng-tâm-của-nền-tảng)
5. [Cấu Trúc Thư Mục & Mã Nguồn Dự Án](#5-cấu-trúc-thư-mục--mã-nguồn-dự-án)
6. [Mô Hình Dữ Liệu LocalStorage Engine v2.2](#6-mô-hình-dữ-liệu-localstorage-engine-v22)
7. [Hướng Dẫn Cài Đặt, Vận Hành & Triển Khai](#7-hướng-dẫn-cài-đặt-vận-hành--triển-khai)

---

## 1. THÔNG TIN TRUY CẬP & TÀI KHOẢN HỆ THỐNG

### 🌐 Các Đường Dẫn Chính Thức (Production)
| Thành Phần | Đường Dẫn (URL) | Ghi Chú |
| :--- | :--- | :--- |
| **Trang Chủ OHANA Academy** | [https://ohana-academy.vercel.app](https://ohana-academy.vercel.app) | Trang giới thiệu, slider, danh mục và video |
| **Thư Viện Khóa Học** | [https://ohana-academy.vercel.app/courses.html](https://ohana-academy.vercel.app/courses.html) | Tìm kiếm, lọc theo loại hình, cấp độ |
| **Trang Quản Trị Admin** | [https://ohana-academy.vercel.app/admin.html](https://ohana-academy.vercel.app/admin.html) | Bảng điều khiển, quản lý LMS toàn diện |
| **Kho Mã Nguồn GitHub** | [https://github.com/vanhaitech86-lab/ohana-academy](https://github.com/vanhaitech86-lab/ohana-academy) | Toàn bộ Source code phiên bản v2.2 |
| **Kênh YouTube Đào Tạo** | [https://www.youtube.com/@OhanaAstronixaVN](https://www.youtube.com/@OhanaAstronixaVN) | Kênh video chính thức Ohana Astronixa VN |

### 🔐 Danh Sách Tài Khoản Thử Nghiệm Sẵn Có
| Vai Trò (Role) | Họ Và Tên | Email Đăng Nhập | Mật Khẩu | Quyền Hạn |
| :--- | :--- | :--- | :--- | :--- |
| **Quản Trị Viên (Admin)** | Quản trị viên Ohana | `admin@ohana.vn` | `admin123` | Toàn quyền quản trị khóa học, bài thi, học viên, xuất CSV |
| **Nhân Viên Mới** | Nguyễn Văn Nam | `nhanvien.moi@ohana.vn` | `123456` | Học khóa Onboarding, Quy trình SOP, Kỹ năng cơ bản |
| **Nhân Viên Ohana** | Trần Mai Lan | `nhanvien@ohana.vn` | `123456` | Học toàn bộ khóa học chuyên môn và quy trình |
| **Học Viên Độc Lập** | Lê Hoàng Phong | `hocvien@ohana.vn` | `123456` | Học viên tự do, đăng ký học các khóa mở và khóa có chứng chỉ |

---

## 2. HỆ THỐNG DANH MỤC & BẢNG PHÂN LOẠI KHÓA HỌC

### 📂 8 Danh Mục Đào Tạo Chính Thức
1. **🎨 Tạo hình ảnh bằng AI** (ID: 1 | Slug: `ai-image`): Làm chủ Midjourney V6, DALL-E 3, Leonardo AI, thiết kế đồ họa quảng cáo và bộ nhận diện thương hiệu.
2. **🎬 Tạo video bằng AI** (ID: 2 | Slug: `ai-video`): Sản xuất video viral triệu view với Runway Gen-3, Kling AI, HeyGen MC ảo và CapCut AI.
3. **🤖 Khóa học về AI Agent** (ID: 3 | Slug: `ai-agent`): Xây dựng trợ lý ảo độc lập, kết nối hệ thống Multi-agent với CrewAI, Make.com, n8n.
4. **💼 Kỹ năng bán hàng** (ID: 4 | Slug: `sales`): Phương pháp tư vấn giải pháp giá trị, bộ câu hỏi SPIN Selling, xử lý từ chối và chốt sale đỉnh cao.
5. **💬 Kỹ năng giao tiếp** (ID: 5 | Slug: `communication`): Giao tiếp thấu cảm NVC, lắng nghe chủ động, thuyết phục đối tác và giải quyết xung đột.
6. **🏢 Quy trình Ohana** (ID: 6 | Slug: `ohana-sop`): Bộ quy trình chuẩn vận hành SOP, tiêu chuẩn dịch vụ 5 sao và văn hóa đại gia đình Ohana.
7. **🎁 Khóa học miễn phí** (ID: 7 | Slug: `free`): Bộ sưu tập các khóa học nhập môn, chia sẻ cộng đồng và quy trình nội bộ 100% miễn phí.
8. **🎓 Khóa học trả phí cấp chứng chỉ** (ID: 8 | Slug: `paid-cert`): Các khóa học chuyên sâu thực chiến, kèm bài kiểm tra tốt nghiệp và cấp Giấy chứng nhận điện tử chuẩn hóa OHANA Academy.

### 📋 Bảng Chi Tiết 8 Khóa Học Trọng Tâm
| ID | Tên Khóa Học | Giảng Viên | Phân Loại | Học Phí | Cấp Chứng Chỉ |
| :---: | :--- | :--- | :---: | :---: | :---: |
| **1** | **Mastering Midjourney & Generative AI Design Thực Chiến** | Alex Đặng | 🎓 Trả phí | `890.000 đ` *(Gốc: 1.800.000 đ)* | ✅ Có (Chứng chỉ Chuyên gia Thiết kế Hình ảnh AI) |
| **2** | **Sản Xuất Video Viral & Quảng Cáo Triệu View Bằng AI** | Vũ Hải Long | 🎓 Trả phí | `990.000 đ` *(Gốc: 2.200.000 đ)* | ✅ Có (Chứng chỉ Chuyên gia Sản xuất Video AI) |
| **3** | **Xây Dựng AI Agent & Tự Động Hóa Vận Hành Doanh Nghiệp** | Dr. Minh Hoàng | 🎓 Trả phí | `1.490.000 đ` *(Gốc: 3.000.000 đ)* | ✅ Có (Chứng chỉ Kiến trúc sư AI Agent Doanh nghiệp) |
| **4** | **Kỹ Năng Bán Hàng Tư Vấn Đỉnh Cao & Nghệ Thuật Chốt Sale** | Lê Thu Trang | 🎓 Trả phí | `790.000 đ` *(Gốc: 1.500.000 đ)* | ✅ Có (Chứng nhận Chuyên viên Tư vấn Bán hàng Ohana) |
| **5** | **Giao Tiếp Thấu Cảm, Lắng Nghe Chủ Động & Thuyết Phục** | Ngô Thanh Sơn | 🎁 Miễn phí | `0 đ (Miễn phí)` | ❌ Không |
| **6** | **Quy Trình Chuẩn Vận Hành & Văn Hóa Ohana Astronixa** | Ban Đào Tạo Ohana | 🎁 Miễn phí | `0 đ (Miễn phí)` | ❌ Đào tạo SOP nội bộ |
| **7** | **Nghệ Thuật Lãnh Đạo Đột Phá & Quản Trị Đội Ngũ Xuất Sắc** | Dr. Hoàng Minh Tuấn | 🎓 Trả phí | `1.290.000 đ` *(Gốc: 2.600.000 đ)* | ✅ Có (Chứng chỉ Năng lực Lãnh đạo & Quản trị Đội ngũ Cấp cao) |
| **8** | **Train the Trainer: Phương Pháp Sư Phạm Hiện Đại & Kỹ Năng Đào Tạo Thực Chiến** | Master Trainer Trần Lan Anh | 🎓 Trả phí | `1.190.000 đ` *(Gốc: 2.400.000 đ)* | ✅ Có (Chứng chỉ Giảng viên Nội bộ Chuyên nghiệp) |

---

## 3. TÍCH HỢP 7 VIDEO SOP CHÍNH THỨC TỪ KÊNH YOUTUBE OHANA ASTRONIXA VN

Toàn bộ 7 video chuẩn từ kênh [@OhanaAstronixaVN](https://www.youtube.com/@OhanaAstronixaVN) đã được đồng bộ vào Khóa học 6 và hiển thị tại khu vực **Video SOP Nổi Bật** trên trang chủ:

| STT | Video ID | Tiêu Đề Bài Giảng Chuẩn SOP | Thời Lượng | Phân Loại Quy Trình | Link Nhúng Embed |
| :---: | :---: | :--- | :---: | :--- | :--- |
| **1** | `G2KI_UpLvj4` | **OHANA - NGÔI NHÀ CHUNG CỦA NHỮNG ƯỚC MƠ VÀ YÊU THƯƠNG** | 3:45 | Văn hóa & Tầm nhìn Ohana | `https://www.youtube.com/embed/G2KI_UpLvj4` |
| **2** | `Y477V88-jfc` | **BÀI HÁT TRUYỀN THỐNG OHANA** | 4:12 | Văn hóa & Ca khúc truyền thống | `https://www.youtube.com/embed/Y477V88-jfc` |
| **3** | `Z8r9hT3b45I` | **HƯỚNG DẪN ĐĂNG KÝ TÀI KHOẢN ASTRONIXA** | 2:15 | Quy trình thao tác Astronixa | `https://www.youtube.com/embed/Z8r9hT3b45I` |
| **4** | `mQ5t5Lp01-Y` | **HƯỚNG DẪN ĐỊNH DANH TÀI KHOẢN (KYC) VÀ BẢO MẬT 2 LỚP (2FA)** | 3:20 | Định danh tài khoản & Bảo mật | `https://www.youtube.com/embed/mQ5t5Lp01-Y` |
| **5** | `rU8nK2p9w4Q` | **HƯỚNG DẪN NẠP TIỀN VÀO VÍ ASTRONIXA** | 2:48 | Quy trình thao tác Astronixa | `https://www.youtube.com/embed/rU8nK2p9w4Q` |
| **6** | `sPvb7_qvIWs` | **HƯỚNG DẪN MUA GÓI SẢN PHẨM TRÊN ASTRONIXA** | 1:39 | Quy trình thao tác Astronixa | `https://www.youtube.com/embed/sPvb7_qvIWs` |
| **7** | `l9vAc7C8Zz4` | **HƯỚNG DẪN RÚT TIỀN VỀ VÍ ASTRONIXA** | 2:32 | Quy trình thao tác Astronixa | `https://www.youtube.com/embed/l9vAc7C8Zz4` |

---

## 4. CÁC TÍNH NĂNG TRỌNG TÂM CỦA NỀN TẢNG

### 🎯 1. Phân Loại Nhanh & Lọc Khóa Học Đa Chiều
- **Thanh phân loại nhanh trên trang chủ**: Đặt `🎁 Khóa học miễn phí` và `🎓 Khóa học trả phí cấp chứng chỉ` lên hàng đầu ngay sau `🌟 Tất cả khóa học`.
- **Bộ lọc trên courses.html**: Kết hợp tìm kiếm từ khóa, danh mục chủ đề, phân loại loại hình (Miễn phí / Trả phí) và cấp độ (Cơ bản / Trung cấp / Nâng cao).

### 🎯 2. Trình Cấp Bằng Chứng Nhận Tốt Nghiệp Điện Tử (`buildCertificateHtml`)
- **Tự động kích hoạt khi học viên thi đỗ bài trắc nghiệm (từ 70% trở lên)**:
  - Bằng chứng nhận thiết kế phong cách **Hoàng Gia Navy - Vàng Kim (Gold & Navy Elegance)**.
  - In hoa họ tên học viên, tên khóa học, điểm số tốt nghiệp.
  - Con dấu đỏ tròn vector xác thực của **OHANA GROUP**.
  - Chữ ký Giảng viên đào tạo & Ban Giám đốc Học viện.
  - Mã định danh chứng chỉ duy nhất (`OHANA-CERT-...`).
  - Hỗ trợ nút **🖨️ In / Lưu PDF** chất lượng cao phục vụ hồ sơ năng lực cá nhân.
  - Có nút **👁️ Xem mẫu chứng chỉ** ngay trên trang chi tiết khóa học.

### 🎯 3. Bảng Quản Trị Hệ Thống Toàn Diện (`admin.html`)
- **Admin Auth Gate**: Truy cập trang admin sẽ mở cổng đăng nhập bảo mật với nút **⚡ Đăng nhập nhanh bằng Admin (1 chạm)**.
- **Trình soạn thảo ngân hàng câu hỏi trắc nghiệm (Quiz Question Editor)**:
  - Thêm, sửa, xóa câu hỏi trực quan.
  - Soạn 4 đáp án A, B, C, D và chọn đáp án đúng bằng radio button.
- **Quản lý Video YouTube & Trình xem thử trực tiếp (Modal Preview)**:
  - Xem thử video SOP ngay trên giao diện Admin không cần mở tab ngoài.
  - 1-click sao chép mã nhúng embed URL.
  - Tự động chuẩn hóa link `youtube.com/watch?v=...` hoặc `youtu.be/...` sang `/embed/...`.
- **Quản lý Bảng điểm & Xuất báo cáo CSV UTF-8**:
  - Lọc điểm số theo khóa học và kết quả Đạt / Chưa đạt.
  - Xuất file CSV tích hợp BOM tiếng Việt, mở rõ nét bằng Microsoft Excel.
- **Quản lý Khóa học & Học viên**:
  - Bật / Tắt khóa học chỉ bằng 1 cú nhấp chuột.
  - Thiết lập giá bán, giá gốc và cấu hình cấp chứng chỉ.
  - Đặt lại mật khẩu học viên về `123456` khi học viên quên mật khẩu.

---

## 5. CẤU TRÚC THƯ MỤC & MÃ NGUỒN DỰ ÁN

```text
e:\WEB ĐÀO TẠO OHANA\
├── index.html                     # Trang chủ (Hero slider, category bar, course cards, YouTube showcase)
├── courses.html                   # Thư viện khóa học & bộ lọc đa tiêu chí
├── course-detail.html             # Chi tiết khóa học, đề cương, khung giá, mẫu chứng chỉ
├── lesson.html                    # Phòng học trực tuyến, video player tương tác, tài liệu PDF
├── quiz.html                      # Hệ thống thi trắc nghiệm, tính điểm & cấp chứng chỉ tốt nghiệp
├── admin.html                     # Bảng điều khiển quản trị hệ thống LMS
├── auth.html                      # Cổng đăng nhập & đăng ký tài khoản học viên
├── README.md                      # Tài liệu tóm tắt dự án trên GitHub
├── TAI_LIEU_DU_AN_OHANA_ACADEMY.md # Tài liệu đóng gói toàn diện này
├── css/
│   ├── style.css                  # Hệ thống biến giao diện, kiểu dáng thẻ khóa học, modal chứng chỉ
│   ├── admin.css                  # Giao diện admin dashboard, sidebar drawer, table, modal soạn đề
│   └── mobile.css                 # Tối ưu hóa chuẩn Responsive cho Mobile & Tablet
└── js/
    ├── data.js                    # Cơ sở dữ liệu mẫu, LocalStorage CRUD, helper format tiền, tạo chứng chỉ
    ├── auth.js                    # Quản lý phiên làm việc (Session), phân quyền truy cập (RBAC)
    ├── app.js                     # Xử lý tương tác trang chủ, bộ lọc khóa học, video showcase
    └── admin.js                   # Logic toàn bộ Admin Portal, Quiz Editor, Video Preview, Export CSV
```

---

## 6. MÔ HÌNH DỮ LIỆU LOCALSTORAGE ENGINE v2.2

Hệ thống hoạt động hoàn toàn độc lập phía máy khách (Client-side Data Engine) thông qua `localStorage`:

| Tên Khóa (Key) | Mô Tả Dữ Liệu | Cấu Trúc Bản Ghi Chính |
| :--- | :--- | :--- |
| `ohana_users` | Danh sách tài khoản | `id, name, email, password, role, phone, department, status, createdAt` |
| `ohana_categories` | Danh mục đào tạo | `id, name, icon, color, slug, description` |
| `ohana_courses` | Danh mục khóa học | `id, title, description, categoryId, priceType, price, originalPrice, hasCertificate, certificateTitle, instructor, thumbnail, duration, totalLessons, level, allowedRoles, lessonIds, quizId, rating, enrollCount, status, tags` |
| `ohana_lessons` | Danh sách bài học | `id, courseId, order, title, description, videoUrl, duration, docName, docUrl, type, interactiveQs` |
| `ohana_quizzes` | Đề thi trắc nghiệm | `id, courseId, title, timeLimit, passingScore, questions: [{id, text, options, correct}]` |
| `ohana_results` | Kết quả bài thi | `id, userId, courseId, quizId, score, correctCount, totalQuestions, answers, timeTaken, passed, date` |
| `ohana_enrollments`| Khóa học đã đăng ký | `id, userId, courseId, enrolledAt, status` |
| `ohana_progress` | Tiến độ bài học | `userId, courseId, completedLessons: []` |
| `ohana_settings` | Cấu hình hệ thống | `siteName, hotline, email, website, address, facebook, youtube, zalo` |
| `ohana_session` | Phiên đăng nhập | `user object` hiện tại |
| `ohana_db_version` | Phiên bản cơ sở dữ liệu | `2.4` (Tự động di chuyển và cập nhật trường dữ liệu mới) |

---

## 7. HƯỚNG DẪN CÀI ĐẶT, VẬN HÀNH & TRIỂN KHAI

### 💻 1. Chạy Dự Án Trên Máy Tính Cục Bộ (Local Machine)
Do dự án được xây dựng bằng công nghệ Web chuẩn (HTML5, CSS3, ES6 JavaScript), bạn không cần cài đặt môi trường Node.js hay cơ sở dữ liệu phức tạp:
1. Mở thư mục dự án `e:\WEB ĐÀO TẠO OHANA` bằng **Visual Studio Code**.
2. Cài đặt tiện ích mở rộng **Live Server** (của Ritwick Dey).
3. Nhấp chuột phải vào tệp `index.html` và chọn **Open with Live Server**.
4. Trình duyệt sẽ mở tại địa chỉ `http://127.0.0.1:5500`.

*Hoặc sử dụng bất kỳ công cụ dòng lệnh nào:*
```bash
# Sử dụng npx serve:
npx serve .

# Hoặc sử dụng Python:
python -m http.server 8080
```

### 🚀 2. Quy Trình Cập Nhật & Đẩy Lên GitHub
Khi có bất kỳ chỉnh sửa nào trong thư mục làm việc, chạy lệnh sau trong PowerShell hoặc Terminal:
```powershell
git add .
git commit -m "Cập nhật hệ thống đào tạo OHANA Academy"
git push origin main
```

### ☁️ 3. Triển Khai Trực Tiếp Lên Vercel Production
Dự án đã được liên kết với Vercel CLI. Để cập nhật lên môi trường Production tức thì:
```powershell
npx vercel --prod --yes
```
Sau 15 - 30 giây, website tại địa chỉ [https://ohana-academy.vercel.app](https://ohana-academy.vercel.app) sẽ tự động cập nhật bản mới nhất.

---

*Tài liệu được biên soạn và đóng gói chính thức cho Hệ thống Đào tạo Trực tuyến **OHANA Academy**.*  
*Phiên bản: **v2.2.0** | Ngày hoàn thiện: **Tháng 09/2026**.*
