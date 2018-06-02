function e() {
    for (var f = 0; f < fin.length; f++) {
        try {
            var finaldoc = Jsoup.connect(fin[f]).get();
            out.println(finaldoc.title());
        } catch (reason) {
            break;
        }
    }
}

function f() {
    try {
        console.log("Starting");
        return 12;
    } catch (exception) {
        return 10;
    }
}