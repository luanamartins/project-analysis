import pandas as pd
import scipy.stats as stats
import config
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


def get_headers():
    json_data = open(config.DATA['extractMetricsSrc'] + 'report-object.json')
    jdata = json.load(json_data)
    columns = ['repo']
    for key, value in jdata.items():
        if not key.endswith('Start') and not key.endswith('End'):
            columns.append(key)
    return columns


def run(client, server, remove_zeroes, output_file):

    headers = get_headers()
    client_folder = config.DATA['result'] + 'result-repo-client.csv'
    server_folder = config.DATA['result'] + 'result-repo-server.csv'
    client_factor = calc_factor(client_folder)
    server_factor = calc_factor(server_folder)

    for column in headers:
        try:
            output_file.write(column + '\n')
            client_column = client[column]
            client_data = client_column.multiply(client_factor, fill_value=0)
            if remove_zeroes:
                client_data = client_data[client_data != 0]

            server_column = server[column]
            server_data = server_column.multiply(server_factor, fill_value=0)
            if remove_zeroes:
                server_data = server_data[server_data != 0]

            normality = test_normality(client_data) and test_normality(server_data)
            same_variance = variance(client_data, server_data, normality)

            p_value = 0

            if normality:
                k, p_value = stats.ttest_ind(client_data, server_data, equal_var=same_variance)
                p_value = p_value/2 # get half of p-value for one-tailed test
                output_file.write('ttest\n')
            else:
                k, p_value = stats.mannwhitneyu(client_data, server_data) # performs one tailed test by default
                output_file.write('mannwhitneyu\n')
            output_file.write('statistic: ' + str(k) + '\n')
            output_file.write('p-value: ' + str(p_value) + '\n')
            if p_value <= 0.05:
                output_file.write('Mean - client: ' + str(stats.describe(client_data)) + '\n')
                output_file.write('Mean - server: ' + str(stats.describe(server_data)) + '\n')
            else:
                output_file.write('Inconclusive under 5% confidence\n')
        except Exception as err:
            output_file.write(str(err) + '\n')
        output_file.write('---------------------------------------------------------\n')


result_file = open(config.DATA['result'] + 'rq2-results.txt', 'w')

client_file = get_sample_by_file(config.DATA['result'] + 'client/')
server_file = get_sample_by_file(config.DATA['result'] + 'server/')
rq2_file_no_zeroes = open(config.DATA['result'] + 'rq2-file-no-zeroes.txt', 'w')
rq2_file = open(config.DATA['result'] + 'rq2-file.txt', 'w')
run(client_file, server_file, True, rq2_file_no_zeroes)
run(client_file, server_file, False, rq2_file)

client_repo = get_sample_by_repo(config.DATA['result'] + 'result-repo-client.csv')
server_repo = get_sample_by_repo(config.DATA['result'] + 'result-repo-server.csv')
rq2_repo_no_zeroes = open(config.DATA['result'] + 'rq2-repo-no-zeroes.txt', 'w')
rq2_repo = open(config.DATA['result'] + 'rq2-repo.txt', 'w')
run(client_repo, server_repo, True, rq2_repo_no_zeroes)
run(client_repo, server_repo, False, rq2_repo)
