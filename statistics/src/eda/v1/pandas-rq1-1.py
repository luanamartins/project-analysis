import pandas as pd
import statistics.src.constants as constants


result_classes = constants.RESULT_INFO + 'result-class.csv'
df = pd.read_csv(result_classes)

total_lines = df['numberOfLogicalLines'].sum()

try_catch_lines = df['tryCatchNumberOfCatchesLines'].sum()
async_await_lines = df['asyncAwaitNumberOfCatchesLines'].sum()
events_lines = df['eventsNumberOfEventOnLines'].sum() + df['eventsNumberOfEventOnceLines'].sum()
promises_lines = df['promiseNumberOfPromiseCatchesLines'].sum()
callbacks_lines = df['callbacksNumberOfLines'].sum()

try_catch_number = df['tryCatchNumberOfCatches'].sum()
async_await_number = df['asyncAwaitNumberOfCatches'].sum()
events_number = df['eventsNumberOfEventMethodsOn'].sum() + df['eventsNumberOfEventMethodsOnce'].sum()
promises_number = df['promiseNumberOfPromiseCatches'].sum()
callbacks_number = df['callbacksNumberOfCallbackErrorFunctions'].sum()

error_handling_total_lines = try_catch_lines + async_await_lines + events_lines + promises_lines + callbacks_lines
total = try_catch_number + async_await_number + events_number + promises_number + callbacks_number


labels = ['try_catch', 'async_await', 'events', 'promises', 'callbacks']
data = {
    'mech': labels,
    'total_lines': [
        100*try_catch_lines/total_lines,
        100*async_await_lines/total_lines,
        100*events_lines/total_lines,
        100*promises_lines/total_lines,
        100*callbacks_lines/total_lines,
        # total_lines
    ],
    'total_lines_code_handlers': [
        100*try_catch_lines/error_handling_total_lines,
        100*async_await_lines/error_handling_total_lines,
        100*events_lines/error_handling_total_lines,
        100*promises_lines/error_handling_total_lines,
        100*callbacks_lines/error_handling_total_lines,
        # error_handling_total_lines
    ],
    'constructions': [
        100*try_catch_number/total,
        100*async_await_number/total,
        100*events_number/total,
        100*promises_number/total,
        100*callbacks_number/total,
        # total
    ],
    'number_handlers': [
        try_catch_number,
        async_await_number,
        events_number,
        promises_number,
        callbacks_number
    ]
}
df = pd.DataFrame(data=data)
print(constants.RESULT)

df.to_csv(constants.RESULT_RQ_1_1 + 'result-rq1-1.csv')
