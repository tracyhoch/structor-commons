import {
	findDefaultExportsNode,
	findExportsNode,
	getImportsObject,
	getExportObject,
	getNamedExportObject,
	addNamespaceImport,
	addDefaultImport,
	addNamedExport
} from './astUtils.js';

import {
	fulex,
	traverse,
	traverseWithResult,
	traverseModel,
	traverseModelWithResult,
	parse,
	generate,
	formatJs,
	writeErrorFileFor,
	repairPath
} from './utils.js';

import {
	getModelComponentMap
} from './modelParser.js';

import {
	ensureFilePath,
	ensureDirPath,
	readFile,
	writeFile,
	writeBinaryFile,
	placeInPosition,
	copyFiles,
	copyFilesNoError,
	copyFile,
	traverseDirTree,
	isExisting,
	findComponentFilePath,
	readDirectoryTree,
	readDirectory,
	readDirectoryFiles,
	readDirectoryFlat,
	checkDirIsEmpty,
	readJson,
	writeJson,
	removeFile,
	unpackTarGz,
	unpackTar,
	repackTarGzOmitRootDir,
	packTarGz
} from './fileManager.js';

import {
	installPackages,
	installDefault,
	getNpmConfigVariable,
	setNpmConfigVariable,
	getPackageAbsolutePath,
	getPackageVersion
} from './npmUtils.js';

export default {
	findDefaultExportsNode,
	findExportsNode,
	getImportsObject,
	getExportObject,
	getNamedExportObject,
	addNamespaceImport,
	addDefaultImport,
	addNamedExport,
	fulex,
	traverse,
	traverseWithResult,
	traverseModel,
	traverseModelWithResult,
	parse,
	generate,
	formatJs,
	writeErrorFileFor,
	repairPath,
	getModelComponentMap,
	ensureFilePath,
	ensureDirPath,
	readFile,
	writeFile,
	writeBinaryFile,
	placeInPosition,
	copyFiles,
	copyFilesNoError,
	copyFile,
	traverseDirTree,
	isExisting,
	findComponentFilePath,
	readDirectoryTree,
	readDirectory,
	readDirectoryFiles,
	readDirectoryFlat,
	checkDirIsEmpty,
	readJson,
	writeJson,
	removeFile,
	unpackTarGz,
	unpackTar,
	repackTarGzOmitRootDir,
	packTarGz,
	installPackages,
	installDefault,
	getNpmConfigVariable,
	setNpmConfigVariable,
	getPackageAbsolutePath,
	getPackageVersion
};
