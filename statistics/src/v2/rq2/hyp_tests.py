import pandas as pd
import math
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


def test(serie_one, serie_two):
    row = {}
    row_err = {}
    try:
        normality = test_normality(serie_one) and test_normality(serie_two)
        same_variance = variance(serie_one, serie_two, normality)

        if normality or (len(serie_one) < 20 and len(serie_two) < 20):
            k, p = stats.ttest_ind(serie_one, serie_two, equal_var=same_variance)
            p_value = p / 2  # get half of p-value for one-tailed test
            row['hypothesis_test'] = 'ttest_ind'
            row_err['hypothesis_test'] = 'ttest_ind'
        else:
            k, p = stats.mannwhitneyu(serie_one, serie_two)  # performs one tailed test by default
            row['hypothesis_test'] = 'mannwhitneyu'
            row_err['hypothesis_test'] = 'mannwhitneyu'
            p_value = p
        row['statistic'] = k
        row['p_value'] = p_value
        row_err['statistic'] = k
        row_err['p_value'] = p_value

        if p_value <= 0.05:
            summary_client = stats.describe(serie_one)
            summary_server = stats.describe(serie_two)

            # Number of observations
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
            row_err['err'] = 'Inconclusive under 5% confidence'

    except Exception as err:
        row_err['err'] = err

    if 'err' in row_err:
        return row_err
    else:
        return row


def run_test(sample, strategy, remove_zeroes):

    df_sample = sample[sample[config.STRATEGY] == strategy]

    if remove_zeroes:
        df_sample = sample[sample[config.COUNT] > 0]

    df_client = df_sample[df_sample[config.TYPE] == config.CLIENT]
    df_server = df_sample[df_sample[config.TYPE] == config.SERVER]

    serie_sample_one = df_client[config.COUNT].tolist()
    serie_sample_two = df_server[config.COUNT].tolist()

    return test(serie_sample_one, serie_sample_two)


def run_tests_for_mech(mech, sample, rows, rows_err):
    strategies = sample[config.STRATEGY].unique().tolist()
    for strategy in strategies:
        result = run_test(sample, strategy, False)

        result[config.MECH] = mech
        result[config.STRATEGY] = strategy
        rows.append(result)


def reorder_df(df, columns):
    df_remaining_cols = df.drop(columns, axis=1)
    df_result = df[columns]
    return pd.concat([df_result, df_remaining_cols], axis=1)


def z_number(n1, n2, u):
    f1 = u - ((n1*n2)/2)
    f2 = ((n1*n2)*(n1+n2+1))/12
    return f1/math.sqrt(f2)


if __name__ == '__main__':
    print(z_number(278, 185, -5.512292901993932))
    print(z_number(408, 146, -4.743895228835058))
    print(z_number(16, 28, 130.5))
    print(z_number(117, 54, -3.0168082958294753))
    print(z_number(14, 16, 2.1715100703236643))
    print(z_number(358, 286, 1.9722765521747598))
    print(z_number(15, 43, -1.89219872049889))
    print(z_number(339, 87, -1.7740693322104844))
    print(z_number(132, 28, 2.0120263138968437))
    print(z_number(67, 124, 1.8386219458722493))


if __name__ == '__main__':
    df = pd.read_csv(RESULTS_DATA_DIR + 'data-repo.csv')

    rows = []
    rows_err = []
    sample = df[df[config.MECH] == config.TRY_CATCH]
    run_tests_for_mech(config.TRY_CATCH, sample, rows, rows_err)

    sample = df[df[config.MECH] == config.CALLBACK]
    run_tests_for_mech(config.CALLBACK, sample, rows, rows_err)

    sample = df[df[config.MECH] == config.EVENT]
    run_tests_for_mech(config.EVENT, sample, rows, rows_err)

    sample = df[df[config.MECH] == config.PROMISE]
    run_tests_for_mech(config.PROMISE, sample, rows, rows_err)

    sample = df[df[config.MECH] == config.ASYNC_AWAIT]
    run_tests_for_mech(config.ASYNC_AWAIT, sample, rows, rows_err)

    df = pd.DataFrame(rows)
    in_front_columns = [config.MECH, config.STRATEGY, 'p_value', 'statistic', 'mean_client', 'mean_server']
    df_res = reorder_df(df, in_front_columns)
    df_res.to_csv(RESULTS_DIR + 'repo-result.csv')

    df_err = pd.DataFrame(rows_err)
    in_front_columns = [config.MECH, config.STRATEGY]
    df_res = reorder_df(df_err, in_front_columns)
    df_res.to_csv(RESULTS_DIR + 'repo-result-err.csv')