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


def barplot_strategies_percs(df_perc):
    plt.figure()
    ax = sns.barplot(x='strategy', y='perc', data=df_perc)

    ax.set_xticklabels(ax.get_xticklabels(), rotation=90, ha='right')
    plt.tight_layout()

    ax.set_yscale('log')

    plt.savefig(RESULTS_DIRECTORY + 'barplot_strategies_percs.png')


def save_strategies_from_mechs(df_data):
    for mech_name in config.MECHS:
        df = outliers.remove_outliers_iqr(df_data, config.STRATEGY_COUNT)
        save_image_strategies(df, mech_name)


# save_image_strategies
def save_image_strategies(df_data, figure_name):
    plt.figure()
    sns.set_style('whitegrid')
    ax = sns.barplot(x=config.STRATEGY, y=config.STRATEGY_PERC, hue=config.TYPE,
                        data=df_data, palette="muted")
    # ax.set_yscale('log')
    ax.set_xticklabels(ax.get_xticklabels(), rotation=90, ha='right')
    plt.tight_layout()

    plt.savefig(RESULTS_IMAGES_DIR + 'strategy_count_{}_barplot.png'.format(figure_name))

    df_merge_higher_one = pd.read_csv(RESULTS_DATA_DIRECTORY + 'data_info_higher_one.csv')

    for mech in config.MECHS:
        df_d = df_merge_higher_one[df_merge_higher_one[config.MECH] == mech]
        df_d.loc[df_d[config.TYPE] == config.CLIENT, config.TYPE] = 'Web-based'
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


if __name__ == '__main__':
    ds.create_dir_if_not_exists(RESULTS_DATA_DIRECTORY)
    df_all = ds.read_dataset()

    # lineplot_all_by_lines(df_all)
    # plot_handlers_vs_stmts(df_all)
    # lineplot_by_mech(df_all, config.CLIENT)
    # barplot(df_all)