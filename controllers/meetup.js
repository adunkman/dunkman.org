var meetup = module.exports = {};

meetup.events = function (req, res, next) {
   res.locals.events = [];
   next();
};