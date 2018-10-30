import pandas as pd
import numpy as np
import scipy.stats as stats
import seaborn as sns
import matplotlib.pyplot as plt
import statistics.src.seaborn.dataset_seaborn as ds
import statistics.src.config as config
import statistics.src.stats.outliers as outliers

pd.set_option('display.max_columns', 500)

RESULTS_DIRECTORY = 'rq2/'
RESULTS_BASE_DIR = config.STATS_SRC_PATH + 'v2/rq2/'
RESULTS_DATA_DIRECTORY = RESULTS_BASE_DIR + 'data/'
RESULTS_IMAGES_DIR = RESULTS_BASE_DIR + 'images/'
FIGURE_TEMPLATE = RESULTS_IMAGES_DIR + '{}.png'


def barplot(df_all):
    df_c = df_all[[config.MECH, config.TYPE, config.COUNT]]
    df = df_c.groupby([config.MECH, config.TYPE], as_index=False).sum()

    df_mech = df.groupby([config.MECH], as_index=False).sum()
    df_mech.columns = [config.MECH, config.TOTAL_HANDLERS_PER_MECH]

    df_merge = df.merge(df_mech, on=config.MECH)

    total_handlers = df_merge[config.COUNT].sum()

    df_merge['ratio_per_mech'] = df_merge[config.COUNT] / df_merge[config.TOTAL_HANDLERS_PER_MECH]
    df_merge['ratio_handler'] = df_merge[config.COUNT] / total_handlers

    print(df_merge['ratio_handler'].sum())

    plt.figure()
    ax = sns.barplot(x=config.MECH, y='ratio_handler', data=df_merge, hue=config.TYPE)
    ax.set_yscale('log')
    plt.ylim(0, 0.4)
    plt.savefig(FIGURE_TEMPLATE.format('barplot_total_handlers'))

    fig, ax = plt.subplots(2, 1)
    create_barplot_per_mech(df_merge[df_merge[config.MECH] == config.ASYNC_AWAIT], ax[0], config.ASYNC_AWAIT)
    create_barplot_per_mech(df_merge[df_merge[config.MECH] == config.TRY_CATCH], ax[1], config.TRY_CATCH)

    fig.show()
    fig.savefig(FIGURE_TEMPLATE.format('barplot_ratio_per_mech'))

    df_merge.to_csv(RESULTS_DATA_DIRECTORY + 'df_merge.csv')


def create_horizontal_barplot_example():
    # https://python-graph-gallery.com/2-horizontal-barplot/
    # Make fake dataset
    height = [3, 12, 5, 18, 45]
    bars = ('A', 'B', 'C', 'D', 'E')
    y_pos = np.arange(len(bars))

    # Create horizontal bars
    plt.barh(y_pos, height)

    # Create names on the y-axis
    plt.yticks(y_pos, bars)

    # Show graphic
    plt.show()


def create_barplot_per_mech(df, ax, x_label):
    plt.figure()
    sns.barplot(x='ratio_per_mech', y=config.TYPE, data=df, ax=ax)
    ax.set_ylim(0, 1)
    ax.set(xlabel=x_label, ylabel='Class')


def lineplot_by_mech(df, type):
    df_c = df[[config.MECH, config.COUNT, config.TYPE, config.LINES, config.FILE, config.STMTS]]
    df_c = df_c[df_c[config.TYPE] == type]

    df = df_c.groupby([config.MECH, config.FILE, config.STMTS], as_index=False).sum()

    xlabel = '# of Statements'
    ylabel = '# of Handlers'
    x_col = config.STMTS
    y_col = config.COUNT
    hue = config.MECH
    filename = 'mech-{}'.format(type)

    ds.save_lineplot(df, FIGURE_TEMPLATE.format(filename), x_col, y_col, hue, xlabel, ylabel)

    df = df[df[config.MECH] != config.CALLBACK]
    ds.save_lineplot(df, FIGURE_TEMPLATE.format(filename + '-without-callback'), x_col, y_col, hue, xlabel, ylabel)


