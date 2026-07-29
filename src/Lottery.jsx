import React, { useState } from "react";
import Ticket from "./Ticket";
import "./styles.css";

// Generate a random ticket with 'num' digits
function genTicket(num) {
  let ticket = [];
  for (let i = 0; i < num; i++) {
    ticket.push(Math.floor(Math.random() * 10));
  }
  return ticket;
}

function sumOfTicketNums(ticket) {
  let sum = 0;
  for (let i = 0; i < ticket.length; i++) {
    sum += ticket[i];
  }
  return sum;
}

export default function Lottery() {
  // Initialize ticket state with a ticket containing 3 random numbers
  const [ticket, setTicket] = useState(genTicket(3));

 const isWinner = sumOfTicketNums(ticket) === 15;

return (
  <div className="lottery-container">
    <h1>🎟️ Lottery Game</h1>

    <Ticket ticket={ticket} />

    <div className={`result ${isWinner ? "win" : "lose"}`}>
      <span className="emoji">{isWinner ? "🏆" : "😔"}</span>
      <h2>
        {isWinner
          ? "Congratulations! You Won!"
          : "Better Luck Next Time!"}
      </h2>
    </div>

    <button onClick={() => setTicket(genTicket(3))}>
      🎲 Buy New Ticket
    </button>
  </div>
);
}
