class Tool {
	constructor(canvas) {
		this.canvas = canvas
		this.ctx = canvas.getContext('2d')
		this.destroyEventListeners()
	}

	destroyEventListeners () {
		this.canvas.onmousemove = null
		this.canvas.onmousedown = null
		this.canvas.onmouseup = null
	}

	calcX (e) {
		return e.pageX - e.target.offsetLeft
	}

	calcY (e) {
		return e.pageY - e.target.offsetTop
	}
}

export default Tool
