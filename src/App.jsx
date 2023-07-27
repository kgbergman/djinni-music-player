import './App.css';
import { Header } from "./header/Header";
import { Content } from "./content/Content";
import { SavePopup } from './savepopup/SavePopup';
import React, { useState, useEffect } from 'react';
import { exampleFile } from './example/example';
import { MemoizedPlayer } from './player/Player';
import OBR from '@owlbear-rodeo/sdk';
import{ getPluginId } from './getPluginId'

function App() {
  const [folders, setFolders] = useState(exampleFile);
  const [currentlyStreaming, setCurrentlyStreamingMetadata] = useState([]);
  const [oldStreaming, setOldStreaming] = useState([]);
  const [showSavePopup, setShowSavePopup] = useState(false);
  const [masterVolume, setMasterVolume] = useState({volume: 50, mute: false});
  const [playerRole, setPlayerRole] = useState("");

  useEffect(() => {
    OBR.onReady(async () => {
      if (playerRole === "") {
        const newPlayerRole = await OBR.player.getRole();
        setPlayerRole(newPlayerRole);
      }
      OBR.room.onMetadataChange((metadata) => {
        const currently = metadata[getPluginId("currently")][0];
        //Extrapolate what functions to run based off of the new currently streaming data
        console.log("received metadata", currently);
        setCurrentlyStreamingMetadata(currently);
      })
    });
  }, []);

  function setCurrentlyStreaming(newCurrentlyStreaming) {
    sendMetadata("currently", structuredClone(newCurrentlyStreaming), new Date().getTime());
  }

  function sendMetadata(command, parameter, cmdNum) {
    if (OBR.isReady) {
      OBR.room.setMetadata({
        [getPluginId(command)]: [parameter, cmdNum]
      });
    }
  }

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

    setOldStreaming(currentlyStreaming);
  },[currentlyStreaming]);

  function parseVideoUrl(url) {
    var regex = /(?:https?:\/\/(?:www\.)?youtube\.com\/watch\?v=|https?:\/\/youtu\.be\/|https?:\/\/(?:www\.)?youtube\.com\/embed\/)([\w-]{11})(?:\S+)?/;
    var match = url.match(regex);
    return match ? match[1] : null;
  }

  function updateVolume(streamToChange, volume) {
    //Find in folders
    const newFolders = {...folders};
    const thisFolder = newFolders[streamToChange.folderId];
    thisFolder.streams.forEach(stream => {
      if (stream.id === streamToChange.id) {
        streamToChange.streamVolume = volume;
      }
    })
    newFolders[thisFolder.id] = thisFolder;
    setFolders(newFolders);
  }

  function startStream(streamToStart) {
    //Find in folders
    const newFolders = {...folders};
    const thisFolder = newFolders[streamToStart.folderId];
    thisFolder.streams.forEach(stream => {
      if (stream.id === streamToStart.id) {
        stream.playing = true;
        //Also turn on the streamLinks
        stream.streamData.forEach(streamLink => {
          streamLink.playing = true;
        })
      }
    })
    newFolders[thisFolder.id] = thisFolder;
    setFolders(newFolders);
  }

  function stopStream(streamToStop) {
    const newFolders = {...folders};
    const thisFolder = newFolders[streamToStop.folderId];
    thisFolder.streams.forEach(stream => {
      if (stream.id === streamToStop.id) {
        stream.playing = false;
        //Also turn off the streamLinks
        stream.streamData.forEach(streamLink => {
          streamLink.playing = false;
        })
      }
    })
    newFolders[thisFolder.id] = thisFolder;
    setFolders(newFolders);
  }

  function setStreamInterval(streamToAddTo, interval) {
    const newFolders = {...folders};
    const thisFolder = newFolders[streamToAddTo.folderId];
    thisFolder.streams.forEach(stream => {
      if (stream.id === streamToAddTo.id) {
        stream.interval = interval;
      }
    })
    newFolders[thisFolder.id] = thisFolder;
    setFolders(newFolders);
  }

  function endStream(stream) {
    if (stream.streamFade) {
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
          setStreamInterval(stream, 0);
          updateVolume(stream, originalVolume);
          clearInterval(fadeOutInterval);
        } else {
          updateVolume(stream, currentVolume);
        }
      }, timeInterval);
      setStreamInterval(stream, fadeOutInterval);
    }
    else {
      stopStream(stream);
    }
  }

  function saveFolders(filename) {
    const saveFolders = {...folders};
    const keys = Object.keys(saveFolders);
    keys.forEach(key => {
      const thisFolder = saveFolders[key];
      thisFolder.streams.forEach(stream => {
        stream.playing = false;
        stream.streamData.forEach(streamLink => {
          streamLink.playing = false;
        })
      })
      saveFolders[key] = thisFolder;
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
    const newFolders = {...folders};
    const keys = Object.keys(newFolders);
    keys.forEach(key => {
      const thisFolder = newFolders[key];
      let changed = false;
      thisFolder.streams.forEach(stream => {
        stream.streamData.forEach(streamLink => {
          if (streamLink.id === endedStreamLink.id) {
            streamLink.playing = false;
            changed = true;
          }
        })
        if (changed) {
          newFolders[thisFolder.folderId] = thisFolder;
        }
      })
    })    
    setFolders(newFolders);
  }

  function addStreamLink(addedStreamLink) {
    const newFolders = {...folders};
    const keys = Object.keys(newFolders);
    keys.forEach(key => {
      const thisFolder = newFolders[key];
      let changed = false;
      thisFolder.streams.forEach(stream => {
        stream.streamData.forEach(streamLink => {
          if (streamLink.id === addedStreamLink.id) {
            streamLink.playing = true;
            changed = true;
          }
        })
        if (changed) {
          newFolders[thisFolder.folderId] = thisFolder;
        }
      })
    })
    setFolders(newFolders);
  }

  function removeFromCurrentlyStreaming(streamToRemove) {
    let newCurrentlyStreaming = [...currentlyStreaming];
    newCurrentlyStreaming = newCurrentlyStreaming.filter((stream) => stream.id !== streamToRemove.id)
    setCurrentlyStreaming(newCurrentlyStreaming)
  }

  function checkIfRemoveFromCurrentlyStreaming(endedStreamLink) {
    //Find the stream that holds this streamlink
    currentlyStreaming.forEach(stream => {
      if (stream.streamData.some(streamLink => streamLink.id === endedStreamLink.id)) {
        //Check if all of the streams are not playing and don't loop
        let remove = true;
        stream.streamData.forEach(streamLink => {
          if (streamLink.playing || streamLink.loop) {
            remove = false;
          }
        })
        if (remove) {
          removeFromCurrentlyStreaming(stream);
        }
      }
    })
  }

  function endFunction(event, endedStreamLink) {
    endStreamLink(endedStreamLink);
    //This function should only call if the stream doesn't already loop, but to be safe
    if (!endStreamLink.loop) {
      checkIfRemoveFromCurrentlyStreaming(endedStreamLink);
    } 
    else {
      const repeatIn = randomNumber(endedStreamLink.loop1, endedStreamLink.loop2);
      setTimeout(() => {
        addStreamLink(endedStreamLink);
      }, repeatIn * 1000);  
    }
  }

  const [folderKeys, setFolderKeys] = useState(Object.keys(folders));

  function renderVideos() {
    return folderKeys.map(folderKey => {
        if (folders.hasOwnProperty(folderKey)) {
          return folders[folderKey].streams.map(stream => {
              return stream.streamData.map(streamLink => {
                if (stream.playing && streamLink.playing) {
                  return <MemoizedPlayer
                    streamLinkId={streamLink.id}
                    url={streamLink.link}
                    playing={true}
                    loop={streamLink.loop && streamLink.loop1 === 0 && streamLink.loop2 === 0}
                    volume={stream.streamVolume / 100 * streamLink.volume / 100 * masterVolume.volume / 100}
                    muted={stream.streamMute || streamLink.mute || masterVolume.mute}
                    onEnded={(event) => endFunction(event, streamLink)}
                  />
                }
              })
          })
        }
    })
  }

  
  function renderVideosPlayer() {
    return currentlyStreaming.map(stream => {
      return stream.streamData.map(streamLink => {
        return <MemoizedPlayer
          streamLinkId={streamLink.id}
          url={streamLink.link}
          playing={true}
          loop={streamLink.loop && streamLink.loop1 === 0 && streamLink.loop2 === 0}
          volume={stream.streamVolume / 100 * streamLink.volume / 100 * masterVolume.volume / 100}
          muted={stream.streamMute || streamLink.mute || masterVolume.mute}
          onEnded={(event) => endFunction(event, streamLink)}
        />
      })
    })
  }

  const addFolderKey = React.useCallback((folderKeyToAdd) => {
    setFolderKeys((folderKeys) => [...folderKeys, folderKeyToAdd]);
  }, []);

  if (playerRole === "GM") {
    return (
      <div className="App">
        <div className="audio-streams" id="audio-streams">
          {renderVideos()}
        </div>
        {showSavePopup && <SavePopup savePopupClose={savePopupClose} savePopupClicked={saveFolders}/>}
        <Header 
          folderKeys={folderKeys} 
          addFolderKey={addFolderKey} 
          masterVolume={masterVolume} 
          setMasterVolume={setMasterVolume} 
          setFolders={setFolders} 
          saveButtonClicked={saveButtonClicked} 
        />
        <Content 
          folders={folders} 
          addFolderKey={addFolderKey} 
          setFolderKeys={setFolderKeys} 
          folderKeys={folderKeys} 
          setFolders={setFolders} 
          currentlyStreaming={currentlyStreaming} 
          setCurrentlyStreaming={setCurrentlyStreaming} 
        />
      </div>
    );
  }
  else {
    return (
      <div className="App">
        <div className="audio-streams" id="audio-streams">
          {renderVideosPlayer()}
        </div>
      </div>
    );
  }
}

export default App;
