import pandas as pd
import statistics.src.preprocessing.dataset_general_info as dgi
import statistics.src.config as config


UNCAUGHT_EXCEPTION = 'UncaughtException'

RESULTS_DIRECTORY = 'rq2/'
RESULTS_BASE_DIR = config.STATS_SRC_PATH + 'v2/rq2/'
RESULTS_DATA_DIRECTORY = RESULTS_BASE_DIR + 'data/'
TEMPLATE_PATH = RESULTS_DATA_DIRECTORY + 'global_events.csv'
NO_HANDLERS_FOR_TYPE_TEMPLATE_PATH = RESULTS_DATA_DIRECTORY + 'global_events_no_handlers_for_type.csv'
NO_HANDLERS_TEMPLATE_PATH = RESULTS_DATA_DIRECTORY + 'global_events_no_handlers.csv'


def has_at_least_one_handler(df):
    # df_grouped = df.groupby([config.REPO, config.TYPE], as_index=False).sum()
    # df_grouped = df[
    #     (df[config.NUMBER_OF_UNCAUGHT_EXCEPTION] != 0) |
    #     (df[config.NUMBER_OF_WINDOW_ON_ERROR] != 0) |
    #     (df[config.NUMBER_OF_WINDOW_ADD_EVENT_LISTENER] != 0)
    # ]
    df.to_csv(TEMPLATE_PATH)


def has_no_handlers_for_type(df_all):

    df_client = df_all[df_all[config.TYPE] == config.CLIENT]
    df_client = df_client[
        (df_client[config.NUMBER_OF_WINDOW_ON_ERROR] == 0) &
        (df_client[config.NUMBER_OF_WINDOW_ADD_EVENT_LISTENER] == 0)
    ]
    df_client.drop_duplicates(inplace=True)

    df_server = df_all[df_all[config.TYPE] == config.SERVER]
    df_server = df_server[
        (df_server[config.NUMBER_OF_UNCAUGHT_EXCEPTION] == 0)
    ]
    df_server.drop_duplicates(inplace=True)

    df_all = pd.concat([df_client, df_server], ignore_index=True)
    df_all.to_csv(NO_HANDLERS_FOR_TYPE_TEMPLATE_PATH)


def has_no_handlers_at_all(df):
    # df_grouped = df.groupby([config.REPO, config.TYPE], as_index=False).sum()
    df_grouped = df[
        (df[config.NUMBER_OF_UNCAUGHT_EXCEPTION] == 0) &
        (df[config.NUMBER_OF_WINDOW_ON_ERROR] == 0) &
        (df[config.NUMBER_OF_WINDOW_ADD_EVENT_LISTENER] == 0)
    ]

    print(len(df_grouped[config.REPO].unique()))
    df_grouped.to_csv(NO_HANDLERS_TEMPLATE_PATH)


if __name__ == '__main__':
    uncaught_columns = [
        config.NUMBER_OF_UNCAUGHT_EXCEPTION, config.NUMBER_OF_WINDOW_ON_ERROR, config.NUMBER_OF_WINDOW_ADD_EVENT_LISTENER
    ]
    columns = [config.REPO, config.TYPE] + uncaught_columns

    df_client = dgi.get_general_info(config.CLIENT)
    df_client = df_client[columns]

    df_server = dgi.get_general_info(config.SERVER)
    df_server = df_server[columns]

    df_all = pd.concat([df_client, df_server], ignore_index=True)

    # Number of global handlers by files
    # Investigar pq temos meteor.csv, materialize.csv em client e server
    df_all = df_all.groupby([config.REPO, config.TYPE], as_index=False).sum()

    has_at_least_one_handler(df_all)

    has_no_handlers_for_type(df_all)

    has_no_handlers_at_all(df_all)



