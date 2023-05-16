
app.get('', (req, res) => {
    console.log("Data sent bby browser", req.query.name);
    res.send("This is Home Page " + req.query.name)
});

app.get('/about', (req, res) => {
    res.send("This is about Page")
});

app.get('/help', (req, res) => {
    res.send("This is help Page")
});

app.listen(4400);