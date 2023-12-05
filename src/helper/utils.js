/**
 * CheckIfNotEmpty is for checking text is empty or not
 * @param text
 * @returns {*|boolean}
 * @constructor
 */
export const CheckIfNotEmpty = (text) => !(text == null || /^\s*$/.test(text));

/**
 * ToTitleCase is for convert lines/text into title case
 * @param {string} txt
 * @returns {stargin}
 * @constructor
 */
export const ToTitleCase = (txt) =>
    txt
        .split(" ")
        .map(
            (_i) =>
                _i.slice(0, 1).toUpperCase() +
                _i.slice(1, _i.length).toLowerCase()
        )
        .join(" ");

function isObject(value) {
    const type = typeof value;
    return value != null && (type === "object" || type === "function");
}

export const setRecurssiveObjectKeys = (object, path, value) => {
    if (!isObject(object)) {
        return { ...object };
    }
    path = path.split(".");
    const { length } = path;
    const lastIndex = length - 1;

    let index = -1;
    let nested = object;
    while (nested != null && ++index < length) {
        const key = path[index];
        let newValue = value;
        if (index !== lastIndex) {
            const objValue = nested[key];
            newValue = objValue;
        }
        nested[key] = newValue;
        nested = nested[key];
    }
    return object;
};

export const removeUndefinedOrNullFromObject = (object) => {
    const keys = Object.keys(object);
    keys.forEach((key) => {
        const element = object[key];
        if (!element || (Array.isArray(element) && element.length === 0)) {
            delete object[key];
        } else if (
            typeof element === "object" &&
            Object.keys(element).length > 0
        ) {
            return removeUndefinedOrNullFromObject(element);
        }
        return null;
    });
    return object;
};

export const getRecurssiveObjectKeys = (object, path) => {
    if (!isObject(object)) {
        return object;
    }
    path = path.split(".");
    const { length } = path;

    let index = -1;
    let nested = object;
    while (nested != null && ++index < length) {
        const key = path[index];
        nested = nested[key];
    }
    return nested;
};

export const getUniqueArray = (arr) =>
    arr.filter((item, index) => arr.indexOf(item) === index);

export const printErrorsOnConsole = (error) => console.log("error :>> ", error);
