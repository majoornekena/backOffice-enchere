import React, {  useEffect,useState } from "react";
import AvionTitle from "../avion/AvionTitle";
import { useParams } from "react-router-dom";
import ClasseInfo from "../avion/info/ClasseInfo";
import { Classes } from "../avion/simulation/Classes";
export default function Arrange() {
    const {volid, id} = useParams();
    const [vol,setVol] = useState(null);
    const [ticket,setTicket] = useState([]);
    const [place,setPlace] = useState(null);
    const [activep,setActivep] = useState(false);
    const [activev,setActivev] = useState(false);
    const load = () => {
        fetch('http://localhost:8080/vol/'+volid)
        .then(response => response.json())
        .then(data => {
            console.log('vol',data.data);
            setVol(data.data);
            setActivev(true)
        });

        fetch('http://localhost:8080/ticket/'+id)
        .then(response => response.json())
        .then(data => {
            setTicket(data.data);
        });
        fetch('http://localhost:8080/placeticket/byvol/'+volid)
        .then(response => response.json())
        .then(data => {
            setPlace(data.data);
            setActivep(true);
        });
    }

    useEffect(() => {
        load();
    },[])

    const clickPlace = (rang,siege,meth) => {
        let data = {
            rang : rang,
            siege : siege,
            ticket : {
                id : ticket.id
            },
            type : {
                id : 1
            }
        };
        fetch('http://localhost:8080/places', {
            method: meth,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            console.log('tonga ato');
            load();
        });
    }
    return (
        <React.Fragment>
            <div id="main-wrapper" data-theme="light" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full"
                data-sidebar-position="fixed" data-header-position="fixed" data-boxed-layout="full">
                <div className="page-wrapper">
                    {
                        (activep && activev) ? 
                        (
                            <React.Fragment>
                                <AvionTitle title={<React.Fragment>{vol.nom} {vol.depart.nom}-{vol.arrive.nom}</React.Fragment>} h="2" color="dark">
                                    <h3 className="text-info">{vol.avion.nom} | Arrangement de place</h3>
                                    
                                </AvionTitle>
                                <div className="row ml-3 mr-3">
                                {
                                    vol.prixclasses.map(pcls => (
                                        <React.Fragment>
                                            <ClasseInfo  classe={pcls} avion={vol.avion}></ClasseInfo>
                                        </React.Fragment>
                                    ))
                                }
                                </div>  
                                <h3>Montant avec</h3>
                                <div className="col-12">
                                    <AvionTitle title="Apperçue des places" h="2" color="dark"></AvionTitle>
                                    
                                </div>
                                <div className="col-7 havion ">
                                    {
                                        vol.prixclasses.map(pcls => (
                                            <React.Fragment>
                                                <Classes  key={pcls.id} rang={vol.avion.rang} classe={pcls} places={place} click={clickPlace} ></Classes>
                                            </React.Fragment>
                                        ))
                                    }
                                </div>
                            </React.Fragment>

                        )
                         :
                         <React.Fragment>
                            </React.Fragment>
                        }
                </div>
            </div>
        </React.Fragment>
    );
}