'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getFile = getFile;

var _lodash = require('lodash');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _structorCommons = require('structor-commons');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getFile(dataObject, templateText) {
    var index = dataObject.index,
        model = dataObject.model,
        metadata = dataObject.metadata,
        project = dataObject.project,
        groupName = dataObject.groupName,
        componentName = dataObject.componentName;


    if (!(0, _lodash.has)(project, 'paths.appDirPath')) {
        throw Error('Wrong project configuration. \'appDirPath\' field is missing.');
    }

    var absoluteComponentDirPath = _path2.default.join(project.paths.appDirPath, 'components', groupName, componentName, 'tests');
    var absoluteComponentFilePath = _path2.default.join(absoluteComponentDirPath, 'index.test.js');

    var templateObject = {
        model: model, groupName: groupName, componentName: componentName, metadata: metadata
    };

    var resultSource = void 0;
    try {
        resultSource = (0, _lodash.template)(templateText)(templateObject);
    } catch (e) {
        throw Error('lodash template error. ' + e);
    }

    try {
        resultSource = _structorCommons.commons.formatJs(resultSource);
        resultSource = resultSource.replace(/(^\s*[\r\n]){2,}/gm, "\n");
    } catch (e) {
        throw Error('JavaScript syntax error. ' + e + '\n[Source code:]\n' + resultSource);
    }

    return {
        outputFilePath: absoluteComponentFilePath,
        sourceCode: resultSource
    };
}