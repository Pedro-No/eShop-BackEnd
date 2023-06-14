module.exports = (app) => {

  app.use((req, res, next) => {
    // Route not found
    res.status(404).json({ message: "Route doesn't exist" });
  });

  app.use((err, req, res, next) => {
    // next(err)
    console.error("ERROR", req.method, req.path, err);

    // only render if the error ocurred before sending the response
    if (!res.headersSent) {
      res.status(500).json({
        message: "oops server error",
      });
    }
  });
};
