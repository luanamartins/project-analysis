try{
    console.log('try');
    throw 'err';
}catch(e){
    console.log('catch 1');
    return true; // Syntax error on Chrome
    console.log('catch 2'); // this line dont execute on nodejs
}finally{
    console.log('finally');
}