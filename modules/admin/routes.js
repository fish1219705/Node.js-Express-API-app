const express = require("express");
const router = express.Router();

const allData = require("../pages/model");

const adminController = require("./controller");

// login page
router.get("/login", adminController.loginForm);
router.post("/login", adminController.login);
router.get("/logout", adminController.logout);

function isAdminLoggedIn(req, res, next) {
    if (req.session && req.session.adminLoggedIn) {
      next();
    } else {
      res.redirect("/admin/login");
    }
  }

//ADMIN PAGES
// /admin/manage
router.get("/manage", isAdminLoggedIn, async (request, response) => {
    let skillList = await allData.getSkills();
    let projectList = await allData.getProjects();
    //render admin page
    response.render("admin/admin-manage", { title: "Administer", skills: skillList, projects: projectList});
});

// admin/manage/adds
router.get("/adds", isAdminLoggedIn, async (request, response) => {
    let skillList = await allData.getSkills();
    //render admin page
    response.render("admin/admin-adds", { title: "Add Skill", skills: skillList});
})

// admin/manage/adds
router.get("/addp", isAdminLoggedIn, async (request, response) => {
    let projectList = await allData.getProjects();
    //render admin page
    response.render("admin/admin-addp", { title: "Add Project", projects: projectList});
})

// /admin/manage/adds/submit
router.post("/adds/submit", isAdminLoggedIn, async (request, response) => {
    let newSkill = await allData.addSkill(request.body.name, request.body.category,request.body.description);
    console.log(newSkill);
    response.redirect("/admin/manage"); 
});

// /admin/manage/addp/submit
router.post("/addp/submit", isAdminLoggedIn, async (request, response) => {
    let newProject = await allData.addProject(request.body.title, request.body.stack,request.body.URL,request.body.description);
    console.log(newProject);
    response.redirect("/admin/manage"); 
});


// /admin/manage/deletes
router.get("/deletes", isAdminLoggedIn, async (request, response) => {
    console.log(request.query.skillId);
    let id = request.query.skillId;
    await allData.deleteSkill(id);
    response.redirect("/admin/manage");
})
// /admin/manage/deletep
router.get("/deletep", isAdminLoggedIn, async (request, response) => {
    console.log(request.query.projectId);
    let id = request.query.projectId;
    await allData.deleteProject(id);
    response.redirect("/admin/manage");
})


module.exports = router;