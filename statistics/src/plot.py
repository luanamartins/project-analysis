import toyplot.data
import toyplot.browser
import matplotlib.pyplot as pyplot
import numpy as np


def plot_histogram(data, title):
    pyplot.hist(data, bins='auto')
    # pyplot.title("Histogram with 'auto' bins")
    pyplot.title(title)
    pyplot.show()


def bar_graph(data, objects, ylabel, title):
    # objects = ('Python', 'C++', 'Java', 'Perl', 'Scala', 'Lisp')
    # y_pos = np.arange(len(objects))
    # performance = [10, 8, 6, 4, 2, 1]
    #
    # pyplot.bar(y_pos, performance, align='center', alpha=0.5)
    # pyplot.xticks(y_pos, objects)
    # pyplot.ylabel('Usage')
    # pyplot.title('Programming language usage')

    y_pos = np.arange(len(objects))

    pyplot.bar(y_pos, data, align='center', alpha=0.5)
    pyplot.xticks(y_pos, objects)
    pyplot.ylabel(ylabel)
    pyplot.title(title)

    pyplot.show()
   
 
def double_bar_graph():
    N = 5
    men_means = (20, 35, 30, 35, 27)
    men_std = (2, 3, 4, 1, 2)

    ind = np.arange(N)  # the x locations for the groups
    width = 0.35  # the width of the bars

    fig, ax = pyplot.subplots()
    rects1 = ax.bar(ind, men_means, width, color='b', yerr=men_std)

    women_means = (25, 32, 34, 20, 25)
    women_std = (3, 5, 2, 3, 3)
    rects2 = ax.bar(ind + width, women_means, width, color='r', yerr=women_std)

    # add some text for labels, title and axes ticks
    ax.set_ylabel('Scores')
    ax.set_title('Scores by group and gender')
    ax.set_xticks(ind + width / 2)
    ax.set_xticklabels(('G1', 'G2', 'G3', 'G4', 'G5'))

    ax.legend((rects1[0], rects2[0]), ('Men', 'Women'))

    ax.yaxis.grid()

    def autolabel(rects):
        """
        Attach a text label above each bar displaying its height
        """
        for rect in rects:
            height = rect.get_height()
            ax.text(rect.get_x() + rect.get_width() / 2., 1.05 * height,
                    '%d' % int(height),
                    ha='center', va='bottom')

    autolabel(rects1)
    autolabel(rects2)

    pyplot.show()


def table():
    # fig, ax = pyplot.subplots()
    #
    # # Hide axes
    # ax.xaxis.set_visible(False)
    # ax.yaxis.set_visible(False)
    #
    # # Table from Ed Smith answer
    # # ax = pyplot.subplot2grid((1, 1), (0, 0), colspan=2, rowspan=2)
    #
    # columns = ('Number of tadslkfalsfd', 'Low', 'Chg.', 'Chg. %', 'Time', 'T?')
    # rows = ['Gold', 'Silver', 'Copper', 'Aluminum']
    #
    # data_list = np.random.randint(10, 90, size=(len(rows), len(columns)))
    # pyplot.table(cellText=data_list,
    #          rowLabels=rows,
    #          colLabels=columns,
    #          loc='upper center')
    #
    # ax.axis('off')
    #
    # pyplot.show()


    # columns = ('Number of tadslkfalsfd', 'Low', 'Chg.', 'Chg. %', 'Time', 'T?')
    # rows = ['Gold', 'Silver', 'Copper', 'Aluminum']
    #
    # data_list = np.random.randint(10, 90, size=(len(rows), len(columns)))
    # pyplot.table(cellText=data_list)
    # pyplot.show()

    # columns = ('Number of tadslkfalsfd', 'Low', 'Chg.', 'Chg. %', 'Time', 'T?')
    # rows = ['Gold', 'Silver', 'Copper', 'Aluminum']
    # titles = ['Number of tadslkfalsfd', 'Low', 'Chg.', 'Chg. %', 'Time', 'T?']
    # data_list = np.random.randint(10, 90, size=(len(rows), len(columns)))

    data_table = toyplot.data.Table()
    data_table["# NUMBER OF CALLBACKS"] = [1,2,3,4];
    # read_csv("data/bootstrap.csv")
    data_table = data_table[:10]
    print(data_table)

    canvas = toyplot.Canvas(width=1400, height=300)
    table = canvas.table(data_table)
    # table.cells.column[[0, 1]].width = 200
    toyplot.browser.show(canvas)
