const express = require("express");
const router = express.Router();

const { getAllData } = require("./controller");
const { getSkills } = require("./controller");
const { getProjects } = require("./controller");

router.get("/", getAllData);

router.get("/api/skills", getSkills);
router.get("/api/projects", getProjects);


module.exports = router;