def plot_handlers_vs_stmts(df_all):
    # df_group = df_all[df_all[config.MECH] != config.CALLBACK]
    df_group = df_all.copy()
    df_group.loc[df_group[config.TYPE] == config.SERVER, config.TYPE] = 'Standalone'
    df_group.loc[df_group[config.TYPE] == config.CLIENT, config.TYPE] = 'Web'

    df_group = df_group.groupby([config.TYPE, config.STMTS], as_index=False).sum()
    df_group.sort_values(by=config.STMTS, inplace=True)

    x_label = '# of Statements'
    y_label = '# of Handlers'
    x_col = config.STMTS
    y_col = config.COUNT
    hue = 'Class'
    df_group.rename(index=str, columns={config.TYPE: 'Class'}, inplace=True)

    df_group.to_csv('to_delete.csv')

    # ds.save_lineplot(df_group, FIGURE_TEMPLATE.format('stmts'), x_col, y_col, hue, x_label, y_label)
    # Start a new figure
    plt.figure()
    # df_group[config.STMTS] = df_group[config.STMTS].interpolate()
    ax = sns.lineplot(data=df_group, x=x_col, y=y_col, hue=hue, hue_order=['Web', 'Standalone'])
    ax.set(xlabel=x_label, ylabel=y_label)
    ax.set_yscale('log')

    # Remove title on legend
    ax.legend(['Web', 'Standalone'])

    plt.savefig(FIGURE_TEMPLATE.format('stmts'))

    df_web = df_group[df_group['Class'] == 'Web']
    df_stand = df_group[df_group['Class'] == 'Standalone']
    sample1 = df_web[config.STMTS] / df_web[config.COUNT]
    sample2 = df_stand[config.STMTS] / df_stand[config.COUNT]

    res = stats.ks_2samp(sample1, sample2)
    print(res)

    # plt.figure()
    # df_g = df_group[df_group['Class'] == 'Web']
    # df_g = df_g[[config.STMTS, config.COUNT]]
    # sns.kdeplot(df_g)
    # plt.show()


def lineplot_all_by_lines(df_all):
    df_group = df_all[df_all[config.MECH] != config.CALLBACK]
    df_group = df_group.groupby([config.TYPE, config.LINES], as_index=False).sum()
    df_group = df_group[[config.TYPE, config.LINES, config.COUNT]]
    df_test = df_all.groupby([config.LINES], as_index=False).sum()
    df_group.sort_values(by=config.LINES, inplace=True)
    df_test.to_csv('out-lines.csv')

    x_label = '# of Lines'
    y_label = '# of Handlers'
    x_col = config.LINES
    y_col = config.COUNT
    hue = config.TYPE

    ds.save_lineplot(df_group, FIGURE_TEMPLATE.format('lines'), x_col, y_col, hue, x_label, y_label)


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


def barplot_strategies_percs(df_perc):
    plt.figure()
    ax = sns.barplot(x='strategy', y='perc', data=df_perc)

    ax.set_xticklabels(ax.get_xticklabels(), rotation=90, ha='right')
    plt.tight_layout()

    ax.set_yscale('log')

    plt.savefig(RESULTS_DIRECTORY + 'barplot_strategies_percs.png')


def violinplot_mech(df):
    df_g = pd.read_csv(config.PERCENTAGE_MECH_PER_REPO)
    df_g[config.PERC_PER_REPO] = df_g[config.PERC_PER_REPO] * 1

    df_means = df_g.groupby([config.MECH, config.TYPE], as_index=False).mean()
    df_means.to_csv(RESULTS_DATA_DIRECTORY + 'df_means.csv', index=False)

    df_g.loc[df_g[config.TYPE] == config.CLIENT, config.TYPE] = 'Web'
    df_g.loc[df_g[config.TYPE] == config.SERVER, config.TYPE] = 'Standalone'
    df_g.rename(index=str, columns={config.TYPE: 'Class'}, inplace=True)

    # Start a new figure
    plt.figure()

    # Present no lines in the grid
    sns.set(style='whitegrid')

    # Create plot and set labels
    ax = sns.violinplot(x=config.MECH, y=config.PERC_PER_REPO,
                        hue='Class', data=df,
                        cut=0, split=False, scale='count')
    x_label = ''
    y_label = '% of handlers'

    # Remove title on legend
    handles, labels = ax.get_legend_handles_labels()
    ax.legend(loc='upper right', handles=handles[:], labels=labels[:])

    ax.set(xlabel=x_label, ylabel=y_label)

    # Save figure
    plt.savefig(RESULTS_IMAGES_DIR + 'violinplot.png')


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
        df_rem_outliers = outliers.remove_outliers_iqr(df_data, config.STRATEGY_COUNT)
        df_data.to_csv(RESULTS_DATA_DIRECTORY + 'df_data_{}.csv'.format(mech), index=False)
        save_image_strategies(df_rem_outliers, mech)


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


def save_image_strategies(df_data, figure_name):
    plt.figure()
    sns.set_style('whitegrid')
    ax = sns.barplot(x=config.STRATEGY, y=config.STRATEGY_PERC, hue=config.TYPE,
                        data=df_data, palette="muted")
    # ax.set_yscale('log')
    ax.set_xticklabels(ax.get_xticklabels(), rotation=90, ha='right')
    plt.tight_layout()

    plt.savefig(RESULTS_IMAGES_DIR + 'strategy_count_{}_barplot.png'.format(figure_name))


