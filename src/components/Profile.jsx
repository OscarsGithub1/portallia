import React, { useState } from 'react';

const Profile = ({ user }) => {
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

  return (
    <form style={{ border: '3px solid #ccc', padding: '30px', borderRadius: '5px', background: 'white', margin: 'auto', width: '30%', marginTop: '100px'}}>
      <h2 style={{ textAlign: 'center' }}>Min profil</h2>
      <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ flex: 1, marginLeft: '15px', marginRight: '30px', marginTop: '10px'}}>
          <label htmlFor="name">Förnamn</label>
          <input style={{ border: '3px solid #ccc'}} className="form-control" type="text" id="name" value={name} onChange={handleNameChange} disabled={!isEditing} />
        </div>
        <div style={{ flex: 1, marginRight: '15px', marginTop: '10px' }}>
          <label htmlFor="lastName">Efternamn</label>
          <input style={{ border: '3px solid #ccc'}} className="form-control" type="text" id="lastName" value={lastName} onChange={handleLastNameChange} disabled={!isEditing} />
        </div>
      </div>
      <div  style={{ marginLeft: '15px', marginTop: '10px'}}>
        <label htmlFor="email">Email</label>
      </div>
      <div style={{ marginRight: '30px'}}>  
        <input className="form-control" type="email" id="email" value={email} onChange={handleEmailChange} disabled={!isEditing} style={{ border: '3px solid #ccc', marginLeft: '15px'}} />
      </div>
      {isChangingPassword ? (
        <form onSubmit={handlePasswordFormSubmit}>
          <div style={{ marginTop: '10px', marginLeft: '15px' }}>
            <label htmlFor="oldPassword">Nuvarande lösenord</label>
          </div>
          <div style={{ marginRight: '30px'}}>
            <input className="form-control" style={{ marginLeft: '15px', border: '3px solid #ccc'}} type="password" id="oldPassword" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} required />
          </div>
          <div style={{ marginLeft: '15px', marginTop: '10px' }}>
            <label htmlFor="newPassword">Nytt lösenord</label>
          </div>
          <div style={{ marginRight: '30px'}} >  
            <input className="form-control" style={{ marginLeft: '15px', border: '3px solid #ccc'}} type="password" id="newPassword" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
          </div>
          <div style={{ marginTop: '10px', marginLeft: '15px' }}>
            <label htmlFor="confirmPassword">Bekräfta lösenord</label>
          </div>
          <div style={{ marginRight: '30px'}}>  
            <input className="form-control" style={{ marginLeft: '15px', border: '3px solid #ccc'}} type="password" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
          </div>
          <div style={{ marginLeft: '15px', marginRight: '15px', display: 'flex', justifyContent: 'space-between', marginTop: '30px' }}>
            <button type="submit" className="btn btn-primary">Spara</button>
            <button type="button" className="btn btn-primary" onClick={() => setIsChangingPassword(false)}>Avbryt</button>
          </div>  
        </form>
      ) : (
        <>
          {isEditing ? (
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '30px', marginLeft: '15px', marginRight: '15px' }}>
              <button type="button" className="btn btn-primary" onClick={handleClearClick}>Rensa alla fält</button>
              <button type="button" className="btn btn-primary" onClick={handleSaveClick}>Spara ändringar</button>
            </div>
          ) : (
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '30px', marginLeft: '15px', marginRight: '15px' }}>
              <button type="button" className="btn btn-primary" onClick={handleEditClick}>Ändra din profil</button>
              <button type="button" className="btn btn-primary" onClick={handleChangePasswordClick}>Byt lösenord</button>
            </div>
          )}
        </>
      )}
    </form>
  );
};

export default Profile;
