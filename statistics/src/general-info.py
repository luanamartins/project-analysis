from numpy import *
import csv
from stats import *
import config
from matrix import *

filename = config.DATA['statisticDataDir'] + 'general-info.csv'
matrix = genfromtxt(filename, delimiter=',', skip_header=1)
client_matrix = matrix[0:85]
server_matrix = matrix[86:]


def get_data(matrix, index):
    data = get_column_as_array(matrix, index)
    return {
        'sum': np.sum(data),
        'mean': np.mean(data),
        'median': np.median(data),
        'min': np.min(data),
        'max': np.max(data),
        'standard_deviation': np.std(data)
    }


forks = {
    'all': get_data(matrix, 1),
    'client': get_data(client_matrix, 1),
    'server': get_data(server_matrix, 1)
}

stars = {
    'all': get_data(matrix, 2),
    'client': get_data(client_matrix, 2),
    'server': get_data(server_matrix, 2)
}

watchers = {
    'all': get_data(matrix, 3),
    'client': get_data(client_matrix, 3),
    'server': get_data(server_matrix, 3)
}

open_issues = {
    'all': get_data(matrix, 4),
    'client': get_data(client_matrix, 4),
    'server': get_data(server_matrix, 4)
}

closed_issues = {
    'all': get_data(matrix, 5),
    'client': get_data(client_matrix, 5),
    'server': get_data(server_matrix, 5)
}

open_pull_requests = {
    'all': get_data(matrix, 6),
    'client': get_data(client_matrix, 6),
    'server': get_data(server_matrix, 6)
}

closed_pull_requests = {
    'all': get_data(matrix, 7),
    'client': get_data(client_matrix, 7),
    'server': get_data(server_matrix, 7)
}

