from numpy import *
from os import listdir
from os.path import isfile, join

from stats import *


def norm(value, total):
    return (value/total) * 1000

client_path = 'data/client-reviewed'
client_files = sorted([f for f in listdir(client_path) if isfile(join(client_path, f))], key=lambda s: s.lower())
client_matrices = [genfromtxt(client_path + '/' + filename, delimiter=',', skip_header=1) for filename in client_files]

server_path = 'data/server-reviewed'
server_files = sorted([f for f in listdir(server_path) if isfile(join(server_path, f))], key=lambda s: s.lower())
server_matrices = [genfromtxt(server_path + '/' + filename, delimiter=',', skip_header=1) for filename in server_files]

total_lines_indice = [0]
client_lines = get_value_of_metric(client_matrices, total_lines_indice)
server_lines = get_value_of_metric(client_matrices, total_lines_indice)

try_catch_catches_indices = [6]  # tryCatchNumberOfCatches(6)
client_try_catch_number_of_catch = get_value_of_metric(client_matrices, try_catch_catches_indices)
server_try_catch_number_of_catch = get_value_of_metric(server_matrices, try_catch_catches_indices)
client_try_catch_number_of_empty_catch = get_value_of_metric(client_matrices, [7])
server_try_catch_number_of_empty_catch = get_value_of_metric(server_matrices, [7])

promise_number_catches_indices = [22]  # promiseNumberOfPromiseCatches(22)
client_promise_number_of_catch = get_value_of_metric(client_matrices, promise_number_catches_indices)
server_promise_number_of_catch = get_value_of_metric(server_matrices, promise_number_catches_indices)
client_promise_number_of_empty_catch = get_value_of_metric(client_matrices, [24])
server_promise_number_of_empty_catch = get_value_of_metric(server_matrices, [24])

async_await_number_of_catch_indices = [31]  # asyncAwaitNumberOfCatches(31)
client_async_await_number_of_catch = get_value_of_metric(client_matrices, async_await_number_of_catch_indices)
server_async_await_number_of_catch = get_value_of_metric(server_matrices, async_await_number_of_catch_indices)
client_async_await_number_of_empty_catch = get_value_of_metric(client_matrices, [32])
server_async_await_number_of_empty_catch = get_value_of_metric(server_matrices, [32])

event_number_of_catch_indices = [37,38]  # eventsNumberOfEventMethodsOn(37), eventsNumberOfEventMethodsOnce(38)
client_event_number_of_catch = get_value_of_metric(client_matrices, event_number_of_catch_indices)
server_event_number_of_catch = get_value_of_metric(server_matrices, event_number_of_catch_indices)
client_event_number_of_empty_catch = get_value_of_metric_event_empty(client_matrices)
server_event_number_of_empty_catch = get_value_of_metric_event_empty(server_matrices)

callback_number_of_catch_indices = [47,48]  # callbacksNumberOfCallbackErrorFunctions(47), callbacksNumberOfFirstErrorArgFunctions(48)
client_callback_number_of_catch = get_value_of_metric(client_matrices, callback_number_of_catch_indices)
server_callback_number_of_catch = get_value_of_metric(server_matrices, callback_number_of_catch_indices)
client_callback_number_of_empty_catch = get_value_of_metric(client_matrices, [49])
server_callback_number_of_empty_catch = get_value_of_metric(server_matrices, [49])

print('--------------------------------------------------------------------------')
print('Number of constructions')
print('Client')
print('Try-catch: ' + str(norm(client_try_catch_number_of_catch, client_lines)))
print('Async-await: ' + str(norm(client_async_await_number_of_catch,client_lines)))

print('Promises: ' + str(norm(client_promise_number_of_catch,client_lines)))
print('Callbacks: ' + str(norm(client_callback_number_of_catch,client_lines)))
print('Events: ' + str(norm(client_event_number_of_catch,client_lines)))

print('events == 1 ' + str(get_value_equals_to(client_matrices, 37, 1)))
print('events == 1 ' + str(get_value_equals_to(client_matrices, 38, 1)))

print('events lines == 0 ' + str(get_value_equals_to(client_matrices, 40, 0)))
print('events lines == 0 ' + str(get_value_equals_to(client_matrices, 41, 0)))


print('events == 1 ' + str(get_value_equals_to(server_matrices, 37, 1)))
print('events == 1 ' + str(get_value_equals_to(server_matrices, 38, 1)))

print('events lines == 0 ' + str(get_value_equals_to(server_matrices, 40, 0)))
print('events lines == 0 ' + str(get_value_equals_to(server_matrices, 41, 0)))


print('Server')
print('Try-catch: ' + str(norm(server_try_catch_number_of_catch,server_lines)))
print('Async-await: ' + str(norm(server_async_await_number_of_catch,server_lines)))

print('Promises: ' + str(norm(server_promise_number_of_catch,server_lines)))
print('Callbacks: ' + str(norm(server_callback_number_of_catch,server_lines)))
print('Events: ' + str(norm(server_event_number_of_catch,server_lines)))

print('--------------------------------------------------------------------------')
print('Number of empty constructions')
print('Client')
print('Try-catch: ' + str(norm(client_try_catch_number_of_empty_catch,client_lines)))
print('Async-await: ' + str(norm(client_async_await_number_of_empty_catch,client_lines)))

print('Promises: ' + str(norm(client_promise_number_of_empty_catch,client_lines)))
print('Callbacks: ' + str(norm(client_callback_number_of_empty_catch,client_lines)))
print('Events: ' + str(norm(client_event_number_of_empty_catch,client_lines)))

print('Server')
print('Try-catch: ' + str(norm(server_try_catch_number_of_empty_catch,server_lines)))
print('Async-await: ' + str(norm(server_async_await_number_of_empty_catch,server_lines)))

print('Promises: ' + str(norm(server_promise_number_of_empty_catch,server_lines)))
print('Callbacks: ' + str(norm(server_callback_number_of_empty_catch,server_lines)))
print('Events: ' + str(norm(server_event_number_of_empty_catch,server_lines)))

print('--------------------------------------------------------------------------')

