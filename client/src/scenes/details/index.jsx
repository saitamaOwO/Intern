import React, { useState, useEffect } from 'react';
import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useTheme } from "@mui/material";
import Header from "../../components/Header";
import axios from 'axios';
const Contacts = () => {
  const theme = useTheme();
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/data');
        const contactsWithIds = response.data.map((contact, index) => ({
          id: index + 1,
          ...contact,
        }));
        setContacts(contactsWithIds);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching contacts:', error);
        setError(error);
        setIsLoading(false);
      }
    };
  
    fetchContacts();
  }, []);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "title", headerName: "Title", flex: 1 },
    { field: "sector", headerName: "Sector", flex: 1 },
    { field: "topic", headerName: "Topic", flex: 1 },
    { field: "insight", headerName: "Insight", flex: 1 },
    { field: "url", headerName: "URL", flex: 1 },
    { field: "country", headerName: "Country", flex: 1 },
    { field: "source", headerName: "Source", flex: 1 },
    { field: "published", headerName: "Published", flex: 1 },
  ];
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <Box
      m="20px"
      sx={{
        backgroundColor: 'transparent', 
        color: 'white',
        height: "100%",
        position: "relative",
      }}
    >
      <Header
        title="CONTACTS"
        subtitle="List of Contacts for Future Reference"
      />
      <Box
        m="40px 0 0 0"
        height="calc(100% - 80px)" 
        sx={{
          backgroundColor: 'transparent', 
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "rgba(25, 118, 210, 0.9)",
            color: "white",
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: "transparent",
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: "rgba(25, 118, 210, 0.9)",
          },
        }}
      >
        <DataGrid
          rows={contacts}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};
export default Contacts;