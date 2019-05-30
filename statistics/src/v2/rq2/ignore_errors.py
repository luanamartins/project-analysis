import pandas as pd
import statistics.src.config as config
import statistics.src.v2.rq2.hyp_tests as tests

RESULTS_TESTS_DIR = config.STATS_SRC_PATH + 'v2/rq2/tests/'


# are callbacks that ignore errors more or less frequent than empty catch blocks?
def run_tests(df_all):
    df_callbacks = df_all[
        (df_all[config.MECH] == config.CALLBACK) |
        (df_all[config.MECH] == config.EVENT) |
        (df_all[config.MECH] == config.PROMISE)
        ]
    df_callbacks = df_callbacks[df_callbacks[config.STRATEGY] == config.NO_USAGE_OF_ERROR_ARG]

    print(df_callbacks[config.COUNT])

    df_catch_blocks = df_all[
        (df_all[config.MECH] == config.TRY_CATCH) |
        (df_all[config.MECH] == config.ASYNC_AWAIT)
    ]
    df_catch_blocks = df_catch_blocks[df_catch_blocks[config.STRATEGY] == config.EMPTY]
    print(df_catch_blocks[config.COUNT])

    result = tests.test(df_callbacks[config.COUNT], df_catch_blocks[config.COUNT])
    if not isinstance(result, list):
        result = [result]
    df = pd.DataFrame(result)
    df.to_csv(RESULTS_TESTS_DIR + 'ignore_errors.csv')


if __name__ == '__main__':
    all_filepath = RESULTS_TESTS_DIR + 'data-file.csv'
    df = pd.read_csv(all_filepath)
    run_tests(df)