
function heuristic (currentNode,end) {
	var d1 = Math.abs (currentNode.row - end.row);
	var d2 = Math.abs (currentNode.col - end.col);
	return d1 + d2;
}

function removeElmFromArray(arr, elm) {
	for (let i = arr.length - 1; i >= 0 ; i--) {
		if (arr[i] === elm ) {
			arr.splice(i,1);
			break;
		}
	}
}

function createNeighbors (grid,node,maxRow, maxCol) {
	var row = node.row;
	var col = node.col;
	if (col > 0) {
		node.neighbors.push(grid[row][col - 1])
	}
	if (col + 1 < maxCol) {
		node.neighbors.push(grid[row][col + 1])
	}
	if (row > 0) {
		node.neighbors.push(grid[row - 1][col])
	}
	if (row + 1 < maxRow) {
		node.neighbors.push(grid[row + 1][col])
	}
}

function createAStarNode (grid,row,col,end) {
	const newGrid = grid;
  const node = newGrid[row][col];
  const newNode = {
    ...node,
		f : Infinity,
		g : Infinity,
		h : Infinity,
		parent : undefined,
		neighbors : [],
  };
  return newNode;
}
export default function AStart (newGrid,newStart,newEnd) {

	var grid = newGrid;
	
	// add fscore, gscore hscore and neighbours
	for (let x = 0; x < grid.length; x++ ) {
		for (let y = 0; y < grid[x].length; y++) {
			grid[x][y] = createAStarNode(newGrid,x,y,newEnd);
		}
	}

	for (let x = 0; x < grid.length; x++ ) {
		for (let y = 0; y < grid[x].length; y++) {
			createNeighbors(grid,grid[x][y],grid.length, grid[x].length);
		}
	}

	var start = newStart;
	grid[start.row][start.col].f = 0;
	grid[start.row][start.col].g = 0;
	grid[start.row][start.col].h = 0;
	var currentNode = grid[start.row][start.col];

	var openSet = new Array();
	// var openSet = []; somehow had content in it
	var closeSet = [];
	var path = [];
	openSet.push(currentNode);

	// while openList is not empty
	while (openSet.length > 0) {
		var winningNode = 0;

		for (var i = 0; i < openSet.length; i++) {
			if(openSet[i].f < openSet[winningNode].f) { 
				winningNode = i; 
			}
		}
		currentNode = openSet[winningNode];
		// console.log(currentNode);


		// console.log(openSet);
		removeElmFromArray(openSet,currentNode);
		// console.log('after', openSet);

		closeSet.push(currentNode);

		for (var i = 0; i < currentNode.neighbors.length; i++) {
			if (!closeSet.includes(currentNode.neighbors[i])) {
				var tmpG = currentNode.g + 1;
				if (openSet.includes(currentNode.neighbors[i])) {
					if (tmpG < currentNode.neighbors[i].g) {
						currentNode.neighbors[i].g = tmpG;
					}
				} else {
					currentNode.neighbors[i].g = tmpG;
					openSet.push(currentNode.neighbors[i]);
				}
				currentNode.neighbors[i].h = heuristic(currentNode.neighbors[i],newEnd)
				currentNode.neighbors[i].f = currentNode.neighbors[i].g + currentNode.neighbors[i].h;
				currentNode.neighbors[i].parent = currentNode;
			}
		}
		if (currentNode.isEnd === true) {
			// console.log('WINNER!');
			var tmp = currentNode;
			path.push(tmp);
			while (tmp.parent) {
				path.push(tmp.parent);
				tmp = tmp.parent;
			}
			break;
		}
	}
	return path;
}
