import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../superAdmin/Navbar";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import {useNavigate} from 'react-router-dom';
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
const Adminfirs = () => {
    const navigate = useNavigate();
  const [firData, setFirData] = useState([]);
  useEffect(async () => {
    await axios.get("http://localhost:9002/getFirs").then((res) => {
      console.log(res.data);
      setFirData(res.data);
    });
  }, []);


  const navigateFirClick = (id)=>{
    console.log(id);
    navigate(`/getFirById/${id}`);
  }


  return (
    <div>
      <Navbar />
      <Grid container spacing={4}>
        {firData.map((value,index) => {
          return (
            <Grid item xs={3} key={index}>
              <Item>
                <Card>
                  <CardContent>
                    <Typography variant="h5" component="div">
                      {value.crimeDetails.crime.toUpperCase()}
                    </Typography>
                    <Typography variant="body2">
                      {value.crimeDetails.address}, {value.crimeDetails.colony}
                      {value.crimeDetails.district}, {value.crimeDetails.state}
                      {value.crimeDetails.pinCode}
                      <br />
                    </Typography>
                    <br />
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                      Status:{value.status}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" onClick={()=>{
                        navigateFirClick(value._id)
                    }
                    }>Go to FIR</Button>
                  </CardActions>
                </Card>
              </Item>
            </Grid>
          );
        })}
      </Grid>
      <div className="firs-container"></div>
    </div>
  );
};

export default Adminfirs;
