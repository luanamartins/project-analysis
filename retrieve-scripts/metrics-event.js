function handleAnalysis(obj, repoObject) {
    if (obj.type == 'CallExpression') {
        if(obj.property) {
            const methodName = obj.property.name;
            if (methodName == 'on') {
                repoObject.numberOfEventMethodsOn++;
            }

            if (methodName == 'emit') {
                repoObject.numberOfEventMethodsEmit++;
            }

            if (methodName == 'once') {
                repoObject.numberOfEventMethodsOnce++;
            }

            if(methodName.argument[0].value == 'uncaughtException'){
                repoObject.numberOfEventUncaughtException++;
            }
        }
    }
}

module.exports = {
    handleAnalysis: handleAnalysis
};