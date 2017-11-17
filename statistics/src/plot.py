import toyplot.data
import toyplot.browser
import matplotlib.pyplot as pyplot
import numpy as np
import matplotlib.patches as mpatches
import matplotlib.lines as mlines


def plot_two_groups_histogram(data_one, title_one, data_two, title_two, hist_title, save_figure_name):
    bins = np.linspace(10, 100)

    pyplot.hist(data_one, bins, alpha=0.5, label=title_one, edgecolor='k')
    pyplot.hist(data_two, bins, alpha=0.5, label=title_two, edgecolor='k')
    pyplot.legend(loc='upper right', edgecolor='k')
    pyplot.title(hist_title)
    pyplot.grid(True)
    pyplot.savefig('two_groups_histogram_' + save_figure_name)
    pyplot.gcf().clear()


def plot_histogram(data, title):
    pyplot.hist(data)
    # pyplot.title("Histogram with 'auto' bins")
    pyplot.title(title)
    pyplot.show()


def plot_violinplot(data, labels, title, save_figure_name):
    #pos = [1,2]
    #data = [np.random.normal(0, std, size=100) for std in pos]

    pos = [1, 2]
    pyplot.figure()
    ax = pyplot.subplot(111)
    pyplot.violinplot(data, points=10, widths=0.3, showmeans=False, showextrema=True, showmedians=True)
    ax.set_xticklabels(labels)
    ax.set_xticks(pos)

    pyplot.title(title)
    pyplot.savefig('violinplot_' + save_figure_name)
    pyplot.gcf().clear()


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
    #pyplot.xlim(-1, 7)
    pyplot.bar(y_pos, data, align='center', alpha=0.5)
    pyplot.xticks(y_pos, objects, ha='right', rotation=45)
    pyplot.ylabel(ylabel)
    pyplot.subplots_adjust(bottom=0.2)
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
    data_table["# NUMBER OF CALLBACKS"] = [1,2,3,4]
    # read_csv("data/bootstrap.csv")
    data_table = data_table[:10]
    print(data_table)

    canvas = toyplot.Canvas(width=1400, height=300)
    table = canvas.table(data_table)
    # table.cells.column[[0, 1]].width = 200
    toyplot.browser.show(canvas)


def bar_line_graph(metric_label, objects, lines_of_code, metric_values):

    fig = pyplot.figure()
    ax = fig.gca()

    # xs = np.arange(10)
    # ys = np.random.rand(10)

    pos = np.arange(len(objects))

    k_lines_of_code = [ i / 1000 for i in lines_of_code]

    # log_y_values = np.log(lines_of_code)

    ax.bar(pos, k_lines_of_code, color='skyblue')
    ax.set_ylim([0, 1000])

    ax.plot(pos, metric_values, marker='o', color='forestgreen')

    red_patch = mpatches.Patch(color='skyblue', label='Lines of code * 1K')
    blue_line = mlines.Line2D([], [], color='forestgreen', marker='.', markersize=15, label=metric_label)
    pyplot.legend(handles=[red_patch, blue_line], bbox_to_anchor=(0., 1.02, 1., .102), loc=3, ncol=2, mode="expand", borderaxespad=0.)
    # pyplot.legend(handles=[red_patch, blue_line])

    pyplot.xticks(pos, objects, ha='right', rotation=45)
    pyplot.subplots_adjust(bottom=0.2)

    pyplot.show()



# import random
# x = [random.gauss(3,1) for _ in range(400)]
# y = [random.gauss(4,2) for _ in range(400)]
#
# plot_two_groups_histogram(x, 'x', y, 'y', 'Title')

# plot_violinplot([[1,2,3,4,5,100], [3,4,5,6]], ['Client-side', 'Server-side'])

# data = [1,2,3,4,5]
# print(np.random.choice(len(data), size=2, replace=False))