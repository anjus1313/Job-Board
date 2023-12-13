import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ApplicantHome.css';
import {useNavigate} from "react-router-dom";

export const ApplicantHome = () => {
    const applicant = localStorage.getItem("username")
    const [formData, setFormData] = useState({
        username: applicant,
        first_name: '',
        last_name: '',
        gender: 'male',
        dob: '',
        email: '',
        phone_number: '',
        address_line1: '',
        address_line2: '',
        city: '',
        state: '',
        country: '',
        resume: null,
    });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState('Profile');
    const handleTabClick = (tab) => {
      setActiveTab(tab);
      if (tab === 'Jobs List'){ navigate("/")}
      if (tab === 'Applications'){ navigate("/applicant-applications")}

    };

    const getSymbolForTab = (tab) => {
      switch (tab) {
          case 'Profile':
              return '👤';
          case 'Jobs List':
              return '💼';
          case 'Applications':
              return '📄';
          default:
               return '';
        }
    };

    useEffect(() => {
        // Function to fetch data from the backend
        const fetchData = async () => {
            try {
                debugger;
                const resp = await axios.get(
                    'http://localhost:8000/applicant/',
                    {
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        params: {
                            'username': applicant
                        }
                    }
                );

                // Append each field individually
                Object.keys(formData).forEach((key) => {
                    setFormData((prevFormData) => {
                        return { ...prevFormData, [key]: resp.data[0][key] };
                    });
                });



            } catch (error) {
                alert('Oops! Something went wrong. Please try again later.');

            }
        };

        // Call the fetchData function
        fetchData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value, type } = e.target;

        if (type === 'file') {
            setFormData({ ...formData, [name]: e.target.files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log("firstName:",formData.first_name);
            console.log("gender:",formData.gender);
            console.log("resume:",formData.resume);
            // Rest of your code for sending the POST request
            const formDataToSend = new FormData();

            // Append each field individually
            Object.keys(formData).forEach((key) => {
                formDataToSend.append(key, formData[key]);
            });
            const { data } = await axios.post(
                'http://localhost:8000/applicant/',
                formData,
                {
                    headers: {'Content-Type': 'application/json'}
                }
            );
        }
        catch (error) {
            console.log(error);
            alert('Oops! Something went wrong. Please check your input parameters and try again :)');
            return;
        }

    };

    return (
    <div>
      <div className="tab-list">
        {['Profile', 'Jobs List', 'Applications'].map((tab) => (
            <div
                key={tab}
                className={`tab-item ${tab === activeTab ? 'active' : ''}`}
                onClick={() => handleTabClick(tab)}
            >
                <span className="tab-symbol">{getSymbolForTab(tab)}</span>
              {tab}
            </div>
        ))}
      </div>
        <div className="profile-container">
            <h1>User Profile</h1>
            <form onSubmit={handleSubmit}>
                <div className="row">
                    {/* Form Group (first name) */}
                    <div className="col-2">
                        <label htmlFor="firstName">First Name:</label>
                        <input
                            className="form-control"
                            id="firstName"
                            type="text"
                            name="first_name"
                            value={formData.first_name}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    {/* Form Group (last name) */}
                    <div className="col-2">
                        <label htmlFor="lastName">Last Name:</label>
                        <input
                            className="form-control"
                            id="lastName"
                            type="text"
                            name="last_name"
                            value={formData.last_name}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-2">
                        <label htmlFor="gender">Gender:</label>
                        <select
                            className="form-control"
                            id="gender"
                            name="gender"
                            value={formData.gender}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div className="col-2">
                        <label htmlFor="dob">Date of Birth:</label>
                        <input
                            className="form-control"
                            type="date"
                            id="dob"
                            name="dob"
                            value={formData.dob}
                            onChange={handleInputChange}
                            required />
                    </div>
                </div>

                <div className="row">
                    <div className="col-2">
                        <label htmlFor="email">Email:</label>
                        <input className="form-control" type="email" id="email" name="email"
                               value={formData.email}
                               onChange={handleInputChange}
                               required />
                    </div>

                    <div className="col-2">
                        <label htmlFor="phone">Phone Number:</label>
                        <input className="form-control" type="tel" id="phone" name="phone_number" pattern="[0-9]{3}[0-9]{3}[0-9]{4}"
                               value={formData.phone_number}
                               onChange={handleInputChange}
                               required />
                    </div>

                </div>

                <div className="row">
                    <div className="col-2">
                        <label htmlFor="address_line1">Address Line 1:</label>
                        <input className="form-control" type="text" id="address_line1" name="address_line1"
                               value={formData.address_line1}
                               onChange={handleInputChange}
                               required></input>
                    </div>
                    <div className="col-2">
                        <label htmlFor="address_line2">Address Line 2:</label>
                        <input className="form-control" type="text" id="address_line2" name="address_line2"
                               value={formData.address_line2}
                               onChange={handleInputChange}
                        ></input>
                    </div>
                </div>
                <div className="row">
                    <div className="col-3">
                        <label htmlFor="city">City:</label>
                        <input className="form-control" type="text" id="city" name="city"
                               value={formData.city}
                               onChange={handleInputChange}
                               required></input>
                    </div>
                    <div className="col-3">
                        <label htmlFor="state">State:</label>
                        <input className="form-control" type="text" id="state" name="state"
                               value={formData.state}
                               onChange={handleInputChange}
                               required
                        ></input>
                    </div>
                    <div className="col-3">
                        <label htmlFor="country">Country:</label>
                        <input className="form-control" type="text" id="country" name="country"
                               value={formData.country}
                               onChange={handleInputChange}
                               required
                        ></input>
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="file">Upload a File:</label>
                    <input type="file" id="file" name="resume" accept=".pdf,.doc,.docx"
                           onChange={handleInputChange}
                           required/>
                </div>

                <div className="form-actions">
                    <button type="submit">Save Profile</button>
                </div>

            </form>

        </div>
    </div>

    );
};

export default ApplicantHome;
