import Tool from './Tool'
import {ImageLoad} from '../helpers/Image'

class Circle extends Tool {
	constructor(canvas) {
		super(canvas)
		this.listen()
	}

	listen() {
		this.canvas.onmousemove = this.mouseMoveHandler.bind(this)
		this.canvas.onmousedown = this.mouseDownHandler.bind(this)
		this.canvas.onmouseup = this.mouseUpHandler.bind(this)
	}

	mouseDownHandler(e) {
		this.mouseDown = true
		this.ctx.beginPath()
		this.startX = this.calcX(e)
		this.startY = this.calcY(e)
		this.saved = this.canvas.toDataURL()
	}

	mouseUpHandler() {
		this.mouseDown = false
	}

	mouseMoveHandler(e) {
		if(!this.mouseDown) {
			return
		}
		let currentX = this.calcX(e)
		let currentY = this.calcY(e)
		let width = currentX - this.startX
		let height = currentY - this.startY
		let radius = Math.sqrt(width ** 2 + height ** 2)
		this.draw(this.startX, this.startY, radius)
	}

	draw(x, y, radius) {
		ImageLoad(this.saved)
			.then(img => {
				const params = [0,0, this.canvas.width, this.canvas.height]
				this.ctx.clearRect(...params)
				this.ctx.drawImage(img, ...params)
				this.ctx.beginPath()
				this.ctx.arc(x, y, radius, 0, 2 * Math.PI)
				this.ctx.fill()
				this.ctx.stroke()
			})
	}
}

export default Circle