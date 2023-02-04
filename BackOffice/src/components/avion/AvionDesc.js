import React, { Component } from "react";
import AvionTitle from "./AvionTitle";
import AvionInfo from "./info/AvionInfo";
import { Classes } from "./simulation/Classes";
import './AvionDesc.css';
// import { withRouter } from 'react-router-dom';

class AvionDesc extends Component {
    constructor(params) {
        super(params);
        this.state = {
            avion : null
        };
    }

    componentDidMount = () => {
        this.extractId();
    }

    extractId = () => {
        let url = window.location.pathname.split("/");
        fetch('http://localhost:8080/avion/'+url[2])
            .then(response => response.json())
            .then(data => {
                this.setState({
                    avion : data.data
                });
            });
    }
    
    render() {
        return (
             <React.Fragment>
                <div id="main-wrapper" data-theme="light" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full"
                data-sidebar-position="fixed" data-header-position="fixed" data-boxed-layout="full">
                    <div className="page-wrapper">
                        <AvionTitle title="Description d'un avion" h="1"></AvionTitle>
                        {
                            this.state.avion !== null ? (
                                <React.Fragment>
                                    <AvionTitle title={this.state.avion.nom} h="2" color="dark"></AvionTitle>
                            <div className="row ">
                                <div className="col-12">
                                    <AvionInfo avion={this.state.avion} />
                                    <button className="ml-3 btn bg-orange text-white w-30">Associer à un vol</button>
                                </div>
                                <div className="col-12">
                                    <AvionTitle title="Apperçue des places" h="2" color="dark"></AvionTitle>
                                </div>
                                <div className="col-7 havion ">
                                    {
                                        this.state.avion.classes.map(cls => (
                                            <Classes key={cls.id} rang={this.state.avion.rang} classe={cls} places={[]} click={(a1,a2,meth) => {}} />
                                        ))
                                    }
                                </div>
                            </div>
                                </React.Fragment>
                            ) : <React.Fragment></React.Fragment>
                        }
                        
                    </div>
                </div>
             </React.Fragment>
        );
    }
}
export default AvionDesc;