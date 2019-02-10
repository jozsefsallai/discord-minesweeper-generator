import 'styles/base.scss';

import parseForm from 'lib/parseForm';
import getCurrentTime from 'lib/getCurrentTime';
import Clipboard from 'clipboard';

window.onload = () => {
  const timeDiv = document.querySelector('.message-content > .time');
  timeDiv.innerHTML = getCurrentTime();
};

const form = document.querySelector('form');
form.onsubmit = parseForm;

const textarea = document.querySelector('.result');
textarea.onfocus = () => textarea.select();

const clipboard = new Clipboard('.copy-to-clipboard > a');
const clipboardElement = document.querySelector('.copy-to-clipboard');
const clipboardElementContents = clipboardElement.innerHTML;

clipboard.on('success', () => {
  clipboardElement.innerHTML = '<div class="message-box success">Copied to clipboard!</div>';
  setTimeout(() => clipboardElement.innerHTML = clipboardElementContents, 3000);
});

clipboard.on('error', () => {
  clipboardElement.innerHTML = '<div class="message-box error">Failed to copy to clipboard.</div>';
  setTimeout(() => clipboardElement.innerHTML = clipboardElementContents, 3000);
});
