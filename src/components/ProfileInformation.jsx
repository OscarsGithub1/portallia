import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

const ProfileInformation = ({ user }) => {
  const [name, setName] = useState(user.name);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleClearClick = () => {
    setName(user.name);
    setLastName(user.lastName);
    setEmail(user.email);
  };
  
  
  

  const handleSaveClick = () => {
    // You can implement the logic to save the updated information here
    setIsEditing(false);
  };

  const handleChangePasswordClick = () => {
    setIsChangingPassword(true);
  };

  const handlePasswordFormSubmit = (event) => {
    event.preventDefault();
    // You can implement the logic to handle password change here
    alert("Lösenordet har ändrats");
    setIsChangingPassword(false);
  };

  // Function to handle profile picture change
  return (
    <form style={{ backgroundColor: '#ffffff', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.7)' , padding: '30px', borderRadius: '28px', margin: 'auto', width: '25%', marginTop: '130px'}}>
      
      <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ flex: 1, marginLeft: '15px', marginRight: '30px', marginTop: '10px'}}>
          <label htmlFor="name">Förnamn</label>
          <input style={{ border: '3px solid rgba(0, 0, 0, 0.5)'}} className="form-control" type="text" id="name" value={name} required onChange={handleNameChange} disabled={!isEditing} />
        </div>
        <div style={{ flex: 1, marginRight: '15px', marginTop: '10px' }}>
          <label htmlFor="lastName">Efternamn</label>
          <input style={{ border: '3px solid rgba(0, 0, 0, 0.5)'}} className="form-control" type="text" id="lastName" value={lastName} onChange={handleLastNameChange} disabled={!isEditing} />
        </div>
      </div>
      <div  style={{ marginLeft: '15px', marginTop: '10px'}}>
        <label htmlFor="email">Email</label>
      </div>
      <div style={{ marginRight: '30px'}}>  
        <input className="form-control" type="email" id="email" value={email} onChange={handleEmailChange} disabled={!isEditing} style={{ border: '3px solid rgba(0, 0, 0, 0.5)', marginLeft: '15px'}} />
      </div>
      {isChangingPassword ? (
        <form onSubmit={handlePasswordFormSubmit}>
          <div style={{ marginTop: '10px', marginLeft: '15px' }}>
            <label htmlFor="oldPassword">Nuvarande lösenord</label>
          </div>
          <div style={{ marginRight: '30px'}}>
            <input className="form-control" style={{ marginLeft: '15px', border: '3px solid rgba(0, 0, 0, 0.5)'}} type="password" id="oldPassword" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} required />
          </div>
          <div style={{ marginLeft: '15px', marginTop: '10px' }}>
            <label htmlFor="newPassword">Nytt lösenord</label>
          </div>
          <div style={{ marginRight: '30px'}} >  
            <input className="form-control" style={{ marginLeft: '15px', border: '3px solid rgba(0, 0, 0, 0.5)'}} type="password" id="newPassword" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
          </div>
          <div style={{ marginTop: '10px', marginLeft: '15px' }}>
            <label htmlFor="confirmPassword">Bekräfta lösenord</label>
          </div>
          <div style={{ marginRight: '30px'}}>  
            <input className="form-control" style={{ marginLeft: '15px', border: '3px solid rgba(0, 0, 0, 0.5)'}} type="password" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
          </div>
          <div style={{ marginLeft: '15px', marginRight: '15px', display: 'flex', justifyContent: 'space-between', marginTop: '30px' }}>
            <Button variant="contained" color="primary" style={{  border: '1px solid' , borderRadius: '6px'}} onClick={() => setIsChangingPassword(false)}>Avbryt</Button>
            <Button variant="contained" color="primary" type='submit' style={{  border: '1px solid' , borderRadius: '6px'}}>Spara</Button>
          </div>  
        </form>
      ) : (
        <>
          {isEditing ? (
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '30px', marginLeft: '15px', marginRight: '15px' }}>
              <Button variant="contained" color="primary" style={{  border: '1px solid' , borderRadius: '6px'}} onClick={handleClearClick}>Rensa</Button>
              <Button variant="contained" color="primary" style={{  border: '1px solid' , borderRadius: '6px'}} onClick={handleSaveClick}>Spara</Button>
            </div>
          ) : (
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '30px', marginLeft: '15px', marginRight: '15px' }}>
              <Button variant="contained" color="primary" style={{  border: '1px solid' , borderRadius: '6px'}} onClick={handleEditClick}>Ändra din profil</Button>
              <Button variant="contained" color="primary" style={{  border: '1px solid' , borderRadius: '6px'}} onClick={handleChangePasswordClick}>Byt lösenord</Button>
            </div>
          )}
        </>
      )}
    </form>
  );
};

export default ProfileInformation;
