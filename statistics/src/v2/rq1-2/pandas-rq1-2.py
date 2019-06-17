import pandas as pd
import statistics.src.processing.process ds
import statistics.src.constants as config


pd.set_option('display.max_rows', 500)
pd.set_option('display.max_columns', 500)


RESULTS_DIRECTORY = 'data/'
RESULTS_DIRECTORY_IMAGES = 'images/'


def pre_processing_data():
    df = ds.read_dataset()
    strategies_dataset = ds.get_all_strategies(df)
    df_g = pd.DataFrame()
    df_g[config.MECH] = df[config.MECH]
    df_g[config.STRATEGY] = pd.Series(data=strategies_dataset)
    df_g = df_g.loc[:, ~df_g.columns.str.contains('^Unnamed')]
    df_g[config.COUNT] = 1
    df_g = df_g.replace('', config.OTHERS)

    df_result = df_g.groupby([config.MECH, config.STRATEGY], as_index=False).sum()
    df_result.to_csv(RESULTS_DIRECTORY + 'data.csv', index=False)


def handle_mech_strategies(df, filename):
    df_copy = df.copy()
    total_c = df[config.COUNT].sum()

    # Remove number of no usage error parameter of Other strategy
    no_usage_number = df_copy.loc[df_copy[config.STRATEGY] == config.NO_USAGE_OF_ERROR_ARG][config.COUNT].values[0]
    others = df_copy.loc[df_copy[config.STRATEGY] == config.OTHERS][config.COUNT].values[0]
    # df_copy = df_copy.loc[df_copy[config.STRATEGY] == config.OTHERS]
    df_copy.loc[df_copy[config.STRATEGY] == config.OTHERS, [config.COUNT]] = others - no_usage_number

    df_copy[config.PERC] = (df_copy[config.COUNT] / total_c) * 100
    df_copy = df_copy.sort_values(by=config.PERC, ascending=False)

    # Save the percentages which strategy has more than 1%
    # df_copy = df_copy[df_copy[config.PERC] > 1]

    df_copy.loc[df_copy[config.STRATEGY] == 'others', config.STRATEGY] = 'Others'
    df_copy.loc[df_copy[config.STRATEGY] == 'noUsageOfErrorArg', config.STRATEGY] = 'Ignore arg'
    df_copy.loc[df_copy[config.STRATEGY] == 'empty', config.STRATEGY] = 'Empty'
    df_copy.loc[df_copy[config.STRATEGY] == 'reassigningError', config.STRATEGY] = 'Reassign error'
    df_copy.loc[df_copy[config.STRATEGY] == 'rethrow', config.STRATEGY] = 'Re-throw'
    df_copy.loc[df_copy[config.STRATEGY] == 'noUsageOfErrorArg,returnLiteral', config.STRATEGY] = \
        'Ignore arg, Return literal'
    df_copy.loc[df_copy[config.STRATEGY] == 'reassigningError,break', config.STRATEGY] = 'Reassign error, Break'

    df_copy.to_csv(RESULTS_DIRECTORY + filename + '2.csv', index=False)
    # print(df_copy)
    print(df_copy[config.PERC].sum())


if __name__ == '__main__':
    # preprocessing_data()

    ds.create_dir_if_not_exists(RESULTS_DIRECTORY)
    df = pd.read_csv(RESULTS_DIRECTORY + 'data.csv')

    df_mech = df[df[config.MECH] == config.CALLBACK]
    handle_mech_strategies(df_mech, 'df_callback')

    df_mech = df[df[config.MECH] == config.TRY_CATCH]
    handle_mech_strategies(df_mech, 'df_try_catch')

    df_mech = df[df[config.MECH] == config.EVENT]
    handle_mech_strategies(df_mech, 'df_event')

    df_mech = df[df[config.MECH] == config.PROMISE]
    handle_mech_strategies(df_mech, 'df_promise')

    df_mech = df[df[config.MECH] == config.ASYNC_AWAIT]
    handle_mech_strategies(df_mech, 'df_async_await')

    df_mech = df.groupby(config.STRATEGY, as_index=False).sum()
    handle_mech_strategies(df_mech, 'overall')
