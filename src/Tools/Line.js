import Tool from './Tool'

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
		this.startX = e.pageX - e.target.offsetLeft
		this.startY = e.pageY - e.target.offsetTop
		this.ctx.beginPath()
		this.ctx.moveTo(this.startX, this.startY)
		this.saved = this.canvas.toDataURL()
	}

	mouseUp () {
		this.press = false
	}

	mouseMove (e) {
		if (this.press) {
			const x = e.pageX - e.target.offsetLeft
			const y = e.pageY - e.target.offsetTop
			this.draw(x, y)
		}
	}

	draw (x, y) {
		const img = new Image()
		img.src = this.saved
		img.onload = () => {
			const params = [0, 0, this.canvas.width, this.canvas.height]
			this.ctx.clearRect(...params)
			this.ctx.drawImage(img, ...params)
			this.ctx.beginPath()
			this.ctx.moveTo(this.startX, this.startY)
			this.ctx.lineTo(x, y)
			this.ctx.stroke()
		}
	}
}

export default Line
