from numpy import *
from os import listdir
from os.path import isfile, join

from src.stats import *
from src.files import *

client_path = 'data/client-reviewed'
client_files = sorted([f for f in listdir(client_path) if isfile(join(client_path, f))], key=lambda s: s.lower())
client_matrices = [genfromtxt(client_path + '/' + filename, delimiter=',', skip_header=1) for filename in client_files]

server_path = 'data/server-reviewed'
server_files = sorted([f for f in listdir(server_path) if isfile(join(server_path, f))], key=lambda s: s.lower())
server_matrices = [genfromtxt(server_path + '/' + filename, delimiter=',', skip_header=1) for filename in server_files]

factor = calculate_factor(client_matrices, server_matrices)
print('Factor: ', factor)
metrics_labels = read_file('src/notes/metrics.txt')
loc_index = 0

execute_tests(client_matrices, server_matrices, factor, loc_index, metrics_labels, 'less')
