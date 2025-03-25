export const userIdToTag = (userId) => {
    return userId.toString(36).toUpperCase();
};

export const tagToUserId = (tag) => {
    return parseInt(tag, 36);
};
