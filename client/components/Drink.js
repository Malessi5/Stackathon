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
import FavoriteIcon from "@material-ui/icons/Favorite";
import SaveIcon from "@material-ui/icons/Save";
import Button from "@material-ui/core/Button";
import CasinoIcon from "@material-ui/icons/Casino";
import {useAuth} from "../contexts/AuthContext";

let theme = createTheme();
theme = responsiveFontSizes(theme);

const useStyles = makeStyles((theme) => ({
  root: {
    // maxWidth: 450,
    // alignSelf: "center",
    marginBottom: 5,
    marginTop: 20,
  },
  media: {
    height: 0,
    paddingTop: "75%",
    // paddingTop: '56.25%', // 16:9
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

export default function Drink(props) {
  const {drink, saveDrink, findAnother, uid, saved} = props;
  const classes = useStyles();
  const {currentUser} = useAuth();
  function saveHandle() {
    console.log(uid);
    saveDrink(drink, uid, saved);
  }

  return (
    <Card className={classes.root}>
      <ThemeProvider theme={theme}>
        <CardHeader
          title={drink.name}
          titleTypographyProps={{variant: "h2", gutterBottom: true}}
          subheader={drink.alcoholic}
          subheaderTypographyProps={{variant: "h4", gutterBottom: true}}
          action={
            currentUser && (
              <Button
                className={classes.button}
                variant='text'
                color='secondary'
                aria-label='delete'
                onClick={saveHandle}
                // startIcon={}
              >
                <FavoriteIcon />
              </Button>
            )
            // <Button
            //   className={classes.button}
            //   variant='contained'
            //   color='default'
            //   aria-label='search'
            //   onClick={() => {
            //     findAnother();
            //   }}
            // >
            //   <CasinoIcon />
            // </Button>
          }
        />
        <CardMedia
          className={classes.media}
          image={`${drink.imgUrl}`}
          title={drink.name}
        />
      </ThemeProvider>
      <CardContent>
        <Typography variant='h4' color='textSecondary' component='p'>
          {`${drink.category} served in a ${drink.glass}`}
        </Typography>
      </CardContent>
      <CardContent>
        <ThemeProvider theme={theme}>
          <Typography variant='h4' gutterBottom style={{fontWeight: "bold"}}>
            Ingredients:
          </Typography>
          {drink.ingredients.map((ing, index) => {
            return drink.measurements[index] ? (
              <Typography
                variant='h5'
                gutterBottom
                key={index}
              >{`- ${drink.measurements[index]} ${ing} `}</Typography>
            ) : (
              <Typography
                key={index}
                variant='h5'
                gutterBottom
              >{`- ${ing}`}</Typography>
            );
          })}
          <Typography variant='h4' gutterBottom style={{fontWeight: "bold"}}>
            Directions:
          </Typography>
          <Typography variant='h5' gutterBottom>
            {drink.instructions}
          </Typography>
          {/* {currentUser && (
            <Button
              className={classes.button}
              variant='contained'
              color='primary'
              aria-label='delete'
              onClick={saveHandle}
              startIcon={<SaveIcon />}
            >
              Save
            </Button>
          )} */}
        </ThemeProvider>
      </CardContent>
    </Card>
  );
}
