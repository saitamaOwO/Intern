import { Box, TextField } from "@mui/material";
import Header from "../../components/Header";
import BarChart from "../../components/BarChart";
import { useState } from "react";
import axios from "axios";
const Bar = () => {
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
      <Header title="Bar Chart" subtitle="Simple Bar Chart" />
      <section>
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
          ].map((key, index) => (
            <TextField
              key={index}
              name={key}
              label={key.charAt(0).toUpperCase() + key.slice(1)}
              value={filters[key]}
              onChange={handleInputChange}
              variant="outlined"
              margin="normal"
              sx={{ flex: "1 1 20%", m: "5px" }}
            />
          ))}
        </Box>
      </section>
      <Box height="75vh">
        <BarChart filters={filters} isDashboard={1} />
      </Box>
    </Box>
  );
};

export default Bar;
