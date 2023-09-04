import React, { useState, useEffect } from "react";
import "./CounterComponent.css";
import Session from "./Session";

interface Props {
    session: Session;
    setSession: React.Dispatch<React.SetStateAction<Session | null>>;
    sessions: Session[];
    setSessions: React.Dispatch<React.SetStateAction<Session[]>>;
}

function CounterComponent({
    session,
    setSession,
    sessions,
    setSessions,
}: Props) {
    const [mobsKilled, setMobsKilled] = useState(session.mobsKilled);
    const [dropsLooted, setDropsLooted] = useState(session.dropsLooted);
    const [runbacks, setRunbacks] = useState(session.runbacks);
    const [startTime] = useState(session.startTime);
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
                <button onClick={handleMobKill}>Add Kill</button>
                <button onClick={handleDropLoot}>Add Drop</button>
                <button onClick={handleRunback}>Add Run</button>
            </div>

            <div className="stats">
                <p>Kills: {mobsKilled}</p>
                <p>Runs: {runbacks}</p>
                <p>
                    Time Elapsed:{" "}
                    {new Date(timeElapsed * 1000).toISOString().substr(11, 8)}
                </p>
                <p>Drops: {dropsLooted}</p>
                <p>Expected Drops: {expectedDrops.toFixed(2)}</p>
                <p>Drops/h: {dropsPerHour.toFixed(2)}</p>
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
            <button onClick={handleEndSession}>End</button>
        </div>
    );
}

export default CounterComponent;
