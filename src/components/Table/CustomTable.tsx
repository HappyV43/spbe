import React, { useState } from 'react';
import { DownOutlined } from '@ant-design/icons';
import type { GetProp, RadioChangeEvent, TableProps } from 'antd';
import { Form, Radio, Space, Switch, Table } from 'antd';
import { createStyles } from 'antd-style';

type SizeType = TableProps['size'];
type ColumnsType<T extends object> = GetProp<TableProps<T>, 'columns'>;

interface DataType {
  key: number;
  name: string;
  age: number;
  address: string;
  description: string;
}

interface CustomTableProps {
  data: any[];
  columns:any[];
  bordered?: boolean;
  loading?: boolean;
  title?: string;
  expandable?: boolean;
  showHeader?: boolean;
  showFooter?: boolean;
  className?: string;
}


// Define your styles using createStyles
const useStyle = createStyles(({ css }) => ({
  customTable: css`
    .ant-table {
      margin-top: 20px; /* Space above the table */
      border-radius: 8px; /* Rounded corners */
      overflow: hidden; /* Round corners */
    }

    /* Style for table headers */
    .ant-table thead > tr > th {
      background-color: #e6f7ff; /* Light blue background */
      font-weight: bold; /* Bold text */
      font-size: 18px; /* Increased font size for headers */
      text-align: center; /* Center alignment */
      padding: 16px; /* Add padding */
    }

    /* Style for table cells */
    .ant-table td {
      padding: 12px; /* Padding for table cells */
      text-align: center; /* Center alignment */
    }

    /* Make table responsive */
    @media (max-width: 768px) {
      .ant-table {
        font-size: 14px; /* Reduce font size on small screens */
      }
    }
  `,
}));

const CustomTable: React.FC<CustomTableProps> = ({
  data,
  columns,
  bordered = false,
  loading = false,
  title,
  expandable,
  showHeader = true,
  showFooter = true,
  className,
}) => {
  const [size, setSize] = useState<SizeType>('large');
  const [rowSelection, setRowSelection] = useState<TableProps<DataType>['rowSelection'] | undefined>({});
  const [yScroll, setYScroll] = useState(true); // Enable vertical scroll by default
  const [xScroll, setXScroll] = useState<'fixed' | 'full' | undefined>('full');
  const [ellipsis, setEllipsis] = useState(false);
  const { styles } = useStyle();
  
  const handleYScrollChange = (enable: boolean) => {
    setYScroll(enable);
  };
  
  const handleXScrollChange = (e: RadioChangeEvent) => {
    setXScroll(e.target.value);
  };

  // Configure scroll settings based on state
  const scroll = {
    y: yScroll ? '54vh' : undefined, // Vertical scroll if yScroll is true
    x: xScroll === 'fixed' ? 'max-content' : (xScroll === 'full' ? '100vw' : undefined), // Horizontal scroll based on state
  };

  const handleSizeChange = (e: RadioChangeEvent) => {
    setSize(e.target.value);
  };

  const tableProps: TableProps<DataType> = {
    bordered,
    loading,
    size,
    title: title ? () => title : undefined,
    showHeader,
  };

  const tableColumns = columns.map((item) => ({ ...item, ellipsis }));
  if (xScroll === 'fixed') {
    tableColumns[0].fixed = true; // Fix the first column
    tableColumns[tableColumns.length - 1].fixed = 'right'; // Fix the last column
  }

  return (
    <>
      <Table<DataType>
        {...tableProps}
        columns={tableColumns}
        dataSource={data}
        scroll={scroll} // Apply the scroll configuration
        sticky={true}
        className={styles.customTable}
      />
    </>
  );
};

export default CustomTable;