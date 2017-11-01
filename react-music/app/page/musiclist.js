/**
 * Created by v_yinggzhou on 2017/11/1.
 */
import React from 'react';
import MusicListItem from '../components/musiclistitem'
let MusicList = React.createClass({
    render() {
        let listEle = null;
        listEle = this.props.musicList.map((item)=>{
            return (
                <MusicListItem
                    focus={item === this.props.currentMusicItem }
                    key={item.id}
                    musicItem={item}
                >
                    {item.title}
                </MusicListItem>
            );
        });
        return (
            <ul>
                { listEle }
            </ul>
        );
    }
});

export default MusicList;