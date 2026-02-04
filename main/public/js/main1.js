document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // PHẦN 1: XỬ LÝ GIAO DIỆN (SIDEBAR TOGGLE)
    // ============================================
    const toggleBtn = document.getElementById('sidebar-toggle');
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('main-content');

    if (toggleBtn) {
        toggleBtn.addEventListener('click', function() {
            sidebar.classList.toggle('collapsed');
            mainContent.classList.toggle('collapsed');
        });
    }

    // ============================================
    // PHẦN 2: DỮ LIỆU GIẢ LẬP (MOCK DATABASE)
    // ============================================
    // Đây là object chứa dữ liệu trả về từ DB
    const dbData = {
        student: {
            name: "Nguyễn Văn A",
            id: "SV2024001"
        },
        stats: {
            gpa: 3.15,
            riskCount: "02", // Số lượng môn nguy cơ
            credits: 85
        },
        // Danh sách môn học kỳ này
        subjects: [
            { name: "Lập trình Web", credit: 3, score: 3.5, note: "An toàn" },
            { name: "Cấu trúc dữ liệu", credit: 4, score: 1.5, note: "Nguy hiểm" },
            { name: "Toán cao cấp 2", credit: 3, score: 1.8, note: "Nguy hiểm" },
            { name: "Triết học", credit: 2, score: 2.5, note: "Trung bình" },
            { name: "Mạng máy tính", credit: 3, score: 3.0, note: "An toàn" }
        ],
        advice: "Sinh viên có 2 môn dưới trung bình (Toán & Cấu trúc dữ liệu). Cần liên hệ giảng viên bộ môn để xin bài tập gỡ điểm trước tuần 15."
    };

    // ============================================
    // PHẦN 3: RENDER DỮ LIỆU RA HTML
    // ============================================
    function loadDashboard(data) {
        // 1. Điền thông tin cơ bản
        document.getElementById('user-name-display').textContent = `${data.student.name} (${data.student.id})`;
        document.getElementById('gpa-value').textContent = data.stats.gpa;
        document.getElementById('risk-count').textContent = data.stats.riskCount;
        document.getElementById('credits-count').textContent = data.stats.credits;
        document.getElementById('advice-text').textContent = data.advice;

        // 2. Render Bảng điểm & Danh sách cảnh báo
        const tableBody = document.getElementById('subject-table-body');
        const riskContainer = document.getElementById('risk-list-container');
        
        // Xóa nội dung cũ (loading...)
        tableBody.innerHTML = '';
        riskContainer.innerHTML = '';

        data.subjects.forEach(sub => {
            // -- Logic màu sắc trạng thái --
            let badgeClass = 'status-neutral';
            if(sub.score < 2.0) badgeClass = 'status-warning'; // Đỏ
            else if(sub.score >= 3.0) badgeClass = 'status-safe'; // Xanh

            // -- Tạo dòng trong bảng --
            const rowHTML = `
                <tr>
                    <td style="font-weight: 500;">${sub.name}</td>
                    <td>${sub.credit}</td>
                    <td style="font-weight: 700;">${sub.score}</td>
                    <td><span class="status-badge ${badgeClass}">${sub.note}</span></td>
                </tr>
            `;
            tableBody.insertAdjacentHTML('beforeend', rowHTML);

            // -- Nếu điểm thấp (< 2.0), thêm vào cột cảnh báo --
            if(sub.score < 2.0) {
                const riskHTML = `
                    <div class="risk-item">
                        <h4>${sub.name}</h4>
                        <p>Điểm: ${sub.score}/4.0 - Nguy cơ rớt môn</p>
                    </div>
                `;
                riskContainer.insertAdjacentHTML('beforeend', riskHTML);
            }
        });
    }

    // Gọi hàm chạy
    loadDashboard(dbData);
});