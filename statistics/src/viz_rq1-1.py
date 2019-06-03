import statistics.src.seaborn.dataset_seaborn as gg
import statistics.src.constants as config
import statistics.src.stats.outliers as out


def get_general_info(df):
    df_g = df[[config.MECH, config.FILE, config.LINES, config.STMTS, config.COUNT]]
    df_group = df_g.groupby([config.MECH], as_index=False).sum()
    df_group.to_csv('agg_er.csv')


def barplot(df):
    df_grouped = df.groupby(config.MECH, as_index=False).sum()
    gg.save_barplot(df_grouped, 'barplot.png', config.MECH, config.COUNT, True)


def scatterplot(df):

    df_g = df[[config.MECH, config.FILE, config.LINES, config.STMTS, config.COUNT]]

    df_grouped = df_g.groupby([config.MECH, config.FILE], as_index=False).sum()
    df_grouped = out.remove_outlier_mean_std_method(df_grouped, 'count')

    gg.save_scatterplot(df_grouped, config.MECH, config.COUNT)


def boxplot(df):

    df = df[[config.MECH, config.FILE, config.LINES, config.STMTS, config.COUNT]]

    directory = 'boxplot/'
    gg.create_dir_if_not_exists(directory)

    xlabel = 'Abstractions'
    ylabel = '# Handlers (log scale)'
    x_col = config.MECH
    y_col = config.COUNT

    df_grouped = df.groupby([config.MECH, config.FILE], as_index=False).sum()
    df_removed_outliers = out.remove_outlier_mean_std_method(df_grouped, config.LINES)

    gg.save_boxplot(df_grouped, directory + 'boxplot.png', x_col, y_col, xlabel, ylabel)
    gg.save_boxplot(df_removed_outliers, directory + 'boxplot-without-outliers.png', x_col, y_col, xlabel, ylabel)


def lineplot(df_raw):

    directory = 'lineplot/'
    gg.create_dir_if_not_exists(directory)

    df_c = df_raw[[config.MECH, config.COUNT, config.TYPE, config.LINES, config.FILE, config.STMTS]]
    df = df_c.groupby([config.MECH, config.STMTS], as_index=False).sum()

    df = df[df[config.MECH] != config.WINDOW_EVENT_LISTENER]
    df = df[df[config.MECH] != config.WINDOW_ON_ERROR]
    # df = df[df['mech'] != config.CALLBACK]

    xlabel = '# of Statements'
    ylabel = '# of Handlers'
    x_col = config.STMTS
    y_col = config.COUNT
    hue = config.MECH
    dir_name = directory + '{}.png'

    gg.save_lineplot(df, directory + 'line.png', x_col, y_col, hue, xlabel, ylabel)

    xlabel = '# of Statements'
    ylabel = '# of Handlers'
    x_col = config.STMTS
    y_col = config.COUNT
    hue = config.MECH

    df_c = df[df[config.MECH] != config.CALLBACK]
    gg.save_lineplot(df_c, dir_name.format('line-rem-callback'), x_col, y_col, hue, xlabel, ylabel)

    df_mech = df[df['mech'] == config.PROMISE]
    gg.save_lineplot(df_mech, directory + 'line-promise.png', x_col, y_col, hue, xlabel, ylabel)

    df_mech = df[df['mech'] == config.EVENT]
    gg.save_lineplot(df_mech, directory + 'line-event.png', x_col, y_col, hue, xlabel, ylabel)

    df_mech = df[df['mech'] == config.TRY_CATCH]
    gg.save_lineplot(df_mech, directory + 'line-try-catch.png', x_col, y_col, hue, xlabel, ylabel)

    df_mech = df[df['mech'] == config.CALLBACK]
    gg.save_lineplot(df_mech, directory + 'line-callback.png', x_col, y_col, hue, xlabel, ylabel)

    df_mech = df[df['mech'] == config.ASYNC_AWAIT]
    gg.save_lineplot(df_mech, directory + 'line-async-await.png', x_col, y_col, hue, xlabel, ylabel)


def main():
    df = gg.read_dataset()
    # get_general_info(df)
    # barplot(df)
    # scatterplot(df)
    lineplot(df)


main()