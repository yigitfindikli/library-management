import app from "./app";
import { AppDataSource } from "./data-source";
import routes from "./routes/routes";

const PORT = process.env.PORT || 3000;

AppDataSource.initialize()
    .then(() => {
        console.log("Connected to the database");
        app.use("/", routes);

        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch((error) => console.log("Error connecting to the database", error));
