import React, { useState } from "react";
// import { json } from "react-router-dom";
import Game from "./Game";
import RadialBarChart from './RadialBarChart'
import Modal from "./Modal";

const PlayQuizEntry = () => {
  const [message, setMessage] = useState("");
  const [seq, setSeq] = useState("");
  const quizsInitial = [];
  const [quizs, setQuizs] = useState(quizsInitial);
  const [isGenerate, setIsGenerate] = useState(false);

  var [val, setVal] = useState(""); 

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setVal(sessionStorage.getItem("val"));
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  }; 

  const handleChange = (event) => {
    setMessage(event.target.value);
  }; 

  const fetchallquiz = async () => {
    const response = await fetch(
      `http://localhost:1000/api/quiz/fetchallquiznoauthentication/${message}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      }
    );
    const json = await response.json();
    console.log(json, "FETCH");
    setSeq("1");
    setQuizs(json); 
    const disableBtn = () => {
      document.getElementById("btn2").disabled = true;
    };
    disableBtn();
  };

  console.log(seq); 

  return (
    <div>

        <p><i>You have to Score 70% or more to passed the exam .</i></p>  
        <div className="">
          <div className="text-center">
            <input
              type="text"
              id="message"
              name="message"
              onChange={handleChange}
              value={message}
              className="form-control " 
              placeholder="Enter Quiz ID"
            /> 

            <button
              className="btn btn-primary mt-2"
              id="btn2"
              onClick={fetchallquiz}
            >
              Play
            </button>
          </div>

          {quizs.map((quiz) => {
            return <Game quiz={quiz} key={quiz._id} />;
          })}

          <button
            className={seq === "1" ? "btn btn-primary mx-2 mb-3 " : "d-none mx-2 mb-3 "}
            id="btn"
            onClick={handleOpenModal}
          >
            {" "}
            GENERATE SCORE{" "}
          </button>
          <Modal isOpen={isModalOpen} onClose={handleCloseModal}> 
            <h2 className="text-center">Your Score</h2>
            <RadialBarChart score={val} />
          </Modal>
        </div>   
    </div>
  );
};

export default PlayQuizEntry;
