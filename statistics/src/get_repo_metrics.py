import pandas as pd
import glob
import os
import config


def get_filename(path):
    return os.path.basename(os.path.normpath(path))


client_folder = config.DATA['result'] + 'client/'
server_folder = config.DATA['result'] + 'server/'
columns = ["repo","numberOfLogicalLines","numberOfPhysicalLines","numberOfStrictModeGlobal","numberOfStrictModeLocal",
           "numberOfWindowOnError","numberOfWindowOnErrorLines","numberOfWindowOnErrorEmptyHandler",
           "numberOfWindowOnErrorOnNoUsageOfErrorArgument","numberOfWindowOnErrorUniqueStatement",
           "numberOfWindowOnErrorUniqueConsole","numberOfWindowOnErrorThrows","numberOfWindowOnErrorThatThrows",
           "numberOfWindowOnErrorRethrows","numberOfWindowOnErrorThatRethrows","numberOfWindowOnErrorReturns",
           "numberOfWindowAddEventListener","numberOfWindowAddEventListenerLines","numberOfWindowAddEventListenerEmptyHandler",
           "numberOfWindowAddEventListenerNoUsageOfErrorArgument","numberOfWindowAddEventListenerThatThrows",
           "numberOfWindowAddEventListenerRethrows","numberOfWindowAddEventListenerThatRethrows",
           "numberOfWindowAddEventListenerUniqueStatement","numberOfWindowAddEventListenerUniqueConsole",
           "numberOfWindowAddEventListenerThrows","numberOfWindowAddEventListenerReturns","numberOfElementOnError",
           "numberOfElementOnErrorLines","numberOfElementOnErrorEmptyHandler","numberOfElementOnErrorOnNoUsageOfErrorArgument",
           "numberOfElementOnErrorUniqueStatement","numberOfElementOnErrorUniqueConsole","numberOfElementOnErrorThrows",
           "numberOfElementOnErrorThatThrows","numberOfElementOnErrorRethrows","numberOfElementOnErrorThatRethrows",
           "numberOfElementOnErrorReturns","tryCatchNumberOfTries","tryCatchNumberOfEmptyTries","tryCatchNumberOfTriesLines",
           "tryCatchNumberOfTriesWithUniqueStatement","tryCatchNumberOfCatches","tryCatchNumberOfEmptyCatches",
           "tryCatchNumberOfCatchesNoUsageOfErrorArgument","tryCatchNumberOfCatchesLines","tryCatchNumberOfCatchesWithUniqueConsole",
           "tryCatchNumberOfCatchesWithUniqueStatement","tryCatchNumberOfContinuesOnCatches","tryCatchNumberOfThrowErrorsOnCatches",
           "tryCatchNumberOfCatchesThatThrows","tryCatchNumberOfRethrowsOnCatches","tryCatchNumberOfCatchesThatRethrows",
           "tryCatchNumberOfThrows","tryCatchNumberOfThrowsLiteral","tryCatchNumberOfThrowsErrorObjects","tryCatchNumberOfThrowPrimitiveTypesOnCatches","tryCatchNumberOfReturnsOnCatches","tryCatchNumberOfReturnsAnErrorOnCatches","tryCatchNumberOfBreaksOnCatches","tryCatchNumberOfBreaksOnCatchesUniqueStatement","tryCatchNumberOfFinallies","tryCatchNumberOfFinalliesLines","promiseNumberOfPromises","promiseNumberOfResolves","promiseNumberOfRejects","promiseNumberOfPromiseThens","promiseNumberOfPromiseThenFulfilledLines","promiseNumberOfPromiseThenRejectedLines","promiseNumberOfPromiseCatches","promiseNumberOfPromiseCatchesLines","promiseNumberOfEmptyFunctionsOnPromiseCatches","promiseNumberOfFunctionsOnCatchesNoUsageOfErrorArgument","promiseNumberOfCatchesWithNoArg","promiseNumberOfCatchesFunctionWithNoArg","promiseNumberOfCatchesWithUniqueConsole","promiseNumberOfCatchesWithUniqueStatement","promiseNumberOfThrowErrorsOnCatches","promiseNumberOfPromisesThatThrows","promiseNumberOfRethrowsOnCatches","promiseNumberOfPromisesThatRethrows","promiseNumberOfThrowPrimitiveTypesOnCatches","promiseNumberOfReturnsOnCatches","promiseNumberOfReturnsAnErrorOnCatches","promiseNumberOfBreaksOnCatches","promiseNumberOfChainingCatches","promiseNumberOfNonCaughtPromises","promiseNumberOfPromiseRaces","promiseNumberOfPromiseAll","asyncAwaitNumberOfAsyncs","asyncAwaitNumberOfAwaits","asyncAwaitNumberOfTries","asyncAwaitNumberOfTriesLines","asyncAwaitNumberOfCatches","asyncAwaitNumberOfEmptyCatches","asyncAwaitNumberOfCatchesNoUsageOfErrorArgument","asyncAwaitNumberOfCatchesLines","asyncAwaitNumberOfCatchesWithUniqueConsole","asyncAwaitNumberOfCatchesWithUniqueStatement","asyncAwaitNumberOfCatchesThrowError","asyncAwaitNumberOfAwaitErrorArgsOnCatches","asyncAwaitNumberOfCatchesThatThrows","asyncAwaitNumberOfCatchesRethrowError","asyncAwaitNumberOfCatchesThatThrowsNonErrorArg","asyncAwaitNumberOfThrowErrorsOnCatches","asyncAwaitNumberOfThrowsNonErrorArg","asyncAwaitNumberOfRethrowsOnCatches","asyncAwaitNumberOfCatchesThatRethrows","asyncAwaitNumberOfReturnsOnCatches","asyncAwaitNumberOfReturnsAnErrorOnCatches","asyncAwaitNumberOfCatchesThatReturnsAnError","asyncAwaitNumberOfBreaksOnCatches","asyncAwaitNumberOfBreaksOnCatchesUniqueStatement","asyncAwaitNumberOfFinallies","asyncAwaitNumberOfFinalliesLines","eventsNumberOfEventMethodsOn","eventsNumberOfEventMethodsOnce","eventsNumberOfEventMethodsEmit","eventsNumberOfEventOnLines","eventsNumberOfEventOnEmptyFunctions","eventsNumberOfEventOnNoUsageOfErrorArgument","eventsNumberOfEventOnWithUniqueConsole","eventsNumberOfEventOnWithUniqueStatement","eventsNumberOfEventOnceLines","eventsNumberOfEventOnceEmptyFunctions","eventsNumberOfEventOnceNoUsageOfErrorArgument","eventsNumberOfEventOnceWithUniqueConsole","eventsNumberOfEventOnceWithUniqueStatement","eventsNumberOfEventEmitLines","eventsNumberOfThrowErrorsOnCatches","eventsNumberOfEventsThatThrows","eventsNumberOfThrowPrimitiveTypesOnCatches","eventsNumberOfReturnsOnCatches","eventsNumberOfReturnsAnErrorOnCatches","eventsNumberOfBreaksOnCatches","eventsNumberOfRethrowsOnCatches","eventsNumberOfEventsThatRethrows","eventsNumberOfEventUncaughtException","eventsNumberOfEventUncaughtExceptionLines","eventsNumberOfUncaughtExceptionEmpty","eventsNumberOfUncaughtExceptionNoUsageOfErrorArgument","eventsNumberOfUncaughtExceptionWithUniqueStatement","eventsNumberOfUncaughtExceptionWithUniqueConsole","eventsNumberOfUncaughtExceptionReturns","eventsNumberOfUncaughtExceptionThrows","eventsNumberOfEventUnhandledRejection","eventsTotalOfStringEvents","eventsTotalOfEventsExceptStringType","callbacksNumberOfCallbackErrorFunctions","callbacksNumberOfFirstErrorArgFunctions","callbacksNumberOfEmptyCallbacks","callbacksNumberOfFunctionsNoUsageOfErrorArgument","callbacksNumberOfFunctionsWithUniqueConsole","callbacksNumberOfFunctionsWithUniqueStatement","callbacksNumberOfFunctionsWithUniqueErrorArg","callbacksNumberOfEmptyFunctionsWithUniqueErrorArg","callbacksNumberOfFunctionsNoUsageOfErrorArgumentWithUniqueErrorArg","callbacksNumberOfFunctionsWithUniqueErrorArgWithUniqueConsole","callbacksNumberOfFunctionsWithUniqueErrorArgWithUniqueStatement","callbacksNumberOfLinesOfFunctionsWithUniqueErrorArg","callbacksNumberOfThrows","callbacksNumberOfCallbacksThatThrows","callbacksNumberOfRethrows","callbacksNumberOfCallbacksThatRethrows","callbacksNumberOfReturnsOnCatches","callbacksNumberOfReturnsAnErrorOnCatches","callbacksNumberOfCatchesThatReturns","callbacksNumberOfCatchesThatReturnsAnErrorOnCatches","callbacksNumberOfBreaksOnCatches","callbacksNumberOfLines"]


def group_by_repo(repo_filename, folder):
    df_total = pd.DataFrame(columns=columns)
    df_total.set_index("repo")
    for file in glob.glob(os.path.join(folder, '*.csv')):
        print(file)
        df = pd.read_csv(file, sep=',')
        df2 = df.sum()
        df2['repo'] = get_filename(file)
        df_total = df_total.append(df2, ignore_index=True)
    df_total.set_index('repo', inplace=True)
    df_total.to_csv(repo_filename)


client_repo = config.DATA['result'] + 'result-repo-client.csv'
server_repo = config.DATA['result'] + 'result-repo-server.csv'
group_by_repo(client_repo, config.DATA['result'] + 'client')
group_by_repo(server_repo, config.DATA['result'] + 'server')
