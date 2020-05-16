module.exports = {
  api:
    process.env.NODE_ENV === "development"
      ? "http://localhost:8080"
      : "https://magello-api.herokuapp.com",
};
