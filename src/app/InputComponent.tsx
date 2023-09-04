"use client";

import { useState, useEffect } from "react";
import "./InputComponent.css";
import Session from "./Session";
import Settings from "./Settings";

interface Props {
    setSession: React.Dispatch<React.SetStateAction<Session | null>>;
    settings: Settings | null;
}

function InputComponent({ setSession, settings }: Props) {
    const [item, setItem] = useState<string>(settings?.item ?? "");
    const [mobsPerRunback, setMobsPerRunback] = useState<number>(
        settings?.mobsPerRunback ?? 0
    );
    const [dropChance, setDropChance] = useState<string>(
        settings?.dropChance.toString() ?? ""
    );
    const [characterLuck, setCharacterLuck] = useState<number>(
        settings?.characterLuck ?? 0
    );

    useEffect(() => {
        if (settings) {
            setItem(settings.item);
            setMobsPerRunback(settings.mobsPerRunback);
            setDropChance(settings.dropChance.toString());
            setCharacterLuck(settings.characterLuck);
        }
    }, [settings]);

    function randomUUID(): string {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
            /[xy]/g,
            function (c) {
                var r = (Math.random() * 16) | 0,
                    v = c == "x" ? r : (r & 0x3) | 0x8;
                return v.toString(16);
            }
        );
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSession({
            id: randomUUID(),
            item,
            mobsPerRunback,
            dropChance: parseFloat(dropChance) / 100,
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
                <label>Item Farmed</label>
                <input
                    type="text"
                    value={item}
                    onChange={(e) => setItem(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label>Mobs killed per Run</label>
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
                <label>Drop Rate (%)</label>
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
