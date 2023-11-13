import { JetApp, JetView } from "webix-jet";
import  "../protoui/FormLayout";


class test extends JetView{
    
    config(){
        return {
            rows:[
                {
                    cols:[
                        {
                            view:"button",
                            label:"hide-B",
                            click:()=>{
                               let b:weibx.ui.text =  this.$$("b");
                               b.hide();
                               
                            }
                        },
                        {
                            view:"button",
                            label:"show-B",
                            click:()=>{
                                let b:weibx.ui.text =  this.$$("b");
                                b.show();
                            }
                        }
                    ]
                },
                {
                    view:"form",
                    elements:[
                        {
                            
                            view:"formlayout",
                            span:3, 
                            rows:[
                                {
                                    view:"combo",
                                    label:"a",
                                    options:[{id:"1",value:"1"}]
                                },
                                {
                                    view:"text",
                                    label:"b",
                                    localId:"b"
                                },
                                {
                                    view:"text",
                                    label:"c"
                                },
                                {
                                    view:"text",
                                    label:"d"
                                },
                                {
                                    view:"text",
                                    label:"e"
                                },
                                {
                                    view:"text",
                                    label:"f"
                                },
                                {
                                    view:"text",
                                    label:"g"
                                },
                                {
                                    view:"text",
                                    label:"h"
                                },
                                {
                                    view: "scrollview",
                                    scroll: "auto",
                                    newLine:true,
                                    body: {
                                        rows:[
                                            {view:"text"}
                                        ]
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    }
}


new JetApp({views:{
    home:test
}}).render();
