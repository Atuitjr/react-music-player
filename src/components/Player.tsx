/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPlay,
    faAngleLeft,
    faAngleRight,
    faPause,
} from '@fortawesome/free-solid-svg-icons';

const Player = ({
    songInfo,
    setSongInfo,
    audioRef,
    currentSong,
    setCurrentSong,
    isPlaying,
    setIsPlaying,
    songs,
    setSongs,
}: any) => {
    const activeLibraryHandler = (nextPrev: any) => {
        const newSongs = songs.map((song: any) => {
            return {
                ...song,
                active: song.id === nextPrev.id ? true : false,
            };
        });
        if (isPlaying) audioRef.current.play();
        setSongs(newSongs);
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

    const getTime = (time: any) => {
        return `${Math.floor(time / 60)}:${('0' + Math.floor(time % 60)).slice(
            -2
        )}`;
    };

    const skipTrackHandler = async (direction: string) => {
        let currentIndex = songs.findIndex(
            (song: any) => song.id === currentSong.id
        );
        if (direction === 'skipForward') {
            await setCurrentSong(
                songs[currentIndex + 1 === songs.length ? 0 : currentIndex + 1]
            );
            activeLibraryHandler(
                songs[currentIndex + 1 === songs.length ? 0 : currentIndex + 1]
            );
        } else {
            await setCurrentSong(
                songs[currentIndex === 0 ? songs.length - 1 : currentIndex - 1]
            );
            activeLibraryHandler(
                songs[currentIndex === 0 ? songs.length - 1 : currentIndex - 1]
            );
        }
    };

    const trackAnimation = {
        transform: `translateX(${songInfo.animationPercentage}%)`,
    };

    return (
        <div className='player'>
            <div className='timeControl'>
                <p>{getTime(songInfo.currentTime)}</p>
                <div
                    className='track'
                    style={{
                        background: `linear-gradient(to right, ${currentSong.color[0]},${currentSong.color[1]})`,
                    }}
                >
                    <input
                        min={0}
                        max={songInfo.duration || 0}
                        value={songInfo.currentTime || 0}
                        onChange={dragHandler}
                        type='range'
                    />
                    <div className='animateTrack' style={trackAnimation}></div>
                </div>
                <p>{songInfo.duration ? getTime(songInfo.duration) : '0:00'}</p>
            </div>
            <div className='playControl'>
                <FontAwesomeIcon
                    onClick={() => skipTrackHandler('skipBack')}
                    className='skipBack'
                    size='2x'
                    icon={faAngleLeft}
                />
                <FontAwesomeIcon
                    onClick={playSongHandler}
                    className='play'
                    size='2x'
                    icon={isPlaying ? faPause : faPlay}
                />
                <FontAwesomeIcon
                    onClick={() => skipTrackHandler('skipForward')}
                    className='skipForward'
                    size='2x'
                    icon={faAngleRight}
                />
            </div>
        </div>
    );
};

export default Player;
