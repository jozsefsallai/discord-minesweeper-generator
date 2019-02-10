export default () => {
  const now = new Date();

  let hr = now.getHours();
  let min = now.getMinutes();

  const t = hr >= 12 ? 'PM' : 'AM';

  hr = hr % 12;
  hr = hr ? hr : 12;
  
  min = min < 10 ? `0${min}` : min;

  return `Today at ${hr}:${min} ${t}`;
};
