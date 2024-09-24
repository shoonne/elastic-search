const express = require("express");
const client = require("./elasticsearch/client");
const cors = require("cors");

const app = express();
const port = 3001;

app.use(cors());

app.get("/results", (req, res) => {
  const amountOfEmployees = req.query["Antal anställda"];
  const position = req.query["Befattning"];
  const county = req.query["ort"];
  const turnover = req.query["omsättning"];
  const sortOption = req.query["sortOption"];

  async function sendESRequest() {
    const body = await client.search({
      index: "test",
      body: {
        sort: [{}],
        size: 100,
        query: {
          bool: {
            filter: [
              // {
              //   term: { "Antal anställda": amountOfEmployees },
              // },
              // {
              //   range: { omsättning: { gte: turnover } },
              // },
              {
                match: { Ort: county },
              },
            ],
          },
        },
      },
    });
    console.log(body);
    res.json(body.hits.hits);
  }
  sendESRequest();
});
app.listen(port, () =>
  console.log(`Server listening at http://localhost:${port}`)
);
