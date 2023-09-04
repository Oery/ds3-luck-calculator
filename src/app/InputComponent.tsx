import { useState, useEffect } from "react";
import "./InputComponent.css";
import Session from "./Session";
import Settings from "./Settings";
import { randomUUID } from "crypto";

interface Props {
    setSession: React.Dispatch<React.SetStateAction<Session | null>>;
    settings: Settings | null;
}

function InputComponent({ setSession, settings }: Props) {
    const [item, setItem] = useState<string>(settings?.item ?? "");
    const [mobsPerRunback, setMobsPerRunback] = useState<number>(
        settings?.mobsPerRunback ?? 0
    );
    const [dropChance, setDropChance] = useState<number>(
        settings?.dropChance ?? 0
    );
    const [characterLuck, setCharacterLuck] = useState<number>(
        settings?.characterLuck ?? 0
    );

    useEffect(() => {
        if (settings) {
            setItem(settings.item);
            setMobsPerRunback(settings.mobsPerRunback);
            setDropChance(settings.dropChance);
            setCharacterLuck(settings.characterLuck);
        }
    }, [settings]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSession({
            id: randomUUID(),
            item,
            mobsPerRunback,
            dropChance: dropChance / 100,
            characterLuck: characterLuck,
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
                    step="1"
                    value={mobsPerRunback}
                    onChange={(e) =>
                        setMobsPerRunback(parseInt(e.target.value))
                    }
                    required
                />
            </div>
            <div className="form-group">
                <label>Drop Chance (%)</label>
                <input
                    type="number"
                    step="0.01"
                    value={dropChance}
                    onChange={(e) => setDropChance(parseFloat(e.target.value))}
                    required
                />
            </div>
            <div className="form-group">
                <label>Character Luck</label>
                <input
                    type="number"
                    step="1"
                    value={characterLuck}
                    onChange={(e) => setCharacterLuck(parseInt(e.target.value))}
                    required
                />
            </div>
            <button type="submit">Start</button>
        </form>
    );
}

export default InputComponent;
