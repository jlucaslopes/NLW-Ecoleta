import React, {useEffect, useState} from 'react';
import { Link, BrowserRouter } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi'
import { Map, TileLayer, Marker } from 'react-leaflet'
import api from '../../services/api'
import axios from 'axios'

import './CreatePoint.css'

import logo from '../../assets/logo.svg'

interface Item {
    id:number; 
    titulo: string;
    image_url: string;
}

interface IBGEUFResponse {
    sigla:string;
}

const CreatePoint = () => {

    const [items, setItems] = useState<Item[]>([]);
    const [UFs, setUF] = useState<string[]>([]);

    useEffect(() => {
    api.get('items').then(response => {
        
        setItems(response.data)
    })
    },
    []);

    useEffect(() => {
        axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(response => {
        const ufInitials = response.data.map(uf => uf.sigla);
        setUF(ufInitials);     
    })
},
[]);

useEffect(() => {
    axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(response => {
    const ufInitials = response.data.map(uf => uf.sigla);
    setUF(ufInitials);     
})
},
[]);
    
    return (<div id="page-create-point">
            <header>
                <img src={logo} alt="Ecoleta" />
                <BrowserRouter>
                    <Link to="/">
                        <FiArrowLeft />
            Voltar para home
            </Link>
                </BrowserRouter>
            </header>

            <form action="">
                <h1> Cadastro do <br /> ponto de coleta</h1>

                <fieldset>
                    <legend>
                        <h2>Dados</h2>
                    </legend>
                    <div className="field">
                        <label htmlFor="name">Nome da entidade</label>
                        <input type="text"
                            name="name"
                            id="name" />
                    </div>

                    <div className="field">
                        <label htmlFor="email">E-mail</label>
                        <input type="text"
                            name="email"
                            id="email" />
                    </div>

                    <div className="field">
                        <label htmlFor="whatsapp">WhatsApp</label>
                        <input type="text"
                            name="whatsapp"
                            id="whatsapp" />
                    </div>
                </fieldset>

                <fieldset>
                    <legend>
                        <h2>Endereço</h2>
                        <span>Selecione o endereço no mapa</span>
                    </legend>

                    <Map center={[-23.5401548,-46.8008626]} zoom={15}>
                        <TileLayer
                            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={[-23.5401548,-46.8008626]}/>
                    </Map>

                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="uf">Estado (UF)</label>
                            <select name="uf" id="uf">
                                <option value="0">Selecione uma UF</option>
                                {UFs.map( uf => (
                                    <option key = {uf} value={uf}>{uf} </option>
                                ))}

                            </select>
                        </div>

                        <div className="field">
                            <label htmlFor="city">Cidade</label>
                            <select name="city" id="city">
                                <option value="0">Selecione uma Cidade</option>
                            </select>
                        </div>
                    </div>

                </fieldset>

                <fieldset>
                    <legend>
                        <h2>Ítens de coleta</h2>
                        <span>Selecione um ou mais itens abaixo</span>
                    </legend>

                    <ul className="items-grid">
                        {items.map(item => (
                            <li key = {item.id}>
                              <img src={item.image_url} alt={item.titulo} />
                              <span>{item.titulo}</span>
                            </li>
                        ))}
                      
                    </ul>
                </fieldset>

                <button type="submit" >Criar ponto de coleta</button>
            </form>
        </div>
    );
}

export default CreatePoint;
