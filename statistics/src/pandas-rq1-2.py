import pandas as pd
import config

output_file = open(config.DATA['result'] + 'result-rq1-2.txt', 'w')

def sum_metrics(metrics, data_frame):
    total = 0
    for metric in metrics:
        total += data_frame[metric].sum()
    return total


def get_percentage(df, total_list, partial_list):
    total = sum_metrics(total_list, df)
    partial = sum_metrics(partial_list, df)
    return (partial * 100) / float(total)


# Pass report-classes as argument
def perc_empty_handlers(df):
    total = ['tryCatchNumberOfCatches', 'promiseNumberOfPromiseCatches', 'asyncAwaitNumberOfCatches',
             'eventsNumberOfEventMethodsOn', 'eventsNumberOfEventMethodsOnce']
    partial = ['tryCatchNumberOfEmptyCatches','promiseNumberOfEmptyFunctionsOnPromiseCatches',
               'asyncAwaitNumberOfEmptyCatches','eventsNumberOfEventOnEmptyFunctions',
               'eventsNumberOfEventOnceEmptyFunctions']
    return get_percentage(df, total, partial)


def perc_no_usage_arg_overall(df):
    total = ['tryCatchNumberOfCatches', 'promiseNumberOfPromiseCatches', 'asyncAwaitNumberOfCatches',
             'eventsNumberOfEventMethodsOn', 'eventsNumberOfEventMethodsOnce']
    partial = ['tryCatchNumberOfCatchesNoUsageOfErrorArgument', 'promiseNumberOfFunctionsOnCatchesNoUsageOfErrorArgument',
               'asyncAwaitNumberOfCatchesNoUsageOfErrorArgument', 'eventsNumberOfEventOnNoUsageOfErrorArgument',
               'eventsNumberOfEventOnceNoUsageOfErrorArgument', 'callbacksNumberOfFunctionsNoUsageOfErrorArgument']
    return get_percentage(df, total, partial)


def perc_log_handlers(df):
    total = ['tryCatchNumberOfCatches', 'promiseNumberOfPromiseCatches', 'asyncAwaitNumberOfCatches',
             'eventsNumberOfEventMethodsOn', 'eventsNumberOfEventMethodsOnce']

    partial = ['tryCatchNumberOfCatchesWithUniqueConsole', 'promiseNumberOfCatchesWithUniqueConsole',
                'asyncAwaitNumberOfCatchesWithUniqueConsole', 'eventsNumberOfEventOnWithUniqueConsole',
                'eventsNumberOfEventOnceWithUniqueConsole']
    return get_percentage(df, total, partial)


def perc_one_statement_handlers(df):
    total = ['tryCatchNumberOfCatches', 'promiseNumberOfPromiseCatches',
                         'asyncAwaitNumberOfCatches', 'eventsNumberOfEventMethodsOn',
                         'eventsNumberOfEventMethodsOnce']

    partial = ['tryCatchNumberOfCatchesWithUniqueStatement', 'promiseNumberOfCatchesWithUniqueStatement',
                           'asyncAwaitNumberOfCatchesWithUniqueStatement', 'eventsNumberOfEventOnWithUniqueStatement',
                           'eventsNumberOfEventOnceWithUniqueStatement']
    return get_percentage(df, total, partial)


def perc_throw_statement(df):
    total = ['tryCatchNumberOfCatches', 'promiseNumberOfPromiseCatches',
                         'asyncAwaitNumberOfCatches', 'callbacksNumberOfCallbackErrorFunctions', 
                         'eventsNumberOfEventMethodsOn', 'eventsNumberOfEventMethodsOnce']

    partial = ['tryCatchNumberOfCatchesThatThrows', 'promiseNumberOfCatchesThatThrows',
                           'asyncAwaitNumberOfHandlersThatThrows', 'callbacksNumberOfHandlersThrows',
                           'eventsNumberOfHandlersThatThrows']
    return get_percentage(df, total, partial)


