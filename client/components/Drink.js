import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CasinoIcon from '@material-ui/icons/Casino';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 345,
    marginBottom: 15,
  },
  media: {
    height: 0,
    paddingTop: '75%',
    // paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
}));

export default function SingleDrink(props) {
  const { drink, saveDrink, findAnother } = props;
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader title={drink.name} subheader={drink.alcoholic} />

      <CardMedia
        className={classes.media}
        image={`${drink.imgUrl}`}
        title={drink.name}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {`${drink.category} served in a ${drink.glass}`}
        </Typography>
      </CardContent>
      <CardContent>
        <Typography paragraph style={{ fontWeight: 'bold' }}>
          Ingredients:
        </Typography>
        {drink.ingredients.map((ing, index) => {
          return drink.measurements[index] ? (
            <Typography
              paragraph
              key={index}
            >{`- ${drink.measurements[index]} ${ing} `}</Typography>
          ) : (
            <Typography paragraph>{`- ${ing}`}</Typography>
          );
        })}
        <Typography paragraph style={{ fontWeight: 'bold' }}>
          Directions:
        </Typography>
        <Typography paragraph>{drink.instructions}</Typography>
        <IconButton
          aria-label="favorite"
          onClick={() => {
            saveDrink(drink);
          }}
        >
          <FavoriteIcon />
        </IconButton>
        <IconButton
          aria-label="search"
          onClick={() => {
            findAnother();
          }}
        >
          <CasinoIcon />
        </IconButton>
      </CardContent>
    </Card>
  );
}
