import React from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

/**
 * A simple table demonstrating the hierarchy of the `Table` component and its sub-components.
 */
export default class EditorTable extends React.Component{
    constructor(props) {
        super(props)
    }
    buildBody(data){
        if(data['result-set']=== undefined){
            return
        }
        var rows = data['result-set'].docs
        var count = data['result-set'].docs.length
        return rows.map(this.buildRow.bind(this))
    }
    buildRow(row){
        var fields = Object.values(row);
        return <TableRow>{fields.map(this.buildRowColumn)}</TableRow>
    }
    buildRowColumn(rowColData){
        return <TableRowColumn>{rowColData}</TableRowColumn>
    }

    buildColumnHeader(data){
        return <TableHeaderColumn>{data}</TableHeaderColumn>;
    }
    buildColumnHeaders(res){
        if(res['result-set'] === undefined ||res['result-set'].docs.length <1){return}
        var headers = Object.keys(res['result-set'].docs[0]);
        return headers.map(this.buildColumnHeader);
    }
    render(){
        if(this.props.data === undefined || Object.keys(this.props.data).length < 1){
            return(<Table />)
        }
        return(

        <Table selectable={false}>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false} >
            <TableRow>{this.buildColumnHeaders(this.props.data)}</TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false} stripedRows={false} showRowHover={true}>
            {this.buildBody(this.props.data)}
          </TableBody>
        </Table>
      );
    }
}
