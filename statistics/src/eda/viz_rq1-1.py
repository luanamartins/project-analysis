import statistics.src.data_viz.graphs as graphs
import statistics.src.seaborn.dataset_seaborn as gg
import statistics.src.constants as constants
import statistics.src.stats.outliers as out


def get_general_info(df):
    df_g = df[[constants.MECH, constants.FILE, constants.LINES, constants.STMTS, constants.COUNT]]
    df_group = df_g.groupby([constants.MECH], as_index=False).sum()
    df_group.to_csv('agg_er.csv')


def barplot(df):
    df_grouped = df.groupby(constants.MECH, as_index=False).sum()
    graphs.save_barplot(df_grouped, 'barplot.png', constants.MECH, constants.COUNT, True)


def scatterplot(df):
    df_g = df[[constants.MECH, constants.FILE, constants.LINES, constants.STMTS, constants.COUNT]]
    df_grouped = df_g.groupby([constants.MECH, constants.FILE], as_index=False).sum()
    df_grouped = out.remove_outlier_mean_std_method(df_grouped, 'count')

    graphs.save_scatterplot(df_grouped, constants.MECH, constants.COUNT)


def boxplot(df):

    df = df[[constants.MECH, constants.FILE, constants.LINES, constants.STMTS, constants.COUNT]]

    directory = 'boxplot/'
    gg.create_dir_if_not_exists(directory)

    x_label = 'Abstractions'
    y_label = '# Handlers (log scale)'
    x_col = constants.MECH
    y_col = constants.COUNT

    df_grouped = df.groupby([constants.MECH, constants.FILE], as_index=False).sum()
    df_removed_outliers = out.remove_outlier_mean_std_method(df_grouped, constants.LINES)

    graphs.save_boxplot(df_grouped, directory + 'boxplot.png', x_col, y_col, x_label, y_label)
    graphs.save_boxplot(df_removed_outliers, directory + 'boxplot-without-outliers.png', x_col, y_col, x_label, y_label)


def lineplot(df_raw):

    directory = 'lineplot/'
    gg.create_dir_if_not_exists(directory)

    df_c = df_raw[[constants.MECH, constants.COUNT, constants.TYPE, constants.LINES, constants.FILE, constants.STMTS]]
    df = df_c.groupby([constants.MECH, constants.STMTS], as_index=False).sum()

    df = df[df[constants.MECH] != constants.WINDOW_EVENT_LISTENER]
    df = df[df[constants.MECH] != constants.WINDOW_ON_ERROR]
    # df = df[df['mech'] != config.CALLBACK]

    xlabel = '# of Statements'
    ylabel = '# of Handlers'
    x_col = constants.STMTS
    y_col = constants.COUNT
    hue = constants.MECH

    graphs.save_lineplot(df, directory + 'line.png', x_col, y_col, hue, xlabel, ylabel)

    xlabel = '# of Statements'
    ylabel = '# of Handlers'
    x_col = constants.STMTS
    y_col = constants.COUNT
    hue = constants.MECH

    dir_name = directory + '{}.png'
    df_c = df[df[constants.MECH] != constants.CALLBACK]
    graphs.save_lineplot(df_c, dir_name.format('line-rem-callback'), x_col, y_col, hue, xlabel, ylabel)

    df_mech = df[df[constants.MECH] == constants.PROMISE]
    graphs.save_lineplot(df_mech, directory + 'line-promise.png', x_col, y_col, hue, xlabel, ylabel)

    df_mech = df[df['mech'] == constants.EVENT]
    graphs.save_lineplot(df_mech, directory + 'line-event.png', x_col, y_col, hue, xlabel, ylabel)

    df_mech = df[df['mech'] == constants.TRY_CATCH]
    graphs.save_lineplot(df_mech, directory + 'line-try-catch.png', x_col, y_col, hue, xlabel, ylabel)

    df_mech = df[df['mech'] == constants.CALLBACK]
    graphs.save_lineplot(df_mech, directory + 'line-callback.png', x_col, y_col, hue, xlabel, ylabel)

    df_mech = df[df['mech'] == constants.ASYNC_AWAIT]
    graphs.save_lineplot(df_mech, directory + 'line-async-await.png', x_col, y_col, hue, xlabel, ylabel)


if __name__ == '__main__':
    df = gg.read_dataset()
    # get_general_info(df)
    # barplot(df)
    # scatterplot(df)
    lineplot(df)
