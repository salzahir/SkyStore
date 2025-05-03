import { app, PORT } from "./app.js";
import { devLog } from "./src/utils/devlog.js";

app.listen(PORT, () => {
    devLog(`Server is running at http://localhost:${PORT} in ${process.env.NODE_ENV} mode`);
});