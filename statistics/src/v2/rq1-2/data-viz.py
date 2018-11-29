import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt
import statistics.src.config as config


pd.set_option('display.max_rows', 500)
pd.set_option('display.max_columns', 500)


RESULTS_DIRECTORY = 'data/'
RESULTS_DIRECTORY_IMAGES = 'images/'


if __name__ == '__main__':
    df_async = pd.read_csv(RESULTS_DIRECTORY + 'df_async_await.csv')
    df_callback = pd.read_csv(RESULTS_DIRECTORY + 'df_callback.csv')
    df_event = pd.read_csv(RESULTS_DIRECTORY + 'df_event.csv')
    df_promise = pd.read_csv(RESULTS_DIRECTORY + 'df_promise.csv')
    df_try_catch = pd.read_csv(RESULTS_DIRECTORY + 'df_try_catch.csv')
    # df_callback, df_event, df_promise,
    df_all = [df_async, df_callback, df_event, df_promise, df_try_catch]
    df_data = pd.concat(df_all, ignore_index=True)

    plt.figure(figsize=(10,4))
    # legend = False
    # kind = 'bar'
    sns.set_style('whitegrid')

    df_data.loc[df_data[config.STRATEGY] == 'noUsageOfErrorArg,throwErrorObject', config.STRATEGY] = 'Ignored arg, Throw object'
    df_data.loc[df_data[config.STRATEGY] == 'others', config.STRATEGY] = 'Others'
    df_data.loc[df_data[config.STRATEGY] == 'rethrow', config.STRATEGY] = 'Re-throw'
    df_data.loc[df_data[config.STRATEGY] == 'consoleLog,rethrow', config.STRATEGY] = 'Log, Re-throw'
    df_data.loc[df_data[config.STRATEGY] == 'empty', config.STRATEGY] = 'Empty'
    df_data.loc[df_data[config.STRATEGY] == 'noUsageOfErrorArg', config.STRATEGY] = 'Ignored arg'
    df_data.loc[df_data[config.STRATEGY] == 'rethrow,returnLiteral', config.STRATEGY] = 'Re-throw, Return literal'
    df_data.loc[df_data[config.STRATEGY] == 'rethrow,returnNull', config.STRATEGY] = 'Re-throw, Return null'
    df_data.loc[df_data[config.STRATEGY] == 'reassigningError', config.STRATEGY] = 'Reassign error'
    df_data.loc[df_data[config.STRATEGY] == 'returnLiteral', config.STRATEGY] = 'Return literal'
    df_data.loc[df_data[config.STRATEGY] == 'reassigningError,break', config.STRATEGY] = 'Reassign error, Break'
    df_data.loc[df_data[config.STRATEGY] == 'consoleLog', config.STRATEGY] = 'Log'
    df_data.loc[df_data[config.STRATEGY] == 'noUsageOfErrorArg,returnLiteral', config.STRATEGY] = 'Ignored arg, Return literal'
    df_data.loc[df_data[config.STRATEGY] == 'noUsageOfErrorArg,returnNull', config.STRATEGY] = 'Ignored arg, Return null'

    ax = sns.barplot(x=config.MECH, y=config.PERC, hue=config.STRATEGY,
                            data=df_data)
    #palette='Greys_d'
    # ax.set_xticklabels([])
    # ax.set_xticklabels(ax.get_xticklabels(), rotation=90, ha='right')
    # ax.legend(bbox_to_anchor=(1, 0.5))

    # plt.legend(loc='upper left', bbox_to_anchor=(1, 1), prop={'size': 6})
    # plt.legend(loc = 'upper left', bbox_to_anchor = (0.5, -0.25), ncol = 4, prop={'size':4.5})
    plt.legend(loc = 'center left', bbox_to_anchor = (1, 0.5))
    plt.xlabel('')
    plt.ylabel('% of strategies')
    plt.tight_layout()
    plt.savefig(RESULTS_DIRECTORY_IMAGES + 'overall-data.png')
    #dpi = 500
