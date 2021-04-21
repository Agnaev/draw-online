import React, { useEffect, useRef } from 'react'
import { observer } from 'mobx-react-lite'
import { useParams } from 'react-router-dom'
import axios from 'axios'

import canvasState from '../store/canvasState'
import toolState from '../store/toolState'
import Brush from '../Tools/Brush'
import Rect from '../Tools/Rect'
import { ModalWindow } from './Modal'
import { ImageLoad } from '../helpers/Image'

import '../styles/canvas.scss'

const Canvas = observer(() => {
	const canvasRef = useRef(null)
	const params = useParams()

	useEffect(() => {
		canvasState.setCanvas(canvasRef.current)
		axios
			.get('/image?id=' + params.id)
			.then(response => ImageLoad(response.data))
			.then(img => {
				const cnv = canvasRef.current
				const ctx = cnv.getContext('2d')
				const params = [0, 0, cnv.width, cnv.height]
				ctx.clearRect(...params)
				ctx.drawImage(img, ...params)
			})
	}, [])

	useEffect(() => {
		if (!canvasState.username) {
			return
		}
		const socket = new WebSocket('/')
		canvasState.setSocket(socket)
		canvasState.setSessionId(params.id)
		toolState.setTool(new Brush(canvasRef.current, socket, params.id))
		socket.onopen = () => {
			socket.send(
				JSON.stringify({
					id: params.id,
					username: canvasState.username,
					method: 'connection'
				})
			)
		}
		socket.onmessage = event => {
			const msg = JSON.parse(event.data)
			switch (msg.method) {
			case 'connection':
				console.log(`Пользователь ${msg.username} присоеденился`)
				break
			case 'draw':
				drawHandler(msg)
				break
			}
		}
	}, [canvasState.username])

	function drawHandler(msg) {
		const figure = msg.figure
		const ctx = canvasRef.current.getContext('2d')
		switch (figure.type) {
		case 'brush':
			Brush.draw(ctx, figure.x, figure.y)
			break
		case 'rect':
			Rect.staticDraw(ctx, figure.x, figure.y, figure.width, figure.height)
			break
		case 'finish':
			ctx.beginPath()
			break
		}
	}

	function mouseDownHandler() {
		canvasState.pushToUndo(canvasRef.current.toDataURL())
	}

	function mouseUpHandler () {
		axios.post(
			'http://localhost:5000/image?id=' + params.id,
			{
				img: canvasRef.current.toDataURL()
			}
		)
			.then(console.log)
	}

	return (
		<div className={'canvas'}>
			<canvas
				onMouseDown={mouseDownHandler}
				onMouseUp={mouseUpHandler}
				width={600}
				height={400}
				ref={canvasRef}
			></canvas>
			<ModalWindow/>
		</div>
	)
})

export default Canvas