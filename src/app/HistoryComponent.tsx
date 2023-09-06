import "./HistoryComponent.css";
import Session from "./Session";
import Settings from "./Settings";
import React from "react";

interface Props {
    sessions: Session[];
    setSessions: React.Dispatch<React.SetStateAction<Session[]>>;
    setSettings: React.Dispatch<React.SetStateAction<Settings | null>>;
}

function HistoryComponent({ sessions, setSessions, setSettings }: Props) {
    const handleDelete = (index: number) => {
        const newSessions = sessions.slice();
        newSessions.splice(index, 1);
        setSessions(newSessions);
    };

    const handleClone = (session: Settings) => {
        setSettings({
            item: session.item,
            mobsPerRunback: session.mobsPerRunback,
            dropChance: session.dropChance * 100, // convert to percentage
            characterLuck: session.characterLuck,
        });
    };

    return (
        <div>
            <h2>History</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Item</th>
                        <th>Kills</th>
                        <th>Drops</th>
                        <th>Runs</th>
                        <th>Duration</th>
                        <th>Luck</th>
                        <th>Drops/h</th>
                        <th>Expected Drops</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {sessions.map((session, index) => {
                        const baseDropChance = session.dropChance;
                        const adjustedDropChance =
                            baseDropChance * (1 + session.characterLuck / 100);
                        const luck =
                            ((session.dropsLooted / session.mobsKilled) * 100) /
                            adjustedDropChance;
                        const dropsPerHour =
                            (session.dropsLooted / session.timeElapsed) * 3600;
                        const expectedDrops =
                            (session.mobsKilled * adjustedDropChance) / 100;
                        return (
                            <tr key={session.id}>
                                <td>{session.item}</td>
                                <td>{session.mobsKilled}</td>
                                <td>{session.dropsLooted}</td>
                                <td>{session.runbacks}</td>
                                <td>
                                    {
                                        new Date(session.timeElapsed * 1000)
                                            .toUTCString()
                                            .split(" ")[4]
                                    }
                                </td>
                                <td>{luck.toFixed(2)}%</td>
                                <td>{dropsPerHour.toFixed(2)}</td>
                                <td>{expectedDrops.toFixed(2)}</td>
                                <td>
                                    <button onClick={() => handleDelete(index)}>
                                        Delete
                                    </button>
                                </td>
                                <td>
                                    <button
                                        onClick={() => handleClone(session)}
                                    >
                                        Clone
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default HistoryComponent;
