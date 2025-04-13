const mongoose = require("mongoose");
const db = require("../../db"); 
const ObjectId = require('mongoose').Types.ObjectId;

const SkillSchema = new mongoose.Schema({
  name: String,
  category: String,
  description: String
}, { collection: "skills"});

const Skill = mongoose.model("Skill", SkillSchema);

async function getSkills() {
    await db.connect();
    return await Skill.find({}); //return array for find all
}

async function initializeSkills(){
    const initialSkill = [
    { name:"HTML",
      category:"Front-End",
      description: "The standard markup language used to create web pages"
    },
    {
      name:"CSS",
      category:"Front-End",
      description:"A style sheet language used to describe the presentation of a document written in HTML."
    },
    {
      name:"JavaScript",
      category:"Front-End",
      description:"A versatile programming language for creating dynamic and interactive web content."
    },
    {
      name:"ASP.NET",
      category:"Back-End",
      description:"A framework for building dynamic web applications using .NET."
    },
    {
      name:"SQL",
      category:"Tools",
      description:"Structured Query Language used for managing and manipulating relational databases."
    },
    {
      name:"Figma",
      category:"Tools",
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
  title:String,
  stack:String,
  description:String,
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
      title:"Passion Project",
      stack:"C#, asp.net",
      description:"healthy dessert management system",
      URL:"https://github.com/fish1219705/PassionProject"
    },
  
  ];
  await Project.insertMany(initialProject);
}

async function addProject(projectTitle, projectStack, projectURL, projectDescription) {
  await db.connect();
    let project = new Project({
    title: projectTitle,
    stack: projectStack,
    URL: projectURL,
    description: projectDescription,
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