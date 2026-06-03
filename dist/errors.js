"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendError = sendError;
const auth_service_1 = require("./auth.service");
function sendError(res, context, err, status = 500) {
    const pg = err;
    let message = err instanceof Error ? err.message : String(err);
    let code = status;
    if ((0, auth_service_1.isUniqueViolation)(err)) {
        message = "Этот email уже зарегистрирован";
        code = 409;
    }
    console.error(`[${context}]`, pg?.code ?? "", message, err);
    res.status(code).json({ error: message });
}
