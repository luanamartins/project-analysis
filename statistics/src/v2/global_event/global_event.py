import pandas as pd
import statistics.src.processing.process as ds
import statistics.src.constants as constants


GLOBAL_EVENT_DIR = constants.STATS_SRC_PATH + 'v2/rq2/data/global_events.csv'


def get_global_event_for_class(row):
    if row[constants.TYPE] == constants.SERVER:
        return row[constants.NUMBER_OF_UNCAUGHT_EXCEPTION]
    else:
        return row[constants.NUMBER_OF_WINDOW_ON_ERROR] + row[constants.NUMBER_OF_WINDOW_ADD_EVENT_LISTENER]


def handlers_that_throws(dataframe):
    return dataframe[
        (dataframe[constants.THROW_UNDEFINED] > 0) |
        (dataframe[constants.THROW_NULL] > 0) |
        (dataframe[constants.THROW_LITERAL] > 0) |
        (dataframe[constants.THROW_ERROR_OBJECT] > 0) |
        (dataframe[constants.RETHROW] > 0)
    ]


def get_callback_throws():
    data = ds.read_dataset()
    data = data.groupby([constants.REPO, constants.TYPE, constants.MECH]).sum().reset_index()

    # Filtering callbacks
    data = data[data[constants.MECH] == constants.CALLBACK]

    # Filtering all callback functions handlers that throws
    data = handlers_that_throws(data)

    df_res = pd.DataFrame()
    df_res[constants.REPO] = data[constants.REPO]
    df_res[constants.TYPE] = data[constants.TYPE]
    df_res[constants.CALLBACK_THROWS] = data[constants.THROW_UNDEFINED] + data[constants.THROW_NULL] + \
                                        data[constants.THROW_LITERAL] + data[constants.THROW_ERROR_OBJECT] + \
                                        data[constants.RETHROW]
    return df_res


def get_overview_information(class_value, raw_df):
    data = {
        constants.METRIC: [constants.LINES, constants.FILES],
        constants.MEAN: [raw_df[constants.LINES].mean(), raw_df[constants.FILES].mean()],
        constants.MIN: [raw_df[constants.LINES].min(), raw_df[constants.FILES].min()],
        constants.MAX: [raw_df[constants.LINES].max(), raw_df[constants.FILES].max()],
    }
    df = pd.DataFrame(data)
    df.insert(0, 'class', class_value)
    return df


if __name__ == '__main__':
    df_throw = get_callback_throws()
    df = pd.read_csv(GLOBAL_EVENT_DIR, index_col=0)

    df[constants.GLOBAL_EVENTS] = df[constants.NUMBER_OF_UNCAUGHT_EXCEPTION] + \
                                  df[constants.NUMBER_OF_WINDOW_ON_ERROR] + \
                                  df[constants.NUMBER_OF_WINDOW_ADD_EVENT_LISTENER]
    df[constants.GLOBAL_EVENTS_FOR_CLASS] = df.apply(get_global_event_for_class, axis=1)

    df_result = df.merge(df_throw)

    df_repo = pd.read_csv('../general/data.csv')
    df_result[constants.REPO] = df_result[constants.REPO].str[:-4]
    df_res = pd.merge(df_result, df_repo, how='left', on=[constants.REPO, constants.TYPE])

    d2 = df_result[(df_result[constants.GLOBAL_EVENTS_FOR_CLASS] == 0) & (df_result[constants.GLOBAL_EVENTS] > 0)]
    d2.to_csv('has_global_events_for_class_only.csv', index=False)

    d = df_result[df_result[constants.GLOBAL_EVENTS] == 0]
    d = pd.merge(d, df_repo, how='left', on=[constants.REPO, constants.TYPE])

    df_result_final = pd.DataFrame()
    df_result_final['class'] = [constants.OVERALL, constants.CLIENT, constants.SERVER]

    df_overall = get_overview_information(constants.OVERALL, d)

    df_c = d[d[constants.TYPE] == constants.CLIENT]
    df_client = get_overview_information(constants.CLIENT, df_c)

    df_s = d[d[constants.TYPE] == constants.SERVER]
    df_server = get_overview_information(constants.SERVER, df_s)

    df_result_final = pd.concat([df_overall, df_client, df_server])
    df_result_final.to_csv('global_events_overview.csv', index=False)

    d2 = df_result[(df_result[constants.GLOBAL_EVENTS_FOR_CLASS] == 0) & (df_result[constants.GLOBAL_EVENTS] > 0)]
    d2.to_csv('has_global_events_not_for_class.csv', index=False)
