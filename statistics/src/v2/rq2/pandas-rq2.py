import pandas as pd
import statistics.src.seaborn.dataset_seaborn as ds
import statistics.src.config as config

pd.set_option('display.max_columns', 500)

RESULTS_DIRECTORY = 'rq2/'
RESULTS_BASE_DIR = config.STATS_SRC_PATH + 'v2/rq2/'
RESULTS_DATA_DIRECTORY = RESULTS_BASE_DIR + 'data/'
RESULTS_IMAGES_DIR = RESULTS_BASE_DIR + 'images/'
FIGURE_TEMPLATE = RESULTS_IMAGES_DIR + '{}.png'


def get_percs_from_strategies(df):
    total_handlers = df[config.COUNT].sum()
    percs = []
    for strategy in config.STRATEGIES:
        if strategy == config.EMPTY:
            partial = df[df[strategy] == True].shape[0]
        else:
            partial = df[(df[strategy] == True) & (df[config.LINES] == 1)].shape[0]
        partial = partial / total_handlers
        percs.append(partial)

    print(1 - sum(percs))
    return percs


def build_data_for_perc(percs):
    strategies = config.STRATEGIES
    strategies.append('others')
    df_strategies = pd.DataFrame(data=strategies)
    percs.append(1 - sum(percs))
    print(percs)
    df_strategies['perc'] = percs
    df_strategies.columns = ['strategy', 'perc']
    print(df_strategies)
    df_strategies['perc'] = df_strategies['perc']*100
    return df_strategies


def calculate_strategy_others(df):
    df_res = df.copy()

    strategies_to_remove = [config.EMPTY, config.NO_USAGE_OF_ERROR_ARG, config.RETHROW, config.RERETURN]
    strategies = list(filter(lambda s: s not in strategies_to_remove, config.STRATEGIES))

    df_strategies = df_res[strategies].sum(axis=1)
    df_res[config.OTHERS] = df_res[config.LINES].subtract(df_strategies)
    df_res.loc[df_res[config.OTHERS] < 0, config.OTHERS] = 0
    df_res.loc[df_res[config.OTHERS] > 0, config.OTHERS] = 1
    df_res.to_csv(RESULTS_DATA_DIRECTORY + 'df_res.csv', index=False)

    return df_res


def calculate_strategies_percentage(df):
    df_g = df[[config.REPO, config.TYPE, config.MECH, config.STRATEGY, config.STRATEGY_COUNT]]

    labels = [config.REPO, config.TYPE, config.MECH]

    df_sum_strategies = df_g.groupby(labels, as_index=False).sum()
    df_sum_strategies.rename(columns={config.STRATEGY_COUNT: config.STRATEGY_TOTAL}, inplace=True)
    df_sum_strategies.to_csv(RESULTS_DATA_DIRECTORY + 'df_sum_strategies.csv')

    df_merge = df.merge(df_sum_strategies, on=labels)
    df_merge[config.STRATEGY_PERC] = (df_merge[config.STRATEGY_COUNT] * 100) / df_merge[config.STRATEGY_TOTAL]

    return df_merge


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


def pre_processing_data():
    df = ds.read_dataset()
    strategies_dataset = get_all_strategies(df)
    df_g = pd.DataFrame()
    df_g[config.REPO] = df[config.REPO]
    df_g[config.FILE] = df[config.FILE]
    df_g[config.TYPE] = df[config.TYPE]
    df_g[config.MECH] = df[config.MECH]
    df_g[config.STRATEGY] = pd.Series(data=strategies_dataset)
    df_g = df_g.loc[:, ~df_g.columns.str.contains('^Unnamed')]
    df_g[config.COUNT] = 1
    df_g = df_g.replace('', config.OTHERS)

    df_result = df_g.groupby([config.REPO, config.FILE, config.TYPE, config.MECH, config.STRATEGY], as_index=False).sum()
    df_result.to_csv(RESULTS_DATA_DIRECTORY + 'data-file.csv', index=False)


