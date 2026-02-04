function togglePassword() {
  const passwordInput = document.querySelector('.pass');
  const toggleIcon = document.getElementById('toggleIcon');

  if (passwordInput.type === 'password') {
    passwordInput.type = 'text'; // hiện mật khẩu
    toggleIcon.classList.remove('fa-eye');
    toggleIcon.classList.add('fa-eye-slash'); // đổi icon thành mắt gạch
  } else {
    passwordInput.type = 'password'; // ẩn mật khẩu
    toggleIcon.classList.remove('fa-eye-slash');
    toggleIcon.classList.add('fa-eye'); // đổi icon lại thành mắt thường
  }
}