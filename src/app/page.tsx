"use client";
import React, { useState, useEffect } from "react";
import InputComponent from "./InputComponent";
import CounterComponent from "./CounterComponent";
import HistoryComponent from "./HistoryComponent";

import "./page.css";

export default function App() {
    const [sessions, setSessions] = useState([]);
    const [currentSession, setCurrentSession] = useState(null);
    const [cloneSession, setCloneSession] = useState(null);

    useEffect(() => {
        setSessions(JSON.parse(localStorage.getItem("sessions")) || []);
        setCurrentSession(JSON.parse(localStorage.getItem("currentSession")));
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
                        cloneSession={cloneSession}
                    />
                )}
                <HistoryComponent
                    sessions={sessions}
                    setSessions={setSessions}
                    setCloneSession={setCloneSession}
                />
            </div>
        </div>
    );
}
