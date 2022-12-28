# 获取cookie

from selenium import webdriver
import time
import json

qq_num = '2426325927'

# 记得写完整的url 包括http和https
# 去除浏览器被控  字样
options = webdriver.ChromeOptions()
options.add_experimental_option("excludeSwitches", ['enable-automation'])
options.add_experimental_option('useAutomationExtension', False)
# 浏览器扩展程序
# 语音识别程序
extension_path1 = './1.2.2_0.crx'
# xpath程序
extension_path2 = './2.0.2_0.crx'

options.add_extension(extension_path1)
options.add_extension(extension_path2)
driver = webdriver.Chrome(options=options)  # driver = webdriver.Chrome(executable_path=r'D:PATHchromedriver.exe')?
# -- 防止被检测，新版本用法（2）：
# chrome在79和79版之后用这个
driver.execute_cdp_cmd("Page.addScriptToEvaluateOnNewDocument", {
    "source": """
    Object.defineProperty(navigator, 'webdriver', {
      get: () => undefined
    })
  """
})

# driver.get('https://user.qzone.qq.com/{}/311'.format(qq_num))
driver.get('https://jinbao.pinduoduo.com/promotion/single-promotion')

# 程序打开网页后20秒内手动登陆账户
time.sleep(50)
cook = driver.get_cookies()
print(cook)

with open('cookies.txt', 'w') as cookief:
    # 将cookies保存为json格式
    cookief.write(json.dumps(driver.get_cookies()))

driver.close()
print('0000000000000000000000000000000000000000000000000000')
