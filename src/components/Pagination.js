import React, { Component } from 'react';

class Pagination extends Component {

  onChangePage = e => {
    const {pages} = this.props;
    const dataSet = e.target.dataset.page;
    if (dataSet < 0 || dataSet > pages - 1) return
      this.props.onChangePage(dataSet);
  };

  pagEnd = 5;
  pagStart = 0;

  handlePagination = () => {
    const {current} = this.props;

    if (+current === this.pagEnd - 1) {
      this.pagEnd += 2;
      this.pagStart += 2;
    } else if (+current === this.pagStart && this.pagStart) {
      this.pagStart -= 2;
      this.pagEnd -= 2;
    }
  }

  render () {
    const {pages, current} = this.props;
    this.handlePagination();
    let paginationList = [];
    for (let i = 0; i < pages; i++) {
      paginationList.push(
        <li
          data-page={i}
          onClick={this.onChangePage}
          key={i}
          className={i === +current ? "active" : ""}
        >
          {i + 1}
        </li>
      );
    }
    return (
      <ul className="pagi">
        <li data-page={+current - 1} onClick={this.onChangePage}>-</li>
        {paginationList.slice(this.pagStart, this.pagEnd)}
        <li data-page={+current + 1} onClick={this.onChangePage}>+</li>
      </ul>
    );
  }
}

export default Pagination;
