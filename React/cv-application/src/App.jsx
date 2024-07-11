import { useState } from "react";
import { PersonalInfo } from "./components/personal-info/PersonalInfoInputs";
import { DEFAULT_PERSONAL_DETAILS } from "./base-models";

function App() {
  const [personalInfo, setPersonalInfo] = useState(DEFAULT_PERSONAL_DETAILS);

  function handlePersonalInfoUpdate(e) {
    setPersonalInfo({
      ...personalInfo,
      [e.target.dataset.key]: e.target.value,
    });
  }

  return (
    <div className="app">
      <div className="input-forms">
        <PersonalInfo
          personalInfo={personalInfo}
          onChange={handlePersonalInfoUpdate}
        />
      </div>
    </div>
  );
}

export default App;
