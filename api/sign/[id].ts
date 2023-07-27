import signRouterId from '../../src/routes/sign';
import { createApp } from '../../src/utils/createServer';

const app = createApp()

app.use("/api/sign/:id", signRouterId)

module.exports = app