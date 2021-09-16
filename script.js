window.onload = function () {

        var canvasWidth = 900;
        var canvasHeight = 600;
        var blockSize = 30;
        var ctx;
        var delay = 100;
        var snakee;
        var applee;
        var widthInBlocks = canvasWidth/blockSize;
        var heightInBlocks = canvasHeight/blockSize;

        init();

        /* Créer la base du jeu */
        function init() {

                canvas = document.createElement('canvas');
                canvas.width = canvasWidth;
                canvas.height = canvasHeight;
                canvas.style.border = "1px solid #000";
                document.body.appendChild(canvas);
                ctx = canvas.getContext('2d');
                snakee = new Snake([
                        [6, 4],
                        [5, 4],
                        [4, 4],
                        [3, 4],
                        [2, 4]
                ], "right");
                applee = new Apple([10, 10]); /* Les chiffres définissent la position de la pomme en X et Y */
                refreshCanvas();

        }

        /* Animation du rectangle */
        function refreshCanvas() {


                snakee.advance();

                if(snakee.checkCollision()) {
                        /* GAMEOVER */

                }else {
                        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
                snakee.draw();
                applee.draw();
                setTimeout(refreshCanvas, delay);
                }
                
        }

        function drawBlock(ctx, position) {
                var x = position[0] * blockSize;
                var y = position[1] * blockSize;
                ctx.fillRect(x, y, blockSize, blockSize);

        }

        function Snake(body, direction) {
                this.body = body;
                this.direction = direction;
                this.draw = function () {
                        ctx.save();
                        ctx.fillStyle = "#ff0000";
                        for (var i = 0; i < this.body.length; i++) {
                                drawBlock(ctx, this.body[i])
                        }
                        ctx.restore();
                };
                /* Faire avancer le serpent et le diriger avec le switch case*/
                this.advance = function () {

                        var nextPosition = this.body[0].slice();
                        switch (this.direction) {
                                case "left":
                                        nextPosition[0] -= 1;
                                        break;
                                case "right":
                                        nextPosition[0] += 1;
                                        break;
                                case "down":
                                        nextPosition[1] += 1;
                                        break;
                                case "up":
                                        nextPosition[1] -= 1;
                                        break;
                                default:
                                        throw ("invalid Direction");
                        }
                        this.body.unshift(nextPosition);
                        this.body.pop();
                };

                this.setDirection = function (newDirection) {
                        var allowedDirection;

                        switch (this.direction) {
                                case "left":
                                case "right":
                                        allowedDirection = ["up", "down"];
                                        break;
                                case "down":
                                case "up":
                                        allowedDirection = ["left", "right"];
                                        break;
                                default:
                                        throw ("invalid Direction")
                        }
                        if (allowedDirection.indexOf(newDirection) > -1) {
                                this.direction = newDirection;
                        }
                };
                
                /* Paramétrage du mur et du passage sur son propre corps du serpent */
                
                this.checkCollision = function(){

                        var wallCollision = false;
                        var snakeCollision = false;
                        var head = this.body[0];
                        var rest = this.body.slice(1);
                        var snakeX = head[0];
                        var snakeY = head[1];
                        /* On détermine les limites de déplacement du serpent au cadre dessiné */
                        var minX = 0;
                        var minY = 0;
                        var maxX = widthInBlocks - 1;
                        var maxY = widthInBlocks - 1;
                        var isNotBetweenHorizontalWalls = snakeX < minX || snakeX > maxX;
                        var isNotBetweenVerticalWalls = snakeY < minY || snakeY > maxY;

                        if(isNotBetweenHorizontalWalls || isNotBetweenVerticalWalls)
                        {
                                wallCollision = true;
                        }

                        for(var i = 0; i < rest.length ; i++)
                        {
                                if(snakeX === rest[i][0] && snakeY === rest[i][1])
                                {
                                        snakeCollision = true;
                                }
                        }
                        return wallCollision || snakeCollision;
                }

                        
                        

                        
                

        };

        function Apple(position) {
                this.position = position;
                this.draw = function () /* On dessine la pomme */ {
                        ctx.save(); /* Le save sert à enregistrer les anciennes configurations (serpent) */
                        ctx.fillStyle = "#33cc33";
                        ctx.beginPath();
                        var radius = blockSize / 2 /* on défini la taille de la pomme */
                        var x = position[0] * blockSize + radius;
                        var y = position[1] * blockSize + radius;
                        ctx.arc(x, y, radius, 0, Math.PI * 2, true) /* C'est avec cette ligne qu'on dessine la pomme */
                        ctx.fill();
                        ctx.restore(); /* sert à remettre les configurations enregistrées avec le Save */
                }
        }

        document.onkeydown = function handleKeyDown(e) {

                var key = e.keyCode;
                console.log(key);
                var newDirection;

                switch (key) {
                        case 37:
                                newDirection = "left";
                                break;
                        case 38:
                                newDirection = "up";
                                break;
                        case 39:
                                newDirection = "right";
                                break;
                        case 40:
                                newDirection = "down";
                                break;
                        default:
                                return;
                }

                snakee.setDirection(newDirection);

        }
}