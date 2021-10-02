var Pivot = /** @class */ (function () {
    function Pivot(data, options) {
        var _this = this;
        this._options = { xAxis: [], yAxis: [], measure: '' };
        this._data = [];
        this._xAxisKeysMap = {};
        this._yAxisKeysMap = {};
        this._xAxisKeys = [];
        this._yAxisKeys = [];
        this._tree = {};
        this._aggregator = function () {
            return {
                data: [],
                put: function (record) {
                    this.data.push(record);
                    return this;
                },
                getValue: function (measure) {
                    var _a, _b;
                    var len = this.data.length - 1;
                    return ((_b = (_a = this.data) === null || _a === void 0 ? void 0 : _a[len]) === null || _b === void 0 ? void 0 : _b[measure]) || null;
                }
            };
        };
        this.getValue = function (x, y) {
            var _a, _b, _c, _d, _e, _f, _g;
            if (x === null && y === null)
                return null;
            var measure = _this._options.measure;
            var xKey = _this._xAxisKeys[x] || [];
            var yKey = _this._yAxisKeys[y] || [];
            var xKeyFlat = xKey.join(' ');
            var yKeyFlat = yKey.join(' ');
            if (yKey.length === 0) {
                var value = ((_b = (_a = _this._xAxisKeysMap) === null || _a === void 0 ? void 0 : _a[xKeyFlat]) === null || _b === void 0 ? void 0 : _b.getValue(measure)) || null;
                return value;
            }
            if (xKey.length === 0) {
                var value = ((_d = (_c = _this._yAxisKeysMap) === null || _c === void 0 ? void 0 : _c[yKeyFlat]) === null || _d === void 0 ? void 0 : _d.getValue(measure)) || null;
                return value;
            }
            if (xKey.length > 0 && yKey.length > 0) {
                var value = ((_g = (_f = (_e = _this._tree) === null || _e === void 0 ? void 0 : _e[xKeyFlat]) === null || _f === void 0 ? void 0 : _f[yKeyFlat]) === null || _g === void 0 ? void 0 : _g.getValue(measure)) || null;
                return value;
            }
            return null;
        };
        this._compare = function (a, b, index) {
            var i = index || 0;
            if (i >= (a === null || a === void 0 ? void 0 : a.length) || i >= (b === null || b === void 0 ? void 0 : b.length))
                return 1;
            else if (a[i] > b[i])
                return 1;
            else if (a[i] < b[i])
                return -1;
            else
                return _this._compare(a, b, ++i);
        };
        this._data = data;
        this._options = options;
        this._createPivot();
    }
    Pivot.prototype._createPivot = function () {
        this._recordData();
        this._xAxisKeysSort();
        this._yAxisKeysSort();
    };
    Pivot.prototype._recordData = function () {
        var len = this._data.length;
        for (var i = 0; i < len; i++) {
            var record = this._data[i];
            this._processRecord(record);
        }
    };
    Pivot.prototype._processRecord = function (data) {
        var xKeys = [];
        var yKeys = [];
        this._options.xAxis.forEach(function (xId) {
            if (data[xId]) {
                var x = String(data[xId]);
                xKeys.push(x);
            }
        });
        this._options.yAxis.forEach(function (yId) {
            if (data[yId]) {
                var y = String(data[yId]);
                yKeys.push(y);
            }
        });
        var xKeysFlat = xKeys.join(' ');
        var yKeysFlat = yKeys.join(' ');
        if (yKeys.length > 0) {
            if (!this._yAxisKeysMap[yKeysFlat]) {
                this._yAxisKeysMap[yKeysFlat] = this._aggregator();
                this._yAxisKeys.push(yKeys);
            }
            this._yAxisKeysMap[yKeysFlat].put(data);
        }
        if (xKeys.length > 0) {
            if (!this._xAxisKeysMap[xKeysFlat]) {
                this._xAxisKeysMap[xKeysFlat] = this._aggregator();
                this._xAxisKeys.push(xKeys);
            }
            this._xAxisKeysMap[xKeysFlat].put(data);
        }
        if (xKeys.length > 0 && yKeys.length > 0) {
            if (!this._tree[xKeysFlat])
                this._tree[xKeysFlat] = {};
            if (!this._tree[xKeysFlat][yKeysFlat])
                this._tree[xKeysFlat][yKeysFlat] = this._aggregator();
            this._tree[xKeysFlat][yKeysFlat].put(data);
        }
    };
    Pivot.prototype._xAxisKeysSort = function () {
        this._xAxisKeys = this._xAxisKeys.sort(this._compare);
    };
    Pivot.prototype._yAxisKeysSort = function () {
        this._yAxisKeys = this._yAxisKeys.sort(this._compare);
    };
    Pivot.prototype.getXs = function () {
        return this._xAxisKeys;
    };
    Pivot.prototype.getYs = function () {
        return this._yAxisKeys;
    };
    return Pivot;
}());
