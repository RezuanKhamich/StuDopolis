import React from "react";
import {Link} from "react-router-dom";
import MainPageTitle from "../../components/MainPageTitle";
import {Card, CardActions, CardContent, CardMedia, Grid, Typography} from "@mui/material";
import Button from '@mui/material/Button';
import courseIcon from './media/courseWallpaper/wallpaperJS.png'

const coursesData = [
  { name: 'Python - разработка',
    iconURL: courseIcon,
    description: `Lizards are a widespread group of squamate reptiles, with over 6,000 
    species, ranging across all continents except Antarctica`
  },
  { name: 'Веб-дизайн',
    iconURL: courseIcon,
    description: `Lizards are a widespread group of squamate reptiles, with over 6,000 
    species, ranging across all continents except Antarctica`
  },
  { name: 'Unity - разработка игр',
    iconURL: courseIcon,
    description: `Lizards are a widespread group of squamate reptiles, with over 6,000 
    species, ranging across all continents except Antarctica`
  },
  { name: 'Digital Art',
    iconURL: courseIcon,
    description: `Lizards are a widespread group of squamate reptiles, with over 6,000 
    species, ranging across all continents except Antarctica`
  },
  { name: 'Программирование на Minecraft',
    iconURL: courseIcon,
    description: `Lizards are a widespread group of squamate reptiles, with over 6,000 
    species, ranging across all continents except Antarctica`
  },
  { name: 'Web-разработка',
    iconURL: courseIcon,
    description: `Lizards are a widespread group of squamate reptiles, with over 6,000 
    species, ranging across all continents except Antarctica`
  },
  { name: 'Программирование на С++',
    iconURL: courseIcon,
    description: `Lizards are a widespread group of squamate reptiles, with over 6,000 
    species, ranging across all continents except Antarctica`
  },
  { name: '3D моделирование',
    iconURL: courseIcon,
    description: `Lizards are a widespread group of squamate reptiles, with over 6,000 
    species, ranging across all continents except Antarctica`
  },
  { name: 'Разработка игр в Unreal Engine',
    iconURL: courseIcon,
    description: `Lizards are a widespread group of squamate reptiles, with over 6,000 
    species, ranging across all continents except Antarctica`
  },
  { name: 'Космическое проектирование в KSP',
    iconURL: courseIcon,
    description: `Lizards are a widespread group of squamate reptiles, with over 6,000 
    species, ranging across all continents except Antarctica`
  },
]

const Courses = () => {
  return (
    <>
      <MainPageTitle>Выбери направление и стань профи</MainPageTitle>

      <Grid style={{maxWidth: 1190, margin: "auto"}} container rowSpacing={5} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {
          coursesData.map(elem => (
            <Grid item xs={4}>
              <Card sx={{ maxWidth: 345 }} style={{height: 395, position: 'relative'}}>
                <CardMedia
                  component="img"
                  height="140"
                  image={elem.iconURL}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {elem.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {elem.description}
                  </Typography>
                </CardContent>
                <CardActions style={{textAlign: 'center', position: 'absolute', bottom: 0, right: 0}}>
                  <Link to="modules">
                    <Button size="small">Посмотреть</Button>
                  </Link>
                </CardActions>
              </Card>
            </Grid>
          ))
        }
      </Grid>
    </>
  )
}

export default Courses