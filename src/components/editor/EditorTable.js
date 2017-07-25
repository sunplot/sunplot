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
        if(!data.docs){
            return
        }
        var rows = data.docs
        var count = rows.length
        return rows.map(this.buildRow.bind(this))
    }
    buildRow(row,index){
        var fields = Object.values(row);
        return <TableRow key={"trow-" + index}>{fields.map(this.buildRowColumn)}</TableRow>
    }
    buildRowColumn(rowColData, index){
        return <TableRowColumn key={"rowcol-" + index}>{rowColData}</TableRowColumn>
    }

    buildColumnHeader(data){
        return <TableHeaderColumn key="tablehc">{data}</TableHeaderColumn>
    }
    buildColumnHeaders(res){
        if(!res.docs || res.docs.length <1){
            return
        }
        let headers = Object.keys(res.docs[0])
        return headers.map(this.buildColumnHeader)
    }

    render(){
        if(this.props.data === undefined || Object.keys(this.props.data).length < 1){
            return(<Table />)
        }
        return(
        <div>
            <Table selectable={false}>
              <TableHeader displaySelectAll={false} adjustForCheckbox={false} >
                <TableRow>{this.buildColumnHeaders(this.props.data)}</TableRow>
              </TableHeader>
              <TableBody displayRowCheckbox={false} stripedRows={false} showRowHover={true}>
                {this.buildBody(this.props.data)}
              </TableBody>
            </Table>
        </div>
      );
    }
}
