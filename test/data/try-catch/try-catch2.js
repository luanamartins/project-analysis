function calling() {
    try {
        console.log("");
        console.log("");
    } catch (error) {} finally {
        console.log("");
        console.log("");
        console.log("Error");
        for (i = 0; i < 100; i++) {
            console.log("hello");
        }
    }
}

calling();
