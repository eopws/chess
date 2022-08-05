export abstract class BasicLayer {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;

    constructor(canvas: HTMLCanvasElement) {
        const ctx = canvas.getContext('2d');

        if (!ctx) {
            throw new Error('Cannot get rendering context');
        }

        this.canvas = canvas;
        this.ctx = ctx;
    }
}
