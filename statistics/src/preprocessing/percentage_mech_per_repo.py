import pandas as pd
import statistics.src.processing.process as ds
import statistics.src.constants as constants


def create_dataframe(df, repo):
    df_repo = df[df[constants.REPO] == repo]
    total_handlers = df_repo.shape[0]
    df_repo = df_repo.groupby([constants.MECH, constants.TYPE], as_index=False).sum()
    df_repo_data = df_repo[[constants.MECH, constants.COUNT, constants.TYPE]]
    df_repo_data[constants.REPO] = repo
    df_repo_data[constants.PERC_PER_REPO] = df_repo_data[constants.COUNT] / total_handlers
    return df_repo_data


def fix_sinon_csv(df):
    df = df[(df[constants.REPO] != 'sinon.csv') & (df[constants.TYPE] != constants.CLIENT)]
    return df


def save_data(df):
    repos = df[constants.REPO].unique()
    save_dfs = []
    for repo in repos:
        df_d = create_dataframe(df, repo)
        save_dfs.append(df_d)
    df_s = pd.concat(save_dfs)
    # df_s = fix_sinon_csv(df_s)
    df_s.to_csv(constants.RESULT + 'percentage_mech_per_repo.csv')


df = ds.read_dataset()
save_data(df)
