import { eachMonthOfInterval, endOfWeek, endOfYear, format, getMonth, getYear, isSameDay, isWithinInterval, startOfWeek, startOfYear } from "date-fns";

export const generateColor = (index: number) => {
    const pastelColorPalette = [
        "#FEC631", // Bright Yellow
        "#F9591F", // Bright Orange
        "#F21E2C", // Bright Red
        "#B21D3B", // Deep Crimson
        "#6A1D41", // Dark Magenta
        "#3B0B3B", // Deep Purple
        "#00FFC9", // Neon Aqua
        "#00D7C9", // Aqua Blue
        "#0A9396", // Teal
        "#005F73", // Dark Teal
        "#94D2BD", // Pale Green
        "#E9D8A6", // Light Beige
        "#FF9F1C", // Warm Tangerine
        "#FFBF69", // Soft Peach
        "#FF686B", // Warm Coral
        "#6A0572", // Plum
        "#9D44B5", // Violet
        "#5F0A87", // Deep Violet
        "#D0E1F9", // Soft Sky Blue
        "#89C2D9", // Cool Blue
        "#1D3557", // Dark Navy
        "#457B9D", // Muted Blue
        "#A8DADC", // Soft Cyan
        "#F4A261", // Muted Orange
        "#F28482", // Coral Pink
        "#F7B2A9", // Pale Pink
        "#E29578", // Warm Light Brown
        "#E76F51", // Warm Terracotta
        "#264653", // Dark Slate Blue
        "#2A9D8F", // Cool Turquoise
        "#141414",
    ];
    return pastelColorPalette[index % pastelColorPalette.length];  
};

export const formatNumberQty = (num: number): string => {
    return num.toLocaleString('id-ID'); 
};

export const calculateTotalQty = (items: any) => {
    return items.reduce((sum: any, item: { allocatedQty: any; }) => sum + item.allocatedQty, 0);
};

export const calculateMontlyQty = (items: any) => {
    return items.reduce((sum: any, item: { totalElpiji: any; }) => sum + item.totalElpiji, 0);
};

export const calculateTotalVolume = (items: any) => {
    return items.reduce((sum: any, item: { allocatedQty: any; }) => sum + item.allocatedQty, 0);
};

export const calculateTotalAgen = (data: { agentName: string }[]) => {
    return new Set(data.map((item) => item.agentName)).size;
};

export const formatDateTime = (date:any) => {
    return date
        ? `${date.toLocaleDateString("id-ID", {
            weekday: "long",
            day: "2-digit",
            month: "long",
            year: "numeric",
        })}, ${date.toLocaleTimeString("id-ID", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
        })}`
        : "-"; 
};

export const normalizeDateFrom = (date: Date) => {
    const normalized = new Date(date);
    normalized.setHours(0, 0, 0, 0);
    return normalized;
};

export const normalizeDateTo = (date: Date) => {
    const normalized = new Date(date);
    normalized.setHours(23, 59, 59, 999);
    return normalized;
};

export const getMonthlyTotalQty = (data: any[]) => {
    const thisYear = getYear(new Date());
    
    const months = eachMonthOfInterval({
        start: startOfYear(new Date()),
        end: endOfYear(new Date()),
    });

    // Initialize a map to hold the total quantity for each month
    const monthlyTotals = months.map((month) => {
        const monthKey = format(month, "MMMM"); 
        return {
            month: monthKey,
            totalQty: 0,
        };
        });

        // Sum the quantities based on the month
        data.forEach((item) => {
        const itemMonth = getMonth(item.giDate); // Get the month (0-11)
        const itemYear = getYear(item.giDate);
        
        // If the item's year matches this year, add its qty to the appropriate month
        if (itemYear === thisYear) {
            const monthName = format(new Date(item.giDate), "MMMM");
            const monthIndex = monthlyTotals.findIndex((m) => m.month === monthName);
            if (monthIndex > -1) {
            monthlyTotals[monthIndex].totalQty += item.allocatedQty;
            }
        }
    });

    return monthlyTotals.map((monthData) => ({
    giDate: monthData.month,
    qty: monthData.totalQty,
    }));
};

export const getTodayTotalQty = (data: any[]) => {
    const today = new Date();

    // Filter items that match today's date and sum up the total quantity
    const totalQty = data
        .filter((item) => {
            const itemDate = new Date(item.giDate);
            // Check if the item's date is the same as today
            return isSameDay(itemDate, today);
        })
        .reduce((total, item) => total + item.allocatedQty, 0); // Sum up the allocated quantities

    return {
        giDate: format(today, "dd-MM-yyyy"),
        qty: totalQty,
    };
};

export const getWeekTotalQty = (data: any[]) => {
    const today = new Date();

    // Get the start and end of the current week
    const startOfWeekDate = startOfWeek(today, { weekStartsOn: 1 }); // Assuming the week starts on Monday
    const endOfWeekDate = endOfWeek(today);

    // Filter items whose date is within the current week
    return data
        .filter((item) => {
            const itemDate = new Date(item.giDate);
            // Check if the item's date is within this week's range
            return isWithinInterval(itemDate, { start: startOfWeekDate, end: endOfWeekDate });
        })
        .map((item) => ({
            giDate: format(new Date(item.giDate), "dd-MM-yyyy"), 
            qty: item.allocatedQty,
        }));
};

export function toNormalCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1 $2') // Handle camelCase and PascalCase (insert space between lowercase and uppercase letters)
    .replace(/[_-]/g, ' ')               // Replace underscores and hyphens with spaces (for snake_case and kebab-case)
    .replace(/\s+/g, ' ')                // Replace multiple spaces with a single space (in case of double spaces)
    .replace(/\b\w/g, char => char.toUpperCase()) // Capitalize the first letter of each word
    .trim();                             // Remove any leading or trailing spaces
}