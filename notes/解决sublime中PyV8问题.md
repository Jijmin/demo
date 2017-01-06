### 解决sublime中PyV8问题
解决Sublime提示 Sublime Text Error while loading PyV8 binary:exit code 1 Try to manually install Pyv8 form https://github.com/emetio/pyv8-binaries
#### 去gihub下载 PyV8,连接地址：https://github.com/emmetio/pyv8-binaries#readme

#### 然后找到你的Sublime_text_3的packages的安装包路径
- 如果你是windows系统：解压文件至Packages\PyV8文件夹内(Preferences – Browser Packages)，重启解决。
-  如果你是linux/ubuntu,找到相应的路径，根据我在unbuntu14.04下面，解决如下：
    + 在当前用户中使用命令:ll
    + 你会发现一个.config的隐藏文件夹
    + 然后依次进去找到sublime_text
    + Packages创建PyV8文件夹，把刚才下载的文件解压进去，重启解决。
