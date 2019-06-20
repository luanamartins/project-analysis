import pandas as pd
import statistics.src.processing.process as ds
import statistics.src.constants as constants


SAMPLE_SIZE = 50
SAVE_DIR = ''


def select_callbacks_randomly(df):
    df_sample = df[df[constants.MECH] == constants.CALLBACK]
    print(df_sample.shape)
    return df_sample.sample(SAMPLE_SIZE)


def pre_process_data():
    df_c = ds.read_data(constants.CLIENT)
    df_s = ds.read_data(constants.SERVER)

    df_c_sample = select_callbacks_randomly(df_c)
    df_s_sample = select_callbacks_randomly(df_s)

    df_sample = df_c_sample.append(df_s_sample, ignore_index=True)
    df_sample.to_csv('callbacks_randomly.csv', index=False)


if __name__ == '__main__':
    df_sample = pd.read_csv('callbacks_randomly.csv', index_col=0)
    beginning = constants.EXTRACT_METRICS_DATA + 'repo-today/'
    df_files = df_sample[constants.FILE].str.replace(beginning, SAVE_DIR)
