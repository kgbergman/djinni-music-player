import './App.css';
import { Header } from "./header/Header";
import { Content } from "./content/Content";
import { SavePopup } from './savepopup/SavePopup';
import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import { exampleFile } from './example/example';

function App() {
  const [folders, setFolders] = useState(exampleFile);
  const [streamables, setStreamables] = useState([]);
  const [currentlyStreaming, setCurrentlyStreaming] = useState([]);
  const [oldStreaming, setOldStreaming] = useState([]);
  const [showSavePopup, setShowSavePopup] = useState(false);
  const [masterVolumeMute, setMasterVolumeMute] = useState(false);
  const [masterVolumeValue, setMasterVolumeValue] = useState(50);

  function saveButtonClicked() {
    setShowSavePopup(true);
  }

  function savePopupClose() {
    setShowSavePopup(false);
  }

  useEffect(() => {
    //Determine which streams are new or ending
    let newStreams = currentlyStreaming.filter(x => !oldStreaming.includes(x));
    let endedStreams = oldStreaming.filter(x => !currentlyStreaming.includes(x));

    newStreams.forEach(newStream => {
      startStream(newStream);
    });

    endedStreams.forEach(endedStream => {
      //Find the audio tag and pause it, then remove it
      endStream(endedStream);
    });

    if (newStreams.length === 0 && endedStreams.length === 0) {
      //Volume or mute update
      for (let i = 0; i < currentlyStreaming.length; i++) {
        updateVolumeAndMute(currentlyStreaming[i]);
      }
    }

    setOldStreaming(currentlyStreaming);
  },[currentlyStreaming]);

  function parseVideoUrl(url) {
    var regex = /(?:https?:\/\/(?:www\.)?youtube\.com\/watch\?v=|https?:\/\/youtu\.be\/|https?:\/\/(?:www\.)?youtube\.com\/embed\/)([\w-]{11})(?:\S+)?/;
    var match = url.match(regex);
    return match ? match[1] : null;
  }

  function updateVolume(streamToChange, volume) {
      //Find in folders
      const newFolders = [...folders];
      newFolders.forEach(folder => {
        folder.streams.forEach(stream => {
          if (stream.id === streamToChange.id) {
            streamToChange.streamVolume = volume;
          }
        })
      })
      setFolders(newFolders);
  }

  function updateVolumeAndMute(stream) {
    //Find in streamables
    const newStreamables = [...streamables];
    //Create array of streamable links
    let indexes = [];
    for (let i = 0; i < newStreamables.length; i++) {
      if (newStreamables[i].streamId === stream.id) {
        indexes.push(i);
      }
    }

    for (let i = 0; i < indexes.length; i++) {
      //Get this streamLink
      let streamLink = {};
      for (let j = 0; j < stream.streamData.length; j++) {
        if (stream.streamData[j].id === newStreamables[indexes[i]].linkId) {
          streamLink = stream.streamData[j];
        }
      }
      newStreamables[indexes[i]].volume = stream.streamVolume / 100 * streamLink.volume / 100;
      newStreamables[indexes[i]].mute = stream.streamMute || streamLink.mute;
    }

    setStreamables(newStreamables);
  }

  function startStream(streamToStart) {
    //Find in folders
    const newFolders = [...folders];
    newFolders.forEach(folder => {
      folder.streams.forEach(stream => {
        if (stream.id === streamToStart.id) {
          stream.playing = true;
          //Also turn on the streamLinks
          stream.streamData.forEach(streamLink => {
            streamLink.playing = true;
          })
        }
      })
    })
    setFolders(newFolders);
  }

  function stopStream(streamToStop) {
    //Find in streamables
    const newFolders = [...folders];
    newFolders.forEach(folder => {
      folder.streams.forEach(stream => {
        if (stream.id === streamToStop.id) {
          stream.playing = false;
          //Also turn off the streamLinks
          stream.streamData.forEach(streamLink => {
            streamLink.playing = false;
          })
        }
      })
    })
    setFolders(newFolders);
  }

  function endStream(stream) {
    if (stream.streamFade) {
      //Loop through the streamables for this object
      const originalVolume = stream.streamVolume;
      const fadeTime = parseInt(stream.streamFadeTime);
      const steps = 100;
      const decrementStep = originalVolume / steps;
      const timeInterval = fadeTime * 1000 / steps;
      let currentVolume = stream.streamVolume;
      const fadeOutInterval = setInterval(() => {
        currentVolume -= decrementStep;
        if (currentVolume <= 0) {
          stopStream(stream);
          updateVolume(stream, originalVolume);
          clearInterval(fadeOutInterval);
        } else {
          updateVolume(stream, currentVolume);
        }
      }, timeInterval);
    }
    else {
      stopStream(stream);
    }
  }

  function saveFolders(filename) {
    const saveFolders = [...folders];
    saveFolders.forEach(folder => {
      folder.streams.forEach(stream => {
        stream.playing = false;
        stream.streamData.forEach(streamLink => {
          streamLink.playing = false;
        })
      })
    })
    const data = JSON.stringify(saveFolders, null, '\t');
    const fileName = `${filename}.djinni`;
    const type = 'text/plain';
    var file = new Blob([data], {type: type});
    var a = document.createElement("a"), url = URL.createObjectURL(file);
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    setTimeout(function() {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);  
        setShowSavePopup(false);
    }, 0); 
  }


  function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  function endStreamLink(endedStreamLink) {
    const newFolders = [...folders];
    newFolders.forEach(folder => {
      folder.streams.forEach(stream => {
          stream.streamData.forEach(streamLink => {
            if (streamLink.id === endedStreamLink.id) {
              streamLink.playing = false;
            }
          })
      })
    })
    setFolders(newFolders);
  }

  function addStreamLink(addedStreamLink) {
    const newFolders = [...folders];
    newFolders.forEach(folder => {
      folder.streams.forEach(stream => {
          stream.streamData.forEach(streamLink => {
            if (streamLink.id === addedStreamLink.id) {
              streamLink.playing = true;
            }
          })
      })
    })
    setFolders(newFolders);
  }

  function endFunction(event, endedStreamLink) {
    endStreamLink(endedStreamLink);
    //This function should only call if the stream doesn't already loop
    const repeatIn = randomNumber(endedStreamLink.loop1, endedStreamLink.loop2);
    setTimeout(() => {
      addStreamLink(endedStreamLink);
    }, repeatIn * 1000);   
  }

  function renderVideos() {
    return folders.map(folder => {
        return folder.streams.map(stream => {
            return stream.streamData.map(streamLink => {
              if (stream.playing && streamLink.playing) {
                return <ReactPlayer
                  url={streamLink.link}
                  playing={true}
                  loop={streamLink.loop && streamLink.loop1 === 0 && streamLink.loop2 === 0}
                  volume={stream.streamVolume / 100 * streamLink.volume / 100 * masterVolumeValue / 100}
                  muted={stream.streamMute || streamLink.mute || masterVolumeMute}
                  onEnded={(event) => endFunction(event, streamLink)}
                />
              }
            })
        })
    })
  }

  return (
    <div className="App">
      <div className="audio-streams" id="audio-streams">
        {renderVideos()}
      </div>
      {showSavePopup && <SavePopup savePopupClose={savePopupClose} savePopupClicked={saveFolders}/>}
      <Header masterVolumeMute={masterVolumeMute} setMasterVolumeMute={setMasterVolumeMute} masterVolumeValue={masterVolumeValue} setMasterVolumeValue={setMasterVolumeValue} setFolders={setFolders} saveButtonClicked={saveButtonClicked} setStreamables={setStreamables}/>
      <Content folders={folders} setFolders={setFolders} streamables={streamables} setStreamables={setStreamables} currentlyStreaming={currentlyStreaming} setCurrentlyStreaming={setCurrentlyStreaming}/>
    </div>
  );
}

export default App;
