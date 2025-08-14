import { Monitoring } from '../../db/db.js'
import path from "path";
import dotenv from 'dotenv'
import { fileURLToPath } from "url";
import { RequestCreateRecord, RequestUpdateUrl, RequestDeleteUrl, RequestDeleteRecord } from './Repository.types.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({path: path.join(__dirname, "../../../../../.env")});

if (!process.env.SLOT_LIMIT_DEFAULT) {
    throw new Error("SLOT_LIMIT_DEFAULT is not set in .env!")
}
if (!process.env.SLOT_LIMIT_ULTIMATE) {
    throw new Error("SLOT_LIMIT_ULTIMATE is not set in .env!")
}

const SLOT_LIMIT_DEFAULT: number = Number(process.env.SLOT_LIMIT_DEFAULT);
const SLOT_LIMIT_ULTIMATE: number = Number(process.env.SLOT_LIMIT_ULTIMATE);

class Repository {

    async createRecord(requestCreateRecord: RequestCreateRecord) {

        const { userId } = requestCreateRecord;
        const { url, interval } =requestCreateRecord.data

        try {
            const user = await Monitoring.findOne({userId});

            if (!user) {
                return `Error while updating url, user with id ${userId} not found.`;
            }

            if (user && user.urls.length < SLOT_LIMIT_DEFAULT) {
                await Monitoring.updateOne({ userId: userId }, {
                    $push: {
                        urls: {
                            url: url,
                            interval: interval

                        }
                    }
                })
            } else if (user && user.urls.length >= SLOT_LIMIT_DEFAULT) {
                // gRPC call to check user SLOT_LIMIT
            } else {
                await Monitoring.create({
                    userId: userId,
                    urls: [
                        {
                            url: url,
                            interval: interval
                        }
                    ]
                })
            }
        } catch (error) {
            throw error;
        }
    }

    async updateRecord(requestUpdateUrl: RequestUpdateUrl) {

        const { userId } = requestUpdateUrl;
        const { url, interval, urlId } = requestUpdateUrl.data;

        try {
            const user = await Monitoring.findOne({userId: userId});

            if (!user) {
                return `Error while updating url, user with id ${userId} not found.`;
            }

            await Monitoring.updateOne(
                { userId: userId },
                {
                    $set: {
                        'urls.$[elem].url': url,
                        'urls.$[elem].interval': interval,
                    },
                },
                {
                    arrayFilters: [{ 'elem._id': urlId }]
                }
            )
        } catch (error) {
            throw error;
        }
    }

    async deleteURLFromRecord(requestDeleteUrl: RequestDeleteUrl) {

        const { userId } = requestDeleteUrl;
        const { urlId } = requestDeleteUrl.data;

        try {
            const user = await Monitoring.findOne({userId: userId})

            if (!user) {
                return `Error while deleting url, user with id ${ userId } not found.`;
            }

            await Monitoring.updateOne({userId: userId},
                {
                    $pull: {
                        urls: {_id: urlId}
                    }
                }
            )
        } catch (error) {
            throw error;
        }
    }

    async deleteRecord(requestDeleteRecord: RequestDeleteRecord) {

        const { userId } = requestDeleteRecord;

        try {
            const user = await Monitoring.findOne({userId: userId});

            if (!user) {
                return `Error while deleting record, user with id ${ userId } not found.`;
            }

            await Monitoring.deleteOne({userId: userId});
        } catch (error) {
            throw error;
        }
    }
}

export default Repository;