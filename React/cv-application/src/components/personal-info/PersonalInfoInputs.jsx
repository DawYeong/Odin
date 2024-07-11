import { InputUnit } from "../InputUnit";

function PersonalInfo({ onChange }) {
  return (
    <div className="personal-info">
      <h2>Personal Details</h2>
      <InputUnit
        id="full-name"
        labelText="Full Name"
        type="text"
        placeholder="Enter first and last name"
        onChange={onChange}
      />

      <InputUnit
        id="email"
        labelText="Email"
        type="email"
        placeholder="Enter email"
        onChange={onChange}
      />

      <InputUnit
        id="phone"
        labelText="Phone Number"
        type="tel"
        placeholder="Enter phone number"
        onChange={onChange}
      />

      <InputUnit
        id="address"
        labelText="Address"
        type="text"
        placeholder="Enter City, Country"
        onChange={onChange}
      />
    </div>
  );
}

export { PersonalInfo };
