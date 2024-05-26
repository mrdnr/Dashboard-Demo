import { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import axios from "axios";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

const Employees = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [teamData, setTeamData] = useState([]);

  useEffect(() => {
    axios
      .get("https://demotrainiq.com/case/dashboard")
      .then((response) => {
        const teams = response.data.data.teams;
        const teamData = teams.flatMap((team, teamIndex) =>
          team.employees.map((employee, employeeIndex) => ({
            id: `${teamIndex}-${employeeIndex}`,
            team: team.title,
            title: employee.title,
            name: employee.name,
            currentScore: employee.current_score,
            email: employee.email,
            skill: employee.skills_being_developed.join(", "),
          }))
        );
        setTeamData(teamData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const columns = [
    { field: "team", headerName: "Team" },
    { field: "title", headerName: "Title" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "currentScore",
      headerName: "Current Score",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "skill",
      headerName: "Skills",
      flex: 1,
    },
  ];

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title="EMPLOYEES INFO"
          subtitle="General list of employees and their information"
        />
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
            Create New Employee
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
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={teamData}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Employees;
