import { useState } from 'react';
import { LabTable } from './lab-table';
import footXRay from '../../assets/img/foot-x-rays.jpg';
import handXRay from '../../assets/img/hand-x-rays.png';
import bloodTestRes from '../../assets/img/blood-test-result.png';
import ironTestRes from '../../assets/img/iron-test-results.png';
import { useSelector } from 'react-redux';

export function Lab() {
    const { user } = useSelector((state) => state.userModule);
    const [filteredRes, setFilterRes] = useState(null);

    const labRes = [
        {
            date: Date.now(),
            title: 'Foot X-Ray',
            img: footXRay,
            imgType: 'JPEG',
            sizeX: 170,
            sizeY: 200,
            startX: 20,
        },
        {
            date: Date.now() + 1000 * 60 * 24 * 7,
            title: 'Hand X-Ray',
            img: handXRay,
            imgType: 'PNG',
            sizeX: 170,
            sizeY: 200,
            startX: 20,
        },
        {
            date: Date.now() + 1000 * 60 * 24 * 14,
            title: 'Blood test',
            img: bloodTestRes,
            imgType: 'PNG',
            sizeX: 170,
            sizeY: 200,
            startX: 20,
        },
        {
            date: Date.now() + 1000 * 60 * 24 * 21,
            title: 'Iron test',
            img: ironTestRes,
            imgType: 'PNG',
            sizeX: 210,
            sizeY: 70,
            startX: 0,
        },
    ];

    const filterResults = ({ target }) => {
        const filteredResults = labRes.filter((res) =>
            res.title.toLowerCase().includes(target.value)
        );
        setFilterRes((prev) => (prev = filteredResults));
    };

    return (
        <div className="lab-main-container">
            <div className="main-content-header">Labs Results</div>
            <input
                onChange={filterResults}
                className="patient-search-input"
                type="text"
                placeholder="Search Appointments..."
            />
            <LabTable labRes={filteredRes || labRes} user={user} />
        </div>
    );
}
