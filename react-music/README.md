### Webpack搭建开发环境
```
module.exports = {
    entry: './entry.js',
    output: {
        path: './dist',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" },
            { test: /\.js|jsx$/, loaders: ['babel'] }
        ]
    }
}
```
1. `npm init`填写信息
2. `npm install react --save`安装react
3. 复制package.json直接安装`npm install`
4. 新建一个`webpack.config.js`文件，里面是webpack的配置信息
```
module.exports = {
    entry: './app/index.js',
    output: {
        path: './dist',
        filename: 'bundle.js'
    }
}
```
5. 新建对应的文件夹`app`、`dist`以及文件`index.js`
```
var react = require('react');
console.log(react.version);
```
6. 全局安装webpack
```
npm install webpack -g
```
7. 新建一个index.html页面，里面引入bundle.js
```
// index.js
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
    </head>
    <body>
    <div id="root"></div>
    <script src="./dist/bundle.js"></script>
    </body>
</html>
```
8. 引入处理工具
```
// webpack.config.js
module.exports = {
    entry: './app/index.js',
    output: {
        path: './dist',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                query: {
                    presets: ['react', 'es2015']
                }
            }, {
                test: /\.css$/,
                loader: "style!css"
            }, {
                test: /\.less/,
                loader: "style-loader!css-loader!less-loader"
            }
        ]
    }
}
```
9. 使用es6以及less校验
```
// app/index.js
import React from 'react'
import './index.less'

// app/index.less
body{
    #root{
        font-size: 30px;
    }
}
```

### Webpack dev server搭建开发环境
1. 对webpack.config.js做一些修改
```
var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: [
        'webpack-dev-server/client?http://localhost:3000',
        'webpack/hot/only-dev-server',
        'react-hot-loader/patch',
        path.join(__dirname, 'app/index.js')
    ],
    output: {
        path: path.join(__dirname, '/dist/'),
        filename: '[name].js',
        publicPath: '/'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.tpl.html',
            inject: 'body',
            filename: './index.html'
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        })
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                query: {
                    presets: ['react', 'es2015']
                }
            }, {
                test: /\.css$/,
                loader: "style!css"
            }, {
                test: /\.less/,
                loader: "style-loader!css-loader!less-loader"
            }
        ]
    }
}
```
2. 将之前的index.html修改为index.tpl.html，不需要引入打包好的文件，上面的配置会自动生成
3. 配置一个webpack-dev-server服务器
```
// server.js
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');

new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true,
    historyApiFallback: true,
    quiet: false,
    noInfo: false,
    stats: {
        assets: false,
        color: true,
        version: false,
        hash: false,
        timings: false,
        chunks: false,
        chunkModules: false
    }
}).listen(3000, 'localhost', function(err){
    if(err){
        console.log(err);
    }
    console.log('Listening at localhost:3000');
});
```
4. 对入口文件做修改
```
// app/index.js
import React from 'react'
import { render } from 'react-dom'
import Hello from './components/hello'
// JSX语法
render(
    <Hello></Hello>,
    document.getElementById('root')
);
```
5. 编写Hello组件
```
// app/components/hello.js
import React from 'react'
import './hello.less'

let Hello = React.createClass({
    render() {
        return (
            <div className="hello-component">
                Hello, React
            </div>
        );
    }
});
export default Hello;

// app/components/hello.less
.hello-component{
    font-size: 30px;
}
```
6. 启动服务器`node server.js`
7. 让修改能够实时的在；浏览器上刷新
```
// app/index.js
import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Hello from './components/hello';

render(
    <AppContainer>
        <Hello/>
    </AppContainer>,
    document.getElementById('root')
);

if(module.hot){
    module.hot.accept('./components/hello', ()=>{
        const NewHello = require('./components/hello').default;
        render(
            <AppContainer>
                <NewHello/>
            </AppContainer>,
            document.getElementById('root')
        );
    });
}
```

