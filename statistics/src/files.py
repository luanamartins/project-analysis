def read_file(filename):
    return [line.rstrip('\n') for line in open(filename)]