export function changeTitle(str) {
  const titleElement = document.getElementsByTagName('title')[0];
  titleElement.innerHTML = str;
}
