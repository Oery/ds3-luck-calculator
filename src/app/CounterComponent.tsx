import { useState, useEffect } from "react";
import "./CounterComponent.css";

export default function CounterComponent({
    session,
    setSession,
    sessions,
    setSessions,
}) {
    const [mobsKilled, setMobsKilled] = useState(session.mobsKilled);
    const [dropsLooted, setDropsLooted] = useState(session.dropsLooted);
    const [runbacks, setRunbacks] = useState(session.runbacks);
    const [startTime, setStartTime] = useState(session.startTime);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [timerActive, setTimerActive] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setSession({
                ...session,
                mobsKilled,
                dropsLooted,
                runbacks,
                startTime,
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [session, setSession, mobsKilled, dropsLooted, runbacks, startTime]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (timerActive) {
                setTimeElapsed((prevTime) => prevTime + 1);
            }
            setSession({
                ...session,
                mobsKilled,
                dropsLooted,
                runbacks,
                startTime,
                timeElapsed,
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [
        session,
        setSession,
        mobsKilled,
        dropsLooted,
        runbacks,
        startTime,
        timeElapsed,
        timerActive,
    ]);

    const handleMobKill = () => {
        setMobsKilled(mobsKilled + 1);
    };

    const handleDropLoot = () => {
        setDropsLooted(dropsLooted + 1);
    };

    const handleRunback = () => {
        setRunbacks(runbacks + 1);
        setMobsKilled(mobsKilled + session.mobsPerRunback);
    };

    const handleEndSession = () => {
        setSessions([
            ...sessions,
            {
                ...session,
                mobsKilled,
                dropsLooted,
                runbacks,
                endTime: Date.now(),
            },
        ]);
        setSession(null);
    };

    const handlePauseResume = () => {
        setTimerActive(!timerActive);
    };

    const baseDropChance = session.dropChance;
    const adjustedDropChance = baseDropChance * (session.characterLuck / 100);
    const luck = ((dropsLooted / mobsKilled) * 100) / adjustedDropChance;
    const dropsPerHour = (dropsLooted / timeElapsed) * 3600;
    const expectedDrops = mobsKilled * adjustedDropChance;

    return (
        <div>
            <div className="counter-group">
                <button onClick={handleMobKill}>Add Mob Kill</button>
                <button onClick={handleDropLoot}>Add Drop Loot</button>
                <button onClick={handleRunback}>Add Runback</button>
            </div>

            <div className="stats">
                <p>Mobs Killed: {mobsKilled}</p>
                <p>Runbacks: {runbacks}</p>
                <p>
                    Time Elapsed:{" "}
                    {new Date(timeElapsed * 1000).toISOString().substr(11, 8)}
                </p>
                <p>Drops Looted: {dropsLooted}</p>
                <p>Expected Drops: {expectedDrops.toFixed(2)}</p>
                <p>Drops per Hour: {dropsPerHour.toFixed(2)}</p>
                <p>Base Drop Chance: {(baseDropChance * 100).toFixed(2)}%</p>
                <p>
                    Adjusted Drop Chance:{" "}
                    {(adjustedDropChance * 100).toFixed(2)}%
                </p>
                <p>Luck: {luck.toFixed(2)}%</p>
            </div>

            {/* <h2>Item: {session.item}</h2> */}

            <button onClick={handlePauseResume}>
                {timerActive ? "Pause" : "Resume"}
            </button>
            <button onClick={handleEndSession}>End Session</button>
        </div>
    );
}
