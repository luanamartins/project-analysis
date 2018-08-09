import numpy as np
import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt


def read_data(df):
    df_async_await = get_metrics(df, 'asyncAwaitNumberOfCatches', 'async-await')
    df_try_catch = get_metrics(df, 'tryCatchNumberOfCatches', 'try-catch')
    # df_callback = get_metrics(df, 'callbacksNumberOfCallbackErrorFunctions', 'callback')
    # df_promise = get_metrics(df, 'promiseNumberOfPromiseCatches', 'promise')
    # df_event_on = get_metrics(df, 'eventsNumberOfEventMethodsOn', 'event')
    # df_event_once = get_metrics(df, 'eventsNumberOfEventMethodsOnce', 'event')

    data = [df_async_await, df_try_catch]
    # data = [df_callback, df_promise, df_event_on, df_event_once]

    df_res = pd.concat(data, ignore_index=True)

    return df_res


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
    df_file_client = pd.read_csv(results_path + 'result-repo-client.csv')
    df_client = read_data(df_file_client)

    df_file_server = pd.read_csv(results_path + 'result-repo-server.csv')
    df_server = read_data(df_file_server)

    df = pd.concat([df_client, df_server], axis=0)
    df.columns = ['values', 'types']

    # Reset index
    df.reset_index(drop=True, inplace=True)

    return df


def save_boxplot(df, image_path):
    plt.figure()
    sns.set(style='whitegrid')
    sns.boxplot(x='types', y='values', data=df).set(xlabel='Constructions', ylabel='Number of constructions')
    plt.savefig(image_path)


def save_violinplot(df, image_path):
    plt.figure()
    sns.set(style='whitegrid')
    sns.violinplot(x='types', y='values', data=df, cut=0).set(xlabel='Constructions', ylabel='Number of constructions')
    plt.savefig(image_path)


def remove_outliers(df, name):
    low = .05
    high = .95
    df_quant = df.quantile([low, high])
    df_new = df[(df[name] > df_quant.loc[low, name]) & (df[name] < df_quant.loc[high, name])]
    df_new.reset_index(drop=True, inplace=True)
    return df_new


def outliers_iqr(ys, column):
    quartile_1, quartile_3 = np.percentile(ys[column], [25, 75])
    iqr = quartile_3 - quartile_1
    lower_bound = quartile_1 - (iqr * 1.5)
    upper_bound = quartile_3 + (iqr * 1.5)
    df_new = ys[(ys[column] > upper_bound) | (ys[column] < lower_bound)]
    df_new.reset_index(drop=True, inplace=True)
    return df_new


results_path = '/Users/luanamartins/Documents/Mestrado/project-analysis/results/results-2018-06-29/'
image_path = '/Users/luanamartins/Documents/Mestrado/project-analysis/statistics/src/seaborn/images/'

df = get_data()
df_removed_outliers = outliers_iqr(df, 'values')

save_boxplot(df, image_path + 'boxplot.png')
save_boxplot(df_removed_outliers, image_path + 'boxplot-without-outliers.png')

save_violinplot(df, image_path + 'violinplot.png')
save_violinplot(df_removed_outliers, image_path + 'violinplot-without-outliers.png')

