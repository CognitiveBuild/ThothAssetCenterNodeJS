var config = require('../config');
var db = require('./db');
var schema = config.schema;
module.exports = {
	queryAdmin : "select * from DASH110031.user where NAME = ?",
	queryAsset : "",
	queryAssetByID : ""
}