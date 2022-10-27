import _ from 'lodash';
import './styles/index.css'
import Icon from './assets/images/icon.jpg'
import DataXml from './assets/data.xml'
import Notes from './assets/cvs/data.csv'

function component() {
    const element = document.createElement('div');

    // lodash（目前通过一个 script 引入）对于执行这一行是必需的
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    element.classList.add('hello')

    const myImage = new Image();
    myImage.src = Icon;

    element.appendChild(myImage)

    console.log('DataXml ==>', DataXml)
    console.log('Notes ==>', Notes)

    return element;
}

document.body.appendChild(component());
