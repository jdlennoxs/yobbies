
import { ResponsiveRadar } from '@nivo/radar'

export default function Radar({ data }) {
    return (
        <div style={{ height: "400px" }}>
            <ResponsiveRadar
                data={data}
                keys={["total"]}
                indexBy="name"
                maxValue="auto"
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
                colors={{ scheme: 'nivo' }}
                fillOpacity={0.25}
                blendMode="multiply"
                animate={true}
                motionConfig="wobbly"
                isInteractive={true}
                tooltipFormat={value =>
                    `${Math.round(Math.exp(value - 1))}`
                }
                theme={{
                    textColor: "#ffffff"
                }}
            />
        </div>)
}