const sortType = {
    // eslint-disable-next-line no-nested-ternary
    string: (a, b) => (a > b ? 1 : a < b ? -1 : 0),
    number: (a, b) => b - a,
    date: (a, b) => a - b,
};

export const sortItemsBy = (items, sort) => {
    if (items.length <= 0) return [];
    const sortFn = ((items[0][sort]) instanceof Date)
        ? sortType.date
        : sortType[typeof (items[0][sort])];
    if (!sortFn) return items;
    return [...items].sort((a, b) => sortFn(a[sort], b[sort]));
};
