function InputUnit({
  id,
  labelText,
  type,
  placeholder,
  value,
  onChange,
  dataKey,
}) {
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
          data-key={dataKey}
        ></textarea>
      ) : (
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          data-key={dataKey}
        />
      )}
    </div>
  );
}

export { InputUnit };
