import React from 'react';
import styled from 'styled-components';

const Form = styled.div`
color: #98999b;
display: block;
border: ${(props) => {if (props.border) {
    return `2px solid #3e3e3e`}}};
`;

const Label = styled.label`
margin-bottom: 0.5em;
color: #000;
display: block;
padding: 5px;
`;

const Input = styled.input`
padding: 0.5em;
color: #000;
background: #fff;
border: 1px solid #000;
border-radius: 3px;
width: 30%;
margin-top: 3px;
`;

const Select = styled.select`
width: 180px;
height: 60px;
background: #E5E5E5;
border: 2px solid #AFA9A9;
box-sizing: border-box;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`
const InputTextArea = styled.textarea`
  width: 90%;
  height: 80px;
  font-family: "Helvetica";
  font-size: 16px;
`

const InputText = styled.input`
  width: 90%;
  height: 30px;
  font-family: "Helvetica";
  font-size: 16px;
`


export {Form, Label, Input, Select, InputTextArea, InputText};