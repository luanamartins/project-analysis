function e() {
    const noUsage = 'Error!';
    for (var f = 0; f < fin.length; f++) { //fin be string array of urls
        try {
            var finaldoc = Jsoup.connect(fin[f]).get();
            out.println(finaldoc.title());
        } catch (e) {
            if(f > 10) {
                throw e;
            } if(f > 20){ 
                throw new Error(noUsage);
            } else {
                throw new RegExp('\\w+')
            }
        }
    }

    try {
        var finaldoc = Jsoup.connect(fin[f]).get();
        out.println(finaldoc.title());
    } catch (e) {
        if(f > 10) {
            throw e;
        } if(f > 20){ 
            throw new Error(noUsage);
        } else {
            throw new RegExp('\\w+')
        }
    }

    try {
        var finaldoc = Jsoup.connect(fin[f]).get();
        out.println(finaldoc.title());
    } catch (err) {
        if(f > 10) {
            throw e;
        } if(f > 20){ 
            throw new Error(noUsage);
        } else {
            throw new RegExp('\\w+')
        }
    }
}