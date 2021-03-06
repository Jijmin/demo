### 开发流程
1. 需求方案(客户、市场、产品等等)
2. 产品方案(产品经理PM，Product manager)
3. 产品评审(全体人员)，根据讨论结果会在方案与评审中徘徊
4. 确定方案(准备各干各活)
5. 技术调研(全体人员，要完成该功能赢如何处理，学新知识等)
6. 确定排期(安排时间，与前后配合协调，测试)
7. 进行开发(项目结构搭建)
8. 各开组分工(前端部门，后台部门等)
9. 对接口(前端与后端人员联调，前端与UI对接)
10. 部署测试服务器(运维，QA等，需要程序员解决bug)
11. 线上部署(前端构建：代码压缩，文件重组，资源合并)
12. 产品迭代

### shell与vim
流行框架的知识点由两部分组成
- git与工具
- angular

### git与工具
1. 基本的Linux命令
2. 基本的vim操作
3. git的使用
4. 构建工具gulp的使用

### 操作系统的发展史
1. 巨型机
2. 批处理机
3. MULTICS
4. Unix
5. DOS
6. Windows与Mac OS

### cmd和powershell的区别
powershell的权限比cmd要大

### 命令行本质
1. 在命令行中键入一个命令，回车执行，实际上就是通知shell去执行硬盘上的一个程序，这个命令名就是程序的名字
2. 当在命令行键入一个命令的时候，会先首先在当前目录(文件夹)下找是否有这个程序，如果没有，就会在一个叫做系统的变量的变量中存储的路径，看这些路径中是否有这个命令的程序
3. 命令行的搜索路径存储在系统的Path环境变量下，如果需要查看或修改访问
我的电脑->右键->属性->高级->环境变量
切记不要修改里面的数据
如果修改环境变量，需要重启命令行

### Windows命令
1. mkdir 文件夹名：创建文件夹
2. md a b c d： 批量创建文件夹
3. cd：就是打开文件夹的意思，一般文件夹又称为目录(directory)->change directory
4. ../：上一级目录
5. ./：当前目录
6. \r \n 回车，Linux下直接是\n

### 命令行界面介绍
~:家(home)目录
$:命令输入区

### 知识点分类
增，删，改，查，其他

### 入门标准
1. 所有的关键字语法
2. 字符串操作
3. 集合(collection)操作(数组，键值对)
4. 文件操作

### shell命令基础
```
命令的一般格式 $ 命令名[选项][参数]
```
1. cd 目录的路径
2. ls list列表，列出当前目录下的所有可视文件
在Linux中所有的操作都要求可以简化，所以一般选项都带有短名字，如果使用一个减号，连接就是短名字，如果使用两个减号，连接就是长名字
ls -a
ls还可以带有参数，如果再乱说后面加上目录名，表示显示该目录下的数据

### 字、字节、字符
1. ascii码
2. 双字节码
3. unicode码 凡是字符都用两个字节表示
4. utf格式：utf-8 编码 缺点：所有中文字都是3个字节
基本上不考虑其他问题，凡是一个字，

### 常用命令
1. 文件夹或文件的操作
- cd
- ls
- pwd 打印当前文件夹路径
- mkdir 创建文件夹
- touch 创建文件
- rm 删除文件
rm *删除所有文件 rm *.txt删除所有的文本文件
- rmdir 删除文件夹(只能删除空的文件夹)
- rm -rf 文件夹名 可以将有文件的文件夹删除
2. 复制与移动的操作
- cp 文件1 文件夹  复制文件/文件夹
- mv 要移动的文件/文件夹 移动文件夹的位置(如果移动文件夹的位置没有，就改名)
- wc word count 统计字的个数
- cat 文件名   功能：将文件与终端相连，意味着将文件的内容显示在终端中
- less 显示文件，只显示一部分
- more 在Windows上不能使用，在Linux上有百分比，也是一行行的输出
- head 显示默认的显示前10行 -11可以将第11行输出
- tail 倒数十行
tail -f 1.txt可以实时的监视文件
- history 查看历史命令
- `>`重定向将左边命令的结果写入到右边的文件中，会覆盖
- '>>'追加
- echo 文件 要写入的东西 将文字书写到文件中

### 将文件合并
1. 先写好文件utf-8
2. 在bush打开
3. cat 1.txt
4. cat 2.txt
5. cat 1.txt 2.txt
6. cat *.txt>index.txt

