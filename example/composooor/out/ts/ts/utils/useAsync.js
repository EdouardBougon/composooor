"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAsync = void 0;
const react_1 = require("react");
function useAsync(callback, skipIfDidntChanged) {
    const [loading, setLoading] = (0, react_1.useState)(true);
    const [error, setError] = (0, react_1.useState)();
    const [data, setData] = (0, react_1.useState)();
    (0, react_1.useEffect)(() => {
        callback()
            .then((response) => {
            setLoading(false);
            setData(response);
        })
            .catch((err) => {
            setLoading(false);
            setError(err);
        });
    }, skipIfDidntChanged);
    return {
        loading: loading,
        error: error,
        data: data,
    };
}
exports.useAsync = useAsync;
//# sourceMappingURL=useAsync.js.map