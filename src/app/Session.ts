import { UUID } from "crypto";

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
    id: UUID;
}

export default Session;
