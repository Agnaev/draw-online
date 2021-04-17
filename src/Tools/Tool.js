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
}

export default Tool
