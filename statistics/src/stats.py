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


def get_metric_from_project(matrix, index_metric, index_loc):
    loc = np.sum(get_column_as_array(matrix, index_loc))
    metric = np.sum(get_column_as_array(matrix, index_metric))
    return metric / loc


def get_total_lines_of_code(matrix, index):
    return np.sum(get_column_as_array(matrix, index))


def get_data(matrices, index_metric, index_loc):
    data = []
    for matrix in matrices:
        data.append(get_metric_from_project(matrix, index_metric, index_loc))
    return data


def get_randomly_n_items(data, n):
    return np.random.choice(len(data), size=n, replace=False)


def get_normalized_data(array, objects, metric_index, loc_index):
    values = []

    for i in range(0, len(array)):
        values_from_array = get_column_as_array(array[i], metric_index)
        loc = sum(get_column_as_array(array[i], loc_index))
        a = rescale(normalize(values_from_array, loc))
        values = values + list(filter(lambda x: x != 0, a))

    return values


def percentage(matrix, index):
    total_of_callbacks = sum(get_column_as_array(matrix, 0)) + sum(get_column_as_array(matrix, 1))
    total_of_metric = sum(get_column_as_array(matrix, index))
    if total_of_callbacks == 0:
        return 0
    else:
        #print(total_of_metric, ' ', total_of_callbacks)
        return (total_of_metric / total_of_callbacks) * 100


def calculate_test(titles, client_metric_values, server_metric_values):
    print('------------------------------------------------------------------')

    print(titles[0])
    result = mannwhitneyu(client_metric_values[0], server_metric_values[0], alternative='two-sided')
    print('Sample size (client): ', len(client_metric_values[0]))
    print('Sample size (server): ', len(server_metric_values[0]))
    print('Median client: ', np.median(client_metric_values[0]))
    print('Median server: ', np.median(server_metric_values[0]))
    print(result)

    print('------------------------------------------------------------------')

    print(titles[1])
    result = mannwhitneyu(client_metric_values[1], server_metric_values[1], alternative='two-sided')
    print('Sample size (client): ', len(client_metric_values[1]))
    print('Sample size (server): ', len(server_metric_values[1]))
    print('Median client: ', np.median(client_metric_values[1]))
    print('Median server: ', np.median(server_metric_values[1]))
    print(result)

    print('------------------------------------------------------------------')

    print(titles[2])
    result = mannwhitneyu(client_metric_values[2], server_metric_values[2], alternative='two-sided')
    print('Sample size (client): ', len(client_metric_values[2]))
    print('Sample size (server): ', len(server_metric_values[2]))
    print('Median client: ', np.median(client_metric_values[2]))
    print('Median server: ', np.median(server_metric_values[2]))
    print(result)

    print('------------------------------------------------------------------')

    print(titles[3])
    result = mannwhitneyu(client_metric_values[3], server_metric_values[3], alternative='two-sided')
    print('Sample size (client): ', len(client_metric_values[3]))
    print('Sample size (server): ', len(server_metric_values[3]))
    print('Median client: ', np.median(client_metric_values[3]))
    print('Median server: ', np.median(server_metric_values[3]))
    print(result)

    print('------------------------------------------------------------------')


def summary(data):
    print(stats.describe(data))

# print(rescale(normalize([5,0,0], 16000)))

