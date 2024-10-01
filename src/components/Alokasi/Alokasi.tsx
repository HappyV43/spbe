"use client";
import React, { useRef, useState } from "react";
import { Breadcrumb, Typography, Input, Space, Table, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import type { InputRef, TableColumnsType, TableColumnType } from "antd";
import type { FilterDropdownProps } from "antd/es/table/interface";
import { Content } from "antd/es/layout/layout";
import { createStyles } from 'antd-style'; // Make sure to import this
import CustomTable from "../Table/CustomTable";
import { AlokasiDataType, data } from "../data/DataAlokasi";

const { Title } = Typography;

const Alokasi = () => {
  const [totalData, setTotalData] = useState("600");
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [qtyFilter, setQtyFilter] = useState("");
  const [GIDateFilter, setGIDateFilter] = useState("");
  const [status, setStatus] = useState("");
  const searchInput = useRef<InputRef>(null);

  const filteredData = data.filter(item => 
    (qtyFilter ? item.qty.toString().includes(qtyFilter) : true) &&
    (GIDateFilter ? item.GIDate.includes(GIDateFilter) : true) &&
    (status ? item.status.includes(status) : true)
  );

  const handleSearch = (
    selectedKeys: string[],
    confirm: FilterDropdownProps["confirm"],
    dataIndex: keyof AlokasiDataType
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex: keyof AlokasiDataType): TableColumnType<AlokasiDataType> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes((value as string).toLowerCase()),
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns: TableColumnsType<AlokasiDataType> = [
    {
      title: "Delivery Number",
      dataIndex: "deliveryNumber",
      key: "deliveryNumber",
      width: "20%",
    },
    {
      title: "Ship To",
      dataIndex: "shipTo",
      key: "shipTo",
      width: "15%",
    },
    {
      title: "Nama Agen",
      dataIndex: "namaAgen",
      key: "namaAgen",
      width: "20%",
    },
    {
      title: "Quantity",
      dataIndex: "qty",
      key: "qty",
      width: "15%",
    },
    {
      title: "Material Name",
      dataIndex: "materialName",
      key: "materialName",
      width: "30%",
    },
    {
      title: "GI Date",
      dataIndex: "GIDate",
      key: "GIDate",
      width: "15%",
    },
    {
      title: "BPE",
      dataIndex: "BPE",
      key: "BPE",
      width: "20%",
    },
    {
      title: "Tanggal",
      dataIndex: "tanggal",
      key: "tanggal",
      width: "20%",
    },
    {
      title: "Periode",
      dataIndex: "periode",
      key: "periode",
      width: "20%",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: "20%",
    },
  ];

  return (
    <>
      <Content>
        <div className={`bg-white h-auto p-6 pb-2 rounded-lg`}>
          <Title>Alokasi {totalData}</Title>

          {/* Filter Inputs */}
          <Space style={{ marginBottom: 16 }}>
            <Title></Title>
            <Input
              placeholder="All Qty"
              value={qtyFilter}
              onChange={(e) => setQtyFilter(e.target.value)}
              style={{ width: 200 }}
            />
            <Input
              placeholder="All GI Date"
              value={GIDateFilter}
              onChange={(e) => setGIDateFilter(e.target.value)}
              style={{ width: 200 }}
            />
            <Input
              placeholder="All Status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              style={{ width: 200 }}
            />
          </Space>

          {/* TABLE */}
          <div className="pt-6">
            <CustomTable data={filteredData} columns={columns} bordered expandable />
          </div>
        </div>
      </Content>
    </>
  );
};

export default Alokasi;