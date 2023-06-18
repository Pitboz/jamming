import React from "react";
import "./Track.css";

function Track(props) {

    const track = props.track;

    function renderAction() {
        if(props.isRemoval){
            return (
                <button className="Track-action" onClick={removeTrack}>-</button>
            );
        } else {
            return (
                <button className="Track-action" 
                onClick={addTrack} >+</button>
            );
        }
    }

    function addTrack(){
        props.onAdd(track);
    }

    function removeTrack(){
        props.onRemove(track);
    }

    return (
        <div className="Track">
            <div className="Track-information">
                <h3>{props.result.name}</h3>
                <p>{props.result.artist} {props.result.album}</p>
            </div>
            {renderAction()}
        </div>
    );
}

export default Track;