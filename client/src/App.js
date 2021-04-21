import React from 'react'
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'

import Toolbar from './components/Toolbar'
import SettingBar from './components/SettingBar'
import Canvas from './components/Canvas'

import './styles/app.scss'
import 'bootstrap/dist/css/bootstrap.min.css'

function App () {
	const generateId = () => Math.random().toString(36).slice(2)
	return (
		<BrowserRouter>
			<div className={'app'}>
				<Switch>
					<Route path={'/:id'}>
						<Toolbar/>
						<SettingBar/>
						<Canvas/>
					</Route>
					<Redirect to={generateId()}/>
				</Switch>
			</div>
		</BrowserRouter>
	)
}

export default App
