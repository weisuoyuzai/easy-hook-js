// import Console from './common/Console';
import tools from './common/Tools';

(function(window){
    // let v=document.createElement('video');
    // v.src='https://www.w3school.com.cn/i/movie.ogg';
    // v.controls=true;
    // document.body.append(v);
    // Console.init();
    window.tools=tools;
    // tools.hook(window.localStorage,'setItem',function(){
    //     console.log(2222);
    // },true);
    
    // tools.hook(window,'open',function(){
    //     alert(1);
    // });

    // tools.hook(HTMLVideoElement,'requestPictureInPicture',function(){
    //     console.log(11111);
    // },true);


    
    
})(window);

export default tools;