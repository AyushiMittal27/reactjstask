import React, { useEffect } from "react";
import { connect } from "react-redux";

const Index = (props) => {
  useEffect(() => {
    redirectTheUser();
  }, []);

  const redirectTheUser = () => {
    if (props.auth === false) {
      props.history.push("/login");
    } else {
      props.history.push("/profile");
    }
  };

  return <div></div>;
};
function mapStateToProps({ auth }) {
  return { auth };
}
export default connect(mapStateToProps)(Index);
