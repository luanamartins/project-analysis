import pandas as pd
import seaborn as sns
import config


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

    partial = ['tryCatchNumberOfCatchesThatThrows', 'promiseNumberOfPromisesThatThrows',
                           'asyncAwaitNumberOfCatchesThatThrows', 'callbacksNumberOfCallbacksThatThrows',
                           'eventsNumberOfEventsThatThrows']
    return get_percentage(df, total, partial)


def perc_empty_handlers_per_handler(df):
    # Empty try-catch
    total = ['tryCatchNumberOfCatches']
    empty = ['tryCatchNumberOfEmptyCatches']
    print('Empty try-catch perc: ' + str(get_percentage(df, total, empty)))

    # Empty promises
    total = ['promiseNumberOfPromiseCatches']
    empty = ['promiseNumberOfEmptyFunctionsOnPromiseCatches']
    print('Empty promises perc: ' + str(get_percentage(df, total, empty)))

    # Async-await
    total = ['asyncAwaitNumberOfCatches']
    empty = ['asyncAwaitNumberOfEmptyCatches']
    print('Empty async-await perc: ' + str(get_percentage(df, total, empty)))

    # Events
    total = ['eventsNumberOfEventMethodsOn', 'eventsNumberOfEventMethodsOnce']
    empty = ['eventsNumberOfEventOnEmptyFunctions', 'eventsNumberOfEventOnceEmptyFunctions']
    print('Empty events perc: ' + str(get_percentage(df, total, empty)))

    # Callback functions
    total = ['callbacksNumberOfCallbackErrorFunctions']
    empty = ['callbacksNumberOfEmptyCallbacks']
    print('Empty callback perc: ' + str(get_percentage(df, total, empty)))

def perc_unique_console(df):
    # try-catch
    total = ['tryCatchNumberOfCatches']
    empty = ['tryCatchNumberOfCatchesWithUniqueConsole']
    print('Unique console try-catch perc: ' + str(get_percentage(df, total, empty)))

    # promises
    total = ['promiseNumberOfPromiseCatches']
    empty = ['promiseNumberOfCatchesWithUniqueConsole']
    print('Unique console promises perc: ' + str(get_percentage(df, total, empty)))

    # Async-await
    total = ['asyncAwaitNumberOfCatches']
    empty = ['asyncAwaitNumberOfCatchesWithUniqueConsole']
    print('Unique console async-await perc: ' + str(get_percentage(df, total, empty)))

    # Events
    total = ['eventsNumberOfEventMethodsOn', 'eventsNumberOfEventMethodsOnce']
    empty = ['eventsNumberOfEventOnWithUniqueConsole', 'eventsNumberOfEventOnceWithUniqueConsole']
    print('Unique console events perc: ' + str(get_percentage(df, total, empty)))

    # Callback functions
    total = ['callbacksNumberOfCallbackErrorFunctions']
    empty = ['callbacksNumberOfFunctionsWithUniqueConsole']
    print('Unique console callback perc: ' + str(get_percentage(df, total, empty)))


def perc_no_usage_arg(df):
    # try-catch
    total = ['tryCatchNumberOfCatches']
    empty = ['tryCatchNumberOfCatchesNoUsageOfErrorArgument']
    print('NoUsageOfErrorArgument try-catch perc: ' + str(get_percentage(df, total, empty)))

    # promises
    total = ['promiseNumberOfPromiseCatches']
    empty = ['promiseNumberOfFunctionsOnCatchesNoUsageOfErrorArgument']
    print('NoUsageOfErrorArgument promises perc: ' + str(get_percentage(df, total, empty)))

    # Async-await
    total = ['asyncAwaitNumberOfCatches']
    empty = ['asyncAwaitNumberOfCatchesNoUsageOfErrorArgument']
    print('NoUsageOfErrorArgument async-await perc: ' + str(get_percentage(df, total, empty)))

    # Events
    total = ['eventsNumberOfEventMethodsOn', 'eventsNumberOfEventMethodsOnce']
    empty = ['eventsNumberOfEventOnNoUsageOfErrorArgument', 'eventsNumberOfEventOnceNoUsageOfErrorArgument']
    print('NoUsageOfErrorArgument events perc: ' + str(get_percentage(df, total, empty)))

    # Callback functions
    total = ['callbacksNumberOfCallbackErrorFunctions']
    empty = ['callbacksNumberOfFunctionsNoUsageOfErrorArgument']
    print('NoUsageOfErrorArgument callback perc: ' + str(get_percentage(df, total, empty)))


