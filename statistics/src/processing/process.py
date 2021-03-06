import os
# import numpy as np
import pandas as pd
import statistics.src.constants as constants


# def get_number_lines_handlers(df):
#     # Save data on number of catches
#     df_async_await = get_metrics(df, 'asyncAwaitNumberOfCatchesLines', 'async-await')
#     df_try_catch = get_metrics(df, 'tryCatchNumberOfCatchesLines', 'try-catch')
#     df_callback = get_metrics(df, 'callbacksNumberOfLines', 'callback')
#     df_promise = get_metrics(df, 'promiseNumberOfPromiseCatchesLines', 'promise')
#     df_event_on = get_metrics(df, 'eventsNumberOfEventOnLines', 'event')
#     df_event_once = get_metrics(df, 'eventsNumberOfEventOnceLines', 'event')
#
#     data = [df_callback, df_promise, df_event_on, df_event_once, df_async_await, df_try_catch]
#     df = pd.concat(data, ignore_index=True)
#
#     return df
#
#
# def get_number_of_handlers_by_mech(df):
#     # Save data on number of catches
#     df_async_await = get_metrics(df, 'asyncAwaitNumberOfCatches', 'async-await')
#     df_try_catch = get_metrics(df, 'tryCatchNumberOfCatches', 'try-catch')
#     df_callback = get_metrics(df, 'callbacksNumberOfCallbackErrorFunctions', 'callback')
#     df_promise = get_metrics(df, 'promiseNumberOfPromiseCatches', 'promise')
#     df_event_on = get_metrics(df, 'eventsNumberOfEventMethodsOn', 'event')
#     df_event_once = get_metrics(df, 'eventsNumberOfEventMethodsOnce', 'event')
#
#     # Get number of handlers by mechanism
#     data = [df_callback, df_promise, df_event_on, df_event_once, df_async_await, df_try_catch]
#     df = pd.concat(data, ignore_index=True)
#
#     return df


# def get_metrics(df, metric, name):
#     # Fill nan on zeroes
#     df_metric = df[metric].fillna(0.0)
#
#     # Remove zeroes from sample
#     df_metric = df_metric[df_metric > 0.0]
#
#     # convert series to dataframe
#     df_metric = df_metric.to_frame()
#
#     # rename metric name to values
#     df_metric.rename(columns={metric: 'values'}, inplace=True)
#
#     # Reset index
#     df_metric.reset_index(drop=True, inplace=True)
#
#     # Create new column with the metric name only
#     size = df_metric.shape[0]
#     df_metric_name = pd.DataFrame(data=np.repeat(name, size))
#     df_metric_name.columns = ['types']
#
#     # Reset index
#     df_metric_name.reset_index(drop=True, inplace=True)
#
#     df_res = pd.concat([df_metric, df_metric_name], axis=1)
#     df_res.columns = ['values', 'types']
#
#     return df_res


def read_data(type):
    path = constants.RESULT + 'er-{}.csv'.format(type)
    df = pd.read_csv(path)

    df = df[df[constants.MECH] != constants.WINDOW_EVENT_LISTENER]
    df = df[df[constants.MECH] != constants.WINDOW_ON_ERROR]

    df[constants.COUNT] = 1
    df[constants.TYPE] = type

    df.reset_index(inplace=True, drop=True)
    return df


def get_all_strategies(df):
    list_strategies = []
    for index, row in df.iterrows():
        list_in = get_strategies(row)
        strategies_combination = ','.join(list_in)
        list_strategies.append(strategies_combination)
    return list_strategies


def get_strategies(serie):
    list_strategies = []
    for strategy in constants.STRATEGIES:
        if serie[strategy]:
            list_strategies.append(strategy)
    return list_strategies


def remove():
    path_c = constants.RESULT + 'er-client.csv'
    df_c = pd.read_csv(path_c, index_col=0)
    df_c = df_c.loc[:, ~df_c.columns.str.contains('^Unnamed')]
    df_c.to_csv(path_c, index=False)

    path_s = constants.RESULT + 'er-server.csv'
    df_s = pd.read_csv(path_s, index_col=0)
    df_s = df_s.loc[:, ~df_s.columns.str.contains('^Unnamed')]
    df_s.to_csv(path_s, index=False)


def read_repo_er(type):
    path = constants.RESULT + 'repo-er-{}.csv'.format(type)
    df = pd.read_csv(path)
    df[constants.TYPE] = type
    df.reset_index(drop=True, inplace=True)
    return df


def read_repo_er_all():
    read_repo_er_c = read_repo_er('client')
    read_repo_er_s = read_repo_er('server')
    df = read_repo_er_c.append(read_repo_er_s, ignore_index=True)
    return df


def read_percentage_mech_per_repo():
    df = pd.read_csv(constants.RESULT + 'percentage_mech_per_repo.csv')
    return df


def read_dataset():
    df_c = read_data(constants.CLIENT)
    df_c[constants.TYPE] = constants.CLIENT

    df_s = read_data(constants.SERVER)
    df_s[constants.TYPE] = constants.SERVER

    df = pd.concat([df_c, df_s], ignore_index=True, sort=True)

    df = df[df[constants.MECH] != constants.WINDOW_EVENT_LISTENER]
    df = df[df[constants.MECH] != constants.WINDOW_ON_ERROR]

    df[constants.COUNT] = 1
    df.reset_index(drop=True, inplace=True)

    return df


def read_global_handlers_dataset():
    path = constants.RESULT + 'er-{}.csv'.format(constants.CLIENT)
    df_c = pd.read_csv(path)
    df_c[constants.TYPE] = constants.CLIENT

    path = constants.RESULT + 'er-{}.csv'.format(constants.SERVER)
    df_s = pd.read_csv(path)
    df_s[constants.TYPE] = constants.SERVER

    df = pd.concat([df_c, df_s], ignore_index=True, sort=True)

    df_ = df[
        (df[constants.MECH] == constants.WINDOW_EVENT_LISTENER) |
        (df[constants.MECH] == constants.WINDOW_ON_ERROR)
        ]

    df_[constants.COUNT] = 1
    df_.reset_index(drop=True, inplace=True)

    return df_


def read_whole_dataset():
    df_c = read_whole_data(constants.CLIENT)
    df_c[constants.TYPE] = constants.CLIENT

    df_s = read_whole_data(constants.SERVER)
    df_s[constants.TYPE] = constants.SERVER

    df = pd.concat([df_c, df_s], ignore_index=True, sort=True)

    df[constants.COUNT] = 1
    df.reset_index(drop=True, inplace=True)

    return df


def read_whole_data(type):
    path = constants.RESULT + 'er-{}.csv'.format(type)
    df = pd.read_csv(path)

    df[constants.COUNT] = 1
    df[constants.TYPE] = type

    df.reset_index(inplace=True, drop=True)
    return df


def create_dir_if_not_exists(directory):
    if not os.path.exists(directory):
        os.makedirs(directory)
