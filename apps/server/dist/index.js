"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const constants_1 = require("./src/lib/constants");
const router_1 = __importDefault(require("./src/router"));
const cors_1 = __importDefault(require("cors"));
const server_1 = require("@apollo/server");
const standalone_1 = require("@apollo/server/standalone");
const fs_1 = require("fs");
const resolvers_1 = require("./src/resolvers");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use(router_1.default);
mongoose_1.default.connect(constants_1.MONGODB_URL);
const db = mongoose_1.default.connection;
const typeDefs = (0, fs_1.readFileSync)('./src/schema.graphql', 'utf-8');
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB!');
});
const apolloServer = new server_1.ApolloServer({
    typeDefs,
    resolvers: resolvers_1.resolvers,
});
(0, standalone_1.startStandaloneServer)(apolloServer, { listen: { port: 4000 } })
    .then(({ url }) => {
    console.log('🚀 Server ready at', url);
})
    .catch((error) => {
    console.error('An error occurred:', error);
});
console.log('for arol listening now');
const server = app.listen(8080, () => {
    console.log('connectig to db...', constants_1.MONGODB_URL);
    console.log('360 review server is listening on port 8080! 🤜🤛');
});
function shutdown() {
    console.log('for craig hello');
    server.close(() => {
        mongoose_1.default.connection.close().then(() => {
            process.exit(0);
        });
    });
    console.log('👋 SIGTERM RECEIVED. Shutting down gracefully');
}
process.on('SIGTERM', () => {
    console.log('SIGTERM');
    shutdown();
});
process.on('SIGUSR2', () => {
    console.log('SIGUSR2');
    shutdown();
});
