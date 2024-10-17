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
    ];
    return pastelColorPalette[index % pastelColorPalette.length];
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
