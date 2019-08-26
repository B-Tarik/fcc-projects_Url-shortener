const Url = require('../models/url');

module.exports = function getUrl(req, res, next) {
  let {urlId} = req.params;
  
  // check if NaN
  if(isNaN(parseInt(urlId, 10))) return next(new Error("Wrong Format"))
  
  Url.findOne({urlId}, (err, data) => {
    if(err) return next(err);
    if(data) res.json({
            success: true,
            redirectUrl: data.url
        })
    else next(new Error('No url found')) 
  })
}