import React, { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPlay,
    faAngleLeft,
    faAngleRight,
} from '@fortawesome/free-solid-svg-icons';

const Player = ({ currentSong, isPlaying, setIsPlaying }: any) => {
    const [songInfo, setSongInfo] = useState({
        currentTime: 0,
        duration: 0,
    });
    const audioRef = useRef<HTMLAudioElement>(null);

    const getTime = (time: any) => {
        return `${Math.floor(time / 60)}:${('0' + Math.floor(time % 60)).slice(
            -2
        )}`;
    };

    const updateTimeHandler = (e: any) => {
        const current = e.target.currentTime;
        const duration = e.target.duration;
        setSongInfo({
            ...songInfo,
            currentTime: current,
            duration,
        });
    };

    const dragHandler = (e: any) => {
        const newTime = e.target.value;
        if (audioRef.current) {
            audioRef.current.currentTime = newTime;
            setSongInfo({
                ...songInfo,
                currentTime: newTime,
            });
        }
    };

    const playSongHandler = () => {
        if (audioRef.current !== null) {
            setIsPlaying(!isPlaying);
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
        }
    };

    return (
        <div className='player'>
            <div className='timeControl'>
                <p>{getTime(songInfo.currentTime)}</p>
                <input
                    min={0}
                    max={songInfo.duration ? songInfo.duration : 0}
                    value={songInfo.currentTime ? songInfo.currentTime : 0}
                    onChange={dragHandler}
                    type='range'
                />
                <p>{getTime(songInfo.duration)}</p>
            </div>
            <div className='playControl'>
                <FontAwesomeIcon
                    className='skipBack'
                    size='2x'
                    icon={faAngleLeft}
                />
                <FontAwesomeIcon
                    onClick={playSongHandler}
                    className='play'
                    size='2x'
                    icon={faPlay}
                />
                <FontAwesomeIcon
                    className='skipForward'
                    size='2x'
                    icon={faAngleRight}
                />
            </div>
            <audio
                onLoadedMetadata={updateTimeHandler}
                onTimeUpdate={updateTimeHandler}
                ref={audioRef}
                src={currentSong.audio}
            ></audio>
        </div>
    );
};

export default Player;
