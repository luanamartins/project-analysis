from numpy import *
from os import listdir
from os.path import isfile, join

from files import *

metrics_labels = read_file('src/notes/metrics.txt')
client_path = 'data/client-reviewed'
client_files = sorted([f for f in listdir(client_path) if isfile(join(client_path, f))], key=lambda s: s.lower())
client_matrices = [genfromtxt(client_path + '/' + filename, delimiter=',', skip_header=1) for filename in client_files]

# execute_summary(client_matrices, metrics_labels)
