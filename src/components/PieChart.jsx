import { useState, useEffect } from "react";
import { ResponsivePie } from "@nivo/pie";
import { useTheme } from "@mui/material";
import axios from "axios";
import { tokens } from "../theme";

const PieChart = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [skillsData, setSkillsData] = useState([]);

  useEffect(() => {
    axios
      .get("https://demotrainiq.com/case/dashboard")
      .then((response) => {
        const skills = response.data.data.skills_in_development;
        const skillsData = skills.map((skill, index) => ({
          id: skill.skill,
          label: skill.skill,
          value: skill.employees,
          data: skill,
        }));
        setSkillsData(skillsData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <ResponsivePie
      data={skillsData}
      theme={{
        textColor: theme.palette.text.primary,
        tooltip: {
          container: {
            background: theme.palette.background.paper,
            color: theme.palette.text.primary,
            borderRadius: theme.shape.borderRadius,
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2),
          },
        },
      }}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      borderColor={{
        from: "color",
        modifiers: [["darker", 0.2]],
      }}
      enableArcLabels={false}
      arcLabelsRadiusOffset={0.4}
      arcLabelsSkipAngle={7}
      arcLabelsTextColor={{
        from: "color",
        modifiers: [["darker", 2]],
      }}
      arcLinkLabelsTextColor={theme.palette.text.primary}
      legends={[
        {
          anchor: "bottom",
          direction: "row",
          justify: false,
          translateX: 0,
          translateY: 56,
          itemsSpacing: 0,
          itemWidth: 100,
          itemHeight: 12,
          itemTextColor: theme.palette.text.primary,
          itemDirection: "left-to-right",
          itemOpacity: 1,
          symbolSize: 18,
          symbolShape: "circle",
          effects: [
            {
              on: "hover",
              style: {
                itemTextColor: theme.palette.primary.main,
              },
            },
          ],
        },
      ]}
    />
  );
};

export default PieChart;
