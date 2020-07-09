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
    isSafe: (gameState, moveCoord) => {
        // walls
        let height = gameState.height;
        let width = gameState.width;
        if (moveCoord.x < 0 || moveCoord.x > width) return false;
        if (moveCoord.y < 0 || moveCoord.y > height) return false;

        // TODO: get the coordinates for the snake body, check if collision

    },
    getValidMoves: (gameState, { x, y }) => {
        let moves = getMoveCoords({ x, y })

        // return only moves that are safe
        return Object.keys(moves).reduce((acc, move) => {
            if (isSafe(gameState, moves[move])) acc[move] = moves[move];
            return acc;
        }, {});
    },
    chooseMove: (gameState, { x, y }) => {
        let validMoves = getValidMoves(gameState, { x, y })

        // Move somewhere if we don't have a choice :(
        if (Object.keys(validMoves).length === 0) return randomizeMove(['right', 'left', 'up', 'down'])

        return randomizeMove(Object.keys(validMoves));
    }
}

module.exports = utils;
