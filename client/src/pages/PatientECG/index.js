import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { getUserECG } from "../../api/queries";
import { useLocation } from "react-router";
import { Box, MenuItem, Select } from "@mui/material";
import { formatFullName } from "../../utils";
const PatientECG = () => {
  const location = useLocation();
  const [allData, setAllData] = useState([]);
  const [patient, setPatient] = useState(null);
  const [selectedData, setSelectedData] = useState({
    labels: [],
    datasets: [
      {
        label: "ECG Diagram",
        data: [],
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  });
  const patientId = location?.pathname.split("/")[2];

  const fetchData = async () => {
    try {
      const response = await getUserECG(patientId);
      setAllData(response?.data?.ecg_diagrams);
      setPatient(response?.data?.patient);
      if (response?.data?.ecg_diagrams?.length > 0) {
        const newData = JSON.parse(
          response?.data?.ecg_diagrams[0]?.data_values,
        );
        setSelectedData({
          labels: newData?.data,
          datasets: [
            {
              label: "ECG Diagram",
              data: newData?.data,
              fill: false,
              backgroundColor: "rgba(255, 99, 132, 0.2)",
              borderColor: "rgba(255, 99, 132, 1)",
              borderWidth: 1,
              tension: 0.1,
            },
          ],
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (event) => {
    const selectedECG = allData.find((ecg) => ecg.id === event.target.value);
    if (selectedECG) {
      const newData = JSON.parse(selectedECG.data_values);
      setSelectedData({
        labels: newData?.data,
        datasets: [
          {
            label: "ECG Diagram",
            data: newData?.data,
            fill: false,
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1,
            tension: 0.1,
          },
        ],
      });
    }
  };
  const options = {
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: {
          display: false,
        },
      },
    },
  };
  return (
    <Box
      style={{
        height: "100vh",
        margin: "15px 25px",
      }}
    >
      <div style={{ maxHeight: "500px" }}>
        <h2>Electrocardiogram {formatFullName(patient)} </h2>
        <Select
          style={{ width: "100%" }}
          value={selectedData?.datasets[0]?.data[0]}
          onChange={handleChange}
          defaultValue={selectedData?.datasets[0]?.data[0]}
        >
          {allData?.length > 0
            ? allData?.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  ECG {item.ecg_date}
                </MenuItem>
              ))
            : null}
        </Select>
        <Line data={selectedData} options={options} />
      </div>
    </Box>
  );
};

export default PatientECG;
