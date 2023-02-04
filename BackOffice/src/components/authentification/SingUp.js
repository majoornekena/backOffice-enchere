import React, { Component } from "react";
import Service from "../../traitement/Service";
import './Login.css';
export default class SingUp extends Component {
    constructor(params) {
        super(params);
        this.nom = React.createRef(null);
        this.prenom = React.createRef(null);
        this.email = React.createRef(null);
        this.password = React.createRef(null);
    }

    onClick = () => {
        let data = {
            nom : this.nom.current.value,
            prenom : this.prenom.current.value,
            email : this.email.current.value,
            pwd : this.password.current.value
        }
        Service.sendData('https://limping-quince-production.up.railway.app/login/incription/admin',data,
            (data) => {
                if (data.code === undefined || data.code === null) {
                    window.location.replace('/ad');
                }
            })
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
                                <h2 class="mt-3 text-center">Inscription</h2>
                                <div class="mt-4">
                                    <div class="row">
                                        <div class="col-lg-12">
                                            <div class="form-group">
                                                <label class="text-dark" for="uname">Nom</label>
                                                <input class="form-control" id="uname" type="text"
                                                    placeholder="Jean" ref={this.nom} />
                                            </div>
                                        </div>
                                        <div class="col-lg-12">
                                            <div class="form-group">
                                                <label class="text-dark" for="uname">Prénom</label>
                                                <input class="form-control" id="uname" type="text"
                                                    placeholder="Dupont" ref={this.prenom} />
                                            </div>
                                        </div>
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
                                                    placeholder="**********" ref={this.password} />
                                            </div>
                                        </div>
                                        <div class="col-lg-12 text-center">
                                            <button class="btn btn-block btn-dark" onClick={this.onClick}>S'inscrire</button>
                                        </div>
                                        <div class="col-lg-12 text-center mt-5">
                                            Déjà inscrit? <a href="/ad" class="text-danger">Se connecter</a>
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