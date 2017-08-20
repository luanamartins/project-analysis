

function handleAnalysis(obj, repoObject){

    if (obj.type == 'NewExpression' && obj.callee.name == 'Promise') {
        repoObject.numberOfPromises++;
    }

    // if(obj.type == 'CallStatement'){
    //     if(obj.property && ['resolve', 'reject'].indexOf(obj.property.name) >= 0){
    //         // TODO
    //     }
    // }
}


module.exports = {
    handleAnalysis: handleAnalysis
};