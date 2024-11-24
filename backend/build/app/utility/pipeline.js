"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPipeline = void 0;
const createPipeline = (query) => {
    const pipeline = [];
    const { page, limit = 2, sort, sortDirection, fields } = query, queryObj = __rest(query, ["page", "limit", "sort", "sortDirection", "fields"]);
    if (queryObj) {
        let queryString = JSON.stringify(queryObj);
        queryString = queryString.replace(/\b(gt|lt|gte|lte|eq)\b/g, (match) => `$${match}`);
        pipeline.push({
            $match: JSON.parse(queryString)
        });
    }
    if (sort) {
        let field = query.sort;
        if (!sortDirection) {
            const sortObject = { [field]: -1 };
            pipeline.push({
                $sort: sortObject
            });
        }
        if (sortDirection == 'ascending' || sortDirection == '1') {
            const sortObject = { [field]: 1 };
            pipeline.push({
                $sort: sortObject
            });
        }
    }
    if (page) {
        pipeline.push({
            $skip: (Number(page - 1)) * limit
        });
        pipeline.push({
            $limit: Number(limit)
        });
    }
    return pipeline;
};
exports.createPipeline = createPipeline;