### header组件
1. 引入一些样式
```
// index.tpl.html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <title>React Music Player</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" type="text/css" href="/static/css/reset.css">
        <link rel="stylesheet" type="text/css" href="/static/css/common.css">
        <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
        <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jplayer/2.9.2/jplayer/jquery.jplayer.min.js"></script>
    </head>
    <body>
    <div id="root">React</div>
    </body>
</html>
```
2. 书写一个header组件
```
// app/components/header.js
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

// app/components/header.less
.compoments-header {
    box-sizing: border-box;
    padding: 15px 25px;
    border-bottom: 1px solid #ccc;
    background: white;
    .caption {
        font-size: 20px;
        text-indent: 20px;
    }
}
```
3. 编写根节点组件
```
import React from 'react';
import Header from './components/header';
let Root = React.createClass({
    render() {
        return (
            <Header />
        );
    }
});
export default Root;
```
4. 修改入口文件
```
import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Root from './root';// 根节点

render(
    <AppContainer>
        <Root/>
    </AppContainer>,
    document.getElementById('root')
);

if(module.hot){// 根节点下的都热加载
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
```

### progress组件开发
1. 新建一个progress.js文件
2. 组件本身的数据使用state
3. 从其他组件传入的数据使用props
```
<div className="compoments-progress row">
    { this.props.progress }s
</div>  
```
4. 在跟组件中引入这个组件
```
import Progress from './components/progress';
```
5. 在渲染的时候需要注意JSX语法必须包裹在一个节点中
```
let Root = React.createClass({
    render() {
        return (
            <div>
                <Header />
                <Progress
                    progress='1'
                ></Progress>
            </div>
        );
    }
});
```

### jplayer使用
1. 在HTML中引入jplayer
```
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jplayer/2.9.2/jplayer/jquery.jplayer.min.js"></script>
```
2. 在根节点中加载音乐播放器
```
// app/root.js
import React from 'react';
import Header from './components/header';
import Progress from './components/progress';
let Root = React.createClass({
    getInitialState() {
        return {
            progress: '-'
        }
    },
    render() {
        return (
            <div>
                <Header />
                <Progress
                    progress={this.state.progress}
                ></Progress>
            </div>
        );
    },
    componentDidMount() {
        $('#player').jPlayer({
            ready: function(){
                // 播放音乐
                $(this).jPlayer('setMedia', {
                    mp3: 'http://oj4t8z2d5.bkt.clouddn.com/%E9%AD%94%E9%AC%BC%E4%B8%AD%E7%9A%84%E5%A4%A9%E4%BD%BF.mp3'
                }).jPlayer('play');
            },
            supplied: 'mp3',// 支持的格式
            wmode: 'window'
        });
        $('#player').bind($.jPlayer.event.timeupdate, (e)=>{// 获取当前播放的秒
            // 重置数据
            this.setState({
                progress: Math.round(e.jPlayer.status.currentTime)
            });
        })
    }
});
export default Root;
```

### React生命周期
1. getDefaultProps：获得默认的props的状态
2. getInitialState：设置state的数据
3. componentWillMount：component即将要挂载到页面的时候
4. render：渲染
5. componentDidMount：UI正真的挂载到文档流的时候
6. componentWillUnmount：组件销毁的时候

### 解绑
1. 在组件componentDidMount的时候绑定了一个事件，但是并没有对这个事件解绑
2. 在进入一个页面然后切换回来的时候又会触发componentDidMount事件，然后又会绑定一次事件
3. 这样就会造成事件的重复绑定
```
componentWillUnMount() {
    $('#player').unbind($.jPlayer.event.timeupdate);
}
```

