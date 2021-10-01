;
var dataItems = [
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
var listEl = document.getElementById("list");
var paginationEl = document.getElementById("pagination");
var Pagination = /** @class */ (function () {
    function Pagination(data, listNode, paginationNode, rowsPerPage) {
        this._currentPage = 1;
        this._listNode = listNode;
        this._paginationNode = paginationNode;
        this._data = data;
        this._rowsPerPage = rowsPerPage;
        this._init();
    }
    Pagination.prototype._init = function () {
        this._renderPagination();
        this._renderList();
    };
    Pagination.prototype._renderPagination = function () {
        this._paginationNode.innerHTML = "";
        var pageCount = Math.ceil(this._data.length / this._rowsPerPage);
        for (var i = 1; i < pageCount + 1; i++) {
            var btn = this._createBtn(i);
            this._paginationNode.appendChild(btn);
        }
    };
    Pagination.prototype._renderList = function () {
        this._listNode.innerHTML = '';
        var page = this._currentPage - 1;
        var start = this._rowsPerPage * page;
        var end = start + this._rowsPerPage;
        var newList = this._data.slice(start, end);
        for (var i = 0; i < newList.length; i++) {
            var item = newList[i];
            var itemEl = document.createElement("div");
            itemEl.classList.add("item");
            itemEl.innerText = item;
            this._listNode.appendChild(itemEl);
        }
    };
    Pagination.prototype._createBtn = function (numberPage) {
        var _this = this;
        var button = document.createElement("button");
        button.innerText = String(numberPage);
        if (this._currentPage == numberPage)
            button.classList.add("active");
        button.addEventListener("click", function (event) {
            _this._currentPage = numberPage;
            var activeBtn = _this._paginationNode.querySelector("button.active");
            activeBtn.classList.remove('active');
            event.target.classList.add("active");
            _this._renderList();
        });
        return button;
    };
    return Pagination;
}());
new Pagination(dataItems, listEl, paginationEl, 5);
