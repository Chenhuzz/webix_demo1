import './_.css';
 
// 默认配置，一行占几个
const defaultSpanConfig:any = {
    sm: 1,
    lg: 2,
    xl: 3,
    xxl: 4
}  
const api:any = {
    name: "formlayout",
    height:0,
    $init: function () {   
        this.$view.className = this.name ; 
    },
    // 计算size
    _calcSize: function () {   
        let len: number = 2;
        if (typeof this.config.span === 'number') {
            len = this.config.span || defaultSpanConfig;
        }
        const remainder = 100 % len;
        return { max: 100 - remainder, size: Math.floor(100 / len) }
    },

    // 设置子节点size
    _set_child_size: function (x:number,y:number) {   
        var st = this.$view.style;
        var margin = Math.round(this._margin / 2); 
        const calcSize = this._calcSize()
        st.paddingTop = this._padding.top - margin + "px";
        st.paddingBottom = this._padding.bottom - margin + "px";
        st.paddingLeft = this._padding.left - margin + "px";
        st.paddingRight = this._padding.right - margin + "px"; 
        for (let i = 0; i < this._cells.length; i++) {
            if (this._cells[i]._settings.hidden) continue;
            let view = this._cells[i].$view;
            let size = this._sizes[i];
            let config = this._cells[i]._settings; 
            if (view) {
                view.style.minWidth = size[0] + "px";
                if (size[1] < 100000 && size[1] != size[0])
                    view.style.maxWidth = size[1] + "px";
                view.style.flexBasis = (config.newLine ? calcSize.max : calcSize.size) + '%';
                view.style.height = (size[3] != size[2]) ? "auto" : (size[2] + "px");
            
                view.style.minHeight = size[2] + "px";
                if (size[3] < 100000 && size[3] != size[2])
                    view.style.maxHeight = size[3] + "px";  
                // view.style.margin = margin + "px"; 
                view.style.marginTop = "8px";
            }
        } 
        var whs = [];
        for (let i = 0; i < this._cells.length; i++) {
            if (this._cells[i]._settings.hidden) continue;
            let view = this._cells[i].$view;
            whs[i] = [view.offsetWidth, view.offsetHeight];
        } 
        for (let i = 0; i < this._cells.length; i++) {
            if (this._cells[i]._settings.hidden) continue;
            let cell = this._cells[i];
            let view = cell.$view;
            if (view) { 
                let size = this._sizes[i];
                var h = size[2] == size[3] ? size[2] : whs[i][1]; 
                cell.$setSize(whs[i][0], h); 
            }
        }  
        this.$view.style.height = "";  
    }
};

webix.protoUI(api, webix.ui.layout);