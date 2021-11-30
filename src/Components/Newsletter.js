import React, {useEffect} from "react"
import MyNavbar from "./MyNavbar";
import $ from "jquery"

function Newsletter() {
    useEffect(() => {
        $('#fsw-watermark').hide();
    })
    return (
        <React.Fragment>
            <MyNavbar fixed={true}/>
            <div>
                <iframe src="https://cdn.flipsnack.com/widget/v2/widget.html?hash=fhcfvfipr" width="100%" height="480"
                        seamless="seamless" scrolling="no" frameBorder="0" allowFullScreen></iframe>
            </div>
        </React.Fragment>
    )
}

export default Newsletter;
