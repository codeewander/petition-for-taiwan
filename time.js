
const node = document.querySelector('.timestamp')
const timestamp = new Date().getTime()

window.addEventListener('load', (event) => {
  node.value= timestamp
  console.log(node)
});
