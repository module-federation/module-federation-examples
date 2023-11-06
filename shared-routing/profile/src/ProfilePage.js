import React from 'react';
// @material-ui/core components
import InputLabel from '@material-ui/core/InputLabel';
import { Container, Grid, makeStyles, Typography } from '@material-ui/core';
import { useServiceContext } from 'shell/Service';

// core components
import GridItem from './components/Grid/GridItem.js';
import GridContainer from './components/Grid/GridContainer.js';
import CustomInput from './components/CustomInput/CustomInput.js';
import Button from './components/CustomButtons/Button.js';
import Card from './components/Card/Card.js';
import CardHeader from './components/Card/CardHeader.js';
import CardAvatar from './components/Card/CardAvatar.js';
import CardBody from './components/Card/CardBody.js';
import CardFooter from './components/Card/CardFooter.js';

import avatar from './assets/img/faces/zack.jpg';

const useStyles = makeStyles(theme => ({
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  avatarPic: {
    marginTop: '-10px',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    overflow: 'auto',
  },
  cardCategoryWhite: {
    color: 'rgba(255,255,255,.62)',
    margin: '0',
    fontSize: '14px',
    marginTop: '0',
    marginBottom: '0',
  },
  cardTitleWhite: {
    color: '#FFFFFF',
    marginTop: '0px',
    minHeight: 'auto',
    fontWeight: '300',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: '3px',
    textDecoration: 'none',
  },
}));

export default function UserProfile() {
  const classes = useStyles();
  const serviceContext = useServiceContext();
  React.useEffect(() => {
    serviceContext.setService({ title: 'Profile' });
  }, []);
  return (
    <main className={classes.content}>
      <div className={classes.appBarSpacer} />
      <Container maxWidth="lg" className={classes.container}>
        <Grid item xs={12}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={8}>
              <Card data-e2e="WIDGET__EDIT_PROFILE_BLOCK">
                <CardHeader>
                  <Typography component="h1" variant="h6" color="primary" gutterBottom>
                    Edit Profile
                  </Typography>
                  <Typography component="p" variant="subtitle1" color="primary" gutterBottom>
                    Complete your profile
                  </Typography>
                </CardHeader>
                <CardBody>
                  <GridContainer>
                    <GridItem data-e2e="FORM_FIELD__COMPANY_DISABLED" xs={12} sm={12} md={5}>
                      <CustomInput
                        labelText="Company (disabled)"
                        id="company-disabled"
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          disabled: true,
                        }}
                      />
                    </GridItem>
                    <GridItem data-e2e="FORM_FIELD__USERNAME" xs={12} sm={12} md={3}>
                      <CustomInput
                        labelText="Username"
                        id="username"
                        formControlProps={{
                          fullWidth: true,
                        }}
                      />
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem data-e2e="FORM_FIELD__FIRST_NAME" xs={12} sm={12} md={6}>
                      <CustomInput
                        labelText="First Name"
                        id="first-name"
                        formControlProps={{
                          fullWidth: true,
                        }}
                      />
                    </GridItem>
                    <GridItem data-e2e="FORM_FIELD__LAST_NAME" xs={12} sm={12} md={6}>
                      <CustomInput
                        labelText="Last Name"
                        id="last-name"
                        formControlProps={{
                          fullWidth: true,
                        }}
                      />
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem data-e2e="FORM_FIELD__CITY" xs={12} sm={12} md={4}>
                      <CustomInput
                        labelText="City"
                        id="city"
                        formControlProps={{
                          fullWidth: true,
                        }}
                      />
                    </GridItem>
                    <GridItem data-e2e="FORM_FIELD__COUNTRY" xs={12} sm={12} md={4}>
                      <CustomInput
                        labelText="Country"
                        id="country"
                        formControlProps={{
                          fullWidth: true,
                        }}
                      />
                    </GridItem>
                    <GridItem data-e2e="FORM_FIELD__POSTAL_CODE" xs={12} sm={12} md={4}>
                      <CustomInput
                        labelText="Postal Code"
                        id="postal-code"
                        formControlProps={{
                          fullWidth: true,
                        }}
                      />
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12} data-e2e="FORM_FIELD__USER_INFO">
                      <InputLabel style={{ color: '#AAAAAA' }}>About me</InputLabel>

                      <CustomInput
                        labelText="Lamborghini Mercy, Your chick she so thirsty, I'm in that two seat Lambo."
                        id="about-me"
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          multiline: true,
                          rows: 5,
                        }}
                      />
                    </GridItem>
                  </GridContainer>
                </CardBody>

                <CardFooter>
                  <Button color="primary">Update Profile</Button>
                </CardFooter>
              </Card>
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
              <Card data-e2e="WIDGET__CARD_PROFILE_BLOCK" profile>
                <CardAvatar data-e2e="CARD_PROFILE__IMAGE" profile>
                  <a href="#pablo" onClick={e => e.preventDefault()}>
                    <img src={avatar} className={classes.avatarPic} alt="..." />
                  </a>
                </CardAvatar>
                <CardBody profile>
                  <h6 className={classes.cardCategory}>PRINCIPAL ENGINEER</h6>
                  <h4 className={classes.cardTitle}>Zack Jackson</h4>
                  <p className={classes.description}>
                    Principal Engineer at lululemon <br />
                    Distributed JavaScript Orchestration at scale. Maintainer of Webpack, inventor
                    of Module Federation.
                  </p>
                  <Button color="primary" round>
                    Follow
                  </Button>
                </CardBody>
              </Card>
            </GridItem>
          </GridContainer>
        </Grid>
      </Container>
    </main>
  );
}
