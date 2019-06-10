import pandas as pd
import glob
import statistics.src.constants as constants
import statistics.src.preprocessing.get_repo_metrics as repo


def append_data_from_class(rows, class_name):
    for file in glob.glob(constants.RESULT_TODAY + class_name + '/*.csv'):
        df = pd.read_csv(file)
        rows.append({
            constants.REPO: repo.get_repo_name(file),
            constants.TYPE: class_name,
            constants.FILES: df.shape[0],
            constants.LINES: df['numberOfLogicalLines'].sum()
        })
    return rows


def retrieve_general_data():
    rows = []
    append_data_from_class(rows, constants.CLIENT)
    append_data_from_class(rows, constants.SERVER)

    df_res = pd.DataFrame(rows)
    df_res = df_res[[constants.REPO, constants.TYPE, constants.FILES, constants.LINES]]
    df_res.to_csv('data.csv', index=False)

    print(df_res[constants.FILES].sum())
    print(df_res[constants.LINES].sum())


def retrieve_data_from_column(column):
    print(column)
    df_rows = []
    for mech in constants.MECHS:
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
