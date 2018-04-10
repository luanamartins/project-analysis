function onError(error) {
    console.log("Error: " + error);
}

downloadAsync("a.txt", function(error, a) {
    if (error) {
        return onError(error);
    }
    downloadAsync("b.txt", function(error, b) {
        if (error) {
            return onError(error);
        }
        downloadAsync(url3, function(error, c) {
            if (error) {
                return onError(error);
            }
            console.log("Contents: " + a + b + c);
        });
    });
});
