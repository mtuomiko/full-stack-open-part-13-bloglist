CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author TEXT,
    url TEXT NOT NULL,
    title TEXT NOT NULL,
    likes INTEGER NOT NULL DEFAULT 0
);

INSERT INTO blogs (author, url, title)
VALUES ('Elina', 'chocochili.net', 'Chocochili vegaaniruokablogi');

INSERT INTO blogs (url, title)
VALUES ('dummy.addr', 'Unknown author blog');
