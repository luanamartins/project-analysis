import glob
import pandas as pd
import statistics.src.constants as constants


def get_total_and_mean_handlers(file_paths, result, number_repos):
    for file_path in file_paths:
        df = pd.read_csv(file_path)

        total = df['tryCatchNumberOfCatches'].sum()
        result['try-catch'][0] += total/number_repos
        result['try-catch'][1] += total

        total = df['promiseNumberOfPromiseCatches'].sum()
        result['promise'][0] += total / number_repos
        result['promise'][1] += total

        total = df['asyncAwaitNumberOfCatches'].sum()
        result['async-await'][0] += total / number_repos
        result['async-await'][1] += total

        total = df['eventsNumberOfEventMethodsOn'].sum() + df['eventsNumberOfEventMethodsOnce'].sum()
        result['event'][0] += total / number_repos
        result['event'][1] += total

        total = df['callbacksNumberOfCallbackErrorFunctions'].sum()
        result['callback'][0] += total / number_repos
        result['callback'][1] += total


directory = constants.EXTRACT_METRICS_RESULT_DIR + 'client/'
file_paths = glob.glob(directory + '*.csv')
number_repos = 192

result = {
    'info': ['mean', 'total'],
    'try-catch': [0,0],
    'promise': [0,0],
    'async-await': [0,0],
    'event': [0,0],
    'callback': [0,0]
}

get_total_and_mean_handlers(file_paths, result, number_repos)

directory = constants.EXTRACT_METRICS_RESULT_DIR + 'server/'
file_paths = glob.glob(directory + '*.csv')

get_total_and_mean_handlers(file_paths, result, number_repos)

dataf = pd.DataFrame(data=result)
dataf.set_index('info', inplace=True)
result_path = constants.RESULT_SUMMARY + 'mean-total-error-handling.csv'
dataf.to_csv(result_path, encoding='utf-8', index=False)
