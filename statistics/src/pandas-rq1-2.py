import pandas as pd
import config


def percentage(partial, total):
    return (100*partial)/total


def sum_metrics(metrics, data_frame):
    total = 0
    for metric in metrics:
        total += data_frame[metric].sum()
    return total


def get_percentage(df, total_list, partial_list):
    total = sum_metrics(total_list, df)
    partial = sum_metrics(partial_list, df)
    return (partial * 100) / float(total)


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


def perc_return_statement(df):
    total = ['tryCatchNumberOfCatches', 'promiseNumberOfPromiseCatches',
                         'asyncAwaitNumberOfCatches', 'callbacksNumberOfCallbackErrorFunctions',
                         'eventsNumberOfEventMethodsOn', 'eventsNumberOfEventMethodsOnce']

    partial = ['tryCatchNumberOfCatchesThatReturns', 'promiseNumberOfCatchesThatReturns',
                           'asyncAwaitNumberOfHandlersThatReturns', 'callbacksNumberOfHandlersThatReturns',
                           'eventsNumberOfHandlersThatReturns']
    return get_percentage(df, total, partial)


def perc_reassigning_handlers(df):
    total = ['tryCatchNumberOfCatches', 'promiseNumberOfPromiseCatches', 'asyncAwaitNumberOfCatches',
             'eventsNumberOfEventMethodsOn', 'eventsNumberOfEventMethodsOnce']
    partial = ['tryCatchNumberOfEmptyCatches','promiseNumberOfEmptyFunctionsOnPromiseCatches',
               'asyncAwaitNumberOfEmptyCatches','eventsNumberOfEventOnEmptyFunctions',
               'eventsNumberOfEventOnceEmptyFunctions']
    return get_percentage(df, total, partial)


def perc_reassigning(df):
    # 'Reassiging an error parameter per total handlers (%)'

    total = ['tryCatchNumberOfCatches', 'promiseNumberOfPromiseCatches', 'eventsNumberOfEventMethodsOn',
            'eventsNumberOfEventMethodsOnce', 'callbacksNumberOfCallbackErrorFunctions']
    partial = ['tryCatchNumberOfErrorReassigning', 'promiseNumberOfErrorReassigning', 'eventsNumberOfErrorReassigning',
            'callbacksNumberOfErrorReassigning']
    return get_percentage(df, total, partial)


# def triangulation():
#   About the handlers
# Triangulation: the presence of a general handler that:
#  - A callback throws an exception
# - An event 'error' is thrown
# - In these cases,
# - In these cases, depending on how frequent they are, it may be worth looking manually if there are specific handlers

filepath = config.DATA['result_info'] + 'result-class.csv'
df = pd.read_csv(filepath, sep=',')

# UncaughtException
total = df['eventsNumberOfEventUncaughtException'].sum()
empty = df['eventsNumberOfUncaughtExceptionEmpty'].sum()
no_usage = df['eventsNumberOfUncaughtExceptionNoUsageOfErrorArgument'].sum()
unique_stmt = df['eventsNumberOfUncaughtExceptionWithUniqueStatement'].sum()
unique_console = df['eventsNumberOfUncaughtExceptionWithUniqueConsole'].sum()
throws = df['eventsNumberOfUncaughtExceptionThrows'].sum()
returns = df['eventsNumberOfUncaughtExceptionReturns'].sum()

strategies = ['empty_block', 'no_usage_param', 'one_stmt', 'logging', 'throws', 'returns', 'reassignment']
data = {
    'strategy': strategies,
    'perc_handlers': [
        perc_empty_handlers(df),
        perc_no_usage_arg_overall(df),
        perc_one_statement_handlers(df),
        perc_log_handlers(df),
        perc_throw_statement(df),
        perc_return_statement(df),
        perc_reassigning(df)

    ],
    'perc_uncaught_exception': [
        percentage(empty, total),
        percentage(no_usage, total),
        percentage(unique_stmt, total),
        percentage(unique_console, total),
        percentage(throws, total),
        percentage(returns, total),
        None
    ]
}

file_name_out = config.DATA['result_rq_1_2'] + 'result-strategies-rq1-2.csv'
df_strategies = pd.DataFrame(data=data)
df_strategies.to_csv(file_name_out)


