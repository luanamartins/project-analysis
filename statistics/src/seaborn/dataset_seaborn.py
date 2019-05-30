import os
import numpy as np
import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt
import statistics.src.config as config


def get_number_lines_handlers(df):
    # Save data on number of catches
    df_async_await = get_metrics(df, 'asyncAwaitNumberOfCatchesLines', 'async-await')
    df_try_catch = get_metrics(df, 'tryCatchNumberOfCatchesLines', 'try-catch')
    df_callback = get_metrics(df, 'callbacksNumberOfLines', 'callback')
    df_promise = get_metrics(df, 'promiseNumberOfPromiseCatchesLines', 'promise')
    df_event_on = get_metrics(df, 'eventsNumberOfEventOnLines', 'event')
    df_event_once = get_metrics(df, 'eventsNumberOfEventOnceLines', 'event')

    data = [df_callback, df_promise, df_event_on, df_event_once, df_async_await, df_try_catch]
    df = pd.concat(data, ignore_index=True)

    return df


def get_number_of_handlers_by_mech(df):
    # Save data on number of catches
    df_async_await = get_metrics(df, 'asyncAwaitNumberOfCatches', 'async-await')
    df_try_catch = get_metrics(df, 'tryCatchNumberOfCatches', 'try-catch')
    df_callback = get_metrics(df, 'callbacksNumberOfCallbackErrorFunctions', 'callback')
    df_promise = get_metrics(df, 'promiseNumberOfPromiseCatches', 'promise')
    df_event_on = get_metrics(df, 'eventsNumberOfEventMethodsOn', 'event')
    df_event_once = get_metrics(df, 'eventsNumberOfEventMethodsOnce', 'event')

    # Get number of handlers by mechanism
    # data = [df_async_await, df_try_catch]
    # data = [df_callback, df_promise, df_event_on, df_event_once]
    # data = [df_callback, df_try_catch]
    data = [df_callback, df_promise, df_event_on, df_event_once, df_async_await, df_try_catch]

    df = pd.concat(data, ignore_index=True)

    return df


def get_metrics(df, metric, name):

    # Fill nan on zeroes
    df_metric = df[metric].fillna(0.0)

    # Remove zeroes from sample
    df_metric = df_metric[df_metric > 0.0]

    # convert series to dataframe
    df_metric = df_metric.to_frame()

    # rename metric name to values
    df_metric.rename(columns={metric: 'values'}, inplace=True)

    # Reset index
    df_metric.reset_index(drop=True, inplace=True)

    # Create new column with the metric name only
    size = df_metric.shape[0]
    df_metric_name = pd.DataFrame(data=np.repeat(name, size))
    df_metric_name.columns = ['types']

    # Reset index
    df_metric_name.reset_index(drop=True, inplace=True)

    df_res = pd.concat([df_metric, df_metric_name], axis=1)
    df_res.columns = ['values', 'types']

    return df_res


def read_data(type):
    path = config.RESULT + 'er-{}.csv'.format(type)
    df = pd.read_csv(path)

    df = df[df[config.MECH] != config.WINDOW_EVENT_LISTENER]
    df = df[df[config.MECH] != config.WINDOW_ON_ERROR]

    df[config.COUNT] = 1
    df[config.TYPE] = type

    df.reset_index(inplace=True, drop=True)
    return df


def get_all_strategies(df):
    list_strategies = []
    for index, row in df.iterrows():
        list_in = get_strategies(row)
        strat = ','.join(list_in)
        list_strategies.append(strat)
    return list_strategies


def get_strategies(serie):
    list_strategies = []
    for strategy in config.STRATEGIES:
        if serie[strategy]:
            list_strategies.append(strategy)
    return list_strategies


def remove():
    path_c = config.RESULT + 'er-client.csv'
    df_c = pd.read_csv(path_c, index_col=0)
    df_c = df_c.loc[:, ~df_c.columns.str.contains('^Unnamed')]
    df_c.to_csv(path_c, index=False)

    path_s = config.RESULT + 'er-server.csv'
    df_s = pd.read_csv(path_s, index_col=0)
    df_s = df_s.loc[:, ~df_s.columns.str.contains('^Unnamed')]
    df_s.to_csv(path_s, index=False)


def read_repo_er(type):
    path = config.RESULT + 'repo-er-{}.csv'.format(type)
    df = pd.read_csv(path)
    df[config.TYPE] = type
    df.reset_index(drop=True, inplace=True)
    return df


def read_repo_er_all():
    read_repo_er_c = read_repo_er('client')
    read_repo_er_s = read_repo_er('server')
    df = read_repo_er_c.append(read_repo_er_s, ignore_index=True)
    return df


def read_percentage_mech_per_repo():
    df = pd.read_csv(config.RESULT + 'percentage_mech_per_repo.csv')
    return df


