import numpy as np
import pandas as pd
import seaborn as sns


def read_data(df):
    # async_df = get_metrics(df, 'asyncAwaitNumberOfCatches', 'async-await')
    # try_catch_df = get_metrics(df, 'tryCatchNumberOfCatches', 'try-catch')
    # callback_df = get_metrics(df, 'callbacksNumberOfCallbackErrorFunctions', 'callback')
    promise_df = get_metrics(df, 'promiseNumberOfPromiseCatches', 'promise')
    event_on_df = get_metrics(df, 'eventsNumberOfEventMethodsOn', 'event')
    event_once_df = get_metrics(df, 'eventsNumberOfEventMethodsOnce', 'event')

    # return pd.concat([async_df, try_catch_df, callback_df, promise_df, event_on_df, event_once_df], axis=0)
    return pd.concat([promise_df, event_on_df, event_once_df], axis=0)


def get_metrics(df, metric, name):
    types_df = df[metric]
    types_df = types_df.fillna(0.0)
    types_df = types_df[types_df > 0.0]
    size = types_df.shape[0]
    types_df.rename(columns={metric: 'values'}, inplace=True)
    types = pd.DataFrame(data=np.repeat(name, size))
    return pd.concat([types_df, types], axis=1)


results_path = '/Users/luanamartins/Documents/Mestrado/project-analysis/results/results-2018-06-29/'
path = '/Users/luanamartins/Documents/Mestrado/project-analysis/statistics/src/seaborn/'
file_df = pd.read_csv(results_path + 'result-repo-client.csv')
# print(file_df[file_df['tryCatchNumberOfCatches'] < 0].head(10))
df = read_data(file_df)
df.columns = ['values', 'types']
ax = sns.violinplot(x='types', y='values', data=df, scale='area')
fig = ax.get_figure()
fig.savefig(path + 'output2.png')
