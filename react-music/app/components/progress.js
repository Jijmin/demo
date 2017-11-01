/*
* @Author: v_yinggzhou
* @Date:   2017-10-25 15:30:09
* @Last Modified by:   v_yinggzhou
* @Last Modified time: 2017-10-27 14:40:26
*/
import React from 'react'
import './progress.less'

let Progress = React.createClass({
	getDefaultProps() {
		return {
			barColor: '#2f9842'
		}
	},
	changeProgress(e) {
		// 获取到了原生的DOM节点
		let progressBar = this.refs.progressBar;
		let progress = (e.clientX - progressBar.getBoundingClientRect().left) / progressBar.clientWidth;
		this.props.onProgressChange && this.props.onProgressChange(progress);
	},
	render() {
		return (
			<div className="compoments-progress" ref="progressBar" onClick={this.changeProgress}>
				<div className="progress" style={{width:`${this.props.progress}%`, background: this.props.barColor}}></div>
			</div>	
		);
	}
});
export default Progress;