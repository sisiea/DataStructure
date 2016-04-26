function BinarySearchTree(){
	this._root = null;
}

BinarySearchTree.prototype = {

	constructor:BinarySearchTree,
	add:function(value){
		var node ={
			value:value,
			left:null,
			right:null
		}

		var current;

		if(this._root === null){
			this._root = node;
		}
		else{
			current = this._root;
			while(true){
			if(value < current.value){
				if (current.left === null){
					current.left = node;
					break;
				}
				else{
					current = current.left;
				}
			}
			else if(value > current.value){
				if (current.right === null){
					current.right = node;
					break;
				}
				else{
					current = current.right;
				}
			}
			else{
				break;
			}
		}
		}
	},
	contains:function(value){
		var isExist = false , current = this._root;

	    while(current && !isExist){
	    	if(value < current.value){
	    		current = current.left;
	    	}
	    	else if(value > current.value){
	    		current = current.right;
	    	}
	    	else{
	    		isExist = true;
	    	}
	    }
	    return isExist;
	},

	traverseDLR : function(process){
		function inOrder(node){
			if(node){
				process.call(this,node);
				if(node.left !== null){
					inOrder(node.left);
				}

				if(node.right !== null){
					inOrder(node.right);
				}
			}
		}

		inOrder(this._root);
	},

	traverseLDR : function(process){
		function inOrder(node){
			if(node){
				if(node.left !== null){
					inOrder(node.left);
				}

				process.call(this,node);

				if(node.right !== null){
					inOrder(node.right);
				}
			}
		}

		inOrder(this._root);
	},

	traverseLRD : function(process){
		function inOrder(node){
			if(node){
				if(node.left !== null){
					inOrder(node.left);
				}

				if(node.right !== null){
					inOrder(node.right);
				}
				process.call(this,node);
			}
		}

		inOrder(this._root);
	},

	toArray: function(traverseWay){
		var result = [];
		if (traverseWay === 'DLR'){
			this.traverseDLR(function(node){
				result.push(node.value);
			})
		}
		else if(traverseWay === 'LDR'){
			this.traverseLDR(function(node){
				result.push(node.value);
			})
		}
		else if(traverseWay === 'LRD'){
			this.traverseLRD(function(node){
				result.push(node.value);
			})
		}
		return result;
	},

	toString: function(){
		return this.toArray().toString();
	},

	size: function(){
        var length = 0;

        this.traverseLDR(function(node){
            length++;
        });

        return length;
    },
}

var tree = new BinarySearchTree();

tree.add(5);
tree.add(3);
tree.add(7);
tree.add(1);
tree.add(4);
tree.add(6);
tree.add(10);
console.log(tree.toArray('DLR'));//[ 5, 3, 1, 4, 7, 6, 10 ]
console.log(tree.toArray('LDR'));//[ 1, 3, 4, 5, 6, 7, 10 ]
console.log(tree.toArray('LRD'));//[ 1, 4, 3, 6, 10, 7, 5 ]
