import pandas as pd
import config

output_file = open(config.DATA['result'] + 'result-rq1-1.txt', 'w')

result_classes = config.DATA['result'] + 'result-class.csv'
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

output_file.write('--------------------------' + '\n')
output_file.write('Total of lines (in all files): ' + str(total_lines) + '\n')
output_file.write('try-catch blocks: ' + str(100*try_catch_lines/total_lines) + '\n')
output_file.write('async_await: ' + str(100*async_await_lines/total_lines) + '\n')
output_file.write('events: ' + str(100*events_lines/total_lines) + '\n')
output_file.write('promises: ' + str(100*promises_lines/total_lines) + '\n')
output_file.write('callbacks: ' + str(100 * callbacks_lines / total_lines) + '\n')

output_file.write('--------------------------------------' + '\n')
output_file.write('Total of lines (in code handlers): ' + str(error_handling_total_lines) + '\n')
output_file.write('try-catch: ' + str(100*try_catch_lines/error_handling_total_lines) + '\n')
output_file.write('async-await: ' + str(100*async_await_lines/error_handling_total_lines) + '\n')
output_file.write('events: ' + str(100*events_lines/error_handling_total_lines) + '\n')
output_file.write('promises: ' + str(100*promises_lines/error_handling_total_lines) + '\n')
output_file.write('callbacks: ' + str(100 * callbacks_lines / error_handling_total_lines) + '\n')

output_file.write('--------------------------------------' + '\n')
total = try_catch_number + async_await_number + events_number + promises_number+callbacks_number
output_file.write('Total of constructions (in raw numbers): ' + str(total) + '\n')
output_file.write('try-catch: ' + str(try_catch_number) + ' ' + str(100*try_catch_number/total) + '\n')
output_file.write('async-await: ' + str(async_await_number) + ' ' + str(100*async_await_number/total) + '\n')
output_file.write('events: ' + str(events_number) + ' ' + str(100*events_number/total) + '\n')
output_file.write('promises: ' + str(promises_number) + ' ' + str(100*promises_number/total) + '\n')
output_file.write('callbacks: ' + str(callbacks_number) + ' ' + str(100*callbacks_number/total) + '\n')

output_file.write('--------------------------------------' + '\n')

# print('----')
#
# # First error argument
#
# first_error_arg = df['callbacksNumberOfFirstErrorArgFunctions'].sum()
# print('first-error')
# print(str(callbacks_number) + ' ' + str(first_error_arg) + ' ' + str(100*first_error_arg/callbacks_number))
# print('---------')
#
# total = df['callbacksNumberOfCallbackErrorFunctions'].sum()
# partial = df['callbacksNumberOfFunctionsNoUsageOfErrorArgumentWithUniqueErrorArg'].sum()
# print('Unique error arg no usage ' + str((100 * partial)/total))
#
# print('----------')
# # window.onerror, element etc...
# total_window_onerror = df['numberOfWindowOnError'].sum()
#
# print('----------')






