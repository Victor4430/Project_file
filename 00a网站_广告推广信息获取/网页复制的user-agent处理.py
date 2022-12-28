a = "{ \n"
b = "} \n"
c = "'"
with open('./user-agent.txt', 'r', encoding='utf-8') as f:
    with open('./new_user-agent.txt', 'w', encoding='utf-8') as fp:
        user_agents = f.readlines()
        fp.write(a)
        for i in user_agents:
            i_list = i.split(':')
            print(i_list)
            if i_list[0] == "cookie":
                continue
            d = (c + i_list[0].replace(r'\n', '') + c + ":" + c + i_list[1].replace(r'\n', "'") + c).replace('\n',
                                                                                                             '').replace(
                ' ', '')
            print(d)
            fp.write("\t" + d + "," + "\n")
        fp.write(b)
        print("写入完成！！")
