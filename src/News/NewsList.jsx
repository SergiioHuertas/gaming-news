import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const NewsList = () => {
    const [articles, setArticles] = useState([]);

    const fetchArticles = async () => {
        try {
            const response = await axios.get('https://newsapi.org/v2/everything?sortBy=publishedAt', {
                params: {
                    q: 'videojuegos',
                    language: 'es',
                    apiKey: '29c7462586634961818d175360e6cfdc'
                }
            });
            setArticles(response.data.articles);
        } catch (error) {
            console.error('Error fetching the news articles:', error);
        }
    };

    useEffect(() => {
        fetchArticles().then(console.log('articles', articles));
    }, []);

    return (
        <div>
            <h1>Noticias de Videojuegos</h1>
            <ul>
                {articles.map((article, index) => (
                    <div className={"card-new"} onClick={() => window.open(article.url)} key={index}>
                        <h2 className={"new-title"}>{article.title}</h2>
                        <img className={"new-img"} src={article.urlToImage} alt={article.title} width={500} />
                        <p className={"new-description"}>{article.description}</p>
                    </div>
                ))}
            </ul>
        </div>
    );
};