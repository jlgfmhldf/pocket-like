import { h, render } from 'preact'
import { Provider } from 'react-redux'

import store from './store'

import App from './components/index'

store.subscribe(()=>{
	localStorage.pl_requestToken = store.getState().auth.requestToken;
	localStorage.pl_IsAuthorizeToken = store.getState().auth.IsAuthorizeToken;
	localStorage.pl_accessToken = store.getState().auth.accessToken;
	if(localStorage.pl_requestToken && !localStorage.pl_accessTokens){
		window.location.href = `https://getpocket.com/auth/authorize?request_token=${localStorage.pl_requestToken}&redirect_uri=${store.getState().article.url}`;
	}
})

render(
	<Provider store={store}>
		<App/>
	</Provider>,
	document.body
)