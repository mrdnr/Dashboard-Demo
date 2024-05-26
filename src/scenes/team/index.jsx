import { useState, useEffect } from "react";
import { Box, useTheme, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import axios from "axios";
import Header from "../../components/Header";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

const Team = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [teamData, setTeamData] = useState([]);

  useEffect(() => {
    axios
      .get("https://demotrainiq.com/case/dashboard")
      .then((response) => {
        const teams = response.data.data.teams;
        const teamData = teams.map((team, index) => ({
          id: index,
          depart: team.title,
          "t-score": team.overall_score,
          description: team.description,
          employees: team.total_employee_count,
        }));
        setTeamData(teamData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const columns = [
    { field: "depart", headerName: "Department" },
    {
      field: "t-score",
      headerName: "Team Score",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "employees",
      headerName: "Employees",
    },
    {
      field: "description",
      headerName: "Description",
      flex: 3,
    },
  ];

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="TEAM" subtitle="General Team Information" />
        <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <AddOutlinedIcon sx={{ mr: "10px" }} />
            Create New Team
          </Button>
        </Box>
      </Box>
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid checkboxSelection rows={teamData} columns={columns} />
      </Box>
    </Box>
  );
};

export default Team;
