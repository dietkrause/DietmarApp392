import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useProfile } from '../utilities/profile';
import User from './User'; // I'm assuming you have a UserFromUrl component somewhere
import CourseList from './CourseList';
import EditForm from './EditForm';

const AppRoutes = ({ data }) => {
    const [profile, profileLoading, profileError] = useProfile();

    if (profileError) return <h1>Error loading profile: {`${profileError}`}</h1>;
    if (profileLoading) return <h1>Loading user profile</h1>;
    if (!profile) return <h1>No profile data</h1>;

    return (
        <Router>
            <Routes>
                <Route 
                    path="/" 
                    element={
                        <CourseList 
                            schedule={data} 
                            selectedCourses={data.selectedCourses} 
                            setSelectedCourses={data.setSelectedCourses} 
                        />
                    } 
                    exact 
                />
                <Route 
                    path="/edit/:id" 
                    element={<EditForm schedule={data} />} 
                />
                <Route 
                    path="/users/:id" 
                    element={<User profile={profile} users={data.users} />} 
                />
            </Routes>
        </Router>
    );
};

export default AppRoutes;
