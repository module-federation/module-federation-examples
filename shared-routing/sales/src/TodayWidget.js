import React from "react";
import { Box, Typography, useTheme } from "@material-ui/core";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Label,
//   ResponsiveContainer,
// } from "recharts";

// Generate Sales Data
function createData(time, amount) {
  return { time, amount };
}

const data = [
  createData("00:00", 0),
  createData("03:00", 300),
  createData("06:00", 600),
  createData("09:00", 800),
  createData("12:00", 1500),
  createData("15:00", 2000),
  createData("18:00", 2400),
  createData("21:00", 2400),
  createData("24:00", undefined),
];

export default function TodayWidget() {
  const theme = useTheme();

  return (
    <Box display="flex" flexDirection="column" flex={1}>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Today
      </Typography>
      <ResponsiveContainer>
        {/*<LineChart*/}
        {/*  data={data}*/}
        {/*  margin={{*/}
        {/*    top: 16,*/}
        {/*    right: 16,*/}
        {/*    bottom: 0,*/}
        {/*    left: 24,*/}
        {/*  }}*/}
        {/*>*/}
        {/*  <XAxis dataKey="time" stroke={theme.palette.text.secondary} />*/}
        {/*  <YAxis stroke={theme.palette.text.secondary}>*/}
        {/*    <Label*/}
        {/*      angle={270}*/}
        {/*      position="left"*/}
        {/*      style={{ textAnchor: "middle", fill: theme.palette.text.primary }}*/}
        {/*    >*/}
        {/*      Sales ($)*/}
        {/*    </Label>*/}
        {/*  </YAxis>*/}
        {/*  <Line*/}
        {/*    type="monotone"*/}
        {/*    dataKey="amount"*/}
        {/*    stroke={theme.palette.primary.main}*/}
        {/*    dot={false}*/}
        {/*  />*/}
        {/*</LineChart>*/}
      </ResponsiveContainer>
    </Box>
  );
}
