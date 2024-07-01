import React, { useState, useEffect } from "react";
import { Box, Button, IconButton, Typography, useTheme, TextField } from "@mui/material";
import { tokens } from "../../theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "../../components/Header";
import GeographyChart from "../../components/GeographyChart";
import BarChart from "../../components/BarChart";
import ProgressCircle from "../../components/ProgressCircle";
import axios from "axios";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({
    end_year: "",
    topic: "",
    sector: "",
    region: "",
    pestle: "",
    source: "",
    swot: "",
    country: "",
    city: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async (params) => {
    try {
      const response = await axios.get("http://localhost:5001/api/data", { params });
      console.log(response.data);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleInputChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
    fetchData({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
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
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box>
      </Box>

      {/* FILTERS */}
      <Box
        display="flex"
        flexWrap="wrap"
        justifyContent="space-between"
        alignItems="center"
        mb="20px"
      >
        {[
          "end_year",
          "topic",
          "sector",
          "region",
          "pestle",
          "source",
          "swot",
          "country",
          "city",
        ].map((filter) => (
          <TextField
            key={filter}
            name={filter}
            label={filter.charAt(0).toUpperCase() + filter.slice(1)}
            value={filters[filter]}
            onChange={handleInputChange}
            variant="outlined"
            margin="normal"
            sx={{ flex: "1 1 20%", m: "5px" }}
          />
        ))}
      </Box>

      {/* GRID & CHARTS */}
      {data.length > 0 ? ( // Check if data exists
        <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gridAutoRows="140px" gap="20px">
          {/* ROW 1 */}
          <Box
            gridColumn="span 3"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Box>
              <Typography variant="h5" fontWeight="600" color={colors.grey[100]}>
                Emails Sent
              </Typography>
              <Typography variant="h3" fontWeight="bold" color={colors.greenAccent[500]}>
                12,361
              </Typography>
              <Typography variant="subtitle1" color={colors.grey[100]}>
                Progress: 75%
              </Typography>
              <Typography variant="subtitle1" color={colors.greenAccent[600]}>
                +14% Increase
              </Typography>
              <EmailIcon sx={{ fontSize: "26px", color: colors.greenAccent[600] }} />
            </Box>
          </Box>
          <Box
            gridColumn="span 3"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Box>
              <Typography variant="h5" fontWeight="600" color={colors.grey[100]}>
                Traffic Received
              </Typography>
              <Typography variant="h3" fontWeight="bold" color={colors.greenAccent[500]}>
                1,325,134
              </Typography>
              <Typography variant="subtitle1" color={colors.grey[100]}>
                Progress: 80%
              </Typography>
              <Typography variant="subtitle1" color={colors.greenAccent[600]}>
                +43% Increase
              </Typography>
              <TrafficIcon sx={{ fontSize: "26px", color: colors.greenAccent[600] }} />
            </Box>
          </Box>

          {/* ROW 2 */}
          <Box gridColumn="span 12" gridRow="span 2" backgroundColor={colors.primary[400]}>
            <Box
              mt="25px"
              p="0 30px"
              display="flex "
              justifyContent="space-between"
              alignItems="center"
            >
              <Box>
                <Typography variant="h5" fontWeight="600" color={colors.grey[100]}></Typography>
              </Box>
              <Box>
                <IconButton>
                  <DownloadOutlinedIcon sx={{ fontSize: "26px", color: colors.greenAccent[500] }} />
                </IconButton>
              </Box>
            </Box>
            <Box height="250px" m="-20px 0 0 0">
              <BarChart isDashboard={true} filters={filters} />
            </Box>
          </Box>

          {/* ROW 3 */}
          <Box gridColumn="span 6" gridRow="span 2" backgroundColor={colors.primary[400]} p="30px">
            <Typography variant="h5" fontWeight="600">
              Campaign
            </Typography>
            <Box display="flex" flexDirection="column" alignItems="center" mt="25px">
              <ProgressCircle size="125" />
              <Typography variant="h5" color={colors.greenAccent[500]} sx={{ mt: "15px" }}>
                $48,352 revenue generated
              </Typography>
              <Typography>Includes extra misc expenditures and costs</Typography>
            </Box>
          </Box>
          <Box
            gridColumn="span 6"
            gridRow="span 2"
            backgroundColor={colors.primary[400]}
            padding="30px"
          >
            <Typography variant="h5" fontWeight="600" sx={{ marginBottom: "15px" }}>
              Geography Based Traffic
            </Typography>
            <Box height="200px">
              <GeographyChart isDashboard={true} />
            </Box>
          </Box>
        </Box>
      ) : (
        <Typography variant="h5" mt={4}>
          No data found for selected filters.
        </Typography>
      )}
    </Box>
  );
};

export default Dashboard;
