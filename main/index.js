const express = require("express");
const morgan = require("morgan");
const hbs = require("express-handlebars");
const sql = require("mssql");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3001;


app.use(express.static(path.join(__dirname, "public")));
app.use(
  express.urlencoded({
    extended: true,
  }),
);
app.use(express.json());

app.use(morgan("combined"));

app.engine(
  "hbs",
  hbs.engine({
    extname: ".hbs",
  }),
);

const config = {
  user: "sa",
  password: "123456",
  server: "LAPTOP-VF4NE2PS",
  database: "TaiKhoanSV",
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
  // Cấu hình Pool ở đây
  pool: {
    max: 20, // Tối đa 10 kết nối đồng thời trong hồ
    min: 0, // Tối thiểu 0
    idleTimeoutMillis: 30000, // Tự động đóng kết nối nếu sau 30s không ai dùng
  },
};

// Tạo một biến Pool toàn cục để dùng chung cho cả app
let poolPromise = sql.connect(config);

// app.get("/", async (req, res) => {
//   try {
//     // Đợi pool sẵn sàng
//     const pool = await poolPromise;

//     // Dùng pool để thực hiện Query
//     const result = await pool.request().query("SELECT * FROM TaiKhoanSV");

//     res.render("home", {
//       students: result.recordset,
//     });
//   } catch (err) {
//     console.error("Lỗi Pool: ", err);
//     res.status(500).send("Lỗi hệ thống");
//   }
// });

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/login2", (req, res) => {
  res.render("login2");
});

app.post("/dashboard", async (req, res) => {
  const { username, password } = req.body;

  try {
    const pool = await poolPromise;

    const result = await pool
      .request()
      .input("username", sql.VarChar, username)
      .input("password", sql.VarChar, password)
      .query(
        "SELECT * FROM TaiKhoanSV WHERE MaSV = @username AND MatKhau = @password",
      );

    if (result.recordset.length > 0) {
      res.render("dashboard");
    } else {
      res.send(
        "<script>alert('Sai tài khoản hoặc mật khẩu!'); window.location='/login.hbs';</script>",
      );
    }
  } catch (err) {
    console.error("Lỗi truy vấn:", err);
    res.status(500).send("Lỗi hệ thống");
  }
});

app.get("/dashboard", (req, res) => {
  res.render("dashboard");
});

app.get("/profile", (req, res) => {
  res.render("profile");
});

app.get("/warning", (req, res) => {
  res.render("warning");
});

app.get("/lichhoc", (req, res) => {
  res.render("lichhoc");
});

app.get("/lichthi", (req, res) => {
  res.render("lichthi");
});

app.get("/ketqua", (req, res) => {
  res.render("ketqua");
});

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/search", (req, res) => {
  console.log(req.query);
  res.render("search");
});

// app.post("/hi", (req, res) => {
//   res.render("https://www.youtube.com/?app=desktop&hl=vi");
// });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

