import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt
import statistics.src.seaborn.dataset_seaborn as ds
import statistics.src.config as config


RESULTS_DIRECTORY = 'rq1-1/'


def weighted_average(df, handler_types):
    df_total_counters = df.groupby(config.REPO, as_index=False)[config.COUNT].sum()
    df_total_counters.columns = [config.REPO, config.TOTAL_HANDLERS]

    total_handlers = df_total_counters[config.TOTAL_HANDLERS].sum()

    df_merge = df.merge(df_total_counters, on=config.REPO)
    # Ratio n_handlers_per_mech / n_total_handlers
    df_merge['perc_total_handlers'] = df_merge[config.TOTAL_HANDLERS]/total_handlers
    df_merge.to_csv(RESULTS_DIRECTORY + 'merge.csv')

    new_data = []
    for handler_type in handler_types:
        df_c = df_merge[df_merge[config.MECH] == handler_type]
        df_c.to_csv(RESULTS_DIRECTORY + 'df_c-{}.csv'.format(handler_type))
        handlers_sum = (df_c['perc']*df_c['perc_total_handlers']).sum()
        print(handler_type + ' ' + str(handlers_sum*100))
        new_data.append({
            config.MECH: handler_type,
            config.WEIGHTED_AVERAGE: handlers_sum*100
        })

    df_new = pd.DataFrame(data=new_data)
    df_new.to_csv(RESULTS_DIRECTORY + 'weighted_average.csv')


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

    df_resume['%ER'] = (df_resume[config.LINES] / total_er_lines) * 100
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
    df.sort_values(by=['perc'], inplace=True)
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
    save_barplot(df, config.TRY_CATCH, config.REPO, 'perc', False, ax[0])
    save_barplot(df_a, config.ASYNC_AWAIT, config.REPO, 'perc', False, ax[1])
    save_barplot(df_c, config.CALLBACK, config.REPO, 'perc', False, ax[2])
    save_barplot(df_e, config.EVENT, config.REPO, 'perc', False, ax[3])
    save_barplot(df_p, config.PROMISE, config.REPO, 'perc', False, ax[4])

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

    print(df_g.max())
    print(df_g[config.COUNT].sum())

    xlabel = '# Statements in handler scope'
    ylabel = '# Handlers'
    x_col = config.STMTS
    y_col = config.COUNT
    dir_name = RESULTS_DIRECTORY + '{}.png'

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
    plt.savefig(dir_name.format('violinplot.png'))


def correl(df):
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



def main():
    ds.create_dir_if_not_exists(RESULTS_DIRECTORY)

    df = ds.read_dataset()
    # amount_code(df)
    # create_graph()

    # lineplot(df)
    # lineplot_line_per_count(df)
    #
    # df_perc = ds.read_percentage_mech_per_repo()
    # violinplot_per_mech(df_perc)

    correl(df)


main()
# df = ds.read_percentage_mech_per_repo()
# weighted_average(df, [config.PROMISE, config.EVENT, config.CALLBACK, config.TRY_CATCH, config.ASYNC_AWAIT])