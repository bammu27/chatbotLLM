import React, { useState } from 'react';

import './index.css';

const App = () => {
  const [text, setText] = useState('');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const getResponse = async () => {
    const API_KEY = process.env.REACT_APP_LLM_API_KEY;
    const LANGUAGE_MODEL_URL = `https://generativelanguage.googleapis.com/v1beta1/models/chat-bison-001:generateMessage?key=${API_KEY}`;

    const payload = {
      prompt: { "messages": [{ "content": `${text}` }] },
      temperature: 0.8,
      candidate_count: 1,
    };

    const response = await fetch(LANGUAGE_MODEL_URL, {
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(payload),
      method: "POST",
    });

    const data = await response.json();

    setQuestion(data.candidates[0].content);
    setAnswer(data.messages[0].content);
  };

  const svgStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: -1,
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100' }}>
      <svg
        id="visual"
        viewBox="0 0 1600 900"
        width="1600"
        height="900"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        version="1.1"
        style={svgStyle}
      >
        <rect x="0" y="0" width="1600" height="900" fill="#FF0066"></rect>
        <g transform="translate(480.2937235859287 297.84960600892737)">
          <path
            d="M103.7 -118.4C136.7 -70.7 167.4 -35.4 168.9 1.5C170.4 38.4 142.8 76.8 109.8 126.8C76.8 176.8 38.4 238.4 -9.3 247.7C-57 257 -114.1 214.1 -156.1 164.1C-198.1 114.1 -225 57 -229 -4C-233.1 -65.1 -214.1 -130.1 -172.1 -177.8C-130.1 -225.4 -65.1 -255.7 -14.8 -240.9C35.4 -226 70.7 -166 103.7 -118.4"
            fill="#BB004B"
          ></path>
        </g>
      </svg>

      <div className="chat-bot">
        <div className="chat-header">
          <div className="info-container">
            <h1 className='title'>b@Bot </h1>
          </div>
        </div>
        <div className="feed">
          <div className="question">{question}</div>
          <div className="response">{answer}</div>
          <textarea
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
          />
          <button onClick={getResponse}>Generate</button>
        </div>
      </div>
    </div>
  );
};

export default App;
