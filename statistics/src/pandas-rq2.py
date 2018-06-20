import pandas as pd
from scipy.stats import mannwhitneyu, ttest_ind, normaltest
import config


def test_normality(x):
    k2, p = normaltest(x)
    alpha = 1e-3
    if p < alpha:  # null hypothesis: x comes from a normal distribution
        # print("The null hypothesis can be rejected")
        return True
    else:
        # print("The null hypothesis cannot be rejected")
        return False


client_folder = config.DATA['result'] + 'result-repo-client.csv'
server_folder = config.DATA['result'] + 'result-repo-server.csv'
client_sample = pd.read_csv(client_folder, sep=',')
server_sample = pd.read_csv(server_folder, sep=',')

for column in client_sample.columns:
    try:
        print(column)
        client = client_sample[column].fillna(0)
        server = server_sample[column].fillna(0)
        if test_normality(client) and test_normality(server):
            print(ttest_ind(client, server, equal_var=True))
        else:
            print(mannwhitneyu(client, server))
    except Exception as err:
        print(err)
    print('--')