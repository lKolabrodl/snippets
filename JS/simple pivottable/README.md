# simple Pivot Table js

Класс для создания структуры данных сводной таблицы, и получения их.

---
<br>
Принимает два аргумента :
<br>
<b>data</b> - массив объектов 
<br>
<b>options</b> - с полями объекта xAxis, yAxis, measure
<br>
xAxis и yAxis - id осей, в виде массива строк
<br>
measure - id значения, в виде строки
<br>

---
Отдает:
<br>
<b>getXs()</b> - все заголовки в виде двумерного массива по оси x
<br>
<b>getYs()</b> - все заголовки в виде двумерного массива по оси y
<br>
<b>getYs(x, y)</b> - функцию, которая принимает индексы по оси x и y и отдает число

<br>

[demo link](https://htmlpreview.github.io/?https://github.com/lKolabrodl/snippets/blob/master/JS/simple%20pivottable/index.html)

<br>

Название файла  | Содержание файла
----------------|----------------------
rawData.js      | моковый набор данных
pivot.ts        | файл с исходником, управляющий класс
pivot.ts        | скомпилированный файл из ts
index.html      | страница с тестовым выводом таблицы
main.css        | стили для тестового вывода таблицы
screen/* .png   | Скриншоты превью

<br>
<br>

![Alt text](https://raw.githubusercontent.com/lKolabrodl/snippets/master/JS/simple%20pivottable/screen/pivot1.png)
![Alt text](https://raw.githubusercontent.com/lKolabrodl/snippets/master/JS/simple%20pivottable/screen/pivot2.png)
