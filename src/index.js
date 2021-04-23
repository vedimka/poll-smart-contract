import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router} from "react-router-dom"

import './index.css'
import App from './components/app/app'
import Store from './components/storage/Context'

ReactDOM.render(
	<Router>
		<Store>
			<App />
		</Store>
	</Router>,
	document.getElementById('root')
)
