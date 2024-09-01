const color1 = '#FF7F50'
const color2 = "#FFE4C4"
const baseSize = 16
const squareSize = baseSize * 12
// const squareSize = baseSize * 3


window.onload = function() {

    const root = document.querySelector("#root")
    const {rows:rowsAmount, cols:colsAmount} = setGridParameters(root, squareSize)
    const gridMatrix = getGrid(root, rowsAmount, colsAmount)

    // let rrr = setInterval(() => {
        
    //     update(gridMatrix)
        
    // },4000)

    const animateTime = 4000;
    const baseTime = Date.now();



    function animate() {
        //throttle
        const timestamp = Date.now();
        console.log((timestamp - baseTime) % animateTime)
        if(((timestamp - baseTime) % animateTime) < 50) {
            update(gridMatrix)
        }
        requestAnimationFrame(animate);
    }
    // requestAnimationFrame(animate);
}







function getGrid(root, rowsAmount, colsAmount) {
    const grid = [];

    for(let j = 0; j < rowsAmount; j++) {
        const row = []
        for(let i = 0; i < colsAmount; i++) {
            const state = getRandomState()


            const div = document.createElement("div")
            div.classList.add("block")
            div.cellState = state;
            div.innerHTML = getSVG(squareSize);
            div.firstElementChild.style.opacity = state ? '1' : '0'
            // console.log(div.innerHTML)
            // div.innerHTML.style.opacity = state ? '1' : '0'

            // div.style.backgroundColor = state ? color1 : color2;
            div.style.display = 'flex';
            div.style.justifyContent = 'center';
            div.style.alignItems = 'center';
            root.appendChild(div);

            row.push(div);
        } 
        grid.push(row)
    }

    return grid;
}


function setGridParameters(root, squareSize = 16 * 8) {


    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    const cols = Math.floor(screenWidth / squareSize);
    const rows = Math.floor(screenHeight / squareSize);

    if(screenWidth > cols * squareSize) {
        const sideHorizontalPadding = (screenWidth - (cols * squareSize)) / 2;
        root.style.paddingLeft = sideHorizontalPadding + 'px'
        root.style.paddingRight = sideHorizontalPadding + 'px'
    }
    if(screenHeight > rows * squareSize) {
        const sideVerticalPadding = (screenHeight - (rows * squareSize)) / 2;
        root.style.paddingTop = sideVerticalPadding + 'px'
        root.style.paddingBottom = sideVerticalPadding + 'px'
    }

    root.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
    root.style.gridTemplateRows = `repeat(${rows}, 1fr)`;

    return {cols,rows}
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
                grid[rowIndex][cellIndex].cellState = (neiboursStatesSum == 2 || neiboursStatesSum == 3 ? 1 : 0)
            }

            if(!prevCellState) {
                grid[rowIndex][cellIndex].cellState = (neiboursStatesSum == 3 ? 1 : 0)

            }

            const updatedCellState = grid[rowIndex][cellIndex].cellState;

            if(updatedCellState && !prevCellState) {
                // grid[rowIndex][cellIndex].innerHTML = getSVG(squareSize)
                grid[rowIndex][cellIndex].style.animation = 'ball_appear 1.5s forwards'
            }

            if(!updatedCellState && prevCellState) {
                grid[rowIndex][cellIndex].style.animation = 'ball_disappear 1.5s forwards'

                // grid[rowIndex][cellIndex].innerHTML = ''
            }
            // if(!updatedCellState && !prevCellState) {
            //     grid[rowIndex][cellIndex].innerHTML = getSVG(squareSize)
            // }

            // grid[rowIndex][cellIndex].style.animation = grid[rowIndex][cellIndex].cellState ?  'ball_appear 2s' : '';
            // grid[rowIndex][cellIndex].innerHTML = grid[rowIndex][cellIndex].cellState ?  getSVG(squareSize) : '';
        })
    })
}

function getRandomState() {
    return Math.floor(Math.random() * 2);
}


