import { useState, useEffect } from "react";
import { ResponsiveLine } from "@nivo/line";
import { useTheme } from "@mui/material";
import { tokens } from "../theme";
import axios from "axios";

const LineChart = ({ isCustomLineColors = false, isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    axios
      .get("https://demotrainiq.com/case/dashboard")
      .then((response) => {
        const activityHours = response.data.data.activity_hours.map((item) => ({
          x: item.date,
          y: item.hours,
          data: item,
        }));
        setChartData([{ id: "activity_hours", data: activityHours }]);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <ResponsiveLine
      data={chartData}
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
            background: theme.palette.background.paper,
            color: theme.palette.text.primary,
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: theme.shape.borderRadius,
            padding: theme.spacing(1),
          },
        },
      }}
      colors={isDashboard ? { datum: "color" } : { scheme: "nivo" }}
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      xScale={{ type: "point" }}
      yScale={{ type: "linear", min: 0, max: "auto", stacked: true, reverse: false }}
      yFormat=" >-.2f"
      curve="monotoneX"
      axisBottom={{
        orient: "bottom",
        tickSize: 3,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "Date",
        legendOffset: 36,
        legendPosition: "middle",
      }}
      axisLeft={{
        orient: "left",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "Activity Hours",
        legendOffset: -40,
        legendPosition: "middle",
      }}
      enableGridX={false}
      enableGridY={false}
      pointSize={8}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      useMesh={true}
      legends={[
        {
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: "left-to-right",
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: "circle",
          symbolBorderColor: "rgba(0, 0, 0, .5)",
          effects: [
            {
              on: "hover",
              style: {
                itemBackground: "rgba(0, 0, 0, .03)",
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
      tooltip={({ point }) => {
        return (
          <div style={{ padding: "10px", border: "1px solid #ccc"}}>
            <div><strong>Date: </strong>{point.data.data.date}</div>
            <div><strong>Exams Completed: </strong>{point.data.data.exams_completed}</div>
            <div><strong>Hours: </strong>{point.data.data.hours}</div>
            <div><strong>Lessons Taken: </strong>{point.data.data.lessons_taken}</div>
          </div>
        );
      }}
      
    />
  );
};

export default LineChart;
