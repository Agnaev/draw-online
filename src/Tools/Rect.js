import Tool from './Tool'
import { ImageLoad } from '../helpers/Image'

class Rect extends Tool {
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
		let width = currentX - this.startX
		let height = currentY - this.startY

		this.draw(
			this.startX,
			this.startY,
			width,
			height
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
}

export default Rect