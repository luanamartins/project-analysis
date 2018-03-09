from numpy import *
from os import listdir
from os.path import isfile, join

from src.stats import *

filename = 'data/results.csv'
matrix = genfromtxt(filename, delimiter=',', skip_header=1)
client_matrix = matrix[0:85]
server_matrix = matrix[86:]

print('-------------------------------------------------------')
forks = get_column_as_array(matrix, 1)
print('forks')
print('Sum:', np.sum(forks))
print('Mean: ', np.mean(forks))
print('Median: ', np.median(forks))

forks = get_column_as_array(client_matrix, 1)
print('CLIENT - forks')
print('Sum:', np.sum(forks))
print('Mean: ', np.mean(forks))
print('Median: ', np.median(forks))

forks = get_column_as_array(server_matrix, 1)
print('SERVER - forks')
print('Sum:', np.sum(forks))
print('Mean: ', np.mean(forks))
print('Median: ', np.median(forks))

print('-------------------------------------------------------')

stars = get_column_as_array(matrix, 2)
print('stars')
print('Sum:', np.sum(stars))
print('Mean: ', np.mean(stars))
print('Median: ', np.median(stars))

stars = get_column_as_array(client_matrix, 2)
print('CLIENT - stars')
print('Sum:', np.sum(stars))
print('Mean: ', np.mean(stars))
print('Median: ', np.median(stars))

stars = get_column_as_array(server_matrix, 2)
print('SERVER - stars')
print('Sum:', np.sum(stars))
print('Mean: ', np.mean(stars))
print('Median: ', np.median(stars))

print('-------------------------------------------------------')

watchers = get_column_as_array(matrix, 3)
print('watchers')
print('Sum:', np.sum(watchers))
print('Mean: ', np.mean(watchers))
print('Median: ', np.median(watchers))

watchers = get_column_as_array(client_matrix, 3)
print('CLIENT - watchers')
print('Sum:', np.sum(watchers))
print('Mean: ', np.mean(watchers))
print('Median: ', np.median(watchers))

watchers = get_column_as_array(server_matrix, 3)
print('SERVER - watchers')
print('Sum:', np.sum(watchers))
print('Mean: ', np.mean(watchers))
print('Median: ', np.median(watchers))

print('-------------------------------------------------------')

open_issues = get_column_as_array(matrix, 4)
print('open_issues')
print('Sum:', np.sum(open_issues))
print('Mean: ', np.mean(open_issues))
print('Median: ', np.median(open_issues))

open_issues = get_column_as_array(client_matrix, 4)
print('CLIENT - open_issues')
print('Sum:', np.sum(open_issues))
print('Mean: ', np.mean(open_issues))
print('Median: ', np.median(open_issues))

open_issues = get_column_as_array(server_matrix, 4)
print('SERVER - open_issues')
print('Sum:', np.sum(open_issues))
print('Mean: ', np.mean(open_issues))
print('Median: ', np.median(open_issues))

print('-------------------------------------------------------')

closed_issues = get_column_as_array(matrix, 5)
print('closed_issues')
print('Sum:', np.sum(closed_issues))
print('Mean: ', np.mean(closed_issues))
print('Median: ', np.median(closed_issues))

closed_issues = get_column_as_array(client_matrix, 5)
print('CLIENT - closed_issues')
print('Sum:', np.sum(closed_issues))
print('Mean: ', np.mean(closed_issues))
print('Median: ', np.median(closed_issues))

closed_issues = get_column_as_array(server_matrix, 5)
print('SERVER - closed_issues')
print('Sum:', np.sum(closed_issues))
print('Mean: ', np.mean(closed_issues))
print('Median: ', np.median(closed_issues))

print('-------------------------------------------------------')

open_pull_requests = get_column_as_array(matrix, 6)
print('open_pull_requests')
print('Sum:', np.sum(open_pull_requests))
print('Mean: ', np.mean(open_pull_requests))
print('Median: ', np.median(open_pull_requests))

open_pull_requests = get_column_as_array(client_matrix, 6)
print('CLIENT - open_pull_requests')
print('Sum:', np.sum(open_pull_requests))
print('Mean: ', np.mean(open_pull_requests))
print('Median: ', np.median(open_pull_requests))

open_pull_requests = get_column_as_array(server_matrix, 6)
print('SERVER - open_pull_requests')
print('Sum:', np.sum(open_pull_requests))
print('Mean: ', np.mean(open_pull_requests))
print('Median: ', np.median(open_pull_requests))

print('-------------------------------------------------------')

closed_pull_requests = get_column_as_array(matrix, 7)
print('closed_pull_requests')
print('Sum:', np.sum(closed_pull_requests))
print('Mean: ', np.mean(closed_pull_requests))
print('Median: ', np.median(closed_pull_requests))

closed_pull_requests = get_column_as_array(client_matrix, 7)
print('CLIENT - closed_pull_requests')
print('Sum:', np.sum(closed_pull_requests))
print('Mean: ', np.mean(closed_pull_requests))
print('Median: ', np.median(closed_pull_requests))

closed_pull_requests = get_column_as_array(server_matrix, 7)
print('SERVER - closed_pull_requests')
print('Sum:', np.sum(closed_pull_requests))
print('Mean: ', np.mean(closed_pull_requests))
print('Median: ', np.median(closed_pull_requests))

print('-------------------------------------------------------')

client_path = 'data/client-reviewed'
client_files = sorted([f for f in listdir(client_path) if isfile(join(client_path, f))], key=lambda s: s.lower())
client_matrices = [genfromtxt(client_path + '/' + filename, delimiter=',', skip_header=1) for filename in client_files]

server_path = 'data/server-reviewed'
server_files = sorted([f for f in listdir(server_path) if isfile(join(server_path, f))], key=lambda s: s.lower())
server_matrices = [genfromtxt(server_path + '/' + filename, delimiter=',', skip_header=1) for filename in server_files]

client_lines = get_value_of_metric(client_matrices, [0])
server_lines = get_value_of_metric(server_matrices, [0])

client_array = get_index_column_as_array_for_matrices(client_matrices, 0)
server_array = get_index_column_as_array_for_matrices(server_matrices, 0)
all_dataset = client_array + server_array

print('LLOCs')
print('Sum:', np.sum(all_dataset))
print('Mean: ', np.mean(all_dataset))
print('Median: ', np.median(all_dataset))

print('CLIENT - LLOCs')
print('Sum:', np.sum(client_array))
print('Mean: ', np.mean(client_array))
print('Median: ', np.median(client_array))

print('SERVER - LLOCs')
print('Sum:', np.sum(server_array))
print('Mean: ', np.mean(server_array))
print('Median: ', np.median(server_array))
