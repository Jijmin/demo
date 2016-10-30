### 安装git
#### 在Linux上安装git
输入git命令，查看系统有没有安装git
```
$ git
The program 'git' is currently not installed. You can install it by typing:
sudo apt-get install git
```
如果你碰巧用Debian或Ubuntu Linux，通过一条`sudo apt-get install git`就可以直接完成Git的安装。
老一点的Debian或Ubuntu Linux，要把命令改为`sudo apt-get install git-core`
如果是其他Linux版本，可以直接通过源码安装。先从Git官网下载源码，然后解压，依次输入：./config，make，sudo make install这几个命令安装就好了。
#### 在Mac OS X上安装Git
1. 安装homebrew，然后通过homebrew安装Git，具体方法请参考homebrew的文档：http://brew.sh/。
2. 直接从AppStore安装Xcode，Xcode集成了Git，不过默认没有安装，你需要运行Xcode，选择菜单“Xcode”->“Preferences”，在弹出窗口中找到“Downloads”，选择“Command Line Tools”，点“Install”就可以完成安装了。
#### 在Windows上安装Git
msysgit是Windows版的Git，从https://git-for-windows.github.io下载（网速慢的同学请移步国内镜像），然后按默认选项安装即可。
安装完成后，在开始菜单里找到“Git”->“Git Bash”，蹦出一个类似命令行窗口的东西，就说明Git安装成功！
安装完成后，还需要最后一步设置，在命令行输入：
```
$ git config --global user.name "Your Name"
$ git config --global user.email "email@example.com"
```
git config命令的--global参数，用了这个参数，表示你这台机器上所有的Git仓库都会使用这个配置，当然也可以对某个仓库指定不同的用户名和Email地址。
### 创建版本库
- 选择一个合适的地方，创建一个空目录
```
$ mkdir learngit
$ cd learngit
$ pwd
/Users/michael/learngit
```
`pwd`命令用于显示当前目录。在我的Mac上，这个仓库位于`/Users/michael/learngit`。
如果你使用Windows系统，为了避免遇到各种莫名其妙的问题，请确保目录名（包括父目录）不包含中文。
最好通过物理创建方式创建一个文件夹，就是在需要创建的地方创建一个文件夹，然后通过鼠标右键
- Windows上最好通过物理创建方式创建一个文件夹，就是在需要创建的地方创建一个文件夹，然后通过鼠标右键选择`git bush here`进入git bush
- 通过`git init`命令把这个目录变成Git可以管理的仓库
```
$ git init
Initialized empty Git repository in /Users/michael/learngit/.git/
```
建立了一个空的仓库，文件夹目录下可能多了一个`.git`目录，不要轻易修改这个目录，这个目录是git来跟踪管理版本库的.
如果你没有看到.git目录，那是因为这个目录默认是隐藏的，在windows下的文件夹下按键盘的`Alt`键，文件夹上面会显示一个栏目，找到`工具`下面的`文件夹选项`的`查看`将`隐藏受保护的操作系统文件(推荐)`的勾去掉就可以看到隐藏的`.git`目录
- 把文件添加到版本库
Microsoft的Word格式是二进制格式，因此，版本控制系统是没法跟踪Word文件的改动的，前面我们举的例子只是为了演示，如果要真正使用版本控制系统，就要以纯文本方式编写文件。不要使用Windows自带的记事本编辑任何文本文件。
编写一个readme.txt文件
```
Git is a version control system.
Git is free software.
```
一定要放到我们的仓库目录下，把一个文件放到git仓库只需要两步。
1. 用命令git add告诉Git，把文件添加到仓库
```
$ git add readme.txt
```
执行上面的命令，没有任何显示，这就对了，Unix的哲学是“没有消息就是好消息”，说明添加成功。
2. 用命令git commit告诉Git，把文件提交到仓库
```
$ git commit -m "wrote a readme file"
[master (root-commit) cb926e7] wrote a readme file
 1 file changed, 2 insertions(+)
 create mode 100644 readme.txt
```
-m后面输入的是本次提交的说明
git commit命令执行成功后会告诉你，1个文件被改动（我们新添加的readme.txt文件），插入了两行内容（readme.txt有两行内容）。
为什么Git添加文件需要add，commit一共两步呢？因为commit可以一次提交很多文件，所以你可以多次add不同的文件，比如：
```
$ git add file1.txt
$ git add file2.txt file3.txt
$ git commit -m "add 3 files."
```
### 时光机穿梭