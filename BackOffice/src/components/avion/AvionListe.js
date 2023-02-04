import React, { Component } from "react";
import Service from "../../traitement/Service";
import AvionTitle from "./AvionTitle";

export default class AvionListe extends Component {
    constructor(params) {
        super(params);
        this.state = {
            types : [
            ],
            avions : [
            ]
        };
    }

    componentDidMount = () => {
        this.initType();
        this.initAvion();
    }

    initAvion = () => {
        fetch('http://localhost:8080/avion')
            .then((response) => response.json())
            .then((avion) => {
            this.setState({
                avions : avion.data
            });
        })
    }

    initType = () => {
        fetch('http://localhost:8080/type')
            .then((response) => response.json())
            .then((type) => {
                this.setState({
                    types : type.data
                });
            })
    }

    render() {
        return (
             <React.Fragment>
                <div id="main-wrapper" data-theme="light" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full" data-sidebar-position="fixed" data-header-position="fixed" data-boxed-layout="full">
                    <div className="page-wrapper">
                        <AvionTitle title = {<p>Liste des avions <i className="fas fa-plane ml-3 text-orange" /></p>} h="1" color="dark" />
                        <div className="row">
                            <div className="col-11">
                                <table className="table ml-3 ">
                                    <thead className="bg-info text-white">
                                        <tr>
                                            <th>Avion</th>
                                            <th>Places</th>
                                            {
                                                this.state.types.map(type => (
                                                    <th>{type.description}</th>
                                                ))
                                            }
                                            <th></th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody className="border border-info">
                                            {
                                                this.state.avions.map(av => (
                                                    <React.Fragment>
                                                        <tr>
                                                            <td>{av.nom}</td>
                                                            <td>{Service.getTotalPlace(av)}</td>
                                                            {
                                                                this.state.types.map(type => (
                                                                    <th>{Service.getPLaceNbByType(av,type)}</th>
                                                                ))
                                                            }
                                                            <td>
                                                                <a href={"/avion/"+av.id}>
                                                                    <button className="btn btn-outline-info">Voir details</button>
                                                                </a>
                                                            </td>
                                                            <td>
                                                                <a href={"/vol/"+av.id}>
                                                                    <button className="btn btn-orange text-white">Associer vol</button>
                                                                </a>
                                                            </td>
                                                        </tr>
                                                    </React.Fragment>
                                                ))
                                            }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}