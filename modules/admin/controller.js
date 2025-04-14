const { scryptSync } = require("crypto");
const adminUser = {
  username: process.env.ADMIN_USER,  // 例如 'admin'
  password: scryptSync(process.env.ADMIN_PASS, process.env.SALT, 64).toString("base64")
};

const loginForm = (req, res) => {
  res.render("admin/login");  // 你要自己做一個 login.pug
};

const login = (req, res) => {
  const { u, pw } = req.body;
  const key = scryptSync(pw, process.env.SALT, 64).toString("base64");

  if (u === adminUser.username && key === adminUser.password) {
    req.session.adminLoggedIn = true;
    req.session.adminUser = u;
    res.redirect("/admin/manage");
  } else {
    res.render("admin/login", { err: "Invalid admin credentials." });
  }
};

const logout = (req, res) => {
  req.session.destroy();
  res.redirect("/admin/login");
};

module.exports = {
  loginForm,
  login,
  logout
};
