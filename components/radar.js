
import { ResponsiveRadar } from '@nivo/radar'
import { useState } from "react";

export default function Radar({ data, keys }) {
    const [active, setActive] = useState(keys)

    const filterYob = (yob) => {
        if (active.includes(yob)) {
            setActive(active.filter(a => a !== yob))
        } else {
            setActive(active.concat(yob))
        }
    }

    return (
        <div style={{ height: "400px" }}>
            {keys.map(k =>
                (<button onClick={() => filterYob(k)}>{k}</button>)
            )}
            <ResponsiveRadar
                data={data}
                keys={active}
                indexBy="genre"
                maxValue={"auto"}
                margin={{ top: 70, right: 80, bottom: 40, left: 80 }}
                curve="linearClosed"
                borderWidth={2}
                borderColor={{ from: 'color' }}
                gridLevels={4}
                gridShape="linear"
                gridLabelOffset={36}
                enableDots={true}
                dotSize={5}
                dotColor={{ theme: 'background' }}
                dotBorderWidth={2}
                dotBorderColor={{ from: 'color' }}
                dotLabel="value"
                colors={{ scheme: 'category10' }}
                fillOpacity={0.25}
                blendMode="multiply"
                animate={true}
                motionConfig="wobbly"
                isInteractive={true}
                tooltipFormat={value =>
                    `${value - 1}`
                }
                theme={{
                    textColor: "#ffffff"
                }}
                legends={[
                    {
                        anchor: 'top-left',
                        direction: 'column',
                        translateX: -50,
                        translateY: -40,
                        itemWidth: 80,
                        itemHeight: 20,
                        itemTextColor: '#999',
                        symbolSize: 12,
                        symbolShape: 'circle',
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemTextColor: '#000'
                                }
                            },
                        ]
                    }
                ]}
            />
        </div>)
}