def save_image_perc_strategies():
    df_data = pd.read_csv(RESULTS_DATA_DIRECTORY + 'data.csv', index_col=0)
    df_number_handlers = pd.read_csv(config.RESULT + 'number_of_handlers.csv')
    df_number_handlers = df_number_handlers[[config.MECH, config.TYPE, config.COUNT]]
    df_merge = df_data.merge(df_number_handlers, on=[config.MECH, config.TYPE])
    df_merge.rename(columns={'count_x': 'number_handler', 'count_y': 'total_handlers_by_type'}, inplace=True)
    df_merge[config.PERC] = (df_merge['number_handler'] / df_merge['total_handlers_by_type']) * 100
    df_merge.to_csv(RESULTS_DATA_DIRECTORY + 'data_info.csv')
    print(df_merge.head())

    df_merge_higher_one = df_merge[df_merge[config.PERC] > 1]
    df_merge_higher_one.to_csv(RESULTS_DATA_DIRECTORY + 'data_info_higher_one.csv')

    for mech in config.MECHS:
        df_d = df_merge_higher_one[df_merge_higher_one[config.MECH] == mech]
        df_d.loc[df_d[config.TYPE] == config.CLIENT, config.TYPE] = 'Web'
        df_d.loc[df_d[config.TYPE] == config.SERVER, config.TYPE] = 'Standalone'

        df_d.rename(index=str, columns={config.TYPE: 'Class'}, inplace=True)

        df_d.loc[df_d[
                     config.STRATEGY] == 'noUsageOfErrorArg,throwErrorObject', config.STRATEGY] = 'Ignored arg, Throw object'
        df_d.loc[df_d[config.STRATEGY] == 'others', config.STRATEGY] = 'Others'
        df_d.loc[df_d[config.STRATEGY] == 'rethrow', config.STRATEGY] = 'Re-throw'
        df_d.loc[df_d[config.STRATEGY] == 'consoleLog,rethrow', config.STRATEGY] = 'Log, Re-throw'
        df_d.loc[df_d[config.STRATEGY] == 'empty', config.STRATEGY] = 'Empty'
        df_d.loc[df_d[config.STRATEGY] == 'noUsageOfErrorArg', config.STRATEGY] = 'Ignored arg'
        df_d.loc[df_d[config.STRATEGY] == 'rethrow,returnLiteral', config.STRATEGY] = 'Re-throw, Return literal'
        df_d.loc[df_d[config.STRATEGY] == 'rethrow,returnNull', config.STRATEGY] = 'Re-throw, Return null'
        df_d.loc[df_d[config.STRATEGY] == 'reassigningError', config.STRATEGY] = 'Reassign error'
        df_d.loc[df_d[config.STRATEGY] == 'returnLiteral', config.STRATEGY] = 'Return literal'
        df_d.loc[df_d[config.STRATEGY] == 'reassigningError,break', config.STRATEGY] = 'Reassign error, Break'
        df_d.loc[df_d[config.STRATEGY] == 'consoleLog', config.STRATEGY] = 'Log'
        df_d.loc[
            df_d[config.STRATEGY] == 'noUsageOfErrorArg,returnLiteral', config.STRATEGY] = 'Ignored arg, Return literal'
        df_d.loc[df_d[config.STRATEGY] == 'noUsageOfErrorArg,returnNull', config.STRATEGY] = 'Ignored arg, Return null'
        df_d.loc[df_d[config.STRATEGY] == 'break', config.STRATEGY] = 'Break'

        plt.figure()
        sns.set_style('whitegrid')
        ax = sns.barplot(x=config.STRATEGY, y=config.PERC, hue='Class', data=df_d, palette='muted')
        # ax.set_yscale('log')
        ax.set_xticklabels(ax.get_xticklabels(), rotation=45, ha='right')

        # Remove title on legend
        handles, labels = ax.get_legend_handles_labels()
        ax.legend(loc='upper right', handles=handles[:], labels=labels[:])

        plt.xlabel('')
        plt.ylabel('% of strategies')
        plt.tight_layout()

        plt.savefig(RESULTS_IMAGES_DIR + 'strategy_perc_{}_barplot.png'.format(mech))


