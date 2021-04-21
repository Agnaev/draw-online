import React, {useRef, useState} from 'react'
import { Modal, Button } from 'react-bootstrap'
import canvasState from '../store/canvasState'

export function ModalWindow () {
	const usernameRef = useRef(null)

	const [show, setShow] = useState(true)
	function connectionHandler () {
		setShow(false)
		canvasState.setUsername(usernameRef.current.value)
	}
	return (
		<Modal show={show} onHide={() => {}}>
			<Modal.Header closeButton>
				<Modal.Title>Введите ваше имя</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<input type="text" ref={usernameRef}/>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={connectionHandler}>
					Войти
				</Button>
			</Modal.Footer>
		</Modal>
	)
}