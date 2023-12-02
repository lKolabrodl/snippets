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