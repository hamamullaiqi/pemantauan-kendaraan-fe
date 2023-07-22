import { API } from "../redux/reducer/apiHandling";

export const fetcher = async (input) => {
    const res = await API.get(`${process.env.REACT_APP_SERVICEAPI}${input}`);
    console.log(res.data);
    return res.data;
};

export default fetcher;
