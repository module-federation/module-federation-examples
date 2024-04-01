import React from 'react';
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';
import { orders } from './data';

function Title() {
  return (
    <Typography component="h2" variant="h6" color="primary" gutterBottom>
      Recent Orders
    </Typography>
  );
}

function OrderRow(props) {
  return (
    <TableRow key={props.order.id} data-e2e="RECENT_ORDERS_WIDGET__ORDER_ROW">
      <TableCell data-e2e="RECENT_ORDERS_WIDGET__DATE_CELL">{props.order.date}</TableCell>
      <TableCell data-e2e="RECENT_ORDERS_WIDGET__NAME_CELL">{props.order.name}</TableCell>
      <TableCell data-e2e="RECENT_ORDERS_WIDGET__SHIP_TO_CELL">{props.order.shipTo}</TableCell>
      <TableCell data-e2e="RECENT_ORDERS_WIDGET__PAYMENT_METHOD_CELL">{props.order.paymentMethod}</TableCell>
      <TableCell align="right" data-e2e="RECENT_ORDERS_WIDGET__SALE_AMOUNT_CELL">{props.order.amount}</TableCell>
    </TableRow>
  );
}

export default function RecentOrdersWidget() {
  return (
    <Box display="flex" flexDirection="column" flex={1}>
      <Title />
      <Box flex={1}>
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
      </Box>
      <Box mt={3}>
        <Button color="primary">See more orders</Button>
      </Box>
    </Box>
  );
}
