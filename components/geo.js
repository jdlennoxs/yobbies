
import { ResponsiveChoroplethCanvas } from '@nivo/geo'
import countries from "../data/countries.json";

export default function Geo({ data }) {
    return (
        <div style={{ height: "600px" }}>
            <ResponsiveChoroplethCanvas
                features={countries.features}
                data={data}
                domain={[1, 14]}
                colors="YlOrRd"
                unknownColor="#c0c0c0"
                label="properties.name"
                projectionType="naturalEarth1"
                projectionScale={260}
                projectionTranslation={[0.5, 0.58]}
                valueFormat=".2s"
                borderWidth={0.5}
                borderColor="#101b42"
                legends={[
                    {
                        anchor: 'bottom-left',
                        direction: 'column',
                        justify: true,
                        translateX: 20,
                        translateY: -60,
                        itemsSpacing: 0,
                        itemWidth: 92,
                        itemHeight: 18,
                        itemDirection: 'left-to-right',
                        itemOpacity: 0.85,
                        symbolSize: 18
                    }
                ]}
            />
        </div>)
}