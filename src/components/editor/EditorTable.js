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
        let rows = data.docs
        let count = rows.length
        return rows.map(this.buildRow.bind(this))
    }
    extractData(data){
        let newObj = data[0]
        if(Object.keys(newObj).length === 1 && Array.isArray(Object.values(newObj)[0])){
            this.extractData(newObj)
        }
        if(Array.isArray(newObj)){
            return newObj
        } else {
            return Object.values(newObj)
        }
    }
    extractHeaders(data){
        let newObj = Array.isArray(data) ? data[0] : data
        if(Object.keys(newObj).length === 1 && Array.isArray(Object.values(newObj)[0])){
            return this.extractHeaders(Object.values(newObj))
        }
        return Object.keys(newObj)
    }
    buildRow(row,index){
        let fields = Object.values(row);
        let size = fields.length
        if(size === 1){
            let extractedData = this.extractData(fields)
            return <TableRow key={"trow-" + index}>{extractedData.map(this.buildRowColumn)}</TableRow>
        }
        return <TableRow key={"trow-" + index}>{fields.map(this.buildRowColumn)}</TableRow>
    }
    buildRowColumn(rowColData, index){

        if(rowColData){
            return <TableRowColumn key={"rowcol-" + index}>{rowColData.toString()}</TableRowColumn>
        }

    }

    buildColumnHeader(data){
        return <TableHeaderColumn key="tablehc">{data}</TableHeaderColumn>
    }
    buildColumnHeaders(res){
        if(!res.docs || res.docs.length <1){
            return
        }
        let headers = this.extractHeaders(res.docs)
        return headers.map(this.buildColumnHeader)
    }

    render(){
        if(this.props.data.docs === undefined || Object.keys(this.props.data.docs).length < 1){
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
