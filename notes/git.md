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
### 远程仓库
1. 注册一个githup网站，可以免费获得一个git远程仓库
2. 本地git仓库和githup仓库之间时通过SSH加密的
3. 在你电脑的用户主目录下(C:\Users\Administrator)看看有没有.ssh目录
4. 如果有.ssh目录，看看这个目录下有没有id_rsa和id_rsa.pub这两个文件
5. 如果有可以直接跳到下一步
6. 如果没有打开git Bash(shell)创建ssh key：
```
$ ssh-keygen -t rsa -C "youremail@example.com"
```
7. 登录githup，打开"Account settings"
8. 点“Add SSH Key”，填上任意Title，在key文本框里黏贴id_rsa.pub(公钥)文件的内容
9. 可以有多个key，只要把每个电脑的key都添加到githup，就可以在每台电脑上提交
10. githup上的公开的，可以交钱，变成私有的，另一个办法就是自己搭建git服务器
### 添加远程库
1. 在githup上创建一个仓库，并且让那个仓库和你本地的仓库进行同步
2. 这样，githup上的仓库既可以作为备份，又可以让其他人通过仓库来协作
3. 在githup上面`New repository`创建一个新仓库
4. $ git remote add origin githup上提供的ssh地址
5. 就可以把本地库的所有内容推送到远程库上
```
$ git push -u origin master
```
6. 前面的步骤都正确的情况，如果不成功有可能是网速的问题，建议多试几次
7. 把本地库的内容推送到远程，用`git push`命令，实际上是把当前分支`master`推送到远程
8. 由于远程是空的，我们第一次推送`master`分支时，加上`-u`
参数
9. git不但会把本地的master分支内容推送的远程新的master分支，还会把本地的master分支和远程的master分支关联起来
10. 关联好了之后，只要在本地做了提交，就可以通过简化命令来提交
```
$ git push origin master
```
### SSH警告
当你第一次使用Git的clone或者push命令连接GitHub时，会得到一个警告：
```
The authenticity of host 'github.com (xx.xx.xx.xx)' can't be established.
RSA key fingerprint is xx.xx.xx.xx.xx.
Are you sure you want to continue connecting (yes/no)?
```
这是因为Git使用SSH连接，而SSH连接在第一次验证GitHub服务器的Key时，需要你确认GitHub的Key的指纹信息是否真的来自GitHub的服务器，输入yes回车即可。
这个警告只会出现一次，后面的操作就不会有任何警告了。
### 从远程库克隆
克隆一个本地本地库
```
$ git clone githup上的ssh地址
```
githup还有一个https地址，也支持https协议，只是比较慢
### 分支管理
创建一个属于自己的分支，可以继续在原来的分支上继续工作，想提交就提交，直到开发完毕，再一次性合并到原来的分支上
### 创建与合并分支
主线:master
当前分支：HEAD
创建分支
```
$ git checkout -b dev
Switched to a new branch 'dev'
```
`git checkout`命令上加上`-b`参数表示创建并切换，相当于以下两条命令
```
$ git branch dev
$ git checkout dev
Switched to branch 'dev'
```
然后，用`git branch`命令查看当前分支
```
$ git branch
* dev
  master
```
会列出所有的分支，当前的分支前面有一个*
我们可以继续对我们要修改的内容进行修改,提交
当我们修改好了，dev分支的工作完成，我们就切换回master分支
```
$ git checkout master
Switched to branch 'master'
Your branch is up-to-date with 'origin/master'.
```
切换回master分支后，再查看文件，是原来没有修改的文件，因为修改的在dev分支上，而master上的提交并没有变
现在我们需要将dev分支合并到master分支上：
```
$ git merge dev
Updating 2b3873a..05b18a0
Fast-forward
 README.md | 2 +-
 1 file changed, 1 insertion(+), 1 deletion(-)
```
`git merge`命令用于合并指定分支到当前分支
上面的`Fast-forward`信息，是一个'快进模式'，也就是直接把master指向dev的当前提交，所以合并速度非常快
合并完成后，就可以删除dev分支
```
$ git branch -d dev
Deleted branch dev (was 05b18a0).
```
### 解决冲突
1. 新开辟一个分支
```
$ git checkout -b feature1
```
2. 开辟后在修改文件的情况下，在feature1分支上提交
3. 再切换到master分支上时
4. git会自动提示我们当前的master分支比远程的master分支要超前1个提交
5. 再次修改文件
6. 进行提交
7. master和feature1分支各有自己的新提交
8. git无法进行'快速合并'，只能试图把各自的修改合并起来，但是这种合并有冲突
```
$ git merge feature1
Auto-merging README.md
CONFLICT (content): Merge conflict in README.md
Automatic merge failed; fix conflicts and then commit the result.
```
9. 必须手动解决冲突后再提交，在文件中手动修改
10. 再提交
11. 可以用带参数的`git log`来看到分支合并的情况
```
$ git log --graph --pretty=oneline --abbrev-commit
* 995dbd2 add
* 05b18a0 branch test
* 2b3873a first commit
```
12. 最后删除feature1分支
```
$ git branch -d feature1
Deleted branch feature1 (was 75a857c).
```
### 分支管理策略
在`Fast forward`模式下时，删除分支后，会丢掉分支信息，如果要强制禁用`Fast forward`模式，git就会在merge时生成一个新的commit，这样就可以从分支历史上看出分支信息
1. 创建并切换dev分支
```
$ git checkout -b dev
```
2. 修改README.md文件
3. 切换回master
```
$ git checkout master
```
4. 准备合并dev分支，请注意`--no-ff`参数，表示禁用`Fast forward`
```
$ git merge --no-ff -m 'merge with no-ff' dev
Already up-to-date.
```
5. 因为本次合并要创建一个新的commit，所以加上-m参数，把commit描述写进去
6. 合并后，我们用`git log`看看分支历史
```
$ git log --graph --pretty=oneline --abbrev-commit
* 995dbd2 add
* 05b18a0 branch test
* 2b3873a first commit
```
##### 分支策略
1. master分支应该是非常稳定的，也就是仅用来发布新版本，平时不能在上面干活
2. 干活都在dev分支上，也就是说，dev分支是不稳定的，到某个时候，比如1.0版本发布时，再把dev分支合并到master上，在master分支发布1.0版本；
### Bug分支
你在自己的dev分支上工作，有一个bug需要解决，不提交自己的dev分支，而是用bug分支
git中提供了一个`stash`功能，可以把当前的工作现场'储存'起来，等以后恢复现场后继续工作
```
$ git stash
Saved working directory and index state WIP on dev: 995dbd2 add
HEAD is now at 995dbd2 add
```
现在，用`git status`查看工作区，就是干净的（除非有没有被Git管理的文件），因此可以放心地创建分支来修复bug。
首次要确定要在哪个分支上修改bug，假定需要在master分支上修复，就从master创建临时分支
```
$ git checkout master
$ git checkout -b issue-101
```
现在修复bug
```
$ git add  README.md
$ git commit -m "fix bug 101"
```
修复完成后，切换到master分支，并完成合并，最后删除issue-101分支
```
$ git checkout master
$ git merge --no-ff -m 'merged bug fix 101' issue-101
$ git branch -d issue-101
```
可以回到dev分支上工作
```
$ git checkout dev
```
工作区是干净的，用`git stash list`命令来查看存储的工作现场
```
$ git stash list
stash@{0}: WIP on dev: 995dbd2 add
```
工作现场还在，Git把stash内容存在某个地方了，但是需要恢复一下，有两个办法
一是用`git stash apply`恢复，但是恢复后，stash内容并不删除，你需要用`git stash drop`来删除；
另一种方式是用`git stash pop`，恢复的同时把stash内容也删了
```
$ git stash pop
On branch dev
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

        modified:   README.md

no changes added to commit (use "git add" and/or "git commit -a")
Dropped refs/stash@{0} (c1c338a4c94bd9477ff8d7f0b0d1058228c08ca7)
```
再用git stash list查看，就看不到任何stash内容了
```
$ git stash list
```
你可以多次stash，恢复的时候，先用git stash list查看，然后恢复指定的stash，用命令
```
$ git stash apply stash@{0}
```
### Feature分支
添加一个新功能时，不能要实验性代码将主分支搞乱了，所以没添加一个功能，最好新建一个feature分支，完成后合并，最后删除该分支
1. 新创建一个分支`feature-vulcan`
```
$ git checkout -b feature-vulcan
```
2. 开发完毕
```
$ git add vulcan.py
$ git status
# On branch feature-vulcan
# Changes to be committed:
#   (use "git reset HEAD <file>..." to unstage)
#
#       new file:   vulcan.py
#
$ git commit -m "add feature vulcan"
[feature-vulcan 756d4af] add feature vulcan
 1 file changed, 2 insertions(+)
 create mode 100644 vulcan.py
```
3. 切换回dev，准备合并
```
$ git checkout dev
```
4. 但是要将`feature-vulcan`分支销毁
```
$ git branch -d feature-vulcan
error: The branch 'feature-vulcan' is not fully merged.
If you are sure you want to delete it, run 'git branch -D feature-vulcan'.
```
销毁失败。Git友情提醒，feature-vulcan分支还没有被合并，如果删除，将丢失掉修改，如果要强行删除，需要使用命令`git branch -D feature-vulcan`。
### 多人协作
当你从远程仓库克隆时，实际上Git自动把本地的master分支和远程的master分支对应起来了，并且，远程仓库的默认名称是origin。
要查看远程库的信息，用git remote：
```
$ git remote
origin
```
或者，用git remote -v显示更详细的信息
```
$ git remote -v
origin  git@github.com:Jijmin/theoreticalKnowledge.git (fetch)
origin  git@github.com:Jijmin/theoreticalKnowledge.git (push)
```
上面显示了可以抓取和推送的origin的地址。如果没有推送权限，就看不到push的地址。
##### 推送分支
推送分支，就是把该分支上的所有本地提交推送到远程库。推送时，要指定本地分支，这样，git就会把该分支推送到远程对应的远程分支上
```
$ git push origin master
```
如果要推送其他分支，比如dev，就改成
```
$ git push origin dev
```
但是，并不是一定要把本地分支往远程推送，那么，哪些分支需要推送，哪些不需要呢？
- master分支是主分支，因此要时刻与远程同步；
- dev分支是开发分支，团队所有成员都需要在上面工作，所以也需要与远程同步；
- bug分支只用于在本地修复bug，就没必要推到远程了，除非老板要看看你每周到底修复了几个bug；
- feature分支是否推到远程，取决于你是否和你的小伙伴合作在上面开发。
##### 抓取分支
多人协作时，大家都会往master和dev分支上推送各自的修改。
1. 克隆到另一个目录下
```
$ git clone git@github.com:Jijmin/theoreticalKnowledge.git
```
2. 在克隆下来的文件夹中，只能看到master分支
```
$ git branch
* master
```
3. 现在，你的小伙伴要在dev分支上开发，就必须创建远程origin的dev分支到本地，于是他用这个命令创建本地dev分支
```
$ git checkout -b dev origin/dev
```
4. 他在dev上修改，然后push到远程上
5. 同时你也做了对相同的文件进行了操作，并试图推送
6. 推送失败，因为你的小伙伴的最新提交和你试图推送的提交有冲突
```
To git@github.com:Jijmin/theoreticalKnowledge.git
 ! [rejected]        dev -> dev (fetch first)
error: failed to push some refs to 'git@github.com:Jijmin/theoreticalKnowledge.git'
hint: Updates were rejected because the remote contains work that you do
hint: not have locally. This is usually caused by another repository pushing
hint: to the same ref. You may want to first integrate the remote changes
hint: (e.g., 'git pull ...') before pushing again.
hint: See the 'Note about fast-forwards' in 'git push --help' for details.
```
7. 先用git pull把最新的提交从origin/dev抓下来，然后，在本地合并，解决冲突，再推送
```
$ git pull
remote: Counting objects: 3, done.
remote: Total 3 (delta 0), reused 3 (delta 0), pack-reused
Unpacking objects: 100% (3/3), done.
From github.com:Jijmin/theoreticalKnowledge
   995dbd2..dbeacf6  dev        -> origin/dev
There is no tracking information for the current branch.
Please specify which branch you want to merge with.
See git-pull(1) for details.

    git pull <remote> <branch>

If you wish to set tracking information for this branch you can do so with:

    git branch --set-upstream-to=origin/<branch> dev
```
8. git pull也失败了，原因是没有指定本地dev分支与远程origin/dev分支的链接，根据提示，设置dev和origin/dev的链接
```
$ git branch --set-upstream dev origin/dev
The --set-upstream flag is deprecated and will be removed. Consider using --track or --set-upstream-to
Branch dev set up to track remote branch dev from origin.
```
9. 再pull
```
$ git pull
Auto-merging README.md
CONFLICT (content): Merge conflict in README.md
Automatic merge failed; fix conflicts and then commit the result.
```
这回git pull成功，但是合并有冲突，需要手动解决，解决的方法和分支管理中的解决冲突完全一样。解决后，提交，再push
因此，多人协作的工作模式通常是这样：
1. 首先，可以试图用`git push origin branch-name`推送自己的修改；
2. 如果推送失败，则因为远程分支比你的本地更新，需要先用`git pull`试图合并；
3. 如果合并有冲突，则解决冲突，并在本地提交；
4. 没有冲突或者解决掉冲突后，再用`git push origin branch-name`推送就能成功！
5. 如果`git pull`提示“no tracking information”，则说明本地分支和远程分支的链接关系没有创建，用命令`git branch --set-upstream branch-name origin/branch-name`。
### 标签管理
发布一个版本时，我们通常先在版本库中打一个标签（tag），这样，就唯一确定了打标签时刻的版本。将来无论什么时候，取某个标签的版本，就是把那个打标签的时刻的历史版本取出来。所以，标签也是版本库的一个快照。
Git的标签虽然是版本库的快照，但其实它就是指向某个commit的指针（跟分支很像对不对？但是分支可以移动，标签不能移动），所以，创建和删除标签都是瞬间完成的。
### 创建标签
在Git中打标签非常简单，首先，切换到需要打标签的分支上
```
$ git branch
* dev
  master
$ git checkout master
Switched to branch 'master'
```
然后，敲命令`git tag <name>`就可以打一个新标签
```
$ git tag v1.0
```
可以用命令git tag查看所有标签
```
$ git tag
v1.0
```
默认标签是打在最新提交的commit上的。有时候，如果忘了打标签，比如，现在已经是周五了，但应该在周一打的标签没有打，怎么办？
方法是找到历史提交的commit id，然后打上就可以了
```
$ git log --pretty=oneline --abbrev-commit
6e1084f merged bug fix 101
7fb36af fix bug 101
995dbd2 add
05b18a0 branch test
2b3873a first commit
```
比方说要对add merge这次提交打标签，它对应的commit id是6224937，敲入命令
```
$ git tag v0.9 6224937
```
注意，标签不是按时间顺序列出，而是按字母排序的。可以用`git show <tagname>`查看标签信息
```
$ git show v0.9
commit 995dbd28207972137cb4f19b46ec2d0f5a371e9f
Author: Jijmin <503004784@qq.com>
Date:   Tue Nov 1 10:28:39 2016 +0800

    add

diff --git a/README.md b/README.md
index 39600e0..2a5bf4c 100644
--- a/README.md
+++ b/README.md
@@ -1 +1,2 @@
-# <C0><ED><C2><DB>??
\ No newline at end of file
+# 理论知识
+## 硬知识
```
还可以创建带有说明的标签，用-a指定标签名，-m指定说明文字
```
$ git tag -a v0.1 -m 'version 0.1 released' 05b18a0
```
还可以通过-s用私钥签名一个标签
```
$ git tag -s v0.2 -m "signed version 0.2 released" fec145a
```
签名采用PGP签名，因此，必须首先安装gpg（GnuPG），如果没有找到gpg，或者没有gpg密钥对，就会报错，请参考GnuPG帮助文档配置Key。
### 操作标签
如果标签打错了，也可以删除
```
$ git tag -d v0.1
Deleted tag 'v0.1' (was 2587dd2)
```
因为创建的标签都只存储在本地，不会自动推送到远程。所以，打错的标签可以在本地安全删除。
如果要推送某个标签到远程，使用命令`git push origin <tagname>`
```
$ git push origin v1.0
```
或者，一次性推送全部尚未推送到远程的本地标签
```
$ git push origin --tags
```
如果标签已经推送到远程，要删除远程标签就麻烦一点，先从本地删除
```
$ git tag -d v0.9
```
然后，从远程删除。删除命令也是push，但是格式如下
```
$ git push origin :refs/tags/v0.9
```
要看看是否真的从远程库删除了标签，可以登陆GitHub查看。
### 自定义Git
让Git显示颜色，会让命令输出看起来更醒目
```
$ git config --global color.ui true
```
### 忽略特殊文件
在Git工作区的根目录下创建一个特殊的.gitignore文件，然后把要忽略的文件名填进去，Git就会自动忽略这些文件。
不需要从头写.gitignore文件，GitHub已经为我们准备了各种配置文件，只需要组合一下就可以使用了。所有配置文件可以直接在线浏览：https://github.com/github/gitignore
忽略文件的原则是：
- 忽略操作系统自动生成的文件，比如缩略图等；
- 忽略编译生成的中间文件、可执行文件等，也就是如果一个文件是通过另一个文件自动生成的，那自动生成的文件就没必要放进版本库，比如Java编译产生的.class文件；
- 忽略你自己的带有敏感信息的配置文件，比如存放口令的配置文件。

以上文章参考廖雪峰git教程，文章地址如下：
http://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000