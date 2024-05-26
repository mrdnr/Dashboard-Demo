import { useState, useEffect } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import axios from "axios";
import Header from "../../components/Header";

const Upcoming = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [teamData, setTeamData] = useState([]);

  useEffect(() => {
    axios
      .get("https://demotrainiq.com/case/dashboard")
      .then((response) => {
        const upcoming = response.data.data.upcoming_courses;
        const upcomingData = upcoming.map((upcoming, index) => ({
          id: index,
          status: upcoming.status,
          assigned: upcoming.assigned_to,
          date: upcoming.due_date,
          title: upcoming.title,
          description: upcoming.description,
        }));
        setTeamData(upcomingData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const columns = [
    { field: "status", headerName: "Status" },
    {
      field: "assigned",
      headerName: "Assigned",

      cellClassName: "name-column--cell",
    },
    {
      field: "date",
      headerName: "Due Date",
    },
    {
      field: "title",
      headerName: "Title",
      flex: 0.2,
    },
    {
      field: "description",
      headerName: "Description",
      flex: 1,
      renderCell: (params) => (
        <Typography fontWeight={600}>{params.row.description}</Typography>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Header title="UPCOMING COURSES" subtitle="List of upcoming courses" />
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

export default Upcoming;
