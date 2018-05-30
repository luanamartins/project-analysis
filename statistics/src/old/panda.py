import pandas as pd

filepath = '../../extract-metrics/data/result/result/client/ajenti.csv'
dataframe = pd.read_csv(filepath, usecols=[2])

filepath = '../../extract-metrics/data/result/client/ajenti.csv'
dataframe2 = pd.read_csv(filepath, usecols=[2])

result = [dataframe, dataframe2]

concate = pd.concat(result, ignore_index=True)
print(concate.sum())