document.addEventListener('DOMContentLoaded', function() {
    
    // --- 1. LOGIC TOGGLE SIDEBAR ---
    const toggleBtn = document.getElementById('sidebar-toggle');
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('main-content');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            sidebar.classList.toggle('collapsed');
            mainContent.classList.toggle('collapsed');
        });
    }

    // --- 2. DỮ LIỆU MOCK (Cấu trúc mới cho bảng phân tích) ---
    const dbData = {
        student: { name: "Nguyễn Văn A", id: "SV001" },
        analysis: [
            { 
                subject: "Toán Cao Cấp A1", 
                gpa: 1.2, 
                status: "Nguy cơ cao", 
                statusType: "danger", // Để gán class màu đỏ
                suggestion: "Cần đạt <b>5.8</b> điểm cuối kỳ để qua môn." 
            },
            { 
                subject: "Lập Trình C++", 
                gpa: 1.8, 
                status: "Nguy cơ cao", 
                statusType: "danger", 
                suggestion: "Cần đạt <b>3.6</b> điểm cuối kỳ để qua môn." 
            },
            { 
                subject: "Kỹ Năng Mềm", 
                gpa: 3.5, 
                status: "Tốt", 
                statusType: "good", // Để gán class màu xanh
                suggestion: "Đã đủ điểm an toàn. Duy trì phong độ." 
            }
        ],
        systemAdvice: "Hiện tại bạn có 2 môn nằm trong vùng báo động đỏ. Ưu tiên ôn tập Toán Cao Cấp vì môn này 3 tín chỉ và điểm hệ số đang thấp nhất."
    };

    // --- 3. RENDER DATA ---
    function loadDashboard(data) {
        // User Info
        document.getElementById('user-name-display').textContent = `${data.student.name} - ${data.student.id}`;

        // Render Table
        const tableBody = document.getElementById('analysis-table-body');
        tableBody.innerHTML = '';

        data.analysis.forEach(item => {
            // Xác định màu sắc dựa trên statusType
            const gpaClass = item.statusType === 'danger' ? 'text-danger' : 'text-normal';
            const badgeClass = item.statusType === 'danger' ? 'badge-danger' : 'badge-good';

            const rowHTML = `
                <tr>
                    <td><span class="subject-name">${item.subject}</span></td>
                    <td><span class="gpa-score ${gpaClass}">${item.gpa}</span></td>
                    <td><span class="status-badge ${badgeClass}">${item.status}</span></td>
                    <td><span class="suggestion-text">${item.suggestion}</span></td>
                    <td style="text-align: right;">
                        <button class="btn-detail">Chi tiết</button>
                    </td>
                </tr>
            `;
            tableBody.innerHTML += rowHTML;
        });

        // Render System Advice
        document.getElementById('system-advice-text').textContent = data.systemAdvice;
    }

    // Run
    loadDashboard(dbData);
});

