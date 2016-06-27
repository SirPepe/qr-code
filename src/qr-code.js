(function(){

"use strict";

document.registerElement("qr-code", {
  extends: "a",
  prototype: Object.create(window.HTMLAnchorElement.prototype, {

    createdCallback: {
      value: function(){
        this.__root = this.createShadowRoot({ open: false });
        this.__root.innerHTML = "<style>:host { display: inline-block; }</style>";
        this.__canvas = document.createElement("canvas");
        this.__canvas.innerHTML = this.innerHTML;
        this.__root.appendChild(this.__canvas);
        this.code = this.createCode();
      }
    },

    createCode: {
      value: function(){
        const size = parseInt(this.getAttribute("size"), 10) || 128;
        this.__canvas.width = size;
        this.__canvas.height = size;
        const code = new QRious({
          element: this.__canvas,
          value: this.getAttribute("href"),
          size: size
        });
        return code;
      }
    },

    attributeChangedCallback: {
      value: function(attr){
        if(attr === "size" || attr === "href"){
          this.code = this.createCode();
        }
      }
    }

  })

});

})();
