import React from "react";
import "./TrackList.css";
import Track from "../Track/Track";

function TrackList(props) {

    const trackListArray = props.searchResults.map(
        (value) => {
            return <Track key={value.id} 
                          result={value} 
                          onAdd={props.onAdd} 
                          onRemove={props.onRemove}
                          isRemoval={props.isRemoval} 
                          track={value} />;
        }
    );

    return (
        <div className="TrackList">
            {trackListArray}
        </div>
    );
}

export default TrackList;