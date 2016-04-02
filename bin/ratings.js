#!/usr/bin/env node

var path = require('path')
var texttable = require('text-table')

try {
  var obj = require(path.join(process.cwd(), 'package.json'))
} catch (e) {
  return console.error('please run this inside of a directory containing a package.json file')
}

require('../npmsearch-local-ratings')(Object.keys(obj.dependencies), function done(e, r) {
  if (e) {
    return console.error(e.stack)
  }
  console.log(texttable(r))
})
