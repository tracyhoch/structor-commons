/*
 * Copyright 2015 Alexander Pustovalov
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { forOwn, has, isEmpty } from 'lodash';
import * as config from '../configuration.js';
import {readFile, ensureFilePath, writeFile} from '../commons/fileManager.js';
import {getPackageAbsolutePath, installPackages, appendScripts} from '../commons/npmUtils.js';

export function installDependencies(dependencies) {
    let installTask = Promise.resolve();
    if (dependencies) {
        const { packages, scripts } = dependencies;
        // const projectConfig = config.getProjectConfig();
        // if (!has(projectConfig, 'conf.paths.assetsDirPath')) {
        //     return Promise.reject('Wrong project configuration. \'assetsDirPath\' field is missing.');
        // }
        // if (!has(projectConfig, 'conf.files.assetsIndexFilePath')) {
        //     return Promise.reject('Wrong project configuration. \'assetsIndexFilePath\' field is missing.');
        // }
        if (packages && packages.length > 0) {
            let packageNames = '';
            packages.forEach(pkg => {
              const version = pkg.version && pkg.version.trim().length > 0 ? '@' + pkg.version.trim() : '';
              packageNames += pkg.name + version + ' ';
            });
            installTask = installTask.then(() => {
                packageNames = packageNames.substr(0, packageNames.length - 1);
                if (packageNames && packageNames.length > 0) {
                    return installPackages(packageNames, config.getProjectDir());
                }
            });
            // packages.forEach(pkg => {
            //     const { copy } = pkg;
            //     if (copy && copy.length > 0) {
            //         let absDirPath;
            //         installTask = installTask.then(() => {
            //             return getPackageAbsolutePath(pkg.name, config.getProjectDir())
            //                 .then(packagePath => {
            //                     if(!packagePath){
            //                         throw Error('Package ' + pkg.name + ' was not installed properly.');
            //                     }
            //                     absDirPath = packagePath;
            //                 });
            //         });
            //         copy.forEach(copyItem => {
            //             installTask = installTask.then(() => {
            //                 const absSrcPath = path.join(absDirPath, copyItem.from).replace(/\\/g, '/');
            //                 const absDestPath = path.join(projectConfig.conf.paths.assetsDirPath, copyItem.to).replace(/\\/g, '/');
            //                 return engine.copyFile(absSrcPath, absDestPath);
            //             });
            //         });
            //     }
            // });

        }
        if (scripts && !isEmpty(scripts)) {
            installTask = installTask.then(() => {
                return appendScripts(scripts, config.getProjectDir());
            });
        }
    }
    return installTask;
}

export function saveGenerated(dependencies, files) {
    return installDependencies(dependencies)
        .then(() => {
            let fileSavers = [];
            files.forEach(fileObject => {
                fileSavers.push(
                    ensureFilePath(fileObject.outputFilePath).then(() => {
                        return writeFile(fileObject.outputFilePath, fileObject.sourceCode, false);
                    })
                );
            });
            return Promise.all(fileSavers);
        });
}
