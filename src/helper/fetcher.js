export const fetcher = async (input, init) => {
    const res = await fetch(
        `${process.env.REACT_APP_SERVICEAPI}${input}`,
        init
    );
    return res.json();
};

export default fetcher;
