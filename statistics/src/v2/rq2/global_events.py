import pandas as pd
import statistics.src.preprocessing.dataset_general_info as dgi
import statistics.src.config as config


UNCAUGHT_EXCEPTION = 'UncaughtException'
NUMBER_UNCAUGHT_EXCEPTION = 'eventsNumberOfEventUncaughtException'
WINDOW_ON_ERROR = 'numberOfWindowOnError'
WINDOW_ADD_EVENT_LISTENER = 'numberOfWindowAddEventListener'

RESULTS_DIRECTORY = 'rq2/'
RESULTS_BASE_DIR = config.STATS_SRC_PATH + 'v2/rq2/'
RESULTS_DATA_DIRECTORY = RESULTS_BASE_DIR + 'data/'
TEMPLATE_PATH = RESULTS_DATA_DIRECTORY + 'global_events_{}.csv'
NO_HANDLERS_FOR_TYPE_TEMPLATE_PATH = RESULTS_DATA_DIRECTORY + 'global_events_no_handlers_for_type_{}.csv'
NO_HANDLERS_TEMPLATE_PATH = RESULTS_DATA_DIRECTORY + 'global_events_no_handlers.csv'

def has_at_least_one_handler(type, df):
    df_grouped = df.groupby([config.REPO, config.TYPE]).sum()
    df_grouped = df_grouped[(df_grouped[NUMBER_UNCAUGHT_EXCEPTION] != 0) |
                                      (df_grouped[WINDOW_ON_ERROR] != 0) |
                                      (df_grouped[WINDOW_ADD_EVENT_LISTENER] != 0)]

    df_grouped.to_csv(TEMPLATE_PATH.format(type))


def has_no_handlers_for_type(type, df_all):
    if type == config.CLIENT:
        df = df_all[(df_all[WINDOW_ON_ERROR] == 0) & (df_all[WINDOW_ADD_EVENT_LISTENER] == 0)]
        df.drop_duplicates(inplace=True)
        df.to_csv(NO_HANDLERS_FOR_TYPE_TEMPLATE_PATH.format(type))
    else:
        df = df_all[(df_all[NUMBER_UNCAUGHT_EXCEPTION] == 0)]
        df.drop_duplicates(inplace=True)
        df.to_csv(NO_HANDLERS_FOR_TYPE_TEMPLATE_PATH.format(type))


def has_no_handlers_at_all(df):
    df_grouped = df.groupby([config.REPO, config.TYPE]).sum()
    df_grouped = df_grouped[(df_grouped[NUMBER_UNCAUGHT_EXCEPTION] == 0) &
                                      (df_grouped[WINDOW_ON_ERROR] == 0) &
                                      (df_grouped[WINDOW_ADD_EVENT_LISTENER] == 0)]
    df_grouped.to_csv(NO_HANDLERS_TEMPLATE_PATH)


if __name__ == '__main__':
    uncaught_columns = [NUMBER_UNCAUGHT_EXCEPTION, WINDOW_ON_ERROR, WINDOW_ADD_EVENT_LISTENER]
    columns = [config.REPO, config.TYPE] + uncaught_columns

    df_client = dgi.get_general_info(config.CLIENT)
    df_client = df_client[columns]

    df_server = dgi.get_general_info(config.SERVER)
    df_server = df_server[columns]

    df_all = pd.concat([df_client, df_server], ignore_index=True)

    has_at_least_one_handler(config.CLIENT, df_client)
    has_at_least_one_handler(config.SERVER, df_server)

    has_no_handlers_for_type(config.CLIENT, df_client)
    has_no_handlers_for_type(config.SERVER, df_server)

    has_no_handlers_at_all(df_all)



