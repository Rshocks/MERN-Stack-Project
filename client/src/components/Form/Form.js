import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import FileBase from 'react-file-base64';
import useStyles from './styles'
import { useDispatch, useSelector } from 'react-redux';
import { createPost, updatePost } from "../../actions/posts";
import { useHistory } from "react-router-dom";
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

//get current id of the post on

const Form = ({ currentId, setCurrentId }) => {
    const [postData, setPostData] = useState({ title: '', message: '', tags: '', selectedFile: ''});
    const post = useSelector((state) => currentId ? state.posts.posts.find((p) => p._id === currentId) : null);
    
    const classes = useStyles();
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));
    const history = useHistory();

    useEffect(() =>{
        if(post) setPostData(post);
    }, [post])

    const clear = () => {
        //setCurrentId(null);
        setPostData({ title: '', message: '', tags: '', selectedFile: '' });
      };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(currentId === 0){
            dispatch(createPost({ ...postData, name: user?.result?.name }, history));
            clear();
        } else {
            dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));
            clear();
        }
    };

    if(!user?.result?.name){
        return(
            <Paper className={classes.paper}>
                <Typography className={classes.signInUp} variant="h6" align="center">
                    Please Sign In, or Sign Up to like and create your own Echo!
                </Typography>
            </Paper>
        );
    }

    return (
        <Paper className={classes.paper} elevation={6}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography className={classes.echoTitle} varient="h6">{currentId ? 'Editing' : 'Creating' } a Echo</Typography>
                <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })}/>
                <TextField name="message" variant="outlined" label="Message" fullWidth value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })}/>
                <TextField name="tags" variant="outlined" label="Tags comma to seperate" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })}/>
                <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} /></div>
                <Button startIcon={<NoteAddIcon />} className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Post</Button>
                <Button startIcon={<DeleteOutlineIcon />} variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
            </form>
        </Paper>
    );
}

export default Form;