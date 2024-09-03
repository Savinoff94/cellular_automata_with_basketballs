export class Cell {
    constructor() {
        this.element = document.createElement('div');
        this.state = 0;
        this.element.style.opacity = '0';
        this.element.display = 'flex';
        this.element.justifyContent = 'center';
        this.element.alignItems = 'center';
    }

    getElement() {
        return this.element;
    }

    turnOnCell() {
        this.element.firstElementChild.style.opacity = '1';
        this.state = 1;
    }

    turnOffCell() {
        this.element.firstElementChild.style.opacity = '0';
        this.state = 0;
    }

    appear() {
        this.element.style.animation = 'ball_appear 1.5s forwards';
    }

    disappear() {
        this.element.style.animation = 'ball_disappear 1.5s forwards';
    }

    setState(state) {
        this.state = state;
    }

    getState() {
        return this.state;
    }
}

export class CellBuilder {
    constructor() {
        this.cell = new Cell;
    }

    setSVG(svg) {
        this.cell.element.innerHTML = svg;
        return this;
    }

    setState(state = 0) {
        this.cell.state = state;
        this.cell.element.firstElementChild.style.opacity = `${state}`;
        return this;
    }

    build() {
        return this.cell;
    }
}