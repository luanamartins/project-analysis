from numpy import *
import csv
from stats import *
import config
from matrix import *
from files import *


# TODO
resultFilepath = config.DATA['statisticResultDir'] + 'general-info-result-loc-20180604.csv'
file = open(resultFilepath, 'w')

client_path = config.DATA['extractMetricsResultDir'] + 'client'
client_files = sorted([f for f in listdir(client_path) if isfile(join(client_path, f))], key=lambda s: s.lower())
client_matrices = [genfromtxt(client_path + '/' + filename, delimiter=',', skip_header=1) for filename in client_files]

server_path = config.DATA['extractMetricsResultDir'] + 'server'
server_files = sorted([f for f in listdir(server_path) if isfile(join(server_path, f))], key=lambda s: s.lower())
server_matrices = [genfromtxt(server_path + '/' + filename, delimiter=',', skip_header=1) for filename in server_files]

client_lines = get_value_of_metric(client_matrices, [0])
server_lines = get_value_of_metric(server_matrices, [0])

client_array = get_index_column_as_array_for_matrices(client_matrices, 0)
server_array = get_index_column_as_array_for_matrices(server_matrices, 0)
all_dataset = client_array + server_array

file.write('LLOCs\n')
file.write('Sum: ' + str(np.sum(all_dataset)) + '\n')
file.write('Mean: ' + str(np.mean(all_dataset)) + '\n')
file.write('Median: ' + str(np.median(all_dataset)) + '\n')

file.write('CLIENT - LLOCs\n')
file.write('Sum: '+ str(np.sum(client_array)) + '\n')
file.write('Mean: '+ str(np.mean(client_array)) + '\n')
file.write('Median: '+ str(np.median(client_array)) + '\n')

file.write('SERVER - LLOCs\n')
file.write('Sum: '+ str(np.sum(server_array)) + '\n')
file.write('Mean: '+ str(np.mean(server_array)) + '\n')
file.write('Median: '+ str(np.median(server_array)) + '\n')
