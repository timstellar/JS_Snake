var
    cnv             = document.getElementById('canvas');
    ctx             = cnv.getContext('2d');

    dot             = 10;

    width           = 500;
    height          = 500;

    gapsX           = Math.floor(width/dot);
    gapsY           = Math.floor(height/dot);

    isRunning       = false;
    isNNRunning     = false;

    populationSize  = 100;


document.getElementById('start').onclick    = start;
document.getElementById('boot').onclick     = run;

cnv.width   = width;
cnv.height  = height;

function start ()
{
    const game = new Game(document, "User", gapsX, gapsY, ctx, dot, width, height);
    document.getElementById('start').disabled   = true;
    document.getElementById('steps').classList.remove("d-none");
    document.getElementById('steps').classList.add("d-block");
    game.update();
}

function run ()
{
    const game = new Game(document, "NN", gapsX, gapsY, ctx, dot, width, height, populationSize);
    document.getElementById('boot').disabled   = true;
    document.getElementById('steps').innerHTML = "Шаг " + 0;
    document.getElementById('steps').classList.remove("d-none");
    document.getElementById('steps').classList.add("d-block");
    document.getElementById('generation').classList.remove("d-none");
    document.getElementById('generation').classList.add("d-block");
    game.update();
}
//переписать нейронку, чтобы ии создавалась внутри класса snake и каждая змея имела свои веса.