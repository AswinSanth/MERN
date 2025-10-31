import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './profile.css';
import axios from 'axios';

const Profile = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: {
      fullname: '',
      phone: '',
      street: '',
      city: '',
      state: '',
      pincode: '',
    },
  });

  // Fetch user data
  const fetchUser = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/user/${userId}`);
      setFormData(response.data);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false); // ✅ stop loading after fetch
    }
  };

  useEffect(() => {
    fetchUser();
  }, [userId]);

  // Handle general input change
  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle nested address input
  const handleAddressChange = e => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      address: {
        ...prevData.address,
        [name]: value,
      },
    }));
  };

  // Submit form
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:8000/user/update/${userId}`, formData);
      alert('Profile updated successfully!');
      navigate('/Home');
    } catch (error) {
      console.error('Error updating user:', error);
      alert('Failed to update profile');
    }
  };

  // ✅ Move render logic outside handleSubmit
  if (isLoading) {
    return <div>Loading profile...</div>;
  }

  return (
    <div className="profile-container">
      <h2>Edit Your Profile</h2>
      <form onSubmit={handleSubmit} className="profile-form">
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <fieldset className="address-fieldset">
          <legend>Address</legend>

          <div className="form-group">
            <label htmlFor="fullname">Full Name (for shipping)</label>
            <input
              type="text"
              id="fullname"
              name="fullname"
              value={formData.address.fullname}
              onChange={handleAddressChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.address.phone}
              onChange={handleAddressChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="street">Street Address</label>
            <input
              type="text"
              id="street"
              name="street"
              value={formData.address.street}
              onChange={handleAddressChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.address.city}
              onChange={handleAddressChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="state">State</label>
            <input
              type="text"
              id="state"
              name="state"
              value={formData.address.state}
              onChange={handleAddressChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="pincode">Pincode</label>
            <input
              type="text"
              id="pincode"
              name="pincode"
              value={formData.address.pincode}
              onChange={handleAddressChange}
            />
          </div>
        </fieldset>

        <button type="submit" className="save-btn">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default Profile;
