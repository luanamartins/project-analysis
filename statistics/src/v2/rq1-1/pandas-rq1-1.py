import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt
import statistics.src.seaborn.dataset_seaborn as ds
import statistics.src.config as config


RESULTS_BASE_DIR = config.STATS_SRC_PATH + 'v2/rq1-1/'
RESULTS_DIRECTORY = RESULTS_BASE_DIR + 'data/'
RESULTS_IMAGE_DIRECTORY = RESULTS_BASE_DIR + 'images/'


def weighted_average(df, handler_mechs):

    df_total_counters = df.groupby(config.REPO, as_index=False)[config.COUNT].sum()
    df_total_counters.columns = [config.REPO, config.TOTAL_HANDLERS]
    df_total_counters.to_csv(RESULTS_DIRECTORY + 'df_total_counters.csv')

    total_handlers = df_total_counters[config.TOTAL_HANDLERS].sum()

    df_merge = df.merge(df_total_counters, on=config.REPO)
    df_merge = df_merge[[config.MECH, config.REPO, config.COUNT, config.TOTAL_HANDLERS, config.TYPE]]
    df_merge.to_csv(RESULTS_DIRECTORY + 'merge.csv')

    # Ratio n_handlers_per_mech / n_total_handlers
    # df_merge['perc_total_handlers'] = df_merge[config.TOTAL_HANDLERS] / total_handlers
    # df_merge.to_csv(RESULTS_DIRECTORY + 'merge.csv')

    new_data = []
    for handler_mech in handler_mechs:
        df_c = df_merge[df_merge[config.MECH] == handler_mech]
        df_c.to_csv(RESULTS_DIRECTORY + 'df_c-{}.csv'.format(handler_mech))

        handlers_sum = (df_c[config.COUNT] * df_c[config.TOTAL_HANDLERS]).sum()
        handler_mean = df_c[config.COUNT].sum() / df_c[config.COUNT].shape[0]

        new_data.append({
            config.MECH: handler_mech,
            config.MEAN: handler_mean,
            config.WEIGHTED_AVERAGE: handlers_sum / total_handlers
        })

    df_new = pd.DataFrame(data=new_data)
    df_new.to_csv(RESULTS_DIRECTORY + 'weighted_average2.csv')


def amount_code(df):
    df_g = df.groupby([config.MECH, config.REPO], as_index=False).sum()
    df_g = df_g[[config.MECH, config.REPO, config.COUNT, config.LINES, config.STMTS]]
    df_g.to_csv(RESULTS_DIRECTORY + 'output.csv')

    df_resume = df_g.groupby([config.MECH], as_index=False).sum()

    total_er_lines = df_resume[config.LINES].sum()
    print(total_er_lines)

    df = ds.read_repo_er_all()
    total_lines = df['total_logical_lines'].sum()
    print(total_lines)

    total_handlers = df_resume[config.COUNT].sum()
    df_resume['% handlers'] = (df_resume[config.COUNT] / total_handlers) * 100
    df_resume['%EH LoC'] = (df_resume[config.LINES] / total_er_lines) * 100
    df_resume['%LoC'] = (df_resume[config.LINES] / total_lines) * 100
    df_resume.to_csv(RESULTS_DIRECTORY + 'resume.csv')
    print(df_resume.head())


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
    directory = RESULTS_DIRECTORY + 'barplot/'
    ds.create_dir_if_not_exists(directory)

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
    fig.savefig(directory + 'output.png')


