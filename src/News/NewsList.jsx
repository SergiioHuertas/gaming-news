import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Constants from '../common/const';
import { format } from 'date-fns';
import { es } from 'date-fns/locale'

export const NewsList = () => {
    const [articles, setArticles] = useState([]);
    const [results, setResults] = useState(Constants.resultsPerPage);
    const [totalResults, setTotalResults] = useState(0);

    const fetchArticles = async () => {
        try {
            const response = await axios.get(`${Constants.API_URL}?sortBy=publishedAt&pageSize=${results}`, {
                params: {
                    q: Constants.searchFor,
                    language: Constants.language,
                    apiKey: import.meta.env.VITE_API_URL
                }
            });
            setArticles(response.data.articles);
            setTotalResults(response.data.totalResults);
        } catch (error) {
            console.error('Error fetching the news articles:', error);
        }
    };

    useEffect(() => {
        fetchArticles();
    }, [results]);

    return (
        <div>
            <h1>Noticias de Videojuegos</h1>
            <ul>
                {articles.map((article, index) => { 
                    return (
                    <div className={"card-new"} onClick={() => window.open(article.url)} key={index}>
                        <div className='tags-menu'>
                            <div className='tag'>{article.source?.name}</div>
                            <div className='tag'>{format(new Date(article.publishedAt), "dd/MM/yyyy", {locale: es})}</div>
                        </div>
                        <h2 className={"new-title"}>{article.title}</h2>
                        <img className={"new-img"} src={article.urlToImage} alt={article.title} width={500} />
                        <p className={"new-description"}>{article.description}</p>
                    </div>
                )}
                )}
            </ul>

            {results < totalResults && 
              <button onClick={() => setResults(results + Constants.resultsPerPage)}>Cargar más</button>
            }
        </div>
    );
};