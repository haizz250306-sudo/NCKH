document.addEventListener('DOMContentLoaded', function() {
    
    // --- 1. XỬ LÝ SIDEBAR TOGGLE (Dùng chung) ---
    const toggleBtn = document.getElementById('sidebar-toggle');
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('main-content');

    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            sidebar.classList.toggle('collapsed');
            mainContent.classList.toggle('collapsed');
        });
    }

    // --- 2. DỮ LIỆU TỔNG HỢP (DATABASE GIẢ LẬP) ---
    const dbData = {
        student: {
            name: "Nguyễn Văn A",
            id: "SV2024001",
            dob: "15/08/2004",
            gender: "Nam",
            email: "a.nguyenvan@uni.edu.vn",
            phone: "0912.345.678"
        },
        dashboard: {
            gpa: 3.15,
            riskCount: "02",
            credits: 85,
            subjects: [
                { name: "Lập trình Web", credit: 3, score: 3.5, note: "An toàn", type: "safe" },
                { name: "Cấu trúc dữ liệu", credit: 4, score: 1.5, note: "Nguy hiểm", type: "danger" },
                { name: "Toán cao cấp 2", credit: 3, score: 1.8, note: "Nguy hiểm", type: "danger" }
            ]
        },
        warning: {
            analysis: [
                { subject: "Toán Cao Cấp A1", gpa: 1.2, status: "Nguy cơ cao", type: "danger", suggestion: "Cần đạt <b>5.8</b> điểm cuối kỳ." },
                { subject: "Lập Trình C++", gpa: 1.8, status: "Nguy cơ cao", type: "danger", suggestion: "Cần đạt <b>3.6</b> điểm cuối kỳ." },
                { subject: "Kỹ Năng Mềm", gpa: 3.5, status: "Tốt", type: "safe", suggestion: "Đã an toàn." }
            ],
            advice: "Bạn có 2 môn báo động đỏ. Cần ưu tiên ôn tập ngay."
        },
        profile: {
            class: "64CNTT-2",
            faculty: "Công nghệ thông tin",
            major: "Kỹ thuật phần mềm",
            course: "K64 (2022-2026)",
            // Đã xóa advisor
            status: "Đang học"
        }
    };

    // --- 3. CÁC HÀM RENDER ---

    // Hàm load thông tin Header (Dùng cho mọi trang)
    function loadCommon() {
        const userNameDisplay = document.getElementById('user-name-display') || document.getElementById('header-user-name');
        if (userNameDisplay) {
            userNameDisplay.textContent = `${dbData.student.name} - ${dbData.student.id}`;
        }
    }

    // Hàm load Trang Dashboard
    function loadDashboard() {
        if (!document.getElementById('gpa-value')) return; // Không phải trang dashboard thì thoát

        document.getElementById('gpa-value').textContent = dbData.dashboard.gpa;
        document.getElementById('risk-count').textContent = dbData.dashboard.riskCount;
        document.getElementById('credits-count').textContent = dbData.dashboard.credits;

        const tableBody = document.getElementById('subject-table-body');
        const riskContainer = document.getElementById('risk-list-container');
        tableBody.innerHTML = '';
        riskContainer.innerHTML = '';

        dbData.dashboard.subjects.forEach(sub => {
            // Table Row
            let badgeClass = sub.type === 'danger' ? 'status-warning' : 'status-safe';
            let row = `<tr>
                <td style="font-weight:500">${sub.name}</td>
                <td>${sub.credit}</td>
                <td style="font-weight:700">${sub.score}</td>
                <td><span class="status-badge ${badgeClass}">${sub.note}</span></td>
            </tr>`;
            tableBody.innerHTML += row;

            // Risk Item
            if (sub.score < 2.0) {
                riskContainer.innerHTML += `
                    <div class="risk-item">
                        <h4>${sub.name}</h4>
                        <p>Điểm: ${sub.score} - Cần cải thiện gấp</p>
                    </div>`;
            }
        });
    }

    // Hàm load Trang Cảnh Báo (Table Analysis)
    function loadWarningPage() {
        const tableBody = document.getElementById('analysis-table-body');
        if (!tableBody) return; // Không phải trang cảnh báo thì thoát

        tableBody.innerHTML = '';
        dbData.warning.analysis.forEach(item => {
            let gpaClass = item.type === 'danger' ? 'text-danger' : '';
            let badgeClass = item.type === 'danger' ? 'badge-danger' : 'badge-good';
            
            let row = `<tr>
                <td><span class="subject-name">${item.subject}</span></td>
                <td><span class="gpa-score ${gpaClass}">${item.gpa}</span></td>
                <td><span class="status-badge ${badgeClass}">${item.status}</span></td>
                <td><span class="suggestion-text">${item.suggestion}</span></td>
                <td style="text-align: right;"><button class="btn-detail">Chi tiết</button></td>
            </tr>`;
            tableBody.innerHTML += row;
        });

        document.getElementById('system-advice-text').textContent = dbData.warning.advice;
    }

    // Hàm load Trang Hồ Sơ (Đã bỏ Advisor)
    function loadProfilePage() {
        if (!document.getElementById('p-name')) return; // Không phải trang profile thì thoát

        // Basic Info
        document.getElementById('p-name').textContent = dbData.student.name;
        document.getElementById('p-id').textContent = dbData.student.id;
        document.getElementById('p-dob').textContent = dbData.student.dob;
        document.getElementById('p-gender').textContent = dbData.student.gender;
        document.getElementById('p-email').textContent = dbData.student.email;
        document.getElementById('p-phone').textContent = dbData.student.phone;

        // Academic Info
        document.getElementById('p-class').textContent = dbData.profile.class;
        document.getElementById('p-faculty').textContent = dbData.profile.faculty;
        document.getElementById('p-major').textContent = dbData.profile.major;
        document.getElementById('p-course').textContent = dbData.profile.course;
        // Đã xóa dòng advisor
    }

    // --- CHẠY TẤT CẢ ---
    loadCommon();
    loadDashboard();
    loadWarningPage();
    loadProfilePage();
});