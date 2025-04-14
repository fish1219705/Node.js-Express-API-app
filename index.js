const express = require("express");
const path = require("path");
const sessions = require("express-session");

const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const { request } = require("https");

const app = express();
const port = process.env.PORT || "8888";

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(express.urlencoded({ extended: true })); 
app.use(express.json()); 

app.use(express.static(path.join(__dirname, "public")));

const adminRouter = require("./modules/admin/routes");
const pageRouter = require("./modules/pages/routes"); 

const { getSkills, getProjects } = require("./modules/pages/controller");

app.use(
  sessions({
    secret: process.env.SESSIONSECRET,
    name: "MyUniqueSessID",
    saveUninitialized: false,
    resave: false,
    cookie: {} 
  })
);

app.use("/", pageRouter); 
app.use("/admin", adminRouter);


//allow requests from all domains (need it to deploy API)
app.use(cors());

app.get("/api/skills", getSkills); 
app.get("/api/projects", getProjects); 



app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
});