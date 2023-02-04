import React, { Component } from "react";

import './Rcss.css';
import swal from "sweetalert";

export default class ListeRecharge extends Component {
    constructor(params) {
        super(params);
        this.state = {
            lsrecs : []
        }
    }

    componentDidMount = () => {
        this.initlsrec();
    }

    initlsrec = () => {
        fetch('https://limping-quince-production.up.railway.app/recharge')
            .then(response => response.json())
            .then(lsrecs => {
                this.setState({
                    lsrecs : lsrecs.data
                });
            });
    }


    confirm = (idrec) => {
        let token = JSON.parse(sessionStorage.getItem('token')); 
        let data = 
            {
                id : idrec
            }
        ;
        fetch('https://limping-quince-production.up.railway.app/recharge/compte?id='+token.login.id, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(response =>{
            console.log('resp',response);
                if (response.code===undefined || response.code===null) {
                    swal({
                        title : 'status rechargement',
                        text : 'rechargement accepté',
                        icon : 'success',
                        confirmButtonText : 'OK'
                    }).then(() => {this.initlsrec()});
                }else{
                    swal({
                        title : 'status rechargement',
                        text : 'problem rechargement',
                        icon : 'error',
                        confirmButtonText : 'OK'
                    }).then(() => {this.initlsrec()});
                }
            }
        )
        .catch((err) =>{
            swal({
                title : 'Erreur interne',
                text : 'problem server',
                icon : 'error',
                confirmButtonText : 'OK'
            }).then(() => {this.initlsrec()});
        });
    }

    render() {
        return (
            <React.Fragment>
                <div id="main-wrapper" data-theme="light" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full" data-sidebar-position="fixed" data-header-position="fixed" data-boxed-layout="full">
                    <div className="page-wrapper">
                        <div className="container-fluid">
                            <h2 className="text-dark">liste demande recharge</h2>
                            <div className="row">
                                <div className="col-12">
                                    <div className="row">
                                            <table className="table">
                                                <tr>
                                                    <th>Demandant</th>
                                                    <th>Email</th>
                                                    <th>Conctact</th>
                                                    <th>Montant</th>
                                                </tr>
                                                    {
                                                        this.state.lsrecs.map(rec => (
                                                            <tr>
                                                                <td>{rec.login.nom} {rec.login.prenom}</td>
                                                                <td>{rec.login.email}</td>
                                                                <td>{rec.login.contact}</td>
                                                                <td>{rec.montant}</td>
                                                                <button className="btn btn-info btn-block" onClick={() => {this.confirm(rec.id)} }>Confirmer</button>
                                                            </tr>
                                                        ))
                                                    }
                                        </table>
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