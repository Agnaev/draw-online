import Brush from './Brush'

class Eraser extends Brush {
	draw(x, y) {
		this.ctx.strokeStyle = 'white'
		this.ctx.lineWidth = 15
		super.draw(x, y)
	}
}

export default Eraser
