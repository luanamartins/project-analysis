import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt
import statistics.src.processing.process as ds
import statistics.src.constants as constants
import statistics.src.data_viz.graphs as graphs


RESULTS_BASE_DIR = constants.STATS_SRC_PATH + 'v2/rq1-1/'
RESULTS_DIRECTORY = RESULTS_BASE_DIR + 'data/'
RESULTS_IMAGE_DIRECTORY = RESULTS_BASE_DIR + 'images/'


def save_barplot(data, x_label, x, y, log, ax):
    plt.figure()

    order_repo = data[constants.REPO].tolist()
    ax = sns.barplot(x=x, y=y, data=data, palette='Greys_d', order=order_repo, ax=ax)
    ax.set_xticklabels([])

    if log:
        ax.set_yscale('log')
    ax.set_ylim(0, 1)
    ax.set(xlabel=x_label, ylabel='Ratio')


def get_data(mech, type):
    df_g = pd.read_csv(constants.RESULT + 'percentage_mech_per_repo.csv')
    df = df_g[(df_g[constants.MECH] == mech)] # & (df_g[config.TYPE] == 'client')
    df.sort_values(by=[constants.PERC_PER_REPO], inplace=True)
    df.repo = pd.Categorical(df.repo)
    return df


def create_graph():
    list_dataframes = []
    for mech in constants.MECHS:
        list_dataframes.append(get_data(mech, ''))

    ds.create_dir_if_not_exists(RESULTS_IMAGE_DIRECTORY)
    filename = RESULTS_IMAGE_DIRECTORY + 'output.png'
    graphs.save_multiple_barplot(filename, list_dataframes, constants.MECHS, constants.REPO, constants.PERC_PER_REPO)


def lineplot(df_raw):
    df_c = df_raw[[constants.MECH, constants.COUNT, constants.TYPE, constants.LINES, constants.FILE, constants.STMTS]]
    df = df_c.groupby([constants.MECH, constants.STMTS], as_index=False).sum()
    df.to_csv(RESULTS_DIRECTORY + 'result-rq1-1.csv')

    df = df[df[constants.MECH] != constants.WINDOW_EVENT_LISTENER]
    df = df[df[constants.MECH] != constants.WINDOW_ON_ERROR]

    x_label = '# of Statements'
    y_label = '# of Handlers'
    x_col = constants.STMTS
    y_col = constants.COUNT
    hue = constants.MECH

    image_path = RESULTS_IMAGE_DIRECTORY + 'line.png'
    graphs.save_lineplot(df, image_path, x_col, y_col, x_label, y_label, False)

    xlabel = '# of Statements'
    ylabel = '# of Handlers'
    x_col = constants.STMTS
    y_col = constants.COUNT
    hue = constants.MECH
    new_hue = 'abstractions'

    df_res = df.copy()
    df_res.columns = df_res.columns.str.replace(constants.MECH, new_hue)
    graphs.save_lineplot(df_res, RESULTS_IMAGE_DIRECTORY + 'line-abstraction', x_col, y_col, new_hue, xlabel, ylabel, False)

    df_res = df_res[df_res[new_hue] != constants.CALLBACK]
    graphs.save_lineplot(df_res, RESULTS_IMAGE_DIRECTORY + 'line-rem-callback', x_col, y_col, new_hue,
                     xlabel, ylabel, False)


def lineplot_line_per_count(df_raw):
    df_c = df_raw[[constants.COUNT, constants.LINES, constants.STMTS]]
    df_g = df_c.groupby(constants.STMTS, as_index=False).sum()
    df_g.to_csv(RESULTS_DIRECTORY + 'del.csv')

    print('Quartile:')
    print(df_g[constants.STMTS].quantile(0.75))  # 3rd quartile
    print(df_g[constants.STMTS].quantile(0.9))  # 90 percentile

    print(df_g.max())
    print(df_g[constants.COUNT].sum())

    x_label = '# Statements in handler scope'
    y_label = '# Handlers'
    x_col = constants.STMTS
    y_col = constants.COUNT

    image_path = RESULTS_IMAGE_DIRECTORY + 'line-simple-stmts.png'
    graphs.save_lineplot(df_g, image_path, x_col, y_col, x_label, y_label)


def violinplot_per_mech():
    df = ds.read_percentage_mech_per_repo()

    xlabel = 'Error Handler Mechanisms'
    ylabel = 'Percentage'
    x_col = constants.MECH
    y_col = constants.PERC_PER_REPO

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
    lineplot_line_per_count(df)

    violinplot_per_mech()
