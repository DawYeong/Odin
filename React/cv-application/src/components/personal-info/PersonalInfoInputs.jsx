import { InputUnit } from "../InputUnit";

function PersonalInfo({ personalInfo, onChange }) {
  return (
    <div className="personal-info">
      <h2>Personal Details</h2>
      <InputUnit
        id="full-name"
        labelText="Full Name"
        type="text"
        placeholder="Enter first and last name"
        onChange={onChange}
        value={personalInfo.fullName}
        dataKey="fullName"
      />

      <InputUnit
        id="email"
        labelText="Email"
        type="email"
        placeholder="Enter email"
        onChange={onChange}
        value={personalInfo.email}
        dataKey="email"
      />

      <InputUnit
        id="phone"
        labelText="Phone Number"
        type="tel"
        placeholder="Enter phone number"
        onChange={onChange}
        value={personalInfo.phone}
        dataKey="phone"
      />

      <InputUnit
        id="address"
        labelText="Address"
        type="text"
        placeholder="Enter City, Country"
        onChange={onChange}
        value={personalInfo.address}
        dataKey="address"
      />
    </div>
  );
}

export { PersonalInfo };
