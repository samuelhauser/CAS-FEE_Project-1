export const isToday = (someDate) => {
    const today = new Date();
    // eslint-disable-next-line max-len
    return someDate.getDate() === today.getDate() && someDate.getMonth() === today.getMonth() && someDate.getFullYear() === today.getFullYear();
};

export const isYesterday = (someDate) => {
    const yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
    // eslint-disable-next-line max-len
    return someDate.getDate() === yesterday.getDate() && someDate.getMonth() === yesterday.getMonth() && someDate.getFullYear() === yesterday.getFullYear();
};

export const isTomorrow = (someDate) => {
    const tomorrow = new Date(new Date().setDate(new Date().getDate() + 1));
    // eslint-disable-next-line max-len
    return someDate.getDate() === tomorrow.getDate() && someDate.getMonth() === tomorrow.getMonth() && someDate.getFullYear() === tomorrow.getFullYear();
};

export const isBeforeToday = (someDate) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return someDate < today;
};

export const isAfterTomorrow = (someDate) => {
    const tomorrow = new Date(new Date().setDate(new Date().getDate() + 2));
    tomorrow.setHours(0, 0, 0, 0);
    return someDate > tomorrow;
};
