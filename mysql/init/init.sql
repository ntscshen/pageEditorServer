-- docker-compose 启动时会自动执行该文件
select "init start ...";

-- 创建数据库
use mysql;
SET SQL_SAFE_UPDATES = 0; -- 关闭安全模式 0:关闭  1:开启

update user set host='%' where user='root'; -- 允许远程连接 %:所有ip  localhost:本地
flush privileges; -- 刷新权限
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'aB123456'; -- 修改密码 Mysql_2019:密码 root:用户名 localhost:本地
flush privileges; -- 刷新权限


select "init end ..."