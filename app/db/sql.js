var config = require('../config');
var db = require('./db');
var schema = config.schema;
module.exports = {
	queryAdmin : "select * from DASH110031.user where NAME = ?",
	queryAsset : "select asset.asset_id as asset_id,assetlist.assetlist_id as assetlist_id,asset.title as asset_title,(select team.name from DASH110031.team team where team.team_id =asset.team_id ) as team_name,(select industry.name from DASH110031.industry industry where industry.industry_id =asset.industry_id ) as industry_name,(select technology.technology_name from DASH110031.V_ASSET_TECHNOLOGY technology where technology.asset_id =asset.asset_id ) as technology_name,(select assettype.name from DASH110031.assettype assettype where assettype.assettype_id = assetlist.assettype_id ) as assettype_name,assetlist.name as assetlist_name,assetlist.description as assetlist_description,assetlist.url as assetlist_url,assetlist.serviceurl as assetlist_serviceurl from DASH110031.asset asset,DASH110031.assetlist assetlist where asset.asset_id = assetlist.asset_id",
	queryAssetByID : "select asset.asset_id as asset_id,assetlist.assetlist_id as assetlist_id,asset.title as asset_title,(select team.name from DASH110031.team team where team.team_id =asset.team_id ) as team_name,(select industry.name from DASH110031.industry industry where industry.industry_id =asset.industry_id ) as industry_name,(select technology.technology_name from DASH110031.V_ASSET_TECHNOLOGY technology where technology.asset_id =asset.asset_id ) as technology_name,(select assettype.name from DASH110031.assettype assettype where assettype.assettype_id = assetlist.assettype_id ) as assettype_name,assetlist.name as assetlist_name,assetlist.description as assetlist_description,assetlist.url as assetlist_url,assetlist.serviceurl as assetlist_serviceurl from DASH110031.asset asset,DASH110031.assetlist assetlist where asset.asset_id = assetlist.asset_id and assetlist.assetlist_id = ?",
	queryUser : "select * from DASH110031.user",
	insertUser : "insert into DASH110031.user(user_id,name,email,twitter) values((select nvl(max(user_id),0)+1 from DASH110031.user),?,?,?)",
	updateUser : "update DASH110031.user set name = ?,email=?,twitter=? where user_id = ?",
	deleteUser : "delete from DASH110031.user where user_id = ?",
	queryAssetType : "select * from DASH110031.assettype ",
	getIndustry : " select * from DASH110031.industry ",
	getTeam : "select * from DASH110031.team ",
	getTechnology : "select * from DASH110031.technology ",
	getAssetsByTechnology : "select asset.asset_id as asset_id,assetlist.assetlist_id as assetlist_id,asset.title as asset_title,(select team.name from DASH110031.team team where team.team_id =asset.team_id ) as team_name,(select industry.name from DASH110031.industry industry where industry.industry_id =asset.industry_id ) as industry_name,(select technology.technology_name from DASH110031.V_ASSET_TECHNOLOGY technology where technology.asset_id =asset.asset_id ) as technology_name,(select assettype.name from DASH110031.assettype assettype where assettype.assettype_id = assetlist.assettype_id ) as assettype_name,assetlist.name as assetlist_name,assetlist.description as assetlist_description,assetlist.url as assetlist_url,assetlist.serviceurl as assetlist_serviceurl from DASH110031.asset asset,DASH110031.assetlist assetlist where asset.asset_id = assetlist.asset_id and asset.asset_id in (select asset_id from DASH110031.M_ASSET_TECHNOLOGY MAT,DASH110031.TECHNOLOGY TEC where MAT.technology_id = TEC.technology_id and TEC.technology_id like ? and upper(TEC.name) like upper(?))",
	getAssetsByIndustry : "select asset.asset_id as asset_id,assetlist.assetlist_id as assetlist_id,asset.title as asset_title,(select team.name from DASH110031.team team where team.team_id =asset.team_id ) as team_name,(select industry.name from DASH110031.industry industry where industry.industry_id =asset.industry_id ) as industry_name,(select technology.technology_name from DASH110031.V_ASSET_TECHNOLOGY technology where technology.asset_id =asset.asset_id ) as technology_name,(select assettype.name from DASH110031.assettype assettype where assettype.assettype_id = assetlist.assettype_id ) as assettype_name,assetlist.name as assetlist_name,assetlist.description as assetlist_description,assetlist.url as assetlist_url,assetlist.serviceurl as assetlist_serviceurl from DASH110031.asset asset,DASH110031.assetlist assetlist where asset.asset_id = assetlist.asset_id and asset.industry_id in (select industry_id from industry ind where ind.industry_id like ? and upper(ind.name) like upper(?))"

}