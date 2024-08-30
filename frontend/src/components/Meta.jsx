import PropTypes from "prop-types";
import { Helmet } from "react-helmet";

const Meta = ({ title }) => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>E-Store | {title}</title>
      </Helmet>
    </>
  );
};

Meta.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Meta;
