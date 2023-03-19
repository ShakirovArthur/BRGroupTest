const NEWS_LIMIT = 100;

export const loadTopNewsId = fetch("https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty")
    .then((res) => res.json())
    .then((data) => {
        return data.slice(0, NEWS_LIMIT);
    });

export const loadNews = (postId) => {
    return fetch(`https://hacker-news.firebaseio.com/v0/item/${postId}.json?print=pretty`)
        .then((res) => res.json());

};