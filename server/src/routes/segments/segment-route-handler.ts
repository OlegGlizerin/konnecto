import { Request, Response } from "express";
import { handleResponseError } from "../route-handlers/route-error-handler";
import { Collection, ObjectId } from "mongodb";
import {
  ISegment,
  ISegmentGenderData,
  ISegmentMetaData,
} from "../../common/types/db-models/segment";
import {
  Gender,
} from "../../common/types/db-models/user"
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

    res.json({ totalCount: segmentList.length, data: response });
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
    res.json({ success: true, data: [segment] });
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
    var segmentId = new ObjectId(req.params.id);

    const dbWrapper = await getDbWrapper();
    let [segmentCollection, userCollection] = await Promise.all([dbWrapper.getCollection("segments"), dbWrapper.getCollection('users')])

    let [femalesCount, malesCount] = await Promise.all([userCollection.find({
      segment_ids: { "$in": [segmentId] },
      gender: 'Female'
    }).count(), userCollection.find({
      segment_ids: { "$in": [segmentId] },
      gender: 'Male'
    }).count()]);

    var response = [{ _id: Gender.Male, userCount: malesCount, userPercentage: malesCount / (malesCount + femalesCount) * 100 },
    { _id: Gender.Female, userCount: femalesCount, userPercentage: femalesCount / (malesCount + femalesCount) * 100 }];

    res.json({ data: response });
  } catch (error) {
    handleResponseError(
      `Segment gender data error: ${error.message}`,
      error.message,
      res
    );
  }
}
