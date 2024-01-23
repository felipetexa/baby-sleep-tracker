import axios from 'axios';

const config = {
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
  }
};

export const startTimer = () => {
  axios.post('https://localhost:5001/api/Sleep/start', config)
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.error('Error while starting timer:', error);
    });
};

export const pauseTimer = async () => {
  try {
    const response = await fetch('https://localhost:5001/api/Sleep/pause', {
      method: 'POST',
    });

    if (response.ok) {
      console.log('Timer paused on the backend');
    } else {
      console.error('Failed to pause timer on the backend');
    }
  } catch (error) {
    console.error('Error while pausing timer:', error);
  }
};

export const stopTimer = async () => {
  try {
    const response = await fetch('https://localhost:5001/api/Sleep/stop', {
      method: 'POST',
    });

    if (response.ok) {
      console.log('Timer stopped on the backend');
    } else {
      console.error('Failed to stop timer on the backend');
    }
  } catch (error) {
    console.error('Error while stopping timer:', error);
  }
};
