import pandas as pd
import statistics.src.constants as config


def percentage(partial, total):
    return (100*partial)/total


def sum_metrics(df, metrics):
    total = 0
    for metric in metrics:
        total += df[metric].sum()
    return total


def get_ratio(df, total_list, partial_list):
    total = sum_metrics(df, total_list)
    partial = sum_metrics(df, partial_list)
    ratio = partial / float(total)
    return "{:.5f}".format(ratio)



def perc_empty_handlers(df):
    total = ['tryCatchNumberOfCatches', 'promiseNumberOfPromiseCatches', 'asyncAwaitNumberOfCatches',
             'eventsNumberOfEventMethodsOn', 'eventsNumberOfEventMethodsOnce']
    partial = ['tryCatchNumberOfEmptyCatches','promiseNumberOfEmptyFunctionsOnPromiseCatches',
               'asyncAwaitNumberOfEmptyCatches','eventsNumberOfEventOnEmptyFunctions',
               'eventsNumberOfEventOnceEmptyFunctions']
    return get_ratio(df, total, partial)


def perc_no_usage_arg_overall(df):
    total = ['tryCatchNumberOfCatches', 'promiseNumberOfPromiseCatches', 'asyncAwaitNumberOfCatches',
             'eventsNumberOfEventMethodsOn', 'eventsNumberOfEventMethodsOnce']
    partial = ['tryCatchNumberOfCatchesNoUsageOfErrorArgument', 'promiseNumberOfFunctionsOnCatchesNoUsageOfErrorArgument',
               'asyncAwaitNumberOfCatchesNoUsageOfErrorArgument', 'eventsNumberOfEventOnNoUsageOfErrorArgument',
               'eventsNumberOfEventOnceNoUsageOfErrorArgument', 'callbacksNumberOfFunctionsNoUsageOfErrorArgument']
    return get_ratio(df, total, partial)


def perc_log_handlers(df):
    total = ['tryCatchNumberOfCatches', 'promiseNumberOfPromiseCatches', 'asyncAwaitNumberOfCatches',
             'eventsNumberOfEventMethodsOn', 'eventsNumberOfEventMethodsOnce']

    partial = ['tryCatchNumberOfCatchesWithUniqueConsole', 'promiseNumberOfCatchesWithUniqueConsole',
                'asyncAwaitNumberOfCatchesWithUniqueConsole', 'eventsNumberOfEventOnWithUniqueConsole',
                'eventsNumberOfEventOnceWithUniqueConsole']
    return get_ratio(df, total, partial)


def perc_one_statement_handlers(df):
    total = ['tryCatchNumberOfCatches', 'promiseNumberOfPromiseCatches',
                         'asyncAwaitNumberOfCatches', 'eventsNumberOfEventMethodsOn',
                         'eventsNumberOfEventMethodsOnce']

    partial = ['tryCatchNumberOfCatchesWithUniqueStatement', 'promiseNumberOfCatchesWithUniqueStatement',
                           'asyncAwaitNumberOfCatchesWithUniqueStatement', 'eventsNumberOfEventOnWithUniqueStatement',
                           'eventsNumberOfEventOnceWithUniqueStatement']
    return get_ratio(df, total, partial)


def perc_throw_statement(df):
    total = ['tryCatchNumberOfCatches', 'promiseNumberOfPromiseCatches',
                         'asyncAwaitNumberOfCatches', 'callbacksNumberOfCallbackErrorFunctions', 
                         'eventsNumberOfEventMethodsOn', 'eventsNumberOfEventMethodsOnce']

    partial = ['tryCatchNumberOfCatchesThatThrows', 'promiseNumberOfCatchesThatThrows',
                           'asyncAwaitNumberOfHandlersThatThrows', 'callbacksNumberOfHandlersThrows',
                           'eventsNumberOfHandlersThatThrows']
    return get_ratio(df, total, partial)


def perc_return_statement(df):
    total = ['tryCatchNumberOfCatches', 'promiseNumberOfPromiseCatches',
                         'asyncAwaitNumberOfCatches', 'callbacksNumberOfCallbackErrorFunctions',
                         'eventsNumberOfEventMethodsOn', 'eventsNumberOfEventMethodsOnce']

    partial = ['tryCatchNumberOfCatchesThatReturns', 'promiseNumberOfCatchesThatReturns',
                           'asyncAwaitNumberOfHandlersThatReturns', 'callbacksNumberOfHandlersThatReturns',
                           'eventsNumberOfHandlersThatReturns']
    return get_ratio(df, total, partial)


