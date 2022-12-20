import {
  Container,
  Grid,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Paper,
} from '@material-ui/core';
import React from 'react';
import { orders } from './data';
import { useServiceContext } from 'shell/Service';

function preventDefault(event) {
  event.preventDefault();
}

function Title() {
  return (
    <Typography component="h2" variant="h6" color="primary" gutterBottom>
      Recent Orders
    </Typography>
  );
}

function OrderRow(props) {
  return (
    <TableRow data-e2e="ORDERS_WIDGET__ORDER_ROW" key={props.order.id}>
      <TableCell data-e2e="ORDERS_WIDGET__DATE_CELL">{props.order.date}</TableCell>
      <TableCell data-e2e="ORDERS_WIDGET__NAME_CELL">{props.order.name}</TableCell>
      <TableCell data-e2e="ORDERS_WIDGET__SHIP_TO_CELL">{props.order.shipTo}</TableCell>
      <TableCell data-e2e="ORDERS_WIDGET__PAYMENT_METHOD_CELL">{props.order.paymentMethod}</TableCell>
      <TableCell data-e2e="ORDERS_WIDGET__SALE_AMOUNT_CELL" align="right">{props.order.amount}</TableCell>
    </TableRow>
  );
}

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
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    overflow: 'auto',
  },
}));

export default function OrderService() {
  const classes = useStyles();
  const serviceContext = useServiceContext();
  React.useEffect(() => {
    serviceContext.setService({ title: 'Orders' });
  }, []);
  return (
    <main className={classes.content}>
      <div className={classes.appBarSpacer} />
      <Container maxWidth="lg" className={classes.container}>
        <Grid data-e2e="WIDGET__RECENT_ORDERS_BLOCK" item xs={12}>
          <Paper className={classes.paper}>
            <Typography component="h1" variant="h6" color="primary" gutterBottom>
              Orders
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Ship To</TableCell>
                  <TableCell>Payment Method</TableCell>
                  <TableCell align="right">Sale Amount</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map(order => (
                  <OrderRow order={order} key={order.id} />
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Grid>
      </Container>
    </main>
  );
}
