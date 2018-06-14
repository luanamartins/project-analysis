import pandas as pd
import config


def sum_metrics(metrics, data_frame):
    total = 0
    for metric in metrics:
        total += data_frame[metric].sum()
    return total


# Pass report-classes as argument
def perc_empty_handlers(csv_file_path):
    df = pd.read_csv(csv_file_path)
    total = sum_metrics(['tryCatchNumberOfCatches', 'promiseNumberOfPromiseCatches',
                         'asyncAwaitNumberOfCatches','eventsNumberOfEventMethodsOn',
                         'eventsNumberOfEventMethodsOnce'], df)

    partial = sum_metrics(['tryCatchNumberOfEmptyCatches','promiseNumberOfEmptyFunctionsOnPromiseCatches',
                           'asyncAwaitNumberOfEmptyCatches','eventsNumberOfEventOnEmptyFunctions',
                           'eventsNumberOfEventOnceEmptyFunctions'], df)
    return (partial * 100) / float(total)


def perc_log_handlers(csv_file_path):
    df = pd.read_csv(csv_file_path)
    total = sum_metrics(['tryCatchNumberOfCatches', 'promiseNumberOfPromiseCatches',
                         'asyncAwaitNumberOfCatches', 'eventsNumberOfEventMethodsOn',
                         'eventsNumberOfEventMethodsOnce'], df)

    partial = sum_metrics(['tryCatchNumberOfCatchesWithUniqueConsole', 'promiseNumberOfCatchesWithUniqueConsole',
                           'asyncAwaitNumberOfCatchesWithUniqueConsole', 'eventsNumberOfEventOnWithUniqueConsole',
                           'eventsNumberOfEventOnceWithUniqueConsole'], df)
    return (partial * 100) / float(total)


def perc_one_statement_handlers(csv_file_path):
    df = pd.read_csv(csv_file_path)
    total = sum_metrics(['tryCatchNumberOfCatches', 'promiseNumberOfPromiseCatches',
                         'asyncAwaitNumberOfCatches', 'eventsNumberOfEventMethodsOn',
                         'eventsNumberOfEventMethodsOnce'], df)

    partial = sum_metrics(['tryCatchNumberOfCatchesWithUniqueStatement', 'promiseNumberOfCatchesWithUniqueStatement',
                           'asyncAwaitNumberOfCatchesWithUniqueStatement', 'eventsNumberOfEventOnWithUniqueStatement',
                           'eventsNumberOfEventOnceWithUniqueStatement'], df)
    return (partial * 100) / float(total)


def perc_throw_statement(csv_file_path):
    df = pd.read_csv(csv_file_path)
    total = sum_metrics(['tryCatchNumberOfCatches', 'promiseNumberOfPromiseCatches',
                         'asyncAwaitNumberOfCatches', 'callbacksNumberOfCallbackErrorFunctions', 
                         'eventsNumberOfEventMethodsOn', 'eventsNumberOfEventMethodsOnce'], df)

    partial = sum_metrics(['tryCatchNumberOfCatchesThatThrows', 'promiseNumberOfPromisesThatThrows',
                           'asyncAwaitNumberOfCatchesThatThrows', 'callbacksNumberOfCallbacksThatThrows',
                           'eventsNumberOfEventsThatThrows'], df)
    return (partial * 100) / float(total)


filepath = config.DATA['result'] + 'results-20180607/result-classes.csv'
print('Empty: ' + str(perc_empty_handlers(filepath)))
print('Logs: ' + str(perc_log_handlers(filepath)))
print('One statement: ' + str(perc_one_statement_handlers(filepath)))
print('Throws: ')
