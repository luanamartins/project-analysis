import pandas as pd
import numpy as np
import scipy.stats as stats
import seaborn as sns
import matplotlib.pyplot as plt
import statistics.src.processing.process ds
import statistics.src.constants as constants
import statistics.src.stats.outliers as outliers

pd.set_option('display.max_columns', 500)

RESULTS_DIRECTORY = 'rq2/'
RESULTS_BASE_DIR = constants.STATS_SRC_PATH + 'v2/rq2/'
RESULTS_DATA_DIRECTORY = RESULTS_BASE_DIR + 'data/'
RESULTS_IMAGES_DIR = RESULTS_BASE_DIR + 'images/'
FIGURE_TEMPLATE = RESULTS_IMAGES_DIR + '{}.png'


def process_data_for_barplot(df_all):
    df_c = df_all[[constants.MECH, constants.TYPE, constants.COUNT]]
    df = df_c.groupby([constants.MECH, constants.TYPE], as_index=False).sum()

    df_mech = df.groupby([constants.MECH], as_index=False).sum()
    df_mech.columns = [constants.MECH, constants.TOTAL_HANDLERS_PER_MECH]

    df_merge = df.merge(df_mech, on=constants.MECH)

    total_handlers = df_merge[constants.COUNT].sum()

    df_merge['ratio_per_mech'] = df_merge[constants.COUNT] / df_merge[constants.TOTAL_HANDLERS_PER_MECH]
    df_merge['ratio_handler'] = df_merge[constants.COUNT] / total_handlers

    print(df_merge['ratio_handler'].sum())
    return df_merge


def barplot(df_merge):
    plt.figure()
    ax = sns.barplot(x=constants.MECH, y='ratio_handler', data=df_merge, hue=constants.TYPE)
    ax.set_yscale('log')
    plt.ylim(0, 0.4)
    plt.savefig(FIGURE_TEMPLATE.format('barplot_total_handlers'))

    fig, ax = plt.subplots(2, 1)
    create_barplot_per_mech(df_merge[df_merge[constants.MECH] == constants.ASYNC_AWAIT], ax[0], constants.ASYNC_AWAIT)
    create_barplot_per_mech(df_merge[df_merge[constants.MECH] == constants.TRY_CATCH], ax[1], constants.TRY_CATCH)

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
    sns.barplot(x='ratio_per_mech', y=constants.TYPE, data=df, ax=ax)
    ax.set_ylim(0, 1)
    ax.set(xlabel=x_label, ylabel='Class')


def lineplot_by_mech(df, type):
    df_c = df[[constants.MECH, constants.COUNT, constants.TYPE, constants.LINES, constants.FILE, constants.STMTS]]
    df_c = df_c[df_c[constants.TYPE] == type]

    df = df_c.groupby([constants.MECH, constants.FILE, constants.STMTS], as_index=False).sum()

    xlabel = '# of Statements'
    ylabel = '# of Handlers'
    x_col = constants.STMTS
    y_col = constants.COUNT
    hue = constants.MECH
    filename = 'mech-{}'.format(type)

    ds.save_lineplot(df, FIGURE_TEMPLATE.format(filename), x_col, y_col, hue, xlabel, ylabel)

    df = df[df[constants.MECH] != constants.CALLBACK]
    ds.save_lineplot(df, FIGURE_TEMPLATE.format(filename + '-without-callback'), x_col, y_col, hue, xlabel, ylabel)


def plot_handlers_vs_stmts(df_all):
    df_group = df_all.copy()
    df_group.loc[df_group[constants.TYPE] == constants.SERVER, constants.TYPE] = 'Standalone'
    df_group.loc[df_group[constants.TYPE] == constants.CLIENT, constants.TYPE] = 'Web'

    df_group = df_group.groupby([constants.TYPE, constants.STMTS], as_index=False).sum()
    df_group.sort_values(by=constants.STMTS, inplace=True)

    x_label = '# of Statements'
    y_label = '# of Handlers'
    x_col = constants.STMTS
    y_col = constants.COUNT
    hue = 'Class'
    df_group.rename(index=str, columns={constants.TYPE: 'Class'}, inplace=True)

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
    sample1 = df_web[constants.STMTS] / df_web[constants.COUNT]
    sample2 = df_stand[constants.STMTS] / df_stand[constants.COUNT]

    np.random.seed(314159)

    res = stats.ks_2samp(sample1, sample2)
    print(res)

    print(stats.shapiro(sample1))
    print(stats.shapiro(sample2))

    # res = stats.kstest(sample1, sample2)
    # print(res)

    # res = stats.chisquare(sample1, f_exp=sample2)
    # res = stats.chi2.cdf(sample1, sample2)
    # print(res)

    # np.random.seed(314159)
    # res = stats.anderson_ksamp(sample1, sample2)
    # print(res)

    # plt.figure()
    # df_g = df_group[df_group['Class'] == 'Web']
    # df_g = df_g[[config.STMTS, config.COUNT]]
    # sns.kdeplot(df_g)
    # plt.show()


