import pandas as pd
import statistics.src.constants as constants


RESULTS_BASE_DIR = constants.STATS_SRC_PATH + 'v2/rq2/'
RESULTS_DATA_DIRECTORY = RESULTS_BASE_DIR + 'data/'


def error_first_protocol():
    df_c = pd.read_csv(constants.RESULT_INFO + 'result-repo-client.csv')
    df_c[constants.TYPE] = constants.CLIENT

    df_s = pd.read_csv(constants.RESULT_INFO + 'result-repo-server.csv')
    df_s[constants.TYPE] = constants.SERVER

    df_grouped = df_c.append(df_s, ignore_index=True)

    CALLBACKS = 'callbacks'
    FIRST_ERROR_ARG = 'first_error_arg'
    df = pd.DataFrame()
    df[constants.REPO] = df_grouped[constants.REPO]
    df[FIRST_ERROR_ARG] = df_grouped[constants.FIRST_ERROR_ARG_COLUMN]
    df[CALLBACKS] = df_grouped[constants.CALLBACK_ERROR_FUNCTIONS]
    df[constants.TYPE] = df_grouped[constants.TYPE]
    df[constants.PERC_FIRST_ERROR_PROTOCOL] = (df[FIRST_ERROR_ARG] * 100) / df[CALLBACKS]
    print(df[FIRST_ERROR_ARG].sum())
    print(df[CALLBACKS].sum())

    total_first_error = df[FIRST_ERROR_ARG].sum()

    df_c = df[df[constants.TYPE] == constants.CLIENT]
    df_s = df[df[constants.TYPE] == constants.SERVER]

    print(df_c[FIRST_ERROR_ARG].sum() / total_first_error)
    print(df_s[FIRST_ERROR_ARG].sum() / total_first_error)

    df.fillna(0, inplace=True)

    df.to_csv(RESULTS_DATA_DIRECTORY + 'error_first_protocol.csv')

    df_info = pd.DataFrame()

    df_group_info = df.groupby(constants.TYPE)

    df_info['mean_raw'] = df_group_info.mean()[constants.FIRST_ERROR_ARG]
    df_info['median_raw'] = df_group_info.median()[constants.FIRST_ERROR_ARG]
    df_info['std_raw'] = df_group_info.std()[constants.FIRST_ERROR_ARG]
    df_info['min_raw'] = df_group_info.min()[constants.FIRST_ERROR_ARG]
    df_info['max_raw'] = df_group_info.max()[constants.FIRST_ERROR_ARG]
    df_info['total_raw'] = df_group_info.sum()[constants.FIRST_ERROR_ARG]

    df_info['mean_perc'] = df_group_info.mean()[constants.PERC_FIRST_ERROR_PROTOCOL]
    df_info['median_perc'] = df_group_info.median()[constants.PERC_FIRST_ERROR_PROTOCOL]
    df_info['std_perc'] = df_group_info.std()[constants.PERC_FIRST_ERROR_PROTOCOL]
    df_info['min_perc'] = df_group_info.min()[constants.PERC_FIRST_ERROR_PROTOCOL]
    df_info['max_perc'] = df_group_info.max()[constants.PERC_FIRST_ERROR_PROTOCOL]
    df_info['total_perc'] = df_group_info.sum()[constants.PERC_FIRST_ERROR_PROTOCOL]

    overall_line = {
        'type': 'overall',
        'mean_raw': df[constants.FIRST_ERROR_ARG].mean(),
        'median_raw': df[constants.FIRST_ERROR_ARG].median(),
        'std_raw': df[constants.FIRST_ERROR_ARG].std(),
        'min_raw': df[constants.FIRST_ERROR_ARG].min(),
        'max_raw': df[constants.FIRST_ERROR_ARG].max(),
        'total_raw': df[constants.FIRST_ERROR_ARG].sum(),

        'mean_perc': df[constants.PERC_FIRST_ERROR_PROTOCOL].mean(),
        'median_perc': df[constants.PERC_FIRST_ERROR_PROTOCOL].median(),
        'std_perc': df[constants.PERC_FIRST_ERROR_PROTOCOL].std(),
        'min_perc': df[constants.PERC_FIRST_ERROR_PROTOCOL].min(),
        'max_perc': df[constants.PERC_FIRST_ERROR_PROTOCOL].max(),
        'total_perc': df[constants.PERC_FIRST_ERROR_PROTOCOL].sum()
    }

    df_overall = pd.DataFrame(overall_line, index=[0])
    df_info.reset_index(inplace=True)
    df_info = pd.concat([df_info, df_overall], ignore_index=True)

    df_info.to_csv(RESULTS_DATA_DIRECTORY + 'error_first_protocol_info.csv')


if __name__ == '__main__':
    error_first_protocol()
