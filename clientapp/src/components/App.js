import React from 'react';
import Header from './Header';
import '../css/App.css';
export default (props) => {
    return(
        <div>
            <Header />
            <div className="container site">
                { props .children }
            </div>
        </div>
    )
}