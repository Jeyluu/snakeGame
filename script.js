window.onload = function () {

        var canvasWidth = 900;
        var canvasHeight = 600;
        var blockSize = 30;
        var ctx;
        var delay = 100;
        var snakee;


        init();

        /* Créer la base du jeu */
        function init() {

                canvas = document.createElement('canvas');
                canvas.width = canvasWidth;
                canvas.height = canvasHeight;
                canvas.style.border = "1px solid #000";
                document.body.appendChild(canvas);
                ctx = canvas.getContext('2d');
                snakee = new Snake([[6,4],[5,4],[4,4]]);
                refreshCanvas();

        }

        /* Animation du rectangle */
        function refreshCanvas() {


                ctx.clearRect(0, 0, canvasWidth, canvasHeight);
                snakee.draw();
                snakee.advance();
                setTimeout(refreshCanvas, delay);
        }

        function drawBlock(ctx, position) {
                var x = position[0] * blockSize;
                var y = position[1] * blockSize;
                ctx.fillRect(x, y, blockSize, blockSize);

        }

        function Snake(body) {
                this.body = body;
                this.draw = function() {
                        ctx.save();
                        ctx.fillStyle = "#ff0000";
                        for(var i = 0; i < this.body.length; i++)
                        {
                                drawBlock(ctx, this.body[i])
                        }
                        ctx.restore();
                };
                /* Faire avancer le serpent */
                this.advance = function() {

                        var nextPosition = this.body[0].slice();
                        nextPosition[0] += 1;
                        this.body.unshift(nextPosition);
                        this.body.pop();
                };
        }

        

}