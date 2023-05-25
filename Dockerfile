# Dockerfile
FROM node:18.16
WORKDIR /app
COPY . /app

# 设置时区
RUN ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime && echo 'Asia/Shanghai' >/etc/timezone
RUN npm set registry https://registry.npm.taobao.org
RUN npm install
RUN npm install pm2 -g

# 启动
CMD echo $SERVER_NAME && echo $AUTHOR_NAME

# 环境变量
ENV SERVER_NAME='pageEditorServer'
ENV AUTHOR_NAME='ntscshen'