def perc_throws(df):
    # try-catch
    total = ['tryCatchNumberOfCatches']
    empty = ['tryCatchNumberOfCatchesThatThrows']
    print('thatThrows try-catch perc: ' + str(get_percentage(df, total, empty)))

    # promises
    total = ['promiseNumberOfPromiseCatches']
    empty = ['promiseNumberOfPromisesThatThrows']
    print('thatThrows promises perc: ' + str(get_percentage(df, total, empty)))

    # Async-await
    total = ['asyncAwaitNumberOfCatches']
    empty = ['asyncAwaitNumberOfCatchesThatThrows']
    print('thatThrows async-await perc: ' + str(get_percentage(df, total, empty)))

    # Events
    total = ['eventsNumberOfEventMethodsOn', 'eventsNumberOfEventMethodsOnce']
    empty = ['eventsNumberOfEventsThatThrows']
    print('thatThrows events perc: ' + str(get_percentage(df, total, empty)))

    # Callback functions
    total = ['callbacksNumberOfCallbackErrorFunctions']
    empty = ['callbacksNumberOfCallbacksThatThrows']
    print('thatThrows callback perc: ' + str(get_percentage(df, total, empty)))


# def triangulation():
#
# Sobre os handlers
# Estou falando sobre a presenca de um tratador geral em dois casos:
# - um callback throws uma exceção
# - um evento “error” é lançado
# Nesses dois casos, dependendo do quão frequentes são, pode valer a pena olhar na mão se há tratadores específicos


def vioplots(data, filepath):
        sns.set_style("whitegrid")
        tips = sns.load_dataset("tips")
        ax = sns.violinplot(x="day", y="total_bill", hue="smoker", data = tips, palette = "muted")
        ax.figure.savefig(filepath)




filepath = config.DATA['result'] + 'result-classes-trans.csv'
print(filepath)
df = pd.read_csv(filepath, sep=',')
print('Empty: ' + str(perc_empty_handlers(df)))
print('No usage: ' + str(perc_no_usage_arg_overall(df)))
print('Logs: ' + str(perc_log_handlers(df)))
print('One statement: ' + str(perc_one_statement_handlers(df)))
print('Throws: ' + str(perc_throw_statement(df)))
print('--------------------------------')
print('Empty handlers')
perc_empty_handlers_per_handler(df)
print('--------------------------------')
print('Console only')
perc_unique_console(df)
print('--------------------------------')
print('No usage of error arguments')
perc_no_usage_arg(df)
print('--------------------------------')
print('Throws')
perc_throws(df)
print('--------------------------------')



# def save_vioplot():
#     import seaborn as sns
#     sns.set_style("whitegrid")
#     tips = sns.load_dataset("tips")
#     ax = sns.violinplot(x="day", y="total_bill", hue="smoker", data = tips, palette = "muted")
#     ax.figure.savefig('output.png')
# save_vioplot()

# def build_dataset(df):
#     print(df)
#     def do(row, row_acc):
#         row_acc.append({
#             'error_handling_mec': 'try-catch',
#             'repo': row['tryCatchNumberOfCatches']
#         })
#         row_acc.append({
#             'error_handling_mec': 'async-await',
#             'repo': row['asyncAwaitNumberOfCatches']
#         })
#         row_acc.append({
#             'error_handling_mec': 'callbacks',
#             'repo': row['callbacksNumberOfCallbackErrorFunctions']
#         })
#         row_acc.append({
#             'error_handling_mec': 'events',
#             'repo': row['eventsNumberOfEventMethodsOn'] + row['eventsNumberOfEventMethodsOnce']
#         })
#         row_acc.append({
#             'error_handling_mec': 'promises',
#             'repo': row['promiseNumberOfPromiseCatches']
#         })
#     row_acc = []
#     df.apply(lambda row: do(row, row_acc))
#     return pd.Dataframe(row_acc)
#
#
#
# def save_vioplot():
#     import seaborn as sns
#     sns.set_style("whitegrid")
#
#     # tips = sns.load_dataset("tips")
#     client_df = pd.read_csv(config.DATA['result'] + 'result-repo-client.csv')
#     server_df = pd.read_csv(config.DATA['result'] + 'result-repo-server.csv')
#     set = pd.concat([client_df, server_df])
#     n_df = build_dataset(set)
#
#     ax = sns.violinplot(x="error_handling_mec", y="repo", data=n_df, palette="muted")
#     ax.figure.savefig('output.png')
# save_vioplot()