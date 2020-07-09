const utils = {
    randomizeMove: (choices) => {
        return choices[Math.floor(Math.random() * choices.length)]
    },
    getMoveCoords: ({ x, y }) => {
        return {
            right: { x: x + 1, y: y },
            left: { x: x - 1, y: y },
            up: { x: x, y: y + 1 },
            down: { x: x, y: y - 1 }
        }
    },
    isSafe: (gameBoard, moveCoord) => {
        // walls
        let height = gameBoard.height;
        let width = gameBoard.width;
        if (moveCoord.x < 0 || moveCoord.x >= width) return false;
        if (moveCoord.y < 0 || moveCoord.y >= height) return false;

        return true;
        // TODO: get the coordinates for the snake body, check if collision

    },
    getValidMoves: (gameBoard, { x, y }) => {
        let moves = utils.getMoveCoords({ x, y })

        // return only moves that are safe
        return Object.keys(moves).reduce((acc, move) => {
            if (utils.isSafe(gameBoard, moves[move])) acc[move] = moves[move];
            return acc;
        }, {});
    },
    chooseMove: (gameBoard, { x, y }) => {
        let validMoves = utils.getValidMoves(gameBoard, { x, y })

        // Move somewhere if we don't have a choice :(
        if (Object.keys(validMoves).length === 0) return utils.randomizeMove(['right', 'left', 'up', 'down'])

        return utils.randomizeMove(Object.keys(validMoves));
    }
}

module.exports = utils;
