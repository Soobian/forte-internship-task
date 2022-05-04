import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ReactComponent as Edit } from './assets/icons/edit.svg';

import './InternList.css'

const InternList = () => {

    const [interns, setInterns] = useState([]);

    useEffect(() => {
        const fetchInterns = async () => {
            const response = await fetch('http://localhost:3001/interns');
            const interns = await response.json();
            setInterns(interns);
        }
        fetchInterns();
    }, []);

    return (
        <div className="interns-list">
            <div className="interns-list__content">
                <p className="interns-list__title">Participants</p>
                <div className="interns-list__list">
                    {interns.map(u => (
                        <div className={`interns-list__block ${u.id % 2 ? 'interns-list__block--even' : 'interns-list__block--odd'}`} key={u.id}>
                            <p>{u.name}</p>
                            <NavLink to={`/interns/${u.id}`} className="interns-list__navlink">
                                <div className="interns-list__navlink-container">
                                    <Edit />
                                    <p style={{textDecoration: 'none'}}>Edit</p>
                                </div>
                            </NavLink>
                        </div>
                    ))} 
                </div>
            </div>
        </div>
    );
};

export default InternList;