import axios from 'axios';

export const startTimer = () => {
  axios.post('https://localhost:5001/api/Sleep/start')
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.error('Error while starting timer:', error);
    });
};

export const pauseTimer = () => {
  axios.post('https://localhost:5001/api/Sleep/pause')
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.error('Error while pausing timer:', error);
    });
};
export const stopTimer = () => {
  axios.post('https://localhost:5001/api/Sleep/stop')
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.error('Error while stoping timer:', error);
    });
};
