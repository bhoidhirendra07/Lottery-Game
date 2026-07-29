import React, { useState, useEffect } from "react";
import Ticket from "./Ticket";
import Confetti from "react-confetti";
import Swal from "sweetalert2";

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
  const [showConfetti, setShowConfetti] = useState(false);

  const isWinner = sumOfTicketNums(ticket) === 15;

  useEffect(() => {
    if (isWinner) {
      setShowConfetti(true);

      Swal.fire({
        title: "🏆 Congratulations! 🏆",
        html: `
    <h2 style="color:#16a34a">You Won!</h2>
    <p>Your ticket sum is <b>15</b>.</p>
  `,
        icon: "success",
        background: "#1f57b0ff",
        color: "#fff",
        confirmButtonColor: "#f59e0b",
        timer: 3000,
        timerProgressBar: true,
      });

      // Stop confetti after 5 seconds
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [isWinner]);

  return (
    <>
      {showConfetti && <Confetti recycle={false} numberOfPieces={300} />}

      <div className="lottery-container">
        <h1>Lottery</h1>

        <Ticket ticket={ticket} />

        <h2 className={isWinner ? "win" : "lose"}>
          {isWinner
            ? "🎉 Congratulations! You Won! 🎉"
            : "🎲 Buy new ticket to play 🎲"}
        </h2>

        <button onClick={() => setTicket(genTicket(3))}>Buy New Ticket</button>
      </div>
    </>
  );
}
