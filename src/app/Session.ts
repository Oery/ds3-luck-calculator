interface Session {
    item: string;
    mobsPerRunback: number;
    dropChance: number;
    characterLuck: number;
    mobsKilled: number;
    dropsLooted: number;
    runbacks: number;
    startTime: number;
    endTime?: number;
    timeElapsed: number;
    id: string;
}

export default Session;
