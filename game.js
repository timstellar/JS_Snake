class Game
{
    constructor(document, type, sizeX, sizeY, ctx, dot, width, height, populationSize = 0)
    {
        this.size           = populationSize;
        this.snakeLength    = 3
        if (!this.size)
        {
            this.snake      = new Snake(this.snakeLength, type, sizeX, sizeY);
        }
        else
        {
            this.snake      = [];
            this.alpha      = [];
            for (var i = 0; i < this.size; i++)
            {
                this.snake[i]       = new Snake(this.snakeLength, type, sizeX, sizeY);
                this.alpha[i]       = 0.1;
            }
        }
        this.genetic        = new Genetic(0.5);
        this.type           = type;
        this.sizeX          = sizeX;
        this.sizeY          = sizeY;
        this.width          = width;
        this.height         = height;
        this.ctx            = ctx;
        this.dot            = dot;
        this.cycle          = 1;
        this.deadLine       = Math.round((sizeX * sizeY)/((sizeX + sizeY)/10));
        this.cnt            = this.cycle + 1;
        this.life           = 0;
        this.generation     = 1;
        this.isRunning      = true;
        this.document       = document;
        this.update         = this.update.bind(this);
    }

    drawNN()
    {
        this.ctx.clearRect(0, 0, this.width, this.height);
        for (var j = 0; j < this.size; j++)
        {
            if (!this.snake[j].canMove)
                this.alpha[j] = 0;
            for (var i = 0; i < this.snake[j].length; i++)
            {
                this.ctx.fillStyle = "rgba(0, 240, 0, " + this.alpha[j] + ")";
                this.ctx.fillRect(this.snake[j].body[i].x * this.dot, this.snake[j].body[i].y * this.dot, dot, dot);
            }

            this.ctx.fillStyle = "rgba(0, 190, 0, " + this.alpha[j] + ")";
            this.ctx.fillRect(this.snake[j].body[0].x * this.dot, this.snake[j].body[0].y * this.dot, dot, dot);

            this.ctx.fillStyle = "rgba(240, 0, 0, " + this.alpha[j] + ")";
            this.ctx.fillRect(this.snake[j].food.x * this.dot, this.snake[j].food.y * this.dot, dot, dot);
        }
    }

    drawSingle()
    {
        this.ctx.clearRect(0, 0, this.width, this.height);
        
        for (var i = 0; i < this.snake.length; i++)
        {
            this.ctx.fillStyle = "#ffaa00";
            this.ctx.fillRect(this.snake.body[i].x * this.dot, this.snake.body[i].y * this.dot, dot, dot);
        }

        this.ctx.fillStyle = "#000";
        this.ctx.fillRect(this.snake.body[0].x * this.dot, this.snake.body[0].y * this.dot, dot, dot);

        this.ctx.fillStyle = "#ff0800";
        this.ctx.fillRect(this.snake.food.x * this.dot, this.snake.food.y * this.dot, dot, dot);
    }

    convert (str) 
    {
        switch (str)
        {
            case "Up":
                return 1;
            case "Down":
                return 2;
            case "Left":
                return 3;
            case "Right":
                return 4;
        }
    }

    newGeneration()
    {
        var kids = this.genetic.step(this.snake);
        for (var j = 0; j < this.size; j++)
        {
            this.snake[j].length = this.snakeLength;
            this.snake[j].food.genFood(this.snake[j].body);
            this.snake[j].network.weights = kids[j].weights;
            this.snake[j].start();
            this.snake[j].canMove = true;
            this.alpha[j] = 0.1;
        }
        this.life = 0;
        this.generation++
    }

    update ()
    {
        if (this.size)
        {
            this.drawNN();

            if (this.cnt > this.cycle)
            {
                var end = true;
                for (var j = 0; j < this.size; j++)
                {
                    if (this.snake[j].canMove)
                    {
                        this.snake[j].setDir(this.snake[j].network.run([this.snake[j].body[0].x, this.snake[j].body[0].y, this.snake[j].food.x, this.snake[j].food.y, this.convert(this.snake[j].dir)]));
                        this.snake[j].lifeTime++;
                        this.snake[j].lastStep = this.snake[j].dir;
                        end = false;
                    }
                }
                if (this.life > this.deadLine || end)
                {
                    this.newGeneration();
                    end = false;
                }
                else
                    this.life++;

                this.document.getElementById('steps').innerHTML = "Шаг: " + this.life;
                this.document.getElementById('generation').innerHTML = "Поколение: " + this.generation;

                this.cnt = 0;
            }
        }
        else
        {
            this.drawSingle();

            if (this.cnt > this.cycle)
            {
                this.snake.setDir();
                this.snake.moveSnake();
                this.snake.lastStep = this.snake.dir;
                if (this.snake.canMove)
                    this.document.getElementById('steps').innerHTML = "Съедено: " + (this.snake.length - this.snakeLength);
                else
                    this.document.getElementById('steps').innerHTML = "Вы проиграли. Перезапустите страницу.";

                this.cnt = 0;
            }
        }
        this.cnt++;
        requestAnimationFrame(this.update);
    }
}