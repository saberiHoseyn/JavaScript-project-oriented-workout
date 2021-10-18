class draggable {
    dragged;
    list;
    update;

    constructor(options) {
        this.setupList(options);
        
        this.list = options.list;
        if(options.update) this.update = options.update;

        for (const item of options.element.children) {
            this.addDnDHandlers(item);
        }
    }

    setupList(options) {
        let {list , element , template} = options;

        if(! list) throw Error("list is not existe");
        if(! Array.isArray(list)) throw Error("the list is not an array, please insert an array");
        if(! element) throw Error("element is not existe");
        if(! template) throw Error("template is not existe");
        if(typeof(template) ==! "function") throw Error("Please add a function as template");

        list.forEach(item => element.innerHTML += template(item))
    }




    addDnDHandlers(item){
        item.setAttribute('draggable' , true);


        item.addEventListener("dragstart" , this.dragstartHandler.bind(this));
        item.addEventListener("dragover" , this.dragoverHandler.bind(this));
        item.addEventListener("dragleave" , this.dragleaveHandler.bind(this));
        item.addEventListener("drop" , this.dropHandler.bind(this));
        item.addEventListener("dragend" , this.dragendHandler.bind(this));
    }

    dragstartHandler(e) {
        this.dragged = e.target;
        e.dataTransfer.setData('text/html' , e.target.outerHTML);
        e.target.classList.add("elementDragStart");
    }

    dragoverHandler(e) {
        if(e.preventDefault) e.preventDefault();
        e.target.classList.add("over")
    }

    dragleaveHandler(e) {
        e.target.classList.remove("over")
    }

    dropHandler(e) {
        let target = e.target.closest('.list-item');

        if(this.dragged != target){
            target.parentNode.removeChild(this.dragged);
            let dataHtml = e.dataTransfer.getData("text/html");
            target.insertAdjacentHTML('beforebegin' , dataHtml)
            this.addDnDHandlers(target.previousSibling)
        }
        e.target.classList.remove('over');
    }

    dragendHandler(e) {
        e.target.classList.remove("elementDragStart");

        let newList = [];
        list.querySelectorAll(".list-item").forEach(listItem => newList.push(this.list.find(thisListItem => listItem.id == thisListItem.id)));
        this.update(newList);

    }

}