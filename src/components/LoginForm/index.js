import React from 'react';
import { Logincontainer } from './styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import logoLogin from './authentic.svg';
import { Link, withRouter, Redirect } from 'react-router-dom';
import { login, isAuthenticated } from '../../service/auth';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


// Page react
class FormLogin extends React.Component {
    constructor() {
        super();
        this.state = {
            uid: '',
            password: '',
            error: '',
            RedirectOn: false
        }
        this.handleChangeUid = (evento) => {
            console.log("change")
            this.setState({
                uid: evento.target.value
            })
        }
        this.handleChangePassword = (evento) => {
            this.setState({
                password: evento.target.value
            })
        }
        this.handleSubmit = async evento => {
            evento.preventDefault();
            const uid = this.state.uid;
            const password = this.state.password;
            // console.log(uid, password);
            // isto é a requisição para o authManager autenticar usuário e lhe ceder um token
            const requestBody = {
                "email": `${uid}`,
                "pass": `${password}`
            }
            if (!uid || !password) {
                toast.warn('Fill all the boxes!');
            } else {
                try {
                    let response = await axios.post("http://54.187.204.12:8080/trk_user_query", requestBody);
                    response = response.data;
                    console.log(response[0].email)
                    if (response[0].email === `${uid}`) {
                        login(response[0].email);
                        this.setState({
                            RedirectOn: true
                        })
                        this.props.history.push('/admin/dashboard');
                    }
                } catch (err) {
                    toast.error('An error ocurred!\n Check your credentials...')
                    console.log(err)
                }
            }
        }
    }
    render() {
        if (isAuthenticated()) {
            this.props.history.push('/admin/dashboard');
        }
        return (
            <React.Fragment>
                <Logincontainer>
                    <div>
                        <img src={logoLogin} alt="logo" />
                        {this.state.error && this.state.error}
                        <p className="frase">TRK Login</p>
                        <form>
                            <TextField type="txt" id="standard-full-width" name="uid" label="Email" placeholder="Enter your email" helperText="example: testdash@email.com" fullWidth margin="normal"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={this.state.uid}
                                onChange={this.handleChangeUid}
                            />
                            <TextField type="password" id="standard-password-input" name="password" label="Password" placeholder="Enter your password." helperText="" fullWidth margin="normal"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={this.state.password}
                                onChange={this.handleChangePassword}
                            />
                            <Button onClick={this.handleSubmit} variant="contained" size="medium" color="primary">Enviar</Button>
                        </form>
                    </div>
                </Logincontainer>
                {this.state.RedirectOn === true ? <Redirect to="/admin/dashboard" /> : null}
                <ToastContainer position="top-center" autoClose={2500} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnVisibilityChange draggable pauseOnHover />
            </React.Fragment>
        );
    }
}
export default withRouter(FormLogin);