import pandas as pd
import statistics.src.processing.process as ds
import statistics.src.constants as constants


if __name__ == '__main__':
    df = ds.read_dataset()

    df_group = df.groupby([constants.REPO, constants.TYPE, constants.MECH]).sum().reset_index()
    df_res = df_group[[constants.REPO, constants.TYPE, constants.MECH, constants.COUNT]].copy()
    df_res.to_csv('df_res.csv', index=False)

    df_res2 = df[[constants.REPO, constants.TYPE, constants.MECH]].copy()
    strategies_dataset = ds.get_all_strategies(df)
    df_res2[constants.STRATEGY] = pd.Series(data=strategies_dataset)
    df_res2 = df_res2.replace('', constants.OTHERS)
    df_res2[constants.COUNT] = 1

    df_res2 = df_res2.groupby([constants.REPO, constants.TYPE, constants.MECH, constants.STRATEGY]).sum().reset_index()

    df_res2.to_csv('df_res2.csv', index=False)

    df_repo = pd.read_csv('../general/data.csv')
    df_res = pd.read_csv('df_res.csv')
    for mech in constants.MECHS:
        df_mech = df_res[df_res[constants.MECH] == mech]
        # Remove csv extension for repository name
        df_mech[constants.REPO] = df_mech[constants.REPO].str[:-4]
        df_strat = pd.merge(df_mech, df_repo, how='left', on=[constants.REPO, constants.TYPE])
        df_strat.to_csv(mech + '.csv', index=False)

    # Overall
    df_overall_rows = []
    for mech in constants.MECHS:
        df_mech = pd.read_csv(mech + '.csv')
        df_mech_client = df_mech[df_mech[constants.TYPE] == constants.CLIENT]
        df_mech_server = df_mech[df_mech[constants.TYPE] == constants.SERVER]

        df_overall_rows.append({
            'mech': mech,

            'number_projects': df_mech.shape[0],
            'number_projects_client': df_mech_client.shape[0],
            'number_projects_server': df_mech_server.shape[0],

            'number_handlers': df_mech[constants.COUNT].sum(),
            'number_handler_mean': df_mech[constants.COUNT].mean(),
            'number_handlers_client': df_mech_client[constants.COUNT].sum(),
            'number_handlers_server': df_mech_server[constants.COUNT].sum(),
            'number_handlers_client_mean': df_mech_client[constants.COUNT].mean(),
            'number_handlers_server_mean': df_mech_server[constants.COUNT].mean()

        })
    df_overall = pd.DataFrame(df_overall_rows)
    df_overall.to_csv('overall.csv', index=False)


