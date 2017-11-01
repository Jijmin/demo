/* 
* @Author: v_yinggzhou
* @Date:   2017-10-25 11:03:30
* @Last Modified by:   v_yinggzhou
* @Last Modified time: 2017-10-25 15:48:29
*/
import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Root from './root';

render(
	<AppContainer>
		<Root/>
	</AppContainer>,
	document.getElementById('root')
);

if(module.hot){
	module.hot.accept('./root', ()=>{
		const NewRoot = require('./root').default;
		render(
			<AppContainer>
				<NewRoot/>
			</AppContainer>,
			document.getElementById('root')
		);
	});
}