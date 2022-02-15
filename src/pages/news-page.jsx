import { Hero } from '../cmps/news/hero';
import { HealthSection } from '../cmps/aboutUs/health-section';
import { TeamCarousel } from '../cmps/aboutUs/carousel';
import { Card } from '../cmps/news/news-card';
import { utilService } from '../services/util.service';
import { useState } from 'react';
import { useEffect } from 'react';
import { newsService } from '../services/news.service';
import SearchIcon from '@mui/icons-material/Search';
import { LabelCard } from '../cmps/news/label-card';

const labels = [
    'Coronavirus',
    'Health',
    'Research',
    'Food',
    'Dental',
    'Cardiology',
];
// const labels = ['Covid19' ,'General Health' , 'Science','Food','Dental','Cardiology']

export function News() {
    const [news, setNews] = useState(null);
    const [pagiCountrer, setPagiCountrer] = useState(0);
    const [filter, setfilter] = useState(null);
    const [currfilter, setCurrfilter] = useState([]);

    useEffect(async () => {
        pagination();
    }, []);

    useEffect(async () => {
        pagination();
    }, [filter, pagiCountrer]);

    const getNews = async () => {
        const news = await newsService.query();
        setNews((prev) => (prev = news));
        console.log('hi');
        return news;
    };

    const getLabelCount = (label) => {
        if (!news) return;
        const a = news.filter((item) =>
            item.keywords.some((keyWord) => keyWord.value.includes(label))
        );
        if (label === 'Research') return a.length + 1;
        return a.length;
    };

    const paging = (num) => {
        if (pagiCountrer === 0 && num === -1) return;
        setPagiCountrer((prev) => (prev += num));
        pagination(news);
    };

    const pagination = async () => {
        const Currnews = !news ? await getNews() : news;
        let count = 4;
        let cards = (filter || Currnews).slice();
        let cardToRender = pagiCountrer * count;
        if (cards.slice(cardToRender, cardToRender + 7).length === 0)
            setPagiCountrer((prev) => (prev = 0));
        pagiCountrer === 0
            ? setCurrfilter(
                  (prev) => (prev = cards.slice(cardToRender, cardToRender + 4))
              )
            : setCurrfilter(
                  (prev) => (prev = cards.slice(cardToRender, cardToRender + 4))
              );
    };

    const handleSearch = (ev) => {
        const value = ev.target.value;
        const filterNews = news.filter((item) =>
            item.headline.main
                .toLocaleLowerCase()
                .includes(value.toLocaleLowerCase())
        );
        setfilter((prev) => (prev = filterNews));
    };

    if (!news)
        return (
            <div className="puklse-con">
                <div class="pulse"></div>{' '}
            </div>
        );
    return (
        <section className="about-us-container">
            <Hero />
            <div className="flex about-us-main-container ">
                <div className="news-card-list">
                    {currfilter.map((item, idx) => (
                        <Card
                            key={item._id}
                            labels={labels}
                            item={item}
                            RandomInt={10 + idx}
                        />
                    ))}
                    <div className=" pagintion-continer flex justify-center align-center">
                        <div className="btns-container">
                            <button
                                className="sub-btn"
                                onClick={() => paging(-1)}
                            >
                                Previous
                            </button>
                            <div>{pagiCountrer + 1}</div>
                            <button
                                className="sub-btn"
                                onClick={() => paging(1)}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
                <div className="news-side-bar">
                    <div className="news-side-bar-serch">
                        <h3>Search</h3>
                        <div className="news-side-bar-serch-continer">
                            <input
                                placeholder="Type a keyword and hit enter"
                                onChange={handleSearch}
                            />
                            <button>
                                <SearchIcon />
                            </button>
                        </div>
                    </div>
                    <div className="side-bar-categories">
                        <h3>Categories</h3>
                        <div className="news-categories-card-list">
                            {labels.map((label) => (
                                <LabelCard
                                    key={label}
                                    getLabelCount={getLabelCount}
                                    label={label}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
