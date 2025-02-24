const mongoose = require("mongoose");
const db = require("../../db"); 
const ObjectId = require('mongoose').Types.ObjectId;

const SkillSchema = new mongoose.Schema({
  name: String,
  category: String,
  description: String
} , { collection: "skills"});

const Skill = mongoose.model("Skill", SkillSchema);

async function getSkills() {
    await db.connect();
    return await Skill.find({}); //return array for find all
}

async function initializeSkills(){
    const initialSkill = [
    { name:"HTML",
      category:"Web Development",
      description: "The standard markup language used to create web pages"
    },
    {
      name:"CSS",
      category:"Web Development",
      description:"A style sheet language used to describe the presentation of a document written in HTML."
    },
    {
      name:"JavaScript",
      category:"Programming",
      description:"A versatile programming language for creating dynamic and interactive web content."
    },
    {
      name:"ASP.NET",
      category:"Backend Development",
      description:"A framework for building dynamic web applications using .NET."
    },
    {
      name:"SQL",
      category:"Database",
      description:"Structured Query Language used for managing and manipulating relational databases."
    },
    {
      name:"Figma",
      category:"UI/UX Design",
      description:"A cloud-based design tool for collaborative interface design, prototyping, and UI/UX workflows."
    }
  ];
    await Skill.insertMany(initialSkill);
}

async function addSkill(skillName, skillCategory, skillDescription) {
  await db.connect();
  let skill = new Skill({
  name: skillName,
  category: skillCategory,
  description: skillDescription,
  });
  let result = await skill.save();
  console.log(result) ;
  }


async function deleteSkill(id){
  await db.connect();
  let result = await Skill.findByIdAndDelete(id);
  console.log(result);
}
  

const ProjectSchema = new mongoose.Schema({
  name:String,
  language:String,
  URL:String
}, { collection: "projects"})

const Project = mongoose.model("Project", ProjectSchema);

async function getProjects(){
    await db.connect();
    let result = await Project.find({});
    return result;
}

async function initializeProjects(){
  const initialProject = [
    {
      name:"Passion Project",
      language:"C# asp.net",
      URL:"https://github.com/fish1219705/PassionProject"
    },
    {
      name:"CSS Animation",
      language:"html,css,javascript",
      URL:"https://fish1219705.github.io/cssProject/"
    }
  ];
    await Project.insertMany(initialProject);
}

async function addProject(projectName, projectLanguage, projectURL) {
  await db.connect();
  let project = new Project({
  name: projectName,
  language: projectLanguage,
  URL: projectURL,
  });
  let result = await project.save();
  console.log(result) ;
  }

async function deleteProject(id){
  await db.connect();
  let result = await Project.findByIdAndDelete(id);
  console.log(result);
}



module.exports = {
    getSkills,
    initializeSkills,
    addSkill,
    deleteSkill,
    getProjects,
    initializeProjects,
    addProject,
    deleteProject
 
}