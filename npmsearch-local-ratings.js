var request = require('request')


module.exports = computeRatings

function computeRatings(deps, done) {
  var query = deps.map(function(id) {
    return '_id:' + id
  }).join('+')

  request('http://npmsearch.com/query/?q=' + query + '&fields=name,rating', {
    json: true
  }, function(e, r, body) {

    if (e) {
      return done(e)
    }

    if (!body || !body.results) {
      return done(new Error('no response body'))
    }

    var sorted = body.results.map(function(result) {
      return [result.name[0], result.rating[0]]
    }).sort(function(a, b) {
      return a[1] - b[1]
    })

    done(null, sorted)
  })
}
