class Snake
{
    constructor(length, type, sizeX, sizeY)
    {
        this.length         = length;
        this.type           = type;
        this.sizeX          = sizeX;
        this.sizeY          = sizeY;
        this.canMove        = true;
        this.body           = [];
        this.dir            = "Up";
        this.fitness        = 1;
        this.lifeTime       = 1;
        this.lastStep       = "Up";
        this.blocked        = false;

        this.food           = new Food(sizeX, sizeY);

        if (type == "NN" || type == "AI")
            this.network    = new Network([6, 10, 8, 4]);
        this.start();
    }

    start ()
    {
        for (var i = 0; i < this.length; i++)
        {
            this.body[i] = { x: Math.floor(this.sizeX/2), y: (Math.floor(this.sizeY/2)+i)};
        }
        this.food.genFood(this.body);
    }

    moveSnake ()
    {
        if (this.canMove)
        {
            for (var i = this.length; i > 0; i--)
            {
                this.body[i] = {x: this.body[i-1].x, y: this.body[i-1].y};
            }
            switch (this.dir)
            {
                case "Up":
                    if (this.lastStep != "Down")
                        this.body[0].y -= 1;
                    break;
                case "Down":
                    if (this.lastStep != "Up")
                        this.body[0].y += 1;
                    break;
                case "Left":
                    if (this.lastStep != "Right")
                        this.body[0].x -= 1;
                    break;
                case "Right":
                    if (this.lastStep != "Left")
                        this.body[0].x += 1;
                    break;
            }
            if (this.body[0].x == this.food.x && this.body[0].y == this.food.y)
            {
                this.food.genFood(this.body);
                this.length++;
            }
            this.checkColls();
        }
    }

    checkColls ()
    {
        if (this.canMove)
        {
            if (this.body[0].x > this.sizeX - 1 || this.body[0].x < 0 || this.body[0].y > this.sizeY - 1 || this.body[0].y < 0)
            {
                this.length     = this.snakeLength;
                this.canMove    = false;
                console.log('border');
            }
            for (var i = 1; i < this.length; i++)
                if (this.body[0].x == this.body[i].x && this.body[0].y == this.body[i].y)
                {
                    this.length     = this.snakeLength;
                    this.canMove    = false;
                    if (i < 4)
                        console.log("bug");
                    else
                        console.log('body');
                }
        }
    }

    setDir(key = 0)
    {
        if (!this.blocked)
        {
            if (key)
            {
                switch (key)
                {
                    case 1:
                        if (this.lastStep != "Down")
                            this.dir = "Up";
                        break;
                    case 2:
                        if (this.lastStep != "Up")
                            this.dir = "Down";
                        break;
                    case 3:
                        if (this.lastStep != "Right")
                            this.dir = "Left";
                        break;
                    case 4:
                        if (this.lastStep != "Left")
                            this.dir = "Right";
                        break;
                }
            }
            else
            {
                window.onkeydown = (e) => {
                    switch (e.keyCode)
                    {
                        case 87:
                            if (this.lastStep != "Down")
                                this.dir = "Up";
                            break;
                        case 83:
                            if (this.lastStep != "Up")
                                this.dir = "Down";
                            break;
                        case 65:
                            if (this.lastStep != "Right")
                                this.dir = "Left";
                            break;
                        case 68:
                            if (this.lastStep != "Left")
                                this.dir = "Right";
                            break;
                    }
                }
            }
            this.moveSnake();
        }
    }
}