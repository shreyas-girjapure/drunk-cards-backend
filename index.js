const express = require("express");
const app = express();
const port = 3000;

const cors = require('cors')

app.use(cors());


const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const url =
  "https://d2w00000kn3veeat-dev-ed.develop.my.salesforce.com/services/apexrest/CardDetails";
const options = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization:
      "Bearer 00D2w00000KN3vE!AR0AQFlR9J7tGe2J2sTcLA6s.vsHGBcQ2pM9UELiPr3pfsmiS.ehDjd0z0Nviyf8gTNkYCoeIegqvgNc74emwOVQw_8V5iV.",
  },
};

app.get("/", (req, res) => {
    console.log('hello')
  fetch(url, options)
    .then((res) => res.json())
    .then((json) => res.send(json))
    .catch((err) => console.error("error:" + err));
});

app.listen(port, () => {
  console.log(`Example app listening on  port ${port}`);
});
