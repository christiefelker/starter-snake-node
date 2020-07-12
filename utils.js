const DIRECTIONS = {
    right: { x: 1, y: 0 },
    left: { x: -1, y: 0 },
    up: { x: 0, y: 1 },
    down: { x: 0, y: -1 }
}

const utils = {
    randomize: (choices) => {
        return choices[Math.floor(Math.random() * choices.length)];
    },
    trapped: () => {
        return utils.randomize(['right', 'left', 'up', 'down']);
    },
    isMoveSafe: (gameBoard, move) => {
        // check for walls
        let height = gameBoard.height;
        let width = gameBoard.width;
        if (move.x < 0 || move.x >= width) return false;
        if (move.y < 0 || move.y >= height) return false;

        // check for snakes
        // TODO: eventually we may want to make a different decision based on running into the head of a snake
        let empty = true;
        let snakes = gameBoard.snakes;
        empty = snakes.every((snake) => {
            return snake.body.every((coord) => {
                return (coord.x !== move.x) || (coord.y !== move.y);
            });
        });
        return empty;
    },
    getDirection: (oldCoord, newCoord) => {
        let coordChange = { x: newCoord.x - oldCoord.x, y: newCoord.y - oldCoord.y };

        let direction;
        for (var dir in DIRECTIONS) {
            if (coordChange.x === DIRECTIONS[dir].x && coordChange.y === DIRECTIONS[dir].y) {
                direction = dir;
                break;
            }
        }
        return direction;
    },
    getAllMoves: ({ x, y }) => {
        return [{ x: x + 1, y: y }, { x: x - 1, y: y }, { x: x, y: y + 1 }, { x: x, y: y - 1 }]
    },
    getForwardMove: (me) => {
        let head = me.head
        let { x: bodyX, y: bodyY } = me.body[1];
        let coordChange = { x: head.x - bodyX, y: head.y - bodyY };
        return { x: head.x + coordChange.x, y: head.y + coordChange.y };
    },
    getValidMoves: (gameBoard, { x, y }) => {
        let moves = utils.getAllMoves({ x, y })

        // return only moves that are safe
        return moves.reduce((acc, move) => {
            if (utils.isMoveSafe(gameBoard, move)) acc.push(move);
            return acc;
        }, []);
    },
    idleMove: (gameBoard, me, validMoves) => {
        // Move the forward until it is unsafe to do so, then turn
        let forwardMove = utils.getForwardMove(me)
        if (utils.isMoveSafe(gameBoard, forwardMove)) return forwardMove;
        return utils.randomize(validMoves);
    },
    chooseMove: (gameBoard, me) => {
        let validMoves = utils.getValidMoves(gameBoard, me.head);

        // Move somewhere if we don't have a choice :(
        if (validMoves.length === 0) return utils.trapped();

        let move = utils.idleMove(gameBoard, me, validMoves); //TODO: make a better decision about type of move
        return utils.getDirection(me.head, move);
    }
}

module.exports = utils;