### 进度条
1. 添加进度条样式
```
// app/components/progress.less
.compoments-progress{
    margin-top: 20px;
    width: 100%;
    height: 3px;
    background: #ddd;
    cursor: pointer;
    .progress{
        width: 20%;
        height: 3px;
        background: #2f9842;
    }
}
```
2. 编写进度条结构
```
// app/components/progress.js
import React from 'react'
import './progress.less'

let Progress = React.createClass({
    render() {
        return (
            <div className="compoments-progress">
                <div className="progress"></div>
            </div>  
        );
    }
});
export default Progress;
```
3. 动态生成进度
```
// app/root.js
$('#player').bind($.jPlayer.event.timeupdate, (e)=>{// 获取当前播放的秒
    // 重置数据
    this.setState({
        progress: e.jPlayer.status.currentPercentAbsolute
    });
});
```
4. 在组件中接受下这个进度百分比
```
<div className="progress" style={{width:`${this.props.progress}%`}}></div>
```
5. 给进度条添加一个点击事件
6. react中尽量避免操作DOM，但是react为我们提供了操作DOM的方式
7. 给DOM添加一个ref的名字，这样就会将这些真实的DOM收集到ref中
```
import React from 'react'
import './progress.less'

let Progress = React.createClass({
    changeProgress(e) {
        // 获取到了原生的DOM节点
        let progressBar = this.refs.progressBar;
        let progress = (e.clientX - progressBar.getBoundingClientRect().left) / progressBar.clientWidth;
        console.log(progress);
    },
    render() {
        return (
            <div className="compoments-progress" ref="progressBar" onClick={this.changeProgress}>
                <div className="progress" style={{width:`${this.props.progress}%`}}></div>
            </div>  
        );
    }
});
export default Progress;
```
8. 更改后的值需要通知父组件
```
// app/root.js
progressChangeHandler(progress) {
    console.log('from root widget ', progress);
},
render() {
    return (
        <div>
            <Header />
            <Progress
                progress={this.state.progress}
                onProgressChange={this.progressChangeHandler}
            ></Progress>
        </div>
    );
},

// app/components/progress.js
changeProgress(e) {
    // 获取到了原生的DOM节点
    let progressBar = this.refs.progressBar;
    let progress = (e.clientX - progressBar.getBoundingClientRect().left) / progressBar.clientWidth;
    this.props.onProgressChange && this.props.onProgressChange(progress);
},
```
9. 计算时长
```
// app/root.js
let duration = null;

$('#player').bind($.jPlayer.event.timeupdate, (e)=>{// 获取当前播放的秒
    // 获取当前总时长
    duration = e.jPlayer.status.duration;
    // 重置数据
    this.setState({
        progress: e.jPlayer.status.currentPercentAbsolute
    });
});

progressChangeHandler(progress) {
    // 计算应该播放多少秒的音频
    $('#player').jPlayer('play', duration * progress);
}
```
10. 提供给用户设置进度条颜色
11. 设置一个默认的属性
```
// app/components/progress.js
getDefaultProps() {
    return {
        barColor: '#2f9842'
    }
},

<div className="progress" style={{width:`${this.props.progress}%`, background: this.props.barColor}}></div>
```

### 组件间通信
1. 父->子 props
2. 子->父
    - 回调函数
