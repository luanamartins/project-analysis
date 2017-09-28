mydata = read.table("/home/lulis/Documents/UFPE/Mestrado/Projeto/static-analysis/project-analysis/manual-analysis/data/callback-ehm-client.txt")

#mydata[1]
#median(as.numeric(mydata[1]))

first_column <- as.numeric(unlist(mydata[1]))
median(first_column)
mean(first_column)
mode(first_column)
hist(first_column)