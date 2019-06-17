import pandas as pd
import statistics.src.processing.process ds
import statistics.src.constants as config


if __name__ == '__main__':
    df = ds.read_dataset()

    df_group = df.groupby([config.REPO, config.TYPE, config.MECH]).sum().reset_index()
    df_res = df_group[[config.REPO, config.TYPE, config.MECH, config.COUNT]].copy()
    df_res.to_csv('df_res.csv', index=False)

    df_res2 = df[[config.REPO, config.TYPE, config.MECH]].copy()
    strategies_dataset = ds.get_all_strategies(df)
    df_res2[config.STRATEGY] = pd.Series(data=strategies_dataset)
    df_res2 = df_res2.replace('', config.OTHERS)
    df_res2[config.COUNT] = 1

    df_res2 = df_res2.groupby([config.REPO, config.TYPE, config.MECH, config.STRATEGY]).sum().reset_index()

    df_res2.to_csv('df_res2.csv', index=False)

    df_repo = pd.read_csv('../general/data.csv')
    df_res = pd.read_csv('df_res.csv')
    for mech in config.MECHS:
        df_mech = df_res[df_res[config.MECH] == mech]
        # Remove csv extension for repository name
        df_mech[config.REPO] = df_mech[config.REPO].str[:-4]
        df_strat = pd.merge(df_mech, df_repo, how='left', on=[config.REPO, config.TYPE])
        df_strat.to_csv(mech + '.csv', index=False)

    # Overall
    df_overall_rows = []
    for mech in config.MECHS:
        df_mech = pd.read_csv(mech + '.csv')
        df_mech_client = df_mech[df_mech[config.TYPE] == config.CLIENT]
        df_mech_server = df_mech[df_mech[config.TYPE] == config.SERVER]

        df_overall_rows.append({
            'mech': mech,

            'number_projects': df_mech.shape[0],
            'number_projects_client': df_mech_client.shape[0],
            'number_projects_server': df_mech_server.shape[0],

            'number_handlers': df_mech[config.COUNT].sum(),
            'number_handler_mean': df_mech[config.COUNT].mean(),
            'number_handlers_client': df_mech_client[config.COUNT].sum(),
            'number_handlers_server': df_mech_server[config.COUNT].sum(),
            'number_handlers_client_mean': df_mech_client[config.COUNT].mean(),
            'number_handlers_server_mean': df_mech_server[config.COUNT].mean()

        })
    df_overall = pd.DataFrame(df_overall_rows)
    df_overall.to_csv('overall.csv', index=False)


