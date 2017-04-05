module.exports = (err, req, resp, next) => {
    return (err, req, resp, next) => {
        console.log(err);
        resp.status(404).send(`
            Something broke and it ain't me~
        `);
    };
}