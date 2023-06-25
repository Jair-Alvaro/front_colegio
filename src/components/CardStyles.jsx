import React from 'react';

const CardStyles = () => (
  <style>
    {`
      @import url("https://fonts.googleapis.com/css2?family=Open+Sans:wght@300&display=swap");

      #carta {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 20px;
      }
      #concard {
      
        border-radius: 35px;
        transition: 400ms all ease;
        box-shadow: 10px 10px 16px -5px rgba(0, 0, 0, 0.75);
        -webkit-box-shadow: 10px 10px 16px -5px rgba(0, 0, 0, 0.75);
        -moz-box-shadow: 10px 10px 16px -5px rgba(0, 0, 0, 0.75);
      }
      #concard:hover {
        transform: translateY(-4%);
        box-shadow: 10px 10px 16px -5px rgba(0, 0, 0, 0.75);
        -webkit-box-shadow: 10px 10px 16px -5px rgba(0, 0, 0, 0.75);
        -moz-box-shadow: 10px 10px 16px -5px rgba(0, 0, 0, 0.75);
      }
      #concard img {
        width: 100%;
        height: 180px;
        object-fit: cover;
        border-top-left-radius: 35px;
        border-top-right-radius: 35px;
      }
      #sub {
        height: 360px;
        display: flex;
        flex-direction: column;
        align-items: center;

      }
      .container__title {
        width: 100%;
        font-weight: bold;
        margin-top: 10px;
        font-size: 2em;
      }
      .container__subtitle {
        width: 100%;
        font-weight: bold;
        
      }

      #bu {
        text-decoration: none;
        
        padding: 10px;
        padding-left: 70px;
        padding-right: 70px;
        font-weight: bold;
        border-radius: 2em;
        background-color: #747675;
        color: #fff;
        cursor: pointer;
        transition: 0.5s;
        margin-bottom: 14px;
      }
      .button:hover {
        transform: translateX(3%);
        box-shadow: 10px 10px 16px -5px rgba(0, 0, 0, 0.75);
        -webkit-box-shadow: 10px 10px 16px -5px rgba(0, 0, 0, 0.75);
        -moz-box-shadow: 10px 10px 16px -5px rgba(0, 0, 0, 0.75);
    `}
  </style>
);

export default CardStyles;
