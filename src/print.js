import _ from 'loadsh'

export default function printMe(text) {
    console.log('I get called from print.js!', text);
    console.log(_.join(['Another', 'module', 'loaded!'], ' '));
}
