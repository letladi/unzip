"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.unzip = unzip;
const child_process_1 = require("child_process");
const path_1 = require("path");
const uniqid_1 = __importDefault(require("uniqid"));
const fs_1 = require("fs");
function unzip(filepath, extractfilePath) {
    return __awaiter(this, void 0, void 0, function* () {
        const extractedFolderPath = extractfilePath || filepath + (0, uniqid_1.default)();
        return new Promise((resolve, reject) => {
            var _a;
            const child_ps = (0, child_process_1.exec)(`unzip ${filepath} -d ${extractedFolderPath}`);
            (_a = child_ps.stderr) === null || _a === void 0 ? void 0 : _a.on('data', (data) => {
                reject({ message: 'Could not complete unzip: ' + filepath });
            });
            child_ps.on('close', (code) => __awaiter(this, void 0, void 0, function* () {
                if (code === 0) {
                    try {
                        const files = yield listAllFiles(extractedFolderPath);
                        resolve({ extractedFolderPath, files });
                    }
                    catch (err) {
                        reject({ message: 'Error listing files', error: err });
                    }
                }
                else {
                    reject({ message: 'Could not complete unzip', code });
                }
            }));
            child_ps.on('error', (err) => {
                reject({ message: 'Error executing unzip', error: err });
            });
        });
    });
}
function listAllFiles(dir) {
    return __awaiter(this, void 0, void 0, function* () {
        const ret = [];
        try {
            const files = yield fs_1.promises.readdir(dir);
            for (const file of files) {
                const completePath = (0, path_1.join)(dir, file);
                const stat = yield fs_1.promises.lstat(completePath);
                if (stat.isDirectory()) {
                    const subFiles = yield listAllFiles(completePath);
                    ret.push(...subFiles);
                }
                else if (stat.isFile()) {
                    ret.push(completePath);
                }
            }
        }
        catch (e) {
            console.error('Error reading directory:', e);
        }
        return ret;
    });
}
