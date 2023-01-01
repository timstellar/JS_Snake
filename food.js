class Food
{
    constructor(sizeX, sizeY)
    {
        this.sizeX  = sizeX;
        this.sizeY  = sizeY;
    }

    genFood (snake)
    {
        this.x = Math.floor(Math.random() * this.sizeX);
        this.y = Math.floor(Math.random() * this.sizeY);
        for (var i = 0; i < snake.length; i++)
            if (snake[i].x == this.x && snake[i].y == this.y)
                this.genFood(snake);
    }
}