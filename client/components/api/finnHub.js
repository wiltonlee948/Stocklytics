import axios from 'axios';

const TOKEN = 'cdoucqiad3i3u5gomm50cdoucqiad3i3u5gomm5g';

export default axios.create({
  baseURL: 'https://finnhub.io/api/v1',
  params: {
    token: TOKEN
  }
});