data = [
    ['-', 'ALL', 'CLIENT', 'SERVER'],

    ['forks_sum', forks['all']['sum'], forks['client']['sum'], forks['server']['sum']],
    ['forks_mean', forks['all']['mean'], forks['client']['mean'], forks['server']['mean']],
    ['forks_median', forks['all']['median'], forks['client']['median'], forks['server']['median']],
    ['forks_min', forks['all']['min'], forks['client']['min'], forks['server']['min']],
    ['forks_max', forks['all']['max'], forks['client']['max'], forks['server']['max']],
    ['forks_standard_deviation', forks['all']['standard_deviation'], forks['client']['standard_deviation'], forks['server']['standard_deviation']],


    ['stars_sum', stars['all']['sum'], stars['client']['sum'], stars['server']['sum']],
    ['stars_mean', stars['all']['mean'], stars['client']['mean'], stars['server']['mean']],
    ['stars_median', stars['all']['median'], stars['client']['median'], stars['server']['median']],
    ['stars_min', stars['all']['min'], stars['client']['min'], stars['server']['min']],
    ['stars_max', stars['all']['max'], stars['client']['max'], stars['server']['max']],
    ['stars_standard_deviation', stars['all']['standard_deviation'], stars['client']['standard_deviation'], stars['server']['standard_deviation']],

    ['watchers_sum', watchers['all']['sum'], watchers['client']['sum'], watchers['server']['sum']],
    ['watchers_mean', watchers['all']['mean'], watchers['client']['mean'], watchers['server']['mean']],
    ['watchers_median', watchers['all']['median'], watchers['client']['median'], watchers['server']['median']],
    ['watchers_min', watchers['all']['min'], watchers['client']['min'], watchers['server']['min']],
    ['watchers_max', watchers['all']['max'], watchers['client']['max'], watchers['server']['max']],
    ['watchers_standard_deviation', watchers['all']['standard_deviation'], watchers['client']['standard_deviation'], watchers['server']['standard_deviation']],

    ['open_issues_sum', open_issues['all']['sum'], open_issues['client']['sum'], open_issues['server']['sum']],
    ['open_issues_mean', open_issues['all']['mean'], open_issues['client']['mean'], open_issues['server']['mean']],
    ['open_issues_median', open_issues['all']['median'], open_issues['client']['median'], open_issues['server']['median']],
    ['open_issues_min', open_issues['all']['min'], open_issues['client']['min'], open_issues['server']['min']],
    ['open_issues_max', open_issues['all']['max'], open_issues['client']['max'], open_issues['server']['max']],
    ['open_issues_standard_deviation', open_issues['all']['standard_deviation'], open_issues['client']['standard_deviation'], open_issues['server']['standard_deviation']],


    ['closed_issues_sum', closed_issues['all']['sum'], closed_issues['client']['sum'], closed_issues['server']['sum']],
    ['closed_issues_mean', closed_issues['all']['mean'], closed_issues['client']['mean'], closed_issues['server']['mean']],
    ['closed_issues_median', closed_issues['all']['median'], closed_issues['client']['median'], closed_issues['server']['median']],
    ['closed_issues_min', closed_issues['all']['min'], closed_issues['client']['min'], closed_issues['server']['min']],
    ['closed_issues_max', closed_issues['all']['max'], closed_issues['client']['max'], closed_issues['server']['max']],
    ['closed_issues_standard_deviation', closed_issues['all']['standard_deviation'], closed_issues['client']['standard_deviation'], closed_issues['server']['standard_deviation']],

    ['open_pull_requests_sum', open_pull_requests['all']['sum'], open_pull_requests['client']['sum'], open_pull_requests['server']['sum']],
    ['open_pull_requests_mean', open_pull_requests['all']['mean'], open_pull_requests['client']['mean'], open_pull_requests['server']['mean']],
    ['open_pull_requests_median', open_pull_requests['all']['median'], open_pull_requests['client']['median'], open_pull_requests['server']['median']],
    ['open_pull_requests_min', open_pull_requests['all']['min'], open_pull_requests['client']['min'], open_pull_requests['server']['min']],
    ['open_pull_requests_max', open_pull_requests['all']['max'], open_pull_requests['client']['max'], open_pull_requests['server']['max']],
    ['open_pull_requests_standard_deviation', open_pull_requests['all']['standard_deviation'], open_pull_requests['client']['standard_deviation'], open_pull_requests['server']['standard_deviation']],

    ['closed_pull_requests_sum', closed_pull_requests['all']['sum'], closed_pull_requests['client']['sum'], closed_pull_requests['server']['sum']],
    ['closed_pull_requests_mean', closed_pull_requests['all']['mean'], closed_pull_requests['client']['mean'], closed_pull_requests['server']['mean']],
    ['closed_pull_requests_median', closed_pull_requests['all']['median'], closed_pull_requests['client']['median'], closed_pull_requests['server']['median']],
    ['closed_pull_requests_min', closed_pull_requests['all']['min'], closed_pull_requests['client']['min'], closed_pull_requests['server']['min']],
    ['closed_pull_requests_max', closed_pull_requests['all']['max'], closed_pull_requests['client']['max'], closed_pull_requests['server']['max']],
    ['closed_pull_requests_standard_deviation', closed_pull_requests['all']['standard_deviation'], closed_pull_requests['client']['standard_deviation'], closed_pull_requests['server']['standard_deviation']]

]

resultFilepath = config.DATA['statisticResultDir'] + 'general-info-result-20180604.csv'
file = open(resultFilepath, 'w')
writer = csv.writer(file)
writer.writerows(data)


# client_path = 'data/client-reviewed'
# client_files = sorted([f for f in listdir(client_path) if isfile(join(client_path, f))], key=lambda s: s.lower())
# client_matrices = [genfromtxt(client_path + '/' + filename, delimiter=',', skip_header=1) for filename in client_files]
#
# server_path = 'data/server-reviewed'
# server_files = sorted([f for f in listdir(server_path) if isfile(join(server_path, f))], key=lambda s: s.lower())
# server_matrices = [genfromtxt(server_path + '/' + filename, delimiter=',', skip_header=1) for filename in server_files]
#
# client_lines = get_value_of_metric(client_matrices, [0])
# server_lines = get_value_of_metric(server_matrices, [0])
#
# client_array = get_index_column_as_array_for_matrices(client_matrices, 0)
# server_array = get_index_column_as_array_for_matrices(server_matrices, 0)
# all_dataset = client_array + server_array
#
# file.write('LLOCs')
# file.write('Sum:', np.sum(all_dataset))
# file.write('Mean: ', np.mean(all_dataset))
# file.write('Median: ', np.median(all_dataset))
#
# file.write('CLIENT - LLOCs')
# file.write('Sum:', np.sum(client_array))
# file.write('Mean: ', np.mean(client_array))
# file.write('Median: ', np.median(client_array))
#
# file.write('SERVER - LLOCs')
# file.write('Sum:', np.sum(server_array))
# file.write('Mean: ', np.mean(server_array))
# file.write('Median: ', np.median(server_array))
