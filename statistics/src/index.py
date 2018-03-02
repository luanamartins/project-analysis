from numpy import *
from os import listdir
from os.path import isfile, join

from src.stats import *
from src.plot import *
from src.files import *


def main():
    client_path = 'data/client-reviewed'
    client_files = sorted([f for f in listdir(client_path) if isfile(join(client_path, f))], key=lambda s: s.lower())
    client_matrices = [genfromtxt(client_path + '/' + filename, delimiter=',', skip_header=1) for filename in
                       client_files]

    server_path = 'data/server-reviewed'
    server_files = sorted([f for f in listdir(server_path) if isfile(join(server_path, f))], key=lambda s: s.lower())
    server_matrices = [genfromtxt(server_path + '/' + filename, delimiter=',', skip_header=1) for filename in
                       server_files]

    client_lines = total_lines(client_matrices)
    server_lines = total_lines(server_matrices)

    client_total_files = total_files(client_matrices)
    server_total_files = total_files(server_matrices)

    # print('Client: ' + str(client_lines))
    # print('Server: ' + str(server_lines))
    # print('Total of lloc: ' + str(client_lines + server_lines))

    # print('Total of files (Client): ' + str(client_total_files))
    # print('Total of files (Server): ' + str(server_total_files))
    # print('Total of files: ' + str(client_total_files + server_total_files))

    try_catch_tries_indices = [2]  # tryCatchNumberOfTries(2)
    try_catch_catches_indices = [6]  # tryCatchNumberOfCatches(6)
    try_catch_finally_indices = [14]  # tryCatchNumberOfFinallies(14)
    try_catch_empty_try_indices = [3]  # tryCatchNumberOfEmptyTries(3)
    try_catch_empty_catch_indices = [7]  # tryCatchNumberOfEmptyCatches(7)

    promise_number_indices = [16]  # promiseNumberOfPromises(16)
    promise_number_catches_indices = [22]  # promiseNumberOfPromiseCatches(22)

    async_await_number_async_indices = [31]  # asyncAwaitNumberOfCatchesLines

    event_raise_indices = [37, 38]  # eventsNumberOfEventMethodsOn(37), eventsNumberOfEventMethodsOnce(38)
    event_all_indices = [37, 38,
                         39]  # eventsNumberOfEventMethodsOn(37), eventsNumberOfEventMethodsOnce(38), eventsNumberOfEventMethodsEmit(39)

    try_catch_client_try = total_category_files(client_matrices, try_catch_tries_indices)
    try_catch_server_try = total_category_files(server_matrices, try_catch_tries_indices)

    try_catch_client_catch = total_category_files(client_matrices, try_catch_catches_indices)
    try_catch_server_catch = total_category_files(server_matrices, try_catch_catches_indices)

    try_catch_client_finally = total_category_files(client_matrices, try_catch_finally_indices)
    try_catch_server_finally = total_category_files(server_matrices, try_catch_finally_indices)

    try_catch_empty_catch_client = total_category_files(client_matrices, try_catch_empty_catch_indices)
    try_catch_empty_catch_server = total_category_files(server_matrices, try_catch_empty_catch_indices)

    promises_client = total_category_files(client_matrices, promise_number_catches_indices)
    promises_server = total_category_files(server_matrices, promise_number_catches_indices)

    async_await_client = total_category_files(client_matrices, async_await_number_async_indices)
    async_await_server = total_category_files(server_matrices, async_await_number_async_indices)

    events_client = total_category_files(client_matrices, event_all_indices)
    events_server = total_category_files(server_matrices, event_all_indices)

    number_events_catch = total_category_files(client_matrices, event_raise_indices) + \
                   total_category_files(server_matrices, event_raise_indices)

    # none_client = client_total_files - promises_client - async_await_client - events_client
    # none_server = server_total_files - promises_server - async_await_server - events_server

    print('RQ1.1')

    tries = try_catch_client_catch + try_catch_server_catch
    promises = promises_client + promises_server
    async_await = async_await_client + async_await_server
    events = events_client + events_server
    total = tries + promises + async_await + events

    print('Try-catch tries: ' + str(tries) + ' ' + str((tries * 100 / total)))
    print('Promises: ' + str(promises) + ' ' + str((promises * 100 / total)))
    print('Async-await: ' + str(async_await) + ' ' + str((async_await * 100 / total)))
    print('Events: ' + str(events) + ' ' + str((events * 100 / total)))

    print('----------------------------------------------------')

    # promises_array = np.array(get_column_as_array(client_matrices, promise_number_catches_indices) + \
    #                  get_column_as_array(server_matrices, promise_number_catches_indices))
    # number_events_catch = np.array(get_column_as_array(client_matrices, event_raise_indices) + \
    #                get_column_as_array(server_matrices, event_raise_indices))
    # print(ztest(promises_array, number_events_catch))

    print('----------------------------------------------------')

    print('RQ1.2 - empty approach')

    try_catch_empty_catch_indices = [7]
    try_catch_catches_indices = [6]

    promises_catch_empty_indices = [24]
    promises_catch_indices = [22]

    async_await_empty_catch_indices = [32]
    async_await_catch_indices = [31]

    callbacks_empty_indices = [49]
    callbacks_indices = [47, 48]

    events_handle_lines = [37,38]
    events_handle_empty_lines = [40, 41]


    try_catch_empty_array = total_category_files(client_matrices, try_catch_empty_catch_indices) + \
                            total_category_files(server_matrices, try_catch_empty_catch_indices)
    try_catch_total_catches = total_category_files(client_matrices, try_catch_catches_indices) + \
                            total_category_files(server_matrices, try_catch_catches_indices)

    promises_empty_array = total_category_files(client_matrices, promises_catch_empty_indices) + \
                           total_category_files(server_matrices, promises_catch_empty_indices)
    promises_array = total_category_files(client_matrices, promises_catch_indices) + \
                           total_category_files(server_matrices, promises_catch_indices)


    async_await_empty_array = total_category_files(client_matrices, async_await_empty_catch_indices) + \
                              total_category_files(server_matrices, async_await_empty_catch_indices)
    async_await_array = total_category_files(client_matrices, async_await_catch_indices) + \
                              total_category_files(server_matrices, async_await_catch_indices)

    callback_empty_array = total_category_files(client_matrices, callbacks_empty_indices) + \
                           total_category_files(server_matrices, callbacks_empty_indices)
    callback_array = total_category_files(client_matrices, callbacks_indices) + \
                           total_category_files(server_matrices, callbacks_indices)

    events_empty_array = empty_block_per_file(client_matrices, events_handle_empty_lines) + \
                         empty_block_per_file(server_matrices, events_handle_empty_lines)
    number_events_catch = total_category_files(client_matrices, events_handle_lines) + \
                          total_category_files(server_matrices, events_handle_lines)


    print('Try-catch: ' + str(try_catch_empty_array) + ' ' + str((try_catch_empty_array*100)/try_catch_total_catches))
    print('Promises: ' + str(promises_empty_array) + ' ' + str((promises_empty_array*100)/promises_array))
    print('Async-await: ' + str(async_await_empty_array) + ' ' + str((async_await_empty_array*100)/async_await_array))
    print('Callbacks: ' + str(callback_empty_array) + ' ' + str((callback_empty_array*100)/callback_array))
    print('Events: ' + str(events_empty_array) + ' ' + str(get_percentage(events_empty_array, number_events_catch)))

    print('----------------------------------------------------')

    print('RQ1.2 - get number of lines')

    try_catch_lines_indices = [8]
    lines = total_category_files(client_matrices, try_catch_lines_indices) + \
            total_category_files(server_matrices, try_catch_lines_indices)
    print('try-catch lines: ', lines)
    print('try-catch lines (mean): ', lines/try_catch_total_catches)

    promises_catch_lines_indices = [23]
    lines = total_category_files(client_matrices, promises_catch_lines_indices) + \
            total_category_files(server_matrices, promises_catch_lines_indices)
    print('promises lines: ', lines)
    print('promises lines (mean): ', lines/promises_array)

    async_await_catch_lines_indices = [33]
    lines = total_category_files(client_matrices, async_await_catch_lines_indices) + \
            total_category_files(server_matrices, async_await_catch_lines_indices)
    print('async-await lines: ', lines)
    print('async-await lines (mean): ', lines/async_await_array)

    callback_lines_indices = [51]
    lines = total_category_files(client_matrices, callback_lines_indices) + \
            total_category_files(server_matrices, callback_lines_indices)
    print('callback lines: ', lines)
    print('callback lines (mean): ', lines/callback_array)

    events_catch_lines_indices = [40, 41]
    lines = total_category_files(client_matrices, events_catch_lines_indices) + \
            total_category_files(server_matrices, events_catch_lines_indices)
    print('events lines: ', lines)
    print('events lines (mean): ', lines/number_events_catch)



    print('----------------------------------------------------')

    print('Total of files: ' + str(client_total_files) + ' ' + str(server_total_files))
    print('Total of lines: ' + str(client_lines) + ' ' + str(server_lines))
    print('Total of repositories: ' + str(len(client_matrices)) + ' ' + str(len(server_matrices)))


    factor = calculate_factor(client_matrices, server_matrices)
    print('Factor: ', factor)
    metrics_labels = read_file('src/notes/metrics.txt')
    loc_index = 0
    #
    # # execute_summary(client_matrices, metrics_labels)
    #
    # execute_tests(client_matrices, factor, loc_index, metrics_labels, server_matrices)
    #
    # client_error_handling = error_handling_percent_per_matrix(client_matrices, loc_index)
    # server_error_handling = error_handling_percent_per_matrix(server_matrices, loc_index)
    #
    # print('Client: ', client_error_handling)
    # print('Server: ', server_error_handling)

    # bar_line_graph('Empty error handling callbacks', objects_client, total_lines_client, total_metrics_client)
    # bar_line_graph('Empty error handling callbacks', objects_server, total_lines_server, total_metrics_server)

    # bar_graph(empty, objects_client, 'Percentage', 'Empty callbacks (client-side)')
    # bar_graph(consoleOnly, objects_client, 'Percentage', 'Logging error (client-side)')

    # bar_graph(empty, objects_server, 'Percentage', 'Empty callbacks (server-side)')
    # bar_graph(consoleOnly, objects_server, 'Percentage', 'Logging error (server-side)')

    # plot_two_groups_histogram(client_metric4_values, 'client', server_metric4_values, 'server','Number of logging callbacks')

    # plot_two_groups_histogram(client_metric1_values, 'client', server_metric1_values, 'server', titles[0], titles[0] + '.png')

    # plot_violinplot([client_metric1_values, server_metric1_values], ['Client', 'Server'], titles[0], titles[0] + '.png')


