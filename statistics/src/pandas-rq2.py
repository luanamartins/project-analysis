import pandas as pd
import scipy.stats as stats
import config


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


client_folder = config.DATA['result'] + 'result-repo-client.csv'
server_folder = config.DATA['result'] + 'result-repo-server.csv'
client_sample = pd.read_csv(client_folder, sep=',').fillna(0)
client = client_sample.drop('repo', axis=1)
server_sample = pd.read_csv(server_folder, sep=',').fillna(0)
server = server_sample.drop('repo', axis=1)

client_kloc = client_sample['numberOfLogicalLines'].sum()
client_factor = 1000/client_kloc

server_kloc = server_sample['numberOfLogicalLines'].sum()
server_factor = 1000/server_kloc

result_file = open(config.DATA['result'] + 'rq2-results.txt', 'w')

for column in client_sample.columns:
    try:
        result_file.write(column + '\n')
        client_column = client[column]
        client_data = client_column.multiply(client_factor, fill_value=0)

        server_column = server[column]
        server_data = server_column.multiply(server_factor, fill_value=0)

        normality = test_normality(client_data) and test_normality(server_data)
        same_variance = variance(client_data, server_data, normality)

        p_value = 0

        if normality:
            k, p_value = stats.ttest_ind(client_data, server_data, equal_var=same_variance)
            p_value = p_value/2 # get half of p-value for one-tailed test
            result_file.write('ttest\n')
        else:
            k, p_value = stats.mannwhitneyu(client_data, server_data) # performs one tailed test by default
            result_file.write('mannwhitneyu\n')
        result_file.write('statistic: ' + str(k) + '\n')
        result_file.write('p-value: ' + str(p_value) + '\n')
        if p_value <= 0.05:
            result_file.write('Mean - client: ' + str(stats.describe(client_data)) + '\n')
            result_file.write('Mean - server: ' + str(stats.describe(server_data)) + '\n')
        else:
            result_file.write('Inconclusive under 5% confidence\n')
    except Exception as err:
        result_file.write(str(err) + '\n')
    result_file.write('--\n')