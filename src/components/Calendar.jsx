import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import Modal from 'react-modal';
import OpportunityList from './OpportunityList'; // Kontrollera sökvägen här
import BussOppCMS from './BussOppCMS';



Modal.setAppElement('#root'); // Set the root element for accessibility

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [meetingTitle, setMeetingTitle] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDateClick = (info) => {
    setSelectedDate(info.dateStr);
    openModal();
  };

  const handleMeetingTitleChange = (event) => {
    setMeetingTitle(event.target.value);
  };

  const handleCreateMeeting = () => {
    if (selectedDate && meetingTitle) {
      // Create a new meeting object
      const newMeeting = {
        title: meetingTitle,
        date: selectedDate,
      };

      // Add the new meeting to the meetings array
      // (you can save it to a database or perform other actions here)
      console.log('New Meeting:', newMeeting);

      // Reset the input fields
      setSelectedDate(null);
      setMeetingTitle('');
      closeModal();
    } else {
      alert('Please enter a meeting title.');
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };


  return (
    <div>
        <OpportunityList/>
        <h1>Klart på avtal</h1>

        <BussOppCMS/>


      <h2></h2>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={[]} // No events initially, they will be added dynamically
        dateClick={handleDateClick}
      />

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Create Meeting Modal"
      >
        <h3>Create Meeting on {selectedDate}</h3>
        <form>
          <label>
            Meeting Title:
            <input
              type="text"
              value={meetingTitle}
              onChange={handleMeetingTitleChange}
            />
          </label>
          <button type="button" onClick={handleCreateMeeting}>
            Create Meeting
          </button>
          <button type="button" onClick={closeModal}>
            Cancel
          </button>
        </form>
      </Modal>
    </div>
            

  );


};

export default Calendar;
