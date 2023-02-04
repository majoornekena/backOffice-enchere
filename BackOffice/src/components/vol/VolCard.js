import React, { Component } from "react";
import Service from "../../traitement/Service";
import './VolGlobal.css'

export default class VolCard extends Component {
    render() {
        return (
             <React.Fragment>
                <div className="col-6">
                    <div className="card">
                        <img className="card-img-top img-fluid" src="/hassets/assets/images/avion.jpg"
                            alt="avion" />
                        <div className="card-body">
                            <h3 className="card-title">{this.props.vol.nom} | {this.props.vol.avion.nom}</h3>
                            <h4 className="card-title text-info">{this.props.vol.depart.nom}-{this.props.vol.arrive.nom}</h4>
                            <h5 className="card-title text-danger">Promotion : {Service.formatDate( this.props.vol.pdebut)} à {Service.formatDate(this.props.vol.pfin)}</h5>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Prix</th>
                                        <th>Places</th>
                                        <th>Libres</th>
                                        <th>Promo</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.props.vol.prixclasses.map(pcls => (
                                            <tr className={"bg"+pcls.type.value+" text-white"}>
                                                <td>
                                                    {Service.format(pcls.prix)}
                                                </td>
                                                <td>{Service.getPLaceNumber(this.props.vol.avion,pcls)}</td>
                                                <td>{pcls.libre}</td>
                                                <td>{pcls.promotion}%</td>
                                            </tr>
                                        ))
                                    }
                                    
                                </tbody>
                            </table>
                            <a href={"/ticket_purchase/"+this.props.vol.id} class="btn btn-orange hbuy btn-block text-white">Acheter ticket <i className="fas fa-cart-plus" /></a>
                        </div>
                    </div>
                </div>
             </React.Fragment>
        );
    }
}