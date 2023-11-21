import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const AreaChartComponent = ({ data }) => {
    // Personalização do Tooltip
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="custom-tooltip" style={{ backgroundColor: "#fff", padding: "5px", border: "1px solid #999" }}>
                    <p className="label">{`${label} : ${payload[0].value}`}</p>
                </div>
            );
        }
        return null;
    };

    return (
        <ResponsiveContainer width="40%" height={100}>
            <LineChart
                data={data}
                margin={{
                    top: 10, right: 30, left: 0, bottom: 0,
                }}
            >
                <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false}
                tickFormatter={() => ''}
                />
                <YAxis
                    domain={[4.5, 5.5]}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={() => ''}

                />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="value" stroke="#8884d8" dot={{ stroke: '#8884d8', strokeWidth: 2 }} activeDot={{ r: 8 }} />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default AreaChartComponent;
