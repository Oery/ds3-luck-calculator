import { useState, useEffect } from "react";
import "./InputComponent.css";

export default function InputComponent({ setSession, cloneSession }) {
    const [item, setItem] = useState(cloneSession?.item || "");
    const [mobsPerRunback, setMobsPerRunback] = useState(
        cloneSession?.mobsPerRunback || ""
    );
    const [dropChance, setDropChance] = useState(
        cloneSession?.dropChance || ""
    );
    const [characterLuck, setCharacterLuck] = useState(
        cloneSession?.characterLuck || ""
    );

    useEffect(() => {
        if (cloneSession) {
            setItem(cloneSession.item);
            setMobsPerRunback(cloneSession.mobsPerRunback);
            setDropChance(cloneSession.dropChance);
            setCharacterLuck(cloneSession.characterLuck);
        }
    }, [cloneSession]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSession({
            item,
            mobsPerRunback: parseInt(mobsPerRunback),
            dropChance: parseFloat(dropChance) / 100,
            characterLuck: parseInt(characterLuck),
            mobsKilled: 0,
            dropsLooted: 0,
            runbacks: 0,
            startTime: Date.now(),
            timeElapsed: 0,
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Item</label>
                <input
                    type="text"
                    value={item}
                    onChange={(e) => setItem(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label>Mobs per Runback</label>
                <input
                    type="number"
                    value={mobsPerRunback}
                    onChange={(e) => setMobsPerRunback(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label>Drop Chance (%)</label>
                <input
                    type="number"
                    step="0.01"
                    value={dropChance}
                    onChange={(e) => setDropChance(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label>Character Luck</label>
                <input
                    type="number"
                    value={characterLuck}
                    onChange={(e) => setCharacterLuck(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Start</button>
        </form>
    );
}
