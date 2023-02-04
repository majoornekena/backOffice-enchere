import React, { Component } from "react";
import Service from "../../../traitement/Service";
import '../simulation/Classes.css';
import './AvionInfo.css';
import './ClasseInfo.css';

export default class ClasseInfo extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="col-4">
                    <div className="card ">
                        <div className="card-body">
                            <div className="align-items-center">
                                <div className=" align-items-center">
                                    <div className="d-inline-flex align-items-center">
                                        <h2 className="text-dark mb-1 font-weight-medium"> {this.props.classe.type.description}</h2>
                                        <br/>
                                        <div className={"ml-3 hflag cls"+this.props.classe.type.value}></div>
                                    </div>
                                    <br/>
                                    <div className="d-inline-flex align-items-center">
                                        <h6 className="text-muted font-weight-normal mb-0 w-100 text-truncate">{Service.getPLaceNumber(this.props.avion,this.props.classe)} places</h6>
                                    </div>
                                    <br/>
                                    {
                                        this.props.classe.prix !== undefined ?
                                        <div className="d-inline-flex align-items-center">
                                            <h6 className="text-success font-weight-normal mb-0 w-100 text-truncate">{Service.format(this.props.classe.prix)}</h6>
                                        </div> : <React.Fragment></React.Fragment>
                                    }
                                    
                                </div>
                            </div>
                        </div> 
                        
                    </div> 
                </div>
            </React.Fragment>
        );
    }
}