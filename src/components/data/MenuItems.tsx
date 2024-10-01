import { DatabaseOutlined, HomeOutlined } from "@ant-design/icons";
import Link from "next/link";

export const menuItems = [
  {
    key: "1",
    icon: <HomeOutlined />,
    label: "Dashboard",
    children: [
      { key: "2", label: <Link href="/dashboard/penyaluranElpiji">Penyaluran Elpiji</Link> },
      { key: "3", label: <Link href="/dashboard/alokasi">Alokasi</Link> },
      { key: "4", label: <Link href="/dashboard/cetakPenyaluran">Cetak Penyaluran</Link> },
    ],
  },
  {
    key: "5",
    icon: <DatabaseOutlined />,
    label: "Master Data",
    children: [
      { key: "6", label: <Link href="/masterData/agen">Agen</Link> },
      { key: "7", label: <Link href="/masterData/ptAgen">PT Agen</Link> },
    ],
  },
];