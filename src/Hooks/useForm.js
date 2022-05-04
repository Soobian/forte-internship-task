import { useState } from 'react';

const useForm = () => {
    const [values, setValues] = useState({
        id: null,
        name: '',
        email: '',
        internshipStart: '',
        internshipEnd: '',
    });

    const [errors, setErrors] = useState({});

    const handleChange = e => {
        console.log(e.target)
        const {name, value} = e.target;
        setValues({
            ...values,
            [name]: value,
        });

    }

    const handleDateChange = (name, value) => {
        setValues({
            ...values,
            [name]: value != null ? value.toISOString().split('T')[0] : '',
        })
    }

    const validate = (values) => {
        let errors = {};
        if (!values.name.trim()) {
            errors.name = "This field is required"
        }

        if (!values.email.trim()) {
            errors.email = "This field is required"
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
            errors.email = "This email is not correct"
        }

        if (!values.internshipStart) {
            errors.internshipStart = "This field is required"
        }
        
        if (!values.internshipEnd) {
            errors.internshipEnd = "This field is required"
        } else if (values.internshipStart > values.internshipEnd) {
            errors.internshipEnd = "This date is not correct"
        }

        setErrors(errors);
        if (Object.entries(errors).length === 0) {
            updateIntern(values);
        } 
    }

    const updateIntern = () => {
        values.internshipStart = values.internshipStart.split('T')[0] + "T00:00+00Z";
        values.internshipEnd = values.internshipEnd.split('T')[0] + "T00:00+00Z";
        const data = JSON.stringify(values);
        fetch(`http://localhost:3001/interns/${values.id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: data,
        })
        .then(result => {
            console.log('Success:', result);
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        console.log(values)
        validate(values);
    }

    return { handleChange, handleDateChange, values, handleSubmit, errors, setValues };
};

export default useForm;