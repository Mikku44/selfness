// ScatterChart.tsx
import React, { useEffect, useRef } from 'react';
import { Scatter } from '@antv/g2plot';

interface ScatterChartProps {
    data: Array<{
        x: number;
        y: number;
        category?: string;
        size?: number;
        label?: string;
    }>;
    title?: string;
    description?: string;
    xLabel?: string;
    yLabel?: string;
    sizeField?: string; // Field name for bubble size
    colorField?: string; // Field name for color grouping
}

const ScatterChart: React.FC<ScatterChartProps> = ({ 
    data, 
    xLabel = "X Axis", 
    yLabel = "Y Axis", 
    title, 
    description,
    sizeField,
    colorField = 'category'
}) => {
    const chartRef = useRef<HTMLDivElement>(null);
    const chartInstance = useRef<Scatter | null>(null);

    useEffect(() => {
        if (chartRef.current) {
            // ตรวจสอบว่ามี instance ของแผนภูมิเก่าอยู่หรือไม่ ถ้ามี ให้ทำลายทิ้งก่อน
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }

            // สร้างแผนภูมิ Scatter ใหม่
            chartInstance.current = new Scatter(chartRef.current, {
                data,
                xField: 'x',
                yField: 'y',
                colorField: data.some(item => item.category) ? colorField : undefined,
                sizeField: sizeField || (data.some(item => item.size) ? 'size' : undefined),
                color: ['#5B8FF9', '#61DDAA', '#F6BD16', '#7262FD', '#78D3F8', '#9661BC'],
                size: sizeField ? [4, 30] : [8, 8], // Variable size or fixed size
                shape: 'circle',
                meta: {
                    x: {
                        alias: xLabel,
                    },
                    y: {
                        alias: yLabel,
                    },
                    category: {
                        alias: 'Category',
                    },
                    size: {
                        alias: 'Size',
                    },
                },
                // Point style configuration
                pointStyle: {
                    fillOpacity: 0.8,
                    strokeOpacity: 0.8,
                    strokeWidth: 1,
                    stroke: '#fff',
                },
                interactions: [
                    { type: 'legend-highlight' }, 
                    { type: 'element-highlight' },
                    { type: 'brush' } // Allow selection
                ],
                tooltip: {
                    showTitle: true,
                    formatter: (datum: any) => {
                        const tooltipData = [
                            { name: xLabel, value: datum.x },
                            { name: yLabel, value: datum.y }
                        ];
                        
                        if (datum.category) {
                            tooltipData.unshift({ name: 'Category', value: datum.category });
                        }
                        
                        if (datum.size) {
                            tooltipData.push({ name: 'Size', value: datum.size });
                        }
                        
                        if (datum.label) {
                            tooltipData.unshift({ name: 'Label', value: datum.label });
                        }
                        
                        return tooltipData as any;
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
                state: {
                    active: {
                        style: {
                            shadowBlur: 8,
                            shadowOffsetX: 3,
                            shadowOffsetY: 3,
                            shadowColor: 'rgba(0,0,0,0.3)',
                            strokeWidth: 3,
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
                        text: xLabel,
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
                        text: yLabel,
                        style: {
                            fill: '#333333',
                            fontSize: 14,
                            fontWeight: 'bold',
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
                        animation: 'zoom-in',
                        duration: 1000,
                    },
                    update: {
                        animation: 'fade-in',
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
    }, [data, title, description, xLabel, yLabel, sizeField, colorField]);

    return (
        <div ref={chartRef} style={{ width: '100%', height: '400px' }}>
            {/* แผนภูมิจะถูก render ภายใน div นี้ */}
        </div>
    );
};

export default ScatterChart;