def perc_reassigning_handlers(df):
    total = ['tryCatchNumberOfCatches', 'promiseNumberOfPromiseCatches', 'asyncAwaitNumberOfCatches',
             'eventsNumberOfEventMethodsOn', 'eventsNumberOfEventMethodsOnce']
    partial = ['tryCatchNumberOfEmptyCatches','promiseNumberOfEmptyFunctionsOnPromiseCatches',
               'asyncAwaitNumberOfEmptyCatches','eventsNumberOfEventOnEmptyFunctions',
               'eventsNumberOfEventOnceEmptyFunctions']
    return get_ratio(df, total, partial)


def perc_reassigning(df):
    # 'Reassiging an error parameter per total handlers (%)'

    total = ['tryCatchNumberOfCatches', 'promiseNumberOfPromiseCatches', 'eventsNumberOfEventMethodsOn',
            'eventsNumberOfEventMethodsOnce', 'callbacksNumberOfCallbackErrorFunctions']
    partial = ['tryCatchNumberOfErrorReassigning', 'promiseNumberOfErrorReassigning', 'eventsNumberOfErrorReassigning',
            'callbacksNumberOfErrorReassigning']
    return get_ratio(df, total, partial)


# def triangulation():
#   About the handlers
# Triangulation: the presence of a general handler that:
#  - A callback throws an exception
# - An event 'error' is thrown
# - In these cases,
# - In these cases, depending on how frequent they are, it may be worth looking manually if there are specific handlers

filepath = config.RESULT_INFO + 'result-class.csv'
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

file_name_out = config.RESULT_RQ_1_2 + 'result-strategies-rq1-2.csv'
df_strategies = pd.DataFrame(data=data)
df_strategies.to_csv(file_name_out)


unique_error_callback = df['callbacksNumberOfFunctionsWithUniqueErrorArg'].sum()
no_usage_callback = df['callbacksNumberOfFunctionsNoUsageOfErrorArgumentWithUniqueErrorArg'].sum()

