var twitter = module.exports = {};

twitter.tweets = function (req, res, next) {
   res.locals.tweets = [];
   next();
};