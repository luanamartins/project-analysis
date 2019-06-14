import numpy as np
import pandas as pd
import scipy.stats as stats
import statistics.src.constants as constants
# from statsmodels.stats.proportion import proportions_ztest, proportion_confint

RESULTS_BASE_DIR = constants.STATS_SRC_PATH + 'v2/rq1-1/'
RESULTS_DIRECTORY = RESULTS_BASE_DIR + 'data/'


def get_data(sample, mech, metric):
    stat_results = stats.ttest_1samp(sample, 0.5)
    return {
        constants.MECH: mech,
        constants.METRIC: metric,
        constants.STATS_TEST: 'ttest_1samp',
        constants.STATISTICS: stat_results[0],
        constants.P_VALUE: stat_results[1],
    }


if __name__ == '__main__':
    df = pd.read_csv(RESULTS_DIRECTORY + 'output.csv')
    np.random.seed(7654567)  # fix seed to get the same result

    mechs = [constants.PROMISE, constants.EVENT, constants.CALLBACK, constants.TRY_CATCH]

    rows = []
    for mech in mechs:
        array_proportion = df[df[constants.MECH] == mech]
        proportion_lines = array_proportion[constants.LINES] / array_proportion[constants.COUNT]
        proportion_stmts = array_proportion[constants.STMTS] / array_proportion[constants.COUNT]
        print(mech)
        rows.append(get_data(proportion_lines, mech, constants.FILES))
        rows.append(get_data(proportion_stmts, mech, constants.STMTS))
    df = pd.DataFrame(rows)
    df.to_csv('results.csv', index=False)
