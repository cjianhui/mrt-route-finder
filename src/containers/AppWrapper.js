import React from 'react';
import '../styles.scss';

const AppWrapper = ({ children }) => {
    return (
        <section className="bg-gradient-cold hero is-fullheight">
            <div className="hero-body">
                {children}
            </div>
        </section>
    )
};

export default AppWrapper;