def lineplot_all_by_lines(df_all):
    df_group = df_all[df_all[constants.MECH] != constants.CALLBACK]
    df_group = df_group.groupby([constants.TYPE, constants.LINES], as_index=False).sum()
    df_group = df_group[[constants.TYPE, constants.LINES, constants.COUNT]]
    df_group.sort_values(by=constants.LINES, inplace=True)

    x_label = '# of Lines'
    y_label = '# of Handlers'
    x_col = constants.LINES
    y_col = constants.COUNT
    hue = constants.TYPE

    ds.save_lineplot(df_group, FIGURE_TEMPLATE.format('lines'), x_col, y_col, hue, x_label, y_label)


def draw_violinplot(x, y, hue, x_label, y_label, data, filename):
    # Start a new figure
    plt.figure()
    # Present no lines in the grid
    sns.set(style='whitegrid')

    # Create plot and set labels
    ax = sns.violinplot(x=x, y=y, hue=hue, data=data, cut=0, split=False, scale='count')

    # Remove title on legend
    handles, labels = ax.get_legend_handles_labels()
    ax.legend(loc='upper right', handles=handles[:], labels=labels[:])

    ax.set(xlabel=x_label, ylabel=y_label)

    # Save figure
    plt.savefig(filename)


def violinplot_mech():
    df_g = pd.read_csv(constants.PERCENTAGE_MECH_PER_REPO)
    df_g[constants.PERC_PER_REPO] = df_g[constants.PERC_PER_REPO] * 1

    df_means = df_g.groupby([constants.MECH, constants.TYPE], as_index=False).mean()
    df_means.to_csv(RESULTS_DATA_DIRECTORY + 'df_means.csv', index=False)

    df_g.loc[df_g[constants.TYPE] == constants.CLIENT, constants.TYPE] = 'Web-based'
    df_g.loc[df_g[constants.TYPE] == constants.SERVER, constants.TYPE] = 'Node-based'
    df_g.rename(index=str, columns={constants.TYPE: 'Class'}, inplace=True)

    # Start a new figure
    plt.figure()

    # Present no lines in the grid
    sns.set(style='whitegrid')

    # Create plot and set labels
    ax = sns.violinplot(x=constants.MECH, y=constants.PERC_PER_REPO,
                        hue='Class', data=df_g,
                        cut=0, split=False, scale='count')
    x_label = ''
    y_label = '% of handlers'

    # Remove title on legend
    handles, labels = ax.get_legend_handles_labels()
    ax.legend(loc='upper right', handles=handles[:], labels=labels[:])

    ax.set(xlabel=x_label, ylabel=y_label)

    # Save figure
    plt.savefig(RESULTS_IMAGES_DIR + 'violinplot.png')


def barplot_strategies_percs():
    df = pd.read_csv(RESULTS_DATA_DIRECTORY + 'df_strategies.csv')

    plt.figure()
    ax = sns.barplot(x='strategy', y='perc', data=df)

    ax.set_xticklabels(ax.get_xticklabels(), rotation=90, ha='right')
    plt.tight_layout()

    ax.set_yscale('log')

    plt.savefig(RESULTS_IMAGES_DIR + 'barplot_strategies_percs.png')


def save_strategies_from_mechs(df_data):
    for mech_name in constants.MECHS:
        df = outliers.remove_outliers_iqr(df_data, constants.STRATEGY_COUNT)
        save_image_strategies(df, mech_name)


