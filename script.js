import { Cell, CellBuilder, Grid, GridBuilder } from './classes.js'

// const color1 = '#FF7F50'
// const color2 = "#FFE4C4"
// const baseSize = 16
// const squareSize = baseSize * 12


window.onload = function() {

    const root = document.querySelector("#root");
    const gridBuilder = new GridBuilder();
    const grid = gridBuilder.setElement(root).setGridPaddings().setGridTemplate().setGridMatrix().build();

    const animateTime = 4000;
    const baseTime = Date.now();



    function animate() {
        //throttle
        const timestamp = Date.now();
        console.log((timestamp - baseTime) % animateTime)
        if(((timestamp - baseTime) % animateTime) < 50) {
            // update(gridMatrix)
            grid.updateGrid()
        }
        requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
}









function update(grid) {

    grid.forEach((row, rowIndex) => {
        row.forEach((cell, cellIndex) => {
            const prevCellState = cell.cellState;
            let neiboursStatesSum = 0;

            for(let i = -1; i <= 1; i++) {
                for(j =- 1; j<= 1; j++) {

                    if(j==0 && i==0) {
                        continue;
                    }

                    let neibourX = cellIndex + j
                    let neibourY = rowIndex + i

                    if(grid[neibourY] && grid[neibourY][neibourX]) {
                        neiboursStatesSum += grid[neibourY][neibourX].cellState;
                        continue;
                    }

                    neiboursStatesSum += getRandomState()
                }
            }

            if(prevCellState) {
                grid[rowIndex][cellIndex].setState((neiboursStatesSum == 2 || neiboursStatesSum == 3) ? 1 : 0)
            }

            if(!prevCellState) {
                grid[rowIndex][cellIndex].setState((neiboursStatesSum == 3) ? 1 : 0);

            }

            const updatedCellState = grid[rowIndex][cellIndex].cellState;

            if(updatedCellState && !prevCellState) {
                grid[rowIndex][cellIndex].appear();
            }

            if(!updatedCellState && prevCellState) {
                grid[rowIndex][cellIndex].disappear()
            }

        })
    })
}

