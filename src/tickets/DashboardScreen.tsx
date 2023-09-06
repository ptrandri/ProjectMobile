import axios from "axios";
import React, { useEffect, useState } from 'react';
import { getTokenLocally } from '../config/storage';
import { useNavigation } from '@react-navigation/native';
import { StackTypes } from "../routes/Stack";

const DashboardScreen = () => {
  const navigation = useNavigation<StackTypes>();
  const [dashboardData, setDashboardData] = useState<any>(null);

  const checkToken = async () => {
    const authToken = await getTokenLocally();

    if (!authToken) {
      navigation.navigate("Login");
      return;
    }

    try {
      const response = await axios.get("http://192.168.100.245:8000/api/tickets/", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (response.status === 200) {
        setDashboardData(response.data); 
      } else {
        navigation.navigate("Login");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  return (
    console.log(Response)
  );
};

export default DashboardScreen;
