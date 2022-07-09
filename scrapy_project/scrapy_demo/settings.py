# Scrapy settings for scrapy_demo project
#
# For simplicity, this file contains only settings considered important or
# commonly used. You can find more settings consulting the documentation:
#
# scrapy_demo项目的Scrapy设置
#
# 为简单起见，这个文件只包含被认为重要的设置
# 常用。你可以在文档中找到更多的设置:

#     https://docs.scrapy.org/en/latest/topics/settings.html
#     https://docs.scrapy.org/en/latest/topics/downloader-middleware.html
#     https://docs.scrapy.org/en/latest/topics/spider-middleware.html

BOT_NAME = 'scrapy_demo'

SPIDER_MODULES = ['scrapy_demo.spiders']
NEWSPIDER_MODULE = 'scrapy_demo.spiders'


# Crawl responsibly by identifying yourself (and your website) on the user-agent
# 通过在用户代理上识别你自己(和你的网站)来负责地爬行
#USER_AGENT = 'scrapy_demo (+http://www.yourdomain.com)'

# Obey robots.txt rules
# 遵守robots . txt规则
ROBOTSTXT_OBEY = False

# Configure maximum concurrent requests performed by Scrapy (default: 16)
# 配置由Scrapy执行的最大并发请求(默认值:16)
#CONCURRENT_REQUESTS = 32

# Configure a delay for requests for the same website (default: 0)
# 为相同网站的请求设置延迟(默认为0)
# See https://docs.scrapy.org/en/latest/topics/settings.html#download-delay
# See also autothrottle settings and docs
# 请参见自动油门设置和文档
#DOWNLOAD_DELAY = 3
# The download delay setting will honor only one of:
# 下载延迟设置只会遵循以下其中之一
#CONCURRENT_REQUESTS_PER_DOMAIN = 16
# 并发_请求_每个_域 = 16
#CONCURRENT_REQUESTS_PER_IP = 16
# 并发_请求_每个_ip = 16

# Disable cookies (enabled by default)
# 禁用cookies(默认启用)
#COOKIES_ENABLED = False

# Disable Telnet Console (enabled by default)
# 禁用Telnet控制台(默认启用)
#TELNETCONSOLE_ENABLED = False

# Override the default request headers:
# 覆盖默认的请求头:
# DEFAULT_REQUEST_HEADERS = {
#   'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
#   'Accept-Language': 'en',
# }

# Enable or disable spider middlewares
# 启用或禁用爬行器中间件
# See https://docs.scrapy.org/en/latest/topics/spider-middleware.html
#SPIDER_MIDDLEWARES = {
#    'scrapy_demo.middlewares.ScrapyDemoSpiderMiddleware': 543,
#}

# Enable or disable downloader middlewares
# 启用或禁用下载器中间件
# See https://docs.scrapy.org/en/latest/topics/downloader-middleware.html
#DOWNLOADER_MIDDLEWARES = {
#    'scrapy_demo.middlewares.ScrapyDemoDownloaderMiddleware': 543,
#}

# Enable or disable extensions
# 启用或禁用扩展
# See https://docs.scrapy.org/en/latest/topics/extensions.html
#EXTENSIONS = {
#    'scrapy.extensions.telnet.TelnetConsole': None,
#}

# Configure item pipelines
# 配置项目管道
# See https://docs.scrapy.org/en/latest/topics/item-pipeline.html
#ITEM_PIPELINES = {
#    'scrapy_demo.pipelines.ScrapyDemoPipeline': 300,
#}

# Enable and configure the AutoThrottle extension (disabled by default)
# 启用和配置AutoThrottle扩展(默认禁用)
# See https://docs.scrapy.org/en/latest/topics/autothrottle.html

#AUTOTHROTTLE_ENABLED = True
# The initial download delay
# 初始下载延迟
#AUTOTHROTTLE_START_DELAY = 5

# The maximum download delay to be set in case of high latencies
# 在高延迟情况下设置的最大下载延迟
#AUTOTHROTTLE_MAX_DELAY = 60

# The average number of requests Scrapy should be sending in parallel to
# each remote server
# Scrapy应该并发发送的请求的平均数量
# 每个远程服务器
#AUTOTHROTTLE_TARGET_CONCURRENCY = 1.0
# Enable showing throttling stats for every response received:
# 启用为接收到的每个响应显示节流统计信息:
#AUTOTHROTTLE_DEBUG = False

# Enable and configure HTTP caching (disabled by default)
# 启用和配置HTTP缓存(默认禁用)
# See https://docs.scrapy.org/en/latest/topics/downloader-middleware.html#httpcache-middleware-settings
#HTTPCACHE_ENABLED = True
#HTTPCACHE_EXPIRATION_SECS = 0
#HTTPCACHE_DIR = 'httpcache'
#HTTPCACHE_IGNORE_HTTP_CODES = []
#HTTPCACHE_STORAGE = 'scrapy.extensions.httpcache.FilesystemCacheStorage'
