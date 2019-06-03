import pandas as pd
import glob

import statistics.src.seaborn.dataset_seaborn as ds
import statistics.src.constants as config


dir = '/Users/luanamartins/Documents/Mestrado/project-analysis/statistics/src/v2/rq2/'
GLOBAL_EVENT_DIR = dir + 'data/global_events.csv'

UNCAUGHT_EXCEPTION_COLUMN = 'eventsNumberOfEventUncaughtException'
WINDOW_ERROR = 'numberOfWindowOnError'
WINDOW_ADD_EVENT_LISTENER = 'numberOfWindowAddEventListener'
GLOBAL_EVENTS = 'global_events'
GLOBAL_EVENTS_FOR_CLASS = 'global_events_for_class'
CALLBACK_THROWS = 'callback_throws'


def get_global_event_for_class(row):
    if row[config.TYPE] == config.SERVER:
        return row[UNCAUGHT_EXCEPTION_COLUMN]
    else:
        return row[WINDOW_ERROR] + row[WINDOW_ADD_EVENT_LISTENER]


def get_callback_throws():
    data = ds.read_dataset()
    data = data.groupby([config.REPO, config.TYPE, config.MECH]).sum().reset_index()

    # Filtering callbacks
    data = data[data[config.MECH] == config.CALLBACK]

    # Filtering all callback functions handlers that throws
    data = data[
        (data[config.THROW_UNDEFINED] > 0) |
        (data[config.THROW_NULL] > 0) |
        (data[config.THROW_LITERAL] > 0) |
        (data[config.THROW_ERROR_OBJECT] > 0) |
        (data[config.RETHROW] > 0)
    ]

    df_res = pd.DataFrame()
    df_res[config.REPO] = data[config.REPO]
    df_res[config.TYPE] = data[config.TYPE]
    df_res[CALLBACK_THROWS] = data[config.THROW_UNDEFINED] + data[config.THROW_NULL] + \
                                data[config.THROW_LITERAL] + data[config.THROW_ERROR_OBJECT] + data[config.RETHROW]
    return df_res


if __name__ == '__main__':
    df_throw = get_callback_throws()
    df = pd.read_csv(GLOBAL_EVENT_DIR, index_col=0)

    df[GLOBAL_EVENTS] = df[UNCAUGHT_EXCEPTION_COLUMN] + df[WINDOW_ERROR] + df[WINDOW_ADD_EVENT_LISTENER]
    df[GLOBAL_EVENTS_FOR_CLASS] = df.apply(get_global_event_for_class, axis=1)

    df_result = df.merge(df_throw)

    df_repo = pd.read_csv('../general/data.csv')
    df_result[config.REPO] = df_result[config.REPO].str[:-4]
    df_res = pd.merge(df_result, df_repo, how='left', on=[config.REPO, config.TYPE])

    # print(df_res['lines'].mean())
    # print(df_res['lines'].min())
    # print(df_res['lines'].max())
    # print(df_res['files'].mean())
    # print(df_res['files'].min())
    # print(df_res['files'].max())

    df_res.to_csv('test6.csv', index=False)

    d = df_result[df_result[GLOBAL_EVENTS] == 0]
    d = pd.merge(d, df_repo, how='left', on=[config.REPO, config.TYPE])
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
    df_c = d[d[config.TYPE] == config.CLIENT]
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
    df_c = d[d[config.TYPE] == config.SERVER]
    print('lines')
    print('mean: ' + str(df_c['lines'].mean()))
    print('min: ' + str(df_c['lines'].min()))
    print('max: ' + str(df_c['lines'].max()))
    print('files')
    print('mean: ' + str(df_c['files'].mean()))
    print('min: ' + str(df_c['files'].min()))
    print('max: ' + str(df_c['files'].max()))

    d2 = df_result[(df_result[GLOBAL_EVENTS_FOR_CLASS] == 0) & (df_result[GLOBAL_EVENTS] > 0)]
    d2.to_csv('test 5.csv', index=False)


