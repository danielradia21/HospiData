import { CardList } from '../cmps/homepage/card-list';
import { Hero } from '../cmps/homepage/hero';
import {HealthSection} from  '../cmps/homepage/health-section'
export function HomePage() {
    return (
        <section>
            <Hero />
            <CardList />
            <HealthSection/>
        </section>
    );
}
