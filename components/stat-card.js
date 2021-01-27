
import React from "react";

export default function StatCard({ title, value }) {
    return (
        <div className="stat-card">
            <div className="card" style={{ height: "200px", alignContent: "center" }}>
                <div className="card-content">
                    <p className="title is-1 has-text-centered gradient-text">
                        {value}
                    </p>
                </div>
                <footer className="card-footer">
                    <p className="card-footer-item">
                        {title}
                    </p>
                </footer>
            </div>
        </div>
    )
}
