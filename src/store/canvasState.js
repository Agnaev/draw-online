import { makeAutoObservable } from 'mobx'

class CanvasState {
	canvas = null
	undoList = []
	redoList = []

	constructor() {
		makeAutoObservable(this)
	}

	setCanvas (canvas) {
		this.canvas = canvas
	}
	
	pushToUndo (data) {
		this.undoList.push(data)
	}

	pushToRedo (data) {
		this.redoList.push(data)
	}

	step (from, to) {
		const ctx = this.canvas.getContext('2d')
		const defaultProps = [0, 0, this.canvas.width, this.canvas.height]
		if (from.length) {
			let dataUrl = from.pop()
			to.push(this.canvas.toDataURL())
			let img = new Image()
			img.src = dataUrl
			img.onload = () => {
				ctx.clearRect(...defaultProps)
				ctx.drawImage(img, ...defaultProps)
			}
		}
	}

	undo = () => this.step(this.undoList, this.redoList)
	redo = () => this.step(this.redoList, this.undoList)
}

export default new CanvasState()
