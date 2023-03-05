"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSegmentGenderData = exports.updateSegmentById = exports.getSegmentById = exports.segmentList = void 0;
const route_error_handler_1 = require("../route-handlers/route-error-handler");
const mongodb_1 = require("mongodb");
const mongo_wrapper_1 = require("../../common/db/mongo-wrapper");
function segmentList(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const segmentCollection = yield (yield (0, mongo_wrapper_1.getDbWrapper)()).getCollection("segments");
            // todo TASK 1
            // write this function to return { data: ISegmentMetaData[]; totalCount: number };
            // where data is an array of ISegmentMetaData, and totalCount is the # of total segments
            // the "users" collection
            // const userCollection: Collection = await (await getDbWrapper()).getCollection('users');
            // has a "many to many" relationship to the segment collection, check IUser interface or query the raw data.
            // res.json({ success: true, data: ISegmentMetaData[], totalCount });
            res.json({ success: true });
        }
        catch (error) {
            (0, route_error_handler_1.handleResponseError)(`Get Segment List Error: ${error.message}`, error.message, res);
        }
    });
}
exports.segmentList = segmentList;
function getSegmentById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const segmentCollection = yield (yield (0, mongo_wrapper_1.getDbWrapper)()).getCollection("segments");
            const segment = yield segmentCollection.findOne({
                _id: new mongodb_1.ObjectId(req.params.id),
            });
            if (!segment) {
                return (0, route_error_handler_1.handleResponseError)(`Error getSegmentById`, `Segment with id ${req.params.id} not found.`, res);
            }
            res.json({ success: true, data: segment });
        }
        catch (error) {
            (0, route_error_handler_1.handleResponseError)(`Get Segment by id error: ${error.message}`, error.message, res);
        }
    });
}
exports.getSegmentById = getSegmentById;
function updateSegmentById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // res.json({ success: true });
        }
        catch (error) {
            (0, route_error_handler_1.handleResponseError)(`Update Segment by id error: ${error.message}`, error.message, res);
        }
    });
}
exports.updateSegmentById = updateSegmentById;
function getSegmentGenderData(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const segmentCollection = yield (yield (0, mongo_wrapper_1.getDbWrapper)()).getCollection("segments");
            // todo TASK 2
            // write this function to return
            // data = [ { _id: "Male", userCount: x1, userPercentage: y1 }, { _id: "Female", userCount: x2, userPercentage: y2} ]
            // the "users" collection
            // const userCollection: Collection = await (await getDbWrapper()).getCollection('users');
            // has a "many to many" relationship to the segment collection, check IUser interface or query the raw data.
            // res.json({ success: true, data: ISegmentGenderData[] });
            res.json({ success: true });
        }
        catch (error) {
            (0, route_error_handler_1.handleResponseError)(`Segment gender data error: ${error.message}`, error.message, res);
        }
    });
}
exports.getSegmentGenderData = getSegmentGenderData;
//# sourceMappingURL=segment-route-handler.js.map