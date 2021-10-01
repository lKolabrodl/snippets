;
const dataItems: string[] = [
    "Item 1",
    "Item 2",
    "Item 3",
    "Item 4",
    "Item 5",
    "Item 6",
    "Item 7",
    "Item 8",
    "Item 9",
    "Item 10",
    "Item 11",
    "Item 12",
    "Item 13",
    "Item 14",
    "Item 15",
    "Item 16",
    "Item 17",
    "Item 18",
    "Item 19",
    "Item 20",
    "Item 21",
    "Item 22",
];

const listEl: Element = document.getElementById("list");
const paginationEl: Element = document.getElementById("pagination");

class Pagination {
    private readonly _listNode: Element;
    private readonly _paginationNode: Element;
    private readonly _data: string[]
    private readonly _rowsPerPage: number;
    private _currentPage: number = 1;

    public constructor(data: string[], listNode: Element, paginationNode: Element, rowsPerPage: number) {
        this._listNode = listNode;
        this._paginationNode = paginationNode;
        this._data = data;
        this._rowsPerPage = rowsPerPage;
        this._init();
    }

    private _init(): void {
        this._renderPagination();
        this._renderList();
    }

    private _renderPagination(): void {
        this._paginationNode.innerHTML = "";
        const pageCount: number = Math.ceil(this._data.length / this._rowsPerPage);

        for (let i = 1; i < pageCount + 1; i++) {
            const btn = this._createBtn(i);
            this._paginationNode.appendChild(btn);
        }
    }

    private _renderList(): void {
        this._listNode.innerHTML = '';

        const page: number = this._currentPage - 1;
        const start: number = this._rowsPerPage * page;
        const end: number = start + this._rowsPerPage;
        const newList: string[] = this._data.slice(start, end);

        for (let i = 0; i < newList.length; i++) {
            const item = newList[i];
            const itemEl = document.createElement("div");
            itemEl.classList.add("item");
            itemEl.innerText = item;
            this._listNode.appendChild(itemEl);
        }
    }

    private _createBtn(numberPage: number): HTMLButtonElement {
        const button: HTMLButtonElement = document.createElement("button");
        button.innerText = String(numberPage);

        if (this._currentPage == numberPage) button.classList.add("active");

        button.addEventListener("click", (event: any) => {
            this._currentPage = numberPage;
            let activeBtn = this._paginationNode.querySelector("button.active");
            activeBtn.classList.remove('active')
            event.target.classList.add("active");

            this._renderList()
        });

        return button;
    }
}

new Pagination(dataItems, listEl, paginationEl, 5);



