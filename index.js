const express = require("express");
const app = express();
const port = 3000;

const cors = require("cors");

app.use(cors());

const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const url =
  "https://d2w00000kn3veeat-dev-ed.develop.my.salesforce.com/services/apexrest/CardDetails";
let options = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization: "",
  },
};

const tokenURL =
  "https://login.salesforce.com/services/oauth2/token?grant_type=password&client_id=3MVG9n_HvETGhr3CP0CGtYT.i.ixvsTVAJT.xgI7Scuo5qn46te0ElKck4E3pFVGVs5Gy1vGvDA==&client_secret=9F5BD54997AB1BC09AD98D0F991B1A2A73B8F244AD97D517C737C282FBFD9494&password=Shrey@s1122&username=shreyasneworg@salesforce.com";
const tokenOptions = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

app.get("/", async (req, res) => {
  const tokenDataStream = await fetch(tokenURL, tokenOptions);
  const tokenData = await tokenDataStream.json();
  if (tokenData.access_token) {
    options.headers.Authorization = `Bearer ${tokenData.access_token}`;
  }
  const cardAllDetailsStream = await fetch(url, options);
  const cardAllDetails = await cardAllDetailsStream.json();
  res.send(cardAllDetails);
});

app.listen(port, () => {
  console.log(`Example app listening on  port ${port}`);
});
