import pandas as pd
import glob
import os
import statistics.src.config as config
import json


def get_repo_name(path):
    # Normalize a pathname by collapsing redundant separators and up-level references
    norm = os.path.normpath(path)

    # Return the base name of pathname path
    return os.path.basename(norm)


def group_by_repo(folder):
    # Get list of metrics
    columns = list_metrics()

    # Create dataframe
    df_total = pd.DataFrame(columns=columns)

    # Set index
    df_total.set_index('repo')

    # Get list of CSV files from repositories
    repo_csv_files = glob.glob(os.path.join(folder, '*.csv'))

    for file in repo_csv_files:
        print(file)
        df = pd.read_csv(file, sep=',')

        # Sum all metrics and create a single Serie for it
        df_summary = df.sum()

        # Set repo column to store the repo name
        df_summary['repo'] = get_repo_name(file)

        # Save the number of rows as the number of files for the repository
        rows = df.shape[0]
        df_summary['total_files'] = rows

        df_total = df_total.append(df_summary, ignore_index=True)

    df_total.set_index('repo', inplace=True)

    return df_total


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

df_client = group_by_repo(config.RESULT + 'client')
df_client.to_csv(client_repo)

df_server = group_by_repo(config.RESULT + 'server')
df_server.to_csv(server_repo)

df_subject_systems_data = {
    'category': ['Web', 'Standalone', 'Total'],
    'subject_systems': [106, 86, 192],
    'total_files': [df_client['total_files'].sum(), df_server['total_files'].sum(),
                    df_client['total_files'].sum() + df_server['total_files'].sum()],
    'total_loc': [df_client['numberOfLogicalLines'].sum(), df_server['numberOfLogicalLines'].sum(),
                  df_client['numberOfLogicalLines'].sum() + df_server['numberOfLogicalLines'].sum()]
}

df_subject_systems = pd.DataFrame(data=df_subject_systems_data)
df_subject_systems.to_csv(config.RESULT_SUMMARY + 'result-subject-systems.csv')
