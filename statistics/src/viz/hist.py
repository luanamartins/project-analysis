import numpy as np
import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt


def save_hist(df, file_path):
    ax = sns.barplot(x="x", y="x", data=df, estimator=lambda x: len(x) / len(df) * 100)
    ax.set(ylabel="Percent")
    plt.savefig(file_path)


x = np.random.normal(size=100)
# sns.distplot(x, hist=True, kde=False, bins=int(180/5))
df = pd.DataFrame(dict(x=np.random.poisson(4, 500)))
save_hist(df, 'images/hist.png')