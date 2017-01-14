

// var server = {
// 	findUser : function(req,res){

// 	},
// 	findAdmin : function(){
// 		res.send("this is admin:" + req.params.id);
// 	}
// };
// module.exports = server;

export.findAdmin = function(req,res){
	res.send("this is admin:" + req.params.id);
}


