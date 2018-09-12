import os
import numpy as np
import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt


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

    # Save figure
    plt.savefig(image_path)


def save_violinplot_hue(df, image_path, xlabel, ylabel):
    # Start a new figure
    plt.figure()

    # Present no lines in the grid
    sns.set(style='whitegrid')

    # Apply log function to dataframe
    # df['values'] = df['values'].apply(np.log)

    # Create plot and set labels
    tips = sns.load_dataset('tips')
    g = sns.violinplot(x='day', y='total_bill', hue='smoker', data=tips, palette='muted', split=True)
    g.set(xlabel=xlabel, ylabel=ylabel)

    # Rescale y-axis to log function
    g.set_yscale('log')

    # Save figure
    plt.savefig(image_path)


# TODO
def save_lineplot(df, image_path, x_column_name, y_column_name, hue, xlabel, ylabel):
    # Start a new figure
    plt.figure()

    # Create plot and set labels
    # df = pd.DataFrame(dict(time=np.arange(500), value=np.random.randn(500).cumsum()))
    # sns.relplot(x='time', y='value', kind='line', data=df)
    # sns.relplot(x=xlabel, y=ylabel, kind='line', estimator=None, data=df)

    ax = sns.lineplot(data=df, x=x_column_name, y=y_column_name, hue=hue)

    ax.set(xlabel=xlabel, ylabel=ylabel)
    ax.set_yscale('log')

    # Set grid style
    # sns.set(style='darkgrid')

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


def create_dir_if_not_exists(directory):
    if not os.path.exists(directory):
        os.makedirs(directory)