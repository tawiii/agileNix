import React, { Component } from 'react';
import {getCoinList} from '../AC';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Pagination from './Pagination';
import Loading from './Loading';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 400,
  },
});

class PageQuestions extends Component {

  state = {
    currentPage: 0,
    offset: 10
  };

  componentDidMount() {
    this.props.getCoinList()
  }

  changePage = n => {
   this.setState({
     currentPage: n
   });
 };

  render () {
    const {classes, data, isLoading} = this.props;
    const {offset, currentPage} = this.state;
    const start = currentPage * offset;
    const end =  (+currentPage+1) * offset;
    if(isLoading) return <Loading />
    return (
      <div className="wrap">
        <h1>Coin list</h1>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>№</TableCell>
                <TableCell>Icon Coin</TableCell>
                <TableCell>Name Coin</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.keys(data).slice(start,end).map((row, i) => {
                return (
                  <TableRow key={data[row].Id}>
                    <TableCell component="th" scope="row">{`${currentPage}${i}`}</TableCell>
                    <TableCell>
                      <img
                        src={`https://www.cryptocompare.com${data[row].ImageUrl}`}
                        alt="icon"
                        className="icon-Coin" />
                    </TableCell>
                    <TableCell>{data[row].CoinName}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Paper>
        <Pagination
          pages={Math.ceil(Object.keys(data).length / offset)}
          current={currentPage}
          onChangePage={this.changePage}
        />
      </div>
    );
  }
}

export default connect((state) => ({
  data: state.coinList.data,
  isLoading: state.coinList.isLoading
}), {getCoinList})(withStyles(styles)(withRouter(PageQuestions)))
