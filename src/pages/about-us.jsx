
import React from "react";
import { Hero } from "../cmps/aboutUs/hero";
import { HealthSection } from "../cmps/aboutUs/health-section";
import { TeamCarousel } from "../cmps/aboutUs/carousel";



export function AboutUs() {

    return (
        <section className="about-us-container">
            <Hero/>
            <HealthSection/>
            <TeamCarousel />
        </section>
    );
}