### vim编辑器
1. 在控制台输入vim就可以进入vim编辑器
2. :q 退出vim编辑器
3. vim编辑器是有多种状态的
- 命令模式，输入模式，底行模式
- 命令模式，输入模式
4. 要进行操作，需要敲入i，就可以进行编辑
5. 要退出编辑模式，按ESC
6. 如果在i的时候输入了内容,ESC后就要用:wq先保存再退出
7. 不清楚什么模式，最好敲ESC
8. :extension 扩展命令模式

### ex命令
:w           保存
:w 文件名     另存为
:!           强制执行web:jiangkun.org/itcast/web/gittools

### Shell命令
- 增 >,>>,touch,vim,mkdir,cp
- 删 rm,rmdir,rm -rm
- 改 mv
- 查 list,cat,head,tail,more,less

### 版本控制工具
- 字面：就是用于管理维护(每次更新、修改，增加，删除，多人开发、合并冲突等)源代码的工具
- 版本控制工具的分类：
1. 本地管理
  版本过多不利于维护查找(记录每次修改)
  不利于团队协作，不方便分发代码
2. 集中管理(基于服务器)SVN(subversion)
3. 分布式管理：凡是涉及到分布的概念，就是将复杂的集中式计算分发给个体计算最后合并

## git

### git 的工作原理

1. 在git项目中，含有一个本地数据库，会记录每一次对代码的修改(新增，删除，修改，合并...)
2. git的操作一般包含
- 加入修改(加入到git所提供的缓存中，并没有真正的记录下来)
将程序员对代码做的调整告诉git，让git去记录用户的修改`git add .`
- 提交修改(真正的修改)
就是将程序员的当前修改全部保存到git所提供的数据库中
3. git将一个项目分成三个部分
- 工作区
- 缓存区
- git仓库
4. 完整的git管理来学习基本的git命令
- 初始化一个仓库`git init`
- 在工作区编写代码
- 告诉git来管理所有的代码`git add .`
- 告诉git在数据库`git commit -m '消息'`
- 回退到某一个版本`git reset --hard SHA1值`
- 其他命令`git status`,`git log`,`git reflog`
5. git的核心原理
6. 配置信息
`git config user.name '...'`
`git config user.email '...'`
--global 表示全局，也就是说只要是使用该计算机来操作git那么就默认使用该用户名与邮箱
不带，表示局部，意味着使用文件夹作为单位，用户名与邮箱只在文件夹中使用
如果一台计算机中同时都有，局部优先级较高
如果使用的是全局设置用户信息，那么就会在家目录下生成一个.gitconfig文件，里面存储指定信息
7. 分支(branch)
- 什么时候需要使用分支
  1. 凡是涉及到对代码不安全操作的任何操作，都应该对代码进行分支处理
  2. 创建新的分支，在保证新的分支完成没有问题的时候，在与主分支合并，可以将新分支删除
- 不安全操作
  1. 所谓不安全操作，不是指不好的操作，而是说会将代码进行修改，而对当前状态发生变化的操作
- 一般情况在企业中
  1. 一个项目经理会创建一个项目仓库，然后所有的程序员被非配代码开发
  2. 项目经理(主程，老大)设计仓库，创建master分支，然后创建developer分支(debug分支等)
  3. 每一个程序员的developer分支上开发，每一个程序员自己还有维护分支
  4. 程序员将代码处理完毕后，提交合并总结
  5. 然后老大会安排测试，如果没有问题，再和master合并
- 实际操作
1. 查看分支：`git branch`，当前分支会标有一个星号
2. 创建分支：`git branch 分支名`
3. 切换分支：`git checkout 分支名`
4. 合并分支：`git merge 分支名`，将分支与当前分支合并
5. 删除分支：`git branch -d 分支名`
>在分支上面添加文件，直接切换回主分支，有新创建的文件，因为在分支上新创建的文件还没有人来管理，所有，主分支上也会有反应

9. 远程仓库
- 在自己的计算机中利用文件夹模拟远程结构
  1. 登录到服务器`cd ../services/`
  2. 创建一个空的仓库`git init --bare`
  3. 将服务器上的仓库拉下来`git clone ../services/`
  4. 进去仓库，进行开发
  5. 进行提交
  6. 上传到服务器`git push ../../services master`
  7. 另一个人在他的基础上修改了，提交了
  8. 第一次修改的人再次上线，需要将文件拉下来`git pull ../services master`
  9. 会有修改信息提示给你
  10. 可以回退到自己的版本`git log`
- 用git.orgchina.net来实现下