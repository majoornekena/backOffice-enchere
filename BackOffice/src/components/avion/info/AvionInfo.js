import React, { Component } from "react";
import './AvionInfo.css';
import ClasseInfo from "./ClasseInfo";
import Service from "../../../traitement/Service";

export default class AvionInfo extends Component {
    render() {
        return (
             <React.Fragment>
                <div className="hdescription">
                    <p>Nombre de place : {Service.getTotalPlace(this.props.avion)}</p>
                </div>
                <div className="row ml-3 mr-3">
                {
                    this.props.avion.classes.map(cls => (
                        <React.Fragment key={cls.id}>
                                <ClasseInfo  classe={cls} avion={this.props.avion}></ClasseInfo>
                        </React.Fragment>
                    ))
                }
                </div>
             </React.Fragment>
        );
    }
}