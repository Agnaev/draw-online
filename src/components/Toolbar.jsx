import React from 'react'
import '../styles/toolbar.scss'
import { ReactComponent as Brush} from '../assets/icons/brush.svg'
import { ReactComponent as Rect } from "../assets/icons/rect.svg"
import { ReactComponent as Circle } from "../assets/icons/circle.svg"
import { ReactComponent as Eraser } from '../assets/icons/eraser.svg'
import { ReactComponent as Line } from '../assets/icons/line.svg'
import { ReactComponent as Redo } from '../assets/icons/redo.svg'
import { ReactComponent as Undo } from '../assets/icons/undo.svg'
import { ReactComponent as Save } from '../assets/icons/save.svg'

const Toolbar = () => {
	return (
		<div className='toolbar'>
			<button className="toolbar__btn">
				<Brush/>
			</button>
			<button className="toolbar__btn">
				<Rect/>
			</button>
			<button className="toolbar__btn">
				<Circle/>
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