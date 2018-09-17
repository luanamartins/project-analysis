const CONFIG = require("../../config");
const constants = require('../constants');
const utils = require(CONFIG["srcPath"] + 'utils');

function handleAnalysis(node, reportObject, metric_size_array) {

    if (node.type === 'FunctionDeclaration' ||
        node.type === 'FunctionExpression' ||
        node.type === 'ArrowFunctionExpression') {

        // If a function argument is called inside the function, this function is callback-accepting
        const params = node.params.map((item) => {
            return item.name
        });

        const errorParams = params.filter(item => utils.isAnErrorArgument(item));

        if (errorParams.length > 0) { // it has at least one error argument

            const lines = utils.getNumberOfLines(node);
            reportObject.callbacksNumberOfLines += lines;
            const functionBody = node.body.body;

            const metricSizeObject = utils.getEmptyMetricSizeObject();
            metricSizeObject.mech = constants.CALLBACK;
            metricSizeObject.lines = lines;
            metricSizeObject.stmts = functionBody.length;
            metricSizeObject.has_error_arguments = errorParams.length > 0;
            metricSizeObject.empty = lines === 0;
            
            

            const containsOneParamAndIsAnError = errorParams.length === 1 && params.length === 1;
            if (containsOneParamAndIsAnError) {

                // callback has only one argument and it is an error argument
                reportObject.callbacksNumberOfFunctionsWithUniqueErrorArg++;
                reportObject.callbacksNumberOfLinesOfFunctionsWithUniqueErrorArg += lines;
            }

            if (containsOneParamAndIsAnError && lines === 1) {
                reportObject.callbacksNumberOfFunctionsWithUniqueStatement++;
                reportObject.callbacksNumberOfFunctionsWithUniqueErrorArgWithUniqueStatement++;
            }

            // callback has only one argument and an error argument and also is empty
            if (containsOneParamAndIsAnError && lines === 0) {
                reportObject.callbacksNumberOfEmptyFunctionsWithUniqueErrorArg++;
            }
            
            const useAnyErrorParam = utils.useAnyArguments(node.body, errorParams);

            if(containsOneParamAndIsAnError && !useAnyErrorParam) {
                reportObject.callbacksNumberOfFunctionsNoUsageOfErrorArgumentWithUniqueErrorArg++;
            }

            if (!useAnyErrorParam) {
                metricSizeObject.noUsageOfErrorArg = true;
            }

            if(utils.hasConsoleLog(functionBody)) {
                metricSizeObject.consoleLog = true;
            }
    
            if(utils.hasAlertMethodCalling(functionBody)) {
                metricSizeObject.alert = true;
            }
    

            // Callback features:
            //  (i) has only one error argument
            //  (ii) has only one statement and it is a console.log
            const statement = functionBody[0];
            if (containsOneParamAndIsAnError && lines === 1 && utils.isConsoleStatement(statement)) {
                reportObject.callbacksNumberOfFunctionsWithUniqueConsole++;
                reportObject.callbacksNumberOfFunctionsWithUniqueErrorArgWithUniqueConsole++;
            }

            if(lines === 1 && utils.isAlertCallExpression(functionBody[0])) {
                reportObject.callbacksNumberOfHandlersAlertOnly++;
            }

            if (utils.hasErrorReassignment(functionBody, errorParams)) {
                reportObject.callbacksNumberOfErrorReassigning++;
                metricSizeObject.reassigningError = true;
            }

            // Get number of throws on the callback
            handleThrowStatement(functionBody, reportObject, errorParams, lines, metricSizeObject);

            reportObject.callbacksNumberOfCallbackErrorFunctions++;

            const location = node.loc;
            reportObject.callbacksNumberOfLinesStart.push(location.start.line);
            reportObject.callbacksNumberOfLinesEnd.push(location.end.line);

            const firstArgument = params[0];
            if (utils.isAnErrorArgument(firstArgument)) {
                reportObject.callbacksNumberOfFirstErrorArgFunctions++;
            }

            // Empty callback functions:
            // (i) its body might be empty
            // (ii) It is not using ancallbacksNumberOfEmptyCallbacksy error argument in any part of the body
            // if (utils.isEmptyHandler(node.body, errorArguments, numberOfLines)) {
            //     reportObject.callbacksNumberOfEmptyCallbacks++;
            // }

            if (lines === 0) {
                reportObject.callbacksNumberOfEmptyCallbacks++;
            } else if(!utils.useAnyArguments(node.body, errorParams)) {
                reportObject.callbacksNumberOfFunctionsNoUsageOfErrorArgument++;
            }


            // Counts number of returns
            handleReturns(functionBody, reportObject, errorParams, metricSizeObject, lines);

            // Counts number of continues
            const continueStatements = utils.getStatementsByType(functionBody, 'ContinueStatement');
            reportObject.callbacksNumberOfHandlersContinues += continueStatements.length;
            if(continueStatements.length > 0) {
                reportObject.callbacksNumberOfHandlersThatContinues++;
                metricSizeObject.continue = true;
            }


            // Counts number of breaks
            const breakStatements = utils.getStatementsByType(functionBody, 'BreakStatement');
            reportObject.callbacksNumberOfHandlersBreaks += breakStatements.length;

            if(breakStatements.length > 0) {
                reportObject.callbacksNumberOfHandlersThatBreaks++;
                metricSizeObject.break = true;
                if (lines === 1) {
                    reportObject.callbacksNumberOfHandlersBreaksOnly++;
                }
            }

            handleIfStatements(node, errorParams, reportObject);

            metric_size_array.push(metricSizeObject);
        }
    }
}

