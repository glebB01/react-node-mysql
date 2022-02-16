import React from 'react';

const Home = () => {
    return (
        <div>
            <div className="sidenav">
                <div className="login-main-text">
                    <h2>Appointment Management System</h2>
                    <p>Please manage your appointments in this website.</p>
                </div>
            </div>
            <div className="main">
                <div className='container text-center'>
                    <h1 className='home-title'>Welcome to Appointment Management System</h1>
                    <p className='home-subtitle'>
                        You can manage your appointment. As a user, you can make an appointment to available business.
                        And if you have business service, you can manage your promise as a admin.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Home;