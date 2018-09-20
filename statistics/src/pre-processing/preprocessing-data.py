import glob
import re
import pandas as pd
import statistics.src.config as config
import statistics.src.get_repo_metrics as repo


pd.set_option('display.max_columns', None)
pd.set_option('display.expand_frame_repr', False)
pd.set_option('max_colwidth', -1)

RESULTS_TO_SAVE = config.RESULT
TODAY = config.RESULT + 'result-today/{}/'
TODAY_METRIC_SIZE = config.RESULT + 'result-today/metric-size/{}/'


def save_data(type):
    df_res = pd.DataFrame()
    df_no_er = pd.DataFrame()
    df_repos = []

    today_type = TODAY.format(type)
    for file in glob.glob(today_type + '*.csv'):
        repo_name = repo.get_repo_name(file)
        df_obj = pd.read_csv(file)

        today_metric_size = TODAY_METRIC_SIZE.format(type)

        try:
            df = pd.read_csv(today_metric_size + repo_name)
            df['repo'] = repo_name
            df_res = pd.concat([df, df_res])

            df_repos.append({
                'repo': repo_name,
                'strict_global': df_obj['numberOfStrictModeGlobal'].sum() > 0,
                'strict_local': df_obj['numberOfStrictModeLocal'].sum() > 0,
                'total_files': len(df.index),
                'total_logical_lines': df_obj['numberOfLogicalLines'].sum()
            })

        except:
            # Files that do not use any error handling mechanism
            # print('File {} do not exist'.format(today_metric_size + repo_name))
            df_no_er = df_no_er.append({
                'repo': repo_name,
                'type': type
            }, ignore_index=True)

    df_repo = pd.DataFrame(df_repos)
    df_repo.reset_index(inplace=True)
    df_repo.to_csv('{}repo-er-{}.csv'.format(RESULTS_TO_SAVE, type))

    print(df_res.shape)
    print(df_no_er.shape)

    df_res.reset_index(inplace=True)
    df_res.to_csv('{}er-{}.csv'.format(RESULTS_TO_SAVE, type))
    df_no_er.to_csv('{}no-er-{}.csv'.format(RESULTS_TO_SAVE, type))


def failed_data(type):
    path = config.RESULT + 'result-today/'
    df = pd.read_csv('{}failed-files-{}.txt'.format(path, type), names=['file'])
    df.reset_index(inplace=True)
    regex = '{}\/(.*?)\/'.format(type)
    df['repo'] = df['file'].apply(lambda x: re.search(regex, x).group(1))
    df.to_csv('{}failed-files-{}.csv'.format(RESULTS_TO_SAVE, type))


def summary(type):
    path = '{}er-{}.csv'.format(RESULTS_TO_SAVE, type)
    df = pd.read_csv(path)
    df['count'] = 1

    df = df[['mech', 'lines', 'stmts', 'count']]

    df_group_lines = df.groupby(['mech', 'lines']).sum()
    df_group_lines.reset_index(inplace=True)
    df_group_lines.to_csv('{}summary-mech-lines-{}.csv'.format(RESULTS_TO_SAVE, type))

    df_group_stmts = df.groupby(['mech', 'stmts']).sum()
    df_group_stmts.reset_index(inplace=True)
    df_group_stmts.to_csv('{}summary-mech-stmts-{}.csv'.format(RESULTS_TO_SAVE, type))


def fix_empty_calc(type):
    path = '{}er-{}.csv'.format(RESULTS_TO_SAVE, type)
    df = pd.read_csv(path)
    df['empty'].loc[df['lines'] == 0] = True
    df.to_csv(path)


# save_data('client')
# save_data('server')
# failed_data('client')
# failed_data('server')
# summary('client')
# summary('server')
# fix_empty_calc('client')
# fix_empty_calc('server')