3. 子->子，这个需要找他们的共同父级组件，然后传递给父组件，通过共同父组件派发事件，使用[事件订阅](https://github.com/mroderick/PubSubJS)

### 将进度条组件和root页面分离
```
/**
 * Created by v_yinggzhou on 2017/10/30.
 */
import React from 'react';
// 依赖
import Progress from './../components/progress';

let duration = null;
let Player = React.createClass({
    // 时间显示的初始化状态
    getInitialState() {
        return {
            progress: '-'
        }
    },
    // 渲染Progress组件
    render() {
        return (
            <div>
                <Progress
                    progress={this.state.progress}
                    onProgressChange={this.progressChangeHandler}
                    barColor='#ff0000'
                ></Progress>
            </div>
        );
    },
    componentDidMount() {
        $('#player').bind($.jPlayer.event.timeupdate, (e)=>{// 获取当前播放的秒
            // 获取当前总时长
            duration = e.jPlayer.status.duration;
            // 重置数据
            this.setState({
                progress: e.jPlayer.status.currentPercentAbsolute
            });
        });
    },
    componentWillUnMount() {
        $('#player').unbind($.jPlayer.event.timeupdate);
    },
    progressChangeHandler(progress) {
        // 计算应该播放多少秒的音频
        $('#player').jPlayer('play', duration * progress);
    }
});
export default Player;
```

### UI逻辑
1. 新建一个样式player.less，将样式写好
```
.player-page {
  width: 700px;
  margin: auto;
  margin-top: 120px;

  .caption {
    font-size: 16px;
    color: rgb(47, 152, 66);
  }

  .cover {
    width: 180px;
    height: 180px;
    margin-left: 20px;

    img {
      width: 180px;
      height: 180px;
      border-radius: 50%;
    }
  }
  .volume-container {
    position: relative;
    left: 20px;
    top: -3px;
  }
  .volume-container .volume-wrapper {
    opacity: 0;
    transition: opacity .5s linear;
  }
  .volume-container:hover .volume-wrapper {
    opacity: 1;
  }
  .music-title {
    font-size: 25px;
    font-weight: 400;
    color: rgb(3, 3, 3);
    height: 36px;
    line-height: 36px;
  }
  .music-artist {
    font-size: 15px;
    font-weight: 400;
    color: rgb(74, 74, 74);
  }
  .left-time {
    font-size: 14px;
    color: #999;
    font-weight: 400;
    width: 40px;
  }
  .icon {
    cursor: pointer;
  }
  .ml20 {
    margin-left: 20px;
  }
  .mt35 {
    margin-top: 35px;
  }
  .volume-wrapper {
    width: 60px;
    display: inline-block;
  }
}
```
2. 在页面进行引入，以及对应的dom元素上加上样式名
```
import './player.less'
<div className="player-page">
```
3. 写里面对应的UI结构
```
<div className="player-page">
    <h1 className="caption">我的私人音乐坊 &gt;</h1>
    <div className="mt20 row">
        <div className="controll-wrapper">
            <h2 className="music-title">歌曲名称</h2>
            <h3 className="music-artist mt10">歌手</h3>
            <div className="row mt20">
                <div className="left-time -col-auto">-2:00</div>
                <div className="volume-container">
                    <i className="icon-volume rt" style={{top: 5, left: -5}}></i>
                    <div className="volume-wrapper">
                        音量控制部分
                    </div>
                </div>
            </div>
            <div style={{height: 10, lineHeight: '10px'}}>
                播放进度部分
            </div>
            <div className="mt35 row">
                <div>
                    <i className="icon prev"></i>
                    <i className="icon ml20 play"></i>
                    <i className="icon next ml20"></i>
                </div>
                <div className="-col-auto">
                    <i className="icon repeat-cycle"></i>
                </div>
            </div>
        </div>
        <div className="-col-auto cover">
            <img src="" alt="歌曲名称"/>
        </div>
    </div>
</div>
```

### 页面数据维护
1. 页面公共的数据放到root中管理
2. 先写一个当前播放的数据
```
import { MUSIC_LIST } from './config/musiclist'

getInitialState() {
    return {
        currentMusicItem: MUSIC_LIST[0 ]
    }
},
```
3. 新建一个存放配置的文件夹config，musiclist.js
```
export const MUSIC_LIST = [
    {
        id: 1,
        title: '天使中的魔鬼',
        artist: '田馥甄',
        file: 'http://oj4t8z2d5.bkt.clouddn.com/%E9%AD%94%E9%AC%BC%E4%B8%AD%E7%9A%84%E5%A4%A9%E4%BD%BF.mp3',
        cover: 'http://oj4t8z2d5.bkt.clouddn.com/%E9%AD%94%E9%AC%BC%E4%B8%AD%E7%9A%84%E5%A4%A9%E4%BD%BF.jpg'
    }, {
        id: 2,
        title: '风继续吹',
        artist: '张国荣',
        file: 'http://oj4t8z2d5.bkt.clouddn.com/%E9%A3%8E%E7%BB%A7%E7%BB%AD%E5%90%B9.mp3',
        cover: 'http://oj4t8z2d5.bkt.clouddn.com/%E9%A3%8E%E7%BB%A7%E7%BB%AD%E5%90%B9.jpg'
    }, {
        id: 3,
        title: '恋恋风尘',
        artist: '老狼',
        file: 'http://oj4t8z2d5.bkt.clouddn.com/%E6%81%8B%E6%81%8B%E9%A3%8E%E5%B0%98.mp3',
        cover: 'http://oj4t8z2d5.bkt.clouddn.com/%E6%81%8B%E6%81%8B%E9%A3%8E%E5%B0%98.jpg'
    }, {
        id: 4,
        title: '我要你',
        artist: '任素汐',
        file: 'http://oj4t8z2d5.bkt.clouddn.com/%E6%88%91%E8%A6%81%E4%BD%A0.mp3',
        cover: 'http://oj4t8z2d5.bkt.clouddn.com/%E6%88%91%E8%A6%81%E4%BD%A0.jpg'
    }, {
        id: 5,
        title: '成都',
        artist: '赵雷',
        file: 'http://oj4t8z2d5.bkt.clouddn.com/%E6%88%90%E9%83%BD.mp3',
        cover: 'http://oj4t8z2d5.bkt.clouddn.com/%E6%88%90%E9%83%BD.jpg'
    }, {
        id: 6,
        title: 'sound of silence',
        artist: 'Simon & Garfunkel',
        file: 'http://oj4t8z2d5.bkt.clouddn.com/sound-of-silence.mp3',
        cover: 'http://oj4t8z2d5.bkt.clouddn.com/sound-of-silence.jpg'
    }

];
```
4. 播放器需要获取音乐数据，将数据传递给播放器
```
<Player currentMusicItem={this.state.currentMusicItem}></Player>
```
5. 在player组件中使用数据
```
<h2 className="music-title">{this.props.currentMusicItem.title}</h2>
```
6. 将进度条加进来
```
<div style={{height: 10, lineHeight: '10px'}}>
    <Progress
        progress={this.state.progress}
        onProgressChange={this.progressChangeHandler}
    ></Progress>
</div>
```
7. 音量部分可以复用进度条
```
<Progress
    progress="20"
    onProgressChange={this.changeVolumeHandler}
    barColor="#aaa"
></Progress>

changeVolumeHandler(){}
```
8. 设置音量的默认值
```
getInitialState() {
    return {
        progress: 0,
        volume: 0
    }
},
```
9. 获取音量的值
```
componentDidMount() {
    $('#player').bind($.jPlayer.event.timeupdate, (e)=>{// 获取当前播放的秒
        // 获取当前总时长
        duration = e.jPlayer.status.duration;
        // 重置数据
        this.setState({
            volume: e.jPlayer.options.volume * 100,
            progress: e.jPlayer.status.currentPercentAbsolute
        });
    });
},
```
10. 将音量值传入progress组件
```
<Progress
    progress={this.state.volume}
    onProgressChange={this.changeVolumeHandler}
    barColor="#aaa"
></Progress>
```
11. 处理音量进度条函数
```
changeVolumeHandler(progress){
    $('#player').jPlayer('volume', progress);
}
```
12. 需要记录目前播放的状态，默认让它初始化的时候直接播放`isPlay: true`
13. 在播放按钮上定义一个事件
```
<i className="icon ml20 play" onClick={this.play}></i>

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
```
14. 对应图标上要更改
```
<i className={`icon ml20  ${this.state.isPlay?'pause':'play'}`} onClick={this.play}></i>
```
15. 改变进度条时需要对应上
```
progressChangeHandler(progress) {
    // 计算应该播放多少秒的音频
    $('#player').jPlayer(this.state.isPlay?'play':'pause',duration * progress);
},
```

### 列表页
1. 新建音乐列表页面
```
import React from 'react';
let MusicList = React.createClass({});
export default MusicList;
```
2. 在root中引入新建的列表页的组件musiclist.js
```
import MusicList from './page/musiclist'
```
3. 列表数据从root组件中传入
```
<MusicList
    currentMusicItem={this.state.currentMusicItem}
    musicList={this.state.musicList}
></MusicList>
```
4. 在React中尽量使用一个无副作用的操作，例如循环用map控制
5. 在列表中需要设置一个key，react在做更新的时候，每次会对照key值，如果有的话，直接引用DOM元素，而不再去创建新的
```
let MusicList = React.createClass({
    render() {
        let listEle = null;
        listEle = this.props.musicList.map((item)=>{
            return <li key={item.id}>{item.title}</li>;
        });
        return (
            <ul>
                { listEle }
            </ul>
        );
    }
});
```
6. 将每一项都写成一个组件`components/musiclistitem.js`
```
import React from 'react'
let MusicListItem = React.createClass({
    render() {
        let musicItem = this.props.musicItem;
        return (
            <li className="components-musiclistitem row">
                <p><strong>{musicItem.title}</strong> - {musicItem.artist}</p>
                <p className="-col-auto delete"></p>
            </li>
        );
    }
});
export default MusicListItem;
```
7. 引入样式
```
import './musiclistitem.less'
```
8. 列表页引入单个的MusicListItem组件
```
import MusicListItem from '../components/musiclistitem'

<MusicListItem
    key={item.id}
    musicItem={item}
>
    {item.title}
</MusicListItem>
```
9. 当前播放歌曲是选中状态，设置一个focus值，判断是不是当前播放的歌曲
```
<MusicListItem
    focus={item === this.props.currentMusicItem }
    key={item.id}
    musicItem={item}
>
    {item.title}
</MusicListItem>
```
10. 切换样式
```
<li className={`components-musiclistitem row ${this.props.focus ? 'focus': ''}`}>
```

### React-router
1. 导入react-router
```
import { Router, IndexRoute, Link, Route, hashHistory } from 'react-router'
```
2. root只做页面的管理，需要再做一次提取，需要将控制的内容提取到App的组件中，是音乐播放器的顶级组件
3. 将之前的root中的控制移动到App中
4. 在root中使用react-router加载对应的页面即可
```
let Root = React.createClass({
    render() {
        return (
            <Router history={hashHistory}>
                <Route></Route>
            </Router>
        );
    }
});
```
5. Route是可以嵌套，这样就可以实现组件切换的时候只更新页面局部的内容
6. 顶部是一个header组件，所有的页面都有，只需要更新header下面的内容
7. 最上面的Route是一个顶级的App的组件
8. 需要一个默认展示的页面IndexRoute
```
<Router history={hashHistory}>
    <Route path="/" component={App}>
        <IndexRoute component={Player}></IndexRoute>
        <Route path="/list" component={MusicList}></Route>
    </Route>
</Router>
```
9. 在App组件中的渲染部分可以看出，开始是写死的一个页面，需要动态替换成对应url规则下的一个Route指定一个组件
10. `this.props.children`是匹配App下面的子组件下匹配到的component，默认进入的话就是匹配IndexRoute
11. 之前页面是需要一些参数的传入的，需要使用`React.cloneElement(克隆哪个组件，需要传入的参数的赋值)`
12. 将state中所有的属性都传递过去，最后React进行操作的时候，会将key，value循环出来，对应的赋给组件，要保证值要一致
13. 用大括号包括起来表示是一个可执行的一个表达式
```
render() {
    return (
        <div>
            <Header />
            { React.cloneElement(this.props.children, this.state) }
        </div>
    );
},
```

### 链接形式跳转
1. 在player组件中有一个连接需要跳转
2. 导入Link
```
import { Link } from 'react-router'

<Link to="/list">我的私人音乐坊 &gt;</Link>
```

### 组件通信
1. 可以利用事件的回调，来想父级元素传递数据，但是这边层级比较深
2. 如果这样实现后期的代码将变得不好维护
3. 使用事件订阅的一种方式来解决
4. 有一个全局事件的管理器，比如说我们点击删除按钮的时候，发送一个事件出去，表示我们删除这个按钮
5. 在其他地方只要订阅了这个事件部分就可以监听到这个事件，这样就可以对事件进行处理，这样就不用一层一层的调用
6. 首先在musiclistitem中有两个操作，点击每一项播放音乐，第二个是点击删除按钮让它删除音乐
7. 要使用的事件订阅的插件是`pubsub-js`
8. 先引入插件依赖
```
import Pubsub from 'pubsub-js'
```
9. 有了事件管理器，在list的每一项上加上一个点击事件
10. onClick赋给它的应该是一个函数的句柄，而不是一个可执行的函数，需要使用bind来进行传参，绑定作用域是this，参数就是musicItem
11. 同样在删除按钮上也进行一个这样的操作
12. 这样我们只需要在具体的函数中发送一个事件出去，让事件的订阅者进行处理
13. 外层的每一项绑定一个click，删除又绑定了一个，删除的操作是嵌套在每一项的下面的，每一次点击删除按钮的时候因为冒泡的原因，也会将事件传到li上
14. 点击删除的时候同时会触发音乐播放的事件，需要将事件冒泡静止掉
```
let MusicListItem = React.createClass({
    playMusic(musicItem) {
        Pubsub.publish('PLAY_MUSIC', musicItem);
    },
    deleteMusic(musicItem, e) {
        e.stopPropagation();
        Pubsub.publish('DELETE_MUSIC', musicItem);
    },
    render() {
        let musicItem = this.props.musicItem;
        return (
            <li onClick={this.playMusic.bind(this, musicItem)} className={`components-musiclistitem row ${this.props.focus ? 'focus': ''}`}>
                <p><strong>{musicItem.title}</strong> - {musicItem.artist}</p>
                <p onClick={this.deleteMusic.bind(this, musicItem)} className="-col-auto delete"></p>
            </li>
        );
    }
});
```
15. 在App中去监听这两个事件
16. 先引入`pubsub-js`
17. 在componentDidMount中设置一个订阅器
```
Pubsub.subscribe('PLAY_MUSIC', (msg, musicItem)=>{});
Pubsub.subscribe('DELETE_MUSIC', (msg, musicItem)=>{});
```
18. 有事件绑定一定要记得解绑
```
componentWillUnMount() {
    Pubsub.unsubscribe('PLAY_MUSIC');
    Pubsub.unsubscribe('DELETE_MUSIC');
}
```
19. 首先实现删除一个music，只需要更新musicList
20. musicList进行一个过滤，将当前点击的元素过滤掉
```
Pubsub.subscribe('PLAY_MUSIC', (msg, musicItem)=>{
    this.setState({
        musicList: this.state.musicList.filter(item=>{
            return item !== musicItem;
        })
    });
});
```
21. 需要单独将一个播放音乐的方法提出来
```
playMusic(musicItem) {
    $('#player').jPlayer('setMedia', {
        mp3: musicItem.file
    }).jPlayer('play');
    // 将组件的数据状态更新下
    this.setState({
        currentMusicItem: musicItem
    });
},

componentDidMount() {
    $('#player').jPlayer({
        supplied: 'mp3',// 支持的格式
        wmode: 'window'
    });
    this.playMusic(this.state.currentMusicItem);
    ...
}
```
22. 监听的事件中也需要调用这个方法
```
Pubsub.subscribe('PLAY_MUSIC', (msg, musicItem)=>{
    this.playMusic(musicItem);
});
```
23. 音乐播放结束之后需要切换到下一曲
```
$('#player').bind($.jPlayer.event.ended, (e)=>{
    this.playNext();
});
```
24. 要记得解绑
```
componentWillUnMount() {
    Pubsub.unsubscribe('PLAY_MUSIC');
    Pubsub.unsubscribe('DELETE_MUSIC');
    $('#player').unbind($.jPlayer.event.ended);
}
```
25. 需要先找到播放音乐的索引
```
findMusicIndex(musicItem) {
    return this.state.musicList.indexOf(musicItem);
},
```
26. 上一首和下一首逻辑
```
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
```
27. 将上一曲下一曲的事件订阅加上
```
<i className="icon prev" onClick={this.playPrev}></i>
<i className="icon next ml20" onClick={this.playNext}></i>

playPrev() {
    Pubsub.publish('PLAY_PREV');
},
playNext() {
    Pubsub.publish('PLAY_NEXT');
},
```
28. 在root中也要相应的实现监听
```
Pubsub.subscribe('PLAY_PREV', (msg)=>{
    this.playNext('prev');
});
Pubsub.subscribe('PLAY_NEXT', (msg)=>{
    this.playNext();
});

Pubsub.unsubscribe('PLAY_PREV');
Pubsub.unsubscribe('PLAY_NEXT');
```

### 剩余时间控制
1.`leftTime: ''`
2. 在每次时间更新的时候去维护时间
```
this.setState({
    volume: e.jPlayer.options.volume * 100,
    progress: e.jPlayer.status.currentPercentAbsolute,
    leftTime: duration * (1 - e.jPlayer.status.currentPercentAbsolute / 100)
});
```
3. 页面输出
```
<div className="left-time -col-auto">-{this.state.leftTime}</div>
```
4. 时间格式化
```
formatTime(time) {
    time = Math.floor(time);
    let miniutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);
    // 对秒数的处理
    seconds = seconds < 10 ? `0${seconds}` : seconds;
    return `${miniutes}:${seconds}`
},

leftTime: this.formatTime(duration * (1 - e.jPlayer.status.currentPercentAbsolute / 100))
```

### 列表页删除当前正在播放的歌曲时，播放页仍然在播放刚刚删除的歌曲
1. 在DELETE_MUSIC做一个处理
```
if(this.state.currentMusicItem === musicItem){
    this.playNext();
}
```
