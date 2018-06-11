from matrix import get_value_of_metric

def get_number_of_try_catch_handlers(matrices):
    index = [6]  # tryCatchNumberOfCatches(6)
    return get_value_of_metric(matrices, index)


def get_number_of_catch_promises(matrices):
    index = [22]  # promiseNumberOfPromiseCatches(22)
    return get_value_of_metric(matrices, index)


def get_number_of_async_await_catches(matrices):
    index = [76]  # asyncAwaitNumberOfCatches(31)
    return get_value_of_metric(matrices, index)


def get_number_of_event_handlers(matrices):
    index = [37, 38]  # eventsNumberOfEventMethodsOn(37), eventsNumberOfEventMethodsOnce(38)
    return get_value_of_metric(matrices, index)


def get_number_of_callbacks(matrices):
    index = [47, 48]
    # callbacksNumberOfCallbackErrorFunctions(47), callbacksNumberOfFirstErrorArgFunctions(48)
    return get_value_of_metric(matrices, index)


