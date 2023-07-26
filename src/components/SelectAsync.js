import React, { useEffect, useMemo, useState } from "react";
import fetcher from "../helper/fetcher";
import useSWR from "swr";
import { Select } from "antd";

export default function SelectAsync({ url, onChange }) {
    const [qry, setQry] = useState("");
    const [qryStr, setQryStr] = useState("");

    const uri = useMemo(() => {
        return `${url}?search=${qry}`;
    }, [qry]);

    const { data: result } = useSWR(uri, fetcher, { revalidateOnFocus: false });

    useEffect(() => {
        const time = setTimeout(() => {
            if (!!qryStr) {
                setQry(qryStr);
            }
        }, 500);
        return () => clearTimeout(time);
    }, [qryStr]);
    return (
        <Select
            showSearch
            placeholder="Select ..."
            optionFilterProp="children"
            onChange={onChange}
            onSearch={(val) => {
                setQryStr(val);
            }}
            filterOption={(input, option) =>
                (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
            }
            options={result?.data?.map((item) => ({
                label: item?.nama,
                value: item?.id,
            }))}
        />
    );
}
