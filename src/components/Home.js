 
// import Notes from "./Notes"
 
// const Home = (props) => {
//   const {showAlert} = props;
//   return (
//     <div>
//        {/* <AddNote/> */}
//       <Notes showAlert ={showAlert}/>
//     </div>
//   )
// }

// export default Home


import React, { useEffect, useContext } from 'react';
import Notes from './Notes';
import { useNavigate } from 'react-router-dom';
import noteContext from '../context/notes/NotesContext';

const Home = (props) => {
  const navigate = useNavigate();
  const context = useContext(noteContext);
  const { getNotes } = context;

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      getNotes();
    }
  }, [navigate, getNotes]);

  return (
    <div className="container">
      <Notes showAlert={props.showAlert} />
    </div>
  );
};

export default Home;