function handleReturns(functionBody, reportObject, errorParams, metricSizeObject, lines) {
    const returnStatements = utils.getStatementsByType(functionBody, 'ReturnStatement');
    const numberOfReturnStatements = returnStatements.length;
    
    reportObject.callbacksNumberOfHandlersReturns += numberOfReturnStatements;
    
    const numberOfLiterals = utils.numberOfLiterals(returnStatements);
    const numberOfErrorObjects = utils.numberOfErrorObjects(returnStatements);
    
    reportObject.callbacksNumberOfHandlersReturnsLiteral += numberOfLiterals;
    reportObject.callbacksNumberOfHandlersReturnsErrorObject += numberOfErrorObjects;
    reportObject.callbacksNumberOfHandlersThatRereturns += utils.reuseAnErrorStatements(returnStatements, errorParams);
    
    // Number of callbacks having at least one return statement
    if (numberOfReturnStatements > 0) {
        reportObject.callbacksNumberOfHandlersThatReturns++;
    }
    
    if (numberOfErrorObjects > 0) {
        reportObject.callbacksNumberOfHandlersThatReturnsErrorObject++;
    }
    
    if (returnStatements.length > 0) {
        reportObject.callbacksNumberOfHandlersThatReturns++;
    }
    
    if (numberOfLiterals > 0) {
        reportObject.callbacksNumberOfHandlersThatReturnsLiteral++;
        metricSizeObject.returnLiteral = true;
        if (lines === 1) {
            reportObject.callbacksNumberOfHandlersThatReturnsLiteralOnly++;
        }
    }
    
    if (utils.hasUndefined(returnStatements)) {
        reportObject.callbacksNumberOfHandlersThatReturnsUndefined++;
        metricSizeObject.returnUndefined = true;
        if (lines === 1) {
            reportObject.callbacksNumberOfHandlersThatReturnsUndefinedOnly++;
        }
    }
    
    if (utils.hasNull(returnStatements)) {
        reportObject.callbacksNumberOfHandlersThatReturnsNull++;
        metricSizeObject.returnNull = true;
        if (lines === 1) {
            reportObject.callbacksNumberOfHandlersThatReturnsNullOnly++;
        }
    }
    
    if (utils.hasErrorObject(returnStatements)) {
        metricSizeObject.returnErrorObject = true;
    }
    
    const rereturns = utils.reuseAnErrorStatements(returnStatements, errorParams);
    if (rereturns.length > 0) {
        metricSizeObject.rereturn = true;
    }
}

