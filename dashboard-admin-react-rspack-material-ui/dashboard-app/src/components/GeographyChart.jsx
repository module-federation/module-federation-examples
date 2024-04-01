import React from "react";
import { ResponsiveChoropleth } from "@nivo/geo";
import { useTheme } from "@mui/material";
import { tokens } from "../theme";
import { geoFeatures } from "../data/mockGeoFeatures";
import { mockGeographyData } from "../data/mockData";

const GeographyChart = ({ isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
        <ResponsiveChoropleth
        theme={{
            axis: {
            domain: {
                line: {
                stroke: colors.grey[100],
                },
            },
            legend: {
                text: {
                fill: colors.grey[100],
                },
            },
            ticks: {
                line: {
                stroke: colors.grey[100],
                strokeWidth: 1,
                },
                text: {
                fill: colors.grey[100],
                },
            },
            },
            legends: {
            text: {
                fill: colors.grey[100],
            },
            },
            tooltip: {
            container: {
                background: colors.primary[400],
                color: colors.grey[100],
            },
            },
        }}
        data={mockGeographyData}
        features={geoFeatures.features}
        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
        colors="nivo"
        domain={[ 0, 1000000 ]}
        unknownColor="#666666"
        label="properties.name"
        valueFormat=".2s"
        projectionScale={isDashboard?40:100}
        projectionTranslation={isDashboard?[0.49,0.6]:[0.5,0.5]}
        projectionRotation={[ 0, 0, 0 ]}
        enableGraticule={false}
        graticuleLineColor="#444444"
        borderWidth={0.5}
        borderColor="#fff"
        
        legends={
            !isDashboard?
            [
                {
                    anchor: 'bottom-left',
                    direction: 'column',
                    justify: true,
                    translateX: 20,
                    translateY: -100,
                    itemsSpacing: 0,
                    itemWidth: 94,
                    itemHeight: 18,
                    itemDirection: 'left-to-right',
                    itemTextColor: colors.grey[100],
                    itemOpacity: 0.85,
                    symbolSize: 18,
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemTextColor: colors.greenAccent[500],
                                itemOpacity: 1
                            }
                        }
                    ]
                }
            ]:undefined
        }
    />
  );
};

export default GeographyChart;
