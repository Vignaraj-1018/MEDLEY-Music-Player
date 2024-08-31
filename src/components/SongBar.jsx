import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { LikeIcon, NextIcon, PauseIcon, PlayIcon2, PreviousIcon, Speaker0, Speaker1, Speaker2 } from '../assets';
import { nextSong, playPause, prevSong, setVolume, trigger } from '../redux/slices/PlayerSlice';

const SongBar = () => {

    const songData = useSelector((state)=>state.player);
    const dispatch = useDispatch();
    const audioRef = useRef(null);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const rangeRef = useRef(null);

    console.log(songData);

    const formatDuration = (durationMs) => {
        const minutes = Math.floor(durationMs / 60000);
        const seconds = Math.floor((durationMs % 60000) / 1000);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }

    
    const handleRangeChange = (event) => {
        dispatch(setVolume(parseInt(event.target.value)));
        if(audioRef.current){
            audioRef.current.volume = parseInt(event.target.value) / 100;
        }
    };

    const handlePlayPause = () => {
        // dispatch(playPause(!songData.isPlaying));
        if (audioRef.current) {
            if (songData.isPlaying) {
              audioRef.current.pause();
              dispatch(playPause(false));
            } else if (songData.activeSong.preview_url) {
              audioRef.current.play();
              dispatch(playPause(true));
            } else{
                audioRef.current.pause();
                dispatch(playPause(false));
            }
        }
    }

    useEffect(()=>{
        if(songData.triggered){
            handlePlayPause();
            dispatch(trigger(false));
        }
    },[songData.triggered]);

    useEffect(() => {
        const audioElement = audioRef.current;

        if(audioElement){
            const updateCurrentTime = () => {
              setCurrentTime(audioElement.currentTime);
            };
        
            const updateDuration = () => {
              setDuration(audioElement.duration);
            };
        
            audioElement.addEventListener('timeupdate', updateCurrentTime);
            audioElement.addEventListener('loadedmetadata', updateDuration);
        } else {
            return;
        }
    
    
        return () => {
          audioElement.removeEventListener('timeupdate', updateCurrentTime);
          audioElement.removeEventListener('loadedmetadata', updateDuration);
        };
    }, [audioRef.current]);

    useEffect(() => {
        if (rangeRef.current) {
          rangeRef.current.value = currentTime;
        }
    }, [currentTime]);

    const handleSeek = (event) => {
        const audioElement = audioRef.current;
        if (audioElement) {
          audioElement.currentTime = event.target.value;
          setCurrentTime(event.target.value);
        }
    };

    const handleNextSong = () => {
        dispatch(nextSong((songData.currentIndex + 1) % songData.currentSongs.length));
		dispatch(playPause(false));
        dispatch(trigger(true));
    }

    const handlePrevSong = () => {
        if (songData.currentIndex === 0) {
          dispatch(prevSong(songData.currentSongs.length - 1));
        } else {
          dispatch(prevSong(songData.currentIndex - 1));
        }
        dispatch(playPause(false));
        dispatch(trigger(true));

      };

    return (
        <>
            {songData.isActive && 
                <div className="flex flex-row justify-between items-center w-full bg-black text-white h-[10dvh] z-50 bottom-0 left-0 p-2">
                    <div className="flex flex-row gap-4">
                        {songData.activeSong.album && <img src={songData.activeSong.album.images[0].url} alt="Thumbnail" className='flex h-16 w-16 rounded-lg'/>}
                        <div className="flex flex-col justify-between">
                            <span className="flex text-xl font-bold">{songData.activeSong.name}</span>
                            <div className="flex flex-row gap-2">
                                {songData.activeSong.artists.slice(0,2).map((item, index)=>(
                                    <span className="flex text-base font-bold text-zinc-500" key={index}>{item.name}</span>
                                ))}
                            </div>
                        </div>
                        <img src={LikeIcon} alt="Like" className='flex cursor-pointer'/>
                    </div>
                    <div className="flex flex-col gap-3 w-1/2 items-center">
                        <div className="flex flex-row gap-5 items-center">
                            <img src={PreviousIcon} alt="Previous" className='flex h-6 w-6 cursor-pointer' onClick={handlePrevSong}/>
                            {!songData.isPlaying && <img src={PlayIcon2} alt="Icon" className='flex h-6 w-6 cursor-pointer' onClick={handlePlayPause}/>}
                            {songData.isPlaying && <img src={PauseIcon} alt="Icon" className='flex h-6 w-6 cursor-pointer' onClick={handlePlayPause}/>}
                            <img src={NextIcon} alt="Icon" className='flex h-6 w-6 cursor-pointer' onClick={handleNextSong}/>
                        </div>
                        <div className="flex flex-row gap-1 w-full items-center">
                            <span className="flex text-base text-zinc-400">00:00</span>
                            <input type="range" className='flex w-full h-2 bg-gray-500 rounded-lg accent-zinc-300 cursor-pointer range-thumb' min={0} max={duration} step="0.1" value={currentTime} onChange={handleSeek}/>
                            <span className="flex text-base text-zinc-400">00:29</span>
                        </div>
                        <audio ref={audioRef} src={songData.activeSong.preview_url} preload="auto" />
                    </div>
                    <div className="flex flex-row items-center gap-2">
                        {songData.volume == 0 && <img src={Speaker0} alt="volume" />}
                        {songData.volume > 0 && songData.volume < 50 && <img src={Speaker1} alt="volume" />}
                        {songData.volume >= 50 && songData.volume <= 100 && <img src={Speaker2} alt="volume" />}
                        <input type="range" className='w-full h-2 bg-gray-500 rounded-lg accent-zinc-300 cursor-pointer range-thumb' min={0} max={100} value={songData.volume} onChange={handleRangeChange}/>
                    </div>
                </div>
            }
        </>
    )
}

export default SongBar