import { Pagination, Table } from "antd";
import React, { Fragment } from "react";

export default function MainTable({ columns, dataSource, paginationProp }) {
    return (
        <Fragment>
            <Table
                className="table-in-page"
                style={{
                    minHeight: `calc(100vh - 300px)`,
                    marginTop: 16,
                }}
                columns={columns}
                dataSource={dataSource}
                scroll={{ y: `calc(100vh - 354px)` }}
                pagination={false}
            />
            {!!dataSource && !!paginationProp && (
                <div style={{ textAlign: "right" }}>
                    <Pagination {...paginationProp} />
                </div>
            )}
        </Fragment>
    );
}
