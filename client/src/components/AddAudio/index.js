import React, { useState, useContext } from 'react';
import axios from 'axios';

import PlayerContext from '../../context/player-context';

const AddAudio = () => {
    const [selected_file, selectFile] = useState(null);

    const { setShouldRefetchTracksValue } = useContext(PlayerContext);

    const uploadFiles = () => {
        const data = new FormData();

        data.append('clientAudio', selected_file);
        console.log(selected_file);

        axios.post('http://localhost:4004/add-audio', data)
            .then(response => {
                console.log(response);
                setShouldRefetchTracksValue(true);
            })
            .catch(error => {
                console.log(error);
            });
    };

    const onSelectHandler = ({ target: { files }}) => {
        selectFile(files[0]);
    }

    return (
        <div className="AddAudioWrp">
            <h1>Add Audio file</h1>
            <input type="file" onChange={onSelectHandler} />
            <button onClick={uploadFiles}>Upload</button>
        </div>
    )
};

export default AddAudio;