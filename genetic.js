class Genetic
{
    constructor (mutate) {
        this.mutate = mutate;
    }

    step (snakes)
    {
        return this.mutation(this.crossover(this.fitness(snakes), snakes));
    }

    fitness (snakes)
    {
        var bestOfThree = [];
        bestOfThree[0] = bestOfThree[1] = bestOfThree[2] = [0, snakes[0].lifeTime, snakes[0].length];
        for (var i = 0; i < snakes.length; i++)
        {
            if (((bestOfThree[0][1] < snakes[i].lifeTime) && (bestOfThree[0][2] < snakes[i].length)) || (bestOfThree[0][2] < snakes[i].length))
            {
                bestOfThree[2] = bestOfThree[1];
                bestOfThree[1] = bestOfThree[0];
                bestOfThree[0] = [i, snakes[i].lifeTime, snakes[i].length];
            }
        }
        return [snakes[bestOfThree[0][0]], snakes[bestOfThree[1][0]], snakes[bestOfThree[2][0]]];
    }

    crossover (fitness, snakes)
    {
        var kids = [];
        for (var i = 0; i < snakes.length; i++)
        {
            kids[i] = [];
            kids[i].weights = fitness[Math.round(Math.random() * 2)].network.weights;
            var layers  = snakes[i].network.weights.length;
            for (var j = 0; j < layers; j++)
            {  
                var inputs  = snakes[i].network.weights[j].length;
                for (var k = 0; k < inputs; k++)
                {
                    var outputs = snakes[i].network.weights[j][k].length;
                    for (var n = 0; n < outputs; n++)
                    {
                        if (k < Math.floor(inputs/2) && n < Math.floor(outputs/2) || Math.random() > 0.5)
                            kids[i].weights[j][k][n] = snakes[i].network.weights[j][k][n];
                        else
                            continue;
                    }
                }
            }
        }
        return kids;
    }

    mutation (kids)
    {
        for (var i = 0; i < kids.length; i++)
        {
            var layers  = kids[i].weights.length;
            for (var j = 0; j < layers; j++)
            {  
                var inputs  = kids[i].weights[j].length;
                for (var k = 0; k < inputs; k++)
                {
                    var outputs = kids[i].weights[j][k].length;
                    for (var n = 0; n < outputs; n++)
                    {
                        if (Math.random() < this.mutate)
                            kids[i].weights[j][k][n] = Math.random() * 2 - 1;
                    }
                }
            }
        }
        return kids;
    }
}