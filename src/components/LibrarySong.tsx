import React from 'react';

const LibrarySong = ({
    audioRef,
    song,
    songs,
    setSongs,
    setCurrentSong,
    isPlaying,
}: any) => {
    const songSelectHandler = async () => {
        await setCurrentSong(song);
        const songId = song.id;
        const newSongs = songs.map((song: any) => {
            return { ...song, active: song.id === songId ? true : false };
        });
        if (isPlaying) audioRef.current.play();
        setSongs(newSongs);
    };

    return (
        <div
            onClick={songSelectHandler}
            className={`librarySong ${song.active ? 'selected' : ''}`}
        >
            <img alt={song.name} src={song.cover}></img>
            <div className='songDescription'>
                <h3>{song.name}</h3>
                <h4>{song.artist}</h4>
            </div>
        </div>
    );
};

export default LibrarySong;
