import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt
import statistics.src.seaborn.dataset_seaborn as ds
import statistics.src.config as config


RESULTS_BASE_DIR = config.STATS_SRC_PATH + 'v2/rq1-1/'
RESULTS_DIRECTORY = RESULTS_BASE_DIR + 'data/'
RESULTS_IMAGE_DIRECTORY = RESULTS_BASE_DIR + 'images/'


def save_barplot(data, xlabel, x, y, log, ax):
    plt.figure()

    order_repo = data[config.REPO].tolist()
    ax = sns.barplot(x=x, y=y, data=data, palette='Greys_d', order=order_repo, ax=ax)
    ax.set_xticklabels([])

    if log:
        ax.set_yscale('log')
    ax.set_ylim(0, 1)
    ax.set(xlabel=xlabel, ylabel='Ratio')


def get_data(mech, type):
    df_g = pd.read_csv(config.RESULT + 'percentage_mech_per_repo.csv')
    df = df_g[(df_g[config.MECH] == mech)] # & (df_g[config.TYPE] == 'client')
    df.sort_values(by=[config.PERC_PER_REPO], inplace=True)
    df.repo = pd.Categorical(df.repo)
    return df


def create_graph():
    ds.create_dir_if_not_exists(RESULTS_IMAGE_DIRECTORY)

    df = get_data(config.TRY_CATCH, '')
    df_a = get_data(config.ASYNC_AWAIT, '')
    df_c = get_data(config.CALLBACK, '')
    df_e = get_data(config.EVENT, '')
    df_p = get_data(config.PROMISE, '')

    fig, ax = plt.subplots(5, 1)
    save_barplot(df, config.TRY_CATCH, config.REPO, config.PERC_PER_REPO, False, ax[0])
    save_barplot(df_a, config.ASYNC_AWAIT, config.REPO, config.PERC_PER_REPO, False, ax[1])
    save_barplot(df_c, config.CALLBACK, config.REPO, config.PERC_PER_REPO, False, ax[2])
    save_barplot(df_e, config.EVENT, config.REPO, config.PERC_PER_REPO, False, ax[3])
    save_barplot(df_p, config.PROMISE, config.REPO, config.PERC_PER_REPO, False, ax[4])

    fig.show()
    fig.savefig(RESULTS_IMAGE_DIRECTORY + 'output.png')


def lineplot(df_raw):
    df_c = df_raw[[config.MECH, config.COUNT, config.TYPE, config.LINES, config.FILE, config.STMTS]]
    df = df_c.groupby([config.MECH, config.STMTS], as_index=False).sum()
    df.to_csv(RESULTS_DIRECTORY + 'result-rq1-1.csv')

    df = df[df[config.MECH] != config.WINDOW_EVENT_LISTENER]
    df = df[df[config.MECH] != config.WINDOW_ON_ERROR]

    xlabel = '# of Statements'
    ylabel = '# of Handlers'
    x_col = config.STMTS
    y_col = config.COUNT
    hue = config.MECH

    # ds.save_lineplot(df, dir_name.format('line'), x_col, y_col, hue, xlabel, ylabel)
    # Start a new figure
    plt.figure()
    ax = sns.lineplot(data=df, x=x_col, y=y_col, hue=hue)
    ax.set(xlabel=xlabel, ylabel=ylabel)
    # Save figure
    plt.savefig(RESULTS_IMAGE_DIRECTORY + 'line.png')

    xlabel = '# of Statements'
    ylabel = '# of Handlers'
    x_col = config.STMTS
    y_col = config.COUNT
    hue = config.MECH
    new_hue = 'abstractions'

    # df_res = df[df[config.MECH] != config.CALLBACK]
    df_res = df.copy()
    df_res.columns = df_res.columns.str.replace(config.MECH, new_hue)

    ds.save_lineplot(df_res, RESULTS_IMAGE_DIRECTORY + 'line-abstraction', x_col, y_col, new_hue, xlabel, ylabel)

    df_res = df_res[df_res[new_hue] != config.CALLBACK]
    ds.save_lineplot(df_res, RESULTS_IMAGE_DIRECTORY + 'line-rem-callback', x_col, y_col, new_hue, xlabel, ylabel)


def lineplot_line_per_count(df_raw):
    df_c = df_raw[[config.COUNT, config.LINES, config.STMTS]]
    df_g = df_c.groupby(config.STMTS, as_index=False).sum()
    df_g.to_csv(RESULTS_DIRECTORY + 'del.csv')

    print('Quartile:')
    print(df_g[config.STMTS].quantile(0.75))  # 3rd quartile
    print(df_g[config.STMTS].quantile(0.9))  # 90 percentile

    print(df_g.max())
    print(df_g[config.COUNT].sum())

    xlabel = '# Statements in handler scope'
    ylabel = '# Handlers'
    x_col = config.STMTS
    y_col = config.COUNT

    # Start a new figure
    plt.figure()
    ax = sns.lineplot(data=df_g, x=x_col, y=y_col)
    ax.set(xlabel=xlabel, ylabel=ylabel)

    ax.set_yscale('log')

    # Save figure
    plt.savefig(RESULTS_IMAGE_DIRECTORY + 'line-simple-stmts.png')


def violinplot_per_mech():
    df = ds.read_percentage_mech_per_repo()

    xlabel = 'Error Handler Mechanisms'
    ylabel = 'Percentage'
    x_col = config.MECH
    y_col = config.PERC_PER_REPO

    # Start a new figure
    plt.figure()

    # Present no lines in the grid
    sns.set(style='whitegrid')

    # Create plot and set labels
    g = sns.boxplot(x=x_col, y=y_col, data=df)
    g.set(xlabel=xlabel, ylabel=ylabel)

    # Rescale y-axis to log function
    # g.set_yscale('log')

    # Save figure
    plt.savefig(RESULTS_IMAGE_DIRECTORY + 'violinplot.png')


if __name__ == '__main__':
    ds.create_dir_if_not_exists(RESULTS_DIRECTORY)
    ds.create_dir_if_not_exists(RESULTS_IMAGE_DIRECTORY)

    df = ds.read_dataset()
    # create_graph()

    lineplot(df)
    # lineplot_line_per_count(df)

    # violinplot_per_mech()