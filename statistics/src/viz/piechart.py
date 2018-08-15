import matplotlib.pyplot as plt


def plot_pie_chart(data, labels, path):
    # Start a new figure
    plt.figure()

    # Data to plot
    colors = ['gold', 'yellowgreen', 'lightcoral', 'lightskyblue', 'lightpink']
    explode = (0, 0, 0, 0, 0)  # explode slice array

    # Plot
    plt.pie(
        # data
        data,
        # with one slide exploded out
        explode=explode,
        # # with no shadows
        # shadows=False,
        # data labels
        labels=labels,
        # with colors
        colors=colors,
        # with the percent listed as a fraction
        autopct='%1.1f%%',
        # with no shadows
        shadow=True,
        # with the start angle at 140%
        startangle=140
    )

    # View the plot drop above
    plt.axis('equal')

    # View the plot
    # plt.show()

    # Save figure
    plt.savefig(path)


def donut(data, labels, path):
    # Pie chart
    # labels = ['Frogs', 'Hogs', 'Dogs', 'Logs', 'T', 'total']
    # data = [15, 30, 45, 10]
    # colors
    colors = ['#ff9999', '#66b3ff', '#99ff99', '#ffcc99', '#bbcc99']

    fig1, ax1 = plt.subplots()
    ax1.pie(data, colors=colors, labels=labels, autopct='%1.1f%%', startangle=90)

    # draw circle
    centre_circle = plt.Circle((0, 0), 0.70, fc='white')
    fig = plt.gcf()
    fig.gca().add_artist(centre_circle)

    # Equal aspect ratio ensures that pie is drawn as a circle
    ax1.axis('equal')
    plt.tight_layout()

    # Save figure
    plt.savefig(path)


def piechart_legend(data, labels, path):
    # labels = ['Cookies', 'Jellybean', 'Milkshake', 'Cheesecake', 'T']
    # data = [38.4, 40.6, 20.7, 10.3]
    # colors = ['yellowgreen', 'gold', 'lightskyblue', 'lightcoral']
    colors = ['#ff9999', '#66b3ff', '#99ff99', '#ffcc99', '#bbcc99']

    patches, texts = plt.pie(data, colors=colors, shadow=True, startangle=90)
    plt.legend(patches, labels, loc="best")

    plt.axis('equal')
    plt.tight_layout()

    # Save figure
    plt.savefig(path)