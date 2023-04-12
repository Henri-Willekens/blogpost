import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import "./AddEdit.css";
import axios from 'axios';

const initialState = {
    title: "",
    body: "",
    contact: "",
};

const AddEdit = () => {
    const [state, setState] = useState(initialState);

    const { title, body, contact } = state;

    const navigate = useNavigate();

    const { id } = useParams();

    useEffect(() => {
        if (id) {
            getSingleBlog(id);
        }
    }, [id])

    const getSingleBlog = async (id) => {
        const response = await axios.get(`http://localhost:5000/blog/${id}`);
        if (response.status === 200) {
            setState({ ...response.data[0] })
        }
    };

    const addBlog = async (data) => {
        const response = await axios.post("http://localhost:5000/blog", data);
        if (response.status === 200) {
            console.log("success", response.data)
        }
    }
    const updateBlog = async (data, id) => {
        const response = await axios.put(`http://localhost:5000/blog/${id}`, data);
        if (response.status === 200) {
            console.log("success", response.data)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title || !body || !contact) {
            console.log("input field cant be empty")
        } else {
            if (!id) {
                addBlog(state);
            } else {
                updateBlog(state, id);
            }

            setTimeout(() => navigate("/"), 500);
        }
    };

    const handleInputChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value })
    }
    return (
        <div style={{ marginTop: "100px" }} className="form-container">
            <form style={{ margin: "auto", padding: "15px", maxWidth: "400px", alignContent: "center" }} onSubmit={handleSubmit}>
                <label htmlFor="title"> Title</label>
                <input type="text" id="title" name="title" placeholder='Enter blog title...' onChange={handleInputChange} defaultValue={title} />
                <label htmlFor="body"> Blog</label>
                <input type="text" id="body" name="body" placeholder='Comment...' onChange={handleInputChange} defaultValue={body} />
                <label htmlFor="contact"> Username</label>
                <input type="text" id="contact" name="contact" placeholder='name...' onChange={handleInputChange} defaultValue={contact} />
                <input type="submit" value={id ? " Update" : "Add"} />
            </form>
        </div>
    )
}

export default AddEdit