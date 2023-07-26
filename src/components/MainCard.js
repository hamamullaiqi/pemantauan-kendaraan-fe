import React from "react";
import { useSelector } from "react-redux";

export default function MainCard({ children, background, style }) {
    const { theme } = useSelector((state) => state.apps);
    return (
        <div
            style={{
                backgroundColor:
                    theme === "dark"
                        ? "#0F0F0F"
                        : !!background
                        ? background
                        : "white",
                borderRadius: 8,
                border: theme === "dark" && "1px solid #3d3d3d",
                marginBottom: "16px",
                padding: 16,
                boxShadow: "1px 4px 5px -1px rgba(0,0,0,0.1)",
                ...style,
            }}
        >
            {children}
        </div>
    );
}
