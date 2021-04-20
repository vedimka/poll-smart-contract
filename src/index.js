import React from 'react'
import ReactDOM from 'react-dom'
import MetaMaskProvider from 'metamask-react'
import './index.css'
import App from './components/app/app'
import Store from './components/storage/Context'

ReactDOM.render(
	<Store>
		<App />
	</Store>,
	document.getElementById('root')
)
