启动MongoDB服务：

​	mongod --dbpath （db文件夹绝对路径）--port  （端口号，默认27017）

操作MongoDB：

​	mongo --port（mongoDB服务端口号，默认27017）

show dbs：展示所有数据库

use DataBaseName：连接到指定数据库

db.集合名称.insert(object)	：向数据库中的集合添加数据

db.集合名称.find(object) [.limit(number)] [.skip(number)] [.count()]	：查找集合中符合条件的所有数据（object是一个条件）；limit限制查找的结果数，skip跳过指定位置的数据，从下一个开始查找；count函数返回查找结果的数量

db.集合名称.findOne(object)	：查找集合中的一个数据

db.集合名称.remove(object，justOne)	：删除符合条件的数据，justOne为1则只删除一个

