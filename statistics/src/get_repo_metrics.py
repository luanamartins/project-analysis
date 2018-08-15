import pandas as pd
import glob
import os
import statistics.src.config as config
import json


def get_repo_name(path):
    return os.path.basename(os.path.normpath(path))


def group_by_repo(repo_filename, folder):
    # Get list of metrics
    columns = list_metrics()

    # Create dataframe
    df_total = pd.DataFrame(columns=columns)

    df_total.set_index('repo')

    for file in glob.glob(os.path.join(folder, '*.csv')):
        print(file)
        df = pd.read_csv(file, sep=',')
        df_summary = df.sum()
        df_summary['repo'] = get_repo_name(file)
        df_total = df_total.append(df_summary, ignore_index=True)

    df_total.set_index('repo', inplace=True)

    df_total.to_csv(repo_filename)


def list_metrics():
    # Get report_object
    json_data = open(config.EXTRACT_METRICS_SRC + 'report-object.json')
    jdata = json.load(json_data)

    columns = ['repo']
    for key, value in jdata.items():
        # Remove counters for Start and End
        if not key.endswith('Start') and not key.endswith('End'):
            columns.append(key)
    return columns


client_repo = config.RESULT_SUMMARY + 'result-repo-client.csv'
server_repo = config.RESULT_SUMMARY + 'result-repo-server.csv'
group_by_repo(client_repo, config.RESULT + 'client')
group_by_repo(server_repo, config.RESULT + 'server')
