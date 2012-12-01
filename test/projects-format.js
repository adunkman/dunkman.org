var expect = require("expect.js"),
    fs = require("fs"),
    projectDir = __dirname + "/../projects",
    they = it;

describe("projects", function () {
  they("are markdown files", function (done) {
    fs.readdir(projectDir, function (err, files) {
      if (err) return done(err);
      for (var i = files.length - 1; i >= 0; i--) {
        var file = files[i],
            parts = file.split("."),
            extension = parts[parts.length - 1];

        if (extension !== "md")
          return done(new Error(file + " is not .md"));
      };

      done();
    });
  });

  they("start with YAML front-matter", function (done) {
    fs.readdir(projectDir, function (err, files) {
      if (err) return done(err);
      var completed = [];

      for (var i = files.length - 1; i >= 0; i--) {
        var file = files[i];

        fs.readFile(projectDir + "/" + file, "utf-8", function (err, contents) {
          if (err) return done(err);
          var parts = contents.split("\n---\n");

          if (parts.length !== 2) {
            return done(new Error(file + " does not have YAML front-matter"));
          }
          else {
            completed.push(file);
            if (completed.length === files.length) return done();
          }
        });
      };
    });
  });
});