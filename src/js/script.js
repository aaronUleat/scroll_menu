function ScrollMenu() {
    this.elems = {
        dragable_cont: $("[rel='dragable']"),
        list_cont: $("[rel='scroll-menu']"),
        btn_left: $("[rel='btn-left']"),
        btn_right: $("[rel='btn-right']")
    };
    this.count_drag = 0;
};

ScrollMenu.prototype.binds = function() {
    let self = this;
    console.log(this);
    console.log( self.elems, 'elems' );
    self.elems.btn_left.on('click', self,self.scrollLeft);
    self.elems.btn_right.on('click', self,self.scrollRight);
};


ScrollMenu.prototype.scrollLeft = function(_evt) {
    let self = _evt.data;
    console.log(self.count_drag);
    self.count_drag += 100;
    let translate = "translate3d("+self.count_drag+"px, 0px, 0px)";
    console.log(translate);
    if (self.count_drag != 0) {
        self.elems.dragable_cont.css({
            'transform': translate,
            'transition': 'transform 500ms cubic-bezier(0.7, 0, 0.3, 1)'
        });
    }
};

ScrollMenu.prototype.scrollRight = _evt => {
    let self = _evt.data;
    self.count_drag -= 100;
    console.log(self.count_drag);
    let translate = "translate3d("+self.count_drag+"px, 0px, 0px)";
    console.log(translate);
    self.elems.dragable_cont.css({
        'transform': translate,
        'transition': 'transform 500ms cubic-bezier(0.7, 0, 0.3, 1)'
    });
};


let scroll = new ScrollMenu();
scroll.binds();
