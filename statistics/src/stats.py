import numpy as np
from scipy.stats import mannwhitneyu
from scipy import stats


def get_column_as_array(matrix, index):
    # return matrix[:, index]
    return [row[index] for row in matrix]


def normalize(data, factor):
    # print(data)
    normalizer = lambda x: (x * 100) / factor
    vfunc = np.vectorize(normalizer)
    return vfunc(data)


def rescale(values, new_min=0, new_max=100):
    output = []
    old_min, old_max = min(values), max(values)

    for v in values:
        new_v = 0 if v == 0.0 else (new_max - new_min) / (old_max - old_min) * (v - old_min) + new_min
        output.append(new_v)

    return output


def get_metrics(matrix, index_metric, index_loc):
    loc = np.sum(get_column_as_array(matrix, index_loc))
    print('LOC: ', loc)

    data = get_column_as_array(matrix, index_metric)
    print('data: ', data)

    data_values = list(filter(lambda x: x != 0.0, data))

    if data_values: data_values = normalize(data_values, loc)

    print('normalized: ', data_values)
    print('rescaled:', rescale(data_values))

    return data_values


def convert_matrix_to_array(matrix):
    result = []
    for row in matrix:
        row_metrics = row[2:]
        result = [a for a in row_metrics if a != 0] + result
    return result


def calculate_factor_for_matrix(matrix):
    total_lines_repo = sum(matrix[0])
    arr = [i / total_lines_repo for i in convert_matrix_to_array(matrix)]
    factor = np.amin(arr)
    return factor


def smallest_number(matrices):
    factors = []
    for matrix in matrices:
        factors.append(calculate_factor_for_matrix(matrix))
    return np.amin(factors)


def get_randomly_n_items(data, n):
    return np.random.choice(len(data), size=n, replace=False)


def get_normalized_rescaled_data(array, objects, metric_index, loc_index):
    values = []

    for i in range(0, len(array)):
        values_from_array = get_column_as_array(array[i], metric_index)
        total_of_logical_lines = sum(get_column_as_array(array[i], loc_index))
        a = rescale(normalize(values_from_array, total_of_logical_lines))
        values = values + list(filter(lambda x: x != 0, a))

    return values


def normalize_metric_by_repository(repositories, metric_index, loc_index, factor):
    repos = []
    for repo in repositories:
        metric_total = np.sum(get_column_as_array(repo, metric_index))
        repo_total_lines = np.sum(get_column_as_array(repo, loc_index))
        if repo_total_lines > 0 and metric_total > 0:
            sample_value = (metric_total * factor) / repo_total_lines
            repos.append(sample_value)
        # else:
        #     sample_value = 0

    return repos

def normalize_metric_by_script(repositories, metric_index, loc_index, factor):
    metrics = []
    for repo in repositories:
        metric_scripts = get_column_as_array(repo, metric_index)
        repo_total_lines = np.sum(get_column_as_array(repo, loc_index))
        for metric in metric_scripts:
            if repo_total_lines > 0 and metric > 0:
                sample_value = (metric * factor) / repo_total_lines
                metrics.append(sample_value)
            # else:
            #     sample_value = 0

    return metrics

def percentage(matrix, index):
    total_of_callbacks = sum(get_column_as_array(matrix, 0)) + sum(get_column_as_array(matrix, 1))
    total_of_metric = sum(get_column_as_array(matrix, index))
    if total_of_callbacks == 0:
        return 0
    else:
        return (total_of_metric / total_of_callbacks) * 100


def execute_test(client_metric, server_metric):
    result = mannwhitneyu(client_metric, server_metric, alternative='two-sided')
    return result


def normalize_array(array, objects, metric_index, loc_index):
    normalize_metric_by_repository(array, objects, metric_index, loc_index)


def summary(data):
    print(stats.describe(data))

# print(rescale(normalize([5,0,0], 16000)))
