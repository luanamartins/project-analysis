import glob
import pandas as pd
import statistics.src.config as config


def main():
    client_path = config.RESULT_TODAY + 'client/'

    array = []
    for file in glob.glob(client_path + '*.csv'):
        array.append(pd.read_csv(file))

    df_c = pd.concat(array)
    df_c.reset_index(inplace=True)

    array = []
    server_path = config.RESULT_TODAY + 'server/'
    for file in glob.glob(server_path + '*.csv'):
        array.append(pd.read_csv(file))

    df_s = pd.concat(array)
    df_s.reset_index(inplace=True)

    df_all = pd.concat([df_c, df_s])
    df_all.reset_index(inplace=True)

    loc_data = {
        'client': df_c['numberOfLogicalLines'].sum(),
        'server': df_s['numberOfLogicalLines'].sum(),
        'overall': df_all['numberOfLogicalLines'].sum()
    }

    physical_lines = {
        'client': df_c['numberOfPhysicalLines'].sum(),
        'server': df_s['numberOfPhysicalLines'].sum(),
        'overall': df_all['numberOfPhysicalLines'].sum()
    }

    files_c = pd.read_csv(config.RESULT + 'repo-er-client.csv')
    total_files_c = files_c['total_files'].sum()

    files_s = pd.read_csv(config.RESULT + 'repo-er-server.csv')
    total_files_s = files_s['total_files'].sum()

    total_files = {
        'client': total_files_c,
        'server': total_files_s,
        'overall': total_files_c + total_files_s
    }

    failed_files_c = pd.read_csv(config.RESULT + 'failed-files-client.csv')
    failed_files_s = pd.read_csv(config.RESULT + 'failed-files-server.csv')

    failed_files_c = failed_files_c['file'].count()
    failed_files_s = failed_files_s['file'].count()

    files_analyzed = {
        'client': total_files_c - failed_files_c,
        'server': total_files_s - failed_files_s,
        'overall': (total_files_c - failed_files_c) + (total_files_s - failed_files_s)
    }

    data = {
        'number_logical_lines': loc_data,
        'number_physical_lines': physical_lines,
        'total_files': total_files,
        'files_analyzed': files_analyzed
    }

    df = pd.DataFrame(data=data)
    df.to_csv(config.RESULT + 'general-info.csv')


main()
