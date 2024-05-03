import { useState } from 'react';
import './SearchBar.css'

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
    <div>
      <h2>Filter</h2> 
      <label>
        <input
          type="checkbox"
          checked={showPublic}
          onChange={() => setShowPublic(!showPublic)}
        />
        Show Public Hospitals
      </label>
      <br />
      <label>
        <input
          type="checkbox"
          checked={showPrivate}
          onChange={() => setShowPrivate(!showPrivate)}
        />
        Show Private Hospitals
      </label>
      <br />
      <h3>Filter by Tier:</h3>
      <label>
        <input
          type="checkbox"
          checked={showPrimary}
          onChange={() => setShowPrimary(!showPrimary)}
        />
        Primary
      </label>
      <br />
      <label>
        <input
          type="checkbox"
          checked={showSecondary}
          onChange={() => setShowSecondary(!showSecondary)}
        />
        Secondary
      </label>
      <br />
      <label>
        <input
          type="checkbox"
          checked={showTertiary}
          onChange={() => setShowTertiary(!showTertiary)}
        />
        Tertiary
      </label>
      <br />
      <button onClick={handleFilterChange}>Apply Filters</button>
    </div>
  );
}

export default Settings;