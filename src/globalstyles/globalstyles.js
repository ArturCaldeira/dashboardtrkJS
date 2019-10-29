import {createGlobalStyle} from 'styled-components';

export default createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Fjalla+One&display=swap');
  * {
        margin: 0;
        padding: 0;
        outline: 0;
        box-sizing: border-box;
    }
    html, body, #root {
    height: 100%; 
    }
    body {
        background: #f5f5f5;
        -webkit-font-smoothing: antialiased !important;
        font-family: 'Fjalla One', sans-serif;
    }
`;