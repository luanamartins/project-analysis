import numpy as np
import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt

import statistics.src.config as config


# TODO
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


def get_data():
    # Read client data
    df_file_client = pd.read_csv(config.RESULT_INFO + 'result-repo-client.csv')
    df_client = get_number_of_handlers_by_mech(df_file_client)

    # Read server data
    df_file_server = pd.read_csv(config.RESULT_INFO + 'result-repo-server.csv')
    df_server = get_number_of_handlers_by_mech(df_file_server)

    # Join all data and set columns
    df = pd.concat([df_client, df_server], axis=0)
    df.columns = ['values', 'types']

    # Reset index
    df.reset_index(drop=True, inplace=True)

    return df


def save_boxplot(df, image_path, xlabel, ylabel):
    # Start a new figure
    plt.figure()

    # Present no lines in the grid
    sns.set(style='whitegrid')

    # Create plot and set labels
    g = sns.boxplot(x='types', y='values', data=df)
    g.set(xlabel=xlabel, ylabel=ylabel)

    # Rescale y-axis to log function
    g.set_yscale('log')

    # Save figure
    plt.savefig(image_path)


def save_violinplot(df, image_path, xlabel, ylabel):
    # Start a new figure
    plt.figure()

    # Present no lines in the grid
    sns.set(style='whitegrid')

    # Create plot and set labels
    g = sns.violinplot(x='types', y='values', data=df, cut=0)
    g.set(xlabel=xlabel, ylabel=ylabel)

    # Rescale y-axis to log function
    g.set_yscale('log')

    # Save figure
    plt.savefig(image_path)


# TODO
def save_lineplot(df, image_path, xlabel, ylabel):
    # Start a new figure
    plt.figure()

    # Create plot and set labels
    # df = pd.DataFrame(dict(time=np.arange(500), value=np.random.randn(500).cumsum()))
    # sns.relplot(x='time', y='value', kind='line', data=df)
    sns.relplot(x=xlabel, y=ylabel, kind='line', data=df)

    # Set grid style
    sns.set(style='darkgrid')

    # Save figure
    plt.savefig(image_path)


def remove_outliers(df, name):
    low = .05
    high = .95
    df_quant = df.quantile([low, high])
    df_new = df[(df[name] > df_quant.loc[low, name]) & (df[name] < df_quant.loc[high, name])]
    df_new.reset_index(drop=True, inplace=True)
    return df_new


def remove_outliers_iqr(df, column):

    quartile_1, quartile_3 = np.percentile(df[column], [25, 75])

    # Save inter quartile range
    iqr = quartile_3 - quartile_1

    # Calculate bounds
    lower_bound = quartile_1 - (iqr * 1.5)
    upper_bound = quartile_3 + (iqr * 1.5)

    df_new = df[(df[column] > upper_bound) | (df[column] < lower_bound)]
    df_new.reset_index(drop=True, inplace=True)

    return df_new


df = get_data()
# df['values'] = df['values'].apply(np.log)

df_removed_outliers = remove_outliers_iqr(df, 'values')

image_path = config.STATS_SRC_PATH + 'seaborn/images/'

save_boxplot(df, image_path + 'boxplot.png', 'abstractions', '# of handlers (log scale)')
save_boxplot(df_removed_outliers, image_path + 'boxplot-without-outliers.png', 'abstractions', '# of handlers (log scale)')

save_violinplot(df, image_path + 'violinplot.png', 'abstractions', '# of handlers (log scale)')
save_violinplot(df_removed_outliers, image_path + 'violinplot-without-outliers.png', 'abstractions', '# of handlers (log scale)')

save_lineplot(df, image_path + 'lineplot.png', 'types', 'values')

