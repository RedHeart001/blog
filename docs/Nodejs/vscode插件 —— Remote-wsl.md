### vscode插件 —— Remote-wsl

#### 1、前置条件

​	1、开启windows自带的linux子系统（在启用和关闭windows中开启）；

​	2、在微软商店中下载任意版本的Ubuntu（如果商店无法运行，“运行”中输入**inetcpl.cpl**命令，**高级**中使**TLS 1.2**即可运行。或者把当前的网络设置为**公用**）；

​	3、下载完成后运行linux，初始化后自己设置管理员用户，/mnt目录映射本机磁盘（/mnt/c映射本机C盘，/mnt/d映射本机D盘）

#### 2、vscode安装wsl插件

#### 3、vscode中，切换默认shell（就是终端右上那个），在windows中建立Linux运行环境。该环境下，对/mnt下的任何操作都会映射到本机环境上