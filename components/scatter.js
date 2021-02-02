import { ResponsiveScatterPlot } from "@nivo/scatterplot"

export default function Scatter({ data }) {
    return (
        <div style={{ height: "400px" }}>
            <ResponsiveScatterPlot
                yScale={{
                    type: 'linear',
                    min: 1950,
                    max: 2020,
                }}
                margin={{ top: 20, right: 20, bottom: 60, left: 80 }}
                colors={{
                    scheme: "paired"
                }}
                axisLeft={{
                    orient: 'left',
                    tickSize: 1,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Release Year',
                    legendPosition: 'middle',
                    legendOffset: -60
                }}
                axisBottom={{
                    orient: 'bottom',
                    tickSize: 1,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Film',
                    legendPosition: 'middle',
                    legendOffset: 46
                }}
                data={data}
            />
        </div>
    )
}