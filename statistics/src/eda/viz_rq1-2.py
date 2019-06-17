import pandas as pd
import statistics.src.processing.process gg
import statistics.src.constants as config


strategies = ['empty', 'noUsageOfErrorArg', 'consoleLog', 'reassigningError', 'alert',
     'throwLiteral', 'throwUndefined', 'throwNull', 'throwErrorObject', 'rethrow',
     'returnLiteral', 'returnUndefined', 'returnNull', 'returnErrorObject', 'rereturn',
     'continue', 'break']


def strategies_barplot(df):
    df_empty = df[df['empty'] == True]
    df_empty_grouped = df_empty.groupby([config.MECH, config.FILE, config.TYPE], as_index=False).sum()
    gg.save_barplot(df_empty_grouped, 'boxplot-empty.png', config.MECH, config.COUNT, False)


def perc_try(df):
    df_c = df[(df[config.MECH] == config.TRY_CATCH) | (df[config.MECH] == config.ASYNC_AWAIT)]
    df_c = df_c[df_c['empty'] == True]
    print(df_c.shape)


def percentage(df):
    percentages = []
    constant = 100 / df[config.COUNT].sum()
    for strategy in strategies:
        df_str = df[df[strategy] == True]
        perc = df_str[config.COUNT].sum()*constant
        percentages.append(float(('%0.2f' % perc)))
    print(percentages)

    data = {
        'strategies': strategies,
        'percentages': percentages,
    }

    df_perc = pd.DataFrame(data=data, columns=['strategies', 'percentages'])
    gg.save_barplot(df_perc, 'percentages.png', 'strategies', 'percentages', False)


if __name__ == '__main__':
    df = gg.read_dataset()
    # strategies_barplot(df)
    perc_try(df)