def lineplot(df_raw):
    df_c = df_raw[[config.MECH, config.COUNT, config.TYPE, config.LINES, config.FILE, config.STMTS]]
    df = df_c.groupby([config.MECH, config.FILE, config.LINES], as_index=False).sum()
    df.to_csv(RESULTS_DIRECTORY + 'result-rq1-1.csv')

    df = df[df[config.MECH] != config.WINDOW_EVENT_LISTENER]
    df = df[df[config.MECH] != config.WINDOW_ON_ERROR]

    xlabel = '# of Statements'
    ylabel = '# of Handlers'
    x_col = config.STMTS
    y_col = config.COUNT
    hue = config.MECH
    dir_name = RESULTS_DIRECTORY + '{}.png'

    # ds.save_lineplot(df, dir_name.format('line'), x_col, y_col, hue, xlabel, ylabel)
    # Start a new figure
    plt.figure()
    ax = sns.lineplot(data=df, x=x_col, y=y_col, hue=hue)
    ax.set(xlabel=xlabel, ylabel=ylabel)
    # Save figure
    plt.savefig(dir_name.format('line'))

    xlabel = '# of Statements'
    ylabel = '# of Handlers'
    x_col = config.STMTS
    y_col = config.COUNT
    hue = config.MECH

    df_c = df[df[config.MECH] != config.CALLBACK]
    ds.save_lineplot(df_c, dir_name.format('line-rem-callback'), x_col, y_col, hue, xlabel, ylabel)


def lineplot_line_per_count(df_raw):
    df_c = df_raw[[config.COUNT, config.LINES, config.STMTS]]
    df_g = df_c.groupby(config.STMTS, as_index=False).sum()
    df_g.to_csv(RESULTS_DIRECTORY + 'del.csv')

    print('Quartile:')
    print(df_g[config.STMTS].quantile(0.75)) # 3rd quartile
    print(df_g[config.STMTS].quantile(0.9)) # 90 percentile

    print(df_g.max())
    print(df_g[config.COUNT].sum())

    xlabel = '# Statements in handler scope'
    ylabel = '# Handlers'
    x_col = config.STMTS
    y_col = config.COUNT
    dir_name = RESULTS_IMAGE_DIRECTORY + '{}.png'

    # Start a new figure
    plt.figure()
    ax = sns.lineplot(data=df_g, x=x_col, y=y_col)
    ax.set(xlabel=xlabel, ylabel=ylabel)

    ax.set_yscale('log')

    # Save figure
    plt.savefig(dir_name.format('line-simple-stmts'))


def violinplot_per_mech(df):

    xlabel = 'Error Handler Mechanisms'
    ylabel = 'Percentage'
    x_col = config.MECH
    y_col = config.PERC_PER_REPO
    dir_name = RESULTS_DIRECTORY + '{}.png'

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
    plt.savefig(dir_name.format('violinplot'))


def correlation(df):
    df_g = df.groupby([config.REPO], as_index=False).sum()
    df_repo = ds.read_repo_er_all()
    df_merge = df_g.merge(df_repo, on=config.REPO)

    df_merge.to_csv('df_merge.csv')

    df_c = df_merge[[config.REPO, config.COUNT, config.LINES, config.TOTAL_LOGICAL_LINES]]
    df_c.to_csv('df_c.csv')

    print(str(df_c[config.COUNT].corr(df_c[config.LINES], method='pearson')))
    print(str(df_c[config.COUNT].corr(df_c[config.TOTAL_LOGICAL_LINES], method='pearson')))

    print(df_c[df_c[config.COUNT] > df_c[config.TOTAL_LOGICAL_LINES]])

    plt.figure()
    ax = sns.scatterplot(x=config.COUNT, y=config.TOTAL_LOGICAL_LINES, data=df_c)
    ax.set_xlim(-100, 40000)
    plt.show()


def number_of_stmts(df):
    df_sel = df[df[config.STMTS] <= 1]
    print(df.shape)
    print(df_sel.shape)
    print(df[config.STMTS].max())


if __name__ == '__main__':
    ds.create_dir_if_not_exists(RESULTS_DIRECTORY)

    df = ds.read_dataset()
    # amount_code(df)
    # create_graph()
    # number_of_stmts(df)

    # lineplot(df)
    # lineplot_line_per_count(df)

    df_perc = ds.read_percentage_mech_per_repo()
    # violinplot_per_mech(df_perc)
    weighted_average(df_perc, [config.PROMISE, config.EVENT, config.CALLBACK, config.TRY_CATCH, config.ASYNC_AWAIT])

    # correlation(df)
