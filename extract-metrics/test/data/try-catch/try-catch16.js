function a () {
    try {

    } catch (e) {
        alert('An error occurred!')
    }


    try {
        console.log('trying...')
    } catch (e) {
        e = null;
        console.log('ok');
    }

    try {

    } catch (e) {
        throw 2;
    }

    try {

    } catch (e) {
        throw undefined;
    }

    try {

    } catch (e) {
        throw null;
    }

    try {

    } catch (e) {
        alert('An error occurred!');
        throw null;
    }

    try {

    } catch (e) {
        throw new Error('new error thrown here')
    }
}