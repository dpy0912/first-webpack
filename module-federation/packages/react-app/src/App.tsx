import React, {lazy, Suspense} from "react";

// @ts-ignore

const App = () => {
    return (
        <div>
            <div style={{
                margin:"10px",
                padding:"10px",
                textAlign:"center",
                backgroundColor:"red"
            }}>应用程序1</div>
            <div>模块热部署</div>
        </div>
    )
}

export default App
