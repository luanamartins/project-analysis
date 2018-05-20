from numpy import *
from os import listdir
from os.path import isfile, join

from src.stats import *
from src.plot import *
from src.files import *

client_path = 'data/client-reviewed'
client_files = sorted([f for f in listdir(client_path) if isfile(join(client_path, f))], key=lambda s: s.lower())
client_matrices = [genfromtxt(client_path + '/' + filename, delimiter=',', skip_header=1) for filename in
                   client_files]

server_path = 'data/server-reviewed'
server_files = sorted([f for f in listdir(server_path) if isfile(join(server_path, f))], key=lambda s: s.lower())
server_matrices = [genfromtxt(server_path + '/' + filename, delimiter=',', skip_header=1) for filename in
                   server_files]

all_matrices = client_matrices + server_matrices

try_catch_catches_indices = [6]  # tryCatchNumberOfCatches(6)
try_catch_number_of_catch = get_value_of_metric(client_matrices, try_catch_catches_indices) + \
                            get_value_of_metric(server_matrices, try_catch_catches_indices)

promise_number_catches_indices = [22]  # promiseNumberOfPromiseCatches(22)
promise_number_of_catch = get_value_of_metric(client_matrices, promise_number_catches_indices) + \
                          get_value_of_metric(server_matrices, promise_number_catches_indices)

async_await_number_of_catch_indices = [31]  # asyncAwaitNumberOfCatches(31)
async_await_number_of_catch = get_value_of_metric(client_matrices, async_await_number_of_catch_indices) + \
                              get_value_of_metric(server_matrices, async_await_number_of_catch_indices)

event_raise_indices = [37, 38]  # eventsNumberOfEventMethodsOn(37), eventsNumberOfEventMethodsOnce(38)
event_number_of_catch = get_value_of_metric(client_matrices, event_raise_indices) + \
                        get_value_of_metric(server_matrices, event_raise_indices)

callbacks_indices = [47, 48]  # callbacksNumberOfCallbackErrorFunctions(47), callbacksNumberOfFirstErrorArgFunctions(48)
callback_number = get_value_of_metric(client_matrices, callbacks_indices) + \
                  get_value_of_metric(server_matrices, callbacks_indices)


total = try_catch_number_of_catch + promise_number_of_catch + async_await_number_of_catch + event_number_of_catch

# print('RQ1.1')
# print('Try-catch tries: ' + str(try_catch_number_of_catch) + ' ' + str(get_percentage(try_catch_number_of_catch, total)))
# print('Promises: ' + str(promise_number_of_catch) + ' ' + str(get_percentage(promise_number_of_catch, total)))
# print('Async-await: ' + str(async_await_number_of_catch) + ' ' + str(get_percentage(async_await_number_of_catch, total)))
# print('callbacks: ' + str(callback_number) + ' ' + str(get_percentage(callback_number, total)))
# print('Events: ' + str(event_number_of_catch) + ' ' + str(get_percentage(event_number_of_catch, total)))

print('------------------------------------------------------------------------------------')

promises = get_array(all_matrices, [22])
# print(len(remove_zeros(promises, 0)))
print(len(promises))
print(np.mean(promises))
print(np.var(promises))

events = get_array(all_matrices, event_raise_indices)
print(len(events))
print(np.mean(events))
print(np.var(events))
#
print('shapiro - promises: ', stats.anderson(promises))
print('shapiro - events: ', stats.anderson(events))
#
# print(stats.ttest_ind(promises, events, equal_var = False))


throws = get_array(all_matrices, [11])
print(len(throws))

catches = get_array(all_matrices, [6])
print(len(catches))

tries = get_array(all_matrices, [2])
print(len(tries))

finallies = get_array(all_matrices, [14])
print(len(finallies))


# m = get_index_column_as_array_for_matrices([np.matrix([[2,3],[2,3]]),np.matrix([[2,3],[2,3]])], 0)
# n = get_column_as_one_array(np.matrix([[2,3], [2,3]]), 0)
# print(n)
#
# print(np.matrix([[2,3], [2,3]])[:,0])