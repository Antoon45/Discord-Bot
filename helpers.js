module.exports.getPoints = async function (guildId, userId) {
    if (!guildId) { throw ('Missing required parameter \'guildId\''); }
    if (!userId) { throw ('Missing required parameter \'userId\''); }

    const guildArray = await serverlist.aggregate(
        { $match: { guildId: guildId } },
        { $unwind: '$members' },
        { $match: { 'members.id': userId } },
        { $group: {} }
    ).toArray();
    
    const points = guildArray[0].members.points;
    return points;
}