import pandas as pd
import seaborn as sns
import statistics.src.config as config

# def save_vioplot():
#     sns.set_style("whitegrid")
#     tips = sns.load_dataset("tips")
#     ax = sns.violinplot(x="day", y="total_bill", hue="smoker", data = tips, palette = "muted")
#     ax.figure.savefig('output.png')
# save_vioplot()


def build_dataset(df):
    def do(row, row_acc):
        row = row.to_dict()
        row_acc.append({
            'error_handling_mec': 'try-catch',
            'repo': row['tryCatchNumberOfCatches']
        })
        row_acc.append({
            'error_handling_mec': 'async-await',
            'repo': row['asyncAwaitNumberOfCatches']
        })
        row_acc.append({
            'error_handling_mec': 'callbacks',
            'repo': row['callbacksNumberOfCallbackErrorFunctions']
        })
        row_acc.append({
            'error_handling_mec': 'events',
            'repo': row['eventsNumberOfEventMethodsOn'] + row['eventsNumberOfEventMethodsOnce']
        })
        row_acc.append({
            'error_handling_mec': 'promises',
            'repo': row['promiseNumberOfPromiseCatches']
        })
    row_acc = []
    df.apply(do, args=(row_acc))
    return pd.Dataframe(row_acc)


def save_vioplot():

    # tips = sns.load_dataset("tips")
    client_df = pd.read_csv(config.RESULT + 'result-repo-client.csv')
    server_df = pd.read_csv(config.RESULT + 'result-repo-server.csv')
    set = pd.concat([client_df, server_df])
    # print(set)
    n_df = build_dataset(set)
    print(n_df)

save_vioplot()