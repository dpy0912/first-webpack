import React, {lazy, Suspense} from "react";

// @ts-ignore
const RemoteApp = lazy(() => import('reactApp/App'))

const App = () => {
    // @ts-ignore
    return (
        <div>
            <div style={{
                margin:"10px",
                padding:"10px",
                textAlign:"center",
                backgroundColor:"greenyellow"
            }}>应用程序12</div>
            <div>我是应用程序中的第一个脚手架配置</div>
            <div>模块热更新</div>
            <Suspense fallback={"loading..."}>
                <RemoteApp/>
            </Suspense>
        </div>
    )
}

export default App
