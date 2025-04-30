import { app, PORT } from "./app.js";

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});