def perc_empty_handlers_per_handler(df):
    output_file.write('Empty handlers per total of handlers (%):' + '\n')

    # Empty try-catch
    total = ['tryCatchNumberOfCatches']
    empty = ['tryCatchNumberOfEmptyCatches']
    output_file.write('try-catch: ' + str(get_percentage(df, total, empty)) + '\n')

    # Empty promises
    total = ['promiseNumberOfPromiseCatches']
    empty = ['promiseNumberOfEmptyFunctionsOnPromiseCatches']
    output_file.write('promises: ' + str(get_percentage(df, total, empty)) + '\n')

    # Async-await
    total = ['asyncAwaitNumberOfCatches']
    empty = ['asyncAwaitNumberOfEmptyCatches']
    output_file.write('async-await: ' + str(get_percentage(df, total, empty)) + '\n')

    # Events
    total = ['eventsNumberOfEventMethodsOn', 'eventsNumberOfEventMethodsOnce']
    empty = ['eventsNumberOfEventOnEmptyFunctions', 'eventsNumberOfEventOnceEmptyFunctions']
    output_file.write('events: ' + str(get_percentage(df, total, empty)) + '\n')

    # Callback functions
    total = ['callbacksNumberOfCallbackErrorFunctions']
    empty = ['callbacksNumberOfEmptyCallbacks']
    output_file.write('callback: ' + str(get_percentage(df, total, empty)) + '\n')

def perc_unique_console(df):
    output_file.write('Logging on console per total handlers (%):' + '\n')

    # try-catch
    total = ['tryCatchNumberOfCatches']
    empty = ['tryCatchNumberOfCatchesWithUniqueConsole']
    output_file.write('try-catch: ' + str(get_percentage(df, total, empty)) + '\n')

    # promises
    total = ['promiseNumberOfPromiseCatches']
    empty = ['promiseNumberOfCatchesWithUniqueConsole']
    output_file.write('promises: ' + str(get_percentage(df, total, empty)) + '\n')

    # Async-await
    total = ['asyncAwaitNumberOfCatches']
    empty = ['asyncAwaitNumberOfCatchesWithUniqueConsole']
    output_file.write('async-await: ' + str(get_percentage(df, total, empty)) + '\n')

    # Events
    total = ['eventsNumberOfEventMethodsOn', 'eventsNumberOfEventMethodsOnce']
    empty = ['eventsNumberOfEventOnWithUniqueConsole', 'eventsNumberOfEventOnceWithUniqueConsole']
    output_file.write('events: ' + str(get_percentage(df, total, empty)) + '\n')

    # Callback functions
    total = ['callbacksNumberOfCallbackErrorFunctions']
    empty = ['callbacksNumberOfFunctionsWithUniqueConsole']
    output_file.write('callback: ' + str(get_percentage(df, total, empty)) + '\n')


def perc_no_usage_arg(df):
    output_file.write('No usage of error parameter per total handlers (%):' + '\n')

    # try-catch
    total = ['tryCatchNumberOfCatches']
    empty = ['tryCatchNumberOfCatchesNoUsageOfErrorArgument']
    output_file.write('try-catch: ' + str(get_percentage(df, total, empty)) + '\n')

    # promises
    total = ['promiseNumberOfPromiseCatches']
    empty = ['promiseNumberOfFunctionsOnCatchesNoUsageOfErrorArgument']
    output_file.write('promises: ' + str(get_percentage(df, total, empty)) + '\n')

    # Async-await
    total = ['asyncAwaitNumberOfCatches']
    empty = ['asyncAwaitNumberOfCatchesNoUsageOfErrorArgument']
    output_file.write('async-await: ' + str(get_percentage(df, total, empty)) + '\n')

    # Events
    total = ['eventsNumberOfEventMethodsOn', 'eventsNumberOfEventMethodsOnce']
    empty = ['eventsNumberOfEventOnNoUsageOfErrorArgument', 'eventsNumberOfEventOnceNoUsageOfErrorArgument']
    output_file.write('events: ' + str(get_percentage(df, total, empty)) + '\n')

    # Callback functions
    total = ['callbacksNumberOfCallbackErrorFunctions']
    empty = ['callbacksNumberOfFunctionsNoUsageOfErrorArgument']
    output_file.write('callback: ' + str(get_percentage(df, total, empty)) + '\n')


