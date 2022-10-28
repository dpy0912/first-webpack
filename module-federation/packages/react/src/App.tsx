import React, {lazy, Suspense} from "react";

// @ts-ignore
const RemoteApp = lazy(() => import('vue/App'))

const App = () => {
    return (
        <div>
            <div style={{
                margin:"10px",
                padding:"10px",
                textAlign:"center",
                backgroundColor:"greenyellow"
            }}>应用程序1</div>
            <div>我是应用程序中的第一个脚手架配置</div>
                <RemoteApp/>
        </div>
    )
}

export default App
