import { Request, Response } from "express";
import { handleResponseError } from "../route-handlers/route-error-handler";
import { Collection, ObjectId } from "mongodb";
import {
  ISegment,
  ISegmentGenderData,
  ISegmentMetaData,
} from "../../common/types/db-models/segment";
import { getDbWrapper } from "../../common/db/mongo-wrapper";

export async function segmentList(req: Request, res: Response): Promise<void> {
  try {
    const segmentCollection: Collection = await (
      await getDbWrapper()
    ).getCollection("segments");

    var segmentList = await segmentCollection.find({}).toArray();
    var response = segmentList.map((item) => {
      return item as ISegmentMetaData
    });

    res.json({ totalCount: segmentList.length, response: response });
  } catch (error) {
    handleResponseError(
      `Get Segment List Error: ${error.message}`,
      error.message,
      res
    );
  }
}

export async function getSegmentById(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const segmentCollection: Collection = await (
      await getDbWrapper()
    ).getCollection("segments");
    const segment: ISegment = await segmentCollection.findOne({
      _id: new ObjectId(req.params.id as string),
    });
    if (!segment) {
      return handleResponseError(
        `Error getSegmentById`,
        `Segment with id ${req.params.id} not found.`,
        res
      );
    }
    res.json({ success: true, data: segment });
  } catch (error) {
    handleResponseError(
      `Get Segment by id error: ${error.message}`,
      error.message,
      res
    );
  }
}

export async function updateSegmentById(
  req: Request,
  res: Response
): Promise<void> {
  try {
    // res.json({ success: true });
  } catch (error) {
    handleResponseError(
      `Update Segment by id error: ${error.message}`,
      error.message,
      res
    );
  }
}

export async function getSegmentGenderData(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const segmentCollection: Collection = await (
      await getDbWrapper()
    ).getCollection("segments");

    // todo TASK 2
    // write this function to return
    // data = [ { _id: "Male", userCount: x1, userPercentage: y1 }, { _id: "Female", userCount: x2, userPercentage: y2} ]

    // the "users" collection
    const userCollection: Collection = await (await getDbWrapper()).getCollection('users');

    // console.log('rrrr', req.params.id); NOT WORKING :(

    var usersList = await userCollection.find({ 'segment_ids': '62e5778b34362ad54db6b3f7' }).toArray();

    //didnt have enough time to finish this task :(
    res.json({ success: true, response: usersList });
  } catch (error) {
    handleResponseError(
      `Segment gender data error: ${error.message}`,
      error.message,
      res
    );
  }
}
