import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    title: "My Api",
    description: "Description",
  },
  host: "localhost:3000",
};

const outputFile = "./swagger-output.json";
// const routes = [
//   "./routes/authRoutes.js",
//   "./routes/categoriesRoutes.js",
//   "./routes/productsRoutes.js",
// ];
const routes = ["./app.js"];
swaggerAutogen()(outputFile, routes, doc);
