import React, { Component } from 'react'

export class Navbar extends Component {
    render() {
        return (
            <div className="Navbar">
                <nav className='navbar navbar-expand-sm bg-info navbar-dark'>
                    <div className="container">
                        <a href="#" className='navbar-brand'><strong>React Firebase</strong></a>
                    </div>
                </nav>
            </div>
        )
    }
}

export default Navbar
