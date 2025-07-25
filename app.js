const express = require("express");
const path = require("path");

const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views")); // ensures views folder is found

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

let taskList = [];

app.get("/", (req, res) => {
    res.render("list", { tasks: taskList });
});

app.post("/", (req, res) => {
    const task = req.body.task?.trim();
    const priority = req.body.priority;
    if (task) {
        taskList.push({ text: task, priority });
    }
    res.redirect("/");
});

app.post("/delete", (req, res) => {
    const index = req.body.index;
    taskList.splice(index, 1);
    res.redirect("/");
});

app.post("/edit", (req, res) => {
    const index = req.body.index;
    const updated = req.body.updated?.trim();
    const priority = req.body.priority;
    if (updated) {
        taskList[index] = { text: updated, priority };
    }
    res.redirect("/");
});

app.get("/filter", (req, res) => {
    const f = req.query.filter;
    const filtered = f ? taskList.filter(t => t.priority === f) : taskList;
    res.render("list", { tasks: filtered });
});

app.listen(8000, () => {
    console.log("Server started on port 8000");
});
