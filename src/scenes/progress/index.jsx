import { useState, useEffect } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import axios from "axios";
import Header from "../../components/Header";

const Progress = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [progressData, setProgressData] = useState([]);

  useEffect(() => {
    axios
      .get("https://demotrainiq.com/case/dashboard")
      .then((response) => {
        const prog = response.data.data.in_progress_courses;
        const progressData = prog.map((prog, index) => ({
          id: index,
          status: prog.status,
          assigned: prog.assigned_to,
          date: prog.due_date,
          title: prog.title,
          description: prog.description,
        }));
        setProgressData(progressData);
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
      <Header
        title="IN PROGRESS COURSES"
        subtitle="List of in progress courses"
      />
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
        <DataGrid checkboxSelection rows={progressData} columns={columns} />
      </Box>
    </Box>
  );
};

export default Progress;
