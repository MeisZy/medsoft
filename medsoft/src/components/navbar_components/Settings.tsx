import React, { useState } from 'react';
import './Settings.css';

function Settings({ onFilterChange }) {
  const [showPublic, setShowPublic] = useState(true);
  const [showPrivate, setShowPrivate] = useState(true);
  const [showPrimary, setShowPrimary] = useState(true);
  const [showSecondary, setShowSecondary] = useState(true);
  const [showTertiary, setShowTertiary] = useState(true);

  // Handler function to update filter options and trigger filter change
  const handleFilterChange = () => {
    const filterOptions = {
      showPublic,
      showPrivate,
      showPrimary,
      showSecondary,
      showTertiary,
    };
    onFilterChange(filterOptions);
  };

  return (
    <div className="settings-container">
      <h2>Filter</h2>
      <div className="settings-option">
        <label>
          <input
            type="checkbox"
            checked={showPublic}
            onChange={() => setShowPublic(!showPublic)}
          />
          <span>Public Hospitals</span>
        </label>
      </div>
      <div className="settings-option">
        <label>
          <input
            type="checkbox"
            checked={showPrivate}
            onChange={() => setShowPrivate(!showPrivate)}
          />
          <span>Private Hospitals</span>
        </label>
      </div>
      <h3>Filter by Tier:</h3>
      <div className="settings-option">
        <label>
          <input
            type="checkbox"
            checked={showPrimary}
            onChange={() => setShowPrimary(!showPrimary)}
          />
          <span>Primary</span>
        </label>
      </div>
      <div className="settings-option">
        <label>
          <input
            type="checkbox"
            checked={showSecondary}
            onChange={() => setShowSecondary(!showSecondary)}
          />
          <span>Secondary</span>
        </label>
      </div>
      <div className="settings-option">
        <label>
          <input
            type="checkbox"
            checked={showTertiary}
            onChange={() => setShowTertiary(!showTertiary)}
          />
          <span>Tertiary</span>
        </label>
      </div>
      <button className="settings-button" onClick={handleFilterChange}>
        Apply Filters
      </button>
    </div>
  );
}

export default Settings;
