/*
 * this file implement function:load the contents of user click on pcenter navigator
 * base on AJAX
 * author:lzf
 */

var lastobj=$('#pnav_change_pw');
	
$(document).ready(function(){
	$('#pnav_change_pw').click(function(){
	    lastobj.removeClass("active");
		$(this).addClass("active");
		lastobj=$(this);
		$('#pcenter_right').load('pcenter/change_passwd.jsp');
		});
	$('#pnav_change_basic').click(function(){
		lastobj.removeClass("active");
		$(this).addClass("active");
		lastobj=$(this);
		$('#pcenter_right').load('pcenter/showPersonalInfo');
	});	
	$('#pnav_manage_enterprise').click(function(){
		lastobj.removeClass("active");
		$(this).addClass("active");
		lastobj=$(this);
		$('#pcenter_right').load('pcenter/showEnterprise');		
	});	
	$('#pnav_manage_product').click(function(){
	    lastobj.removeClass("active");
		$(this).addClass("active");	
		lastobj=$(this);		    
		$('#pcenter_right').load('pcenter/listProducts');
	});
	$('#pnav_current_service').click(function(){
	    lastobj.removeClass("active");
		$(this).addClass("active");		    
		lastobj=$(this);
		$('#pcenter_right').load('pcenter/getPackagesByEnterprise');
	});
	$('#pnav_buy_service').click(function(){
	    lastobj.removeClass("active");
		$(this).addClass("active");	
		lastobj=$(this);
		$('#pcenter_right').load('pcenter/do_charge.jsp');
	});
	$('#pnav_help_info').click(function(){
	    lastobj.removeClass("active");
		$(this).addClass("active");	
		lastobj=$(this);
		$('#pcenter_right').load('pcenter/p_help.jsp');
	});
	
});
	
function pcenter_navgitor_swicth()
{
}	