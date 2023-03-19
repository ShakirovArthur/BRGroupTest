import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Button, ListItem, ListItemText } from "@mui/material";
import { convertText } from "./Utils";

const Comment = ({commentId, lastUpdateComment, depth = 0}) => {
    const [comment, setComment] = useState();
    const [isDisplayComment, setIsDisplayComment] = useState(false);

    const memoizedHtml = useMemo(() => convertText(comment?.text), [comment?.text]);

    const handleDisplayComment = useCallback(() => {
        setIsDisplayComment(!isDisplayComment);
    }, [isDisplayComment]);

    useEffect(() => { //вынести в hackerAPI

        fetch(`https://hacker-news.firebaseio.com/v0/item/${commentId}.json?print=pretty`)
            .then((res) => res.json())
            .then((data) => {
                setComment(data);

            });
    }, [commentId, lastUpdateComment]);

    return (
        <>
            <ListItem style={{paddingLeft: `${depth * 20}px`}}>
                <ListItemText primary={`Автор: ${comment?.by}`}
                              secondary={<div dangerouslySetInnerHTML={memoizedHtml}/>}/>
            </ListItem>
            <Button onClick={handleDisplayComment}>Загрузить</Button>
            {isDisplayComment ?
                comment?.kids?.map((id) => (
                    <Comment
                        key={id}
                        commentId={id}
                        depth={depth + 1}
                        lastUpdateComment={lastUpdateComment}
                    />
                )) : ""}
        </>
    );
};


export default Comment;