import { useParams, Link } from "react-router-dom";
import React, { useState, useEffect, useCallback } from "react";
import Comment from "./Comment";
import { Button, List, ListItem, Typography } from "@mui/material";
import { convertTime } from "./Utils";

export const Post = () => {
    const {item} = useParams();
    const [post, setPost] = useState(null);
    const [lastTimeUpdateComment, setLastTimeUpdateComment] = useState();

    useEffect(() => {
        fetch(`https://hacker-news.firebaseio.com/v0/item/${item}.json?print=pretty`)
            .then((res) => res.json())
            .then((data) => {
                setPost(data);
                setLastTimeUpdateComment(new Date());
            });
    }, [item]);
    const handleUpdateComment = useCallback(() => {
        setLastTimeUpdateComment(new Date());
    }, [lastTimeUpdateComment]);

    return (
        <div className="pokemon">
            <List>
                <ListItem>
                    <Typography>URL: {post?.url}</Typography>
                </ListItem>
                <ListItem>
                    <Typography>Title: {post?.title}</Typography>
                </ListItem>
                <ListItem>
                    <Typography>Time: {convertTime(post?.time)}</Typography>
                </ListItem>
                <ListItem>
                    <Typography>Author: {post?.by}</Typography>
                </ListItem>
            </List>
            <Button variant="contained" color="primary" onClick={handleUpdateComment}>
                Reload comments
            </Button>
            <Typography>Number of comments: {post?.kids?.length ? post?.kids?.length : 0}</Typography>
            <List>
                {post?.kids?.map((id) => (
                    <Comment
                        key={id}
                        commentId={id}
                        lastUpdateComment={lastTimeUpdateComment}
                    />
                ))}
            </List>
            <Button><Link to="/">Назад</Link></Button>
        </div>
    );
};


