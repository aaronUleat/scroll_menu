function ScrollMenu() {
    this.elems = {
        dragable_cont: $("[rel='dragable']"),
        list_cont: $("[rel='scroll-menu']"),
        btn_left: $("[rel='btn-left']"),
        btn_right: $("[rel='btn-right']"),
        item: $("[rel='scroll-item']")
    };
    this.count_drag = 0;
    this.increase = 200;
    this.scroll_width = null;
};

ScrollMenu.prototype.binds = function() {
    let self = this;

    self.elems.btn_left.on('click', function (_evt) {
        self.scrollLeft(_evt, self)
    });
    self.elems.btn_right.on('click', function (_evt) {
        self.scrollRight(_evt, self);
    });

    self.elems.list_cont.swipe({
        swipe:function(_evt, direction, distance, duration, fingerCount, fingerData) {
           if (direction == 'left') {
               self.scrollRight(_evt, self)
           } else if (direction == 'right') {
               self.scrollLeft(_evt, self)
           }
        }
    })
};




ScrollMenu.prototype.calculateScrollWidth = function() {
    var self = this;
    var total_width = 0
    $.each(self.elems.item, function (index, item) {
        total_width += item.offsetWidth;
        self.scroll_width = total_width;
    });
    var element_width = self.elems.item[0].offsetWidth;
    self.elems.dragable_cont.css('width', (self.scroll_width) + (self.elems.item[0].offsetWidth * 2.5));
    console.log( (self.scroll_width) + (self.elems.item[0].offsetWidth * 2.5) )
};


ScrollMenu.prototype.scrollLeft = function(_evt, self) {
    if (self.count_drag < 0) {
        self.count_drag += self.increase;
        let translate = "translate3d("+self.count_drag+"px, 0px, 0px)";
        self.elems.dragable_cont.css({
            'transform': translate,
            'transition': 'transform 500ms cubic-bezier(0.7, 0, 0.3, 1)'
        });
    }
};

ScrollMenu.prototype.scrollRight = function(_evt, self) {
    var calc_width =  ((self.elems.dragable_cont[0].offsetWidth / self.elems.list_cont[0].offsetWidth) * self.elems.list_cont[0].offsetWidth) - (self.elems.list_cont[0].offsetWidth / 1.3);

    if (Math.abs(self.count_drag) < calc_width)  {
        self.count_drag -= self.increase;
        let translate = "translate3d("+self.count_drag+"px, 0px, 0px)";
        self.elems.dragable_cont.css({
            'transform': translate,
            'transition': 'transform 500ms cubic-bezier(0.7, 0, 0.3, 1)'
        });
    }
};


let scroll = new ScrollMenu();
scroll.binds();
scroll.calculateScrollWidth();
