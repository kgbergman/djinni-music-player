import './style.css'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>YouTube DJ Mixer</h1>
    <p>Enter YouTube links and click "Add" to mix them together:</p>
    <input type="text" id="linkInput" placeholder="Enter YouTube link">
    <button id="addButton">Add</button>
    <button id="playButton">Play Mix</button>
    <hr>
    <div id="mixPlayer"></div>
  </div>
`

let links: any[] = [];

const addButton = document.getElementById('addButton') as HTMLButtonElement;
const playButton = document.getElementById('playButton') as HTMLButtonElement;

addButton.addEventListener("click", () => addLink());
playButton.addEventListener("click", () => playMix());

function addLink() {
    const linkInput = document.getElementById('linkInput') as HTMLInputElement;
    if (linkInput) {
      const link = linkInput.value;
      linkInput.value = '';

      links.push(link);
    }
}

function playMix() {
    const mixPlayer = document.getElementById('mixPlayer');

    if (mixPlayer) {
      mixPlayer.innerHTML = '';

      for (let i = 0; i < links.length; i++) {
          const link = links[i];
          const videoId = getYouTubeVideoId(link);

          if (videoId) {
              const iframe = document.createElement('iframe');
              iframe.width = '420';
              iframe.height = '315';
              iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&controls=0&disablekb=1&fs=0&loop=1&modestbranding=1&rel=0&showinfo=0`;
              iframe.allow = 'autoplay';
              iframe.frameBorder = '0';
              mixPlayer.appendChild(iframe);
          }
      }
    }
}

function getYouTubeVideoId(url: string) {
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
    return match ? match[1] : null;
}