import React from 'react'
import { ReactComponent as BrushIcon } from '../assets/icons/brush.svg'
import { ReactComponent as RectIcon } from "../assets/icons/rect.svg"
import { ReactComponent as CircleIcon } from "../assets/icons/circle.svg"
import { ReactComponent as Eraser } from '../assets/icons/eraser.svg'
import { ReactComponent as Line } from '../assets/icons/line.svg'
import { ReactComponent as Redo } from '../assets/icons/redo.svg'
import { ReactComponent as Undo } from '../assets/icons/undo.svg'
import { ReactComponent as Save } from '../assets/icons/save.svg'

import toolState from "../store/toolState"
import canvasState from "../store/canvasState"

import Brush from "../Tools/Brush"
import Rect from "../Tools/Rect"

import '../styles/toolbar.scss'


const Toolbar = () => {
	function setTool (tool) {
		toolState.setTool(new tool(canvasState.canvas))
	}

	return (
		<div className='toolbar'>
			<button className="toolbar__btn" onClick={setTool.bind(this, Brush)}>
				<BrushIcon/>
			</button>
			<button className="toolbar__btn" onClick={setTool.bind(this, Rect)}>
				<RectIcon />
			</button>
			<button className="toolbar__btn">
				<CircleIcon />
			</button>
			<button className="toolbar__btn">
				<Eraser/>
			</button>
			<button className="toolbar__btn">
				<Line/>
			</button>
			<input type="color" className={'toolbar__color-picker'}/>
			<div className={'actions'}>
				<button className="toolbar__btn" style={{ marginLeft: 'auto' }}>
					<Undo/>
				</button>
				<button className="toolbar__btn">
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