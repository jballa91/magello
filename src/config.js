console.log(process.env.NODE_ENV);
module.exports = {
  api:
    process.env.NODE_ENV === "development"
      ? "http://localhost:8080"
      : "http://magello-api.herokuapp.com",
};