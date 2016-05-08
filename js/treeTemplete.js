function Node(data,isAnswer){
	this.data = data;
	this.parent = null;
	this.children = [];
	if(isAnswer === undefined){
		this.isAnswer = false;
	}
	this.isAnswer = isAnswer;
}
function Tree(data){
	var node = new Node(data);
	this._root = node;
}

function findIndex(arr,data){
	var index ;
	for (var i = 0; i < arr.length; i++) {
        if (arr[i].data === data) {
            index = i;
        }
    }
 
    return index;

} 

Tree.prototype = {
	constructor:Tree,
	traverseDF:function(callback){
	(function traverse(currentNode){
		for(var i = 0;i < currentNode.children.length;i++){
			traverse(currentNode.children[i]);
		}

		callback(currentNode);
	
	})(this._root);

	},

	contains:function(callback,traverse){
		traverse.call(this,callback);
	},

	add:function(data,toData,isAnswer,traverse){
		var child = new Node(data,isAnswer);
		parent = null;
		callback = function (node){
			if(node.data === toData){
				parent = node;
			}
		}

		this.contains(callback,traverse);

		if(parent){
			parent.children.push(child);
			child.parent = parent;
		}
		else{
			console.log("can not add node to a non-existent parent");
		}
	},

	show:function(traverse){
		var dataArray = []
		callback = function(node){
			dataArray.push(node.data);
		}
		traverse.call(this,callback);
		console.log(dataArray);
	}
}