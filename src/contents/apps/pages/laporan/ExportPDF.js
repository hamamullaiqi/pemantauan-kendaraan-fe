import { Button, Table, Typography } from "antd";
import dayjs from "dayjs";
import React, { useMemo, useRef } from "react";
import ReactToPrint from "react-to-print";
import useSWR from "swr";
import fetcher from "../../../../helper/fetcher";

// class ExportPDF extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             data: props.data,
//         };
//     }

//     componentDidUpdate(prevProps) {
//         if (prevProps.data !== this.props.data) {
//             this.setState({ data: this.props.data });
//         }
//     }

//     render() {
//         const { data } = this.state;
//         console.log(data);

//         return (
//             <div
//                 style={{
//                     margin: 8,
//                     fontSize: 14,
//                 }}
//             >
//                 Print
//             </div>
//         );
//     }
// }

// const PrintButton = ({ dataSource, icon, title, url, name }) => {
//     const theRef = useRef();

//     const { data } = useSWR(url, fetcher);

//     const formatedData = useMemo(() => {
//         return !!dataSource ? dataSource : data;
//     }, [dataSource]);

//     return (
//         <React.Fragment>
//             <ReactToPrint
//                 trigger={() => <Button icon={icon}>Print PDF</Button>}
//                 documentTitle={`${name}-${dayjs().unix()}`}
//                 content={() => theRef.current}
//             />
//             <div style={{ display: "none" }}>
//                 <ExportPDF data={formatedData} ref={theRef} />
//             </div>
//         </React.Fragment>
//     );
// };

const ExportPDF = ({ data, title, state }) => {
  const columns = [
    {
      title: "No",
      dataIndex: "_id",
      key: "_id",
      render: (text, _, idx) => idx + 1,
    },
    {
      title: "Tanggal ",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => dayjs(text).format("DD/MM/YY HH:ss"),
    },
    {
      title: "No Polisi",
      dataIndex: "nomer_polisi",
      key: "nomer_polisi",
      render: (text) => text,
    },
    {
      title: "Nama Supir",
      dataIndex: "nama_supir",
      key: "nama_supir",
      render: (text) => text,
    },
    {
      title: "Produk",
      dataIndex: "produkMasuk",
      key: "produkKeluar",
      render: (row) => row?.nama || "",
    },
    {
      title: "Vendor",
      dataIndex: "vendorMasuk",
      key: "vendorKeluar",
      render: (row) => row?.nama || "",
    },

    {
      title: "Gross",
      dataIndex: "gross",
      key: "gross",
      align: "right",

      render: (text) => text,
    },
    {
      title: "Tare",
      dataIndex: "tare",
      key: "tare",
      align: "right",

      render: (text) => text,
    },
    {
      title: "Nett",
      dataIndex: "nett",
      key: "nett",
      align: "right",

      render: (text) => text,
    },
    {
      title: "Keterangan",
      dataIndex: "keterangan",
      key: "keterangan",
      render: (text) => text,
    },
  ];
  console.log(state, data);
  const [startDate, endDate] = useMemo(() => {
    return state?.date;
  }, [state]);
  return (
    <div style={{ padding: 8 }}>
      <Typography
        style={{
          fontSize: 18,
          textAlign: "center",
          fontWeight: "bold",
        }}
      >
        {title || "No Title"}
      </Typography>
      <Typography
        style={{
          fontSize: 14,
          textAlign: "center",
        }}
      >
        Tanggal {dayjs(startDate).format("DD/MMM/YYYY")} -
        {dayjs(endDate).format("DD/MMM/YYYY")}
      </Typography>
      <div style={{ marginTop: 32 }}>
        <Table dataSource={data} columns={columns} pagination={false} />
      </div>
    </div>
  );
};

export default ExportPDF;
