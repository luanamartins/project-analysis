
RESULT = ''
RESULT_RQ_1_1 = ''
RESULT_RQ_1_2 = ''
RESULT_RQ_2 = ''
RESULT_INFO = ''
EXTRACT_METRICS_RESULT_DIR = ''
EXTRACT_METRICS_SRC = ''
EXTRACT_METRICS_REPO_DIR = ''
STATS_SRC_PATH = ''RESULT_SUMMARY = RESULT + 'summary-data/'
RESULT_RQ_1_1 = RESULT + 'rq_1_1/'
RESULT_RQ_1_2 = RESULT + 'rq_1_2/'
RESULT_RQ_2 = RESULT + 'rq_2/'
RESULT_INFO = RESULT + 'summary-data/'
PERCENTAGE_MECH_PER_REPO = RESULT + 'percentage_mech_per_repo.csv'

# Mechanisms
WINDOW_EVENT_LISTENER = 'window-addeventlistener'
WINDOW_ON_ERROR = 'window-on-error'

ASYNC_AWAIT = 'async-await'
PROMISE = 'promise'
EVENT = 'event'
CALLBACK = 'callback'
TRY_CATCH = 'try-catch'

# Column names
MECH = 'mech'
FILE = 'file'
LINES = 'lines'
COUNT = 'count'
STMTS = 'stmts'
TYPE = 'type'
REPO = 'repo'
TOTAL_HANDLERS = 'total_handlers'
TOTAL_HANDLERS_PER_MECH = 'total_handlers_per_mech'
MEAN = 'mean'
WEIGHTED_AVERAGE = 'weighted_average'
WEIGHTED_AVERAGE_MEAN = 'weighted_average_mean'
STRATEGY_COUNT = 'strategy_count'
STRATEGY = 'strategy'
STRATEGY_TOTAL = 'strategy_total'
STRATEGY_PERC = 'strategy_perc'
OTHERS = 'others'
PERC_PER_REPO = 'perc_per_repo'
TOTAL_LOGICAL_LINES = 'total_logical_lines'
PERC = 'perc'
FIRST_ERROR_ARG = 'first_error_arg'
PERC_FIRST_ERROR_PROTOCOL = 'perc_first_error_protocol'

FIRST_ERROR_ARG_COLUMN = 'callbacksNumberOfFirstErrorArgFunctions'
CALLBACK_ERROR_FUNCTIONS = 'callbacksNumberOfCallbackErrorFunctions'


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

CLIENT = 'client'
SERVER = 'server'
STANDALONE = 'standalone'
WEB = 'web'
