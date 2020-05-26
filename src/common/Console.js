import tool from './Tools';
const Console={
    
    init(){
        this.log();
    },

    log(){
        tool.hook(window.console,'log',function(){
            alert('test');
        },true);
    }
}

export default Console;