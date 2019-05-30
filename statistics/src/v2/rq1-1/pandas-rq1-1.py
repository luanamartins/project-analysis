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


def resume(df):
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


def correlation(df):
    df_g = df.groupby([config.REPO], as_index=False).sum()
    df_repo = ds.read_repo_er_all()
    df_merge = df_g.merge(df_repo, on=config.REPO)

    df_merge.to_csv(RESULTS_DIRECTORY + 'df_merge.csv')

    df_c = df_merge[[config.REPO, config.COUNT, config.LINES, config.TOTAL_LOGICAL_LINES]]
    df_c.to_csv(RESULTS_DIRECTORY + 'df_c.csv')

    print(str(df_c[config.COUNT].corr(df_c[config.LINES], method='pearson')))
    print(str(df_c[config.COUNT].corr(df_c[config.TOTAL_LOGICAL_LINES], method='pearson')))

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
    resume(df)
    # number_of_stmts(df)

    correlation(df)
