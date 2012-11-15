var Project = require("../models/project"),
    fs = require("fs"),
    about = module.exports = {};

about.overview = function (req, res, next) {
   res.locals.projects = Object.create(projects.featured);
   next();
};

about.projects = function (req, res, next) {
   res.locals.projects = Object.create(projects);
   next();
};

var projects = (function () {
   var p = [],
       list = fs.readdirSync(__dirname + "/../projects");

   for (var i = list.length - 1; i >= 0; i--) {
      var item = list[i].replace(/\..+$/, ""),
          data = require("./../projects/" + item);
      data.slug = item;
      p.push(new Project(data));
   };

   return p;
})();

projects.featured = (function () {
   var featured = [];

   for (var i = projects.length - 1; i >= 0; i--) {
      var project = projects[i];
      if (project.featured) featured.push(project);
   };

   return featured;
})();