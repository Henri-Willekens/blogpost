import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import "./Home.css";
import axios from "axios";

const Home = () => {
    const [data, setData] = useState([]);

    useEffect(()=> {
        getBlogs();
    }, [])

    const getBlogs = async () => {
        const response = await axios.get("http://localhost:5000/blogs");
        if(response.status === 200) {
            setData(response.data);
        }
    };

    const onDeleteBlog = async (id) => {
        if(window.confirm("are you sure you want to delete this blog?")){
            const response = await axios.delete(`http://localhost:5000/blog/${id}`);
            if(response.status === 200){
                console.log("removed succeed", response.data);
                getBlogs()
            }
        }
    }

    return (
        <div style={{marginTop: "150px"}} >
            <table className="styled-table">
                <thead>
                    <tr>
                        <th style={{textAlign: "center"}}>No.</th>
                        <th style={{textAlign: "center"}}>Title</th>
                        
                        <th style={{textAlign: "center"}}>Poster</th>
                        <th style={{textAlign: "center"}}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data && data.map((item, index) =>{
                        return (
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{item.title}</td>
                                
                                <td>{item.contact}</td>
                                <td>
                                    <Link to={`/update/${item.id}`}>
                                    <button>Edit</button>
                                    </Link>
                                    <button onClick={() => onDeleteBlog(item.id)}>Delete</button>
                                    <Link to={`/view/${item.id}`}>
                                    <button>View</button>
                                    </Link>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
                </table>
        </div>
    )
}

export default Home