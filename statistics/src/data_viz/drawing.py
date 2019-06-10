import seaborn as sns
import matplotlib.pyplot as plt


def save_boxplot(df, image_path, x_col, y_col, x_label, y_label):
    # Start a new figure
    plt.figure()

    # Present no lines in the grid
    sns.set(style='whitegrid')

    # Create plot and set labels
    g = sns.boxplot(x=x_col, y=y_col, data=df)
    g.set(xlabel=x_label, ylabel=y_label)

    # Rescale y-axis to log function
    g.set_yscale('log')

    # Save figure
    plt.savefig(image_path)


def save_violinplot(df, image_path, x_col, y_col, x_label, y_label):
    # Start a new figure
    plt.figure()

    # Present no lines in the grid
    sns.set(style='whitegrid')

    # Create plot and set labels
    g = sns.violinplot(x=x_col, y=y_col, data=df, cut=0)
    g.set(xlabel=x_label, ylabel=y_label)

    # Rescale y-axis to log function
    g.set_yscale('log')

    # directory = 'violinplot/'
    # create_dir_if_not_exists(directory)
    # filepath = directory + image_path

    # Save figure
    plt.savefig(image_path)


def save_violinplot_hue(df, image_path, x_col, y_col, xlabel, ylabel, hue):
    # Start a new figure
    plt.figure()

    # Present no lines in the grid
    sns.set(style='whitegrid')

    # Create plot and set labels
    g = sns.violinplot(x=x_col, y=y_col, hue=hue, data=df, palette='muted', split=True)
    g.set(xlabel=xlabel, ylabel=ylabel)

    # Rescale y-axis to log function
    g.set_yscale('log')

    # Save figure
    plt.savefig(image_path)


# TODO
def save_lineplot(df, image_path, x_column_name, y_column_name, hue, x_label, y_label):
    # Start a new figure
    plt.figure()

    ax = sns.lineplot(data=df, x=x_column_name, y=y_column_name, hue=hue)

    ax.set(xlabel=x_label, ylabel=y_label)
    ax.set_yscale('log')

    # Set grid style
    # sns.set(style='darkgrid')

    # Save figure
    plt.savefig(image_path)


def save_barplot(data, filename, x, y, hue, log):
    plt.figure()
    ax = sns.barplot(x=x, y=y, data=data, hue=hue)
    # , orient = 'h'

    # Remove labels from categories
    # ax.set_xticklabels([])
    # plt.tight_layout()

    # ax.set_xticklabels(ax.get_xticklabels(), rotation=90, ha='right')
    # plt.tight_layout()

    if log:
        ax.set_yscale('log')

    # directory = 'barplot/'
    # create_dir_if_not_exists(directory)
    plt.ylim(0, 0.3)

    plt.savefig(filename)


def save_countplot(data, filename, x):
    plt.figure()
    sns.countplot(x=x, data=data)

    # directory = 'countplot/'
    # create_dir_if_not_exists(directory)
    # filepath = directory + filename

    plt.savefig(filename)


def save_scatterplot(df, x, y):

    sns.catplot(data=df, x=x, y=y)

    # directory = 'scatterplot/'
    # create_dir_if_not_exists(directory)
    # filepath = directory + filename

    plt.savefig('scatterplot.png')