def calculate_mean_median_std():
    df_percent = pd.read_csv(config.PERCENTAGE_MECH_PER_REPO)
    df_perc = df_percent[[config.MECH, config.TYPE, config.PERC_PER_REPO]]

    df_stats = df_perc.groupby([config.MECH, config.TYPE]).mean().reset_index()
    df_stats['mean'] = df_stats[config.PERC_PER_REPO] * 100

    df_median = df_perc.groupby([config.MECH, config.TYPE]).median().reset_index()
    df_median['median'] = df_median[config.PERC_PER_REPO] * 100
    df_stats['median'] = df_median['median']

    df_stats.drop(config.PERC_PER_REPO, axis=1, inplace=True)

    print(df_stats.head())
    df_stats.to_csv(RESULTS_DATA_DIRECTORY + 'percentage_mean_median.csv')


def first_error_protocol():
    df_c = pd.read_csv(config.RESULT_INFO + 'result-repo-client.csv')
    df_c[config.TYPE] = config.CLIENT

    df_s = pd.read_csv(config.RESULT_INFO + 'result-repo-server.csv')
    df_s[config.TYPE] = config.SERVER

    df_grouped = df_c.append(df_s, ignore_index=True)

    CALLBACKS = 'callbacks'
    FIRST_ERROR_ARG = 'first_error_arg'
    df = pd.DataFrame()
    df[config.REPO] = df_grouped[config.REPO]
    df[FIRST_ERROR_ARG] = df_grouped[config.FIRST_ERROR_ARG_COLUMN]
    df[CALLBACKS] = df_grouped[config.CALLBACK_ERROR_FUNCTIONS]
    df[config.TYPE] = df_grouped[config.TYPE]
    df[config.PERC_FIRST_ERROR_PROTOCOL] = (df[FIRST_ERROR_ARG] * 100) / df[CALLBACKS]
    print(df[FIRST_ERROR_ARG].sum())
    print(df[CALLBACKS].sum())

    total_first_error = df[FIRST_ERROR_ARG].sum()

    df_c = df[df[config.TYPE] == config.CLIENT]
    df_s = df[df[config.TYPE] == config.SERVER]

    print(df_c[FIRST_ERROR_ARG].sum() / total_first_error)
    print(df_s[FIRST_ERROR_ARG].sum() / total_first_error)

    df.fillna(0, inplace=True)

    df.to_csv(RESULTS_DATA_DIRECTORY + 'first_error_protocol.csv')

    df_info = pd.DataFrame()

    df_group_info = df.groupby(config.TYPE)

    df_info['mean_raw'] = df_group_info.mean()[config.FIRST_ERROR_ARG]
    df_info['median_raw'] = df_group_info.median()[config.FIRST_ERROR_ARG]
    df_info['std_raw'] = df_group_info.std()[config.FIRST_ERROR_ARG]
    df_info['min_raw'] = df_group_info.min()[config.FIRST_ERROR_ARG]
    df_info['max_raw'] = df_group_info.max()[config.FIRST_ERROR_ARG]
    df_info['total_raw'] = df_group_info.sum()[config.FIRST_ERROR_ARG]

    df_info['mean_perc'] = df_group_info.mean()[config.PERC_FIRST_ERROR_PROTOCOL]
    df_info['median_perc'] = df_group_info.median()[config.PERC_FIRST_ERROR_PROTOCOL]
    df_info['std_perc'] = df_group_info.std()[config.PERC_FIRST_ERROR_PROTOCOL]
    df_info['min_perc'] = df_group_info.min()[config.PERC_FIRST_ERROR_PROTOCOL]
    df_info['max_perc'] = df_group_info.max()[config.PERC_FIRST_ERROR_PROTOCOL]
    df_info['total_perc'] = df_group_info.sum()[config.PERC_FIRST_ERROR_PROTOCOL]

    df_info.to_csv(RESULTS_DATA_DIRECTORY + 'first_error_protocol_info.csv')


def global_error_handlers(df):
    df_e = df[df[config.MECH] == config.WINDOW_ON_ERROR]
    print(df_e.head())

    df_e = df[df[config.MECH] == config.WINDOW_EVENT_LISTENER]
    print(df_e.head())


if __name__ == '__main__':
    ds.create_dir_if_not_exists(RESULTS_DATA_DIRECTORY)
    df_all = ds.read_dataset()

    # lineplot_all_by_lines(df_all)
    plot_handlers_vs_stmts(df_all)
    # lineplot_by_mech(df_all, config.CLIENT)
    # barplot(df_all)

    # percs = get_percs_from_strategies(df_all)
    # df_strat = build_data_for_perc(percs)
    # barplot_strategies_percs(df_strat)

    # violinplot_mech(df_all)

    # first_error_protocol()

    # get_data_strategies(df_all)

    # preprocessing_data()

    # save_image_perc_strategies()

    # df_whole = ds.read_whole_dataset()
    # global_error_handlers(df_whole)
