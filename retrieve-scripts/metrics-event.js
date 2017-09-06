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
            const firstArg = methodName.argument[0];
            
            if(firstArg.value == 'uncaughtException'){
                repoObject.numberOfEventUncaughtException++;
            }
        }
    }
}

module.exports = {
    handleAnalysis: handleAnalysis
};