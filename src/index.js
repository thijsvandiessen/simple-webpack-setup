import './style.scss';

if (process.env.NODE_ENV !== 'production') {
  console.log('Looks like we are in development mode!');
}

const root = document.getElementById("root");

const paragraph = document.createElement("p");

const textNode = document.createTextNode("A very simple webpack setup");

paragraph.appendChild(textNode)

root.appendChild(paragraph);
