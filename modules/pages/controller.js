const skillModel = require("./model");
const projectModel = require("./model");

const getAllData = async (request, response) => {
  let skillList = await skillModel.getSkills();
    if (!skillList.length) {
      await skillModel.initializeSkills(); 
      skillList = await skillModel.getSkills();
    }
  let projectList = await projectModel.getProjects();
    if (!projectList.length) {
      await projectModel.initializeProjects(); 
      projectList = await projectModel.getProjects();
    }

  response.render("index", { skills: skillList, projects: projectList });
};

const getSkills = async (request, response) => {

  let skillList = await skillModel.getSkills();
    if (!skillList.length) {
      await skillModel.initializeSkills(); 
      skillList = await skillModel.getSkills();
    }
  response.send(skillList);
};

const getProjects = async (request, response) => {

  let projectList = await projectModel.getProjects();
    if (!projectList.length) {
      await projectModel.initializeProjects(); 
      projectList = await projectModel.getProjects();
    }
  response.send(projectList);
};


module.exports = {
  getAllData,
  getSkills,
  getProjects
};