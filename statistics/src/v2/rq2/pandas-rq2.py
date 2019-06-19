import pandas as pd
import statistics.src.processing.process as ds
import statistics.src.constants as constants

pd.set_option('display.max_columns', 500)

RESULTS_DIRECTORY = 'rq2/'
RESULTS_BASE_DIR = constants.STATS_SRC_PATH + 'v2/rq2/'
RESULTS_DATA_DIRECTORY = RESULTS_BASE_DIR + 'data/'
RESULTS_IMAGES_DIR = RESULTS_BASE_DIR + 'images/'
FIGURE_TEMPLATE = RESULTS_IMAGES_DIR + '{}.png'


def save_percs_from_strategies(df):
    total_handlers = df[constants.COUNT].sum()
    percs = []
    for strategy in constants.STRATEGIES:
        if strategy == constants.EMPTY:
            partial = df[df[strategy] == True].shape[0]
        else:
            partial = df[(df[strategy] == True) & (df[constants.LINES] == 1)].shape[0]
        partial = partial / total_handlers
        percs.append(partial)

    print(1 - sum(percs))

    strategies = constants.STRATEGIES
    strategies.append('others')
    df_strategies = pd.DataFrame(data=strategies)
    percs.append(1 - sum(percs))
    df_strategies['perc'] = percs
    df_strategies.columns = ['strategy', 'perc']

    df_strategies['perc'] = df_strategies['perc'] * 100

    df_strategies.to_csv(RESULTS_DATA_DIRECTORY + 'df_strategies.csv')


def calculate_strategies_percentage(df):
    df_g = df[[constants.REPO, constants.TYPE, constants.MECH, constants.STRATEGY, constants.STRATEGY_COUNT]]

    labels = [constants.REPO, constants.TYPE, constants.MECH]

    df_sum_strategies = df_g.groupby(labels, as_index=False).sum()
    df_sum_strategies.rename(columns={constants.STRATEGY_COUNT: constants.STRATEGY_TOTAL}, inplace=True)
    df_sum_strategies.to_csv(RESULTS_DATA_DIRECTORY + 'df_sum_strategies.csv')

    df_merge = df.merge(df_sum_strategies, on=labels)
    df_merge[constants.STRATEGY_PERC] = (df_merge[constants.STRATEGY_COUNT] * 100) / df_merge[constants.STRATEGY_TOTAL]

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
    for strategy in constants.STRATEGIES:
        if serie[strategy]:
            list_strategies.append(strategy)
    return list_strategies


def pre_processing_data():
    df = ds.read_dataset()
    strategies_dataset = get_all_strategies(df)
    df_g = pd.DataFrame()
    df_g[constants.REPO] = df[constants.REPO]
    df_g[constants.FILE] = df[constants.FILE]
    df_g[constants.LINES] = df[constants.LINES]
    df_g[constants.STMTS] = df[constants.STMTS]
    df_g[constants.TYPE] = df[constants.TYPE]
    df_g[constants.MECH] = df[constants.MECH]
    df_g[constants.STRATEGY] = pd.Series(data=strategies_dataset)
    df_g = df_g.loc[:, ~df_g.columns.str.contains('^Unnamed')]
    df_g[constants.COUNT] = 1
    df_g = df_g.replace('', constants.OTHERS)

    df_result = df_g.groupby([constants.REPO, constants.FILE, constants.TYPE, constants.MECH, constants.STRATEGY], as_index=False).sum()
    df_result.to_csv(RESULTS_DATA_DIRECTORY + 'data-file2.csv', index=False)


def save_strategies_of_mechanisms(df):

    df_res = df.copy()

    strategies_to_remove = [constants.EMPTY, constants.NO_USAGE_OF_ERROR_ARG, constants.RETHROW, constants.RERETURN]
    strategies = list(filter(lambda s: s not in strategies_to_remove, constants.STRATEGIES))

    df_strategies = df_res[strategies].sum(axis=1)
    df_res[constants.OTHERS] = df_res[constants.LINES].subtract(df_strategies)
    df_res.loc[df_res[constants.OTHERS] < 0, constants.OTHERS] = 0
    df_res.loc[df_res[constants.OTHERS] > 0, constants.OTHERS] = 1
    # df_res.to_csv(RESULTS_DATA_DIRECTORY + 'df_res.csv', index=False)

    labels = [constants.REPO, constants.TYPE, constants.MECH]
    df_g = df_res.groupby(labels, as_index=False).sum()
    # df_g.to_csv(RESULTS_DATA_DIRECTORY + 'df_g.csv', index=False)

    for mech in constants.MECHS:
        df_transposed = transpose_dataframe(df_g, mech)
        calculate_mean_median_std()
        df_data = calculate_strategies_percentage(df_transposed)
        df_data.to_csv(RESULTS_DATA_DIRECTORY + 'df_data_{}.csv'.format(mech), index=False)


