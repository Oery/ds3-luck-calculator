import "./HistoryComponent.css";

export default function HistoryComponent({
    sessions,
    setSessions,
    setCloneSession,
}) {
    const handleDelete = (index) => {
        const newSessions = sessions.slice();
        newSessions.splice(index, 1);
        setSessions(newSessions);
    };

    const handleClone = (session) => {
        setCloneSession({
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
                        <th>Mobs Killed</th>
                        <th>Drops Looted</th>
                        <th>Runbacks</th>
                        <th>Session Time</th>
                        <th>Luck</th>
                        <th>Drops per Hour</th>
                        <th>Expected Drops</th>
                        <th>Action</th>
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
                            <tr key={index}>
                                <td>{session.item}</td>
                                <td>{session.mobsKilled}</td>
                                <td>{session.dropsLooted}</td>
                                <td>{session.runbacks}</td>
                                <td>
                                    {new Date(session.timeElapsed * 1000)
                                        .toISOString()
                                        .substr(11, 8)}
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
