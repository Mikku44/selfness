// GroupedChart.tsx
import React, { useEffect, useRef } from 'react';
import { Column } from '@antv/g2plot';

interface GroupedChartProps {
    data: Array<{
        category: string;
        type: string;
        value: number;
    }>;
    title?: string;
    description?: string;
    height?: number;
}

const GroupedChart: React.FC<GroupedChartProps> = ({
    data,
    title,
    description,
    height = 300
}) => {
    const chartRef = useRef<HTMLDivElement>(null);
    const chartInstance = useRef<Column | null>(null);

    useEffect(() => {
        if (!chartRef.current || !data?.length) return;

        // Destroy previous chart instance if exists
        if (chartInstance.current) {
            chartInstance.current.destroy();
        }

        const config: any = {
            data,
            xField: 'category',
            yField: 'value',
            seriesField: 'type',
            isGroup: true,
            color: (datum : any) => {
                console.log("DATUM : ",datum)
                const colorMap :any = {
                    'Under 5% ': '#E3F4BF',
                    '5 to 13 ': '#BEF7C8',
                    '14 to 17 ': '#86E6C8',
                    '18 to 24 ': '#36CFC9',
                    '25 to 44 ': '#209BDD',
                    '45 to 64 ': '#1581E6',
                    '65 %': '#0860BF'
                };
                return colorMap[datum.category] || '#CCCCCC'; // fallback color
            },
            meta: {
                category: { alias: 'หมวดหมู่' },
                value: { alias: 'ค่า' },
                type: { alias: 'ประเภท' },
            },
            interactions: [
                { type: 'active-region' },
                { type: 'element-highlight-by-color' }
            ],
            tooltip: {
                showTitle: true,
                title: title || 'ข้อมูล',
                shared: true,
                formatter: (datum: any) => ({
                    name: `${datum.category} - ${datum.type}`,
                    value: datum.value
                }),
                domStyles: {
                    'g2-tooltip': {
                        background: 'rgba(255, 255, 255, 0.1)',
                        backdropFilter: 'blur(20px)',
                        WebkitBackdropFilter: 'blur(20px)', // Safari support
                        color: '#00000',
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
                        color: 'rgba(0, 0, 0, 0.7)',
                    },


                }
            },
            state: {
                active: {
                    style: {
                        shadowBlur: 8,
                        shadowOffsetX: 3,
                        shadowOffsetY: 3,
                        shadowColor: 'rgba(0,0,0,0.3)',
                    },
                },
                inactive: {
                    opacity: 0.3,
                }
            },
            xAxis: {
                label: {
                    style: {
                        fill: '#666666',
                        fontSize: 12,
                        fontWeight: 'bold',
                    }
                },
                line: {
                    style: {
                        stroke: '#dddddd',
                        lineWidth: 1,
                    }
                },
                title: title ? {
                    text: title,
                    style: {
                        fill: '#333333',
                        fontSize: 14,
                        fontWeight: 'bold',
                    }
                } : undefined
            },
            yAxis: {
                label: {
                    formatter: (v: string) => `${v}`, // Add formatting if needed
                    style: {
                        fill: '#666666',
                        fontSize: 12,
                    }
                },
                line: {
                    style: {
                        stroke: '#dddddd',
                        lineWidth: 1,
                    }
                },
                grid: {
                    line: {
                        style: {
                            stroke: '#f0f0f0',
                            lineWidth: 1,
                        }
                    }
                },
                title: description ? {
                    text: description,
                    style: {
                        fill: '#333333',
                        fontSize: 14,
                        fontWeight: 'bold',
                    }
                } : undefined
            },
            dodgePadding: 2,
            intervalPadding: 20,
            columnStyle: {
                radius: [4, 4, 0, 0],
            },
            legend: {
                position: 'top',
                itemName: {
                    style: {
                        fill: '#666666',
                    }
                }
            },
            animation: {
                appear: {
                    animation: 'scale-in-y',
                    duration: 1000,
                },
                update: {
                    animation: 'wave-in',
                    duration: 1000,
                }
            }
        };

        chartInstance.current = new Column(chartRef.current, config);
        chartInstance.current.render();

        // Theme customization
        chartInstance.current.chart.theme({
            colors10: ['#5B8FF9', '#61DDAA', '#F6BD16', '#7262FD', '#78D3F8', '#9661BC'],
            columnWidthRatio: 0.4,
        });

        return () => {
            chartInstance.current?.destroy();
            chartInstance.current = null;
        };
    }, [data, title, description]);

    return (
        <div
            ref={chartRef}
            style={{
                width: '100%',
                height: `${height}px`,
                margin: '0 auto'
            }}
        />
    );
};

export default GroupedChart;