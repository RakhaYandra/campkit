import React, { useState } from "react";
import PropTypes from "prop-types";
import api from "../../services/api";

const CreateUnit = ({ onCreateSuccess }) => {
  const [unitName, setUnitName] = useState("");
  const [unitCode, setUnitCode] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await api.createUnit({ name: unitName, code: unitCode });
      if (response.success) {
        onCreateSuccess();
      } else {
        setError("Failed to create unit. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  const formStyle = {
    display: "flex",
    flexDirection: "column",
    maxWidth: "300px",
    margin: "0 auto",
  };

  const inputStyle = {
    marginBottom: "10px",
    padding: "10px",
    fontSize: "16px",
  };

  const buttonStyle = {
    padding: "10px",
    fontSize: "16px",
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  };

  const errorStyle = {
    color: "red",
    marginBottom: "10px",
  };

  return (
    <div style={{ padding: "20px" }} aria-label="Create Unit Page">
      <h1>Create Unit</h1>
      <form
        onSubmit={handleSubmit}
        style={formStyle}
        aria-label="Create Unit Form"
      >
        {error && (
          <div style={errorStyle} role="alert">
            {error}
          </div>
        )}
        <input
          type="text"
          placeholder="Unit Name"
          value={unitName}
          onChange={(e) => setUnitName(e.target.value)}
          required
          style={inputStyle}
          aria-label="Unit Name"
        />
        <input
          type="text"
          placeholder="Unit Code"
          value={unitCode}
          onChange={(e) => setUnitCode(e.target.value)}
          required
          style={inputStyle}
          aria-label="Unit Code"
        />
        <button type="submit" style={buttonStyle}>
          Create
        </button>
      </form>
    </div>
  );
};

CreateUnit.propTypes = {
  onCreateSuccess: PropTypes.func.isRequired,
};

export default CreateUnit;
