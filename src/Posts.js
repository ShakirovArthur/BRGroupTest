import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";
import { convertTime } from "./Utils";
import { loadNews, loadTopNewsId } from "./HackerNewsAPI";


const REFRESH_INTERVAL = 60_000; // 1 minute


export const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [post, setPost] = useState([]);
    const [updatePosts, setUpdatePosts] = useState(false);

    useEffect(() => {
        loadTopNewsId.then((data) => setPosts(data));
        const intervalId = setInterval(() => {
            loadTopNewsId.then((data) => setPosts(data));
        }, REFRESH_INTERVAL);
        return () => clearInterval(intervalId);
    }, []);


    useEffect(() => {
        Promise.all(
            posts.map((postId) => {
                    return loadNews(postId);
                }
            )).then((data) => {
            data.sort((a, b) => b.time - a.time);
            setPost(data);
        });


    }, [posts, updatePosts]);

    const handleUpdatePosts = useCallback(() => {
        setUpdatePosts(!updatePosts);
    }, [updatePosts]);

    return (
        <div className="Posts">
            <Button variant="contained" color="primary" onClick={handleUpdatePosts}>Обновить</Button>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell>Score</TableCell>
                            <TableCell>By</TableCell>
                            <TableCell className="time">Time</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {post?.map((item) => (
                            <TableRow key={item?.id}>
                                <TableCell>
                                    <Link to={`/${item?.id}`}>{item?.title}</Link>
                                </TableCell>
                                <TableCell>{item?.score}</TableCell>
                                <TableCell>{item?.by}</TableCell>
                                <TableCell className="time">{convertTime(item?.time)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};