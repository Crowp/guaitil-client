const windowHeight = window.innerHeight;

export default () => {
  const scrollTop = window.scrollY;
  let alpha = (scrollTop / windowHeight) * 2;
  alpha >= 1 && (alpha = 1);
  document.getElementsByClassName('navbar-theme')[0].style.backgroundColor = `rgba(166, 40, 28, ${alpha})`;
};
