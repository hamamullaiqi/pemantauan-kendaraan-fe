import { defConfig } from "../redux/reducer/apiHandling";
export const fetcher = async (input, init) => {
    console.log({ ...init, ...defConfig() });
    const res = await fetch(`${process.env.REACT_APP_SERVICEAPI}${input}`, {
        ...init,
        ...defConfig(),
    });
    return res.json();
};

export default fetcher;
