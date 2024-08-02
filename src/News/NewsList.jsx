import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import Constants from '../common/const';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { SyncLoader } from 'react-spinners';
import './style.css';

export const NewsList = () => {
    const [articles, setArticles] = useState([]);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const observerRef = useRef();

    const fetchArticles = async (pageNum) => {
        setIsLoading(true);
        try {
            const response = await axios.get(`${Constants.API_URL}?sortBy=publishedAt&pageSize=${Constants.resultsPerPage}&page=${pageNum}`, {
                params: {
                    q: Constants.searchFor,
                    language: Constants.language,
                    apiKey: import.meta.env.VITE_API_URL
                }
            });

            setArticles(prevArticles => pageNum === 1 ? response.data.articles : [...prevArticles, ...response.data.articles]);
            setTotalResults(response.data.totalResults);
        } catch (error) {
            console.error('Error fetching the news articles:', error);
        }finally {
            setIsLoading(false);
        }
    };

    const handleObserver = useCallback((entries) => {
        const target = entries[0];
        if (target.isIntersecting && articles.length < totalResults) {
            setPage(prevPage => prevPage + 1);
        }
    }, [articles.length, totalResults]);

    useEffect(() => {
        fetchArticles(page);
    }, [page]);

    useEffect(() => {
        const options = {
            root: null,
            rootMargin: "20px",
            threshold: 0.5
        };

        observerRef.current = new IntersectionObserver(handleObserver, options);
        const target = document.querySelector('#load-more-trigger');
        if (target) observerRef.current.observe(target);

        return () => {
            if (observerRef.current && target) {
                observerRef.current.unobserve(target);
            }
        };
    }, [handleObserver]);

    return (
        <>
            <h1>Noticias de Videojuegos</h1>
            {isLoading && <SyncLoader color="#40f700" margin="3" />}
            <ul>
                {articles.map((article, index) => (
                    <div className={"card-new"} onClick={() => window.open(article.url)} key={index}>
                        <div className='tags-menu'>
                            <p className='tag'>{article.source?.name}</p>
                            <p className='tag'>{format(new Date(article.publishedAt), "dd/MM/yyyy", {locale: es})}</p>
                        </div>
                        <h2 className={"new-title"}>{article.title}</h2>
                        <img className={"new-img"} src={article.urlToImage} alt={article.title} width={500} />
                        <p className={"new-description"}>{article.description}</p>
                    </div>
                ))}
            </ul>

            <div id="load-more-trigger"></div>
        </>
    );
};
