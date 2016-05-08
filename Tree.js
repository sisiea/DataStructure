function Node(data){
	this.data = data;
	this.parent = null;
	this.children = [];
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

	/*traverseBF:  广度优先还没写*/

	contains:function(callback,traverse){
		traverse.call(this,callback);
	},

	add:function(data,toData,traverse){
		var child = new Node(data);
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
	},

	remove:function(data,fromData,traverse){
		var parent = null;
		var childToRemove = null;
		var index;

		var callback = function(node){
			if(node.data === fromData){
				parent = node;
			}
		}
		this.contains(callback,traverse);

		if (parent){
			index = findIndex(parent.children,data);
			if(index === undefined){
				console.log("node to remove does not exist");
			}
			else{
				childToRemove = parent.children.splice(index,1);
				console.log(childToRemove);
			}

		}
		else{
			console.log("parent not exist");
		}
		return childToRemove;
	}

}

// var tree = new Tree(1);
// tree.add(3,1,tree.traverseDF);
// tree.add(2,1,tree.traverseDF);
// tree.add(4,3,tree.traverseDF);
// tree.show(tree.traverseDF);
// console.log(tree.remove(3,1,tree.traverseDF));