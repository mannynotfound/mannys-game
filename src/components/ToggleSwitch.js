/* eslint-ignore jsx-a11y/label-has-associated-control */
const ToggleSwitch = ({ id, name, checked, onChange, disabled }) => {
  if (!id) {
    return null;
  }

  return (
    <div className="toggle-switch">
      <input
        type="checkbox"
        name={name}
        className="toggle-switch-checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />
      <label className="toggle-switch-label" htmlFor={id}>
        <span
          className={
            disabled
              ? 'toggle-switch-inner toggle-switch-disabled'
              : 'toggle-switch-inner'
          }
        />
        <span
          className={
            disabled
              ? 'toggle-switch-switch toggle-switch-disabled'
              : 'toggle-switch-switch'
          }
        />
      </label>
    </div>
  );
};

export default ToggleSwitch;