def perc_throws(df):
    output_file.write('Throws an error parameter per total handlers (%):' + '\n')

    # try-catch
    total = ['tryCatchNumberOfCatches']
    empty = ['tryCatchNumberOfCatchesThatThrows']
    output_file.write('try-catch: ' + str(get_percentage(df, total, empty)) + '\n')

    # promises
    total = ['promiseNumberOfPromiseCatches']
    empty = ['promiseNumberOfCatchesThatThrows']
    output_file.write('promises: ' + str(get_percentage(df, total, empty)) + '\n')

    # Async-await
    total = ['asyncAwaitNumberOfCatches']
    empty = ['asyncAwaitNumberOfHandlersThatThrows']
    output_file.write('async-await: ' + str(get_percentage(df, total, empty)) + '\n')

    # Events
    total = ['eventsNumberOfEventMethodsOn', 'eventsNumberOfEventMethodsOnce']
    empty = ['eventsNumberOfHandlersThatThrows']
    output_file.write('events: ' + str(get_percentage(df, total, empty)) + '\n')

    # Callback functions
    total = ['callbacksNumberOfCallbackErrorFunctions']
    empty = ['callbacksNumberOfHandlersThatThrows']
    output_file.write('callback: ' + str(get_percentage(df, total, empty)) + '\n')


# def triangulation():
#
# Sobre os handlers
# Estou falando sobre a presenca de um tratador geral em dois casos:
# - um callback throws uma exceção
# - um evento “error” é lançado
# Nesses dois casos, dependendo do quão frequentes são, pode valer a pena olhar na mão se há tratadores específicos


filepath = config.DATA['result'] + 'result-class.csv'
df = pd.read_csv(filepath, sep=',')
output_file.write('--------------------------------' + '\n')
output_file.write('Percentage of handlers:' + '\n')
output_file.write('Empty: ' + str(perc_empty_handlers(df)) + '\n')
output_file.write('No usage parameters: ' + str(perc_no_usage_arg_overall(df)) + '\n')
output_file.write('Logging only: ' + str(perc_log_handlers(df)) + '\n')
output_file.write('One statement only: ' + str(perc_one_statement_handlers(df)) + '\n')
output_file.write('That throws a parameter: ' + str(perc_throw_statement(df)) + '\n')
output_file.write('--------------------------------' + '\n')
perc_empty_handlers_per_handler(df)
output_file.write('--------------------------------' + '\n')
perc_unique_console(df)
output_file.write('--------------------------------' + '\n')
perc_no_usage_arg(df)
output_file.write('--------------------------------' + '\n')
perc_throws(df)
output_file.write('--------------------------------' + '\n')

def percentage(partial, total):
    return (100*partial)/total


# UncaughtException
total = df['eventsNumberOfEventUncaughtException'].sum()
empty = df['eventsNumberOfUncaughtExceptionEmpty'].sum()
no_usage = df['eventsNumberOfUncaughtExceptionNoUsageOfErrorArgument'].sum()
unique_stmt = df['eventsNumberOfUncaughtExceptionWithUniqueStatement'].sum()
unique_console = df['eventsNumberOfUncaughtExceptionWithUniqueConsole'].sum()
returns = df['eventsNumberOfUncaughtExceptionReturns'].sum()
throws = df['eventsNumberOfUncaughtExceptionThrows'].sum()

output_file.write('UncaughtException approaches:' + '\n')
output_file.write('Empty block: ' + str(percentage(empty, total)) + '\n')
output_file.write('No usage of error parameter: ' + str(percentage(no_usage, total)) + '\n')
output_file.write('One statement only: ' + str(percentage(unique_stmt, total)) + '\n')
output_file.write('Logging on console only: ' + str(percentage(unique_console, total)) + '\n')
output_file.write('Throws an error: ' + str(percentage(throws, total)) + '\n')
output_file.write('Returns an error: ' + str(percentage(throws, total)) + '\n')

output_file.write('--------------------------------' + '\n')
unique_error_callback = df['callbacksNumberOfFunctionsWithUniqueErrorArg'].sum()
no_usage_callback = df['callbacksNumberOfFunctionsNoUsageOfErrorArgumentWithUniqueErrorArg'].sum()
output_file.write('Callbacks that no use error parameter (has only one error parameter)' + '\n')
output_file.write(str(percentage(no_usage_callback, unique_error_callback)) + '\n')

output_file.write('--------------------------------' + '\n')
metric_df = df['eventsNumberOfUncaughtExceptionReturns'].sum()
total_df = df['eventsNumberOfEventUncaughtException'].sum()
output_file.write('UncaughtException percentage that throws an error parameter' + '\n')
output_file.write(str(percentage(metric_df, total_df)) + '\n')
output_file.write('--------------------------------' + '\n')

