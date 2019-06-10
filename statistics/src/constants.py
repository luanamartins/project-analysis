
RESULT = '/Users/luanamartins/Documents/Mestrado/project-analysis/results/results-2018-09-01/'
RESULT_TODAY = '/Users/luanamartins/Documents/Mestrado/project-analysis/results/results-2018-09-01/result-today/'
RESULT_SUMMARY = RESULT + 'summary-data/'
RESULT_RQ_1_1 = RESULT + 'rq_1_1/'
RESULT_RQ_1_2 = RESULT + 'rq_1_2/'
RESULT_RQ_2 = RESULT + 'rq_2/'
RESULT_INFO = RESULT + 'summary-data/'

EXTRACT_METRICS_SRC = '/Users/luanamartins/Documents/Mestrado/project-analysis/extract-metrics/src/'
EXTRACT_METRICS_DATA = '/home/local/CIN/lms7/project/extract-metrics/data/'
EXTRACT_METRICS_RESULT_DIR = '/Users/luanamartins/Documents/Mestrado/project-analysis/extract-metrics/data/result/'
EXTRACT_METRICS_REPO_DIR = '/Users/luanamartins/Documents/Mestrado/project-analysis/extract-metrics/data/repo/'
STATS_SRC_PATH = '/Users/luanamartins/Documents/Mestrado/project-analysis/statistics/src/'

PERCENTAGE_MECH_PER_REPO = RESULT + 'percentage_mech_per_repo.csv'

# Mechanisms
WINDOW_EVENT_LISTENER = 'window-addeventlistener'
WINDOW_ON_ERROR = 'window-on-error'

ASYNC_AWAIT = 'async-await'
PROMISE = 'promise'
EVENT = 'event'
CALLBACK = 'callback'
TRY_CATCH = 'try-catch'

FILES = 'files'

# Column names
MECH = 'mech'
FILE = 'file'
LINES = 'lines'
FILES = 'files'
METRIC = 'metric'
COUNT = 'count'
STMTS = 'stmts'
TYPE = 'type'
REPO = 'repo'
TOTAL_HANDLERS = 'total_handlers'
TOTAL_HANDLERS_PER_MECH = 'total_handlers_per_mech'
MEAN = 'mean'
MIN = 'min'
MAX = 'max'
WEIGHTED_AVERAGE = 'weighted_average'
WEIGHTED_AVERAGE_MEAN = 'weighted_average_mean'
STRATEGY_COUNT = 'strategy_count'
STRATEGY = 'strategy'
STRATEGY_TOTAL = 'strategy_total'
STRATEGY_PERC = 'strategy_perc'
OTHERS = 'others'
PERC_PER_REPO = 'perc_per_repo'
TOTAL_LOGICAL_LINES = 'total_logical_lines'
TOTAL_FILES = 'total_files'
NUMBER_OF_LOGICAL_LINES = 'numberOfLogicalLines'
NUMBER_OF_PHYSICAL_LINES = 'numberOfPhysicalLines'
PERC = 'perc'
FIRST_ERROR_ARG = 'first_error_arg'
PERC_FIRST_ERROR_PROTOCOL = 'perc_first_error_protocol'

FIRST_ERROR_ARG_COLUMN = 'callbacksNumberOfFirstErrorArgFunctions'
CALLBACK_ERROR_FUNCTIONS = 'callbacksNumberOfCallbackErrorFunctions'

NUMBER_OF_WINDOW_ON_ERROR = 'numberOfWindowOnError'
NUMBER_OF_WINDOW_ADD_EVENT_LISTENER = 'numberOfWindowAddEventListener'
NUMBER_OF_UNCAUGHT_EXCEPTION = 'eventsNumberOfEventUncaughtException'

GLOBAL_EVENTS = 'global_events'
GLOBAL_EVENTS_FOR_CLASS = 'global_events_for_class'
CALLBACK_THROWS = 'callback_throws'

# Strategies
EMPTY = 'empty'
NO_USAGE_OF_ERROR_ARG = 'noUsageOfErrorArg'
CONSOLE_LOG = 'consoleLog'
REASSIGNING_ERROR = 'reassigningError'
ALERT = 'alert'
THROW_LITERAL = 'throwLiteral'
THROW_UNDEFINED = 'throwUndefined'
THROW_NULL = 'throwNull'
THROW_ERROR_OBJECT = 'throwErrorObject'
RETHROW = 'rethrow'
RETURN_LITERAL = 'returnLiteral'
RETURN_UNDEFINED = 'returnUndefined'
RETURN_NULL = 'returnNull'
RETURN_ERROR_OBJECT = 'returnErrorObject'
RERETURN = 'rereturn'
CONTINUE = 'continue'
BREAK = 'break'

STRATEGIES = [
    EMPTY,
    NO_USAGE_OF_ERROR_ARG,
    CONSOLE_LOG,
    REASSIGNING_ERROR,
    ALERT,
    THROW_LITERAL,
    THROW_UNDEFINED ,
    THROW_NULL,
    THROW_ERROR_OBJECT,
    RETHROW,
    RETURN_LITERAL,
    RETURN_UNDEFINED,
    RETURN_NULL,
    RETURN_ERROR_OBJECT,
    RERETURN,
    CONTINUE,
    BREAK
]

MECHS = [
    TRY_CATCH,
    ASYNC_AWAIT,
    EVENT,
    PROMISE,
    CALLBACK
]

OVERALL = 'overall'
CLIENT = 'client'
SERVER = 'server'
STANDALONE = 'standalone'
WEB = 'web'
