import pandas as pd
import statistics.src.seaborn.dataset_seaborn as ds
import statistics.src.constants as constants


GLOBAL_EVENT_DIR = constants.STATS_SRC_PATH + 'v2/rq2/data/global_events.csv'


def get_global_event_for_class(row):
    if row[constants.TYPE] == constants.SERVER:
        return row[constants.NUMBER_OF_UNCAUGHT_EXCEPTION]
    else:
        return row[constants.NUMBER_OF_WINDOW_ON_ERROR] + row[constants.NUMBER_OF_WINDOW_ADD_EVENT_LISTENER]


def get_callback_throws():
    data = ds.read_dataset()
    data = data.groupby([constants.REPO, constants.TYPE, constants.MECH]).sum().reset_index()

    # Filtering callbacks
    data = data[data[constants.MECH] == constants.CALLBACK]

    # Filtering all callback functions handlers that throws
    data = data[
        (data[constants.THROW_UNDEFINED] > 0) |
        (data[constants.THROW_NULL] > 0) |
        (data[constants.THROW_LITERAL] > 0) |
        (data[constants.THROW_ERROR_OBJECT] > 0) |
        (data[constants.RETHROW] > 0)
        ]

    df_res = pd.DataFrame()
    df_res[constants.REPO] = data[constants.REPO]
    df_res[constants.TYPE] = data[constants.TYPE]
    df_res[constants.CALLBACK_THROWS] = data[constants.THROW_UNDEFINED] + data[constants.THROW_NULL] + \
                                        data[constants.THROW_LITERAL] + data[constants.THROW_ERROR_OBJECT] + \
                                        data[constants.RETHROW]
    return df_res


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

    # print(df_res['lines'].mean())
    # print(df_res['lines'].min())
    # print(df_res['lines'].max())
    # print(df_res['files'].mean())
    # print(df_res['files'].min())
    # print(df_res['files'].max())

    df_res.to_csv('test6.csv', index=False)

    d = df_result[df_result[constants.GLOBAL_EVENTS] == 0]
    d = pd.merge(d, df_repo, how='left', on=[constants.REPO, constants.TYPE])
    d.to_csv('test4.csv', index=False)

    print('lines')
    print('mean: ' + str(d['lines'].mean()))
    print('min: ' + str(d['lines'].min()))
    print('max: ' + str(d['lines'].max()))
    print('files')
    print('mean: ' + str(d['files'].mean()))
    print('min: ' + str(d['files'].min()))
    print('max: ' + str(d['files'].max()))

    print('')
    print('client')
    df_c = d[d[constants.TYPE] == constants.CLIENT]
    print('lines')
    print('mean: ' + str(df_c['lines'].mean()))
    print('min: ' + str(df_c['lines'].min()))
    print('max: ' + str(df_c['lines'].max()))
    print('files')
    print('mean: ' + str(df_c['files'].mean()))
    print('min: ' + str(df_c['files'].min()))
    print('max: ' + str(df_c['files'].max()))

    print('')
    print('server')
    df_c = d[d[constants.TYPE] == constants.SERVER]
    print('lines')
    print('mean: ' + str(df_c['lines'].mean()))
    print('min: ' + str(df_c['lines'].min()))
    print('max: ' + str(df_c['lines'].max()))
    print('files')
    print('mean: ' + str(df_c['files'].mean()))
    print('min: ' + str(df_c['files'].min()))
    print('max: ' + str(df_c['files'].max()))

    d2 = df_result[(df_result[constants.GLOBAL_EVENTS_FOR_CLASS] == 0) & (df_result[constants.GLOBAL_EVENTS] > 0)]
    d2.to_csv('test 5.csv', index=False)

