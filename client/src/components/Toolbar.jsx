import React from 'react'
import { ReactComponent as BrushIcon } from '../assets/icons/brush.svg'
import { ReactComponent as RectIcon } from '../assets/icons/rect.svg'
import { ReactComponent as CircleIcon } from '../assets/icons/circle.svg'
import { ReactComponent as EraserIcon } from '../assets/icons/eraser.svg'
import { ReactComponent as LineIcon } from '../assets/icons/line.svg'
import { ReactComponent as Redo } from '../assets/icons/redo.svg'
import { ReactComponent as Undo } from '../assets/icons/undo.svg'
import { ReactComponent as Save } from '../assets/icons/save.svg'

import toolState from '../store/toolState'
import canvasState from '../store/canvasState'

import Brush from '../Tools/Brush'
import Rect from '../Tools/Rect'
import Circle from '../Tools/Circle'
import Eraser from '../Tools/Eraser'
import Line from '../Tools/Line'

import '../styles/toolbar.scss'


const Toolbar = () => {
	function setTool (Tool) {
		toolState.setTool(new Tool(canvasState.canvas, canvasState.socket, canvasState.sessionId))
	}

	return (
		<div className='toolbar'>
			<button className="toolbar__btn" onClick={setTool.bind(this, Brush)}>
				<BrushIcon/>
			</button>
			<button className="toolbar__btn" onClick={setTool.bind(this, Rect)}>
				<RectIcon />
			</button>
			<button className="toolbar__btn" onClick={setTool.bind(this, Circle)}>
				<CircleIcon />
			</button>
			<button className="toolbar__btn" onClick={setTool.bind(this, Eraser)}>
				<EraserIcon />
			</button>
			<button className="toolbar__btn" onClick={setTool.bind(this, Line)}>
				<LineIcon />
			</button>
			<input type="color" className={'toolbar__color-picker'}/>
			<div className={'actions'}>
				<button
					className="toolbar__btn"
					style={{ marginLeft: 'auto' }}
					onClick={() => canvasState.undo()}
				>
					<Undo/>
				</button>
				<button
					className="toolbar__btn"
					onClick={() => canvasState.redo()}
				>
					<Redo/>
				</button>
				<button className="toolbar__btn">
					<Save/>
				</button>
			</div>
		</div>
	)
}

export default Toolbar