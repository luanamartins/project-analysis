import pandas as pd
import numpy as np
import seaborn as sns
import matplotlib.pyplot as plt
import statistics.src.seaborn.dataset_seaborn as ds
import statistics.src.config as config


RESULTS_DIRECTORY = 'rq2/'
FIGURE_TEMPLATE = RESULTS_DIRECTORY + '{}.png'


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

    df_merge.to_csv(RESULTS_DIRECTORY + 'df_merge.csv')


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


def lineplot_all_by_stmts(df_all):
    df_group = df_all[df_all[config.MECH] != config.CALLBACK]
    df_group = df_group.groupby([config.TYPE, config.STMTS], as_index=False).sum()

    df_test = df_all.groupby([config.STMTS, config.MECH], as_index=False).sum()
    df_group.sort_values(by=config.STMTS, inplace=True)
    df_test.to_csv('out2.csv')

    x_label = '# of Statements'
    y_label = '# of Handlers'
    x_col = config.STMTS
    y_col = config.COUNT
    hue = config.TYPE

    ds.save_lineplot(df_group, FIGURE_TEMPLATE.format('stmts'), x_col, y_col, hue, x_label, y_label)


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

    draw_violinplot(df_g, False, 'violinplot')
    draw_violinplot(df_g, True, 'violinplot-agg')


def draw_violinplot(df, to_split, figure_name):
    # Start a new figure
    plt.figure()

    # Present no lines in the grid
    sns.set(style='whitegrid')

    # Create plot and set labels
    g = sns.violinplot(x=config.MECH, y=config.PERC_PER_REPO,
                       hue=config.TYPE, data=df,
                       cut=0, split=to_split, scale='count')
    x_label = 'ER mechanisms'
    y_label = 'Percentage'

    g.set(xlabel=x_label, ylabel=y_label)

    # Save figure
    plt.savefig(RESULTS_DIRECTORY + figure_name + '.png')


def main():
    ds.create_dir_if_not_exists(RESULTS_DIRECTORY)
    df_all = ds.read_dataset()

    # lineplot_all_by_lines(df_all)
    # lineplot_all_by_stmts(df_all)
    # lineplot_by_mech(df_all, config.CLIENT)
    # barplot(df_all)

    # percs = get_percs_from_strategies(df_all)
    # df_strat = build_data_for_perc(percs)
    # barplot_strategies_percs(df_strat)

    violinplot_mech(df_all)


main()
