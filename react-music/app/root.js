/*
* @Author: v_yinggzhou
* @Date:   2017-10-25 15:45:06
* @Last Modified by:   v_yinggzhou
* @Last Modified time: 2017-10-27 14:42:30
*/
import React from 'react';
import Header from './components/header';
import Player from './page/player'
import MusicList from './page/musiclist'
import { MUSIC_LIST } from './config/musiclist'
import { randomRange } from './utils/util';
import { Router, IndexRoute, Link, Route, hashHistory } from 'react-router'
import Pubsub from 'pubsub-js'
let App = React.createClass({
	getInitialState() {
		return {
			musicList: MUSIC_LIST,
			currentMusicItem: MUSIC_LIST[0],
			repeatType: 'cycle'
		}
	},
	render() {
		return (
			<div>
				<Header />
				{ React.cloneElement(this.props.children, this.state) }
			</div>
		);
	},
	playMusic(musicItem) {
		$('#player').jPlayer('setMedia', {
			mp3: musicItem.file
		}).jPlayer('play');
		// 将组件的数据状态更新下
		this.setState({
			currentMusicItem: musicItem
		});
	},
	playNext(type='next') {
		// 获取当前播放音乐的索引
		let index = this.findMusicIndex(this.state.currentMusicItem);
		// 找到的index
		let newIndex = null;
		let musicListLength = this.state.musicList.length;
		// 判断下一曲的所有
		if(type === 'next'){
			// 下一曲
			newIndex = (index + 1) % musicListLength;
		}else{
			// 上一曲
			newIndex = (index - 1 + musicListLength) % musicListLength;
		}
		this.playMusic(this.state.musicList[newIndex]);
	},
	findMusicIndex(musicItem) {
		return this.state.musicList.indexOf(musicItem);
	},
	componentDidMount() {
		$('#player').jPlayer({
			supplied: 'mp3',// 支持的格式
			wmode: 'window'
		});
		this.playMusic(this.state.currentMusicItem);
		// 监听音乐结束之后
		$('#player').bind($.jPlayer.event.ended, (e)=>{
			this.playNext();
			this.playWhenEnd();
		});
		Pubsub.subscribe('DELETE_MUSIC', (msg, musicItem)=>{
			this.setState({
				musicList: this.state.musicList.filter(item=>{
					return item !== musicItem;
				})
			});
			if(this.state.currentMusicItem === musicItem){
				this.playNext();
			}
		});
		Pubsub.subscribe('PLAY_MUSIC', (msg, musicItem)=>{
			this.playMusic(musicItem);
		});
		Pubsub.subscribe('PLAY_PREV', ()=>{
			this.playNext('prev');
		});
		Pubsub.subscribe('PLAY_NEXT', ()=>{
			this.playNext();
		});
		// 循环控制class名列表
		let repeatList = [
			'cycle',
			'once',
			'random'
		];
		Pubsub.subscribe('CHANAGE_REPEAT', ()=>{
			let index = repeatList.indexOf(this.state.repeatType);
			index = (index + 1) % repeatList.length;
			this.setState({
				repeatType: repeatList[index]
			});
		});
	},
	playWhenEnd() {
		let index = this.findMusicIndex(this.state.currentMusicItem);
		if(this.state.repeatType === 'random'){
			// 找到当前歌曲的索引
			// 设置一个随机数
			let randomIndex = randomRange(0, this.state.musicList.length - 1);
			while(randomIndex === index){
				randomIndex = randomRange(0, this.state.musicList.length - 1);
			}
			this.playMusic(this.state.musicList[randomIndex]);
		}else if(this.state.repeatType === 'once'){
			this.playMusic(this.state.musicList[index-1]);
		}else{
			this.playMusic(this.state.currentMusicItem);
		}
	},
	componentWillUnMount() {
		Pubsub.unsubscribe('PLAY_MUSIC');
		Pubsub.unsubscribe('DELETE_MUSIC');
		Pubsub.unsubscribe('PLAY_PREV');
		Pubsub.unsubscribe('PLAY_NEXT');
		Pubsub.unsubscribe('CHANAGE_REPEAT');
		$('#player').unbind($.jPlayer.event.ended);
	}

});
let Root = React.createClass({
	render() {
		return (
			<Router history={hashHistory}>
				<Route path="/" component={App}>
					<IndexRoute component={Player}></IndexRoute>
					<Route path="/list" component={MusicList}></Route>
				</Route>
			</Router>
		);
	}
});
export default Root;