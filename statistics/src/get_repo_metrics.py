import pandas as pd
import glob
import os
import statistics.src.config as config
import json


def get_filename(path):
    return os.path.basename(os.path.normpath(path))


def group_by_repo(repo_filename, folder):
    df_total = pd.DataFrame(columns=columns)
    df_total.set_index("repo")
    for file in glob.glob(os.path.join(folder, '*.csv')):
        print(file)
        df = pd.read_csv(file, sep=',')
        df2 = df.sum()
        df2['repo'] = get_filename(file)
        df_total = df_total.append(df2, ignore_index=True)
    df_total.set_index('repo', inplace=True)
    df_total.to_csv(repo_filename)


client_folder = config.RESULT + 'client/'
server_folder = config.RESULT + 'server/'
json_data = open(config.EXTRACT_METRICS_SRC + 'report-object.json')
jdata = json.load(json_data)

columns = ['repo']
for key, value in jdata.items():
    if not key.endswith('Start') and not key.endswith('End'):
        columns.append(key)

print(columns)

client_repo = config.RESULT + 'result-repo-client.csv'
server_repo = config.RESULT + 'result-repo-server.csv'
group_by_repo(client_repo, config.RESULT + 'client')
group_by_repo(server_repo, config.RESULT + 'server')
