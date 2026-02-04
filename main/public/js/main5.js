document.addEventListener('DOMContentLoaded', function() {
    
    // 1. LOGIC TOGGLE SIDEBAR (Giữ nguyên)
    const toggleBtn = document.getElementById('sidebar-toggle');
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('main-content');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            sidebar.classList.toggle('collapsed');
            mainContent.classList.toggle('collapsed');
        });
    }

    // ===============================================
    // 2. GIẢ LẬP DỮ LIỆU TỪ DATABASE (MOCK DATA)
    // Sau này bạn thay đoạn này bằng API fetch()
    // ===============================================
    const database = {
        student: {
            name: "Nguyễn Văn A",
            id: "SV2024001"
        },
        stats: {
            gpa: 3.15,
            riskCount: "02",
            credits: 85
        },
        grades: [
            { name: "Lập trình Web", credit: 3, score: 3.5, status: "An toàn", type: "safe" },
            { name: "Cấu trúc dữ liệu", credit: 4, score: 1.5, status: "Nguy hiểm", type: "danger" },
            { name: "Toán cao cấp 2", credit: 3, score: 1.8, status: "Nguy hiểm", type: "danger" },
            { name: "Triết học", credit: 2, score: 2.5, status: "Trung bình", type: "neutral" },
            { name: "Mạng máy tính", credit: 3, score: 3.0, status: "An toàn", type: "safe" }
        ],
        advice: "Sinh viên có 2 môn dưới trung bình (Toán & Cấu trúc dữ liệu). Cần liên hệ giảng viên bộ môn để xin bài tập gỡ điểm trước tuần 15."
    };

    // ===============================================
    // 3. HÀM ĐỔ DỮ LIỆU VÀO HTML
    // ===============================================
    function renderData() {
        // Giả lập độ trễ mạng (0.5 giây sau mới hiện dữ liệu) cho giống thật
        setTimeout(() => {
            
            // A. Điền thông tin cơ bản & Thống kê (Thay thế dấu ...)
            document.getElementById('header-username').textContent = `${database.student.name} (${database.student.id})`;
            document.getElementById('gpa-val').textContent = database.stats.gpa;
            document.getElementById('risk-val').textContent = database.stats.riskCount;
            document.getElementById('credits-val').textContent = database.stats.credits;
            document.getElementById('advice-text').textContent = database.advice;

            // B. Render Bảng điểm (Vòng lặp)
            const tableBody = document.getElementById('grade-table-body');
            tableBody.innerHTML = ""; // Xóa dòng "Đang tải..."

            database.grades.forEach(mon => {
                // Xác định class màu sắc dựa trên type
                let badgeClass = "";
                if(mon.type === 'safe') badgeClass = "status-safe";
                else if(mon.type === 'danger') badgeClass = "status-danger";
                else badgeClass = "status-neutral";

                // Tạo HTML cho từng dòng
                let row = `
                    <tr>
                        <td style="font-weight: 500;">${mon.name}</td>
                        <td>${mon.credit}</td>
                        <td style="font-weight: 700;">${mon.score}</td>
                        <td><span class="status-badge ${badgeClass}">${mon.status}</span></td>
                    </tr>
                `;
                tableBody.innerHTML += row;
            });

            // C. Render List Cảnh báo (Lọc ra môn điểm thấp)
            const riskContainer = document.getElementById('risk-list-container');
            riskContainer.innerHTML = ""; // Xóa chữ Loading...

            // Lọc những môn có điểm < 2.0
            const riskSubjects = database.grades.filter(mon => mon.score < 2.0);

            if (riskSubjects.length > 0) {
                riskSubjects.forEach(mon => {
                    let riskItem = `
                        <div class="risk-item">
                            <h4>${mon.name}</h4>
                            <p>Điểm: ${mon.score}/4.0 - Nguy cơ rớt môn</p>
                        </div>
                    `;
                    riskContainer.innerHTML += riskItem;
                });
            } else {
                riskContainer.innerHTML = `<p style="color:green">Không có cảnh báo nào.</p>`;
            }

        }, 500); // 500ms delay
    }

    // Chạy hàm render
    renderData();
});