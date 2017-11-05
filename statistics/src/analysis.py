# from scipy.stats import mannwhitneyu
from numpy import genfromtxt
from scipy import stats
from matplotlib.pyplot import *

from src.plot import *
from src.stats import *


def main():

    boot = genfromtxt('data/bootstrap.csv', delimiter=',', skip_header=1)
    reveal = genfromtxt('data/reveal.js.csv', delimiter=',', skip_header=1)
    three = genfromtxt('data/three.js.csv', delimiter=',', skip_header=1)
    brackets = genfromtxt('data/brackets.csv', delimiter=',', skip_header=1)
    pdf = genfromtxt('data/pdf.js.csv', delimiter=',', skip_header=1)
    photo = genfromtxt('data/PhotoSwipe.csv', delimiter=',', skip_header=1)

    express = genfromtxt('data/express.csv', delimiter=',', skip_header=1)
    hexo = genfromtxt('data/hexo.csv', delimiter=',', skip_header=1)
    node = genfromtxt('data/node.csv', delimiter=',', skip_header=1)
    node_inspector = genfromtxt('data/node-inspector.csv', delimiter=',', skip_header=1)
    parse_server = genfromtxt('data/parse-server.csv', delimiter=',', skip_header=1)
    socket = genfromtxt('data/socket.io.csv', delimiter=',', skip_header=1)

    client_array = [boot, reveal, three, brackets, pdf, photo]
    server_array = [express, hexo, node, node_inspector, parse_server, socket]


    # boot_loc = np.sum(boot[:, 4])
    # # print(boot_loc)
    #
    # boot_loc = np.sum(node[:, 4])
    # print(boot_loc)

    objects = ('Bootstrap', 'reveal.js', 'three.js', 'brackets', 'pdf.js', 'PhotoSwipe')
    objects_server = ('Express', 'Hexo', 'Node', 'Node-inspector', 'parse-server', 'socket.io')
    #
    # data = get_data(client_array, 2, 4)
    # data2 = get_data(server_array, 2, 4)
    # # bar_graph(data, objects,'label', 'title')
    # double_bar_graph()
    # # bar_graph(data2, objects_server, 'label', 'title')

    for i in range(0, len(client_array)):
        print(objects[i])
        print('numberOfLogicalLines: ', sum(get_column_as_array(client_array[i], 4)))
        print('numberOfCallbackErrorFunctions: ', sum(get_column_as_array(client_array[i], 0)))
        print('numberOfFirstErrorArgFunctions: ', sum(get_column_as_array(client_array[i], 1)))
        print('numberOfEmptyCallbacks: ', sum(get_column_as_array(client_array[i], 2)))
        print('numberOfConsoleStatementOnly: ', sum(get_column_as_array(client_array[i], 3)))
        print('-----------')

    for i in range(0, len(server_array)):
        print(objects_server[i])
        print('numberOfLogicalLines: ', sum(get_column_as_array(server_array[i], 4)))
        print('numberOfCallbackErrorFunctions: ', sum(get_column_as_array(server_array[i], 0)))
        print('numberOfFirstErrorArgFunctions: ', sum(get_column_as_array(server_array[i], 1)))
        print('numberOfEmptyCallbacks: ', sum(get_column_as_array(server_array[i], 2)))
        print('numberOfConsoleStatementOnly: ', sum(get_column_as_array(server_array[i], 3)))
        print('-----------')


    # for i in range(0, len(server_array)):
    #     print(objects_server[i], sum(get_column_as_array(server_array[i], 4)))

main()


# a1 = boot[:, 2]
# b1 = socket[:, 2]


# result = mannwhitneyu(bootstrap_data, socket_io_data)
# print(result)

# a = np.arange(25)
# print(a)
# b = np.arange(25) + 4
# print(stats.mannwhitneyu(a, b, alternative='two-sided'))


