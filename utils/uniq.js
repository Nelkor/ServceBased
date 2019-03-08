let i = 0;

export const uid = () => {
    return Number(++i).toString(36);
};
