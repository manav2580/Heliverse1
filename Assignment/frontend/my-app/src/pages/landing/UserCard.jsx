import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserCard.css';

const UserCard = () => {
  const [users, setUsers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState({});

  useEffect(() => {
    fetchData();
    fetchTeams();
  }, []);

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
      setTeams(response.data.teams);
    } catch (error) {
      console.error('Error fetching teams:', error);
    }
  };

  const handleAddToTeam = async (selectedTeam,userId) => {
    console.log(userId);
    console.log(selectedTeam[1]);
    try {
      if (selectedTeam[1]) {
        // Make an Axios post request with user.id and team_name as parameters
        const response = await axios.post('http://localhost:4000/api/v1/addUsersToTeam', {
            "name":selectedTeam[1],
            "id1":userId,
        });
        console.log(`Added user with ID ${userId} to team ${selectedTeam}`);
      } else {
        console.error('Please select a team before adding to the team.');
      }
    } catch (error) {
      console.error('Error adding user to team:', error);
    }
  };

  const handleTeamChange = (userId, teamName) => {
    // Reset selected teams for all users
    setSelectedTeam({
      [userId]: teamName,
    });
  };

  return (
    <React.Fragment>
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
    <div className="content">
      {users.map((user) => (
        <div
          key={user.id}
          className={`card ${user.available ? 'available' : 'unavailable'}`}
        >
          <div
            className={`front ${user.available ? 'available' : 'unavailable'}`}
            style={{ backgroundImage: `url(${user.avatar})` }}
          >
            <p>{user.first_name} {user.last_name}</p>
          </div>
          <div className="back">
            <div>
              <p>Email: {user.email}</p>
              <p>Gender: {user.gender}</p>
              <p>Domain: {user.domain}</p>
              <label htmlFor={`teamSelect-${user.id1}`}>Select Team:</label>
              <select
                id={`teamSelect-${user.id1}`}
                value={selectedTeam[user.id1] || ''}
                onChange={(e) => handleTeamChange(user.id1, e.target.value)}
              >
                <option value="" disabled>Select a team</option>
                {teams.map((team) => (
                  <option key={team.id} value={team.name}>
                    {team}
                  </option>
                ))}
              </select>
              <button
                className="button"
                onClick={() => handleAddToTeam(selectedTeam,user.id1)}
                disabled={!selectedTeam[user.id1]}
              >
                Add To Team
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
    </React.Fragment>
  );
};

export default UserCard;
