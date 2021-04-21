import Tool from './Tool'

class Brush extends Tool {
	constructor(...props) {
		super(...props)
		this.listen()
	}

	listen () {
		this.canvas.onmousemove = this.mouseMoveHandler.bind(this)
		this.canvas.onmousedown = this.mouseDownHandler.bind(this)
		this.canvas.onmouseup = this.mouseUpHandler.bind(this)
	}

	mouseUpHandler() {
		this.mouseDown = false
		this.socket.send(
			JSON.stringify({
				id: this.id,
				method: 'draw',
				figure: {
					type: 'finish'
				}
			})
		)
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
			// this.draw(
			// 	this.calcX(e),
			// 	this.calcY(e)
			// )
			this.socket.send(
				JSON.stringify({
					method: 'draw',
					id: this.id,
					figure: {
						type: 'brush',
						x: this.calcX(e),
						y: this.calcY(e)
					}
				})
			)
		}
	}

	static draw (ctx, x, y) {
		ctx.lineTo(x, y)
		ctx.stroke()
	}
}

export default Brush