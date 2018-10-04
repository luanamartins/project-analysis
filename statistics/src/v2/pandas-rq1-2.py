import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt
import statistics.src.seaborn.dataset_seaborn as ds
import statistics.src.config as config


RESULTS_DIRECTORY = 'rq1-2/'


def get_all_strategies(df):
    list_strategies = []
    for index, row in df.iterrows():
        list_in = get_strategies(row)
        if list_in not in list_strategies:
            list_strategies.append(list_in)
    print(list_strategies)
    print(len(list_strategies))
    return list_strategies


def get_strategies(serie):
    list_strategies = []
    for strategy in config.STRATEGIES:
        if serie[strategy]:
            list_strategies.append(strategy)
    return list_strategies


def perc_mech(df):
    strategies_dataset = get_all_strategies(df)
    total_handlers = df.shape[0]



def main():
    ds.create_dir_if_not_exists(RESULTS_DIRECTORY)
    df = ds.read_dataset()
    perc_mech(df)


    # df.replace(True, 1, inplace=True)
    # df.replace(False, 0, inplace=True)

    # perc_mech(df_g)

    # df_g = df_e.groupby([config.REPO], as_index=False).sum()
    # df_g = df_g[[config.REPO, config.COUNT, config.LINES]]
    # df_g.to_csv('df_g.csv')

    # total_handlers = df.shape[0]
    #
    # df_g = pd.DataFrame()
    # for strategy in config.STRATEGIES:
    #     df_s = df[(df[strategy] == True) & (df[config.LINES] < 2)]
    #     df_g = df_g.append({
    #         config.STRATEGY: strategy,
    #         config.PERC: (df_s.shape[0] / total_handlers) * 100
    #     }, ignore_index=True)
    #
    #
    #
    # plt.figure()
    # ax = sns.barplot(x=config.STRATEGY, y=config.PERC, data=df_g)
    # ax.set_xticklabels(ax.get_xticklabels(), rotation=90, ha='right')
    # ax.set_ylim(0, 15)
    # plt.show()
    #
    # df_save = df[df[config.LINES] == 2]
    # df_save.to_csv('df_save.csv')




main()
