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
### Զ�ֿ̲�
1. ע��һ��githup��վ��������ѻ��һ��gitԶ�ֿ̲�
2. ����git�ֿ��githup�ֿ�֮��ʱͨ��SSH���ܵ�
3. ������Ե��û���Ŀ¼��(C:\Users\Administrator)������û��.sshĿ¼
4. �����.sshĿ¼���������Ŀ¼����û��id_rsa��id_rsa.pub�������ļ�
5. ����п���ֱ��������һ��
6. ���û�д�git Bash(shell)����ssh key��
```
$ ssh-keygen -t rsa -C "youremail@example.com"
```
7. ��¼githup����"Account settings"
8. �㡰Add SSH Key������������Title����key�ı��������id_rsa.pub(��Կ)�ļ�������
9. �����ж��key��ֻҪ��ÿ�����Ե�key����ӵ�githup���Ϳ�����ÿ̨�������ύ
10. githup�ϵĹ����ģ����Խ�Ǯ�����˽�еģ���һ���취�����Լ��git������
### ���Զ�̿�
1. ��githup�ϴ���һ���ֿ⣬�������Ǹ��ֿ���㱾�صĲֿ����ͬ��
2. ������githup�ϵĲֿ�ȿ�����Ϊ���ݣ��ֿ�����������ͨ���ֿ���Э��
3. ��githup����`New repository`����һ���²ֿ�
4. $ git remote add origin githup���ṩ��ssh��ַ
5. �Ϳ��԰ѱ��ؿ�������������͵�Զ�̿���
```
$ git push -u origin master
```
6. ǰ��Ĳ��趼��ȷ�������������ɹ��п��������ٵ����⣬������Լ���
7. �ѱ��ؿ���������͵�Զ�̣���`git push`���ʵ�����ǰѵ�ǰ��֧`master`���͵�Զ��
8. ����Զ���ǿյģ����ǵ�һ������`master`��֧ʱ������`-u`
����
9. git������ѱ��ص�master��֧�������͵�Զ���µ�master��֧������ѱ��ص�master��֧��Զ�̵�master��֧��������
10. ��������֮��ֻҪ�ڱ��������ύ���Ϳ���ͨ�����������ύ
```
$ git push origin master
```
### SSH����
�����һ��ʹ��Git��clone����push��������GitHubʱ����õ�һ�����棺
```
The authenticity of host 'github.com (xx.xx.xx.xx)' can't be established.
RSA key fingerprint is xx.xx.xx.xx.xx.
Are you sure you want to continue connecting (yes/no)?
```
������ΪGitʹ��SSH���ӣ���SSH�����ڵ�һ����֤GitHub��������Keyʱ����Ҫ��ȷ��GitHub��Key��ָ����Ϣ�Ƿ��������GitHub�ķ�����������yes�س����ɡ�
�������ֻ�����һ�Σ�����Ĳ����Ͳ������κξ����ˡ�
### ��Զ�̿��¡
��¡һ�����ر��ؿ�
```
$ git clone githup�ϵ�ssh��ַ
```
githup����һ��https��ַ��Ҳ֧��httpsЭ�飬ֻ�ǱȽ���
### ��֧����
����һ�������Լ��ķ�֧�����Լ�����ԭ���ķ�֧�ϼ������������ύ���ύ��ֱ��������ϣ���һ���Ժϲ���ԭ���ķ�֧��
### ������ϲ���֧
����:master
��ǰ��֧��HEAD
������֧
```
$ git checkout -b dev
Switched to a new branch 'dev'
```
`git checkout`�����ϼ���`-b`������ʾ�������л����൱��������������
```
$ git branch dev
$ git checkout dev
Switched to branch 'dev'
```
Ȼ����`git branch`����鿴��ǰ��֧
```
$ git branch
* dev
  master
```
���г����еķ�֧����ǰ�ķ�֧ǰ����һ��*
���ǿ��Լ���������Ҫ�޸ĵ����ݽ����޸�,�ύ
�������޸ĺ��ˣ�dev��֧�Ĺ�����ɣ����Ǿ��л���master��֧
```
$ git checkout master
Switched to branch 'master'
Your branch is up-to-date with 'origin/master'.
```
�л���master��֧���ٲ鿴�ļ�����ԭ��û���޸ĵ��ļ�����Ϊ�޸ĵ���dev��֧�ϣ���master�ϵ��ύ��û�б�
����������Ҫ��dev��֧�ϲ���master��֧�ϣ�
```
$ git merge dev
Updating 2b3873a..05b18a0
Fast-forward
 README.md | 2 +-
 1 file changed, 1 insertion(+), 1 deletion(-)
```
`git merge`�������ںϲ�ָ����֧����ǰ��֧
�����`Fast-forward`��Ϣ����һ��'���ģʽ'��Ҳ����ֱ�Ӱ�masterָ��dev�ĵ�ǰ�ύ�����Ժϲ��ٶȷǳ���
�ϲ���ɺ󣬾Ϳ���ɾ��dev��֧
```
$ git branch -d dev
Deleted branch dev (was 05b18a0).
```
### �����ͻ
1. �¿���һ����֧
```
$ git checkout -b feature1
```
2. ���ٺ����޸��ļ�������£���feature1��֧���ύ
3. ���л���master��֧��ʱ
4. git���Զ���ʾ���ǵ�ǰ��master��֧��Զ�̵�master��֧Ҫ��ǰ1���ύ
5. �ٴ��޸��ļ�
6. �����ύ
7. master��feature1��֧�����Լ������ύ
8. git�޷�����'���ٺϲ�'��ֻ����ͼ�Ѹ��Ե��޸ĺϲ��������������ֺϲ��г�ͻ
```
$ git merge feature1
Auto-merging README.md
CONFLICT (content): Merge conflict in README.md
Automatic merge failed; fix conflicts and then commit the result.
```
9. �����ֶ������ͻ�����ύ�����ļ����ֶ��޸�
10. ���ύ
11. �����ô�������`git log`��������֧�ϲ������
```
$ git log --graph --pretty=oneline --abbrev-commit
* 995dbd2 add
* 05b18a0 branch test
* 2b3873a first commit
```
12. ���ɾ��feature1��֧
```
$ git branch -d feature1
Deleted branch feature1 (was 75a857c).
```
### ��֧�������
��`Fast forward`ģʽ��ʱ��ɾ����֧�󣬻ᶪ����֧��Ϣ�����Ҫǿ�ƽ���`Fast forward`ģʽ��git�ͻ���mergeʱ����һ���µ�commit�������Ϳ��Դӷ�֧��ʷ�Ͽ�����֧��Ϣ
1. �������л�dev��֧
```
$ git checkout -b dev
```
2. �޸�README.md�ļ�
3. �л���master
```
$ git checkout master
```
4. ׼���ϲ�dev��֧����ע��`--no-ff`��������ʾ����`Fast forward`
```
$ git merge --no-ff -m 'merge with no-ff' dev
Already up-to-date.
```
5. ��Ϊ���κϲ�Ҫ����һ���µ�commit�����Լ���-m��������commit����д��ȥ
6. �ϲ���������`git log`������֧��ʷ
```
$ git log --graph --pretty=oneline --abbrev-commit
* 995dbd2 add
* 05b18a0 branch test
* 2b3873a first commit
```
##### ��֧����
1. master��֧Ӧ���Ƿǳ��ȶ��ģ�Ҳ���ǽ����������°汾��ƽʱ����������ɻ�
2. �ɻ��dev��֧�ϣ�Ҳ����˵��dev��֧�ǲ��ȶ��ģ���ĳ��ʱ�򣬱���1.0�汾����ʱ���ٰ�dev��֧�ϲ���master�ϣ���master��֧����1.0�汾��
### Bug��֧
�����Լ���dev��֧�Ϲ�������һ��bug��Ҫ��������ύ�Լ���dev��֧��������bug��֧
git���ṩ��һ��`stash`���ܣ����԰ѵ�ǰ�Ĺ����ֳ�'����'���������Ժ�ָ��ֳ����������
```
$ git stash
Saved working directory and index state WIP on dev: 995dbd2 add
HEAD is now at 995dbd2 add
```
���ڣ���`git status`�鿴�����������Ǹɾ��ģ�������û�б�Git������ļ�������˿��Է��ĵش�����֧���޸�bug��
�״�Ҫȷ��Ҫ���ĸ���֧���޸�bug���ٶ���Ҫ��master��֧���޸����ʹ�master������ʱ��֧
```
$ git checkout master
$ git checkout -b issue-101
```
�����޸�bug
```
$ git add  README.md
$ git commit -m "fix bug 101"
```
�޸���ɺ��л���master��֧������ɺϲ������ɾ��issue-101��֧
```
$ git checkout master
$ git merge --no-ff -m 'merged bug fix 101' issue-101
$ git branch -d issue-101
```
���Իص�dev��֧�Ϲ���
```
$ git checkout dev
```
�������Ǹɾ��ģ���`git stash list`�������鿴�洢�Ĺ����ֳ�
```
$ git stash list
stash@{0}: WIP on dev: 995dbd2 add
```
�����ֳ����ڣ�Git��stash���ݴ���ĳ���ط��ˣ�������Ҫ�ָ�һ�£��������취
һ����`git stash apply`�ָ������ǻָ���stash���ݲ���ɾ��������Ҫ��`git stash drop`��ɾ����
��һ�ַ�ʽ����`git stash pop`���ָ���ͬʱ��stash����Ҳɾ��
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
����git stash list�鿴���Ϳ������κ�stash������
```
$ git stash list
```
����Զ��stash���ָ���ʱ������git stash list�鿴��Ȼ��ָ�ָ����stash��������
```
$ git stash apply stash@{0}
```
### Feature��֧
���һ���¹���ʱ������Ҫʵ���Դ��뽫����֧�����ˣ�����û���һ�����ܣ�����½�һ��feature��֧����ɺ�ϲ������ɾ���÷�֧
1. �´���һ����֧`feature-vulcan`
```
$ git checkout -b feature-vulcan
```
2. �������
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
3. �л���dev��׼���ϲ�
```
$ git checkout dev
```
4. ����Ҫ��`feature-vulcan`��֧����
```
$ git branch -d feature-vulcan
error: The branch 'feature-vulcan' is not fully merged.
If you are sure you want to delete it, run 'git branch -D feature-vulcan'.
```
����ʧ�ܡ�Git�������ѣ�feature-vulcan��֧��û�б��ϲ������ɾ��������ʧ���޸ģ����Ҫǿ��ɾ������Ҫʹ������`git branch -D feature-vulcan`��
### ����Э��
�����Զ�ֿ̲��¡ʱ��ʵ����Git�Զ��ѱ��ص�master��֧��Զ�̵�master��֧��Ӧ�����ˣ����ң�Զ�ֿ̲��Ĭ��������origin��
Ҫ�鿴Զ�̿����Ϣ����git remote��
```
$ git remote
origin
```
���ߣ���git remote -v��ʾ����ϸ����Ϣ
```
$ git remote -v
origin  git@github.com:Jijmin/theoreticalKnowledge.git (fetch)
origin  git@github.com:Jijmin/theoreticalKnowledge.git (push)
```
������ʾ�˿���ץȡ�����͵�origin�ĵ�ַ�����û������Ȩ�ޣ��Ϳ�����push�ĵ�ַ��
##### ���ͷ�֧
���ͷ�֧�����ǰѸ÷�֧�ϵ����б����ύ���͵�Զ�̿⡣����ʱ��Ҫָ�����ط�֧��������git�ͻ�Ѹ÷�֧���͵�Զ�̶�Ӧ��Զ�̷�֧��
```
$ git push origin master
```
���Ҫ����������֧������dev���͸ĳ�
```
$ git push origin dev
```
���ǣ�������һ��Ҫ�ѱ��ط�֧��Զ�����ͣ���ô����Щ��֧��Ҫ���ͣ���Щ����Ҫ�أ�
- master��֧������֧�����Ҫʱ����Զ��ͬ����
- dev��֧�ǿ�����֧���Ŷ����г�Ա����Ҫ�����湤��������Ҳ��Ҫ��Զ��ͬ����
- bug��ֻ֧�����ڱ����޸�bug����û��Ҫ�Ƶ�Զ���ˣ������ϰ�Ҫ������ÿ�ܵ����޸��˼���bug��
- feature��֧�Ƿ��Ƶ�Զ�̣�ȡ�������Ƿ�����С�����������濪����
##### ץȡ��֧
����Э��ʱ����Ҷ�����master��dev��֧�����͸��Ե��޸ġ�
1. ��¡����һ��Ŀ¼��
```
$ git clone git@github.com:Jijmin/theoreticalKnowledge.git
```
2. �ڿ�¡�������ļ����У�ֻ�ܿ���master��֧
```
$ git branch
* master
```
3. ���ڣ����С���Ҫ��dev��֧�Ͽ������ͱ��봴��Զ��origin��dev��֧�����أ���������������������dev��֧
```
$ git checkout -b dev origin/dev
```
4. ����dev���޸ģ�Ȼ��push��Զ����
5. ͬʱ��Ҳ���˶���ͬ���ļ������˲���������ͼ����
6. ����ʧ�ܣ���Ϊ���С���������ύ������ͼ���͵��ύ�г�ͻ
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
7. ����git pull�����µ��ύ��origin/devץ������Ȼ���ڱ��غϲ��������ͻ��������
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
8. git pullҲʧ���ˣ�ԭ����û��ָ������dev��֧��Զ��origin/dev��֧�����ӣ�������ʾ������dev��origin/dev������
```
$ git branch --set-upstream dev origin/dev
The --set-upstream flag is deprecated and will be removed. Consider using --track or --set-upstream-to
Branch dev set up to track remote branch dev from origin.
```
9. ��pull
```
$ git pull
Auto-merging README.md
CONFLICT (content): Merge conflict in README.md
Automatic merge failed; fix conflicts and then commit the result.
```
���git pull�ɹ������Ǻϲ��г�ͻ����Ҫ�ֶ����������ķ����ͷ�֧�����еĽ����ͻ��ȫһ����������ύ����push
��ˣ�����Э���Ĺ���ģʽͨ����������
1. ���ȣ�������ͼ��`git push origin branch-name`�����Լ����޸ģ�
2. �������ʧ�ܣ�����ΪԶ�̷�֧����ı��ظ��£���Ҫ����`git pull`��ͼ�ϲ���
3. ����ϲ��г�ͻ��������ͻ�����ڱ����ύ��
4. û�г�ͻ���߽������ͻ������`git push origin branch-name`���;��ܳɹ���
5. ���`git pull`��ʾ��no tracking information������˵�����ط�֧��Զ�̷�֧�����ӹ�ϵû�д�����������`git branch --set-upstream branch-name origin/branch-name`��
### ��ǩ����
����һ���汾ʱ������ͨ�����ڰ汾���д�һ����ǩ��tag������������Ψһȷ���˴��ǩʱ�̵İ汾����������ʲôʱ��ȡĳ����ǩ�İ汾�����ǰ��Ǹ����ǩ��ʱ�̵���ʷ�汾ȡ���������ԣ���ǩҲ�ǰ汾���һ�����ա�
Git�ı�ǩ��Ȼ�ǰ汾��Ŀ��գ�����ʵ������ָ��ĳ��commit��ָ�루����֧����Բ��ԣ����Ƿ�֧�����ƶ�����ǩ�����ƶ��������ԣ�������ɾ����ǩ����˲����ɵġ�
### ������ǩ
��Git�д��ǩ�ǳ��򵥣����ȣ��л�����Ҫ���ǩ�ķ�֧��
```
$ git branch
* dev
  master
$ git checkout master
Switched to branch 'master'
```
Ȼ��������`git tag <name>`�Ϳ��Դ�һ���±�ǩ
```
$ git tag v1.0
```
����������git tag�鿴���б�ǩ
```
$ git tag
v1.0
```
Ĭ�ϱ�ǩ�Ǵ��������ύ��commit�ϵġ���ʱ��������˴��ǩ�����磬�����Ѿ��������ˣ���Ӧ������һ��ı�ǩû�д���ô�죿
�������ҵ���ʷ�ύ��commit id��Ȼ����ϾͿ�����
```
$ git log --pretty=oneline --abbrev-commit
6e1084f merged bug fix 101
7fb36af fix bug 101
995dbd2 add
05b18a0 branch test
2b3873a first commit
```
�ȷ�˵Ҫ��add merge����ύ���ǩ������Ӧ��commit id��6224937����������
```
$ git tag v0.9 6224937
```
ע�⣬��ǩ���ǰ�ʱ��˳���г������ǰ���ĸ����ġ�������`git show <tagname>`�鿴��ǩ��Ϣ
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
+# ����֪ʶ
+## Ӳ֪ʶ
```
�����Դ�������˵���ı�ǩ����-aָ����ǩ����-mָ��˵������
```
$ git tag -a v0.1 -m 'version 0.1 released' 05b18a0
```
������ͨ��-s��˽Կǩ��һ����ǩ
```
$ git tag -s v0.2 -m "signed version 0.2 released" fec145a
```
ǩ������PGPǩ������ˣ��������Ȱ�װgpg��GnuPG�������û���ҵ�gpg������û��gpg��Կ�ԣ��ͻᱨ����ο�GnuPG�����ĵ�����Key��
### ������ǩ
�����ǩ����ˣ�Ҳ����ɾ��
```
$ git tag -d v0.1
Deleted tag 'v0.1' (was 2587dd2)
```
��Ϊ�����ı�ǩ��ֻ�洢�ڱ��أ������Զ����͵�Զ�̡����ԣ����ı�ǩ�����ڱ��ذ�ȫɾ����
���Ҫ����ĳ����ǩ��Զ�̣�ʹ������`git push origin <tagname>`
```
$ git push origin v1.0
```
���ߣ�һ��������ȫ����δ���͵�Զ�̵ı��ر�ǩ
```
$ git push origin --tags
```
�����ǩ�Ѿ����͵�Զ�̣�Ҫɾ��Զ�̱�ǩ���鷳һ�㣬�ȴӱ���ɾ��
```
$ git tag -d v0.9
```
Ȼ�󣬴�Զ��ɾ����ɾ������Ҳ��push�����Ǹ�ʽ����
```
$ git push origin :refs/tags/v0.9
```
Ҫ�����Ƿ���Ĵ�Զ�̿�ɾ���˱�ǩ�����Ե�½GitHub�鿴��
### �Զ���Git
��Git��ʾ��ɫ�����������������������Ŀ
```
$ git config --global color.ui true
```
### ���������ļ�
��Git�������ĸ�Ŀ¼�´���һ�������.gitignore�ļ���Ȼ���Ҫ���Ե��ļ������ȥ��Git�ͻ��Զ�������Щ�ļ���
����Ҫ��ͷд.gitignore�ļ���GitHub�Ѿ�Ϊ����׼���˸��������ļ���ֻ��Ҫ���һ�¾Ϳ���ʹ���ˡ����������ļ�����ֱ�����������https://github.com/github/gitignore
�����ļ���ԭ���ǣ�
- ���Բ���ϵͳ�Զ����ɵ��ļ�����������ͼ�ȣ�
- ���Ա������ɵ��м��ļ�����ִ���ļ��ȣ�Ҳ�������һ���ļ���ͨ����һ���ļ��Զ����ɵģ����Զ����ɵ��ļ���û��Ҫ�Ž��汾�⣬����Java���������.class�ļ���
- �������Լ��Ĵ���������Ϣ�������ļ��������ſ���������ļ���

�������²ο���ѩ��git�̳̣����µ�ַ���£�
http://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000