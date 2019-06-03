import glob
import pandas as pd
import statistics.src.config as config


def number_of_handlers(df_raw):
    df = df_raw.copy()
    df[config.COUNT] = 1
    df_g = df.groupby([config.MECH, config.TYPE], as_index=False).sum()
    columns = [config.MECH, config.LINES, config.STMTS, config.TYPE, config.COUNT]
    df_g = df_g[columns]
    df_g.to_csv(config.RESULT + 'number_of_handlers.csv')
    print(df_g.head())


def get_general_info(type):
    path = config.RESULT_TODAY + type + '/'

    array = []
    for file in glob.glob(path + '*.csv'):
        df = pd.read_csv(file, index_col=0)
        df[config.REPO] = file.rsplit('/', 1)[-1]
        df[config.TYPE] = type
        array.append(df)

    df = pd.concat(array, sort=False)
    df.reset_index(inplace=True)

    return df


def create_general_info():
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
    median_files_c = files_c['total_files'].median()
    min_files_c = files_c['total_files'].min()
    max_files_c = files_c['total_files'].max()

    files_s = pd.read_csv(config.RESULT + 'repo-er-server.csv')
    total_files_s = files_s['total_files'].sum()
    median_files_s = files_s['total_files'].median()
    min_files_s = files_s['total_files'].min()
    max_files_s = files_s['total_files'].max()

    total_files = {
        'client': total_files_c,
        'server': total_files_s,
        'overall': total_files_c + total_files_s
    }

    median_files = {
        'client': median_files_c,
        'server': median_files_s,
        'overall': median_files_c + median_files_s
    }

    min_files = {
        'client': min_files_c,
        'server': min_files_s,
        'overall': min_files_c + min_files_s
    }

    max_files = {
        'client': max_files_c,
        'server': max_files_s,
        'overall': max_files_c + max_files_s
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
        'files_analyzed': files_analyzed,
        'median_files': median_files,
        'min_files': min_files,
        'max_files': max_files,
    }

    df = pd.DataFrame(data=data)
    df.to_csv(config.RESULT + 'general-info2.csv')


if __name__ == '__main__':
    create_general_info()

    # df = ds.read_dataset()
    # number_of_handlers(df)