unique_error_callback = df['callbacksNumberOfFunctionsWithUniqueErrorArg'].sum()
no_usage_callback = df['callbacksNumberOfFunctionsNoUsageOfErrorArgumentWithUniqueErrorArg'].sum()

mechs = ['try_catch', 'promises', 'async_await', 'events', 'callback']
data2 = {
    'mech': mechs,
    'empty': [ # 'Empty handlers per total of handlers (%):'
        get_percentage(df, ['tryCatchNumberOfCatches'], ['tryCatchNumberOfEmptyCatches']),
        get_percentage(df, ['promiseNumberOfPromiseCatches'], ['promiseNumberOfEmptyFunctionsOnPromiseCatches']),
        get_percentage(df, ['asyncAwaitNumberOfCatches'], ['asyncAwaitNumberOfEmptyCatches']),
        get_percentage(df, ['eventsNumberOfEventMethodsOn', 'eventsNumberOfEventMethodsOnce'],
                       ['eventsNumberOfEventOnEmptyFunctions', 'eventsNumberOfEventOnceEmptyFunctions']),
        get_percentage(df, ['callbacksNumberOfCallbackErrorFunctions'], ['callbacksNumberOfEmptyCallbacks'])
    ],
    # 'logging': [
    #
    # ],
    'no_usage_param': [ # No usage of error parameter per total handlers (%)
        get_percentage(df, ['tryCatchNumberOfCatches'], ['tryCatchNumberOfCatchesNoUsageOfErrorArgument']),
        get_percentage(df, ['promiseNumberOfPromiseCatches'], ['promiseNumberOfFunctionsOnCatchesNoUsageOfErrorArgument']),
        get_percentage(df, ['asyncAwaitNumberOfCatches'], ['asyncAwaitNumberOfCatchesNoUsageOfErrorArgument']),
        get_percentage(df, ['eventsNumberOfEventMethodsOn', 'eventsNumberOfEventMethodsOnce'],
                       ['eventsNumberOfEventOnNoUsageOfErrorArgument', 'eventsNumberOfEventOnceNoUsageOfErrorArgument']),
        get_percentage(df, ['callbacksNumberOfCallbackErrorFunctions'], ['callbacksNumberOfFunctionsNoUsageOfErrorArgument'])
    ],
    'throws': [
        get_percentage(df, ['tryCatchNumberOfCatches'], ['tryCatchNumberOfCatchesThatThrows']),
        get_percentage(df, ['promiseNumberOfPromiseCatches'], ['promiseNumberOfCatchesThatThrows']),
        get_percentage(df, ['asyncAwaitNumberOfCatches'], ['asyncAwaitNumberOfHandlersThatThrows']),
        get_percentage(df, ['eventsNumberOfEventMethodsOn', 'eventsNumberOfEventMethodsOnce'], ['eventsNumberOfHandlersThatThrows']),
        get_percentage(df, ['callbacksNumberOfCallbackErrorFunctions'], ['callbacksNumberOfHandlersThatThrows'])
    ],
    'throws_literal': [
        get_percentage(df, ['tryCatchNumberOfCatches'], ['tryCatchNumberOfCatchesThatThrowsLiteral']),
        get_percentage(df, ['promiseNumberOfPromiseCatches'], ['promiseNumberOfCatchesThatThrowsLiteral']),
        get_percentage(df, ['asyncAwaitNumberOfCatches'], ['asyncAwaitNumberOfHandlersThatThrowsLiteral']),
        get_percentage(df, ['eventsNumberOfEventMethodsOn', 'eventsNumberOfEventMethodsOnce'], ['eventsNumberOfHandlersThatThrowsLiteral']),
        get_percentage(df, ['callbacksNumberOfCallbackErrorFunctions'], ['callbacksNumberOfHandlersThatThrowsLiteral'])
    ],
    'throws_literal_only': [
        get_percentage(df, ['tryCatchNumberOfCatches'], ['tryCatchNumberOfCatchesThatThrowsLiteralOnly']),
        get_percentage(df, ['promiseNumberOfPromiseCatches'], ['promiseNumberOfCatchesThatThrowsLiteralOnly']),
        get_percentage(df, ['asyncAwaitNumberOfCatches'], ['asyncAwaitNumberOfHandlersThatThrowsLiteralOnly']),
        get_percentage(df, ['eventsNumberOfEventMethodsOn', 'eventsNumberOfEventMethodsOnce'], ['eventsNumberOfHandlersThatThrowsLiteralOnly']),
        get_percentage(df, ['callbacksNumberOfCallbackErrorFunctions'], ['callbacksNumberOfHandlersThatThrowsLiteralOnly'])
    ],
    'throws_undefined': [
        get_percentage(df, ['tryCatchNumberOfCatches'], ['tryCatchNumberOfCatchesThatThrowsUndefined']),
        get_percentage(df, ['promiseNumberOfPromiseCatches'], ['promiseNumberOfCatchesThatThrowsUndefined']),
        get_percentage(df, ['asyncAwaitNumberOfCatches'], ['asyncAwaitNumberOfHandlersThatThrowsUndefined']),
        get_percentage(df, ['eventsNumberOfEventMethodsOn', 'eventsNumberOfEventMethodsOnce'], ['eventsNumberOfHandlersThatThrowsUndefined']),
        get_percentage(df, ['callbacksNumberOfCallbackErrorFunctions'], ['callbacksNumberOfHandlersThatThrowsUndefined'])
    ],
    'throws_undefined_only': [
        get_percentage(df, ['tryCatchNumberOfCatches'], ['tryCatchNumberOfCatchesThatThrowsUndefinedOnly']),
        get_percentage(df, ['promiseNumberOfPromiseCatches'], ['promiseNumberOfCatchesThatThrowsUndefinedOnly']),
        get_percentage(df, ['asyncAwaitNumberOfCatches'], ['asyncAwaitNumberOfHandlersThatThrowsUndefinedOnly']),
        get_percentage(df, ['eventsNumberOfEventMethodsOn', 'eventsNumberOfEventMethodsOnce'], ['eventsNumberOfHandlersThatThrowsUndefinedOnly']),
        get_percentage(df, ['callbacksNumberOfCallbackErrorFunctions'], ['callbacksNumberOfHandlersThatThrowsUndefinedOnly'])
    ],
    'one_stmt': [  # Logging on console per total handlers (%)
        get_percentage(df, ['tryCatchNumberOfCatches'], ['tryCatchNumberOfCatchesWithUniqueConsole']),
        get_percentage(df, ['promiseNumberOfPromiseCatches'], ['promiseNumberOfCatchesWithUniqueConsole']),
        get_percentage(df, ['asyncAwaitNumberOfCatches'], ['asyncAwaitNumberOfCatchesWithUniqueConsole']),
        get_percentage(df, ['eventsNumberOfEventMethodsOn', 'eventsNumberOfEventMethodsOnce'],
                       ['eventsNumberOfEventOnWithUniqueConsole', 'eventsNumberOfEventOnceWithUniqueConsole']),
        get_percentage(df, ['callbacksNumberOfCallbackErrorFunctions'], ['callbacksNumberOfFunctionsWithUniqueConsole'])
    ],
    'reassignment': [
        get_percentage(df, ['tryCatchNumberOfCatches'], ['tryCatchNumberOfErrorReassigning']),
        get_percentage(df, ['promiseNumberOfPromiseCatches'], ['promiseNumberOfErrorReassigning']),
        None,
        get_percentage(df, ['eventsNumberOfEventMethodsOn', 'eventsNumberOfEventMethodsOnce'],
                       ['eventsNumberOfErrorReassigning']),
        get_percentage(df, ['callbacksNumberOfCallbackErrorFunctions'],
                       ['callbacksNumberOfErrorReassigning'])
    ],
    'callback_unique_param_no_usage': [
        None, None, None, None, percentage(no_usage_callback, unique_error_callback)

    ],
    'uncaught_exception_event_throws': [
        None, None, None, None,
        percentage(df['eventsNumberOfUncaughtExceptionReturns'].sum(), df['eventsNumberOfEventUncaughtException'].sum())

    ]
}

file_name_strat = config.DATA['result_rq_1_2'] + 'result-strategies2-rq1-2.csv'
df_strategies2 = pd.DataFrame(data=data2)
df_strategies2.to_csv(file_name_strat)
