import PropTypes from "prop-types";

const CustomInput = (props) => {
    const {type, name, id, placeholder, className} = props
  return (
    <>
      <div>
        <input
          type={type}
          name={name}
          id={id}
          placeholder={placeholder}
          className={`form-control ${className}`}
        />
      </div>
    </>
  );
};
CustomInput.propTypes = {
    type: PropTypes.string.isRequired,
    name: PropTypes.string,
    id: PropTypes.string,
    placeholder: PropTypes.string,
    className: PropTypes.string,
};
export default CustomInput;
