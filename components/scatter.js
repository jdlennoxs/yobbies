import { ResponsiveScatterPlot } from "@nivo/scatterplot"

export default function Scatter({ data }) {
    return (
        <div style={{ height: "400px" }}>
            <ResponsiveScatterPlot
                yScale={{
                    type: 'linear',
                    min: 1950,
                    max: 2021,
                }}
                margin={{ top: 20, right: 20, bottom: 50, left: 60 }}
                colors={{
                    scheme: "paired"
                }}
                theme={{
                    textColor: "#ffffff"
                }}
                axisLeft={{
                    orient: 'left',
                    tickSize: 1,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Release Year',
                    legendPosition: 'middle',
                    legendOffset: -50
                }}
                axisBottom={{
                    orient: 'bottom',
                    tickSize: 1,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Film',
                    legendPosition: 'middle',
                    legendOffset: 40
                }}
                tooltip={({ node }) => (
                    <div
                        style={{
                            color: node.style.color,
                            background: '#111',
                            padding: '12px 16px',
                        }}
                    >
                        <strong style={{ color: "#fff" }}>
                            {node.data.serieId}
                        </strong>
                        <br />
                        {`${node.data.title}`}
                        <br />
                        {`${node.data.formattedY}`}
                        <br />
                        {`${node.data.z} minutes`}
                    </div>
                )}
                data={data}
                nodeSize={{ key: "z", values: [80, 160], sizes: [10, 40] }}
            />
        </div>
    )
}