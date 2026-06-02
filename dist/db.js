"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
const pg_1 = require("pg");
exports.pool = new pg_1.Pool({ user: "mac", host: "localhost", database: "otc_metals_dev", password: "", port: 5432, max: 10, idleTimeoutMillis: 30000 });
