class Network
{
    constructor (layers)
    {
        this.layers     = layers;
        this.weights    = [];
        this.params     = [];
        this.genWeights();
    }

    activation (x)
    {
        return 2 / (1 + Math.exp(-2 * x));
    }

    genWeights ()
    {
        for (var i = 0; i < this.layers.length - 1; i++)
        {
            this.weights[i] = [];
            for (var j = 0; j < this.layers[i+1]; j++)
            {
                this.weights[i][j] = [];
                for (var k = 0; k < this.layers[i]; k++)
                    this.weights[i][j][k] = Math.random() * 2 - 1;
            }
        }
    }

    calcParams (params)
    {
        for (var i = 0; i < this.layers.length; i++)
            this.params[i] = [];

        for (var i = 0; i < params.length; i++)
            this.params[0][i] = this.activation(params[i]);
        
        this.params[0][params.length] = 1;

        for (var i = 0; i < this.layers.length - 1; i++)
        {
            for (var j = 0; j < this.layers[i+1]; j++)
            {
                this.params[i+1][j] = 0;
                for (var k = 0; k < this.layers[i]; k++)
                {
                    this.params[i+1][j] += this.params[i][k] * this.weights[i][j][k];
                }
                this.params[i+1][j] = this.activation(this.params[i+1][j]);
                this.params[i][this.layers[i] - 1] = 1;
            }
        }
    }

    run (params)
    {
        this.calcParams(params);
        return this.params[this.layers.length - 1].indexOf(Math.max.apply(null, this.params[this.layers.length - 1])) + 1;
    }
}