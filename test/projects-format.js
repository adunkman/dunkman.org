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
});