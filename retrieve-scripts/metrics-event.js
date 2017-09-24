function handleAnalysis(obj, repoObject) {
    if (obj.type === 'CallExpression') {
        if(obj.property) {
            const methodName = obj.property.name;
            if (methodName === 'on') {
                repoObject.events.numberOfEventMethodsOn++;
            }

            if (methodName === 'emit') {
                repoObject.events.numberOfEventMethodsEmit++;
            }

            if (methodName === 'once') {
                repoObject.events.numberOfEventMethodsOnce++;
            }
            const firstArg = methodName.argument[0];
            
            if(firstArg.value === 'uncaughtException'){
                repoObject.events.numberOfEventUncaughtException++;
            }
        }
    }
}

module.exports = {
    handleAnalysis: handleAnalysis
};