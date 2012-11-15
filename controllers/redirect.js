var redirect = module.exports = function (newRoute) {
   return function (req, res, next) {
      return res.redirect(301, newRoute);
   };
};