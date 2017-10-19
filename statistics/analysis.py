# from scipy.stats import mannwhitneyu
from numpy import genfromtxt
import numpy as np
from scipy import stats

bootstrap_data = genfromtxt('data/bootstrap.csv', delimiter=',', skip_header=1)
socket_io_data = genfromtxt('data/socket.io.csv', delimiter=',', skip_header=1)

# result = mannwhitneyu(bootstrap_data, socket_io_data)
# print(result)

a = np.arange(25)
print(a)
b = np.arange(25) + 4
print(stats.mannwhitneyu(a, b, alternative='two-sided'))
