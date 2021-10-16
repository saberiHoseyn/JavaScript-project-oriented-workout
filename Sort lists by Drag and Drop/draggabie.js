class draggable{
    constructor(p){
        this.setupList(p);
    }

    setupList(p) {
        let {list , el : element , template} = p;

        if(! list) throw Error("list is not existe");
        if(! Array.isArray(list)) throw Error("the list is not an array, please insert an array");
        if(! element) throw Error("element is not existe");
        if(! template) throw Error("template is not existe");
        if(typeof template ==! "function") throw Error("Please add a function as template");

        list.forEach(item => element.innerHTML += template(item))
    }
}