def calculate_factor(client_matrices, server_matrices):
    client_factor = smallest_number(client_matrices)
    server_factor = smallest_number(server_matrices)
    factor = min(client_factor, server_factor)
    dot_and_zero_size = 2
    if factor < 1:
        factor = len(str(1 / factor)) - dot_and_zero_size
        factor = pow(10, factor)
    return factor


def execute_tests(client_matrices, factor, loc_index, metrics_labels, server_matrices):
    # less, greater, two-sided
    alternative = 'greater'

    for metric_index in range(2, 50):
        client_normalized = normalize_metric_by_repository(client_matrices, metric_index, loc_index, factor)
        server_normalized = normalize_metric_by_repository(server_matrices, metric_index, loc_index, factor)
        print('------------------------------------------------------------------')
        print('Metric index:', metric_index)
        print('Metric name: ', metrics_labels[metric_index])
        print('Sample size (client): ', len(client_normalized))
        print('Sample size (server): ', len(server_normalized))
        print('Median client: ', np.median(client_normalized))
        print('Median server: ', np.median(server_normalized))
        # print('Client: ', client_normalized)
        # print('Server: ', server_normalized)
        try:
            test_result = execute_test(client_normalized, server_normalized, alternative)
            print(test_result)
            print(test_result.pvalue)
            # plot_two_groups_histogram_test(client_normalized, server_normalized, metrics_labels[metric_index])

        except Exception as inst:
            print(inst)
        print('------------------------------------------------------------------')


