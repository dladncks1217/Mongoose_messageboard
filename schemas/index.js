const mongoose = require('mongoose');

module.exports=()=>{
    const connect =()=> {  //재연결에 써먹으려고 함수화함.
        if(process.env.NODE_ENV !== 'production'){
            mongoose.set('debug',true);  //배포 상황이 아닐 때 (지금은 development 즉, 개발상황)몽구스를 디버그 모드 즉, 에러가 나면 에러를 표시하는 모드로 바꿔주는 코드.
        }
        mongoose.connect('mongodb://root:nodejsbook@localhost:27017/admin', { //몽고디비와 express서버 연결
            dbname: 'nodejsbook',
        }, (error) => {
            if (error) {
                console.log('몽고디비 연결 에러', error);
            } else {
                console.log('몽고디비 연결 성공!');
            }
        });
    };
    connect();
    mongoose.connection.on('error',(error)=>{
        console.error('몽고디비 연결 에러',error);
    });
    mongoose.connection.on('disconnected',()=>{   //연결 끊겼을 경우 재연결
        console.error('몽고디비 연결이 끊겼습니다. 연결을 재시도합니다.');
        connect();
    });
    require('./user');
    require('./comment');
};