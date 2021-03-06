//var MAX_PIC_NUMBER = 5;

$(document).delegate('#enterprise_pic', 'change', function() {
	var enterpriseId = $('#enterpriseId').val();
	deal_new_picture('enterpriseId','pcenter/saveEnterprisePicture',
        'pcenter/pubEnterprisePicture','pcenter/deleteEnterprisePicture','logo',this, 'enterprise_pic');
});

/* init for page loading*/
$(function() {
	dispalyEnterprise();
});

function dispalyEnterprise() {
	$.getJSON("pcenter/showEnterprise", function(data) {
		loadProvinceCity(data.enterprise.province, data.enterprise.city, data.enterprise.county, "山东", "临沂");
		
		if (null == data.enterprise.id) {
			$('#enterpriseId').val(-1);
			
			return;
		}
		
		$('#enterpriseId').val(data.enterprise.id)
		$("#name").val(data.enterprise.name);
	
		$("#address").val(data.enterprise.address);
		$("#scale").val(data.enterprise.scale);
		$("#contacter").val(data.phone.contacter);
		$("#number").val(data.phone.number);
		$("#introduction").val(data.enterprise.introduction);
		$("#logo").attr("src", data.enterprise.logo).appendTo("#logo");
		
		/* example: http://www.w3school.com.cn/jquery/ajax_getjson.asp */
		 $.each(data.enterprisePictureMap, function(key, item){
			 	if (key >= MAX_PIC_NUMBER) {
			 		return;
			    }
			 	
			    deal_return_picture(key, item.path, 
                 "enterpriseId", 'pcenter/pubEnterprisePicture', 'pcenter/deleteEnterprisePicture', 'logo');
		 });
    });
}

function setEnterprise() {
		var enterpriseId = $('#enterpriseId').val();
		
		var name = $("#name").val();
		var province = $("#province").val();
		var city = $("#city").val();
		var county = $("#county").val();
		var address = $("#address").val();
		var scale = $("#scale").val();
		var contacter = $("#contacter").val();
		var number = $("#number").val();
		var introduction = $("#introduction").val();
		if(!checkInput()){//假如输入不合法
			return;
		}
		$.post("pcenter/updateEnterprise", {
			name : name,
			province : province,
			city : city,
			county : county,
			address : address,
			scale : scale,
			contacter:contacter,
			number:number,
			introduction:introduction,
		}, function(data) {
			document .getElementById ("save_ok_msg").style.display="block";
		});
}

//function enterpriseCheck() {
	var name = false;
	var address = false; 
	var scale = false;
	var contacter = false;
	var number = false;
	var introduction = false;
	
	function checkName() 
	{
		var value = $("#name").val();
		
		if ((0 != value.length) && ("" != value) && (/^.{2,32}$/.exec(value))) 
		{
			$("#ename").html("");
			name = true;
		} 
		else 
		{
			$("#ename").html("公司名称长度为2 到 32个字符!");
			name = false;
		}
	}
	
	function checkAddress() 
	{
		var value = $("#address").val();
		
		if (("" != value) && (/^.{2,32}$/.exec(value))) 
		{
			$("#eaddress").html("");
			address = true;
		} 
		else 
		{
			$("#eaddress").html("详细地址不能为空，长度为1 到 32个字符!");
			address = false;
		}
	}
	
	function checkScale()
	{
		var value = $("#scale").val();
	
		if ((value == "") || (0 == value.length) || 0==value) 
		{
			$("#escale").html("请选择公司规模");
			scale = false;
			return;
		}else{
			$("#escale").html("");
			scale = true;
		}
	}
	
	function checkContacter()
	{
		var value = $("#contacter").val();
		
		if ((0 != value.length) && ("" != value) && (/^.{2,32}$/.exec(value))) 
		{
			$("#econtacter").html("");
			contacter = true;
		} 
		else 
		{
			$("#econtacter").html("联系人的长度为2 到 32个字符!");
			contacter = false;
		}
	}
	
	function checkNumber() 
	{
		var value = $("#number").val();
			
		if ((value == "") || (0 == value.length)) 
		{
			$("#enumber").html("联系电话不能为空");
			number = false;
			return;
		}
		
		var tel = /[0-9]{4,14}/;
		if((value.replace(/\s/g,"")!="") && !(tel.exec(value))) 
		{
			$("#enumber").html("请输入正确的电话号码");
			number =  false;
		}
		else
		{
			$("#enumber").html("");
			number = true;
		}
	}
	
	function checkIntroduction()
	{
		var value = $("#introduction").val();
		
		if (("" == value) || (0 == value.length))
		{
			$("#eintroduction").html("简介不能为空");
			introduction = false;
		}
		else if (value.length > 2500)
		{
			$("#eintroduction").html("简介长度需要小于2500个字符");
			introduction = false;
		}
		else
		{
			$("#eintroduction").html("");
			introduction = true;
		}
	}
	
	$("#name").blur(checkName);
	$("#address").blur(checkAddress);
//	$("#scale").onSelect(checkScale);
	$("#contacter").blur(checkContacter);
	$("#number").blur(checkNumber);
	$("#introduction").blur(checkIntroduction);
	
	function checkInput() {
		checkName();
		checkAddress();
		checkScale();
		checkContacter();
		checkNumber();
		checkIntroduction();
		return name && contacter && number && scale && introduction && address;
	}
