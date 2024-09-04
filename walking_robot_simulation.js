const robotSim = function (commands, obstacles) {
    function stringifyObstacle(x,y){
        return `${x}|${y}`;
    }

    let flatObstacles = obstacles.reduce(
        (acc, obstacle) => {
            acc.add(stringifyObstacle(obstacle[0], obstacle[1]));
            return acc;
        },
        new Set(),
    )

    class Direction {

        constructor(rightDelegate, leftDelegate, nextPointDelegate) {
            this.rightDelegate = rightDelegate
            this.leftDelegate = leftDelegate
            this.nextPointDelegate = nextPointDelegate;
        }

        move(units) {
            while (units > 0) {
                let nextPoint = this.nextPointDelegate()
                let stringed = stringifyObstacle(nextPoint.x, nextPoint.y)

                if (flatObstacles.has(stringed)) return;

                robot.updateCoords(nextPoint)

                units--
            }
        }

        static vertical(rightDelegate, leftDelegate, step) {
            return new Direction(
                rightDelegate,
                leftDelegate,
                () => {
                    return {
                        x: robot.x,
                        y: robot.y + step,
                    }
                },
            )
        }

        static horizontal(rightDelegate, leftDelegate, step) {
            return new Direction(
                rightDelegate,
                leftDelegate,
                () => {
                    return {
                        x: robot.x + step,
                        y: robot.y,
                    }
                },
            )
        }

        static north = Direction.vertical(
            () => Direction.east,
            () => Direction.west,
            1
        )

        static east = Direction.horizontal(
            () => Direction.south,
            () => Direction.north,
            1,
        )

        static south = Direction.vertical(
            () => Direction.west,
            () => Direction.east,
            -1,
        )

        static west = Direction.horizontal(
            () => Direction.north,
            () => Direction.south,
            -1,
        )
    }

    const robot = {
        x: 0,
        y: 0,
        currentDirection: Direction.north,
        maxDistance: 0,
        calculateDistanceFromOrigin() {
            return (this.x * this.x) + (this.y * this.y);
        },
        updateCoords(delta) {
            this.x = delta.x
            this.y = delta.y
        },
        processCommand(command) {
            switch (command) {
                case -2:
                    this.currentDirection = this.currentDirection.leftDelegate();
                    return;
                case -1:
                    this.currentDirection = this.currentDirection.rightDelegate();
                    return;
            }
            this.currentDirection.move(command)
            this.maxDistance = Math.max(this.maxDistance, this.calculateDistanceFromOrigin())
        },
    }


    for (const command of commands) {
        robot.processCommand(command);
    }

    return robot.maxDistance
};

console.log(robotSim([4, -1, 3], []))
console.log(robotSim([4, -1, 4, -2, 4], [[2, 4]]))
console.log(
    robotSim([1, 1, 3, 4, 3],
        [[-1, 5], [-4, -4], [-3, 3], [3, 0], [2, 5], [-4, 4], [-3, 1], [-2, -4], [-1, -4], [0, -3]]
    )
)
console.log(
    robotSim([-2, 3, -1, -2, 4],
    [[-2, 2], [4, -3], [2, 3], [-3, -2], [-2, -4], [0, -4], [2, 2], [3, -2], [2, -5], [2, 1]]
    )
)