import Minesweeper from 'discord.js-minesweeper';
import generateExample from 'lib/generateExample';
import getCurrentTime from 'lib/getCurrentTime';
import { names as emojiNames } from 'emoji-dictionary';

const discordExampleDiv = document.querySelector('#example-target');
const outputElement = document.querySelector('.result');

const error = str => {
  discordExampleDiv.classList.add('error');
  discordExampleDiv.innerHTML = str;
};

const getEmojiName = emoji => {
  const plainEmoji = emoji.substr(2, emoji.length - 4).trim();
  return plainEmoji.substr(1, plainEmoji.length - 2);
}

export default e => {
  e.preventDefault();

  const timeDiv = document.querySelector('.message-content > .time');
  timeDiv.innerHTML = getCurrentTime();

  let exampleContent = '';

  if (discordExampleDiv.classList.contains('error')) {
    discordExampleDiv.classList.remove('error');
  }

  discordExampleDiv.innerHTML = 'Generating...';

  const rows = parseInt(e.target.rows.value, 10) || 9;
  const columns = parseInt(e.target.columns.value, 10) || 9;
  const mines = parseInt(e.target.mines.value, 10) || 10;
  const emote = e.target.emote.value || 'boom';
  const spaces = !e.target.spaces.checked;

  if (rows < 2 || rows > 12) {
    return error('The number of rows has to be between 2 and 12.');
  }

  if (columns < 2 || columns > 12) {
    return error('The number of columns has to be between 2 and 12.');
  }

  const minesweeper = new Minesweeper({
    rows,
    columns,
    mines,
    emote,
    spaces,
    returnType: 'matrix'
  });

  let field = minesweeper.start();

  if (!field) {
    return error('Could not create a Minesweeper board based on your criteria.');
  }

  outputElement.innerHTML = minesweeper.getTextRepresentation(field);

  if (!emojiNames.includes(emote)) {
    exampleContent += `An emoji called "${emote}" could not be found in the standard set. The example below will use the "boom" emoji, but if you can use the provided emoji on Discord, that one will appear.<br /><br />`;
    field = field.map(row => {
      return row.map(cell => {
        if (getEmojiName(cell) === emote) {
          return minesweeper.spoilerize('boom');
        }

        return cell;
      });
    });
  }

  exampleContent += generateExample(field, spaces);

  discordExampleDiv.innerHTML = exampleContent;

  const spoilers = document.querySelectorAll('.spoiler');

  spoilers.forEach(spoiler => {
    return spoiler.onclick = () => spoiler.classList.add('opened');
  });
};
