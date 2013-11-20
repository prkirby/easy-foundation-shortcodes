(function() {
    tinymce.create('tinymce.plugins.oscitasEFSDropdown', {
        init : function(ed, url) {
            ed.addButton('oscitasefsdropdown', {
                title : 'Button Dropdown Shortcode',
                image : url+'/icon.png',
                onclick : function() {
                    create_oscitas_dropdown();
                }
            });
        },
        createControl : function(n, cm) {
            return null;
        },
        getInfo : function() {
            return {
                longname : "Button Dropdown Shortcode",
                author : 'Oscitas Themes',
                authorurl : 'http://www.oscitasthemes.com/',
                infourl : 'http://www.oscitasthemes.com/',
                version : "2.0.0"
            };
        }
    });
    tinymce.PluginManager.add('oscitasefsdropdown', tinymce.plugins.oscitasEFSDropdown);
})();


function create_oscitas_dropdown(){
    if(jQuery('#oscitas-form-dropdown').length){
        jQuery('#oscitas-form-dropdown').remove();
    }
    // creates a form to be displayed everytime the button is clicked
    // you should achieve this using AJAX instead of direct html code like this
    var form ='<div id="oscitas-form-dropdown"><table id="oscitas-table" class="form-table">\
			<tr>\
				<th class="main_dp_th"><label for="oscitas-dropdown-heading" >Dropdown Button Features</label></th>\
				<td><table class="tb_multiple_column_upper">\
                                <thead>\
                                    <tr><th>Text</th><th>Size</th><th>Style</th><th>Color Class</th><th>Split</th></tr>\
                                </thead>\
                                <tbody>\
                                <tr>\
                                    <td><input type="text" name="dropdown-heading" id="oscitas-dropdown-heading" value="Dropdown"/></td>\
                                    <td>\
                                    <select name="type" id="oscitas-dropdown-size">\
                                        <option value="">Default</option>\
                                        <option value="large">Large</option>\
                                        <option value="small">Small</option>\
                                        <option value="tiny">Tiny</option>\
                                    </select><br />\
                                    </td>\
                                    <td>\
                                    <select name="type" id="oscitas-dropdown-style">\
                                        <option value="">Default</option>\
                                        <option value="radius">Radius</option>\
                                        <option value="round">Round</option>\
                                    </select><br />\
                                    </td>\
                                    <td>\
                                    <select name="color_class" id="oscitas-dropdown-color-class">\
                                        <option value="">Default</option>\
                                        <option value="success">Success</option>\
					                    <option value="secondary">Secondary</option>\
					                    <option value="alert">Alert</option>\
                                    </select>\
                                    </td>\
                                    <td>\
                                    <input type="checkbox" name="dropdown-split" id="oscitas-dropdown-split" value="split"/>\
                                    </td>\
                                </tr>\
                                </tbody>\
                                </table></td>\
			</tr>\
			<tr>\
				<th class="main_dp_th"><label for="oscitas-line">Dropdown Items</label></th>\
				<td><table class="tb_multiple_column">\
                                <thead>\
                                    <tr><th>Type</th><th>Link</th><th>Title</th><th>Disabled</th><th>Option</th></tr>\
                                </thead>\
                                <tbody id="oscitas-append-dropdownitem">\
                                <tr class="osc_dropdown_list_item">\
                                    <td><input type="hidden"  class="oscitas-dropdownitem-type" value="menuitem"><span>Menu Item</span></td>\
                                    <td><input type="text" name="dropdown-item-link[]" class="oscitas-dropdownitem-link" value="#"/></td>\
                                    <td><input type="text" name="dropdown-item-title[]" class="oscitas-dropdownitem-title" value="Dropdown Item"/></td>\
                                    <td><input type="checkbox" name="dropdown-item-disabled[]" class="oscitas-dropdownitem-disabled" value="disabled"/></td><td></td>\
                                </tr>\
                                </tbody>\
                                <tfoot>\
                                    <tr><td colspan="5"><a id="osc_add_new_dditem" href="javascript:;" style="text-decoration:none;"><i class="glyphicon glyphicon-plus-sign"></i> Add New Item</a></td></tr>\
                                </tfoot>\
                                </table></td>\
			</tr>\
                        <tr>\
				<th><label for="oscitas-dropdown-class">Custom Class:</label></th>\
				<td><input type="text" name="line" id="oscitas-dropdown-class" value=""/><br />\
				</td>\
			</tr>\
		</table>\
		<p class="submit">\
			<input type="button" id="oscitas-dropdown-submit" class="button-primary" value="Insert Dropdown" name="submit" />\
		</p>\
		</div>';
    jQuery(form).dialog({
        dialogClass : 'wp-dialog osc-dialog',
        modal:true,
        height:'auto',
        width:1170,
        title : 'Button Dropdown Shortcode',
        open:function(){
            var content=jQuery(this);
            var table = content.find('table');

            content.find('#osc_add_new_dditem').click(function(){
        var item='<tr class="osc_dropdown_list_item"><td class="osc_type_change"><span class="oscitas-dropdownitem-type" >Menu Item</span></td><td class="osc_hide"><input type="text" name="dropdown-item-link[]" class="oscitas-dropdownitem-link" value="#"/></td><td class="osc_hide"><input type="text" name="dropdown-item-title[]" class="oscitas-dropdownitem-title" value="Dropdown Item"/></td><td class="osc_hide"><input type="checkbox" name="dropdown-item-disabled[]" class="oscitas-dropdownitem-disabled" value="disabled"/></td><td><a class="osc_remove_dditem" href="javascript:;" style="text-decoration:none;"><i class="glyphicon  glyphicon-remove"></i></a></td></tr>';
                content.find('#oscitas-append-dropdownitem').append(item);
                    
    });
    jQuery('.osc_remove_dditem').live('click',function(){
        jQuery(this).parent().parent().remove();
    })

    // handles the click event of the submit button
            content.find('#oscitas-dropdown-submit').click(function(){
        var split;
        var type,link,title,disabled;
        var heading= jQuery('#oscitas-dropdown-heading').val();
       
        if(jQuery('#oscitas-dropdown-split').is(":checked")==true){
            split= jQuery('#oscitas-dropdown-split').val();
        } else{
            split='';
        }
        var size= jQuery('#oscitas-dropdown-size').val();
        var style= jQuery('#oscitas-dropdown-style').val();
        var color_class= jQuery('#oscitas-dropdown-color-class').val();

        var cusclass;
        if(table.find('#oscitas-dropdown-class').val()!=''){
            cusclass= ' class="'+table.find('#oscitas-dropdown-class').val()+'"';
        }
        else{
            cusclass='';
        }
        var shortcode='';
        shortcode ='[efsdropdown '+cusclass+']<br/>';
        shortcode +='[efsdropdownhead style="'+style+'" size="'+size+'" split="'+split+'" color_class="'+color_class+'"]<br/>';
        shortcode += heading+'<br/>';
        shortcode +='[/efsdropdownhead]<br/>';
        shortcode +='[efsdropdownbody]<br/>';
       
        jQuery('tr.osc_dropdown_list_item').each(function(index){
            link = jQuery(this).find('.oscitas-dropdownitem-link').val();
            title = jQuery(this).find('.oscitas-dropdownitem-title').val();
           
            if(jQuery(this).find('.oscitas-dropdownitem-disabled').is(":checked")==true){
                disabled='disabled="'+jQuery(this).find('.oscitas-dropdownitem-disabled').val()+'"'; 
            } else{
                disabled='';
            }
            shortcode +='[efsdropdownitem link="'+link+'" '+disabled+']'+title+'[/efsdropdownitem]<br/>';
        });
        
        shortcode +='[/efsdropdownbody]<br/>';
        shortcode +='[/efsdropdown]';
        
			
        // inserts the shortcode into the active editor
        tinyMCE.activeEditor.execCommand('mceInsertContent', 0, shortcode);

                content.dialog( "destroy" );
    });
        }
    });
}

