export const Ranks = [
    {
        name: "Iron",
        maxXP: 400
    },
    {
        name: "Bronze",
        maxXP: 800
    },
    {
        name: "Silver",
        maxXP: 1600
    },
    {
        name: "Gold",
        maxXP: 3200
    },
    {
        name: "Platinum",
        maxXP: 6400
    },
    {
        name: "Diamond",
        maxXP: 12800
    },
    {
        name: "Master",
        maxXP: 25600
    },
    {
        name: "Grandmaster",
        maxXP: 51200
    },
    {
        name: "Champion",
        maxXP: 102400
    },
    {
        name: "Legend",
        maxXP: 204800
    }
];

export default function getRankByXP(xp: number) {
    let currentRank = Ranks[0];
    
    for (const rank of Ranks) {
        if (xp >= rank.maxXP) {
            currentRank = rank;
        } else {
            break;
        }
    }
    
    return currentRank.name;
}
