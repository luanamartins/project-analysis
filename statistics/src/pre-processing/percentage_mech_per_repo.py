import pandas as pd
import statistics.src.seaborn.dataset_seaborn as ds
import statistics.src.config as config


def create_dataframe(df, repo):
    df_repo = df[df[config.REPO] == repo]
    total_handlers = df_repo.shape[0]
    df_repo = df_repo.groupby([config.MECH, config.TYPE], as_index=False).sum()
    df_repo_data = df_repo[[config.MECH, config.COUNT, config.TYPE]]
    df_repo_data[config.REPO] = repo
    df_repo_data['perc'] = df_repo_data[config.COUNT] / total_handlers
    return df_repo_data


def save_data(df):
    repos = df[config.REPO].unique()
    save_dfs = []
    for repo in repos:
        df_d = create_dataframe(df, repo)
        save_dfs.append(df_d)
    df_s = pd.concat(save_dfs)
    df_s.to_csv(config.RESULT + 'percentage_mech_per_repo.csv')


df = ds.read_dataset()
save_data(df)