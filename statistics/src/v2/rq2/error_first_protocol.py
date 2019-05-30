import pandas as pd
import statistics.src.config as config


RESULTS_BASE_DIR = config.STATS_SRC_PATH + 'v2/rq2/'
RESULTS_DATA_DIRECTORY = RESULTS_BASE_DIR + 'data/'


def error_first_protocol():
    df_c = pd.read_csv(config.RESULT_INFO + 'result-repo-client.csv')
    df_c[config.TYPE] = config.CLIENT

    df_s = pd.read_csv(config.RESULT_INFO + 'result-repo-server.csv')
    df_s[config.TYPE] = config.SERVER

    df_grouped = df_c.append(df_s, ignore_index=True)

    CALLBACKS = 'callbacks'
    FIRST_ERROR_ARG = 'first_error_arg'
    df = pd.DataFrame()
    df[config.REPO] = df_grouped[config.REPO]
    df[FIRST_ERROR_ARG] = df_grouped[config.FIRST_ERROR_ARG_COLUMN]
    df[CALLBACKS] = df_grouped[config.CALLBACK_ERROR_FUNCTIONS]
    df[config.TYPE] = df_grouped[config.TYPE]
    df[config.PERC_FIRST_ERROR_PROTOCOL] = (df[FIRST_ERROR_ARG] * 100) / df[CALLBACKS]
    print(df[FIRST_ERROR_ARG].sum())
    print(df[CALLBACKS].sum())

    total_first_error = df[FIRST_ERROR_ARG].sum()

    df_c = df[df[config.TYPE] == config.CLIENT]
    df_s = df[df[config.TYPE] == config.SERVER]

    print(df_c[FIRST_ERROR_ARG].sum() / total_first_error)
    print(df_s[FIRST_ERROR_ARG].sum() / total_first_error)

    df.fillna(0, inplace=True)

    df.to_csv(RESULTS_DATA_DIRECTORY + 'error_first_protocol.csv')

    df_info = pd.DataFrame()

    df_group_info = df.groupby(config.TYPE)

    df_info['mean_raw'] = df_group_info.mean()[config.FIRST_ERROR_ARG]
    df_info['median_raw'] = df_group_info.median()[config.FIRST_ERROR_ARG]
    df_info['std_raw'] = df_group_info.std()[config.FIRST_ERROR_ARG]
    df_info['min_raw'] = df_group_info.min()[config.FIRST_ERROR_ARG]
    df_info['max_raw'] = df_group_info.max()[config.FIRST_ERROR_ARG]
    df_info['total_raw'] = df_group_info.sum()[config.FIRST_ERROR_ARG]

    df_info['mean_perc'] = df_group_info.mean()[config.PERC_FIRST_ERROR_PROTOCOL]
    df_info['median_perc'] = df_group_info.median()[config.PERC_FIRST_ERROR_PROTOCOL]
    df_info['std_perc'] = df_group_info.std()[config.PERC_FIRST_ERROR_PROTOCOL]
    df_info['min_perc'] = df_group_info.min()[config.PERC_FIRST_ERROR_PROTOCOL]
    df_info['max_perc'] = df_group_info.max()[config.PERC_FIRST_ERROR_PROTOCOL]
    df_info['total_perc'] = df_group_info.sum()[config.PERC_FIRST_ERROR_PROTOCOL]

    overall_line = {
        'type': 'overall',
        'mean_raw': df[config.FIRST_ERROR_ARG].mean(),
        'median_raw': df[config.FIRST_ERROR_ARG].median(),
        'std_raw': df[config.FIRST_ERROR_ARG].std(),
        'min_raw': df[config.FIRST_ERROR_ARG].min(),
        'max_raw': df[config.FIRST_ERROR_ARG].max(),
        'total_raw': df[config.FIRST_ERROR_ARG].sum(),

        'mean_perc': df[config.PERC_FIRST_ERROR_PROTOCOL].mean(),
        'median_perc': df[config.PERC_FIRST_ERROR_PROTOCOL].median(),
        'std_perc': df[config.PERC_FIRST_ERROR_PROTOCOL].std(),
        'min_perc': df[config.PERC_FIRST_ERROR_PROTOCOL].min(),
        'max_perc': df[config.PERC_FIRST_ERROR_PROTOCOL].max(),
        'total_perc': df[config.PERC_FIRST_ERROR_PROTOCOL].sum()
    }

    df_overall = pd.DataFrame(overall_line, index=[0])
    df_info.reset_index(inplace=True)
    df_info = pd.concat([df_info, df_overall], ignore_index=True)

    df_info.to_csv(RESULTS_DATA_DIRECTORY + 'error_first_protocol_info.csv')


if __name__ == '__main__':
    error_first_protocol()
