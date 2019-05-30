import numpy as np
import pandas as pd
import scipy.stats as stats
import statistics.src.config as config
from statsmodels.stats.proportion import proportions_ztest, proportion_confint



RESULTS_BASE_DIR = config.STATS_SRC_PATH + 'v2/rq1-1/'
RESULTS_DIRECTORY = RESULTS_BASE_DIR + 'data/'

df = pd.read_csv(RESULTS_DIRECTORY + 'output.csv')
np.random.seed(7654567)  # fix seed to get the same result

mechs = [config.PROMISE, config.EVENT, config.CALLBACK, config.TRY_CATCH]

for mech in mechs:
    array_proportion = df[df[config.MECH] == mech]
    proportion_lines = array_proportion['lines']/array_proportion['count']
    proportion_stmts = array_proportion['stmts'] / array_proportion['count']
    print(mech)
    print(stats.ttest_1samp(proportion_lines, 0.5))
    print(stats.ttest_1samp(proportion_stmts, 0.5))


# promise
# Ttest_1sampResult(statistic=14.007305611180632, pvalue=3.1298773805030677e-23)
# Ttest_1sampResult(statistic=19.12180815311755, pvalue=1.428716329094572e-31)

# event
# Ttest_1sampResult(statistic=5.709263758799531, pvalue=1.5100822547133923e-07)
# Ttest_1sampResult(statistic=10.550829647300493, pvalue=2.6805004970455505e-17)

# callback
# Ttest_1sampResult(statistic=9.828340937163498, pvalue=2.8312627156839996e-18)
# Ttest_1sampResult(statistic=14.195271331711268, pvalue=1.650579975580141e-30)

# try-catch
# Ttest_1sampResult(statistic=13.268877734693168, pvalue=1.991196365911497e-27)
# Ttest_1sampResult(statistic=15.372717619055404, pvalue=4.0053969775528164e-33)
