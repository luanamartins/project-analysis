function* statementTestGenerator() {
    switch (1) {
        case 2:
            break;

        default:
            break;
    }
    try {} catch (e) {}
    try {} finally {}
    do {} while (false);
    for (;false; ) {}
    for (var x in {}) {}
    for (var x of simpleGenerator()) {}
    if (false) {} else {}
    {
        var x = 1;
    }
    {
        const y = 2;
    }
    yield 1;
}

function* simpleGenerator() {
    yield 1;
}