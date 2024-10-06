import PropTypes from "prop-types";

const CustomInput = (props) => {
  const {
    type,
    label,
    placeholder,
    id,
    className,
    name,
    onChange,
    onBlur,
    value,
  } = props;
  return (
    <>
      <div className="form-floating mt-3">
        <input
          type={type}
          className={`form-control, ${className}`}
          id={`floatingInput, ${id}`}
          name={name}
          placeholder={placeholder}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
        />
        <label htmlFor="floatingInput">{label}</label>
      </div>
    </>
  );
};

CustomInput.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
};

export default CustomInput;
