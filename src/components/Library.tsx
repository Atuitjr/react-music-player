import React from 'react';
import LibrarySong from './LibrarySong';

const Library = ({
    audioRef,
    songs,
    setCurrentSong,
    isPlaying,
    setSongs,
    libraryStatus,
}: any) => {
    return (
        <div className={`library ${libraryStatus ? 'activeLibrary' : ''}`}>
            <h2>Library</h2>
            <div className='librarySongs'>
                {songs.map((song: any) => (
                    <LibrarySong
                        song={song}
                        songs={songs}
                        setCurrentSong={setCurrentSong}
                        key={song.id}
                        audioRef={audioRef}
                        isPlaying={isPlaying}
                        setSongs={setSongs}
                    />
                ))}
            </div>
        </div>
    );
};

export default Library;
