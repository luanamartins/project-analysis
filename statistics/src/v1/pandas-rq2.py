import pandas as pd
import scipy.stats as stats
import statistics.src.config as config
import glob
import os
import json


def test_normality(x):
    k2, p = stats.normaltest(x)
    # alpha = 1e-3
    alpha = 0.05 # null hypothesis: x comes from a normal distribution
    return p < alpha
    # True -> The null hypothesis can be rejected
    # False -> The null hypothesis cannot be rejected


def variance(x, y, normal_dist):
    # alpha = 1e-3
    alpha = 0.05
    if normal_dist:
        k, p = stats.bartlett(x, y)
        return p < alpha
    else:
        k, p = stats.levene(x, y, center='mean')
        return p < alpha


def read_and_fillna(file):
    df = pd.read_csv(file)
    return df.fillna(0)


def get_sample_by_file(directory_path):
    result = []
    for file in glob.glob(os.path.join(directory_path, '*.csv')):
        result.append(read_and_fillna(file))
    # list_df = [read_and_fillna(file) for file in directory_path]
    return pd.concat(result)


def get_sample_by_repo(file_path):
    return pd.read_csv(file_path, sep=',').fillna(0)


def calc_factor(file):
    sample = pd.read_csv(file, sep=',').fillna(0)
    df = sample.drop('repo', axis=1)
    kloc = df['numberOfLogicalLines'].sum()
    return 1000 / kloc


def get_metrics():
    json_data = open(config.EXTRACT_METRICS_SRC + 'report-object.json')
    jdata = json.load(json_data)
    columns = ['repo']
    for key, value in jdata.items():
        if not key.endswith('Start') and not key.endswith('End'):
            columns.append(key)
    return columns


def run_tests(client, server, remove_zeroes, type_analysis, output_file):

    metrics = get_metrics()
    client_folder = config.RESULT_INFO + 'result-repo-client.csv'
    server_folder = config.RESULT_INFO + 'result-repo-server.csv'
    client_factor = calc_factor(client_folder)
    server_factor = calc_factor(server_folder)

    rows = []

    for metric in metrics:
        row = {}
        try:
            output_file.write(metric + '\n')
            row['metric'] = metric
            client_column = client[metric]
            client_data = client_column.multiply(client_factor, fill_value=0)
            if remove_zeroes:
                client_data = client_data[client_data != 0]

            server_column = server[metric]
            server_data = server_column.multiply(server_factor, fill_value=0)
            if remove_zeroes:
                server_data = server_data[server_data != 0]

            normality = test_normality(client_data) and test_normality(server_data)
            same_variance = variance(client_data, server_data, normality)

            p_value = 0

            if normality:
                k, p = stats.ttest_ind(client_data, server_data, equal_var=same_variance)
                p_value = p/2 # get half of p-value for one-tailed test
                row['hypothesis_test'] = 'ttest_ind'
            else:
                k, p = stats.mannwhitneyu(client_data, server_data) # performs one tailed test by default
                row['hypothesis_test'] = 'mannwhitneyu'
                p_value = p
            row['statistic'] = k
            row['p_value'] = p
            if p_value <= 0.05:
                summary_client = stats.describe(client_data)
                summary_server = stats.describe(server_data)

                row['nobs_client'] = summary_client.nobs
                row['nobs_server'] = summary_server.nobs

                tuple_min_max_client = summary_client.minmax
                tuple_min_max_server = summary_server.minmax
                row['min_client'] = tuple_min_max_client[0]
                row['min_server'] = tuple_min_max_server[0]
                row['max_client'] = tuple_min_max_client[1]
                row['max_server'] = tuple_min_max_server[1]

                row['mean_client'] = summary_client.mean
                row['mean_server'] = summary_server.mean

                row['variance_client'] = summary_client.variance
                row['variance_server'] = summary_server.variance

                row['skewness_client'] = summary_client.skewness
                row['skewness_server'] = summary_server.skewness

                row['kurtosis_client'] = summary_client.kurtosis
                row['kurtosis_server'] = summary_server.kurtosis

                output_file.write('Mean - client: ' + str(stats.describe(client_data)) + '\n')
                output_file.write('Mean - server: ' + str(stats.describe(server_data)) + '\n')
            else:
                output_file.write('Inconclusive under 5% confidence\n')

        except Exception as err:
            row['err'] = err
            output_file.write(str(err) + '\n')
        output_file.write('---------------------------------------------------\n')
        rows.append(row)

    output_file.close()
    df = pd.DataFrame(rows)
    has_zeroes_sample = '-no-zeroes' if remove_zeroes else ''
    file_name = 'rq2-results-' + type_analysis + has_zeroes_sample + '.csv'
    df.to_csv(config.RESULT_RQ_2 + file_name)


result_file = open(config.RESULT_INFO + 'rq2-results.txt', 'w')

client_file = get_sample_by_file(config.RESULT + 'client/')
server_file = get_sample_by_file(config.RESULT + 'server/')
rq2_file_no_zeroes = open(config.RESULT_RQ_2 + 'rq2-file-no-zeroes.txt', 'w')
rq2_file = open(config.RESULT_RQ_2 + 'rq2-file.txt', 'w')
run_tests(client_file, server_file, True, 'script', rq2_file_no_zeroes)
run_tests(client_file, server_file, False, 'script', rq2_file)

client_repo = get_sample_by_repo(config.RESULT_INFO + 'result-repo-client.csv')
server_repo = get_sample_by_repo(config.RESULT_INFO + 'result-repo-server.csv')
rq2_repo_no_zeroes = open(config.RESULT_RQ_2 + 'rq2-repo-no-zeroes.txt', 'w')
rq2_repo = open(config.RESULT_RQ_2 + 'rq2-repo.txt', 'w')
run_tests(client_repo, server_repo, True, 'repo', rq2_repo_no_zeroes)
run_tests(client_repo, server_repo, False, 'repo', rq2_repo)