mechs = ['try_catch', 'promises', 'async_await', 'events', 'callback']
data2 = {
    'mech': mechs,
    'empty': [ # 'Empty handlers per total of handlers (%):'
        get_ratio(df, ['tryCatchNumberOfCatches'], ['tryCatchNumberOfEmptyCatches']),
        get_ratio(df, ['promiseNumberOfPromiseCatches'], ['promiseNumberOfEmptyFunctionsOnPromiseCatches']),
        get_ratio(df, ['asyncAwaitNumberOfCatches'], ['asyncAwaitNumberOfEmptyCatches']),
        get_ratio(df, ['eventsNumberOfEventMethodsOn', 'eventsNumberOfEventMethodsOnce'],
                  ['eventsNumberOfEventOnEmptyFunctions', 'eventsNumberOfEventOnceEmptyFunctions']),
        get_ratio(df, ['callbacksNumberOfCallbackErrorFunctions'], ['callbacksNumberOfEmptyCallbacks'])
    ],
    'logging': [
        get_ratio(df, ['tryCatchNumberOfCatches'], ['tryCatchNumberOfCatchesWithUniqueConsole']),
        get_ratio(df, ['promiseNumberOfPromiseCatches'], ['promiseNumberOfCatchesWithUniqueConsole']),
        get_ratio(df, ['asyncAwaitNumberOfCatches'], ['asyncAwaitNumberOfCatchesWithUniqueConsole']),
        get_ratio(df, ['eventsNumberOfEventMethodsOn', 'eventsNumberOfEventMethodsOnce'],
                  ['eventsNumberOfEventOnWithUniqueConsole', 'eventsNumberOfEventOnceWithUniqueConsole']),
        get_ratio(df, ['callbacksNumberOfCallbackErrorFunctions'], ['callbacksNumberOfFunctionsWithUniqueConsole'])
    ],
    'no_usage_param': [ # No usage of error parameter per total handlers (%)
        get_ratio(df, ['tryCatchNumberOfCatches'], ['tryCatchNumberOfCatchesNoUsageOfErrorArgument']),
        get_ratio(df, ['promiseNumberOfPromiseCatches'], ['promiseNumberOfFunctionsOnCatchesNoUsageOfErrorArgument']),
        get_ratio(df, ['asyncAwaitNumberOfCatches'], ['asyncAwaitNumberOfCatchesNoUsageOfErrorArgument']),
        get_ratio(df, ['eventsNumberOfEventMethodsOn', 'eventsNumberOfEventMethodsOnce'],
                  ['eventsNumberOfEventOnNoUsageOfErrorArgument', 'eventsNumberOfEventOnceNoUsageOfErrorArgument']),
        get_ratio(df, ['callbacksNumberOfCallbackErrorFunctions'], ['callbacksNumberOfFunctionsNoUsageOfErrorArgument'])
    ],
    'throws': [
        get_ratio(df, ['tryCatchNumberOfCatches'], ['tryCatchNumberOfCatchesThatThrows']),
        get_ratio(df, ['promiseNumberOfPromiseCatches'], ['promiseNumberOfCatchesThatThrows']),
        get_ratio(df, ['asyncAwaitNumberOfCatches'], ['asyncAwaitNumberOfHandlersThatThrows']),
        get_ratio(df, ['eventsNumberOfEventMethodsOn', 'eventsNumberOfEventMethodsOnce'], ['eventsNumberOfHandlersThatThrows']),
        get_ratio(df, ['callbacksNumberOfCallbackErrorFunctions'], ['callbacksNumberOfHandlersThatThrows'])
    ],
    'throws_literal': [
        get_ratio(df, ['tryCatchNumberOfCatches'], ['tryCatchNumberOfCatchesThatThrowsLiteral']),
        get_ratio(df, ['promiseNumberOfPromiseCatches'], ['promiseNumberOfCatchesThatThrowsLiteral']),
        get_ratio(df, ['asyncAwaitNumberOfCatches'], ['asyncAwaitNumberOfHandlersThatThrowsLiteral']),
        get_ratio(df, ['eventsNumberOfEventMethodsOn', 'eventsNumberOfEventMethodsOnce'],
                  ['eventsNumberOfHandlersThatThrowsLiteral']),
        get_ratio(df, ['callbacksNumberOfCallbackErrorFunctions'], ['callbacksNumberOfHandlersThatThrowsLiteral'])
    ],
    'throws_literal_only': [
        get_ratio(df, ['tryCatchNumberOfCatches'], ['tryCatchNumberOfCatchesThatThrowsLiteralOnly']),
        get_ratio(df, ['promiseNumberOfPromiseCatches'], ['promiseNumberOfCatchesThatThrowsLiteralOnly']),
        get_ratio(df, ['asyncAwaitNumberOfCatches'], ['asyncAwaitNumberOfHandlersThatThrowsLiteralOnly']),
        get_ratio(df, ['eventsNumberOfEventMethodsOn', 'eventsNumberOfEventMethodsOnce'],
                  ['eventsNumberOfHandlersThatThrowsLiteralOnly']),
        get_ratio(df, ['callbacksNumberOfCallbackErrorFunctions'], ['callbacksNumberOfHandlersThatThrowsLiteralOnly'])
    ],
    'throws_undefined': [
        get_ratio(df, ['tryCatchNumberOfCatches'], ['tryCatchNumberOfCatchesThatThrowsUndefined']),
        get_ratio(df, ['promiseNumberOfPromiseCatches'], ['promiseNumberOfCatchesThatThrowsUndefined']),
        get_ratio(df, ['asyncAwaitNumberOfCatches'], ['asyncAwaitNumberOfHandlersThatThrowsUndefined']),
        get_ratio(df, ['eventsNumberOfEventMethodsOn', 'eventsNumberOfEventMethodsOnce'],
                  ['eventsNumberOfHandlersThatThrowsUndefined']),
        get_ratio(df, ['callbacksNumberOfCallbackErrorFunctions'], ['callbacksNumberOfHandlersThatThrowsUndefined'])
    ],
    'throws_undefined_only': [
        get_ratio(df, ['tryCatchNumberOfCatches'], ['tryCatchNumberOfCatchesThatThrowsUndefinedOnly']),
        get_ratio(df, ['promiseNumberOfPromiseCatches'], ['promiseNumberOfCatchesThatThrowsUndefinedOnly']),
        get_ratio(df, ['asyncAwaitNumberOfCatches'], ['asyncAwaitNumberOfHandlersThatThrowsUndefinedOnly']),
        get_ratio(df, ['eventsNumberOfEventMethodsOn', 'eventsNumberOfEventMethodsOnce'],
                  ['eventsNumberOfHandlersThatThrowsUndefinedOnly']),
        get_ratio(df, ['callbacksNumberOfCallbackErrorFunctions'], ['callbacksNumberOfHandlersThatThrowsUndefinedOnly'])
    ],
    'throws_null': [
        get_ratio(df, ['tryCatchNumberOfCatches'], ['tryCatchNumberOfCatchesThatThrowsNull']),
        get_ratio(df, ['promiseNumberOfPromiseCatches'], ['promiseNumberOfCatchesThatThrowsNull']),
        get_ratio(df, ['asyncAwaitNumberOfCatches'], ['asyncAwaitNumberOfHandlersThatThrowsNull']),
        get_ratio(df, ['eventsNumberOfEventMethodsOn', 'eventsNumberOfEventMethodsOnce'],
                  ['eventsNumberOfHandlersThatThrowsNull']),
        get_ratio(df, ['callbacksNumberOfCallbackErrorFunctions'], ['callbacksNumberOfHandlersThatThrowsNull'])
    ],
    'throws_null_only': [
        get_ratio(df, ['tryCatchNumberOfCatches'], ['tryCatchNumberOfCatchesThatThrowsNullOnly']),
        get_ratio(df, ['promiseNumberOfPromiseCatches'], ['promiseNumberOfCatchesThatThrowsNullOnly']),
        get_ratio(df, ['asyncAwaitNumberOfCatches'], ['asyncAwaitNumberOfHandlersThatThrowsNullOnly']),
        get_ratio(df, ['eventsNumberOfEventMethodsOn', 'eventsNumberOfEventMethodsOnce'],
                  ['eventsNumberOfHandlersThatThrowsNullOnly']),
        get_ratio(df, ['callbacksNumberOfCallbackErrorFunctions'], ['callbacksNumberOfHandlersThatThrowsNullOnly'])
    ],
    'throws_error_object': [
        get_ratio(df, ['tryCatchNumberOfCatches'], ['tryCatchNumberOfCatchesThatThrowsErrorObject']),
        get_ratio(df, ['promiseNumberOfPromiseCatches'], ['promiseNumberOfCatchesThatThrowsErrorObject']),
        get_ratio(df, ['asyncAwaitNumberOfCatches'], ['asyncAwaitNumberOfHandlersThatThrowsErrorObject']),
        get_ratio(df, ['eventsNumberOfEventMethodsOn', 'eventsNumberOfEventMethodsOnce'],
                  ['eventsNumberOfHandlersThatThrowsErrorObject']),
        get_ratio(df, ['callbacksNumberOfCallbackErrorFunctions'], ['callbacksNumberOfHandlersThatThrowsErrorObject'])
    ],
    'rethrows': [
        get_ratio(df, ['tryCatchNumberOfCatches'], ['tryCatchNumberOfCatchesRethrows']),
        get_ratio(df, ['promiseNumberOfPromiseCatches'], ['promiseNumberOfCatchesRethrows']),
        get_ratio(df, ['asyncAwaitNumberOfCatches'], ['asyncAwaitNumberOfHandlersRethrows']),
        get_ratio(df, ['eventsNumberOfEventMethodsOn', 'eventsNumberOfEventMethodsOnce'],
                  ['eventsNumberOfHandlersRethrows']),
        get_ratio(df, ['callbacksNumberOfCallbackErrorFunctions'], ['callbacksNumberOfHandlersRethrows'])
    ],
    'rethrows_only': [
        get_ratio(df, ['tryCatchNumberOfCatches'], ['tryCatchNumberOfCatchesThatRethrows']),
        get_ratio(df, ['promiseNumberOfPromiseCatches'], ['promiseNumberOfCatchesThatRethrows']),
        get_ratio(df, ['asyncAwaitNumberOfCatches'], ['asyncAwaitNumberOfHandlersThatRethrows']),
        get_ratio(df, ['eventsNumberOfEventMethodsOn', 'eventsNumberOfEventMethodsOnce'],
                  ['eventsNumberOfHandlersThatRethrows']),
        get_ratio(df, ['callbacksNumberOfCallbackErrorFunctions'], ['callbacksNumberOfHandlersThatRethrows'])
    ],
    'returns': [
        get_ratio(df, ['tryCatchNumberOfCatches'], ['tryCatchNumberOfCatchesReturns']),
        get_ratio(df, ['promiseNumberOfPromiseCatches'], ['promiseNumberOfCatchesReturns']),
        get_ratio(df, ['asyncAwaitNumberOfCatches'], ['asyncAwaitNumberOfHandlersReturns']),
        get_ratio(df, ['eventsNumberOfEventMethodsOn', 'eventsNumberOfEventMethodsOnce'],
                  ['eventsNumberOfHandlersReturns']),
        get_ratio(df, ['callbacksNumberOfCallbackErrorFunctions'], ['callbacksNumberOfHandlersReturns'])
    ],
    'returns_literal': [
        get_ratio(df, ['tryCatchNumberOfCatches'], ['tryCatchNumberOfCatchesReturnsLiteral']),
        get_ratio(df, ['promiseNumberOfPromiseCatches'], ['promiseNumberOfCatchesReturnsLiteral']),
        get_ratio(df, ['asyncAwaitNumberOfCatches'], ['asyncAwaitNumberOfHandlersReturnsLiteral']),
        get_ratio(df, ['eventsNumberOfEventMethodsOn', 'eventsNumberOfEventMethodsOnce'],
                  ['eventsNumberOfHandlersReturnsLiteral']),
        get_ratio(df, ['callbacksNumberOfCallbackErrorFunctions'], ['callbacksNumberOfHandlersReturnsLiteral'])
    ],
    'returns_error_object': [
        get_ratio(df, ['tryCatchNumberOfCatches'], ['tryCatchNumberOfCatchesReturnsErrorObject']),
        get_ratio(df, ['promiseNumberOfPromiseCatches'], ['promiseNumberOfCatchesReturnsErrorObject']),
        get_ratio(df, ['asyncAwaitNumberOfCatches'], ['asyncAwaitNumberOfHandlersReturnsErrorObject']),
        get_ratio(df, ['eventsNumberOfEventMethodsOn', 'eventsNumberOfEventMethodsOnce'],
                  ['eventsNumberOfHandlersReturnsErrorObject']),
        get_ratio(df, ['callbacksNumberOfCallbackErrorFunctions'], ['callbacksNumberOfHandlersReturnsErrorObject'])
    ],
    'returns_only': [
        get_ratio(df, ['tryCatchNumberOfCatches'], ['tryCatchNumberOfCatchesReturns']),
        get_ratio(df, ['promiseNumberOfPromiseCatches'], ['promiseNumberOfCatchesReturns']),
        get_ratio(df, ['asyncAwaitNumberOfCatches'], ['asyncAwaitNumberOfHandlersReturns']),
        get_ratio(df, ['eventsNumberOfEventMethodsOn', 'eventsNumberOfEventMethodsOnce'],
                  ['eventsNumberOfHandlersReturns']),
        get_ratio(df, ['callbacksNumberOfCallbackErrorFunctions'], ['callbacksNumberOfHandlersReturns'])
    ],
    'returns_literal_only': [
        get_ratio(df, ['tryCatchNumberOfCatches'], ['tryCatchNumberOfCatchesThatReturnsLiteral']),
        get_ratio(df, ['promiseNumberOfPromiseCatches'], ['promiseNumberOfCatchesThatReturnsLiteral']),
        get_ratio(df, ['asyncAwaitNumberOfCatches'], ['asyncAwaitNumberOfHandlersThatReturnsLiteral']),
        get_ratio(df, ['eventsNumberOfEventMethodsOn', 'eventsNumberOfEventMethodsOnce'],
                  ['eventsNumberOfHandlersThatReturnsLiteral']),
        get_ratio(df, ['callbacksNumberOfCallbackErrorFunctions'], ['callbacksNumberOfHandlersThatReturnsLiteral'])
    ],
    'returns_undefined_only': [
        get_ratio(df, ['tryCatchNumberOfCatches'], ['tryCatchNumberOfCatchesThatReturnsUndefined']),
        get_ratio(df, ['promiseNumberOfPromiseCatches'], ['promiseNumberOfCatchesThatReturnsUndefined']),
        get_ratio(df, ['asyncAwaitNumberOfCatches'], ['asyncAwaitNumberOfHandlersThatReturnsUndefined']),
        get_ratio(df, ['eventsNumberOfEventMethodsOn', 'eventsNumberOfEventMethodsOnce'],
                  ['eventsNumberOfHandlersThatReturnsUndefined']),
        get_ratio(df, ['callbacksNumberOfCallbackErrorFunctions'], ['callbacksNumberOfHandlersThatReturnsUndefined'])
    ],
    'returns_null_only': [
        get_ratio(df, ['tryCatchNumberOfCatches'], ['tryCatchNumberOfCatchesThatReturnsNull']),
        get_ratio(df, ['promiseNumberOfPromiseCatches'], ['promiseNumberOfCatchesThatReturnsNull']),
        get_ratio(df, ['asyncAwaitNumberOfCatches'], ['asyncAwaitNumberOfHandlersThatReturnsNull']),
        get_ratio(df, ['eventsNumberOfEventMethodsOn', 'eventsNumberOfEventMethodsOnce'],
                  ['eventsNumberOfHandlersThatReturnsNull']),
        get_ratio(df, ['callbacksNumberOfCallbackErrorFunctions'], ['callbacksNumberOfHandlersThatReturnsNull'])
    ],
    'returns_error_object_only': [
        get_ratio(df, ['tryCatchNumberOfCatches'], ['tryCatchNumberOfCatchesThatReturnsErrorObject']),
        get_ratio(df, ['promiseNumberOfPromiseCatches'], ['promiseNumberOfCatchesThatReturnsErrorObject']),
        get_ratio(df, ['asyncAwaitNumberOfCatches'], ['asyncAwaitNumberOfHandlersThatReturnsErrorObject']),
        get_ratio(df, ['eventsNumberOfEventMethodsOn', 'eventsNumberOfEventMethodsOnce'],
                  ['eventsNumberOfHandlersThatReturnsErrorObject']),
        get_ratio(df, ['callbacksNumberOfCallbackErrorFunctions'], ['callbacksNumberOfHandlersThatReturnsErrorObject'])
    ],
    'rereturn_only': [
        get_ratio(df, ['tryCatchNumberOfCatches'], ['tryCatchNumberOfCatchesThatRereturns']),
        get_ratio(df, ['promiseNumberOfPromiseCatches'], ['promiseNumberOfCatchesThatRereturns']),
        get_ratio(df, ['asyncAwaitNumberOfCatches'], ['asyncAwaitNumberOfHandlersThatRereturns']),
        get_ratio(df, ['eventsNumberOfEventMethodsOn', 'eventsNumberOfEventMethodsOnce'],
                  ['eventsNumberOfHandlersThatRereturns']),
        get_ratio(df, ['callbacksNumberOfCallbackErrorFunctions'], ['callbacksNumberOfHandlersThatRereturns'])
    ],
    'continues': [
        get_ratio(df, ['tryCatchNumberOfCatches'], ['tryCatchNumberOfCatchesContinues']),
        get_ratio(df, ['promiseNumberOfPromiseCatches'], ['promiseNumberOfCatchesContinues']),
        get_ratio(df, ['asyncAwaitNumberOfCatches'], ['asyncAwaitNumberOfHandlersContinues']),
        get_ratio(df, ['eventsNumberOfEventMethodsOn', 'eventsNumberOfEventMethodsOnce'],
                  ['eventsNumberOfHandlersContinues']),
        get_ratio(df, ['callbacksNumberOfCallbackErrorFunctions'], ['callbacksNumberOfHandlersContinues'])
    ],
    'continues_only': [
        get_ratio(df, ['tryCatchNumberOfCatches'], ['tryCatchNumberOfCatchesThatContinues']),
        get_ratio(df, ['promiseNumberOfPromiseCatches'], ['promiseNumberOfCatchesThatContinues']),
        get_ratio(df, ['asyncAwaitNumberOfCatches'], ['asyncAwaitNumberOfHandlersThatContinues']),
        get_ratio(df, ['eventsNumberOfEventMethodsOn', 'eventsNumberOfEventMethodsOnce'],
                  ['eventsNumberOfHandlersThatContinues']),
        get_ratio(df, ['callbacksNumberOfCallbackErrorFunctions'], ['callbacksNumberOfHandlersThatContinues'])
    ],
    'breaks': [
        get_ratio(df, ['tryCatchNumberOfCatches'], ['tryCatchNumberOfCatchesBreaks']),
        get_ratio(df, ['promiseNumberOfPromiseCatches'], ['promiseNumberOfCatchesBreaks']),
        get_ratio(df, ['asyncAwaitNumberOfCatches'], ['asyncAwaitNumberOfHandlersBreaks']),
        get_ratio(df, ['eventsNumberOfEventMethodsOn', 'eventsNumberOfEventMethodsOnce'],
                  ['eventsNumberOfHandlersBreaks']),
        get_ratio(df, ['callbacksNumberOfCallbackErrorFunctions'], ['callbacksNumberOfHandlersBreaks'])
    ],
    'breaks_only': [
        get_ratio(df, ['tryCatchNumberOfCatches'], ['tryCatchNumberOfCatchesThatBreaks']),
        get_ratio(df, ['promiseNumberOfPromiseCatches'], ['promiseNumberOfCatchesThatBreaks']),
        get_ratio(df, ['asyncAwaitNumberOfCatches'], ['asyncAwaitNumberOfHandlersThatBreaks']),
        get_ratio(df, ['eventsNumberOfEventMethodsOn', 'eventsNumberOfEventMethodsOnce'],
                  ['eventsNumberOfHandlersThatBreaks']),
        get_ratio(df, ['callbacksNumberOfCallbackErrorFunctions'], ['callbacksNumberOfHandlersThatBreaks'])
    ],
    'one_stmt': [  # Logging on console per total handlers (%)
        get_ratio(df, ['tryCatchNumberOfCatches'], ['tryCatchNumberOfCatchesWithUniqueConsole']),
        get_ratio(df, ['promiseNumberOfPromiseCatches'], ['promiseNumberOfCatchesWithUniqueConsole']),
        get_ratio(df, ['asyncAwaitNumberOfCatches'], ['asyncAwaitNumberOfCatchesWithUniqueConsole']),
        get_ratio(df, ['eventsNumberOfEventMethodsOn', 'eventsNumberOfEventMethodsOnce'],
                  ['eventsNumberOfEventOnWithUniqueConsole', 'eventsNumberOfEventOnceWithUniqueConsole']),
        get_ratio(df, ['callbacksNumberOfCallbackErrorFunctions'], ['callbacksNumberOfFunctionsWithUniqueConsole'])
    ],
    'reassignment': [
        get_ratio(df, ['tryCatchNumberOfCatches'], ['tryCatchNumberOfErrorReassigning']),
        get_ratio(df, ['promiseNumberOfPromiseCatches'], ['promiseNumberOfErrorReassigning']),
        None,
        get_ratio(df, ['eventsNumberOfEventMethodsOn', 'eventsNumberOfEventMethodsOnce'],
                  ['eventsNumberOfErrorReassigning']),
        get_ratio(df, ['callbacksNumberOfCallbackErrorFunctions'],
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


print(df['callbacksNumberOfCallbackErrorFunctions'].sum())
print(df['callbacksNumberOfHandlersReturns'].sum())

file_name_strat = config.RESULT_RQ_1_2 + 'result-strategies2-rq1-2.csv'
df_strategies2 = pd.DataFrame(data=data2)
df_strategies2.to_csv(file_name_strat)


titles = ['window.onerror', 'window.addEventListener', 'element.onerror']
data = {
    'global_methods': titles,
    'total': [
        df['numberOfWindowOnError'].sum(),
        df['numberOfWindowAddEventListener'].sum(),
        df['numberOfElementOnError'].sum()
    ],
    'lines': [
        df['numberOfWindowOnErrorLines'].sum(),
        df['numberOfWindowAddEventListenerLines'].sum(),
        df['numberOfElementOnErrorLines'].sum()
    ],
    'empty': [
        get_ratio(df, ['numberOfWindowOnError'], ['numberOfWindowOnErrorEmptyHandler']),
        get_ratio(df, ['numberOfWindowAddEventListener'], ['numberOfWindowAddEventListenerEmptyHandler']),
        get_ratio(df, ['numberOfElementOnError'], ['numberOfElementOnErrorEmptyHandler'])
    ],
    'no_usage_error_arg': [
        get_ratio(df, ['numberOfWindowOnError'], ['numberOfWindowOnErrorOnNoUsageOfErrorArgument']),
        get_ratio(df, ['numberOfWindowAddEventListener'], ['numberOfWindowAddEventListenerNoUsageOfErrorArgument']),
        get_ratio(df, ['numberOfElementOnError'], ['numberOfElementOnErrorOnNoUsageOfErrorArgument'])
    ],
    'one_stmt': [
        get_ratio(df, ['numberOfWindowOnError'], ['numberOfWindowOnErrorUniqueStatement']),
        get_ratio(df, ['numberOfWindowAddEventListener'], ['numberOfWindowAddEventListenerUniqueStatement']),
        get_ratio(df, ['numberOfElementOnError'], ['numberOfElementOnErrorUniqueStatement'])
    ],
    'logging': [
        get_ratio(df, ['numberOfWindowOnError'], ['numberOfWindowOnErrorUniqueConsole']),
        get_ratio(df, ['numberOfWindowAddEventListener'], ['numberOfWindowAddEventListenerUniqueConsole']),
        get_ratio(df, ['numberOfElementOnError'], ['numberOfElementOnErrorUniqueConsole'])
    ],
    'throws': [
        get_ratio(df, ['numberOfWindowOnError'], ['numberOfWindowOnErrorThrows']),
        get_ratio(df, ['numberOfWindowAddEventListener'], ['numberOfWindowAddEventListenerThrows']),
        get_ratio(df, ['numberOfElementOnError'], ['numberOfElementOnErrorThrows'])
    ],
    'throws_only': [
        get_ratio(df, ['numberOfWindowOnError'], ['numberOfWindowOnErrorThatThrows']),
        get_ratio(df, ['numberOfWindowAddEventListener'], ['numberOfWindowAddEventListenerThatThrows']),
        get_ratio(df, ['numberOfElementOnError'], ['numberOfElementOnErrorThatThrows'])
    ],
    'rethrows': [
        get_ratio(df, ['numberOfWindowOnError'], ['numberOfWindowOnErrorRethrows']),
        get_ratio(df, ['numberOfWindowAddEventListener'], ['numberOfWindowAddEventListenerRethrows']),
        get_ratio(df, ['numberOfElementOnError'], ['numberOfElementOnErrorRethrows'])
    ],
    'rethrows_only': [
        get_ratio(df, ['numberOfWindowOnError'], ['numberOfWindowOnErrorThatRethrows']),
        get_ratio(df, ['numberOfWindowAddEventListener'], ['numberOfWindowAddEventListenerThatRethrows']),
        get_ratio(df, ['numberOfElementOnError'], ['numberOfElementOnErrorThatRethrows'])
    ],
    'returns': [
        get_ratio(df, ['numberOfWindowOnError'], ['numberOfWindowOnErrorReturns']),
        get_ratio(df, ['numberOfWindowAddEventListener'], ['numberOfWindowAddEventListenerReturns']),
        get_ratio(df, ['numberOfElementOnError'], ['numberOfElementOnErrorReturns'])
    ],
    'returns_only': [
        get_ratio(df, ['numberOfWindowOnError'], ['numberOfWindowOnErrorThatReturns']),
        get_ratio(df, ['numberOfWindowAddEventListener'], ['numberOfWindowAddEventListenerThatReturns']),
        get_ratio(df, ['numberOfElementOnError'], ['numberOfElementOnErrorThatReturns'])
    ],
    'returns_literal': [
        get_ratio(df, ['numberOfWindowOnError'], ['numberOfWindowOnErrorThatReturnsLiteral']),
        get_ratio(df, ['numberOfWindowAddEventListener'], ['numberOfWindowAddEventListenerThatReturnsLiteral']),
        get_ratio(df, ['numberOfElementOnError'], ['numberOfElementOnErrorThatReturnsLiteral'])
    ],
    'continues': [
        get_ratio(df, ['numberOfWindowOnError'], ['numberOfWindowOnErrorContinues']),
        get_ratio(df, ['numberOfWindowAddEventListener'], ['numberOfWindowAddEventListenerContinues']),
        get_ratio(df, ['numberOfElementOnError'], ['numberOfElementOnErrorContinues'])
    ],
    'continues_only': [
        get_ratio(df, ['numberOfWindowOnError'], ['numberOfWindowOnErrorThatContinues']),
        get_ratio(df, ['numberOfWindowAddEventListener'], ['numberOfWindowAddEventListenerThatContinues']),
        get_ratio(df, ['numberOfElementOnError'], ['numberOfElementOnErrorThatContinues'])
    ],
    'breaks': [
        get_ratio(df, ['numberOfWindowOnError'], ['numberOfWindowOnErrorBreaks']),
        get_ratio(df, ['numberOfWindowAddEventListener'], ['numberOfWindowAddEventListenerBreaks']),
        get_ratio(df, ['numberOfElementOnError'], ['numberOfElementOnErrorBreaks'])
    ],
    'breaks_only': [
        get_ratio(df, ['numberOfWindowOnError'], ['numberOfWindowOnErrorThatBreaks']),
        get_ratio(df, ['numberOfWindowAddEventListener'], ['numberOfWindowAddEventListenerThatBreaks']),
        get_ratio(df, ['numberOfElementOnError'], ['numberOfElementOnErrorThatBreaks'])
    ]
}

file_name_strat_global = config.RESULT_RQ_1_2 + 'result-strategies-global-rq1-2.csv'
df_strategies_global = pd.DataFrame(data=data)
df_strategies_global.to_csv(file_name_strat_global)
