    function isusername(str) {
        if (strbetween(str, 4, 26)) {

            return true;
        } else {
            return false;
        }

    }

    function isemail(str) {
        if (!str.includes('@')) {


            return false;
        }

        return true;
    }

    function isphone(str) {
        if (str.length != 11 &&
            str.length != 13 &&
            str.length != 14 &&
            !str.startsWith('1')
        )
            return false;

        return true;

    }

    function ispassword(str) {
        if (strbetween(str, 6, 64))
            return true;
        else {
            return false;
        }
    }

    function between(num, min, max) {
        return num >= min && num <= max;

    }

    function strbetween(str, min, max) {
        return between(str.length, min, max);
    }
    function regx(str){
        let rex = /[a-zA-Z]+/;
        if(rex.test(str)){
            return true;
        }else{
            return false;
        }
    }
    export default{
        isusername,
        isemail,
        isphone,
        ispassword,
        between,
        strbetween,
        regx,
    }