interface DataWithDates {
    createdAt: Date;
    updatedAt: Date;
    date: Date;
}

/**
 * Convert date strings to data objects
 * @param data
 */
export const convertDates = (data: DataWithDates): any => {
    if (data.createdAt) {
        data.createdAt = new Date(data.createdAt);
    }

    if (data.updatedAt) {
        data.updatedAt = new Date(data.updatedAt);
    }

    if (data.date) {
        data.date = new Date(data.date);
    }

    return data;
};
