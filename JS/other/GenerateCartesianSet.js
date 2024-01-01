/**
 * @param arrays
 * @returns {string[]|*[]}
 * @description генерирую из двумерного массива, массив уникальные комбинаций
 */

const generateCartesianProduct = (arrays) => {
    const combineArrays = (arr1, arr2) =>
        arr1.flatMap((item1) => arr2.map((item2) => `${item1}${item2}`));
    if (arrays.length === 0) return [];

    let result = [...arrays[0]];

    for (let i = 1; i < arrays.length; i++) {
        result = combineArrays(result, arrays[i]);
    }

    return result.map(String);
};

/**
 * inner [['👨','🧑'], ['👩‍🦰'],['🍗','🥟','🥘',]]
 * out ["👨👩‍🦰🍗", "👨👩‍🦰🥟", "👨👩‍🦰🥘", "🧑👩‍🦰🍗", "🧑👩‍🦰🥟", "🧑👩‍🦰🥘"]
 *
 */

// ============================================================================================================================================

/**
 * @param {string[]} arr
 * @description перебор всех возможных комбинаций одномерного массива
 */
function perm(arr) {
  if (arr.length > 1) {
    const beg = arr[0];
    const arr1 = perm(arr.slice(1));
    const arr2 = [];
    const l = arr1[0].length;
    for (let i = 0; i < arr1.length; i++)
      for (let j = 0; j <= l; j++)
        arr2.push(arr1[i].slice(0, j).concat(beg, arr1[i].slice(j)));
    return arr2;
  } else return [arr];
}
/**
 * inner : ['👨','👩‍','🦰']
 * out : [["👨", "👩‍", "🦰"], ["👩‍", "👨", "🦰"], ["👩‍", "🦰", "👨"], ["👨", "🦰", "👩‍"], ["🦰", "👨", "👩‍"], ["🦰", "👩‍", "👨"]]
 */

