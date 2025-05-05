import React from "react";
import "./aboutpage.css";
import { Link, useNavigate } from "react-router-dom";

const AboutPage = () => {
    const navigate = useNavigate();
    const goBack = () => {
      navigate(-1);
    }
  return (
    <div className="about-page">
    <Link onClick={goBack} className="backButton">
        <svg width="12" height="20" viewBox="0 0 12 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.5 19L1.5 10L10.5 1" stroke="inherit" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <div className="backText">Back</div>
        </Link>
      <h1>About Sidequest</h1>
      <p>
        Sidequest is an incentive-based platform designed to encourage community engagement and participation within hobby groups. 
        It allows users to create and join groups where they can collaborate on quests or make predictions through bets, 
        all while using a virtual currency system.
      </p>

      <h2>Features</h2>
      <ul>
        <li>
          <strong>Quests:</strong> Users can create quests with specific goals, descriptions, deadlines, and rewards. 
          These quests motivate individuals or groups to achieve personal or collective objectives.
        </li>
        <li>
          <strong>Bets:</strong> Users can place De Finetti bets on events or outcomes, such as games or competitions, 
          with customizable odds and conditions.
        </li>
        <li>
          <strong>Groups:</strong> Users can join or create groups to collaborate on quests or participate in bets.
        </li>
        <li>
          <strong>Virtual Currency:</strong> A virtual currency system is used for rewards and bets, 
          adding a gamified layer to the platform.
        </li>
      </ul>


      <h2>FAQs</h2>
      <ul>
        <li>
          <strong>Quest Reward:</strong> The reward is the amount of virtual currency offered for completing a quest. 
          Ensure the reward aligns with the group's currency balance.
        </li>
        <li>
          <strong>De Finetti Bets:</strong> introduce the concept of defining probability in terms of betting quotients. 
          All bets should be binary questions to resolve Yes or No. The odds set by the creator
          of the bet are also the number of coins that needs to be paid to take the Yes side of the bet. 
          The quantity of bets can increase the amount of coins that can be won or lost by the bet.
        </li>
        <li>
          <strong>Bet Odds:</strong> Odds represent the likelihood of an event occurring, expressed as a percentage (1-99%). 
          Higher odds indicate a higher chance of success.
        </li>
        <li>
          <strong>Group Visibility:</strong> When creating a group, you can choose between "Public" (anyone can join) 
          or "Private" (invite-only).
        </li>
      </ul>

      <h2>How to Use</h2>
      <ol>
        <li>
          <strong>Sign Up or Log In:</strong> Start by creating an account or logging in to access the platform.
        </li>
        <li>
          <strong>Join or Create a Group:</strong> Navigate to the search page to find groups to join or create your own group.
        </li>
        <li>
          <strong>Create or Participate in Quests:</strong> Within a group, you can create new quests or accept existing ones. 
          Fill out the quest form with details like title, description, reward, and deadline.
        </li>
        <li>
          <strong>Place Bets:</strong> Participate in bets by selecting an event, setting odds, and choosing your position (e.g., "yes" or "no").
        </li>
        <li>
          <strong>Track Progress:</strong> Use the dashboard to monitor your quests, bets, and group activities.
        </li>
      </ol>

      <h2>Contact</h2>
      <p>
        For any questions or issues, please contact the development team at jdolak@nd.edu, pschloss@nd.edu, or csuwita@nd.edu.
      </p>
    </div>
  );
};

export default AboutPage;