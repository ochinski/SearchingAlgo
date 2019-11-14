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

function removeElmFromArray(arr, elm) {
	for (let i = arr.length - 1; i >= 0 ; i--) {
		if (arr[i] === elm ) {
			arr.splice(i,1);
			break;
		}
	}
}

function createDijsktraNode (grid,row,col) {
	const newGrid = grid;
  const node = newGrid[row][col];
  const newNode = {
    ...node,
		dist : Infinity,
		parent : undefined,
		neighbors : [],
  };
  return newNode;
}

export default function dijkstra (newGrid, newStart) {
	var grid = newGrid;
	
	for (let x = 0; x < grid.length; x++ ) {
		for (let y = 0; y < grid[x].length; y++) {
			grid[x][y] = createDijsktraNode(grid,x,y);
		}
	}

	for (let x = 0; x < grid.length; x++ ) {
		for (let y = 0; y < grid[x].length; y++) {
			createNeighbors(grid,grid[x][y],grid.length, grid[x].length);
		}
	}

	var start = newStart;
	var currentNode = grid[start.row][start.col];
	var unVisited = [];
	var visited = [];
	var path = [];
	currentNode.dist = 0;
	unVisited.push(currentNode);

	while (unVisited.length > 0) {

		var shortestDist = 0;
		for (let i = 0; i < unVisited.length; i++) {
			if(unVisited[i].dist < unVisited[shortestDist].dist) { 
				shortestDist = i; 
			}
		}
		
		currentNode = unVisited[shortestDist];
		removeElmFromArray(unVisited,currentNode);
		visited.push(currentNode);

		for (let i = 0; i < currentNode.neighbors.length; i++) {
			if (!currentNode.neighbors[i].isWall) {
				if (!visited.includes(currentNode.neighbors[i])) {
					var newDist = currentNode.dist + 1;
						currentNode.neighbors[i].dist = newDist;
						unVisited.push(currentNode.neighbors[i]);
					}
					currentNode.neighbors[i].parent = currentNode;
				}
			// }
		}

		if (currentNode.isEnd === true) {
			var tmp = currentNode;
			path.push(tmp);
			while (tmp.parent) {
				path.push(tmp.parent);
				tmp = tmp.parent;
			}
			// allPaths[0] = path;
			break;
		}
	}
	return path;
}