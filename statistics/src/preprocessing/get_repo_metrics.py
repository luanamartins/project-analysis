import glob
import os
import json
import pandas as pd
import statistics.src.constants as constants


def get_repo_name(path):
    # Normalize a pathname by collapsing redundant separators and up-level references
    norm = os.path.normpath(path)

    # Return the base name of pathname path
    return os.path.basename(norm)


def group_by_repo(folder):
    # Get list of metrics
    columns = list_metrics()

    # Create DataFrame
    df_total = pd.DataFrame(columns=columns)

    df_total.set_index('repo')

    for file in glob.glob(os.path.join(folder, '*.csv')):
        print(file)
        df = pd.read_csv(file, sep=',')

        df_summary = df.sum()
        df_summary['repo'] = get_repo_name(file)

        rows = df.shape[0]
        df_summary['total_files'] = rows

        df_total = df_total.append(df_summary, ignore_index=True)

    df_total.set_index('repo', inplace=True)

    return df_total


def list_metrics():
    # Get report_object
    json_data = open(constants.EXTRACT_METRICS_SRC + 'report-object.json')
    jdata = json.load(json_data)

    columns = ['repo']
    for key, value in jdata.items():
        # Remove counters for Start and End
        if not key.endswith('Start') and not key.endswith('End'):
            columns.append(key)
    return columns


# client_repo = config.RESULT_SUMMARY + 'result-repo-client.csv'
# server_repo = config.RESULT_SUMMARY + 'result-repo-server.csv'
#
# df_client = group_by_repo(config.RESULT + 'result-2017/client')
# df_client.to_csv(client_repo)
#
# df_server = group_by_repo(config.RESULT + 'result-2017/server')
# df_server.to_csv(server_repo)
#
# df_subject_systems = {
#     'category': ['Web', 'Standalone'],
#     'subject_systems': [106, 86],
#     'total_files': [],
#     'total_loc':[]
# }