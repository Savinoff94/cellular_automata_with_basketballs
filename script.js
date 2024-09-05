import { GridBuilder } from './classes.js'


window.onload = function() {

    const root = document.querySelector("#root");
    const gridBuilder = new GridBuilder();
    const grid = gridBuilder.setElement(root).setGridPaddings().setGridTemplate().setGridMatrix().build();

    grid.runAnimation();
}