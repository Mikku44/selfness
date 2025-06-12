// ColumnChart.tsx
import React, { useEffect, useRef } from 'react';
import { Column } from '@antv/g2plot';

interface ColumnChartProps {
    data: Array<{
        category: string;
        value: number;
    }>;
    title?: string;
    description?: string;
    yLabel?:string;
}

const ColumnChart: React.FC<ColumnChartProps> = ({ data,yLabel = "", title, description }) => {
    const chartRef = useRef<HTMLDivElement>(null);
    const chartInstance = useRef<Column | null>(null);

    useEffect(() => {
        if (chartRef.current) {
            // ตรวจสอบว่ามี instance ของแผนภูมิเก่าอยู่หรือไม่ ถ้ามี ให้ทำลายทิ้งก่อน
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }

            // สร้างแผนภูมิคอลัมน์ใหม่
            chartInstance.current = new Column(chartRef.current, {
                data,
                xField: 'category',
                yField: 'value',
                seriesField: 'category',
                color: ['#5B8FF9', '#61DDAA', '#F6BD16', '#7262FD', '#78D3F8', '#9661BC'],
                meta: {
                    category: {
                        alias: 'Category',
                    },
                    value: {
                        alias: 'Value',
                    },
                },
                interactions: [{ type: 'active-region' }, { type: 'element-highlight' }],
                tooltip: {
                    showTitle: true,
                    // title: 'Percentage',
                    formatter: (datum: any) => {
                        return { name: datum.category, value: datum.value };
                    },
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
                       
                    }
                },
                state: {
                    active: {
                        style: {
                            shadowBlur: 8,
                            shadowOffsetX: 3,
                            shadowOffsetY: 3,
                            shadowColor: 'rgba(0,0,0,0.3)',
                            fill: '#5B8FF9',
                        },
                    },

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
                    grid: {
                        line: {
                            style: {
                                stroke: '#f0f0f0',
                                lineDash: [4, 4],
                            }
                        }
                    },
                    title: {
                        text: 'Categories',
                        style: {
                            fill: '#333333',
                            fontSize: 14,
                            fontWeight: 'bold',
                        }
                    }
                },
                yAxis: {
                    label: {
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
                    title: {
                        text: yLabel || 'Weight of Data (%)',
                        style: {
                            fill: '#333333',
                            fontSize: 14,
                            fontWeight: 'bold',
                        }
                    }
                },
                columnStyle: {
                    radius: [4, 4, 0, 0],
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
                        animation: 'scale-in-y',
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
    }, [data, title, description]);
    return (
        <div ref={chartRef} style={{ width: '100%', height: '300px' }}>
            {/* แผนภูมิจะถูก render ภายใน div นี้ */}
        </div>
    );
};

export default ColumnChart;