import Tool from './Tool'
import { ImageLoad } from '../helpers/Image'

class Line extends Tool {
	constructor(canvas) {
		super(canvas)
		this.listen()
	}

	listen () {
		this.canvas.onmousedown = this.mouseDown.bind(this)
		this.canvas.onmouseup = this.mouseUp.bind(this)
		this.canvas.onmousemove = this.mouseMove.bind(this)
	}

	mouseDown (e) {
		this.press = true
		this.startX = this.calcX(e)
		this.startY = this.calcY(e)
		this.ctx.beginPath()
		this.ctx.moveTo(this.startX, this.startY)
		this.saved = this.canvas.toDataURL()
	}

	mouseUp () {
		this.press = false
	}

	mouseMove (e) {
		if (this.press) {
			const x = this.calcX(e)
			const y = this.calcY(e)
			this.draw(x, y)
		}
	}

	draw (x, y) {
		ImageLoad(this.saved)
			.then(img => {
				const params = [0, 0, this.canvas.width, this.canvas.height]
				this.ctx.clearRect(...params)
				this.ctx.drawImage(img, ...params)
				this.ctx.beginPath()
				this.ctx.moveTo(this.startX, this.startY)
				this.ctx.lineTo(x, y)
				this.ctx.stroke()
			})
	}
}

export default Line
