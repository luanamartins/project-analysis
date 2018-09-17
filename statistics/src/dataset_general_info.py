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

    print('overall')
    print('numberOfLogicalLines', df_all['numberOfLogicalLines'].sum())
    print('numberOfPhysicalLines', df_all['numberOfPhysicalLines'].sum())

    print('client')
    print('numberOfLogicalLines', df_c['numberOfLogicalLines'].sum())
    print('numberOfPhysicalLines', df_c['numberOfPhysicalLines'].sum())

    print('server')
    print('numberOfLogicalLines', df_s['numberOfLogicalLines'].sum())
    print('numberOfPhysicalLines', df_s['numberOfPhysicalLines'].sum())

    files_c = pd.read_csv(config.RESULT + 'repo-er-client.csv')
    total_files_c = files_c['total_files'].sum()
    print('total files client', total_files_c)

    files_s = pd.read_csv(config.RESULT + 'repo-er-server.csv')
    total_files_s = files_s['total_files'].sum()
    print('total files server', total_files_s)

    failed_files_c = pd.read_csv(config.RESULT + 'failed-files-client.csv')
    failed_files_s = pd.read_csv(config.RESULT + 'failed-files-server.csv')

    print('total files analyzed client', total_files_c - failed_files_c['file'].count())
    print('total files analyzed server', total_files_s - failed_files_s['file'].count())




main()