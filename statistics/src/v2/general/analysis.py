import pandas as pd
import glob
import statistics.src.seaborn.dataset_seaborn as ds
import statistics.src.constants as config

DIR = '/Users/luanamartins/Documents/Mestrado/project-analysis/results/results-2018-09-01/result-today/'


def retrieve_general_data():
    rows = []
    for file in glob.glob(DIR + 'client' + '/*.csv'):
        df = pd.read_csv(file)
        last_slash_index = file.rfind('/')
        last_dot_index = file.rfind('.')
        reponame = file[last_slash_index+1:last_dot_index]
        rows.append({
            config.REPO: reponame,
            config.TYPE: 'client',
            config.FILES: df.shape[0],
            config.LINES: df['numberOfLogicalLines'].sum()
        })

    for file in glob.glob(DIR + 'server' + '/*.csv'):
        df = pd.read_csv(file)
        last_slash_index = file.rfind('/')
        last_dot_index = file.rfind('.')
        reponame = file[last_slash_index+1:last_dot_index]
        rows.append({
            config.REPO: reponame,
            config.TYPE: 'server',
            config.FILES: df.shape[0],
            config.LINES: df['numberOfLogicalLines'].sum()
        })

    df_res = pd.DataFrame(rows)
    df_res = df_res[[config.REPO, config.TYPE, config.FILES, config.LINES]]
    df_res.to_csv('data.csv', index=False)

    print(df_res[config.FILES].sum())
    print(df_res[config.LINES].sum())


def retrieve_data_from_column(column):
    print(column)
    df_rows = []
    for mech in config.MECHS:
        df_mech = pd.read_csv('../strategies/' + mech + '.csv')
        df_rows.append({
            'abstraction': mech,
            'min': df_mech[column].min(),
            'max': df_mech[column].max(),
            'mean': df_mech[column].mean(),
            'median': df_mech[column].median()
        })
    df = pd.DataFrame(df_rows)
    df.to_csv('data_{}.csv'.format(column), index=False)


def analysis():
    retrieve_data_from_column('files')
    retrieve_data_from_column('count')
    retrieve_data_from_column('lines')


if __name__ == '__main__':
    # retrieve_general_data()
    analysis()