def transpose_dataframe(df_g, mech):
    in_front = [constants.REPO, constants.TYPE, constants.MECH, constants.COUNT, constants.LINES]
    df_partial = df_g[in_front]
    df_partial = df_partial[df_partial[constants.MECH] == mech]

    all_strategies = constants.STRATEGIES
    all_strategies.append(constants.OTHERS)

    df_f = pd.DataFrame()
    for strategy in all_strategies:
        df_partial_copy = df_partial.copy()
        df_partial_copy[constants.STRATEGY] = strategy
        df_partial_copy[constants.STRATEGY_COUNT] = df_g[strategy]
        df_f = pd.concat([df_f, df_partial_copy], ignore_index=True)
    return df_f


def save_image_perc_strategies():
    df_data = pd.read_csv(RESULTS_DATA_DIRECTORY + 'data.csv', index_col=0)

    df_number_handlers = pd.read_csv(constants.RESULT + 'number_of_handlers.csv')
    df_number_handlers = df_number_handlers[[constants.MECH, constants.TYPE, constants.COUNT]]

    df_merge = df_data.merge(df_number_handlers, on=[constants.MECH, constants.TYPE])
    df_merge.rename(columns={'count_x': 'number_handler', 'count_y': 'total_handlers_by_mech'}, inplace=True)
    df_merge[constants.PERC] = (df_merge['number_handler'] / df_merge['total_handlers_by_mech']) * 100

    df_merge.loc[df_merge[constants.TYPE] == constants.SERVER, constants.TYPE] = 'standalone'
    df_merge.loc[df_merge[constants.TYPE] == constants.CLIENT, constants.TYPE] = 'web'

    df_merge.to_csv(RESULTS_DATA_DIRECTORY + 'data_info.csv')

    df_merge_higher_one = df_merge[df_merge[constants.PERC] > 1]
    df_merge_higher_one.to_csv(RESULTS_DATA_DIRECTORY + 'data_info_higher_one.csv')


def calculate_mean_median_std():
    df_percent = pd.read_csv(constants.PERCENTAGE_MECH_PER_REPO)
    df_perc = df_percent[[constants.MECH, constants.TYPE, constants.PERC_PER_REPO]]

    df_stats = df_perc.groupby([constants.MECH, constants.TYPE]).mean().reset_index()
    df_stats['mean'] = df_stats[constants.PERC_PER_REPO] * 100

    df_median = df_perc.groupby([constants.MECH, constants.TYPE]).median().reset_index()
    df_median['median'] = df_median[constants.PERC_PER_REPO] * 100
    df_stats['median'] = df_median['median']

    df_stats.drop(constants.PERC_PER_REPO, axis=1, inplace=True)
    df_stats.to_csv(RESULTS_DATA_DIRECTORY + 'percentage_mean_median.csv')


# percentagem dos sistemas estudados que usa cada abstração? Seria legal. Por exemplo, async await é muito pouco usado
# Isso significa que alguns apps usam e usam pouco ou que um ou dois apps fazem todos os usos?
# Usos de promises e eventos que tratam erros estão distribuídos uniformemente entre os sistemas analisados?
# Ha sistemas que não usam try-catch? Sim, não, por quê?

def new_calc():
    df = pd.read_csv(constants.PERCENTAGE_MECH_PER_REPO)
    df['#_projects'] = 1
    df = df.groupby([constants.MECH]).sum()
    df.to_csv('test.csv')


if __name__ == '__main__':
    # ds.create_dir_if_not_exists(RESULTS_DATA_DIRECTORY)
    # df_all = ds.read_dataset()
    pre_processing_data()

    # save_percs_from_strategies(df_all)

    # save_strategies_of_mechanisms(df_all)

    # save_image_perc_strategies()

    # df_whole = ds.read_whole_dataset()
    # global_error_handlers(df_whole)

    # new_calc()
