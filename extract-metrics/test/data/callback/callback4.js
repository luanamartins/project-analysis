downloadAsync("a.txt", function(error, a) {
    if (error) {
        console.log("Error: " + error);
    }
    downloadAsync("b.txt", function(error, b) {
        if (error) {
            console.log("Error: " + error);
        }
        downloadAsync(url3, function(error, c) {
            if (error) {
                console.log("Error: " + error);
            }
            console.log("Contents: " + a + b + c);
        });
    });
});