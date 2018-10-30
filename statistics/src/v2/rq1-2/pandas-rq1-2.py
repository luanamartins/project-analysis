import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt
import statistics.src.seaborn.dataset_seaborn as ds
import statistics.src.config as config


pd.set_option('display.max_rows', 500)
pd.set_option('display.max_columns', 500)


RESULTS_DIRECTORY = 'data/'
RESULTS_DIRECTORY_IMAGES = 'images/'


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


def preprocessing_data():
    df = ds.read_dataset()
    strategies_dataset = get_all_strategies(df)
    df_g = pd.DataFrame()
    df_g[config.MECH] = df[config.MECH]
    df_g[config.STRATEGY] = pd.Series(data=strategies_dataset)
    df_g = df_g.loc[:, ~df_g.columns.str.contains('^Unnamed')]
    df_g[config.COUNT] = 1
    df_g = df_g.replace('', config.OTHERS)

    df_result = df_g.groupby([config.MECH, config.STRATEGY], as_index=False).sum()
    df_result.to_csv(RESULTS_DIRECTORY + 'data.csv', index=False)


def handle_mech_strategies(df, filename):
    df_copy = df.copy()
    total_c = df[config.COUNT].sum()

    df_copy[config.PERC] = (df_copy[config.COUNT] / total_c) * 100
    df_copy = df_copy.sort_values(by=config.PERC, ascending=False)

    # Save the percentages which strategy has more than 1%
    df_copy = df_copy[df_copy[config.PERC] > 1]

    df_copy.loc[df_copy[config.STRATEGY] == 'others', config.STRATEGY] = 'Others'
    df_copy.loc[df_copy[config.STRATEGY] == 'noUsageOfErrorArg', config.STRATEGY] = 'Ignore arg'
    df_copy.loc[df_copy[config.STRATEGY] == 'empty', config.STRATEGY] = 'Empty'
    df_copy.loc[df_copy[config.STRATEGY] == 'reassigningError', config.STRATEGY] = 'Reassign error'
    df_copy.loc[df_copy[config.STRATEGY] == 'rethrow', config.STRATEGY] = 'Re-throw'
    df_copy.loc[df_copy[config.STRATEGY] == 'noUsageOfErrorArg,returnLiteral', config.STRATEGY] = 'Ignore arg, Return literal'
    df_copy.loc[
        df_copy[config.STRATEGY] == 'reassigningError,break', config.STRATEGY] = 'Reassign error, Break'

    # Save barplot
    plt.figure()
    sns.set_style('whitegrid')
    ax = sns.barplot(x=config.STRATEGY, y=config.PERC, hue=config.STRATEGY, data=df_copy)
    ax.set_xticklabels([])
    # ax.set_xticklabels(ax.get_xticklabels(), rotation=90, ha='right')
    # ax.legend(bbox_to_anchor=(1, 0.5))
    ax.legend(loc='upper right')

    plt.xlabel('')
    plt.ylabel('% of strategies')
    plt.tight_layout()
    plt.bar(data.xcol, data.ycol, 4)
    plt.savefig(RESULTS_DIRECTORY_IMAGES + filename)

    df_copy.to_csv(RESULTS_DIRECTORY + filename + '.csv', index=False)
    # print(df_copy)
    print(df_copy[config.PERC].sum())


if __name__ == '__main__':
    # preprocessing_data()

    ds.create_dir_if_not_exists(RESULTS_DIRECTORY)
    df = pd.read_csv(RESULTS_DIRECTORY + 'data.csv')

    df_mech = df[df[config.MECH] == config.CALLBACK]
    handle_mech_strategies(df_mech, 'df_callback')

    df_mech = df[df[config.MECH] == config.TRY_CATCH]
    handle_mech_strategies(df_mech, 'df_try_catch')

    df_mech = df[df[config.MECH] == config.EVENT]
    handle_mech_strategies(df_mech, 'df_event')

    df_mech = df[df[config.MECH] == config.PROMISE]
    handle_mech_strategies(df_mech, 'df_promise')

    df_mech = df[df[config.MECH] == config.ASYNC_AWAIT]
    handle_mech_strategies(df_mech, 'df_async_await')

    df_mech = df.groupby(config.STRATEGY, as_index=False).sum()
    handle_mech_strategies(df_mech, 'overall')
