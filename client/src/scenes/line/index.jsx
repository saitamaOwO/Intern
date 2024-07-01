import { Box } from "@mui/material";
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";

const Line = () => {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({
    endYear: '',
    topics: '',
    sector: '',
    region: '',
    pest: '',
    source: '',
    swot: '',
    country: '',
    city: '',
  });
  useEffect(() => {
    fetchData();
  }, [filters]);
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/data', { params: filters });
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  return (
    <Box m="20px">
      <Header title="Line Chart" subtitle="Simple Line Chart" />
      <Box height="75vh">
      <div className="visualization-container">
        <LineChart data={data} /> 
      </div>
        <LineChart />
      </Box>
    </Box>
    
  );
};

export default Line;