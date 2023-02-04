import React, { Component } from "react";
import './Login.css';

export default class Login extends Component {
    constructor(params) {
        super(params);
        this.email = React.createRef();
        this.pwd = React.createRef();
        this.state = {
            fail : false
        }
    }

    componentDidMount = () => {
        this.email.current.value = 'cyril.fontaine@gmail.com';
        this.pwd.current.value = 'motdepasse';
    }

    sendData = () => {
        let data = {
            email : this.email.current.value,
            pwd : this.pwd.current.value
        };
        fetch('https://limping-quince-production.up.railway.app/login/admin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data.code !== undefined) {
                this.setState({
                    fail : true
                });
            }else {
                console.log(data);
                sessionStorage.setItem('token',JSON.stringify(data.data));
                window.location.replace('/listerecharge');
            }
        });

    }

    render() {
        return (
             <React.Fragment>
                <div class="auth-wrapper d-flex no-block justify-content-center align-items-center position-relative loutside"
                    >
                    <div class="auth-box row">
                        <div class="col-lg-7 col-md-5 modal-bg-img next">
                        </div>
                        <div class="col-lg-5 col-md-7 bg-white">
                            <div class="p-3">
                                <div class="text-center">
                                    <img src="/hassets/assets/images/big/icon.png" alt="wrapkit"/>
                                </div>
                                <h2 class="mt-3 text-center">Authentification</h2>
                                <p class="text-center">Connectez-vous avec votre email et mot de passe</p>
                                <div class="mt-4">
                                    <div class="row">
                                        <div class="col-lg-12">
                                            <div class="form-group">
                                                <label class="text-dark" for="uname">Email</label>
                                                <input class="form-control" id="uname" type="email"
                                                    placeholder="jean@gmail.com" ref={this.email} />
                                            </div>
                                        </div>
                                        <div class="col-lg-12">
                                            <div class="form-group">
                                                <label class="text-dark" for="pwd">Mot de passe</label>
                                                <input class="form-control" id="pwd" type="password"
                                                    placeholder="**********" ref={this.pwd} />
                                            </div>
                                        </div>
                                        {
                                            this.state.fail ? <p class="text-center ml-3 text-danger hfail">**Authentification échouée**</p>:<p></p>
                                        }
                                        

                                        <div class="col-lg-12 text-center">
                                            <button type="submit" class="btn btn-block btn-dark" onClick={this.sendData}>Se connecter</button>
                                        </div>
                                        <div class="col-lg-12 text-center mt-5">
                                            Pas de compte? <a href="/signupad" class="text-danger">S'inscrire</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
             </React.Fragment>
        );
    }
}