import React from 'react';
import { Hero } from '../components/Hero';
import { MenuGrid } from '../components/MenuGrid';
import { SEO } from '../components/SEO';

const HomePage: React.FC = () => {
    return (
        <>
            <SEO />
            <Hero />
            <MenuGrid />
        </>
    );
};

export default HomePage;
