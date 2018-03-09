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
    try_catch_empty_try_indices = [3]  # tryCatchNumberOfEmptyTries(3)
    try_catch_catches_indices = [6]  # tryCatchNumberOfCatches(6)
    try_catch_empty_catch_indices = [7]  # tryCatchNumberOfEmptyCatches(7)
    try_catch_lines_catch_indices = [8]  # tryCatchNumberOfCatchesLines(8)
    try_catch_unique_console_catch_indices = [9]  # tryCatchNumberOfCatchesWithUniqueConsole(9)
    try_catch_one_statement_catch_indices = [10]  # tryCatchNumberOfCatchesWithUniqueStatement(10)
    try_catch_finally_indices = [14]  # tryCatchNumberOfFinallies(14)

    promise_number_indices = [16]  # promiseNumberOfPromises(16)
    promise_number_catches_indices = [22]  # promiseNumberOfPromiseCatches(22)
    promises_number_catch_lines_indices = [23]  # promiseNumberOfPromiseThenRejectedLines(23)
    promises_catch_empty_indices = [24]  # promiseNumberOfPromiseCatches(24)

    async_await_indices = [27]  # asyncAwaitNumberOfAsyncs(27)
    async_await_number_of_catch_indices = [31]  # asyncAwaitNumberOfCatches(31)
    async_await_empty_catch_indices = [32]  # asyncAwaitNumberOfEmptyCatches(32)
    async_await_catch_lines_indices = [33]  # asyncAwaitNumberOfCatchesLines(33)

    event_raise_indices = [37, 38]  # eventsNumberOfEventMethodsOn(37), eventsNumberOfEventMethodsOnce(38)
    event_all_indices = [37, 38,
                         39]  # eventsNumberOfEventMethodsOn(37), eventsNumberOfEventMethodsOnce(38), eventsNumberOfEventMethodsEmit(39)
    events_handle_empty_lines = [40, 41]
    events_catch_lines_indices = [40, 41]

    callbacks_empty_indices = [49]  # callbacksNumberOfEmptyCallbacks(49)
    callbacks_indices = [47,
                         48]  # callbacksNumberOfCallbackErrorFunctions(47), callbacksNumberOfFirstErrorArgFunctions(48)
    callback_console_only_indices = [50]  # callbacksNumberOfConsoleStatementOnly(50)
    callback_lines_indices = [51]  # callbacksNumberOfLines(51)

    try_catch_number_of_try = get_value_of_metric(client_matrices, try_catch_tries_indices) + \
                              get_value_of_metric(server_matrices, try_catch_tries_indices)
    try_catch_number_of_catch = get_value_of_metric(client_matrices, try_catch_catches_indices) + \
                                get_value_of_metric(server_matrices, try_catch_catches_indices)
    try_catch_number_of_empty_catch = get_value_of_metric(client_matrices, try_catch_empty_catch_indices) + \
                                      get_value_of_metric(server_matrices, try_catch_empty_catch_indices)
    try_catch_number_of_catch_lines = get_value_of_metric(client_matrices, try_catch_lines_catch_indices) + \
                                      get_value_of_metric(server_matrices, try_catch_lines_catch_indices)
    try_catch_number_of_catch_one_statement = get_value_of_metric(client_matrices,
                                                                  try_catch_one_statement_catch_indices) + \
                                              get_value_of_metric(server_matrices,
                                                                  try_catch_one_statement_catch_indices)

    promise_number = get_value_of_metric(client_matrices, promise_number_indices) + \
                     get_value_of_metric(server_matrices, promise_number_indices)
    promise_number_of_catch = get_value_of_metric(client_matrices, promise_number_catches_indices) + \
                              get_value_of_metric(server_matrices, promise_number_catches_indices)
    promise_number_of_empty_catch = get_value_of_metric(client_matrices, promises_catch_empty_indices) + \
                                    get_value_of_metric(server_matrices, promises_catch_empty_indices)
    promise_number_of_catch_lines = get_value_of_metric(client_matrices, promises_number_catch_lines_indices) + \
                                    get_value_of_metric(server_matrices, promises_number_catch_lines_indices)
    promise_number_of_catch_one_statement = has_only_one_statement(client_matrices,
                                                                   promises_number_catch_lines_indices) + \
                                            has_only_one_statement(server_matrices, promises_number_catch_lines_indices)

    async_await_number = get_value_of_metric(client_matrices, async_await_indices) + \
                         get_value_of_metric(server_matrices, async_await_indices)
    async_await_number_of_catch = get_value_of_metric(client_matrices, async_await_number_of_catch_indices) + \
                                  get_value_of_metric(server_matrices, async_await_number_of_catch_indices)
    async_await_number_of_empty_catch = get_value_of_metric(client_matrices, async_await_empty_catch_indices) + \
                                        get_value_of_metric(server_matrices, async_await_empty_catch_indices)
    async_await_number_of_catch_lines = get_value_of_metric(client_matrices, async_await_catch_lines_indices) + \
                                        get_value_of_metric(server_matrices, async_await_catch_lines_indices)
    async_await_number_of_catch_one_statement = has_only_one_statement(client_matrices,
                                                                       async_await_catch_lines_indices) + \
                                                has_only_one_statement(server_matrices, async_await_catch_lines_indices)

    callback_number = get_value_of_metric(client_matrices, callbacks_indices) + \
                      get_value_of_metric(server_matrices, callbacks_indices)
    callback_number_of_empty_callbacks = get_value_of_metric(client_matrices, callbacks_empty_indices) + \
                                         get_value_of_metric(server_matrices, callbacks_empty_indices)
    callback_number_of_catch_lines = get_value_of_metric(client_matrices, callback_lines_indices) + \
                                     get_value_of_metric(server_matrices, callback_lines_indices)
    callback_number_of_catch_one_statement = get_value_of_metric(client_matrices, callback_console_only_indices) + \
                                             get_value_of_metric(server_matrices, callback_console_only_indices)

    event_number_of_events = get_value_of_metric(client_matrices, event_all_indices) + \
                             get_value_of_metric(server_matrices, event_all_indices)
    event_number_of_catch = get_value_of_metric(client_matrices, event_raise_indices) + \
                            get_value_of_metric(server_matrices, event_raise_indices)
    event_number_of_empty_lines = empty_block_per_file(client_matrices, events_handle_empty_lines) + \
                                  empty_block_per_file(server_matrices, events_handle_empty_lines)
    event_number_of_catch_lines = get_value_of_metric(client_matrices, events_catch_lines_indices) + \
                                  get_value_of_metric(server_matrices, events_catch_lines_indices)
    event_number_of_catch_one_statement = has_only_one_statement(client_matrices, events_catch_lines_indices) + \
                                          has_only_one_statement(server_matrices, events_catch_lines_indices)


    print('----------------------------------------------------')
    print('RQ1.2 - empty approach')

    print('Try-catch: ' + str(try_catch_number_of_empty_catch) + ' ' + str(
        get_percentage(try_catch_number_of_empty_catch, try_catch_number_of_catch)))
    print('Promises: ' + str(promise_number_of_empty_catch) + ' ' + str(
        get_percentage(promise_number_of_empty_catch, promise_number_of_catch)))
    print('Async-await: ' + str(async_await_number_of_empty_catch) + ' ' + str(
        get_percentage(async_await_number_of_empty_catch, async_await_number_of_catch)))
    print('Callbacks: ' + str(callback_number_of_empty_callbacks) + ' ' + str(
        get_percentage(callback_number_of_empty_callbacks, callback_number)))
    print('Events: ' + str(event_number_of_empty_lines) + ' ' + str(
        get_percentage(event_number_of_empty_lines, event_number_of_catch)))

    print('----------------------------------------------------')

    print('RQ1.2 - get number of lines')

    print('try-catch lines: ', try_catch_number_of_catch_lines)
    print('try-catch lines (mean): ', try_catch_number_of_catch_lines / try_catch_number_of_catch)

    print('promises lines: ', promise_number_of_catch_lines)
    print('promises lines (mean): ', promise_number_of_catch_lines / promise_number_of_catch)

    print('async-await lines: ', async_await_number_of_catch_lines)
    print('async-await lines (mean): ', async_await_number_of_catch_lines / async_await_number_of_catch)

    print('callback lines: ', callback_number_of_catch_lines)
    print('callback lines (mean): ', callback_number_of_catch_lines / callback_number)

    print('events lines: ', event_number_of_catch_lines)
    print('events lines (mean): ', event_number_of_catch_lines / event_number_of_catch)

    print('----------------------------------------------------')

    print('RQ1.2 - get only one statement error handler constructs')

    print('try-catch: ', str(try_catch_number_of_catch_one_statement))
    print('try-catch %: ', str(get_percentage(try_catch_number_of_catch_one_statement, try_catch_number_of_catch)))

    # print('promises: ', str(promise_number_of_catch_one_statement))
    # print('promises %: ', str(get_percentage(promise_number_of_catch_one_statement, promise_number_of_catch)))
    #
    # print('async-await: ', str(async_await_number_of_catch_one_statement))
    # print('async-await %: ',
    #       str(get_percentage(async_await_number_of_catch_one_statement, async_await_number_of_catch)))

    print('callback: ', str(callback_number_of_catch_one_statement))
    print('callback %: ', str(get_percentage(callback_number_of_catch_one_statement, callback_number)))

    # print('events: ', str(event_number_of_catch_one_statement))
    # print('events %: ', str(get_percentage(event_number_of_catch_one_statement, event_number_of_events)))

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

# print(["1", "2", "1"].count(1))
# print([1,2,1].count(1))

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
