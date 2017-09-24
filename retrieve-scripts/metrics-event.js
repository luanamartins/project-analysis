function handleAnalysis(obj, repoObject) {
    if (obj.type === 'CallExpression') {
        if(obj.property) {
            const methodName = obj.property.name;
            const eventMethods = ['on', 'once', 'emit'];

            if(eventMethods.indexOf(methodName) !== -1){
                repoObject.events.numberOfEventMethodsOn++;
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