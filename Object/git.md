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
1. ������git add����Git�����ļ���ӵ��ֿ�
```
$ git add readme.txt
```
ִ����������û���κ���ʾ����Ͷ��ˣ�Unix����ѧ�ǡ�û����Ϣ���Ǻ���Ϣ����˵����ӳɹ���
2. ������git commit����Git�����ļ��ύ���ֿ�
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