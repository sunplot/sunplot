import React from 'react'
import Divider from 'material-ui/Divider'
export const Footer = (props) => {
    const style = {
            position: "absolute",
            bottom: "0px",
            left:"0px",
            textAlign:"middle",
            width:"100%"
    }
    return(
        <footer id="footer" style={style}>
            <Divider />
            <h3>Sunplot 2017</h3>
        </footer>
        )
    }
