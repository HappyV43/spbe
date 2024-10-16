interface LegendProps {
    data: { agentName: string; fill: string; qty: number }[]; // Update the type based on pieData structure
}

export const Legend = ({ data }: LegendProps) => {
    return (
        <div className="flex flex-col space-y-2">
            {data.map((entry, index) => (
                <div key={index} className="flex items-center space-x-2">
                    <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: entry.fill }} // Use the color from pieData
                    ></div>
                    <span className="text-xs font-medium">{entry.agentName}</span> {/* Display agent name */}
                </div>
            ))}
        </div>
    );
};