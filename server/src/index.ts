import { app } from "./app";
import { EnvConfig } from "./lib/env";

const port = EnvConfig.port;
app.listen(port, () => {
  console.log("App running in port: " + port);
});
