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
    df = df_g[(df_g[config.MECH] == mech)]
    # & (df_g[config.TYPE] == 'client')
    df.sort_values(by=['perc'], inplace=True)
    df.repo = pd.Categorical(df.repo)
    return df


def create_graph():
    directory = RESULTS_DIRECTORY + 'barplot/'
    ds.create_dir_if_not_exists(directory)

    df = get_data(config.TRY_CATCH, '')
    df_a = get_data(config.ASYNC_AWAIT, '')
    fig, ax = plt.subplots(1, 2)
    save_barplot(df, config.TRY_CATCH, config.REPO, 'perc', False, ax[0])
    save_barplot(df_a, config.ASYNC_AWAIT, config.REPO, 'perc', False, ax[1])

    fig.show()
    fig.savefig(directory + 'output.png')

    df = get_data(config.CALLBACK, '')
    df_e = get_data(config.EVENT, '')
    df_p = get_data(config.PROMISE, '')
    fig, ax = plt.subplots(1, 3)

    save_barplot(df, config.CALLBACK, config.REPO, 'perc', False, ax[0])
    save_barplot(df_e, config.EVENT, config.REPO, 'perc', False, ax[1])
    save_barplot(df_p, config.PROMISE, config.REPO, 'perc', False, ax[2])

    fig.show()
    fig.savefig(directory + 'output2.png')


def main():
    ds.create_dir_if_not_exists(RESULTS_DIRECTORY)

    df = ds.read_dataset()
    amount_code(df)
    create_graph()


main()
# df = ds.read_percentage_mech_per_repo()
# weighted_average(df, [config.PROMISE, config.EVENT, config.CALLBACK, config.TRY_CATCH, config.ASYNC_AWAIT])