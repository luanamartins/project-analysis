import pandas as pd
import config

result_classes = config.DATA['result'] + 'result-classes-trans.csv'
output_file = config.DATA['result'] + 'result-classes-percentage.csv'
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

print(total_lines)
print(100*try_catch_lines/total_lines)
print(100*async_await_lines/total_lines)
print(100*events_lines/total_lines)
print(100*promises_lines/total_lines)
print(100 * callbacks_lines / total_lines)

print('----')

print(error_handling_total_lines)
print(100*try_catch_lines/error_handling_total_lines)
print(100*async_await_lines/error_handling_total_lines)
print(100*events_lines/error_handling_total_lines)
print(100*promises_lines/error_handling_total_lines)
print(100 * callbacks_lines / error_handling_total_lines)

print('----')

total = try_catch_number + async_await_number + events_number + promises_number+callbacks_number
print(str(try_catch_number) + ' ' + str(100*try_catch_number/total))
print(str(async_await_number) + ' ' + str(100*async_await_number/total))
print(str(events_number) + ' ' + str(100*events_number/total))
print(str(promises_number) + ' ' + str(100*promises_number/total))
print(str(callbacks_number) + ' ' + str(100*callbacks_number/total))

print('----')

# First error argument

first_error_arg = df['callbacksNumberOfFirstErrorArgFunctions'].sum()
print(str(first_error_arg))

