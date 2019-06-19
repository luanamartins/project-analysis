import os
import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt
import statistics.src.constants as constants
import statistics.src.data_viz.graphs as gg
import statistics.src.stats.outliers as outliers


pd.set_option('display.max_columns', None)
pd.set_option('display.expand_frame_repr', False)
pd.set_option('max_colwidth', -1)


def boxplot():
    df = gg.read_dataset()

    df = df[['mech', 'file', 'lines', 'stmts', 'count']]

    directory = 'boxplot/'
    gg.create_dir_if_not_exists(directory)

    xlabel = 'Abstractions'
    ylabel = '# Handlers (log scale)'
    x_col = constants.MECH
    y_col = constants.COUNT

    df_grouped = df.groupby([constants.MECH, constants.FILE], as_index=False).sum()
    df_removed_outliers = outliers.remove_outlier_mean_std_method(df_grouped, constants.LINES)

    gg.save_boxplot(df_grouped, directory + 'boxplot.png', x_col, y_col, xlabel, ylabel)
    gg.save_boxplot(df_removed_outliers, directory + 'boxplot-without-outliers.png', x_col, y_col, xlabel, ylabel)


def violinplot(df):
    df = df[['mech', 'lines', 'stmts']]

    df_removed_outliers = outliers.remove_outliers_iqr(df, 'lines')

    directory = 'violinplot/'
    gg.create_dir_if_not_exists(directory)

    xlabel = 'Abstractions'
    ylabel = '# Handlers (log scale)'
    x_col = 'mech'
    y_col = 'lines'

    gg.save_violinplot(df, 'violinplot.png', x_col, y_col, xlabel, ylabel)
    gg.save_violinplot(df_removed_outliers, 'violinplot-without-outliers.png', x_col, y_col, xlabel, ylabel)


def violinplot_hue(df_client_raw, df_server_raw):

    df_client = df_client_raw[['mech', 'count', 'lines', 'file', 'stmts', 'type']]
    df_server = df_server_raw[['mech', 'count', 'lines', 'file', 'stmts', 'type']]

    df = pd.concat([df_client, df_server])
    df_grouped = df.groupby(['mech', 'file', 'type'], as_index=False).sum()
    df_grouped.reset_index(inplace=True)

    directory = 'violinplot/'
    gg.create_dir_if_not_exists(directory)

    xlabel = 'Abstractions'
    ylabel = '# Handlers (log scale)'
    x_col = constants.MECH
    y_col = constants.COUNT
    hue = constants.TYPE

    gg.save_violinplot_hue(df_grouped, directory + 'violinplot-classes.png', x_col, y_col, xlabel, ylabel, hue)

    df_raw = pd.concat([df_client_raw, df_server_raw])
    df_empty = df_raw[df_raw['empty'] == True]
    df_empty_grouped = df_empty.groupby(['mech', 'file', 'type'], as_index=False).sum()
    gg.save_violinplot_hue(df_empty_grouped, directory + 'violinplot-classes-empty.png', x_col, y_col, xlabel, ylabel, hue)


def lineplot(df_raw):
    directory = 'lineplot/'
    if not os.path.exists(directory):
        os.makedirs(directory)

    df_c = df_raw[[constants.MECH, constants.COUNT, constants.TYPE, constants.LINES, constants.FILE, constants.STMTS]]
    df = df_c.groupby([constants.MECH, constants.FILE, constants.STMTS], as_index=False).sum()

    df = df[df[constants.MECH] != constants.WINDOW_EVENT_LISTENER]
    df = df[df[constants.MECH] != constants.WINDOW_ON_ERROR]
    # df = df[df['mech'] != config.CALLBACK]

    xlabel = '# of Statements'
    ylabel = '# of Handlers'
    x_col = constants.STMTS
    y_col = constants.COUNT
    hue = constants.MECH
    dir_name = directory + '{}.png'

    gg.save_lineplot(df, directory + 'line.png', x_col, y_col, hue, xlabel, ylabel)

    xlabel = '# of Statements'
    ylabel = '# of Handlers'
    x_col = constants.STMTS
    y_col = constants.COUNT
    hue = constants.MECH

    df_c = df[df[constants.MECH] != constants.CALLBACK]
    gg.save_lineplot(df_c, dir_name.format('line-rem-callback'), x_col, y_col, hue, xlabel, ylabel)

    df_mech = df[df['mech'] == constants.PROMISE]
    gg.save_lineplot(df_mech, directory + 'line-promise.png', x_col, y_col, hue, xlabel, ylabel)

    df_mech = df[df['mech'] == constants.EVENT]
    gg.save_lineplot(df_mech, directory + 'line-event.png', x_col, y_col, hue, xlabel, ylabel)

    df_mech = df[df['mech'] == constants.TRY_CATCH]
    gg.save_lineplot(df_mech, directory + 'line-try-catch.png', x_col, y_col, hue, xlabel, ylabel)

    df_mech = df[df['mech'] == constants.CALLBACK]
    gg.save_lineplot(df_mech, directory + 'line-callback.png', x_col, y_col, hue, xlabel, ylabel)

    df_mech = df[df['mech'] == constants.ASYNC_AWAIT]
    gg.save_lineplot(df_mech, directory + 'line-async-await.png', x_col, y_col, hue, xlabel, ylabel)


def explore_data():
    data = gg.read_dataset()
    data['count'] = 1
    data = data[['mech', 'count', 'lines', 'file', 'stmts']]

    df = data.groupby('mech').count()
    df.to_csv('output2.csv')


def get_mech_data(df, filepath):

    df_data = df[['mech', 'count', 'lines']]
    df_grouped = df_data.groupby(['mech']).sum()
    df_grouped.reset_index(inplace=True)

    df_grouped.to_csv(filepath)


def create_scatterplot(df):
    df_g = df[['mech', 'count', 'lines', 'file', 'stmts']]
    df_g = df_g.groupby(['mech', 'file']).sum()
    df_g.reset_index(inplace=True)

    df_grouped = outliers.remove_outlier_mean_std_method(df_g, 'count')

    sns.catplot(data=df_grouped, x='mech', y='count')

    directory = 'scatterplot/'
    gg.create_dir_if_not_exists(directory)

    plt.savefig(directory + 'scatterplot.png')


def get_general_info(df):
    df_g = df[['mech', 'count', 'lines', 'stmts']]
    df_group = df_g.groupby([constants.MECH]).sum()
    df_group.to_csv('agg_er.csv')


# df_client = read_data('client')
# df_server = read_data('server')

# df_client_emp = df_client[df_client['empty'] == True]
# df_client_gr = df_client_emp.groupby(['mech', 'empty']).sum()
# print(df_client_gr.shape)
# print(df_client_gr.head())

# df_server_emp = df_server[df_server['empty'] == True]
# df_server_gr = df_server_emp.groupby(['mech', 'empty']).sum()

# df_client = read_data('client')
# df_server = read_data('server')
# violinplot_hue(df_client, df_server)

# df = pd.concat([df_client, df_server])
# barplot(df)


# lineplot(df)