def read_dataset():
    df_c = read_data(config.CLIENT)
    df_c[config.TYPE] = config.CLIENT

    df_s = read_data(config.SERVER)
    df_s[config.TYPE] = config.SERVER

    df = pd.concat([df_c, df_s], ignore_index=True, sort=True)

    df = df[df[config.MECH] != config.WINDOW_EVENT_LISTENER]
    df = df[df[config.MECH] != config.WINDOW_ON_ERROR]

    df[config.COUNT] = 1
    df.reset_index(drop=True, inplace=True)

    return df


def read_global_handlers_dataset():
    path = config.RESULT + 'er-{}.csv'.format(config.CLIENT)
    df_c = pd.read_csv(path)
    df_c[config.TYPE] = config.CLIENT

    path = config.RESULT + 'er-{}.csv'.format(config.SERVER)
    df_s = pd.read_csv(path)
    df_s[config.TYPE] = config.SERVER

    df = pd.concat([df_c, df_s], ignore_index=True, sort=True)

    df_ = df[
        (df[config.MECH] == config.WINDOW_EVENT_LISTENER) |
        (df[config.MECH] == config.WINDOW_ON_ERROR)
    ]

    df_[config.COUNT] = 1
    df_.reset_index(drop=True, inplace=True)

    return df_

def read_whole_dataset():
    df_c = read_whole_data(config.CLIENT)
    df_c[config.TYPE] = config.CLIENT

    df_s = read_whole_data(config.SERVER)
    df_s[config.TYPE] = config.SERVER

    df = pd.concat([df_c, df_s], ignore_index=True, sort=True)

    df[config.COUNT] = 1
    df.reset_index(drop=True, inplace=True)

    return df


def read_whole_data(type):
    path = config.RESULT + 'er-{}.csv'.format(type)
    df = pd.read_csv(path)

    df[config.COUNT] = 1
    df[config.TYPE] = type

    df.reset_index(inplace=True, drop=True)
    return df


def save_boxplot(df, image_path, x_col, y_col, xlabel, ylabel):
    # Start a new figure
    plt.figure()

    # Present no lines in the grid
    sns.set(style='whitegrid')

    # Create plot and set labels
    g = sns.boxplot(x=x_col, y=y_col, data=df)
    g.set(xlabel=xlabel, ylabel=ylabel)

    # Rescale y-axis to log function
    g.set_yscale('log')

    # Save figure
    plt.savefig(image_path)


def save_violinplot(df, image_path, x_col, y_col, xlabel, ylabel):
    # Start a new figure
    plt.figure()

    # Present no lines in the grid
    sns.set(style='whitegrid')

    # Create plot and set labels
    g = sns.violinplot(x=x_col, y=y_col, data=df, cut=0)
    g.set(xlabel=xlabel, ylabel=ylabel)

    # Rescale y-axis to log function
    g.set_yscale('log')

    directory = 'violinplot/'
    create_dir_if_not_exists(directory)

    # Save figure
    plt.savefig(directory + image_path)


def save_violinplot_hue(df, image_path, x_col, y_col, xlabel, ylabel, hue):
    # Start a new figure
    plt.figure()

    # Present no lines in the grid
    sns.set(style='whitegrid')

    # Create plot and set labels
    g = sns.violinplot(x=x_col, y=y_col, hue=hue, data=df, palette='muted', split=True)
    g.set(xlabel=xlabel, ylabel=ylabel)

    # Rescale y-axis to log function
    g.set_yscale('log')

    # Save figure
    plt.savefig(image_path)


# TODO
def save_lineplot(df, image_path, x_column_name, y_column_name, hue, xlabel, ylabel):
    # Start a new figure
    plt.figure()

    ax = sns.lineplot(data=df, x=x_column_name, y=y_column_name, hue=hue)

    ax.set(xlabel=xlabel, ylabel=ylabel)
    ax.set_yscale('log')

    # Set grid style
    # sns.set(style='darkgrid')

    # Save figure
    plt.savefig(image_path)


def save_barplot(data, filename, x, y, hue, log):
    plt.figure()
    ax = sns.barplot(x=x, y=y, data=data, hue=hue)
    # , orient = 'h'

    # Remove labels from categories
    # ax.set_xticklabels([])
    # plt.tight_layout()

    # ax.set_xticklabels(ax.get_xticklabels(), rotation=90, ha='right')
    # plt.tight_layout()

    if log:
        ax.set_yscale('log')

    # directory = 'barplot/'
    # create_dir_if_not_exists(directory)
    plt.ylim(0, 0.3)

    plt.savefig(filename)


def save_countplot(data, filename, x):
    plt.figure()
    sns.countplot(x=x, data=data)

    directory = 'countplot/'
    create_dir_if_not_exists(directory)

    plt.savefig(directory + filename)


def save_scatterplot(df, x, y):

    sns.catplot(data=df, x=x, y=y)

    directory = 'scatterplot/'
    create_dir_if_not_exists(directory)

    plt.savefig(directory + 'scatterplot.png')


def create_dir_if_not_exists(directory):
    if not os.path.exists(directory):
        os.makedirs(directory)