# save_image_strategies
def save_image_strategies(df_data, figure_name):
    plt.figure()
    sns.set_style('whitegrid')
    ax = sns.barplot(x=constants.STRATEGY, y=constants.STRATEGY_PERC, hue=constants.TYPE,
                     data=df_data, palette="muted")
    # ax.set_yscale('log')
    ax.set_xticklabels(ax.get_xticklabels(), rotation=90, ha='right')
    plt.tight_layout()

    plt.savefig(RESULTS_IMAGES_DIR + 'strategy_count_{}_barplot.png'.format(figure_name))

    df_merge_higher_one = pd.read_csv(RESULTS_DATA_DIRECTORY + 'data_info_higher_one.csv')

    for abstraction in constants.MECHS:
        df_d = df_merge_higher_one[df_merge_higher_one[constants.MECH] == abstraction]
        df_d[constants.TYPE] = df_d[constants.TYPE].replace(constants.CLIENT, 'Web-based')
        df_d[constants.TYPE] = df_d[constants.TYPE].replace(constants.SERVER, 'Node-based')

        df_d.rename(index=str, columns={constants.TYPE: 'Class'}, inplace=True)

        df_d.loc[df_d[
                     constants.STRATEGY] == 'noUsageOfErrorArg,throwErrorObject', constants.STRATEGY] = 'Ignored arg, Throw object'
        df_d.loc[df_d[constants.STRATEGY] == 'others', constants.STRATEGY] = 'Others'
        df_d.loc[df_d[constants.STRATEGY] == 'rethrow', constants.STRATEGY] = 'Re-throw'
        df_d.loc[df_d[constants.STRATEGY] == 'consoleLog,rethrow', constants.STRATEGY] = 'Log, Re-throw'
        df_d.loc[df_d[constants.STRATEGY] == 'empty', constants.STRATEGY] = 'Empty'
        df_d.loc[df_d[constants.STRATEGY] == 'noUsageOfErrorArg', constants.STRATEGY] = 'Ignored arg'
        df_d.loc[df_d[constants.STRATEGY] == 'rethrow,returnLiteral', constants.STRATEGY] = 'Re-throw, Return literal'
        df_d.loc[df_d[constants.STRATEGY] == 'rethrow,returnNull', constants.STRATEGY] = 'Re-throw, Return null'
        df_d.loc[df_d[constants.STRATEGY] == 'reassigningError', constants.STRATEGY] = 'Reassign error'
        df_d.loc[df_d[constants.STRATEGY] == 'returnLiteral', constants.STRATEGY] = 'Return literal'
        df_d.loc[df_d[constants.STRATEGY] == 'reassigningError,break', constants.STRATEGY] = 'Reassign error, Break'
        df_d.loc[df_d[constants.STRATEGY] == 'consoleLog', constants.STRATEGY] = 'Log'
        df_d.loc[
            df_d[constants.STRATEGY] == 'noUsageOfErrorArg,returnLiteral', constants.STRATEGY] = 'Ignored arg, Return literal'
        df_d.loc[df_d[constants.STRATEGY] == 'noUsageOfErrorArg,returnNull', constants.STRATEGY] = 'Ignored arg, Return null'
        df_d.loc[df_d[constants.STRATEGY] == 'break', constants.STRATEGY] = 'Break'

        plt.figure()
        sns.set_style('whitegrid')
        ax = sns.barplot(x=constants.STRATEGY, y=constants.PERC, hue='Class', data=df_d, palette='muted')
        # ax.set_yscale('log')
        ax.set_xticklabels(ax.get_xticklabels(), rotation=45, ha='right')

        # Remove title on legend
        handles, labels = ax.get_legend_handles_labels()
        ax.legend(loc='upper right', handles=handles[:], labels=labels[:])

        plt.xlabel('')
        plt.ylabel('% of strategies')
        plt.tight_layout()

        plt.savefig(RESULTS_IMAGES_DIR + 'strategy_perc_{}_barplot.png'.format(abstraction))


if __name__ == '__main__':
    ds.create_dir_if_not_exists(RESULTS_DATA_DIRECTORY)
    df = ds.read_dataset()

    # lineplot_all_by_lines(df)
    # plot_handlers_vs_stmts(df)
    # lineplot_by_mech(df, config.CLIENT)
    # lineplot_by_mech(df, config.SERVER)
    # df_proc = process_data_for_barplot(df)
    # barplot(df_proc)

    # barplot_strategies_percs()

    violinplot_mech()

    # save_strategies_from_mechs(df)
