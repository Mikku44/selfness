export const Ranks = [
    { name: "Iron", maxXP: 400 },
    { name: "Bronze", maxXP: 800 },
    { name: "Silver", maxXP: 1600 },
    { name: "Gold", maxXP: 3200 },
    { name: "Platinum", maxXP: 6400 },
    { name: "Diamond", maxXP: 12800 },
    { name: "Master", maxXP: 25600 },
    { name: "Grandmaster", maxXP: 51200 },
    { name: "Champion", maxXP: 102400 },
    { name: "Legend", maxXP: 204800 }
];

export default function getRankByXP(xp: number) {
    // Handle case when XP exceeds all ranks
    if (xp >= Ranks[Ranks.length - 1].maxXP) {
        return {
            name: Ranks[Ranks.length - 1].name,
            maxXP: Ranks[Ranks.length - 1].maxXP,
            index: Ranks.length - 1,

        };
    }

    // Find the first rank where XP is less than its maxXP
    for (let i = 0; i < Ranks.length; i++) {
        if (xp < Ranks[i].maxXP) {
            return {
                name: i === 0 ? Ranks[0].name : Ranks[i].name,
                maxXP: i === 0 ? Ranks[0].maxXP : Ranks[i].maxXP,
                index: i === 0 ? 0 : i
            };
        }
    }

    // Fallback (should never reach here)
    return {
        name: Ranks[0].name,
        maxXP: Ranks[0].maxXP,
        index: 0
    };
}


export function nextRank(xp:number) {
    // Handle case when XP exceeds all ranks
    if (xp < Ranks[0].maxXP) {
        return {
            name: Ranks[1].name,
            maxXP: Ranks[1].maxXP,
            index: 1,

        };
    }

    // Find the first rank where XP is less than its maxXP
    for (let i = 0; i < Ranks.length; i++) {
        if (xp < Ranks[i].maxXP) {
            return {
                name: i === 0 ? Ranks[0].name : Ranks[i + 1].name,
                maxXP: i === 0 ? Ranks[0].maxXP : Ranks[i + 1].maxXP,
                index: i === 0 ? 0 : i
            };
        }
    }

    // Fallback (should never reach here)
    return {
        name: Ranks[Ranks.length - 1].name,
        maxXP: Ranks[Ranks.length - 1].maxXP,
        index: Ranks.length - 1
    };
}
