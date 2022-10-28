import _ from 'lodash';

// 判断浏览器是否支持server worker
if ('serviceWorker' in navigator) {
    // 创建一个serverWorker
    window.addEventListener('load', () => {
        // 指定对应的内容进行加载
        navigator.serviceWorker.register('/service-worker.js').then((registration ) => {
            console.log('SW registered', registration);
        }).catch((registrationError) => {
            console.log('SW registrationError', registrationError)
        })
    })
}

function component() {
    const element = document.createElement('div');

    const button = document.createElement('button');
    const br = document.createElement('br');

    button.innerHTML = 'Click me and look at the console!';
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    element.appendChild(br);
    element.appendChild(button);

    // 懒加载
    button.onclick = e => import(/* webpackChunkName: "print" */ './print').then(module => {
        // 使用es6语法import的时候，必须指向模块的default，这样才能被认为是处理promise
        const print = module.default;
        print();
    });

    return element;
}


document.body.appendChild(component());
