interface fnType {
    fn?: void;
    args?: string
}

const fun = ({fn, args}: fnType) => {
    console.log('1 :>> ', 1);
}

fun({})