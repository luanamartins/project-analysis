# from scipy.stats import mannwhitneyu
from numpy import genfromtxt
import numpy as np
from scipy import stats
import matplotlib.pyplot as pyplot
from matplotlib.pyplot import *


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

    a = [boot, reveal, three, brackets, pdf, photo]
    b = [express, hexo, node, node_inspector, parse_server, socket]



    client_repo = []
    for client in a:
        client_repo = np.concatenate([client[:, 0], client_repo])
        # client_repo = client_values + client_repo

    server_repo = []
    for server in b:
        server_repo = np.concatenate([server[:, 0], server_repo])

    print('numberOfCallbackErrorFunctions')
    client_repo = list(filter(lambda c: c != 0.0, client_repo))[:20]
    print('client:', np.mean(client_repo))
    # plot_histogram(client_repo)

    server_repo = list(filter(lambda c: c != 0.0, server_repo))[:20]
    print('server:', np.mean(server_repo))

    print(stats.mannwhitneyu(client_repo, server_repo, alternative='two-sided'))


    client_repo = []
    for client in a:
        client_repo = np.concatenate([client[:, 1], client_repo])
        # client_repo = client_values + client_repo

    server_repo = []
    for server in b:
        server_repo = np.concatenate([server[:, 1], server_repo])


    print('numberOfFirstErrorArgFunctions')
    client_repo = list(filter(lambda c: c != 0.0, client_repo))[:20]
    print('client:', np.mean(client_repo))
    # plot_histogram(client_repo)

    server_repo = list(filter(lambda c: c != 0.0, server_repo))[:20]
    print('server:', np.mean(server_repo))

    print(stats.mannwhitneyu(client_repo, server_repo, alternative='two-sided'))



    client_repo = []
    for client in a:
        client_repo = np.concatenate([client[:, 2], client_repo])
        # client_repo = client_values + client_repo

    server_repo = []
    for server in b:
        server_repo = np.concatenate([server[:, 2], server_repo])
    print('numberOfEmptyCallbacks')

    client_repo = list(filter(lambda c: c != 0.0, client_repo))[:20]
    print('client:', np.mean(client_repo))
    # plot_histogram(client_repo)

    server_repo = list(filter(lambda c: c != 0.0, server_repo))[:20]
    print('server:', np.mean(server_repo))

    print(stats.mannwhitneyu(client_repo, server_repo, alternative='two-sided'))



    client_repo = []
    for client in a:
        client_repo = np.concatenate([client[:, 3], client_repo])
        # client_repo = client_values + client_repo

    server_repo = []
    for server in b:
        server_repo = np.concatenate([server[:, 3], server_repo])

    print('numberOfConsoleStatementOnly')
    client_repo = list(filter(lambda c: c != 0.0, client_repo))[:20]
    print('client:', np.mean(client_repo))
    # plot_histogram(client_repo)

    server_repo = list(filter(lambda c: c != 0.0, server_repo))[:20]
    print('server:', np.mean(server_repo))

    print(stats.mannwhitneyu(client_repo, server_repo, alternative='two-sided'))

    data = [sum(photo[:, 3]), sum(pdf[:, 3]), sum(hexo[:, 3]), sum(socket[:, 3])];
    bar_graph_names(np.asarray(data), 'Console statement only')


def plot_histogram(data):
    pyplot.hist(data, bins='auto')
    pyplot.title("Histogram with 'auto' bins")
    pyplot.show()


def bar_graph(data):
    objects = ('Bootstrap', 'Brackets', 'Node', 'Express')
    y_pos = np.arange(len(objects))

    pyplot.bar(y_pos, data, align='center', alpha=0.5)
    pyplot.xticks(y_pos, objects)
    pyplot.ylabel('Usage')
    pyplot.title('Github repositories')

    pyplot.show()


def bar_graph_names(data, title):
    objects = ('PhotoSwipe', 'pdf.js', 'hexo', 'socket.io')
    y_pos = np.arange(len(objects))

    pyplot.bar(y_pos, data, align='center', alpha=0.5)
    pyplot.xticks(y_pos, objects)
    pyplot.ylabel('Usage')
    pyplot.title(title)

    pyplot.show()

main()

# a1 = boot[:, 2]
# b1 = socket[:, 2]


# result = mannwhitneyu(bootstrap_data, socket_io_data)
# print(result)

# a = np.arange(25)
# print(a)
# b = np.arange(25) + 4
# print(stats.mannwhitneyu(a, b, alternative='two-sided'))


