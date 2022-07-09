import os

local_requirements = ['playwright', ' autobahn', 'pytest', ' pytest-asyncio', 'pytest-cov', 'pytest-sugar',
                      ' pytest-xdist',
                      'pytest-timeout', 'flaky', 'pixelmatch', 'Pillow', 'mypy', 'setuptools', ' wheel', 'black',
                      'pre-commit', 'flake8', 'twine', 'pyOpenSSL', 'service_identity', 'pdoc3 ']

for module in local_requirements:
    try:
        import module  # 引入需要的模块

        print(module + '模块已安装')
        break
    except:
        print(module + '模块未安装,现在准备开始安装')
        os.system('pip install -i https://pypi.douban.com/simple/ ' + module)
        continue

os.system('python -m playwright install')
