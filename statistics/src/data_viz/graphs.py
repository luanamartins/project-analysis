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


def save_violinplot_hue(df, image_path, x_col, y_col, x_label, y_label, hue):
    # Start a new figure
    plt.figure()

    # Present no lines in the grid
    sns.set(style='whitegrid')

    # Create plot and set labels
    g = sns.violinplot(x=x_col, y=y_col, hue=hue, data=df, palette='muted', split=True)
    g.set(xlabel=x_label, ylabel=y_label)

    # Rescale y-axis to log function
    g.set_yscale('log')

    # Save figure
    plt.savefig(image_path)


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


def save_barplot_with_legend(filename, x, y, hue, data, xlabel, ylabel):
    plt.figure()
    sns.set_style('whitegrid')

    sns.barplot(x, y, hue, data)
    # plt.legend(loc='center left', bbox_to_anchor=(1, 0.5))
    plt.legend(loc='upper center', bbox_to_anchor=(0.5, -0.05), ncol=3, fancybox=True, shadow=True)

    plt.xlabel(xlabel)
    plt.ylabel(ylabel)

    plt.tight_layout()
    plt.savefig(filename)


def save_countplot(data, filename, x):
    plt.figure()
    sns.countplot(x=x, data=data)

    # directory = 'countplot/'
    # create_dir_if_not_exists(directory)
    # filepath = directory + filename

    plt.savefig(filename)


def save_scatterplot(data, filename, x, y):

    sns.catplot(data=data, x=x, y=y)

    # directory = 'scatterplot/'
    # create_dir_if_not_exists(directory)
    # filepath = directory + filename
    # filename = 'scatterplot.png'

    plt.savefig(filename)


def save_multiple_barplot(filename, list_df, list_label_x, x, y):
    num_dataframes = len(list_df)
    fig, ax = plt.subplots(num_dataframes, 1)

    for i in range(num_dataframes):
        save_barplot(list_df[i], list_label_x[i], x, y, False, ax[i])

    fig.show()
    fig.savefig(filename)
