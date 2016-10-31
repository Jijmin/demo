### ��װgit
#### ��Linux�ϰ�װgit
����git����鿴ϵͳ��û�а�װgit
```
$ git
The program 'git' is currently not installed. You can install it by typing:
sudo apt-get install git
```
�����������Debian��Ubuntu Linux��ͨ��һ��`sudo apt-get install git`�Ϳ���ֱ�����Git�İ�װ��
��һ���Debian��Ubuntu Linux��Ҫ�������Ϊ`sudo apt-get install git-core`
���������Linux�汾������ֱ��ͨ��Դ�밲װ���ȴ�Git��������Դ�룬Ȼ���ѹ���������룺./config��make��sudo make install�⼸�����װ�ͺ��ˡ�
#### ��Mac OS X�ϰ�װGit
1. ��װhomebrew��Ȼ��ͨ��homebrew��װGit�����巽����ο�homebrew���ĵ���http://brew.sh/��
2. ֱ�Ӵ�AppStore��װXcode��Xcode������Git������Ĭ��û�а�װ������Ҫ����Xcode��ѡ��˵���Xcode��->��Preferences�����ڵ����������ҵ���Downloads����ѡ��Command Line Tools�����㡰Install���Ϳ�����ɰ�װ�ˡ�
#### ��Windows�ϰ�װGit
msysgit��Windows���Git����https://git-for-windows.github.io���أ���������ͬѧ���Ʋ����ھ��񣩣�Ȼ��Ĭ��ѡ�װ���ɡ�
��װ��ɺ��ڿ�ʼ�˵����ҵ���Git��->��Git Bash�����ĳ�һ�����������д��ڵĶ�������˵��Git��װ�ɹ���
��װ��ɺ󣬻���Ҫ���һ�����ã������������룺
```
$ git config --global user.name "Your Name"
$ git config --global user.email "email@example.com"
```
git config�����--global���������������������ʾ����̨���������е�Git�ֿⶼ��ʹ��������ã���ȻҲ���Զ�ĳ���ֿ�ָ����ͬ���û�����Email��ַ��
### �����汾��
- ѡ��һ�����ʵĵط�������һ����Ŀ¼
```
$ mkdir learngit
$ cd learngit
$ pwd
/Users/michael/learngit
```
`pwd`����������ʾ��ǰĿ¼�����ҵ�Mac�ϣ�����ֿ�λ��`/Users/michael/learngit`��
�����ʹ��Windowsϵͳ��Ϊ�˱�����������Ī����������⣬��ȷ��Ŀ¼����������Ŀ¼�����������ġ�
���ͨ����������ʽ����һ���ļ��У���������Ҫ�����ĵط�����һ���ļ��У�Ȼ��ͨ������Ҽ�
- Windows�����ͨ����������ʽ����һ���ļ��У���������Ҫ�����ĵط�����һ���ļ��У�Ȼ��ͨ������Ҽ�ѡ��`git bush here`����git bush
- ͨ��`git init`��������Ŀ¼���Git���Թ���Ĳֿ�
```
$ git init
Initialized empty Git repository in /Users/michael/learngit/.git/
```
������һ���յĲֿ⣬�ļ���Ŀ¼�¿��ܶ���һ��`.git`Ŀ¼����Ҫ�����޸����Ŀ¼�����Ŀ¼��git�����ٹ���汾���.
�����û�п���.gitĿ¼��������Ϊ���Ŀ¼Ĭ�������صģ���windows�µ��ļ����°����̵�`Alt`�����ļ����������ʾһ����Ŀ���ҵ�`����`�����`�ļ���ѡ��`��`�鿴`��`�����ܱ����Ĳ���ϵͳ�ļ�(�Ƽ�)`�Ĺ�ȥ���Ϳ��Կ������ص�`.git`Ŀ¼
- ���ļ���ӵ��汾��
Microsoft��Word��ʽ�Ƕ����Ƹ�ʽ����ˣ��汾����ϵͳ��û������Word�ļ��ĸĶ��ģ�ǰ�����Ǿٵ�����ֻ��Ϊ����ʾ�����Ҫ����ʹ�ð汾����ϵͳ����Ҫ�Դ��ı���ʽ��д�ļ�����Ҫʹ��Windows�Դ��ļ��±��༭�κ��ı��ļ���
��дһ��readme.txt�ļ�
```
Git is a version control system.
Git is free software.
```
һ��Ҫ�ŵ����ǵĲֿ�Ŀ¼�£���һ���ļ��ŵ�git�ֿ�ֻ��Ҫ������
1. ������`git add`����Git�����ļ���ӵ��ֿ�
```
$ git add readme.txt
```
ִ����������û���κ���ʾ����Ͷ��ˣ�Unix����ѧ�ǡ�û����Ϣ���Ǻ���Ϣ����˵����ӳɹ���
2. ������`git commi`t����Git�����ļ��ύ���ֿ�
```
$ git commit -m "wrote a readme file"
[master (root-commit) cb926e7] wrote a readme file
 1 file changed, 2 insertions(+)
 create mode 100644 readme.txt
```
-m����������Ǳ����ύ��˵��
git commit����ִ�гɹ��������㣬1���ļ����Ķ�����������ӵ�readme.txt�ļ������������������ݣ�readme.txt���������ݣ���
ΪʲôGit����ļ���Ҫadd��commitһ�������أ���Ϊcommit����һ���ύ�ܶ��ļ�����������Զ��add��ͬ���ļ������磺
```
$ git add file1.txt
$ git add file2.txt file3.txt
$ git commit -m "add 3 files."
```
### ʱ�������
����readme.txt�е�����
```
Git is a distributed version control system.
Git is free software.
```
ͨ��`git status`�鿴��ǰ�ֿ��״̬
```
$ git status
On branch master
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

        modified:   readme.txt

no changes added to commit (use "git add" and/or "git commit -a")
```
���������������ʱ�����ղֿ⵱ǰ��״̬�����������������ǣ�readme.txt���޸��ˣ�����û��׼���ύ���޸ġ�
������ǵ��ϴζ��ļ�����ʲô�޸ģ���Ҫ��`git diff`���鿴
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
�������������Կ��������ڵڶ�����ȥ����һ�����š�֪�����ǵ��޸ģ����ǾͿ����ύ���ֿ��ˣ����Ǽ���`git add`��`git commit`��������ִ�еڶ���֮��ʹ��`git status`���鿴���ǵ�״̬
```
$ git status
On branch master
Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)

        modified:   readme.txt

```
��������������ǽ�Ҫ���ύ���޸İ���readme.txt����ô�Ϳ���ִ��`git commit`�ύ���ٴ�ʹ��`git status`
```
$ git status
On branch master
nothing to commit, working directory clean
```
git��������û����Ҫ�ύ�޸ĵģ��������Ǹɾ���
### �汾����
��git�п���ʹ��`git log`�������鿴���ǵ���ʷ��¼����������������Ϣ���࣬���Լ���`--pretty=oneline`
```
$ git log --pretty=oneline
95069c284f6c52998aeddd2529bfeed4f806d2c4 append GPL
30d3a7e54615e1d02d533d2850c173a61cbb4404 �޸�readme.txt
9776c8940136107b73edbefe907adc35470a961f �޸�readme.txt
56bc5cc5ee7184ddf10e3a1eac4a649918937081 �½�readme.txt
```
ǰ���һ�󴮶��ǰ汾�ţ���git��`HEAD`��ʾ��ǰ�汾
��һ���汾����`HEAD^`�����ϸ��汾��`HEAD^^`
����100���汾����д��`HEAD~100`
ʹ��`git reset`����ʵ�ֻ���
```
$ git reset --hard HEAD^
HEAD is now at 30d3a7e �޸�readme.txt
```
ʹ�����ַ�ʽ���ˣ����µ��Ǹ��汾û���ˣ����ͣ����λ��������˵�λ��
����취���ҵ�������Ǹ��汾�İ汾�žͿ��ԣ��汾�ſ���ֻдǰ��λ
git�ṩ��һ������`git reflog`����¼���ÿһ������:
```
$ git reflog
9776c89 HEAD@{0}: reset: moving to 9776
56bc5cc HEAD@{1}: reset: moving to 56bc5
30d3a7e HEAD@{2}: reset: moving to HEAD^
95069c2 HEAD@{3}: commit: append GPL
30d3a7e HEAD@{4}: commit: �޸�readme.txt
9776c89 HEAD@{5}: commit: �޸�readme.txt
56bc5cc HEAD@{6}: commit (initial): �½�readme.txt
```
`git add`���ļ��޸���ӵ��ݴ���
`git commit`���ݴ��������е������ύ����ǰ��֧
���ڶ�readme.txt�ļ������޸ģ������һ��license.txt�ļ�,�鿴״̬
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
git��������readme.txt���޸ģ���license.txt����û�б���ӹ�����������״̬��`Untracked`
### �����޸�
����޸����ļ�ֱ��ʹ��`git commit`�����ύ�����ǲ鿴`git status`���������޸ĵĲ�û���ύ
```
On branch master
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

        modified:   readme.txt

no changes added to commit (use "git add" and/or "git commit -a")
```
git��������޸ģ�����ʹ��`git add`������ڹ������ĵ�һ���޸ı������ݴ�����׼���ύ����������������޸Ĳ�û�з��뻺���������ԣ�`git commit`ֻ������ݴ������޸��ύ
�ύ����`git diff HEAD -- readme.txt`����鿴�������Ͱ汾���������µİ汾������
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
### �����޸�
���д���ˣ����㻹û���ύ��ʱ��������ֶ�ɾ�������Կ�����״̬��
```
On branch master
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

        modified:   readme.txt

no changes added to commit (use "git add" and/or "git commit -a")
```
git������㣬`git checkout -- file`���Զ������������޸ģ�ʹ��`$ git checkout -- readme.txt`�����readme.txt�ļ��ڹ��������޸�ȫ���������������������ļ��ص����һ��`git commit`����`git add`ʱ��״̬,`git checkout -- file`�����е�--����Ҫ��û��--���ͱ���ˡ��л�����һ����֧��������
����Ѿ�`git add`���ݴ�������commit֮ǰ�޸ģ�����ʹ��`git reset HEAD file`���԰��ݴ������޸ĳ��������·Żع�����
```
$ git reset HEAD readme.txt
Unstaged changes after reset:
M       readme.txt
```
git reset����ȿ��Ի��˰汾��Ҳ���԰��ݴ������޸Ļ��˵�����������������HEADʱ����ʾ���µİ汾��
����git status�鿴
```
On branch master
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

        modified:   readme.txt

no changes added to commit (use "git add" and/or "git commit -a")
```
�Ϳ��Զ���������
```
$ git checkout -- readme.txt
```
### ɾ���ļ�
һ������£���ͨ��ֱ�����ļ��������а�û���õ��ļ�ɾ��������ʹ��`rm`����ɾ��
```
$ rm test.txt
```
���ʱ��git֪����ɾ�����ļ�����˹������汾��Ͳ�һ����
```
$ git status
On branch master
Changes not staged for commit:
  (use "git add/rm <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

        deleted:    test.txt

no changes added to commit (use "git add" and/or "git commit -a")
```
����ѡ��һ��ȷʵҪɾ�����ļ����Ǿ�ʹ������`git rm`ɾ��������`git commit`
```
$ git rm test.txt
$ git commit -m "remove test.txt"
```
��һ�־���ɾ���ˣ�����ɾ���ļ��ָ�
```
$ git checkout -- test.txt
```
����ʵ���ð汾����İ汾�滻�������İ汾�����۹��������޸Ļ���ɾ���������ԡ�һ����ԭ����