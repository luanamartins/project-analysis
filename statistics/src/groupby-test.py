import pandas as pd

df = pd.read_csv('group-test.csv')
grouped = df.groupby('no_dots')

print(grouped.groups.keys())
print(grouped.groups.values())

for name,group in grouped:
    print(name)
    print(group['app1'])