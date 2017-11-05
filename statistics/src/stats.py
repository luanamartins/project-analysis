import numpy as np


def get_column_as_array(matrix, index):
    return matrix[:, index]


def normalize(data, factor):
    # print(data)
    normalizer = lambda x: (x * 1000) / factor
    vfunc = np.vectorize(normalizer)
    return vfunc(data)


def rescale(values, new_min=0, new_max=100):
    output = []
    old_min, old_max = min(values), max(values)

    for v in values:
        new_v = (new_max - new_min) / (old_max - old_min) * (v - old_min) + new_min
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


def get_data(matrices, index_metric, index_loc):
    data = []
    for matrix in matrices:
        data.append(get_metric_from_project(matrix, index_metric, index_loc))
    return data


# print(normalize([1,2,3,4,5,6], 200))

