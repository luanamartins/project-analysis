import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt
import statistics.src.constants as constants
import statistics.src.data_viz.graphs as graphs


pd.set_option('display.max_rows', 500)
pd.set_option('display.max_columns', 500)


RESULTS_DIRECTORY = 'data/'
RESULTS_DIRECTORY_IMAGES = 'images/'


def generate_barplot():
    df = pd.read_csv(RESULTS_DIRECTORY + 'overall2.csv')
    df = df[df[constants.PERC] > 1]
    df['joint_column'] = ''

    filename = RESULTS_DIRECTORY_IMAGES + 'overall2.png'
    graphs.save_barplot_with_legend(filename, 'joint_column', constants.PERC, constants.STRATEGY, df, '', '% of strategies')


def generate_barplot_overall_data():
    df_async = pd.read_csv(RESULTS_DIRECTORY + 'df_async_await2.csv')
    df_callback = pd.read_csv(RESULTS_DIRECTORY + 'df_callback2.csv')
    df_event = pd.read_csv(RESULTS_DIRECTORY + 'df_event2.csv')
    df_promise = pd.read_csv(RESULTS_DIRECTORY + 'df_promise2.csv')
    df_try_catch = pd.read_csv(RESULTS_DIRECTORY + 'df_try_catch2.csv')

    df_all = [df_async, df_callback, df_event, df_promise, df_try_catch]
    df_data = pd.concat(df_all, ignore_index=True)

    df_data = df_data[df_data[constants.PERC] > 1]

    plt.figure(figsize=(10, 6))
    # legend = False
    # kind = 'bar'
    sns.set_style('whitegrid')

    df_data.loc[df_data[constants.STRATEGY] == 'noUsageOfErrorArg,throwErrorObject', constants.STRATEGY] = \
        'Ignored arg, Throw object'
    df_data.loc[df_data[constants.STRATEGY] == 'others', constants.STRATEGY] = 'Others'
    df_data.loc[df_data[constants.STRATEGY] == 'rethrow', constants.STRATEGY] = 'Re-throw'
    df_data.loc[df_data[constants.STRATEGY] == 'consoleLog,rethrow', constants.STRATEGY] = 'Log, Re-throw'
    df_data.loc[df_data[constants.STRATEGY] == 'empty', constants.STRATEGY] = 'Empty'
    df_data.loc[df_data[constants.STRATEGY] == 'noUsageOfErrorArg', constants.STRATEGY] = 'Ignored arg'
    df_data.loc[df_data[constants.STRATEGY] == 'rethrow,returnLiteral', constants.STRATEGY] = 'Re-throw, Return literal'
    df_data.loc[df_data[constants.STRATEGY] == 'rethrow,returnNull', constants.STRATEGY] = 'Re-throw, Return null'
    df_data.loc[df_data[constants.STRATEGY] == 'reassigningError', constants.STRATEGY] = 'Reassign error'
    df_data.loc[df_data[constants.STRATEGY] == 'returnLiteral', constants.STRATEGY] = 'Return literal'
    df_data.loc[df_data[constants.STRATEGY] == 'reassigningError,break', constants.STRATEGY] = 'Reassign error, Break'
    df_data.loc[df_data[constants.STRATEGY] == 'consoleLog', constants.STRATEGY] = 'Log'
    df_data.loc[df_data[constants.STRATEGY] == 'noUsageOfErrorArg,returnLiteral', constants.STRATEGY] = \
        'Ignored arg, Return literal'
    df_data.loc[df_data[constants.STRATEGY] == 'noUsageOfErrorArg,returnNull', constants.STRATEGY] = \
        'Ignored arg, Return null'

    sns.barplot(x=constants.MECH, y=constants.PERC, hue=constants.STRATEGY, data=df_data)
    #palette='Greys_d'
    # ax.set_xticklabels([])
    # ax.set_xticklabels(ax.get_xticklabels(), rotation=90, ha='right')
    # ax.legend(bbox_to_anchor=(1, 0.5))

    # plt.legend(loc='upper left', bbox_to_anchor=(1, 1), prop={'size': 6})
    # plt.legend(loc = 'upper left', bbox_to_anchor = (0.5, -0.25), ncol = 4, prop={'size':4.5})
    plt.legend(loc='center left', bbox_to_anchor=(0.1, -0.3), ncol=3, fancybox=True, shadow=True)
    plt.xlabel('')
    plt.ylabel('% of strategies')
    plt.tight_layout()
    plt.savefig(RESULTS_DIRECTORY_IMAGES + 'overall-data2.png')
    #dpi = 500


if __name__ == '__main__':
    generate_barplot_overall_data()
    # generate_barplot()
