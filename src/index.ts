import app from "./app";

app.get('/', (req, res) => {

  res.send(`Hello Ajay`);
});

const port = parseInt(process.env.PORT || '3000');
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
