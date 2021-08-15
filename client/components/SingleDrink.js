import React from "react";
import {
  makeStyles,
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import {red} from "@material-ui/core/colors";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import DeleteIcon from "@material-ui/icons/Delete";

let theme = createTheme();
theme = responsiveFontSizes(theme);

const useStyles = makeStyles((theme) => ({
  root: {
    // maxWidth: 345,
    marginBottom: 15,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
}));

export default function SingleDrink(props) {
  const {drink, removeDrink} = props;
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <ThemeProvider theme={theme}>
        <CardHeader
          title={drink.name}
          titleTypographyProps={{variant: "h2", gutterBottom: "true"}}
          subheader={drink.alcoholic}
          subheaderTypographyProps={{variant: "h4", gutterBottom: "true"}}
        />

        <CardMedia
          className={classes.media}
          image={`${drink.imgUrl}`}
          title={drink.name}
        />
        <CardContent>
          <Typography variant="h4" color="textSecondary" component="p">
            {`${drink.category} served in a ${drink.glass}`}
          </Typography>
        </CardContent>
        <CardActions>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography variant="h4" gutterBottom style={{fontWeight: "bold"}}>
              Ingredients:
            </Typography>
            {drink.ingredients.map((ing, index) => {
              return drink.measurements[index] ? (
                <Typography
                  variant="h5"
                  gutterBottom
                  key={index}
                >{`- ${drink.measurements[index]} ${ing} `}</Typography>
              ) : (
                <Typography
                  variant="h5"
                  gutterBottom
                  key={index}
                >{`- ${ing}`}</Typography>
              );
            })}
            <Typography variant="h4" gutterBottom style={{fontWeight: "bold"}}>
              Directions:
            </Typography>
            <Typography variant="h5" gutterBottom>
              {drink.instructions}
            </Typography>
            <IconButton
              aria-label="delete"
              onClick={() => {
                removeDrink(drink);
              }}
            >
              <DeleteIcon />
            </IconButton>
          </CardContent>
        </Collapse>
      </ThemeProvider>
    </Card>
  );
}
