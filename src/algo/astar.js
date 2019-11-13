

function removeElmFromArray(arr, elm) {
	for (let i = arr.length - 1; i >= 0 ; i--) {
		if (arr[i] === elm ) {
			arr.splice(i,1);
			break;
		}
	}
}

function heuristic (currentNode,end) {
	var d1 = Math.abs (currentNode.row - end.row);
	var d2 = Math.abs (currentNode.col - end.col);
	return d1 + d2;
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
	var closeSet = [];
	var allPaths = [];
	var path = [];
	var masterOpenSet = [];
	var masterClosedSet = [];
	allPaths.push(path);
	allPaths.push(masterOpenSet);
	allPaths.push(masterClosedSet);

	openSet.push(currentNode);
	masterOpenSet.push(openSet);
	// while openList is not empty
	while (openSet.length > 0) {
		
		var winningNode = 0;

		for (var i = 0; i < openSet.length; i++) {
			if(openSet[i].f < openSet[winningNode].f) { 
				winningNode = i; 
			}
		}
		currentNode = openSet[winningNode];

		removeElmFromArray(openSet,currentNode);
		// setTimeout(function(){
			grid[currentNode.row][currentNode.col].openSet = false;
			grid[currentNode.row][currentNode.col].closedSet = true;
		// }, 500);
		closeSet.push(currentNode);
		masterClosedSet.push(closeSet);
		// setTimeout(function(){
		for (var i = 0; i < currentNode.neighbors.length; i++) {
			if (!currentNode.neighbors[i].isWall) {
				if (!closeSet.includes(currentNode.neighbors[i])) {
					var tmpG = currentNode.g + 1;
					if (openSet.includes(currentNode.neighbors[i])) {
						if (tmpG < currentNode.neighbors[i].g) {
							currentNode.neighbors[i].g = tmpG;
						}
					} else {
						
							currentNode.neighbors[i].g = tmpG;
							currentNode.neighbors[i].openSet = true;
							openSet.push(currentNode.neighbors[i]);
							masterOpenSet.push(openSet);
						
					}
					currentNode.neighbors[i].h = heuristic(currentNode.neighbors[i],newEnd)
					currentNode.neighbors[i].f = currentNode.neighbors[i].g + currentNode.neighbors[i].h;
					currentNode.neighbors[i].parent = currentNode;
				}
			}
		}
	// }, 500);
		if (currentNode.isEnd === true) {
			var tmp = currentNode;
			path.push(tmp);
			while (tmp.parent) {
				path.push(tmp.parent);
				tmp = tmp.parent;
			}
			allPaths[0] = path;
			// for (let i = 0; i < openSet.length; i++) {
			// 	openSet[i].openSet = false;
			// 	openSet[i].closeSet = false;
			// }
			break;
		}
	}
	allPaths[1] = masterOpenSet;
	allPaths[2] = masterClosedSet;
	return allPaths;
}
