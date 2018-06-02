function e() {
    for (var f = 0; f < fin.length; f++) { //fin be string array of urls
        try {
            var finaldoc = Jsoup.connect(fin[f]).get();
            out.println(finaldoc.title());
        } catch (reason) {
            break;
        }
    }
}