function handleThrowStatement(functionBody, reportObject, errorArguments, lines, metricSizeObject) {

    const throwStatements = utils.getStatementsByType(functionBody, 'ThrowStatement');
    reportObject.callbacksNumberOfHandlersThrows += throwStatements.length;

    const numberOfLiterals = utils.numberOfLiterals(throwStatements);
    reportObject.callbacksNumberOfHandlersThrowsLiteral += numberOfLiterals;
    reportObject.callbacksNumberOfHandlersThrowsErrorObject += utils.numberOfErrorObjects(throwStatements);

    // Save the number of callbacks that throws
    if (throwStatements.length > 0) {
        reportObject.callbacksNumberOfHandlersThatThrows++;

        if (numberOfLiterals > 0) {
            reportObject.callbacksNumberOfHandlersThatThrowsLiteral++;
            metricSizeObject.throwLiteral = true;
            if (lines === 1) {
                reportObject.callbacksNumberOfHandlersThatThrowsLiteralOnly++;
            }
        }

        if(utils.hasUndefined(throwStatements)) {
            reportObject.callbacksNumberOfHandlersThatThrowsUndefined++;
            metricSizeObject.throwUndefined = true;
            if (lines === 1) {
                reportObject.callbacksNumberOfHandlersThatThrowsUndefinedOnly++;
            }
        }

        if (utils.hasNull(throwStatements)) {
            reportObject.callbacksNumberOfHandlersThatThrowsNull++;
            metricSizeObject.throwNull = true;
            if (lines === 1) {
                reportObject.callbacksNumberOfHandlersThatThrowsNullOnly++;
            }
        }

        if(utils.hasErrorObject(throwStatements)) {
            reportObject.callbacksNumberOfHandlersThatThrowsErrorObject++;
            metricSizeObject.throwErrorObject = true;
        }
    }

    // Get number of rethrows on the callback
    const rethrowStatements = utils.reuseAnErrorStatements(throwStatements, errorArguments);
    reportObject.callbacksNumberOfHandlersRethrows += rethrowStatements;
    // Save the number of callbacks that rethrows
    if (rethrowStatements > 0) {
        reportObject.callbacksNumberOfHandlersThatRethrows++;
        metricSizeObject.rethrow = true;
    }
}

function handleIfStatements(node, errorArguments, reportObject) {
    const bodyFunction = node.body.body;
    const ifStatements = getIfStatementsWithErrorArgs(bodyFunction, errorArguments);
    ifStatements.forEach(ifStatement => {
        const ifStatementConsequent = ifStatement.consequent;
        if (ifStatementConsequent) {
            const numberOfStatementsOnIf = utils.getNumberOfLines(ifStatementConsequent);
            if (numberOfStatementsOnIf === 1) {
                reportObject.callbacksNumberOfFunctionsWithUniqueStatement++;
                const uniqueStatement = ifStatementConsequent.body[0];
                if (utils.isConsoleStatement(uniqueStatement)) {
                    reportObject.callbacksNumberOfFunctionsWithUniqueConsole++;
                }
            }
        }
    });
}

function getIfStatementsWithErrorArgs(body, errorVariables) {
    let statements = [];
    body.forEach(statement => {
        if (statement.type === 'IfStatement') {
            const containsErrorArgOnTest = utils.useAnyArguments(statement.test, errorVariables);
            if (containsErrorArgOnTest) {
                statements.push(statement);
            }
        }
    });

    return statements;
}

module.exports = {
    handleAnalysis
};
