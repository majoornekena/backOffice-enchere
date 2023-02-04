import React, { Component } from "react";
import AvionTitle from "../avion/AvionTitle";
import VolCard from "./VolCard";
import './VolGlobal.css';

export default class VolListe extends Component {
    constructor(params) {
        super(params);
        this.state = {
            vols : [
            ]
        }
    }

    componentDidMount = () => {
        this.initVols();
    }

    initVols = () => {
        fetch('http://localhost:8080/vol')
            .then(response => response.json())
            .then(vols => {
                this.setState({
                    vols : vols.data
                });
            });
    }

    render() {
        return (
            <React.Fragment>
                <div id="main-wrapper" data-theme="light" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full" data-sidebar-position="fixed" data-header-position="fixed" data-boxed-layout="full">
                    <div className="page-wrapper">
                        <div className="container-fluid">
                            <AvionTitle title={
                                <React.Fragment>Liste des vols disponibles 
                                    {/* <a href="/avion"> 
                                        <button className="btn btn-success float-right ml-4 "> Voir les avions</button>
                                    </a>  */}
                                </React.Fragment>} />
                            <div className="row">
                                <div className="col-12">
                                    <div className="row">
                                        {
                                            this.state.vols.map(vol => (
                                                <VolCard key={vol.id} vol={vol} />
                                            ))
                                        }
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