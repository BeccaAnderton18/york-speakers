/* jce - 2.6.26 | 2018-01-31 | http://www.joomlacontenteditor.net | Copyright (C) 2006 - 2018 Ryan Demmer. All rights reserved | GNU/GPL Version 2 or later - http://www.gnu.org/licenses/gpl-2.0.html */
!function(){var each=(tinymce.DOM,tinymce.dom.Event,tinymce.extend,tinymce.each);tinymce.util.Cookie,tinymce.explode;tinymce.create("tinymce.plugins.StyleSelectPlugin",{init:function(ed,url){this.editor=ed,ed.onNodeChange.add(function(ed,cm){var matches,c=cm.get("styleselect"),formatNames=[];c&&(formatNames=[],each(c.items,function(item){formatNames.push(item.value)}),matches=ed.formatter.matchAll(formatNames),c.select(matches[0]),tinymce.each(matches,function(match,index){index>0&&c.mark(match)}))})},createControl:function(n,cf){var ed=this.editor;switch(n){case"styleselect":if(ed.getParam("styleselect_stylesheets")!==!1||ed.getParam("style_formats")||ed.getParam("styleselect_custom_classes"))return this._createStyleSelect()}},_createStyleSelect:function(n){var ctrl,ed=this.editor,ctrlMan=ed.controlManager,PreviewCss=tinymce.util.PreviewCss;return ctrl=ctrlMan.createListBox("styleselect",{title:"advanced.style_select",filter:!0,max_height:300,onselect:function(name){var matches,removedFormat,formatNames=[];return each(ctrl.items,function(item){formatNames.push(item.value)}),ed.focus(),ed.undoManager.add(),matches=ed.formatter.matchAll(formatNames),tinymce.each(matches,function(match){name&&match!==name||(match&&ed.formatter.remove(match),removedFormat=!0)}),removedFormat||(ed.formatter.get(name)?ed.formatter.apply(name):ed.formatter.apply("classname",{value:name})),ed.undoManager.add(),ed.nodeChanged(),!1}}),ed.onPreInit.add(function(){var counter=0,formats=ed.getParam("style_formats"),styles=ed.getParam("styleselect_custom_classes","","hash");if(ed.formatter.register("classname",{attributes:{class:"%value"},selector:"*"}),formats){if("string"==typeof formats)try{formats=JSON.parse(formats)}catch(e){formats=[]}each(formats,function(fmt){var name,keys=0;each(fmt,function(){keys++}),keys>1?(name=fmt.name=fmt.name||"style_"+counter++,fmt.attributes&&each(fmt.attributes,function(value,key){fmt.attributes[key]=value+""}),fmt.styles&&each(fmt.styles,function(value,key){fmt.styles[key]=value+""}),ed.formatter.register(name,fmt),ctrl.add(fmt.title,name,{style:function(){return new PreviewCss(ed,fmt)}})):ctrl.add(fmt.title)})}styles&&each(styles,function(val,key){var name,fmt;val&&(val=val.replace(/^\./,""),name="style_"+counter++,fmt={classes:val,selector:"*"},ed.formatter.register(name,fmt),key&&(key=key.replace(/^\./,"")),ctrl.add(ed.translate(key),name,{style:function(){return new PreviewCss(ed,fmt)}}))})}),ctrl}}),tinymce.PluginManager.add("styleselect",tinymce.plugins.StyleSelectPlugin)}();