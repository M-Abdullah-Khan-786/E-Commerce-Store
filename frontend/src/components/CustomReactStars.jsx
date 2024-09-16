import ReactStars from "react-rating-stars-component";
import PropTypes from "prop-types";


const CustomReactStars = (props) => {
    const {count, size, value, edit, activeColor} = props
  return (
    <>
      <ReactStars
              count={count}
              size={size}
              value={value}
              edit={edit}
              activeColor={activeColor}
            />
    </>
  )
}
CustomReactStars.propTypes = {
    count: PropTypes.number,
    size: PropTypes.number,
    value: PropTypes.number,
    edit: PropTypes.bool,
    activeColor: PropTypes.string,
  };

export default CustomReactStars;
