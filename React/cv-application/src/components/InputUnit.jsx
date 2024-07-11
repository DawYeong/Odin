function InputUnit({ id, labelText, type, placeholder, value, onChange }) {
  return (
    <div className="input-unit">
      <label htmlFor={id}>
        <span className="label-text">{labelText}</span>
      </label>

      {type === "textarea" ? (
        <textarea
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        ></textarea>
      ) : (
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      )}
    </div>
  );
}

export { InputUnit };
