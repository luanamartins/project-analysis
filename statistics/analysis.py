from scipy.stats import mannwhitneyu
from numpy import genfromtxt

bootstrap_data = genfromtxt('data/bootstrap.csv', delimiter=',', skip_header=1)
socket_io_data = genfromtxt('data/socket.io.csv', delimiter=',', skip_header=1)

# mannwhitneyu(a, b)