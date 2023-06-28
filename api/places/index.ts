import placesRouter from '../../src/routes/places';
import { createApp } from '../../src/utils/createServer';

const app = createApp()
app.use("/api/places", placesRouter)

module.exports = app