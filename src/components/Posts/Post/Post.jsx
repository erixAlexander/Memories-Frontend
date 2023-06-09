import useStyles from "./styles.js";
import {
  CardActions,
  Card,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz.js";
import moment from "moment";
import { useDispatch } from "react-redux";
import { setId } from "../../../actions/currentId.js";
import { deletePost, likePost } from "../../../actions/posts.js";
import Like from "./Like.jsx";
import { useEffect, useState } from "react";

const Post = ({ post, currentPage, filter, setIsFiltered }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [user, setUser] = useState("");
  
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, []);

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image={post.selectedFile}
        title={post.title}
      />
      <div className={classes.overlay}>
        <Typography variant="h6">{post.name}</Typography>
        <Typography variant="body2">
          {moment(post.createdAt).fromNow()}
        </Typography>
      </div>
      <div className={classes.overlay2}>
        {user?.userInfo?._id === post?.creator && (
          <div className={classes.overlay2}>
            <Button
              onClick={() => dispatch(setId(post._id))}
              style={{ color: "white" }}
              size="small"
            >
              <MoreHorizIcon fontSize="medium" />
            </Button>
          </div>
        )}
      </div>
      <div className={classes.details}>
        <Typography variant="body2" color="textSecondary">
          {post.tags.map((tag) => {
            return `#${tag} `;
          })}
        </Typography>
      </div>
      <Typography className={classes.title} variant="h5" gutterBottom>
        {post.title}
      </Typography>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {post.message}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button
          size="small"
          color="primary"
          onClick={() => {
            dispatch(likePost(post._id));
          }}
        >
          <Like post={post} user={user} />
        </Button>
        {user?.userInfo?._id === post?.creator && (
          <Button
            size="small"
            color="secondary"
            onClick={() => {
              dispatch(
                deletePost(post._id, currentPage, filter, setIsFiltered)
              );
            }}
          >
            <DeleteIcon fontSize="small" /> Delete
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Post;
