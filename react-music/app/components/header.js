/*
* @Author: v_yinggzhou
* @Date:   2017-10-25 15:30:09
* @Last Modified by:   v_yinggzhou
* @Last Modified time: 2017-10-25 15:53:08
*/
import React from 'react'
import './header.less'

let Header = React.createClass({
	render() {
		return (
			<div className="compoments-header row">
				<img src="/static/images/logo.png" width="40" alt="" className="-col-auto" />
				<h1 className="caption">React Music Player</h1>
			</div>	
		);
	}
});
export default Header;