def get_data_strategies(df):
    df_res = calculate_strategy_others(df)

    labels = [config.REPO, config.TYPE, config.MECH]
    df_g = df_res.groupby(labels, as_index=False).sum()
    df_g.to_csv(RESULTS_DATA_DIRECTORY + 'df_g.csv', index=False)

    for mech in config.MECHS:
        df_transposed = transpose_dataframe(df_g, mech)
        calculate_mean_median_std()
        df_data = calculate_strategies_percentage(df_transposed)
        df_data.to_csv(RESULTS_DATA_DIRECTORY + 'df_data_{}.csv'.format(mech), index=False)


def transpose_dataframe(df_g, mech):
    in_front = [config.REPO, config.TYPE, config.MECH, config.COUNT, config.LINES]
    df_partial = df_g[in_front]
    df_partial = df_partial[df_partial[config.MECH] == mech]

    all_strategies = config.STRATEGIES
    all_strategies.append(config.OTHERS)

    df_f = pd.DataFrame()
    for strategy in all_strategies:
        df_partial_copy = df_partial.copy()
        df_partial_copy[config.STRATEGY] = strategy
        df_partial_copy[config.STRATEGY_COUNT] = df_g[strategy]
        df_f = pd.concat([df_f, df_partial_copy], ignore_index=True)
    return df_f


def save_image_perc_strategies():
    df_data = pd.read_csv(RESULTS_DATA_DIRECTORY + 'data.csv', index_col=0)
    df_number_handlers = pd.read_csv(config.RESULT + 'number_of_handlers.csv')
    df_number_handlers = df_number_handlers[[config.MECH, config.TYPE, config.COUNT]]
    df_merge = df_data.merge(df_number_handlers, on=[config.MECH, config.TYPE])
    df_merge.rename(columns={'count_x': 'number_handler', 'count_y': 'total_handlers_by_mech'}, inplace=True)
    df_merge[config.PERC] = (df_merge['number_handler'] / df_merge['total_handlers_by_mech']) * 100
    df_merge.to_csv(RESULTS_DATA_DIRECTORY + 'data_info.csv')

    df_merge_higher_one = df_merge[df_merge[config.PERC] > 1]
    df_merge_higher_one.to_csv(RESULTS_DATA_DIRECTORY + 'data_info_higher_one.csv')


def calculate_mean_median_std():
    df_percent = pd.read_csv(config.PERCENTAGE_MECH_PER_REPO)
    df_perc = df_percent[[config.MECH, config.TYPE, config.PERC_PER_REPO]]

    df_stats = df_perc.groupby([config.MECH, config.TYPE]).mean().reset_index()
    df_stats['mean'] = df_stats[config.PERC_PER_REPO] * 100

    df_median = df_perc.groupby([config.MECH, config.TYPE]).median().reset_index()
    df_median['median'] = df_median[config.PERC_PER_REPO] * 100
    df_stats['median'] = df_median['median']

    df_stats.drop(config.PERC_PER_REPO, axis=1, inplace=True)
    df_stats.to_csv(RESULTS_DATA_DIRECTORY + 'percentage_mean_median.csv')


def global_error_handlers(df):
    df_e = df[df[config.MECH] == config.WINDOW_ON_ERROR]
    print(df_e.head())

    df_e = df[df[config.MECH] == config.WINDOW_EVENT_LISTENER]
    print(df_e.head())


def generate_data_info_edit():
    df = pd.read_csv(RESULTS_DATA_DIRECTORY + 'data_info_edit.csv', index_col=False)
    df.loc[df[config.TYPE] == config.SERVER, config.TYPE] = 'standalone'
    df.loc[df[config.TYPE] == config.CLIENT, config.TYPE] = 'web'
    df.to_csv(RESULTS_DATA_DIRECTORY + 'data_info_edit.csv')


if __name__ == '__main__':
    ds.create_dir_if_not_exists(RESULTS_DATA_DIRECTORY)
    df_all = ds.read_dataset()

    # percs = get_percs_from_strategies(df_all)
    # df_strat = build_data_for_perc(percs)
    # barplot_strategies_percs(df_strat)

    # violinplot_mech(df_all)

    # get_data_strategies(df_all)

    # preprocessing_data()

    # save_image_perc_strategies()

    df_whole = ds.read_whole_dataset()
    global_error_handlers(df_whole)
