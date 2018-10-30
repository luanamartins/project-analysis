import pandas as pd
import scipy.stats as stats
import statistics.src.config as config


RESULTS_DATA_DIR = config.STATS_SRC_PATH + 'v2/rq2/data/'
RESULTS_DIR = config.STATS_SRC_PATH + 'v2/rq2/tests/'


def test_normality(x):
    k2, p = stats.normaltest(x)
    # alpha = 1e-3
    alpha = 0.05 # null hypothesis: x comes from a normal distribution
    return p < alpha
    # True -> The null hypothesis can be rejected
    # False -> The null hypothesis cannot be rejected


def variance(x, y, normal_dist):
    # alpha = 1e-3
    alpha = 0.05
    if normal_dist:
        k, p = stats.bartlett(x, y)
        return p < alpha
    else:
        k, p = stats.levene(x, y, center='mean')
        return p < alpha


# def calc_factor(file):
#     sample = pd.read_csv(file, sep=',').fillna(0)
#     df = sample.drop('repo', axis=1)
#     kloc = df['numberOfLogicalLines'].sum()
#     return 1000 / kloc


def run_test(sample, strategy, remove_zeroes):

    row = {}
    try:
        df_sample = sample[sample[config.STRATEGY] == strategy]

        if remove_zeroes:
            df_sample = sample[sample[config.COUNT] > 0]

        df_client = df_sample[df_sample[config.TYPE] == config.CLIENT]
        df_server = df_sample[df_sample[config.TYPE] == config.SERVER]

        serie_sample_one = df_client[config.COUNT].tolist()
        serie_sample_two = df_server[config.COUNT].tolist()

        normality = test_normality(serie_sample_one) and test_normality(serie_sample_two)
        same_variance = variance(serie_sample_one, serie_sample_two, normality)

        if normality:
            k, p = stats.ttest_ind(serie_sample_one, serie_sample_two, equal_var=same_variance)
            p_value = p/2 # get half of p-value for one-tailed test
            row['hypothesis_test'] = 'ttest_ind'
        else:
            k, p = stats.mannwhitneyu(serie_sample_one, serie_sample_two) # performs one tailed test by default
            row['hypothesis_test'] = 'mannwhitneyu'
            p_value = p
        row['statistic'] = k
        row['p_value'] = p

        if p_value <= 0.05:
            summary_client = stats.describe(serie_sample_one)
            summary_server = stats.describe(serie_sample_two)

            row['nobs_client'] = summary_client.nobs
            row['nobs_server'] = summary_server.nobs

            tuple_min_max_client = summary_client.minmax
            tuple_min_max_server = summary_server.minmax
            row['min_client'] = tuple_min_max_client[0]
            row['min_server'] = tuple_min_max_server[0]
            row['max_client'] = tuple_min_max_client[1]
            row['max_server'] = tuple_min_max_server[1]

            row['mean_client'] = summary_client.mean
            row['mean_server'] = summary_server.mean

            row['variance_client'] = summary_client.variance
            row['variance_server'] = summary_server.variance

            row['skewness_client'] = summary_client.skewness
            row['skewness_server'] = summary_server.skewness

            row['kurtosis_client'] = summary_client.kurtosis
            row['kurtosis_server'] = summary_server.kurtosis
        else:
            row['err'] = 'Inconclusive under 5% confidence'

    except Exception as err:
        row['err'] = err

    return row


def run_tests_for_mech(mech, sample, rows):
    strategies = sample[config.STRATEGY].unique().tolist()
    for strategy in strategies:
        row = run_test(sample, strategy, False)
        row[config.MECH] = mech
        row[config.STRATEGY] = strategy
        rows.append(row)


def reorder_df(df, columns):
    df_remaining_cols = df.drop(columns, axis=1)
    df_result = df[columns]
    return pd.concat([df_result, df_remaining_cols], axis=1)


if __name__ == '__main__':

    df = pd.read_csv(RESULTS_DATA_DIR + 'data-file.csv')

    rows = []
    sample = df[df[config.MECH] == config.TRY_CATCH]
    run_tests_for_mech(config.TRY_CATCH, sample, rows)

    sample = df[df[config.MECH] == config.CALLBACK]
    run_tests_for_mech(config.CALLBACK, sample, rows)

    sample = df[df[config.MECH] == config.EVENT]
    run_tests_for_mech(config.EVENT, sample, rows)

    sample = df[df[config.MECH] == config.PROMISE]
    run_tests_for_mech(config.PROMISE, sample, rows)

    sample = df[df[config.MECH] == config.ASYNC_AWAIT]
    run_tests_for_mech(config.ASYNC_AWAIT, sample, rows)

    df = pd.DataFrame(rows)
    in_front_columns = [config.MECH, config.STRATEGY, 'p_value', 'statistic', 'mean_client', 'mean_server']
    df_res = reorder_df(df, in_front_columns)
    df_res.to_csv(RESULTS_DIR + 'result.csv')
