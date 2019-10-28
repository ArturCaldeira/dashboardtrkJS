import React from 'react';
import GlobalStyle from '../globalstyles/globalstyles';
import FormLogin from '../components/LoginForm/';
class Login extends React.Component {
    render() {
        return (
            <React.Fragment>
                <FormLogin/>
                <GlobalStyle/>
            </React.Fragment>
        );
    }
}
export default Login;