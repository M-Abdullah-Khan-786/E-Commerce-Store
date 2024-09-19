import PropTypes from 'prop-types';

const CustomInput = (props) => {
    const {type,label, placeholder,id, className} = props
  return (
    <>
      <div className="form-floating mb-3">
        <input
          type={type}
          className={`form-control, ${className}`}
          id={`floatingInput, ${id}`}
          placeholder={placeholder}
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
    id: PropTypes.string,
    label: PropTypes.string,
  };

export default CustomInput;
