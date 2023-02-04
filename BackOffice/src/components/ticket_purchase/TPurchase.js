import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Service from "../../traitement/Service";
import AvionTitle from "../avion/AvionTitle";

export default function TPurchase() {
    const [vol,setVol] = useState(null);
    const [type,setType] = useState([]);
    const {id} = useParams();
    const classeInp = useRef();
    const eff = useRef();
    const rdate = useRef(); 
    useEffect(()=> {
        fetch('http://localhost:8080/vol/'+id)
            .then(response => response.json())
            .then(data => {
                setVol(data.data);
            });
        fetch('http://localhost:8080/prixclasse/avion', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id : id
            })
        })
            .then(response => response.json())
            .then(data => {
                setType(data.data);
            });
    },[]);

    const sendData = () => {
        let token = JSON.parse(sessionStorage.getItem('token')); 
        let data = {
            vol : {
                id : id
            },
            client : {
                id : token.login.id
            },
            prixclasseid : classeInp.current.value,
            effectif : eff.current.value,
            date : rdate.current.value
        };
        fetch('http://localhost:8080/ticket', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            window.location.replace('/arrage/'+id+'/'+data.data.id);
        });
    }

    return (
        <React.Fragment>
            <div id="main-wrapper" data-theme="light" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full" data-sidebar-position="fixed" data-header-position="fixed" data-boxed-layout="full">
                <div className="page-wrapper">
                    {
                        vol !== null ?
                        <React.Fragment>
                            <AvionTitle title="Achat Billet" color="dark"> 
                                <h3 className="text-info ">{vol.nom} | {vol.avion.nom} | {vol.depart.nom}-{vol.arrive.nom}</h3>
                            </AvionTitle>
                            <div className="row">
                                <div className="col-12">
                                    <h5 className="card-title text-danger ml-3">Promotion : {Service.formatDate( vol.pdebut)} à {Service.formatDate(vol.pfin)}</h5>
                                </div>
                                <div className="col-6">
                                    <table className="table mt-3 ml-3 mr-3">
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
                                                vol.prixclasses.map(pcls => (
                                                    <tr className={"bg"+pcls.type.value+" text-white"}>
                                                        <td>
                                                            {Service.format(pcls.prix)}
                                                        </td>
                                                        <td>{Service.getPLaceNumber(vol.avion,pcls)}</td>
                                                        <td>{pcls.libre}</td>
                                                        <td>{pcls.promotion}%</td>
                                                    </tr>
                                                ))
                                            }
                                            
                                        </tbody>
                                    </table>
                                </div>
                                <div className="col-12"></div>
                                <div className="col-6">
                                <div class="card ml-3">
                                    <div class="card-body">
                                        <h4 class="card-title ">Classe</h4>
                                        <div class="mt-3">
                                            <div class="form-group">
                                                <select className="custom-select" ref={classeInp}>
                                                    {
                                                        type.map(t => (
                                                            <option value={t.id}>{t.classe.type.description}</option>
                                                        ))
                                                    }
                                                </select>
                                                <small id="name" class="form-text text-info">**La place et le prix en dependent**</small>
                                            </div>
                                        </div>
                                        <h4 class="card-title ">Effectif</h4>
                                        <div class="mt-3">
                                            <div class="form-group">
                                                <input type="number" class="form-control" id="nametext" aria-describedby="name"
                                                    placeholder="nombre de place" ref={eff} />
                                                <small id="name" class="form-text text-info">**N'oubliez pas d'allouer toutes les places lors de l'arrangement**</small>
                                            </div>
                                        </div>
                                        <h4 class="card-title ">Date</h4>
                                        <div class="mt-3">
                                            <div class="form-group">
                                                <input type="date" class="form-control" id="nametext" aria-describedby="name"  ref={rdate} />
                                                <small id="name" class="form-text text-info">**Juste pour le test de la promotion**</small>
                                            </div>
                                        </div>
                                        <button className="btn btn-info btn-block" onClick={sendData}>Suivant</button>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </React.Fragment>
                         : <React.Fragment></React.Fragment>
                    }
                </div>
            </div>
        </React.Fragment>
    );
}