import Tool from './Tool'
import { ImageLoad } from '../helpers/Image'

class Rect extends Tool {
	constructor(...params) {
		super(...params)
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
				method: 'draw',
				id: this.id,
				figure: {
					type: 'rect',
					x: this.startX,
					y: this.startY,
					width: this.width,
					height: this.height,
					color: this.ctx.fillStyle
				}
			})
		)
	}

	mouseDownHandler(e) {
		this.mouseDown = true
		this.ctx.beginPath()
		this.startX = this.calcX(e)
		this.startY = this.calcY(e)
		this.saved = this.canvas.toDataURL()
	}

	mouseMoveHandler(e) {
		if (!this.mouseDown) {
			return
		}
		let currentX = this.calcX(e)
		let currentY = this.calcY(e)
		this.width = currentX - this.startX
		this.height = currentY - this.startY

		this.draw(
			this.startX,
			this.startY,
			this.width,
			this.height
		)
	}

	draw (...drawProps) {
		ImageLoad(this.saved)
			.then(img => {
				const params = [0, 0, this.canvas.width, this.canvas.height]
				this.ctx.clearRect(...params)
				this.ctx.drawImage(img, ...params)
				this.ctx.beginPath()
				this.ctx.rect(...drawProps)
				this.ctx.fill()
				this.ctx.stroke()
			})
		this.ctx.rect(...drawProps)
		this.ctx.fill()
		this.ctx.stroke()
	}

	static staticDraw (ctx, x, y, w, h, color) {
		ctx.fillStyle = color
		ctx.beginPath()
		ctx.rect(x, y, w, h)
		ctx.fill()
		ctx.stroke()
	}
}

export default Rect