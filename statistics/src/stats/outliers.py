import numpy as np


def remove_outliers(df, column):
    low = .05
    high = .95
    df_quant = df.quantile([low, high])
    df_new = df[(df[column] > df_quant.loc[low, column]) & (df[column] < df_quant.loc[high, column])]
    df_new.reset_index(drop=True, inplace=True)
    return df_new


def remove_outliers_iqr(df, column):

    quartile_1, quartile_3 = np.percentile(df[column], [25, 75])

    # Save inter quartile range
    iqr = quartile_3 - quartile_1

    # Calculate bounds
    lower_bound = quartile_1 - (iqr * 1.5)
    upper_bound = quartile_3 + (iqr * 1.5)

    df_new = df[(df[column] > upper_bound) | (df[column] < lower_bound)]
    df_new.reset_index(drop=True, inplace=True)

    return df_new


def remove_outlier_mean_std_method(df, column):
    mean = df[column].mean()
    std = df[column].std()

    df_new = df[(df[column] > mean - 2 * std) & (df[column] < mean + 2 * std)]
    df_new.reset_index(drop=True, inplace=True)

    return df_new