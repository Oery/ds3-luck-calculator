"use client";
import React, { useState, useEffect } from "react";
import InputComponent from "./InputComponent";
import CounterComponent from "./CounterComponent";
import HistoryComponent from "./HistoryComponent";
import Session from "./Session";

import "./page.css";
import SessionSettings from "./SessionSettings";

export default function App() {
    const [sessions, setSessions] = useState<Session[]>([]);
    const [currentSession, setCurrentSession] = useState<Session | null>(null);
    const [settings, setSettings] = useState<SessionSettings | null>(null);

    useEffect(() => {
        const sessionsFromStorage = localStorage.getItem("sessions");
        const currentSessionFromStorage =
            localStorage.getItem("currentSession");

        setSessions(sessionsFromStorage ? JSON.parse(sessionsFromStorage) : []);
        setCurrentSession(
            currentSessionFromStorage
                ? JSON.parse(currentSessionFromStorage)
                : null
        );
    }, []);

    useEffect(() => {
        localStorage.setItem("sessions", JSON.stringify(sessions));
    }, [sessions]);

    useEffect(() => {
        localStorage.setItem("currentSession", JSON.stringify(currentSession));
    }, [currentSession]);

    return (
        <div className="container">
            <div className="card">
                <h1>Dark Souls Luck Calculator</h1>
                {currentSession ? (
                    <CounterComponent
                        session={currentSession}
                        setSession={setCurrentSession}
                        sessions={sessions}
                        setSessions={setSessions}
                    />
                ) : (
                    <InputComponent
                        setSession={setCurrentSession}
                        settings={settings}
                    />
                )}
                <HistoryComponent
                    sessions={sessions}
                    setSessions={setSessions}
                    setSettings={setSettings}
                />
            </div>
        </div>
    );
}
