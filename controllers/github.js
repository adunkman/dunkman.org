var github = module.exports = {};

github.repos = function (req, res, next) {
   res.locals.repos = [];
   next();
};