def execute_summary(matrices, metrics_labels):
    for metric_index in range(2, 50):
        metrics = []
        for matrix in matrices:
            metric_values = [i for i in get_column_as_array(matrix, metric_index) if i != 0]
            if metric_values is not []:
                metrics = metrics + metric_values
        print(metrics_labels[metric_index])
        if len(metrics) != 0:
            summary(metrics)
        else:
            print('empty array')
        print('------------------------------------------------------------------')


def test(matrices):
    matrix_pos = 0
    for matrix in matrices:
        second = get_column_as_array(matrix, 2)
        third = get_column_as_array(matrix, 3)
        size = len(second)
        for i in range(0, size):
            if third[i] > second[i]:
                print('Size: ', size)
                print(third[i], ' ', second[i])
                print('matrix_pos: ', matrix_pos)
                print('file: ', i)
        matrix_pos += 1
    # print(get_column_as_array([[1,2,3,4],[1,2,3,4],[1,2,3,4],[1,2,3,4]], 1))


main()

# a1 = boot[:, 2]
# b1 = socket[:, 2]


# result = mannwhitneyu(bootstrap_data, socket_io_data)
# print(result)

# a = np.array([25])
# a = np.arange(25)
# a = np.array([[ -7.94627203e+01,  -1.81562235e+02,  -3.05418070e+02,  -2.38451033e+02],[  9.43740653e+01,   1.69312771e+02,   1.68545575e+01,  -1.44450299e+02],[  5.61599000e+00,   8.76135909e+01,   1.18959245e+02,  -1.44049237e+02]])
# print(a.ndim)
# print(a)
# print(get_column_as_array(a, 0))
# b = np.arange(25) + 4
# print(stats.mannwhitneyu(a, b, alternative='two-sided'))
