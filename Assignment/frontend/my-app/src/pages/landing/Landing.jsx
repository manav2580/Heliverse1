import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CardList.css';

const FilterOptions = ({ onFilterChange }) => {
  const handleInputChange = (filterType, event) => {
    const value = event.target.value;
    onFilterChange(filterType, value);
  };

  return (
    <div className="filter-options">
      <label>
        Gender:
        <input
          type="text"
          onChange={(e) => handleInputChange('gender', e)}
        />
      </label>
      <label>
        Domain:
        <input
          type="text"
          onChange={(e) => handleInputChange('domain', e)}
        />
      </label>
      <label>
        Available:
        <input
          type="text"
          onChange={(e) => handleInputChange('available', e)}
        />
      </label>
    </div>
  );
};

const Landing = () => {
  const [users, setUsers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  useEffect(() => {
    fetchData();
    fetchTeams();
  }, []); // Empty dependency array to run only once on mount

  const fetchData = async (search = '') => {
    try {
      const response = await axios.get(`http://localhost:4000/api/v1/getUserDetails?search=${search}`);
      setUsers(response.data.users);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchTeams = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/v1/getAllTeams');
      console.log(response.data);
      setTeams(response.data.teams);
    } catch (error) {
      console.error('Error fetching teams:', error);
    }
  };

  const handleSearchChange = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    fetchData(term);
  };

  const handleAddToTeam = async (selectedTeam, userId) => {
    try {
      const response = await axios.post('http://localhost:4000/api/v1/addUsersToTeam', {
        "name":selectedTeam,
        "id1":userId,
      });
  
      console.log(response.data); // Assuming the response contains relevant information
  
      // Implement any logic based on the response, if needed
    } catch (error) {
      console.error('Error adding user to team:', error);
      // Implement error handling logic
    }
  };
  

  const UserCard = ({ user, teams, onAddToTeam }) => {
    const [selectedTeam, setSelectedTeam] = useState('');
    const [isFlipped, setFlipped] = useState(false);
    const handleTeamChange = (event) => {
      setSelectedTeam(event.target.value);
    };

    return (
      <div className={`card ${isFlipped ? 'flipped' : ''}`}>
        <div className="front">
          {/* Your existing content for the front of the card */}
          <div className="Image-box">
            <img src={user.avatar} alt="User Avatar" className="product-img" />
          </div>
          <div className="product2">
            <h2 className="product-title">
              Name: {user.first_name} {user.last_name}
            </h2>
            {/* Other front card content... */}
          </div>
          <button className="btn" onClick={() => setFlipped(true)} disabled={isFlipped}>
            View Details
          </button>
        </div>
        <div className="back">
          {/* Your content for the back of the card */}
          {/* Modify the button as needed */}
          <button className="button" onClick={() => onAddToTeam(selectedTeam, user.id1)}>
            Add To Team
          </button>
          <button className="btn" onClick={() => setFlipped(false)}>
            Go Back
          </button>
        </div>
      </div>
    );
  };
  
  return (
    <div>
    <div className="container">
        <input
        className='searchBtn'
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <div class="search"></div>
      </div>
    <div className="card-list-container">
      

      <FilterOptions onFilterChange={(filterType, value) => { /* handle filter change */ }} />

      <div className="shop-content">
        <div className="content">
          {users.map((user, index) => (
            <UserCard
              key={index}
              user={user}
              teams={teams}
              onAddToTeam={handleAddToTeam}
            />
          ))}
        </div>
      </div>
    </div>
    </div>
  );
};

export default Landing;
