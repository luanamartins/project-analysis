from scipy.stats import mannwhitneyu
from numpy import genfromtxt

from src.stats import *
from src.plot import *


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

    objects_client = ('Bootstrap', 'reveal.js', 'three.js', 'brackets', 'pdf.js', 'PhotoSwipe')
    objects_server = ('Express', 'Hexo', 'Node', 'Node-inspector', 'parse-server', 'socket.io')

    titles = ['Number of error handling callback functions', 'Number of Error-first callback functions',
              'Number of empty error handling callbacks', 'Number of logging error handling callbacks']

    client_metric1_values = get_normalized_rescaled_data(client_array, objects_client, 0, 4)
    client_metric2_values = get_normalized_rescaled_data(client_array, objects_client, 1, 4)
    client_metric3_values = get_normalized_rescaled_data(client_array, objects_client, 2, 4)
    client_metric4_values = get_normalized_rescaled_data(client_array, objects_client, 3, 4)

    total_lines_client = [get_total_lines_of_code(boot, 4), get_total_lines_of_code(reveal, 4),
                          get_total_lines_of_code(three, 4), get_total_lines_of_code(brackets, 4),
                          get_total_lines_of_code(pdf, 4),get_total_lines_of_code(photo, 4)]

    total_metrics_client = [np.sum(get_column_as_array(boot, 2)), np.sum(get_column_as_array(reveal, 2)),
                            np.sum(get_column_as_array(three, 2)),np.sum(get_column_as_array(brackets, 2)),
                            np.sum(get_column_as_array(pdf, 2)),np.sum(get_column_as_array(photo, 2))]
    #
    client_metric_values = [client_metric1_values, client_metric2_values, client_metric3_values, client_metric4_values]
    #
    # print(total_lines_client)
    #
    server_metric1_values = get_normalized_rescaled_data(server_array, objects_server, 0, 4)
    server_metric2_values = get_normalized_rescaled_data(server_array, objects_server, 1, 4)
    server_metric3_values = get_normalized_rescaled_data(server_array, objects_server, 2, 4)
    server_metric4_values = get_normalized_rescaled_data(server_array, objects_server, 3, 4)
    #
    total_lines_server = [get_total_lines_of_code(express, 4), get_total_lines_of_code(hexo, 4),
                          get_total_lines_of_code(node, 4), get_total_lines_of_code(node_inspector, 4),
                          get_total_lines_of_code(parse_server, 4), get_total_lines_of_code(socket, 4)]

    total_metrics_server = [np.sum(get_column_as_array(express, 2)), np.sum(get_column_as_array(hexo, 2)),
                            np.sum(get_column_as_array(node, 2)), np.sum(get_column_as_array(node_inspector, 2)),
                            np.sum(get_column_as_array(parse_server, 2)), np.sum(get_column_as_array(socket, 2))]

    server_metric_values = [server_metric1_values, server_metric2_values, server_metric3_values, server_metric4_values]


    # print(total_lines_server)

    # bar_line_graph('Empty error handling callbacks', objects_client, total_lines_client, total_metrics_client)
    # bar_line_graph('Empty error handling callbacks', objects_server, total_lines_server, total_metrics_server)

    # total_metrics_client = [np.sum(get_column_as_array(boot, 3)), np.sum(get_column_as_array(reveal, 3)),
    #                         np.sum(get_column_as_array(three, 3)), np.sum(get_column_as_array(brackets, 3)),
    #                         np.sum(get_column_as_array(pdf, 3)), np.sum(get_column_as_array(photo, 3))]
    #
    # total_metrics_server = [np.sum(get_column_as_array(express, 3)), np.sum(get_column_as_array(hexo, 3)),
    #                         np.sum(get_column_as_array(node, 3)), np.sum(get_column_as_array(node_inspector, 3)),
    #                         np.sum(get_column_as_array(parse_server, 3)), np.sum(get_column_as_array(socket, 3))]
    # print('lines ', total_lines_server)
    # print('metrics', total_metrics_server)

    # bar_line_graph('Logging error handling callbacks', objects_client, total_lines_client, total_metrics_client)
    # bar_line_graph('Logging error handling callbacks', objects_server, total_lines_server, total_metrics_server)

    # empty = []
    # consoleOnly = []
    # for client in client_array:
    #     empty.append(percentage(client, 2))
    #     consoleOnly.append(percentage(client, 3))
    # print(empty)
    # print(consoleOnly)
    # bar_graph(empty, objects_client, 'Percentage', 'Empty callbacks (client-side)')
    # bar_graph(consoleOnly, objects_client, 'Percentage', 'Logging error (client-side)')
    #
    # empty = []
    # consoleOnly = []
    # for server in server_array:
    #     empty.append(percentage(server, 2))
    #     consoleOnly.append(percentage(server, 3))
    # print(empty)
    # print(consoleOnly)
    #
    # bar_graph(empty, objects_server, 'Percentage', 'Empty callbacks (server-side)')
    # bar_graph(consoleOnly, objects_server, 'Percentage', 'Logging error (server-side)')

    # server_metric1_values = get_randomly_n_items(server_metric1_values, len(client_metric1_values))
    # np.savetxt("server_metric1_values.csv", server_metric1_values, delimiter=",")
    #
    # server_metric2_values = get_randomly_n_items(server_metric2_values, len(client_metric2_values))
    # np.savetxt("server_metric2_values.csv", server_metric2_values, delimiter=",")
    #
    # server_metric3_values = get_randomly_n_items(server_metric3_values, len(client_metric3_values))
    # np.savetxt("server_metric3_values.csv", server_metric1_values, delimiter=",")
    #
    # server_metric4_values = get_randomly_n_items(server_metric4_values, len(client_metric4_values))
    # np.savetxt("server_metric4_values.csv", server_metric4_values, delimiter=",")




    # plot_two_groups_histogram(client_metric4_values, 'client', server_metric4_values, 'server',
    #                            'Number of logging callbacks')

    #plot_two_groups_histogram(client_metric1_values, 'client', server_metric1_values, 'server', titles[0], titles[0] + '.png')
    # plot_two_groups_histogram(client_metric2_values, 'client', server_metric2_values, 'server', titles[1], titles[1] + '.png')
    # plot_two_groups_histogram(client_metric3_values, 'client', server_metric3_values, 'server', titles[2], titles[2] + '.png')
    # plot_two_groups_histogram(client_metric4_values, 'client', server_metric4_values, 'server',titles[3], titles[3] + '.png')
    #
    #
    # plot_violinplot([client_metric1_values, server_metric1_values], ['Client', 'Server'], titles[0], titles[0] + '.png')
    # plot_violinplot([client_metric2_values, server_metric2_values], ['Client', 'Server'], titles[1], titles[1] + '.png')
    # plot_violinplot([client_metric3_values, server_metric3_values], ['Client', 'Server'], titles[2], titles[2] + '.png')
    # plot_violinplot([client_metric4_values, server_metric4_values], ['Client', 'Server'], titles[3], titles[3] + '.png')

    # calculate_test(titles, client_metric_values, server_metric_values)
    # summary(client_metric1_values)
    # summary(server_metric1_values)

main()


# a1 = boot[:, 2]
# b1 = socket[:, 2]


# result = mannwhitneyu(bootstrap_data, socket_io_data)
# print(result)

# a = np.arange(25)
# print(a)
# b = np.arange(25) + 4
# print(stats.mannwhitneyu(a, b, alternative='two-sided'))


