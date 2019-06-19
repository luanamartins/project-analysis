import pandas as pd
import statistics.src.constants as constants

RESULTS_DIRECTORY = constants.STATS_SRC_PATH + 'v2/rq2/data/'
TRIANGULATION_CLIENT_PATH = RESULTS_DIRECTORY + 'triangulation_client.csv'
TRIANGULATION_SERVER_PATH = RESULTS_DIRECTORY + 'triangulation_server.csv'

TRIANGULATION_REPO_CLIENT_PATH = RESULTS_DIRECTORY + 'triangulation_repo_client.csv'
TRIANGULATION_REPO_SERVER_PATH = RESULTS_DIRECTORY + 'triangulation_repo_server.csv'

RESULT_REPO_CLIENT_PATH = constants.RESULT_SUMMARY + 'result-repo-client.csv'
RESULT_REPO_SERVER_PATH = constants.RESULT_SUMMARY + 'result-repo-server.csv'

# What about the number of projects in this situation?
# Can we submit patches where the project at least logs the occurrence of such an error?
# this would validate our assumption that this is actually a bug.


def save_merge_client(df_client, df_global_event_client):
    df_merge_client = df_client.merge(df_global_event_client)
    df_merge_client = df_merge_client[
        (df_merge_client[constants.NUMBER_OF_WINDOW_ON_ERROR] == 0) &
        (df_merge_client[constants.NUMBER_OF_WINDOW_ADD_EVENT_LISTENER] == 0)
    ]
    df_merge_client.to_csv(TRIANGULATION_CLIENT_PATH)
    repos = df_merge_client[constants.REPO].drop_duplicates()
    df_repo = pd.read_csv(RESULT_REPO_CLIENT_PATH)

    merge_repo = df_repo.merge(repos.to_frame())
    merge_repo = merge_repo[[constants.REPO, constants.NUMBER_OF_LOGICAL_LINES,
                             constants.NUMBER_OF_PHYSICAL_LINES, constants.TOTAL_FILES]]
    merge_repo.to_csv(TRIANGULATION_REPO_CLIENT_PATH)

    print(merge_repo[constants.NUMBER_OF_LOGICAL_LINES].min())
    print(merge_repo[constants.NUMBER_OF_LOGICAL_LINES].max())


def save_merge_server(df_server, df_global_event_server):
    df_merge_server = df_server.merge(df_global_event_server)
    df_merge_server = df_merge_server[df_merge_server[constants.NUMBER_OF_UNCAUGHT_EXCEPTION] == 0]
    df_merge_server.to_csv(TRIANGULATION_SERVER_PATH)
    df_merge_server[constants.REPO].drop_duplicates().to_csv(TRIANGULATION_SERVER_PATH)

    repos = df_merge_server[constants.REPO].drop_duplicates()
    df_repo = pd.read_csv(RESULT_REPO_SERVER_PATH)

    merge_repo = df_repo.merge(repos.to_frame())
    merge_repo = merge_repo[[constants.REPO, constants.NUMBER_OF_LOGICAL_LINES,
                             constants.NUMBER_OF_PHYSICAL_LINES, constants.TOTAL_FILES]]
    merge_repo.to_csv(TRIANGULATION_REPO_SERVER_PATH)

    print(merge_repo[constants.NUMBER_OF_LOGICAL_LINES].min())
    print(merge_repo[constants.NUMBER_OF_LOGICAL_LINES].max())


def no_precautions():
    df_global_events = pd.read_csv(RESULTS_DIRECTORY + 'global_events.csv')

    df = pd.read_csv(RESULTS_DIRECTORY + 'data-file.csv')
    df = df[df[constants.MECH] == constants.CALLBACK]
    df = df[
        (df[constants.STRATEGY] == constants.THROW_ERROR_OBJECT) |
        (df[constants.STRATEGY] == constants.THROW_LITERAL) |
        (df[constants.STRATEGY] == constants.THROW_NULL) |
        (df[constants.STRATEGY] == constants.THROW_UNDEFINED) |
        (df[constants.STRATEGY] == constants.RETHROW)
        ]

    # Error handlers that throws only
    df_client = df[df[constants.TYPE] == constants.CLIENT]
    df_server = df[df[constants.TYPE] == constants.SERVER]

    df_global_event_client = df_global_events[df_global_events[constants.TYPE] == constants.CLIENT]
    df_global_event_server = df_global_events[df_global_events[constants.TYPE] == constants.SERVER]

    save_merge_client(df_client, df_global_event_client)
    save_merge_server(df_server, df_global_event_server)


if __name__ == '__main__':
    no_precautions()
