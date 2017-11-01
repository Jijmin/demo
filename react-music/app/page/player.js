/**
 * Created by v_yinggzhou on 2017/10/30.
 */
import React from 'react';
import Progress from './../components/progress';
import './player.less'
import { Link } from 'react-router'
import Pubsub from 'pubsub-js'

let duration = null;
let Player = React.createClass({
    getInitialState() {
        return {
            progress: 0,
            volume: 0,
            isPlay: true,
            leftTime: ''
        }
    },
    render() {
        return (
            <div className="player-page">
                <h1 className="caption"><Link to="/list">我的私人音乐坊 &gt;</Link></h1>
                <div className="mt20 row">
                    <div className="controll-wrapper">
                        <h2 className="music-title">{this.props.currentMusicItem.title}</h2>
                        <h3 className="music-artist mt10">{this.props.currentMusicItem.artist}</h3>
                        <div className="row mt20">
                            <div className="left-time -col-auto">-{this.state.leftTime}</div>
                            <div className="volume-container">
                                <i className="icon-volume rt" style={{top: 5, left: -5}}></i>
                                <div className="volume-wrapper">
                                    <Progress
                                        progress={this.state.volume}
                                        onProgressChange={this.changeVolumeHandler}
                                        barColor="#aaa"
                                    ></Progress>
                                </div>
                            </div>
                        </div>
                        <div style={{height: 10, lineHeight: '10px', marginTop: 10}}>
                            <Progress
                                progress={this.state.progress}
                                onProgressChange={this.progressChangeHandler}
                            ></Progress>
                        </div>
                        <div className="mt35 row">
                            <div>
                                <i className="icon prev" onClick={this.playPrev}></i>
                                <i className={`icon ml20  ${this.state.isPlay?'pause':'play'}`} onClick={this.play}></i>
                                <i className="icon next ml20" onClick={this.playNext}></i>
                            </div>
                            <div className="-col-auto">
                                <i className={`icon repeat-${this.props.repeatType}`} onClick={this.changeRepeat}></i>
                            </div>
                        </div>
                    </div>
                    <div className="-col-auto cover">
                        <img src={this.props.currentMusicItem.cover} alt={this.props.currentMusicItem.title}/>
                    </div>
                </div>
            </div>
        );
    },
    changeRepeat() {
        Pubsub.publish('CHANAGE_REPEAT');
    },
    playPrev() {
        Pubsub.publish('PLAY_PREV');
    },
    playNext() {
        Pubsub.publish('PLAY_NEXT');
    },
    formatTime(time) {
        time = Math.floor(time);
        let miniutes = Math.floor(time / 60);
        let seconds = Math.floor(time % 60);
        // 对秒数的处理
        seconds = seconds < 10 ? `0${seconds}` : seconds;
        return `${miniutes}:${seconds}`
    },
    componentDidMount() {
        $('#player').bind($.jPlayer.event.timeupdate, (e)=>{// 获取当前播放的秒
            // 获取当前总时长
            duration = e.jPlayer.status.duration;
            // 重置数据
            this.setState({
                volume: e.jPlayer.options.volume * 100,
                progress: e.jPlayer.status.currentPercentAbsolute,
                leftTime: this.formatTime(duration * (1 - e.jPlayer.status.currentPercentAbsolute / 100))
            });
        });
    },
    componentWillUnMount() {
        $('#player').unbind($.jPlayer.event.timeupdate);
    },
    progressChangeHandler(progress) {
        // 计算应该播放多少秒的音频
        //$('#player').jPlayer('play', duration * progress);
        $('#player').jPlayer(this.state.isPlay?'play':'pause',duration * progress);
    },
    changeVolumeHandler(progress){
        // 直接根据传入的值控制音量
        $('#player').jPlayer('volume', progress);
    },
    play(){
        // 通过当前播放状态控制具体是暂停还是播放
        if(this.state.isPlay){// 在播放，需要暂停
            $('#player').jPlayer('pause');
        }else{
            $('#player').jPlayer('play');
        }
        // 更新播放状态值
        this.setState({
            isPlay: !this.state.isPlay
        });
    }
});
export default Player;