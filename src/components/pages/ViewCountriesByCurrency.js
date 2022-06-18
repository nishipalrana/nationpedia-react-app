import React, {useEffect, useState } from 'react';
import { makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Grid, TextField } from '@material-ui/core';
import {Link} from 'react-router-dom';
import axios from 'axios';
import { Autocomplete } from '@material-ui/lab';


const useStyles = makeStyles({
  root: {
    padding: 5,
    marginTop: 50,
    margin: 15,
    boxShadow: 3,
    marginBottom: 40,
  },
  media: {
    height: 140,

  },
  button:{
    background: '#34656d',
    color: '#fffbdf',
  },
  title:{
    marginBottom: 40,
    color: '#fffbdf',
    background: '#34656d',
    fontStyle: 'dense',
  },
  Searchbar:{
    width: 275,
    alignSelf: 'center',
    
  },
});

export default function ViewCountriesByCurrency() {
    const classes = useStyles();
    const [countryListByCurrency, getCountriesByCurrency]=useState([]);
    const [currencyList, updateCurrencyList]=useState([]);
    

    const getCurrencyList = () => {
        axios.get('https://restcountries.eu/rest/v2/all?fields=currencies;').then((response) =>{
            const countryCurrencyList=response.data;
            const currenciesList = countryCurrencyList.map((country) => country.currencies);
            let tempArray = [];
            currenciesList.forEach(element => {
              tempArray = element.code;  
            });
            
           
            console.log(tempArray);
            updateCurrencyList(currenciesList);
           
            console.log(currenciesList);
        });
        
        
    }

  

   const fetchList = () =>{

   }

    useEffect(() => {
        getCurrencyList();
      }, []);
    
    return (
  
      <div className={classes.root}>
        <Typography variant="h5" align="center" component="h1" className={classes.title}>
                  View Countries by Currency
                </Typography>
            
        <Grid
          container
          spacing={2}
          direction="row"
          justify="space-evenly"
          >

<Grid item className={classes.Searchbar}>
                  
                  <Autocomplete
                    id="currencyList"
                    options={currencyList}
                    classes={{
                      option: classes.option,
                    }}
                    autoHighlight
                    getOptionLabel={(option) => option.label}
                    renderOption={(option) => (
                      <React.Fragment>
                        <span>{currencyList(option.code)}</span>
                        ({option.name})
                      </React.Fragment>
                    )}

                    renderInput={(params) => (
                      <TextField {...params} label="Select the Currency" 
                      on margin="normal" 
                      variant="outlined" 
                      
                      onKeyPress={(event) => {
                            if (event.key === 'Enter') {
                          console.log(`Pressed keyCode ${event.key}`);
                          console.log(event.target.value);
                          event.preventDefault();
            
                        }
                      }}
                      />
                    )}
                  />
                   </Grid>

               
          </Grid>

         

          <Grid
        container
        spacing={2}
        direction="row"
        justify="space-evenly"

      >
        {countryListByCurrency.map(country => (<Grid item xs={12} sm={12} md={4} lg={3} xl={3} key={countryListByCurrency.indexOf(country)}>
          <Card className={classes.root}>

            <CardActionArea>
              <CardMedia
                key={countryListByCurrency.indexOf(country)}
                className={classes.media}
                image={country.flag}
                alt={country.name}
                title={country.name}
              />
              <CardContent>
                <Typography gutterBottom text align="left" fontSize="12" fontStyle="italic" component="h2">
                  {country.name}
                </Typography>

                <Typography variant="body2" align="left" color="textSecondary" component="h1">
                  {country.capital}
                </Typography>
              </CardContent>

            </CardActionArea>
            <CardActions>
            <Link to={`/viewCountryInfo/${country.name}`} style={{ textDecoration: 'none' }}>
              <Button size="small" color="primary">
                Learn More
       </Button>
       </Link>
            </CardActions>
          </Card>
        </Grid>
        ))}
      </Grid>




      </div>
    ) 
  }