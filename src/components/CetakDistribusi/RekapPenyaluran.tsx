import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { format, parse } from 'date-fns';

interface RekapPenyaluranProps {
    data: any;
    data2: any;
}

const styles = StyleSheet.create({
    page: {
        padding: 30,
        paddingVertical: 50,
        fontSize: 10,
        lineHeight: 1.5,
        fontFamily: 'Times-Roman',
    },
    header: {
        marginBottom: 20,
        textAlign: 'left',
    },
    title: {
        fontSize: 14,
        fontFamily: "Times-Bold",
        fontWeight: 'extrabold',
        marginBottom: 10,
    },
    subHeader: {
        fontSize: 10,
    },
    table: {
        marginTop: 10,
        width: '100%',
        borderWidth: 1,
        borderColor: '#000',
    },
    tableRow: {
        flexDirection: 'row',
    },
    tableCellHeader: {
        fontSize: 12,
        padding: 5,
        fontWeight: 'bold',
        borderRightWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#000',
        textAlign: 'center',
        fontFamily: "Times-Bold",
    },
    tableCell: {
        padding: 5,
        borderRightWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#000',
        textAlign: 'center',
    },
    summaryRow: {
        flexDirection: 'row',
        backgroundColor: '#f0f0f0',
    },
});

const groupDataByDate = (data:any) => {
    console.log()
    if (!Array.isArray(data)) return {};
    
    return data.reduce((acc, record) => {
        const date = format(new Date(record.giDate), "dd-MM-yyyy");
        if (!acc[date]) acc[date] = [];
        acc[date].push(record);
        return acc;
    }, {} as { [key: string]: any });
};

const RekapPenyaluran: React.FC<RekapPenyaluranProps> = ({ data = [], data2 = [] }) => {
    const groupedData = groupDataByDate(data);
    const groupedData2 = groupDataByDate(data2);
// console.log(groupedData2)
// console.log(groupedData)
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.title}>PT. Puri Kencana Merdeka Utama</Text>
                    <Text style={styles.subHeader}>STASIUN PENGISIAN DAN PENGANGKUTAN BULK ELPIJI (SPPBE)</Text>
                    <Text style={styles.subHeader}>Kawasan Industri Candi Blok XI No. 8, JL Candi Raya Timur, Ngaliyan, Semarang</Text>
                    <Text style={styles.subHeader}>Telp/Fax: 024-76633360 / 024-76633361</Text>
                </View>

                <Text style={[styles.title, { textAlign: 'center', fontFamily: "Times-Bold" }]}>
                    Penyaluran Elpiji 3 Kg
                </Text>
                {/* <Text style={{ textAlign: 'center', fontSize: 10, fontFamily: "Times-Bold"}}>Periode {format(new Date(), "MMyy")}</Text> */}

                {/* Render a table for each day */}
                {data && data.length > 0 ? (
                    Object.keys(groupedData).map(giDate => {
                        const parsedDate = parse(giDate, "dd-MM-yyyy", new Date());
                        const formattedDate = format(parsedDate, "EEEE, dd MMMM yyyy");

                        const dailyTotalQty = groupedData[giDate].reduce((total: any, item: { allocatedQty: any; }) => total + item.allocatedQty, 0);

                        const dailyTotalPending = groupedData[giDate].reduce((total: any, item: { allocatedQty: any; }) => total + item.allocatedQty, 0);

                        const dailyTotalFakultatif = groupedData[giDate].reduce((total: any, item: { allocatedQty: any; }) => total + item.allocatedQty, 0);

                        return (
                            <View key={giDate} style={{ marginBottom: 20 }} wrap={false}>
                                <Text style={{ marginTop: 5 }}>Penyaluran Tanggal: <Text style={{ fontFamily: "Times-Bold" }}>{formattedDate}</Text></Text>
                                <View style={styles.table}>
                                    {/* Table Header */}
                                    <View style={styles.tableRow}>
                                        <Text style={[styles.tableCellHeader, { flex: 2 }]}>No Transaksi</Text>
                                        <Text style={[styles.tableCellHeader, { flex: 3 }]}>Nama Agen</Text>
                                        <Text style={[styles.tableCellHeader, { flex: 1 }]}>Sopir</Text>
                                        <Text style={[styles.tableCellHeader, { flex: 1 }]}>Nopol</Text>
                                        <Text style={[styles.tableCellHeader, { flex: 1.5 }]}>No DO</Text>
                                        <Text style={[styles.tableCellHeader, { flex: 1 }]}>Status</Text>
                                        <Text style={[styles.tableCellHeader, { flex: 1 }]}>Jumlah</Text>
                                        <Text style={[styles.tableCellHeader, { flex: 1 }]}>Kg</Text>
                                    </View>

                                    {/* Table Rows */}
                                    {groupedData[giDate].map((item: any, index: any) => (
                                        <View style={styles.tableRow} key={index}>
                                            <Text style={[styles.tableCell, { flex: 2 }]}>{item.bpeNumber}</Text>
                                            <Text style={[styles.tableCell, { flex: 3, fontSize:9}]}>{item.agentName}</Text>
                                            <Text style={[styles.tableCell, { flex: 1 }]}>{item.driverName}</Text>
                                            <Text style={[styles.tableCell, { flex: 1 }]}>{item.licensePlate}</Text>
                                            <Text style={[styles.tableCell, { flex: 1.5 }]}>{item.deliveryNumber}</Text>
                                            <Text style={[styles.tableCell, { flex: 1 }]}>{"Refill"}</Text>
                                            <Text style={[styles.tableCell, { flex: 1 }]}>{item.allocatedQty}</Text>
                                            <Text style={[styles.tableCell, { flex: 1 }]}>{item.volume}</Text>
                                        </View>
                                    ))}

                                    {/* Summary Row */}
                                    <View style={[styles.tableRow, styles.summaryRow]}>
                                        <Text style={[styles.tableCell, { flex: 11, fontWeight: 'bold', textAlign: "left", fontFamily: "Times-Bold" }]}>Total</Text>
                                        <Text style={[styles.tableCell, { flex: 1, fontWeight: 'bold' }]}>{dailyTotalQty}</Text>
                                        <Text style={[styles.tableCell, { flex: 1, fontWeight: 'bold' }]}>{dailyTotalQty*3}</Text>
                                    </View>

                                    <View style={[styles.tableRow, styles.summaryRow]}>
                                        <Text style={[styles.tableCell, { flex: 11, fontWeight: 'bold', textAlign: "left", fontFamily: "Times-Bold" }]}>Total Pending</Text>
                                        <Text style={[styles.tableCell, { flex: 1, fontWeight: 'bold' }]}>{dailyTotalPending}</Text>
                                        <Text style={[styles.tableCell, { flex: 1, fontWeight: 'bold' }]}>{dailyTotalPending*3}</Text>
                                    </View>

                                    <View style={[styles.tableRow, styles.summaryRow]}>
                                        <Text style={[styles.tableCell, { flex: 11, fontWeight: 'bold', textAlign: "left", fontFamily: "Times-Bold" }]}>Total Fakultatif</Text>
                                        <Text style={[styles.tableCell, { flex: 1, fontWeight: 'bold' }]}>{dailyTotalFakultatif}</Text>
                                        <Text style={[styles.tableCell, { flex: 1, fontWeight: 'bold' }]}>{dailyTotalFakultatif*3}</Text>
                                    </View>
                                </View>
                            </View>
                        );
                    })
                ) : (
                    <Text style={{ textAlign: 'center', marginTop: 20 }}>No Data Available</Text>
                )}
            </Page>
        </Document>
    );
};

export default RekapPenyaluran