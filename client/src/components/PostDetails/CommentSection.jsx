import React, { useState, useRef } from 'react';
import { Typography, TextField, Button, Paper } from '@material-ui/core/';
import { useDispatch } from 'react-redux';
import ChatIcon from '@material-ui/icons/Chat';

import { commentPost } from '../../actions/posts';
import useStyles from './styles';

const CommentSection = ({ post }) => {
  const user = JSON.parse(localStorage.getItem('profile'));
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();
  const [comments, setComments] = useState(post?.comments);
  const classes = useStyles();
  const commentsRef = useRef();

  const handleComment = async () => {
    const newComment = `${user?.result?.name}: ${comment}`;
    await dispatch(commentPost(newComment, post._id));

    setComments([...comments, newComment]);
    setComment('');
    commentsRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  if(!user?.result?.name){
    return(
        <Paper className={classes.paper}>
            <Typography variant="h6" align="center">
               Please Sign In, or Sign Up to view, and write comments on this echo!
            </Typography>
        </Paper>
    );
  }

  return (
    <div>
      <div className={classes.commentsOuterContainer}>
        <div className={classes.commentsInnerContainer}>
          <Typography gutterBottom variant="h6">Comments</Typography>
          {comments?.map((c, i) => (
            <Typography key={i} gutterBottom variant="subtitle1">
              <strong>{c.split(': ')[0]}</strong>
              {c.split(':')[1]}
            </Typography>
          ))}
          <div ref={commentsRef} />
        </div>
        <div style={{ width: '70%' }}>
          <Typography gutterBottom variant="h6">Comment on this echo</Typography>
          <TextField fullWidth minRows={4} variant="outlined" label="Comment" multiline value={comment} onChange={(e) => setComment(e.target.value)} />
          <br />
          <Button style={{ marginTop: '10px' }} fullWidth disabled={!comment.length} color="primary" variant="contained" onClick={handleComment} startIcon={<ChatIcon />}>
            Comment
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CommentSection;