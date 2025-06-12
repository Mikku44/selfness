// RadarChart.tsx
import React, { useEffect, useRef } from 'react';
import { Radar } from '@antv/g2plot';

interface RadarChartProps {
    data: Array<{
        category: string;
        value: number;
        type?: string; // For multiple series
    }>;
    title?: string;
    description?: string;
    yLabel?: string;
    maxValue?: number; // Maximum value for radar chart scale
}

const RadarChart: React.FC<RadarChartProps> = ({
    data,
    yLabel = "",
    title,
    description,
    maxValue = 100
}) => {
    const chartRef = useRef<HTMLDivElement>(null);
    const chartInstance = useRef<Radar | null>(null);

    useEffect(() => {
        if (chartRef.current) {
            // ตรวจสอบว่ามี instance ของแผนภูมิเก่าอยู่หรือไม่ ถ้ามี ให้ทำลายทิ้งก่อน
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }

            // สร้างแผนภูมิ Radar ใหม่
            chartInstance.current = new Radar(chartRef.current, {
                data,
                xField: 'category',
                yField: 'value',
                seriesField: data.some(item => item.type) ? 'type' : undefined, // Use type if available
                color: [
                    '#61DDAA',
                    '#78D3F8',
                    '#5B8FF9',
                    '#F6BD16',
                    '#7262FD',
                    '#9661BC'],
                meta: {
                    category: {
                        alias: 'Category',
                    },
                    value: {
                        alias: yLabel || 'Value',
                        min: 0,
                        max: maxValue,
                    },
                },
                // Radar specific configurations
                radius: 0.8, // Size of the radar chart
                area: {
                    // visible: true,
                    style: {
                          fill: 'l(90) 0:#61DDAA 0.5:#78D3F8 1:#5B8FF9',
                        stroke: '#ffffff',
                        strokeOpacity:0,
                        fillOpacity: 0.50,
                    },
                },
                
                point: {
                    size: 4,
                    style: (datum: any) => {
                        const colorMap: Record<string, string> = {
                            Anxiety: '#61DDAA',
                            Clarity: '#78D3F8',
                            Comms: '#5B8FF9',
                            Conflict: '#F6BD16',
                            Social: '#7262FD',
                        };

                        return {
                            fill: colorMap[datum.category] || '#999999',
                            stroke: '#ffffff',
                            strokeWidth: 2,
                            fillOpacity: 1,
                        };
                    }
                },

                interactions: [{ type: 'legend-highlight' }, { type: 'element-highlight' }],
                tooltip: {
                    showTitle: true,
                    formatter: (datum: any) => {
                        return {
                            name: datum.type || datum.category,
                            value: `${datum.value}${yLabel ? ` ${yLabel}` : ''}`
                        };
                    },
                    domStyles: {
                        'g2-tooltip': {
                            background: 'rgba(255, 255, 255, 0.1)',
                            backdropFilter: 'blur(20px)',
                            WebkitBackdropFilter: 'blur(20px)', // Safari support
                            color: '#000000',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                            borderRadius: '12px',
                        },
                        'g2-tooltip-title': {
                            fontSize: '14px',
                            fontWeight: '600',
                            marginBottom: '8px',
                            color: 'rgba(0, 0, 0, 0.7)',
                        },
                        'g2-tooltip-list-item': {
                            fontSize: '12px',
                            color: 'rgba(0, 0, 0, 0.6)',
                        }
                    }
                },


                legend: {
                    position: 'top',
                    flipPage: true,
                    itemName: {
                        style: {
                            fill: '#666666',
                        }
                    }
                },
                animation: {
                    appear: {
                        animation: 'wave-in',
                        duration: 1000,
                    },
                    update: {
                        animation: 'wave-in',
                        duration: 500,
                    }
                }
            });

            // แสดงผลแผนภูมิ
            chartInstance.current.render();
        }

        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
                chartInstance.current = null;
            }
        };
    }, [data, title, description, yLabel, maxValue]);

    return (
        <div ref={chartRef} style={{ width: '100%', height: '400px' }}>
            {/* แผนภูมิจะถูก render ภายใน div นี้ */}
        </div>
    );
};

export default RadarChart;