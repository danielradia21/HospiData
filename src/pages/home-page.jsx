import { CardList } from '../cmps/homepage/card-list';
import { Hero } from '../cmps/homepage/hero';
import {HealthSection} from  '../cmps/homepage/health-section'
import { DocCarousel } from '../cmps/homepage/carousel';
export function HomePage() {
    return (
        <section className='home-page-container'>
            <Hero />
            <CardList />
            <HealthSection/>
            <DocCarousel/>
        </section>
    );
}
