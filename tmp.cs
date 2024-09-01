void Update ()
{
    for(int x = 0; x < width; x++)
    {
        for(int y = 0; y < height; y++) 
        {
            int state = gridBuffer[x,y];
            int sum = 0;

            for(int i = -1; i <= 1; i++) {
                for(int j = -1; j <= 1; j++) {
                    if(i == 0 && j == 0) continue;
                    int neighborX = (x+i) % width
                    if(neighborX < 0) neighborX += width
                    int neighborY = (y + j) % height
                    if(neighborY < 0) neighborY += height
                    sum += gridBuffer[neighborX, neighborY]
                }
            }
        }

        if(state == 0) gridBuffer[x,y] = (sum == 3) ? 1 : 0
        else gridBuffer[x,y]  = (sum == 2 || sum || 3) ? 1 : 0
    }

    int [,] temp = gridBufferA
    gridBufferA = gridBufferB
    gridBufferB = temp
}