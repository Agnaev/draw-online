import Tool from './Tool'

class Brush extends Tool {
	constructor(canvas) {
		super(canvas)
		this.listen()
	}

	listen () {
		this.canvas.onmousemove = this.mouseMoveHandler.bind(this)
		this.canvas.onmousedown = this.mouseDownHandler.bind(this)
		this.canvas.onmouseup = this.mouseUpHandler.bind(this)
	}

	mouseUpHandler() {
		this.mouseDown = false
	}

	mouseDownHandler(e) {
		this.mouseDown = true
		this.ctx.beginPath(
			this.calcX(e),
			this.calcY(e)
		)
	}

	mouseMoveHandler(e) {
		if (this.mouseDown) {
			this.draw(
				this.calcX(e),
				this.calcY(e)
			)
		}
	}

	draw (x, y) {
		this.ctx.lineTo(x, y)
		this.ctx.stroke()
	}
}

export default Brush