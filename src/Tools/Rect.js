import Tool from "./Tool"

class Rect extends Tool{
	constructor(canvas) {
		super(canvas)
		this.listen()
	}

	listen () {
		this.canvas.onmousemove = this.mouseMoveHandler.bind(this)
		this.canvas.onmousedown = this.mouseDownHandler.bind(this)
		this.canvas.onmouseup = this.mouseUpHandler.bind(this)
	}

	mouseUpHandler(e) {
		this.mouseDown = false
	}

	mouseDownHandler(e) {
		this.mouseDown = true
		this.ctx.beginPath(
			e.pageX - e.target.offsetLeft,
			e.pageY - e.target.offsetTop
		)
		this.startX = e.pageX - e.target.offsetLeft
		this.startY = e.pageY - e.target.offsetTop
		this.saved = this.canvas.toDataURL()
	}

	mouseMoveHandler(e) {
		if (!this.mouseDown) {
			return
		}
		let currentX = e.pageX - e.target.offsetLeft
		let currentY = e.pageY - e.target.offsetTop
		let width = currentX - this.startX
		let height = currentY - this.startY

		this.draw(
			this.startX,
			this.startY,
			width,
			height
		)
	}

	draw (drawProps) {
		const img = new Image()
		img.src = this.saved
		img.onload = () => {
			const params = [0, 0, this.canvas.width, this.canvas.height]
			this.ctx.clearRect(...params)
			this.ctx.drawImage(img, ...params)
			this.ctx.beginPath()
			this.ctx.rect(...drawProps)
			this.ctx.fill()
			this.ctx.stroke()
		}
		this.ctx.rect(...drawProps)
		this.ctx.fill()
		this.ctx.stroke()
	}
}

export default Rect