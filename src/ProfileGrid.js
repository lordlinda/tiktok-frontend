import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 500,
    height: 450,
  },
  video: {
    height: "100%",
    width: "200px",
    backgroundPosition: "center",
    objectFit: "cover",
  },
}));

export default function ImageGridList(props) {
  const classes = useStyles();
  const getFileExtension = (url) => {
    if (url) {
      const name = url.slice(((url.lastIndexOf(".") - 1) >>> 0) + 2);
      return name.split("?")[0];
    }
  };

  return (
    <div className={classes.root}>
      <GridList cellHeight={160} className={classes.gridList} cols={6}>
        {props.posts.map((post) => (
          <GridListTile key={post._id} cols={post.cols || 3}>
            {getFileExtension(post.url) === "jpg" ? (
              <img src={post.url} alt="" />
            ) : (
              <video controls className={classes.video} src={post.url}></video>
            )}
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}
