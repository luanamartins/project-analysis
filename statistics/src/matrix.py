from stats import *


def get_column_as_array(matrix, index):
    if matrix.ndim == 1:
        return [matrix[index]]
    else:
        return [row[index] for row in matrix]


def get_column_as_one_array(matrices, index):
    result = []
    for matrix in matrices:
        result.append(matrix[:, index])
    return result


def total_lines(matrices):
    lines = 0
    for matrix in matrices:
        lines += sum(get_column_as_array(matrix, 0))
    return lines


def total_files(matrices):
    files = 0
    for matrix in matrices:
        files += len(matrix)
    return files


def get_value_of_metric(matrices, indices):
    total = 0
    for matrix in matrices:
        if matrix.ndim == 1:
            for index in indices:
                if matrix[index] > 0:
                    total += 1
        else:
            for row in matrix:
                for index in indices:
                    if row[index] > 0:
                        total += 1
                        break
    return total


def get_value_of_metric_event_empty(matrices):
    total = 0
    for matrix in matrices:
        if matrix.ndim == 1:
            if (matrix[38] == 1 and matrix[41] == 0) or (matrix[37] == 1 and matrix[40] == 0):
                total += 1
        else:
            for row in matrix:
                if (row[38] == 1 and row[41] == 0) or (row[37] == 1 and row[40] == 0):
                    total += 1
    return total


def get_value_equals_to(matrices, index, value):
    total = 0
    for matrix in matrices:
        if matrix.ndim == 1:
            if matrix[index] == value:
                total += 1
        else:
            for row in matrix:
                if row[index] == value:
                    total += 1
    return total


def get_array(matrices, indices):
    total = []
    for matrix in matrices:
        if matrix.ndim == 1:
            for index in indices:
                if matrix[index] > 0:
                    total.append(matrix[index])
        else:
            for row in matrix:
                for index in indices:
                    if row[index] > 0:
                        total.append(row[index])
    return total


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
        if type(row) is np.ndarray:
            row_metrics = row[2:]
            result = [a for a in row_metrics if a != 0] + result
    return result
