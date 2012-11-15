var render = module.exports = function (viewName) {
   return function (req, res, next) {
      return res.render(viewName);
   };
};