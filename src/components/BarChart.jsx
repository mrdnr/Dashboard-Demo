import { useEffect, useState } from "react";
import { useTheme } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
import { tokens } from "../theme";
import axios from "axios";

const BarChart = ({ isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("https://demotrainiq.com/case/dashboard")
      .then((response) => {
        const topSkills = response.data.data.top_skills;
        setData(topSkills);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const skillColors = ["#009B77", "#2E1FFF", "#DD4124", "#45B8AC", "#B565A7"];

  return (
    <ResponsiveBar
      data={data}
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
      }}
      keys={["employees"]}
      indexBy="skill"
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.4}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colorBy={(bar) => skillColors[bar.index % skillColors.length]}
      borderColor={{
        from: "color",
        modifiers: [["darker", "1.6"]],
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 10,
        tickPadding: 2,
        tickRotation: 0,
        legend: isDashboard ? undefined : "Skill",
        legendPosition: "middle",
        legendOffset: 40,
      }}
      axisLeft={{
        tickSize: 10,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "Employees",
        legendPosition: "middle",
        legendOffset: -40,
        tickValues: [0, 1, 2, 3, 4, 5],
      }}
      enableLabel={false}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      legends={[
        {
          dataFrom: "keys",
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 120,
          translateY: 0,
          itemsSpacing: 2,
          itemWidth: 100,
          itemHeight: 20,
          itemDirection: "left-to-right",
          itemOpacity: 0.85,
          symbolSize: 20,
          effects: [
            {
              on: "hover",
              style: {
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
      tooltip={({ value, indexValue }) => (
        <div
          style={{
            padding: 12,
            color: colors.grey[200],
            background: colors.grey[900],
          }}
        >
          <strong>
            {indexValue}: {value} Employees
          </strong>
        </div>
      )}
      role="application"
      barAriaLabel={function (e) {
        return e.id + ": " + e.formattedValue + " employees with skill: " + e.indexValue;
      }}
    />
  );
};

export default BarChart;
