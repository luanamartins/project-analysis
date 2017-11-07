from scipy.stats import mannwhitneyu
from numpy import genfromtxt

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

    objects = ('Bootstrap', 'reveal.js', 'three.js', 'brackets', 'pdf.js', 'PhotoSwipe')
    objects_server = ('Express', 'Hexo', 'Node', 'Node-inspector', 'parse-server', 'socket.io')

    client_metric1_values = get_normalized_data(client_array, objects, 0, 4)
    client_metric2_values = get_normalized_data(client_array, objects, 1, 4)
    client_metric3_values = get_normalized_data(client_array, objects, 2, 4)
    client_metric4_values = get_normalized_data(client_array, objects, 3, 4)

    server_metric1_values = get_normalized_data(server_array, objects_server, 0, 4)
    server_metric2_values = get_normalized_data(server_array, objects_server, 1, 4)
    server_metric3_values = get_normalized_data(server_array, objects_server, 2, 4)
    server_metric4_values = get_normalized_data(server_array, objects_server, 3, 4)

    # plot_two_groups_histogram(client_metric4_values, 'client', server_metric4_values, 'server',
    #                            'Number of logging callbacks')


    titles = ['Number of error handling callback functions', 'Number of Error-first callback functions',
              'Number of empty callbacks', 'Number of logging callbacks']
    # plot_violinplot([client_metric4_values, server_metric4_values], ['Client', 'Server'], titles[3])


    print(titles[0])
    result = mannwhitneyu(client_metric1_values, server_metric1_values)
    print(result)

    print(titles[1])
    result = mannwhitneyu(client_metric2_values, server_metric2_values)
    print(result)

    print(titles[2])
    result = mannwhitneyu(client_metric3_values, server_metric3_values)
    print(result)

    print(titles[3])
    u, p_value = mannwhitneyu(client_metric4_values, server_metric4_values)
    print(result)


main()


# a1 = boot[:, 2]
# b1 = socket[:, 2]


# result = mannwhitneyu(bootstrap_data, socket_io_data)
# print(result)

# a = np.arange(25)
# print(a)
# b = np.arange(25) + 4
# print(stats.mannwhitneyu(a, b, alternative='two-sided'))


