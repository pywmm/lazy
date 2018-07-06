import Vue from 'vue';
import './test.css';
import Icon from './test.jpeg';

function component() {
  const element = document.createElement('div');
  element.classList.add('hello');

  // Add the image to our existing div.
  const myIcon = new Image();
  myIcon.src = Icon;
  element.appendChild(myIcon);

  return element;
}

document.body.appendChild(component());

export function createApp() {
  const app = new Vue({
    data: 1,
  });
  return app;
}
