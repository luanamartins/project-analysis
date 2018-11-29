import statistics.src.preprocessing.dataset_general_info as dgi
import statistics.src.config as config


UNCAUGHT_EXCEPTION = 'UncaughtException'
NUMBER_UNCAUGHT_EXCEPTION = 'eventsNumberOfEventUncaughtException'
WINDOW_ON_ERROR = 'numberOfWindowOnError'
WINDOW_ADD_EVENT_LISTENER = 'numberOfWindowAddEventListener'

RESULTS_DIRECTORY = 'rq2/'
RESULTS_BASE_DIR = config.STATS_SRC_PATH + 'v2/rq2/'
RESULTS_DATA_DIRECTORY = RESULTS_BASE_DIR + 'data/'
TEMPLATE_PATH = RESULTS_DATA_DIRECTORY + 'global-events-{}.csv'


def create_global_info(type):
    df_uncaught_c = dgi.get_general_info(type)
    # df_uncaught_c = df_c[df_c[NUMBER_UNCAUGHT_EXCEPTION] > 0]

    # uncaught_columns = [x for x in df_uncaught_c.columns if UNCAUGHT_EXCEPTION in x]
    uncaught_columns = [NUMBER_UNCAUGHT_EXCEPTION, WINDOW_ON_ERROR, WINDOW_ADD_EVENT_LISTENER]
    columns = [config.REPO, config.TYPE] + uncaught_columns

    df_uncaught_c = df_uncaught_c[columns]

    df_uncaught_c_g = df_uncaught_c.groupby([config.REPO, config.TYPE]).sum()
    df_uncaught_c_g = df_uncaught_c_g[(df_uncaught_c_g[NUMBER_UNCAUGHT_EXCEPTION] != 0) |
                                      (df_uncaught_c_g[WINDOW_ON_ERROR] != 0) |
                                      (df_uncaught_c_g[WINDOW_ADD_EVENT_LISTENER] != 0)]

    df_uncaught_c_g.to_csv(TEMPLATE_PATH.format(type))


if __name__ == '__main__':
    create_global_info(config.CLIENT)
    create_global_info(config.SERVER)



