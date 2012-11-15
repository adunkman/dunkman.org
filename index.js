var socketio = require("socket.io"),
    express = require("express"),
    app = express(),
    c = require("./controllers"),
    env = process.env.NODE_ENV || "development",
    port = process.env.PORT || 8080;

if (env === "production") {

}
else {
   app.use(express.logger("dev"));
   app.use(express.static(__dirname + "/public"));
}

app.set("view engine", "jade");
//app.use(require("connect-assets")());

app.get("/", c.about.overview, c.render("about/overview"));
app.get("/about", c.render("about/myself"));
app.get("/projects", c.about.projects, c.render("projects/list"));

app.get("/repos", c.github.repos, c.json("repos"));
app.get("/tweets", c.twitter.tweets, c.json("tweets"));
app.get("/meetups", c.meetup.events, c.json("events"));

app.listen(port, function () {
   console.log("Express application booted, listening at %s.", port);
});