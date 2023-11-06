import { Container, Grid, makeStyles } from '@material-ui/core';
import React from 'react';
import Widget from './Widget';
import { useServiceContext } from 'shell/Service';

const RecentOrders = React.lazy(() => import('order/RecentOrdersWidget'));
const SalesDeposits = React.lazy(() => import('sales/DepositsWidget'));
const SalesToday = React.lazy(() => import('sales/TodayWidget'));

const RecentOrderWidget = () => (
  <Widget height="500px">
    <RecentOrders />
  </Widget>
);

const SalesDepositsWidget = () => (
  <Widget height="240px">
    <SalesDeposits />
  </Widget>
);

const SalesTodayWidget = () => (
  <Widget height="240px">
    <SalesToday />
  </Widget>
);

const useStyles = makeStyles(theme => ({
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));

export default function Dashboard() {
  const classes = useStyles();
  const serviceContext = useServiceContext();
  React.useEffect(() => {
    serviceContext.setService({ title: 'Dashboard' });
  }, []);

  return (
    <main className={classes.content}>
      <div className={classes.appBarSpacer} />
      <Container maxWidth="lg" className={classes.container}>
        <Grid container spacing={3}>
          <Grid data-e2e="WIDGET__CHART_BLOCK" item xs={12} md={8} lg={9}>
            <SalesTodayWidget />
          </Grid>
          <Grid data-e2e="WIDGET__RECENT_DEPOSITS_BLOCK" item xs={12} md={4} lg={3}>
            <SalesDepositsWidget />
          </Grid>
          <Grid data-e2e="WIDGET__RECENT_ORDERS_BLOCK" item xs={12}>
            <RecentOrderWidget />
          </Grid>
        </Grid>
      </Container>
    </main>
  );
}
