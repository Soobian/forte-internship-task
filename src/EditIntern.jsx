import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { NavLink } from 'react-router-dom';
import DatePicker from 'react-datepicker';

import { ReactComponent as ArrowLeft } from './assets/icons/arrow-left.svg';
import { ReactComponent as AlertCircle } from './assets/icons/alert-circle.svg';
import { ReactComponent as Calendar } from './assets/icons/calendar.svg';

import useForm from './Hooks/useForm';
import './EditIntern.css'


const CustomInput = (props) => {
    return (
        <div className={`edit-intern__date-picker-block ${props.error !== undefined ? 'edit-intern__input-field--error' : ''}`}>
            <input type="text" className={'edit-intern__date-picker-input'} value={props.value} placeholder="DD.MM.YYYY"/>
            <AlertCircle style={props.error !== undefined ? {}: {visibility: 'hidden'}} className="edit-intern__input-alert-date"/>
            <div className={"edit-intern__date-picker-icon-container"} onClick={props.onClick}>
                <Calendar className="edit-intern__date-picker-icon"/>
            </div>
        </div>
    );
}

const EditIntern = () => {
    const { id } = useParams();
    const { handleChange, handleDateChange, values, handleSubmit, errors, setValues } = useForm();

    useEffect(() => {
        //TODO: get intern from REST api http://localhost:3001/interns/:id
        const fetchInternById = async () => {
            const response = await fetch(`http://localhost:3001/interns/${id}`);
            const intern = await response.json();
            setValues({
                id: intern.id,
                name: intern.name,
                email: intern.email,
                internshipStart: intern.internshipStart,
                internshipEnd: intern.internshipEnd,
            })
            if (intern !== undefined) {
                console.log(intern.internshipStart.split('T'))
            }
        }
        fetchInternById();
        console.log(`I want to get intern with id: ${id}!`)
    }, [id]);

    const handleChangeRaw = (name, value) => {
        handleDateChange(name, value);
    };

    return (
        <div className="edit-intern__container">
            <div className="edit-intern__navlink">
                <NavLink to="/" className="default-navlink button-secondary">
                    <p>Back to list</p>
                    <ArrowLeft className="button-secondary__svg" />
                </NavLink>
            </div>
            <div className="edit-intern__content">
                <p className="edit-intern__title">Edit</p>
                <form className="edit-intern__form" onSubmit={handleSubmit}>
                    <div className="edit-intern__input-block">
                        <label className="edit-intern__input-label">Full name *</label>
                        <div style={{display: 'flex', flexDirection: 'row'}}>
                            <input 
                                className={`edit-intern__input-field ${errors.name !== undefined ? 'edit-intern__input-field--error' : ''}`} 
                                type="text" 
                                name="name" 
                                value={values.name !== undefined ? values.name : ""} 
                                onChange={handleChange}
                            />
                            <AlertCircle style={errors.name !== undefined ? {}: {visibility: 'hidden'}} className="edit-intern__input-alert"/>
                        </div>
                        <span className={`${errors.name !== undefined ? 'edit-intern__span--active' : ''}`}>{errors.name}</span>  
                    </div>
                    <div className="edit-intern__input-block">
                        <label className="edit-intern__input-label">Email address *</label>
                        <div style={{display: 'flex', flexDirection: 'row'}}>
                            <input 
                                className={`edit-intern__input-field ${errors.email !== undefined ? 'edit-intern__input-field--error' : ''}`} 
                                type="text" 
                                name="email" 
                                value={values.email !== undefined ? values.email : ""} 
                                onChange={handleChange}
                            />
                            <AlertCircle style={errors.email !== undefined ? {}: {visibility: 'hidden'}} className="edit-intern__input-alert"/>
                        </div>
                        <span className={`${errors.email !== undefined ? 'edit-intern__span--active' : ''}`}>{errors.email}</span>  
                    </div>
                    <div className="edit-intern__date-input-container">
                        <div className={`edit-intern__input-block ${errors.internshipStart !== undefined ? 'edit-intern__input-block--error' : ''}`}>
                            <label className="edit-intern__input-label">Internship Start *</label>
                            <DatePicker
                                customInput={(<CustomInput onChange={handleChange} error={errors.internshipStart}/>)}
                                selected={values.internshipStart !== "" ? new Date(values.internshipStart.split('T')[0]) : undefined}
                                dateFormat="dd.MM.yyyy"
                                onChange={(date) => handleDateChange("internshipStart", date)}
                            />
                            <span className={`${errors.internshipStart !== undefined ? 'edit-intern__span--active' : ''}`}>{errors.internshipStart}</span> 
                        </div>
                        <div className="edit-intern__input-block"> 
                            <label className="edit-intern__input-label">Internship End *</label>
                            <DatePicker
                                customInput={(<CustomInput error={errors.internshipEnd}/>)}
                                selected={values.internshipEnd !== "" ? new Date(values.internshipEnd.split('T')[0]) : undefined}
                                dateFormat="dd.MM.yyyy"
                                onChangeRaw={(event) => setValues({...values, internshipEnd: event.target.value})}
                                onChange={(date) => handleDateChange("internshipEnd", date)}
                            />
                            <span className={`${errors.internshipEnd !== undefined ? 'edit-intern__span--active' : ''}`}>{errors.internshipEnd}</span>  
                        </div>
                    </div>
                    <input className="button-primary" type="submit" value="Submit" onSubmit={handleSubmit}/>
                </form>
            </div>
        </div>
    );
};

export default EditIntern;