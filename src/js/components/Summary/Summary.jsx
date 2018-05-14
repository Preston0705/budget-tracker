import React from "react";

function calculateSum(lineItems) {
  return lineItems.reduce((acc, lineItem) => acc + lineItem.amount, 0);
}

Number.prototype.formatMoney = function(c, d, t){
  var n = this, 
  c = isNaN(c = Math.abs(c)) ? 2 : c, 
  d = d == undefined ? "." : d, 
  t = t == undefined ? "," : t, 
  s = n < 0 ? "-" : "", 
  i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))), 
  j = (j = i.length) > 3 ? j % 3 : 0;
 return s + "$" + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};

class Summary extends React.Component {
  render() {
    const { incomeItems, expenseItems } = this.props;

    const incomeTotal = calculateSum(incomeItems);
    const expenseTotal = calculateSum(expenseItems);
    const difference = (Math.round((incomeTotal - expenseTotal) * 100) / 100
    );

    return (
      <div className="card border-info mb-3">
        <div className="card-header text-white bg-info">Summary</div>
        <div className="card-body">
          <div className="container">
            <div className="row">
              <div className="col-6 text-center">
                <h6 className="h6 strong">Total Income</h6>
                <p>{(incomeTotal).formatMoney(2)}</p>
              </div>
              <div className="col-6 text-center">
                <h6 className="h6 strong">Total Expenses</h6>
                <p>{(expenseTotal).formatMoney(2)}</p>
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col-6 text-center">
                <h6 className="h6 strong">Left after spending</h6>
                <p>{(difference).formatMoney(2)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Summary;
