from files import get_matrix_from_file
from metrics import get_number_of_try_catch_handlers, get_number_of_catch_promises, get_number_of_async_await_catches, \
    get_number_of_event_handlers, get_number_of_callbacks
from stats import *
from plot import *
from matrix import *

client_path = 'data/client-reviewed'
client_matrices = get_matrix_from_file(client_path)

server_path = 'data/server-reviewed'
server_matrices = get_matrix_from_file(server_path)

all_matrices = client_matrices + server_matrices

try_catch_number_of_catch = get_number_of_try_catch_handlers(all_matrices)
promise_number_of_catch = get_number_of_catch_promises(all_matrices)
async_await_number_of_catch = get_number_of_async_await_catches(all_matrices)
event_number_of_catch = get_number_of_event_handlers(all_matrices)
callback_number = get_number_of_callbacks(all_matrices)


total = try_catch_number_of_catch + promise_number_of_catch + async_await_number_of_catch + event_number_of_catch

print('------------------------------------------------------------------------------------')

promises = get_array(all_matrices, [22])
# print(len(remove_zeros(promises, 0)))
print(len(promises))
print(np.mean(promises))
print(np.var(promises))

event_raise_indices = [37, 38]
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
