import pandas as pd
import statistics.src.processing.process as ds
import statistics.src.constants as constants


pd.set_option('display.max_rows', 500)
pd.set_option('display.max_columns', 500)


RESULTS_DIRECTORY = 'data/'
RESULTS_DIRECTORY_IMAGES = 'images/'


def pre_processing_data():
    df = ds.read_dataset()
    strategies_dataset = ds.get_all_strategies(df)
    df_g = pd.DataFrame()
    df_g[constants.MECH] = df[constants.MECH]
    df_g[constants.STRATEGY] = pd.Series(data=strategies_dataset)
    df_g = df_g.loc[:, ~df_g.columns.str.contains('^Unnamed')]
    df_g[constants.COUNT] = 1
    df_g = df_g.replace('', constants.OTHERS)

    df_result = df_g.groupby([constants.MECH, constants.STRATEGY], as_index=False).sum()
    df_result.to_csv(RESULTS_DIRECTORY + 'data.csv', index=False)


def handle_mech_strategies(df, filename):
    df_copy = df.copy()
    total_c = df[constants.COUNT].sum()

    # Remove number of no usage error parameter of Other strategy
    no_usage_number = df_copy.loc[df_copy[constants.STRATEGY] == constants.NO_USAGE_OF_ERROR_ARG][constants.COUNT].values[0]
    others = df_copy.loc[df_copy[constants.STRATEGY] == constants.OTHERS][constants.COUNT].values[0]
    # df_copy = df_copy.loc[df_copy[constants.STRATEGY] == constants.OTHERS]
    df_copy.loc[df_copy[constants.STRATEGY] == constants.OTHERS, [constants.COUNT]] = others - no_usage_number

    df_copy[constants.PERC] = (df_copy[constants.COUNT] / total_c) * 100
    df_copy = df_copy.sort_values(by=constants.PERC, ascending=False)

    # Save the percentages which strategy has more than 1%
    # df_copy = df_copy[df_copy[constants.PERC] > 1]

    df_copy.loc[df_copy[constants.STRATEGY] == 'others', constants.STRATEGY] = 'Others'
    df_copy.loc[df_copy[constants.STRATEGY] == 'noUsageOfErrorArg', constants.STRATEGY] = 'Ignore arg'
    df_copy.loc[df_copy[constants.STRATEGY] == 'empty', constants.STRATEGY] = 'Empty'
    df_copy.loc[df_copy[constants.STRATEGY] == 'reassigningError', constants.STRATEGY] = 'Reassign error'
    df_copy.loc[df_copy[constants.STRATEGY] == 'rethrow', constants.STRATEGY] = 'Re-throw'
    df_copy.loc[df_copy[constants.STRATEGY] == 'noUsageOfErrorArg,returnLiteral', constants.STRATEGY] = \
        'Ignore arg, Return literal'
    df_copy.loc[df_copy[constants.STRATEGY] == 'reassigningError,break', constants.STRATEGY] = 'Reassign error, Break'

    df_copy.to_csv(RESULTS_DIRECTORY + filename + '2.csv', index=False)

    print(df_copy[constants.PERC].sum())


if __name__ == '__main__':
    # preprocessing_data()

    ds.create_dir_if_not_exists(RESULTS_DIRECTORY)
    df = pd.read_csv(RESULTS_DIRECTORY + 'data.csv')

    df_mech = df[df[constants.MECH] == constants.CALLBACK]
    handle_mech_strategies(df_mech, 'df_callback')

    df_mech = df[df[constants.MECH] == constants.TRY_CATCH]
    handle_mech_strategies(df_mech, 'df_try_catch')

    df_mech = df[df[constants.MECH] == constants.EVENT]
    handle_mech_strategies(df_mech, 'df_event')

    df_mech = df[df[constants.MECH] == constants.PROMISE]
    handle_mech_strategies(df_mech, 'df_promise')

    df_mech = df[df[constants.MECH] == constants.ASYNC_AWAIT]
    handle_mech_strategies(df_mech, 'df_async_await')

    df_mech = df.groupby(constants.STRATEGY, as_index=False).sum()
    handle_mech_strategies(df_mech, 'overall')
