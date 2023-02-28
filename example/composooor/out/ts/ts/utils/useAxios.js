"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAxiosGet = void 0;
const axios_1 = __importDefault(require("axios"));
const useAsync_1 = require("./useAsync");
function useAxiosGet(url, options, skipIfDidntChanged) {
    return (0, useAsync_1.useAsync)(async () => {
        return axios_1.default.get(url, options);
    }, skipIfDidntChanged);
}
exports.useAxiosGet = useAxiosGet;
//# sourceMappingURL=useAxios.js.map