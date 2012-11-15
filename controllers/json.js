var json = module.exports = function (propertyName) {
   return function (req, res, next) {
      return res.json(res.locals[propertyName]);
   };
};