import twemoji from 'twemoji';
import { getUnicode } from 'emoji-dictionary';

let separator;

const turnIntoEmoji = name => {
  const plainEmoji = name.substr(2, name.length - 4).trim();
  name = plainEmoji.substr(1, plainEmoji.length - 2);

  const unicode = getUnicode(name);

  return `<span class="spoiler">${separator}${twemoji.parse(unicode)}${separator}</span>`;
}

export default (matrix, spaces) => {
  separator = spaces ? ' ' : '';

  matrix = matrix.map(row => {
    return row.map(cell => turnIntoEmoji(cell));
  });

  return matrix.map(r => r.join(separator)).join('<br />');
};
