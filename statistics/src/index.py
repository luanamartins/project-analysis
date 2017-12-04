from numpy import *
from os import listdir
from os.path import isfile, join


from src.stats import *
from src.plot import *
from src.files import *


def main():
    client_path = 'data/client'
    client_files = [f for f in listdir(client_path) if isfile(join(client_path, f))]
    client_matrices = [genfromtxt(client_path + '/' + filename, delimiter=',', skip_header=1) for filename in client_files]

    server_path = 'data/server'
    server_files = [f for f in listdir(server_path) if isfile(join(server_path, f))]
    server_matrices = [genfromtxt(server_path + '/' + filename, delimiter=',', skip_header=1) for filename in
                       server_files]

    client_factor = smallest_number(client_matrices)
    server_factor = smallest_number(server_matrices)
    factor = min(client_factor, server_factor)
    dot_and_zero_size = 2
    if factor < 1:
        factor = len(str(1/factor)) - dot_and_zero_size
        factor = pow(10, factor)

    metrics_labels = read_file('src/notes/metrics.txt')
    loc_index = 0

    execute_tests(client_matrices, factor, loc_index, metrics_labels, server_matrices)

    client_error_handling = error_handling_percent_per_matrix(client_matrices, loc_index)
    server_error_handling = error_handling_percent_per_matrix(server_matrices, loc_index)

    print('Client: ', client_error_handling)
    print('Server: ', server_error_handling)

        # bar_line_graph('Empty error handling callbacks', objects_client, total_lines_client, total_metrics_client)
        # bar_line_graph('Empty error handling callbacks', objects_server, total_lines_server, total_metrics_server)

        # bar_graph(empty, objects_client, 'Percentage', 'Empty callbacks (client-side)')
        # bar_graph(consoleOnly, objects_client, 'Percentage', 'Logging error (client-side)')

        # bar_graph(empty, objects_server, 'Percentage', 'Empty callbacks (server-side)')
        # bar_graph(consoleOnly, objects_server, 'Percentage', 'Logging error (server-side)')

        # plot_two_groups_histogram(client_metric4_values, 'client', server_metric4_values, 'server','Number of logging callbacks')

        #plot_two_groups_histogram(client_metric1_values, 'client', server_metric1_values, 'server', titles[0], titles[0] + '.png')

        # plot_violinplot([client_metric1_values, server_metric1_values], ['Client', 'Server'], titles[0], titles[0] + '.png')

        # calculate_test(titles, client_metric_values, server_metric_values)
        # summary(client_metric1_values)
        # summary(server_metric1_values)


def execute_tests(client_matrices, factor, loc_index, metrics_labels, server_matrices):
    for metric_index in range(2, 50):

        client_normalized = normalize_metric_by_script(client_matrices, metric_index, loc_index, factor)
        server_normalized = normalize_metric_by_script(server_matrices, metric_index, loc_index, factor)
        print('------------------------------------------------------------------')
        print('Metric index:', metric_index)
        print('Metric name: ', metrics_labels[metric_index])
        print('Sample size (client): ', len(client_normalized))
        print('Sample size (server): ', len(server_normalized))
        print('Median client: ', np.median(client_normalized))
        print('Median server: ', np.median(server_normalized))
        print('Client: ', client_normalized)
        print('Server: ', server_normalized)
        try:
            test_result = execute_test(client_normalized, server_normalized)
            print(test_result)
            print(test_result.pvalue)
            # plot_two_groups_histogram_test(client_normalized, server_normalized, metrics_labels[metric_index])

        except Exception as inst:
            print(inst)
        print('------------------------------------------------------------------')


main()


# a1 = boot[:, 2]
# b1 = socket[:, 2]


# result = mannwhitneyu(bootstrap_data, socket_io_data)
# print(result)

# a = np.arange(25)
# print(a)
# b = np.arange(25) + 4
# print(stats.mannwhitneyu(a, b, alternative='two-sided'))


