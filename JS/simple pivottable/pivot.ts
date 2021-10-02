interface IOptions {
    xAxis: string[];
    yAxis: string[];
    measure: string;
}

interface IAggregator {
    data: any[];
    put: (data: { [key: string]: string | number }) => IAggregator;
    getValue: (measure: string) => number | null;
}

interface IPivot {
    getXs: () => string[][];
    getYs: () => string[][];
    getValue: (x: number | null, y: number | null) => number | null;
}

class Pivot implements IPivot {
    private readonly _options: IOptions = {xAxis: [], yAxis: [], measure: ''};
    private readonly _data: { [id: string]: string | number }[] = []
    private _xAxisKeysMap: { [id: string]: IAggregator } = {};
    private _yAxisKeysMap: { [id: string]: IAggregator } = {};
    private _xAxisKeys: string[][] = [];
    private _yAxisKeys: string[][] = [];
    private _tree: { [xId: string]: { [yId: string]: IAggregator } } = {};

    private _aggregator: any = function () {
        return {
            data: [],
            put: function (record): IAggregator {
                this.data.push(record);
                return this;
            },
            getValue: function (measure: string): number | null {
                const len = this.data.length - 1;
                return this.data?.[len]?.[measure] || null;
            },
        }
    }

    public constructor(data: { [id: string]: string | number }[], options: IOptions) {
        this._data = data;
        this._options = options;
        this._createPivot();
    }

    private _createPivot(): void {
        this._recordData();
        this._xAxisKeysSort();
        this._yAxisKeysSort();

    }

    private _recordData(): void {
        const len = this._data.length;
        for (let i = 0; i < len; i++) {
            let record = this._data[i];
            this._processRecord(record);
        }
    }

    private _processRecord(data: { [id: string]: string | number }): void {
        const xKeys: string[] = [];
        const yKeys: string[] = [];

        this._options.xAxis.forEach((xId) => {
            if (data[xId]) {
                const x = String(data[xId]);
                xKeys.push(x);
            }
        });

        this._options.yAxis.forEach((yId) => {
            if (data[yId]) {
                const y = String(data[yId]);
                yKeys.push(y);
            }
        });

        const xKeysFlat = xKeys.join(' ');
        const yKeysFlat = yKeys.join(' ');

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
            if (!this._tree[xKeysFlat]) this._tree[xKeysFlat] = {};
            if (!this._tree[xKeysFlat][yKeysFlat]) this._tree[xKeysFlat][yKeysFlat] = this._aggregator();
            this._tree[xKeysFlat][yKeysFlat].put(data);
        }
    }

    private _xAxisKeysSort(): void {
        this._xAxisKeys = this._xAxisKeys.sort(this._compare);
    }

    private _yAxisKeysSort(): void {
        this._yAxisKeys = this._yAxisKeys.sort(this._compare);
    }

    public getValue = (x: number | null, y: number | null): number | null => {
        if (x === null && y === null) return null;
        const measure: string = this._options.measure;

        const xKey = this._xAxisKeys[x] || [];
        const yKey = this._yAxisKeys[y] || [];
        const xKeyFlat = xKey.join(' ');
        const yKeyFlat = yKey.join(' ');

        if (yKey.length === 0) {
            const value = this._xAxisKeysMap?.[xKeyFlat]?.getValue(measure) || null;
            return value;
        }
        if (xKey.length === 0) {
            const value = this._yAxisKeysMap?.[yKeyFlat]?.getValue(measure) || null;
            return value;
        }

        if (xKey.length > 0 && yKey.length > 0) {
            const value = this._tree?.[xKeyFlat]?.[yKeyFlat]?.getValue(measure) || null;
            return value;
        }

        return null
    }

    public getXs(): string[][] {
        return this._xAxisKeys
    }

    public getYs(): string[][] {
        return this._yAxisKeys
    }


    private _compare = (a: string[], b: string[], index?: number) => {
        let i = index || 0;
        if (i >= a?.length || i >= b?.length) return 1;
        else if (a[i] > b[i]) return 1;
        else if (a[i] < b[i]) return -1;
        else return this._compare(a, b, ++i);
    }
}
