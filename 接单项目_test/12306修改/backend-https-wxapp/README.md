# 需要环境
python 3.9
postgresql 12+  数据库
chrome浏览器

# pip 包
flask-login
flask-sqlalchemy
pip install playwright 抢票的模块
python -m playwright install

#
_pycache_  系统运行python时候的缓存
model跟数据库做一个映射
static前端的静态文件，包括css，js等等
templates是一个前端的html文件
util指系统的通用模块
    aesutil,security跟WXB文件是安全相关的
    t12306是爬虫核心功能的文件
    station文件对查询到的车票信息进行处理
view交互逻辑跟请求处理逻辑
重启电脑后需要检查任务管理器里面有没有postgresql进程，没有的话说明数据库服务没启动，执行下面命令启动
D:\postgresql12\bin\pg_ctl.exe -D D:\postgresql12\data start



