
function heuristic (currentNode,end) {
	var d1 = Math.abs (currentNode.row - end.row);
	var d2 = Math.abs (currentNode.col - end.col);
	return d1 + d2;
}

function removeElmFromArray(arr, elm) {
	// start at the end of the array
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
		node.neighbors.push(grid[col - 1][row])
	}
	if (col + 1 < maxCol) {
		node.neighbors.push(grid[col + 1][row])
	}
	if (row > 0) {
		node.neighbors.push(grid[col][row - 1])
	}
	if (row + 1 < maxRow) {
		node.neighbors.push(grid[col][row + 1])
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
		parents : null,
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

	var openSet = [];
	var closeSet = [];
	
	openSet.push(start);
	grid[start.row][start.col].gScore = 0;
	var success = false;
	// while openList is not empty
	while (openSet.length > 0) {
		var winningNode = 0;

		console.log(currentNode);

		for (var i = 0; i < currentNode.neighbors.length; i++) {
			currentNode.neighbors[i].g = currentNode.g + 1;
			currentNode.neighbors[i].h = heuristic(currentNode,newEnd)
			currentNode.neighbors[i].f = currentNode.neighbors[i].g + currentNode.neighbors[i].h;
			console.log(currentNode.neighbors[i].length)
			openSet.push(currentNode.neighbors[i]);
		}

		for (var i = 0; i < openSet.length; i++) {
			if(openSet[i].f < openSet[winningNode].f) { 
				winningNode = i; 
			}
		}

		currentNode = openSet[winningNode];

		if (currentNode.isEnd === true) {
			console.log('WINNER!');
			success = true;
			break;
		}


		removeElmFromArray(openSet,currentNode);
		closeSet.push(currentNode);
	}
	console.log(grid);
	return success;
}
