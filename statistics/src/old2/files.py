from os import listdir
from os.path import isfile, join
from numpy import genfromtxt


def read_file(filename):
    return [line.rstrip('\n') for line in open(filename)]


def get_matrix_from_file(filepath):
    files = sorted([f for f in listdir(filepath) if isfile(join(filepath, f))], key=lambda s: s.lower())
    return [genfromtxt(filepath + '/' + filename, delimiter=',', skip_header=1) for filename in files]
