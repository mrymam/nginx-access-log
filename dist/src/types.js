"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isMethod = void 0;
const isMethod = (methodStr) => {
    return ['GET', 'POST', 'PUT', 'DELETE', 'HEAD', '', '-'].includes(methodStr);
};
exports.isMethod = isMethod;
