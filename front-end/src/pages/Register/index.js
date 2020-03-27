import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';
import './styles.css'

import logoImg from '../../assets/logo.svg';


export default function Register() {
    const[name, setName] = useState('');
    const[email, setEmail] = useState('');
    const[whatsapp, setwhatsapp] = useState('');
    const[city, setcity] = useState('');
    const[uf, setuf] = useState('');

    const history = useHistory();
    
    async function handleRegister(e) {
        e.preventDefault();

        const data = {
            name,
            email,
            whatsapp,
            city,
            uf
        };
        try {
            const result = await api.post('ongs', data);

            alert(`Seu ID de acesso: ${result.data.id}`);

            history.push('/');
        } catch (err) {
            alert('Erro no cadastro');
        }
    }

    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero"/>
                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entra na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>

                    <Link to="/" className="back-link">
                        <FiArrowLeft size={16} color="#E02041"/>
                        Voltar para a página principal
                    </Link>
                </section>

                <form onSubmit={handleRegister}>
                    <input 
                        placeholder="Nome da ONG"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        ></input>
                    <input type="email" 
                        placeholder="E-mail"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        ></input>
                    <input 
                        placeholder="whatsapp"
                        value={whatsapp}
                        onChange={e => setwhatsapp(e.target.value)}
                        ></input> 

                    <div className="input-group">
                        <input 
                            placeholder="city"
                            value={city}
                            onChange={e => setcity(e.target.value)}
                            ></input>
                        <input 
                            placeholder="uf" style={{ width: 80 }}
                            value={uf}
                            onChange={e => setuf(e.target.value)}
                        ></input>
                    </div>

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}