function getSVG(squareSize) {
    return `<svg height="${squareSize-baseSize}px" width="${squareSize-baseSize}px" version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
    viewBox="0 0 512 512"  xml:space="preserve">
<style type="text/css">
   .st0{fill:#000000;}
</style>
<g>
   <path class="st0" d="M506.423,203.02l-0.01-0.077c-0.625-2.962-1.452-5.847-2.173-8.77c-17.568-9.538-41-17.721-68.001-23.528
       c-30.538-6.596-65.634-10.26-102.201-10.25c-42.952-0.01-87.943,5.048-130.116,16.047c-2.673,0.712-5.298,1.51-7.942,2.27
       c3.432,21.98,7.914,43.347,13.298,63.99c8.846-3.105,17.923-5.72,27.259-7.74c12.76-2.75,25.462-4.009,37.972-4.009
       c41.096,0.028,79.865,13.385,114.807,31.01c34.942,17.654,66.288,39.75,92.423,58.231c6.49,4.596,12.539,8.856,18.336,12.875
       C507.759,308.741,511.99,282.895,512,256C512,237.788,510.077,220.077,506.423,203.02z"/>
   <path class="st0" d="M196.403,147.885l0.04-0.01c44.99-11.741,92.326-17.01,137.596-17.019c38.528,0,75.557,3.826,108.433,10.914
       c17.721,3.836,34.173,8.624,49.114,14.326C462.394,87.251,403.923,33.751,331.788,11.472c-4.173,3.154-8.48,6.75-12.99,10.914
       c-10.327,9.461-21.548,21.173-34.567,33.316C261,77.404,231.5,100.481,190.289,113.933c0.028,11.884,0.336,23.635,1.615,35.23
       C193.413,148.75,194.884,148.289,196.403,147.885z"/>
   <path class="st0" d="M296.096,3.222C283.038,1.154,269.644,0,256,0c-17.106,0-33.731,1.789-49.866,5
       c-2.317,8.5-5.019,19.02-7.548,30.75c-3.134,14.49-5.894,30.692-7.278,46.538c21-8.192,38.201-19.231,53.432-31.375
       C264.125,35.462,280.067,18.27,296.096,3.222z"/>
   <path class="st0" d="M161.231,90.827c1.029-21.298,4.481-42.712,8.48-61.298c1.192-5.509,2.414-10.769,3.626-15.702
       C136.394,26.366,103.278,47.126,76,74.048c18.606,11.722,40.548,18.298,64.933,18.328
       C147.529,92.376,154.317,91.808,161.231,90.827z"/>
   <path class="st0" d="M60.154,211.077c31.73-22.682,67.481-40.759,103.067-53.125c-0.221-1.818-0.48-3.586-0.672-5.423v0.03
       c-1.202-10.943-1.549-21.548-1.683-31.962c-6.721,0.788-13.385,1.326-19.933,1.326c-31.558,0.02-60.789-9.144-85.01-25.596
       C20.904,140.106,0.01,195.49,0,256c0,3.481,0.106,6.904,0.23,10.328C17.067,245.74,37.606,227.23,60.154,211.077z"/>
   <path class="st0" d="M182.173,255.644c-5.904-21.855-10.904-44.461-14.702-67.789c-31.154,11.376-62.548,27.491-90.126,47.241
       C47.375,256.52,22.039,282.135,5.73,309.808c9.798,45.615,31.673,86.749,62.212,119.855c0.182-0.539,0.346-1.029,0.519-1.568
       c3.702-11.374,7.914-24.624,13.183-38.798c10.538-28.336,25.279-60.481,49.221-89.279
       C144.586,283.529,161.606,268.327,182.173,255.644z"/>
   <path class="st0" d="M254.336,419.702c-25.692-38.866-47.288-84.374-63.528-134.644c-24.327,16.587-42.116,37.519-55.75,59.942
       c-16.375,26.942-26.606,55.798-34.635,80.337c-3.212,9.76-6.038,18.663-8.894,26.788C136.096,489.5,193.279,511.99,256,512
       c24.49,0,48.144-3.499,70.568-9.923C300.096,479.981,275.798,452.134,254.336,419.702z"/>
   <path class="st0" d="M407.625,306.02c-41.009-25.068-87.106-45.625-133.115-45.529c-10.54,0-21.116,1.048-31.741,3.346
       c-8.827,1.904-17.173,4.529-25.298,7.472c15.644,49.779,36.673,94.557,61.5,132.096c23.894,36.154,51.24,65.587,80.288,86.731
       c50.577-22.327,92.634-60.443,119.644-108.24l0.019-0.03c3.75-6.606,7.096-13.462,10.25-20.403
       c-7.712-5.25-15.865-11.048-24.5-17.154C447.308,332.019,428.124,318.51,407.625,306.02z"/>
   <path class="st0" d="M58.942,476.068l1.154,1.029L59,476.116C58.98,476.096,58.962,476.087,58.942,476.068z"/>
</g>
</svg>`;
}

