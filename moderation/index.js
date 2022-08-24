const express = require('express');
const bodyParser = require('body-parser');
// const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
// app.use(cors());

app.post('/events', async (req, res) => {
  try {
    const { type, data } = req.body;
    if (type === 'commentCreated') {
      const status = data.content.includes('orange') ? 'rejected': 'approved';
      await axios.post('http://event-bus-srv:4005/events', {
        type: 'commentModerated',
        data: {
          id: data.id,
          postId: data.postId,
          status,
          content: data.content,
        }
      });
    }
    res.send({});
  } catch (error) {
    console.log(error.message);
  }
})
app.listen(4003, () => {
  console.log('Listening on 4003');
});
