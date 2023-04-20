
app.post('/newapp/api/getmsgs', function(req, res) {
    const query =  `SELECT * FROM messages`

    connection.query(query, function(error, result) {
        if (error) {
            console.log(error);
        } else {
            res.status(200).json({ data: result });
            return;
        }
    })
})
