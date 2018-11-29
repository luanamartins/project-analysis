import pandas as pd

import statistics.src.config as config

RESULTS_DIRECTORY = config.STATS_SRC_PATH + 'v2/rq2/data/'


def no_precautions():
    df_global_events_client = pd.read_csv(RESULTS_DIRECTORY + 'global-events-client.csv')
    df_global_events_server = pd.read_csv(RESULTS_DIRECTORY + 'global-events-server.csv')

    df = pd.read_csv(RESULTS_DIRECTORY + 'data-file.csv')
    df = df[df[config.MECH] == config.CALLBACK]
    df = df[df[config.STRATEGY] == config.THROW_ERROR_OBJECT]
    df = df[df[config.STRATEGY] == config.THROW_LITERAL]
    df = df[df[config.STRATEGY] == config.THROW_NULL]
    df = df[df[config.STRATEGY] == config.THROW_UNDEFINED]
    df = df[df[config.STRATEGY] == config.RETHROW]




if __name__ == '__main__':
    df = pd.read_csv(RESULTS_DIRECTORY + 'df_res.csv')
    df = df[df[config.MECH] == config.CALLBACK]
    df = df[df[config.THROW_ERROR_OBJECT] == True]
    print(df[config.FILE].head())
    df.to_csv('test.csv')