const DIRECTIONS = {
    right: { x: 1, y: 0 },
    left: { x: -1, y: 0 },
    up: { x: 0, y: 1 },
    down: { x: 0, y: -1 }
}

const utils = {
    randomizeMove: (choices) => {
        return choices[Math.floor(Math.random() * choices.length)];
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
        // check for walls
        let height = gameBoard.height;
        let width = gameBoard.width;
        if (moveCoord.x < 0 || moveCoord.x >= width) return false;
        if (moveCoord.y < 0 || moveCoord.y >= height) return false;

        // check for snakes
        // TODO: eventually we may want to make a different decision based on running into the head of a snake
        let empty = true;
        let snakes = gameBoard.snakes;
        empty = snakes.every((snake) => {
            return snake.body.every((coord) => {
                return (coord.x !== moveCoord.x) || (coord.y !== moveCoord.y);
            });
        });
        return empty;
    },
    getValidMoves: (gameBoard, { x, y }) => {
        let moves = utils.getMoveCoords({ x, y })

        // return only moves that are safe
        return Object.keys(moves).reduce((acc, move) => {
            if (utils.isSafe(gameBoard, moves[move])) acc[move] = moves[move];
            return acc;
        }, {});
    },
    idleMove: (me, { x, y }, validMoves) => {
        // Move the snake in an idle pattern (move to wall or until unsafe, turn)

        // Check what direction we are moving
        let { x: bodyX, y: bodyY } = me.body[1];
        let currDir = { x: x - bodyX, y: y - bodyY };

        let direction;
        for (var dir in DIRECTIONS) { //TODO: I'm not super happy with this
            if (currDir.x === DIRECTIONS[dir].x && currDir.y === DIRECTIONS[dir].y) {
                direction = dir;
                break;
            }
        }

        // Check if it is valid to continue that direction
        if (Object.keys(validMoves).includes(direction)) return direction;

        // Otherwise, pick a random valid direction
        return utils.randomizeMove(Object.keys(validMoves));
    },
    chooseMove: (gameBoard, me) => {
        // TODO: chooseMove will eventually decide which type of move to make
        let head = me.head;
        let validMoves = utils.getValidMoves(gameBoard, head);

        // Move somewhere if we don't have a choice :(
        if (Object.keys(validMoves).length === 0) return utils.randomizeMove(['right', 'left', 'up', 'down']);

        return utils.idleMove(me, head, validMoves);
    }
}

module.exports = utils;
