import React from "react";
import { Link } from 'react-router-dom';

function Graphical(){
    return (
        <div>
            <p>This is Graphical Page</p>
            <Link to="/">Back to Home Page</Link>
        </div>
    );
}

export default Graphical