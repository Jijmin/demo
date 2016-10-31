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
1. 用命令`git add`告诉Git，把文件添加到仓库
```
$ git add readme.txt
```
执行上面的命令，没有任何显示，这就对了，Unix的哲学是“没有消息就是好消息”，说明添加成功。
2. 用命令`git commi`t告诉Git，把文件提交到仓库
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
更改readme.txt中的内容
```
Git is a distributed version control system.
Git is free software.
```
通过`git status`查看当前仓库的状态
```
$ git status
On branch master
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

        modified:   readme.txt

no changes added to commit (use "git add" and/or "git commit -a")
```
该命令可以让我们时刻掌握仓库当前的状态，上面的命令告诉我们，readme.txt被修改了，但还没有准备提交的修改。
如果不记得上次对文件做了什么修改，需要用`git diff`来查看
```
$ git diff
diff --git a/readme.txt b/readme.txt
index d8036c1..380bce1 100644
--- a/readme.txt
+++ b/readme.txt
@@ -1,2 +1,2 @@
 Git is a version control system.
-Git is free software.
\ No newline at end of file
+Git is free software
```
从上面的命令可以看出我们在第二行中去掉了一个符号。知道我们的修改，我们就可以提交到仓库了，还是继续`git add`和`git commit`操作，在执行第二步之间使用`git status`来查看我们的状态
```
$ git status
On branch master
Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)

        modified:   readme.txt

```
上面命令告诉我们将要被提交的修改包括readme.txt，那么就可以执行`git commit`提交，再次使用`git status`
```
$ git status
On branch master
nothing to commit, working directory clean
```
git告诉我们没有需要提交修改的，工作区是干净的
### 版本回退
在git中可以使用`git log`命令来查看我们的历史记录，如果觉得输出的信息过多，可以加上`--pretty=oneline`
```
$ git log --pretty=oneline
95069c284f6c52998aeddd2529bfeed4f806d2c4 append GPL
30d3a7e54615e1d02d533d2850c173a61cbb4404 修改readme.txt
9776c8940136107b73edbefe907adc35470a961f 修改readme.txt
56bc5cc5ee7184ddf10e3a1eac4a649918937081 新建readme.txt
```
前面的一大串都是版本号，在git中`HEAD`表示当前版本
上一个版本就是`HEAD^`，上上个版本是`HEAD^^`
往上100个版本可以写成`HEAD~100`
使用`git reset`来是实现回退
```
$ git reset --hard HEAD^
HEAD is now at 30d3a7e 修改readme.txt
```
使用这种方式回退，最新的那个版本没有了，最后停留的位置是你回退的位置
解决办法：找到上面的那个版本的版本号就可以，版本号可以只写前几位
git提供了一个命令`git reflog`来记录你的每一次命令:
```
$ git reflog
9776c89 HEAD@{0}: reset: moving to 9776
56bc5cc HEAD@{1}: reset: moving to 56bc5
30d3a7e HEAD@{2}: reset: moving to HEAD^
95069c2 HEAD@{3}: commit: append GPL
30d3a7e HEAD@{4}: commit: 修改readme.txt
9776c89 HEAD@{5}: commit: 修改readme.txt
56bc5cc HEAD@{6}: commit (initial): 新建readme.txt
```
`git add`把文件修改添加到暂存区
`git commit`把暂存区的所有的内容提交到当前分支
现在对readme.txt文件进行修改，再添加一个license.txt文件,查看状态
```
On branch master
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

        modified:   readme.txt

Untracked files:
  (use "git add <file>..." to include in what will be committed)

        license.txt

no changes added to commit (use "git add" and/or "git commit -a")

```
git告诉我们readme.txt被修改，而license.txt从来没有被添加过，所以它的状态是`Untracked`
### 管理修改
如果修改了文件直接使用`git commit`进行提交，我们查看`git status`发现我们修改的并没有提交
```
On branch master
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

        modified:   readme.txt

no changes added to commit (use "git add" and/or "git commit -a")
```
git管理的是修改，当你使用`git add`命令后，在工作区的第一次修改被放入暂存区，准备提交，但是我们上面的修改并没有放入缓存区，所以，`git commit`只负责把暂存区的修改提交
提交后，用`git diff HEAD -- readme.txt`命令查看工作区和版本库里面最新的版本的区别
```
$ git diff HEAD -- readme.txt
diff --git a/readme.txt b/readme.txt
index db28b2c..a9c5755 100644
--- a/readme.txt
+++ b/readme.txt
@@ -1,4 +1,4 @@
 Git is a distributed version control system.
 Git is free software distributed under the GPL.
 Git has a mutable index called stage.
-Git tracks changes.
\ No newline at end of file
+Git tracks changes of files.
```
### 撤销修改
如果写错了，在你还没有提交的时候，你可以手动删掉，可以看到的状态是
```
On branch master
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

        modified:   readme.txt

no changes added to commit (use "git add" and/or "git commit -a")
```
git会告诉你，`git checkout -- file`可以丢弃工作区的修改，使用`$ git checkout -- readme.txt`命令，把readme.txt文件在工作区的修改全部撤销，这个命令可以让文件回到最近一次`git commit`或是`git add`时的状态,`git checkout -- file`命令中的--很重要，没有--，就变成了“切换到另一个分支”的命令
如果已经`git add`到暂存区，在commit之前修改，可以使用`git reset HEAD file`可以把暂存区的修改撤销，重新放回工作区
```
$ git reset HEAD readme.txt
Unstaged changes after reset:
M       readme.txt
```
git reset命令既可以回退版本，也可以把暂存区的修改回退到工作区。当我们用HEAD时，表示最新的版本。
再用git status查看
```
On branch master
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

        modified:   readme.txt

no changes added to commit (use "git add" and/or "git commit -a")
```
就可以丢弃工作区
```
$ git checkout -- readme.txt
```
### 删除文件
一般情况下，你通常直接在文件管理器中把没有用的文件删除，或者使用`rm`命令删除
```
$ rm test.txt
```
这个时候，git知道你删除了文件，因此工作区版本库就不一致了
```
$ git status
On branch master
Changes not staged for commit:
  (use "git add/rm <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

        deleted:    test.txt

no changes added to commit (use "git add" and/or "git commit -a")
```
两个选择，一是确实要删掉该文件，那就使用命令`git rm`删除，并且`git commit`
```
$ git rm test.txt
$ git commit -m "remove test.txt"
```
另一种就是删错了，把误删的文件恢复
```
$ git checkout -- test.txt
```
这其实是用版本库里的版本替换工作区的版本，无论工作区是修改还是删除，都可以“一键还原”。