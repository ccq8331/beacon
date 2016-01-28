<#import "page.ftl" as page>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>

<@page.ow_base_meta/>
<#if meta?exists>
<@meta/>
</#if>

<@page.ow_browser_icon/>

<title><@title/></title>

<@page.ow_base_javascript/>
	<#if script?exists>
	<@script/>
</#if>

<@page.ow_base_stylesheet/>
	<style>
		#__content__{
			padding: 10px;
		}
		.blue{
			color:#1E90FF;
		}
	</style>	
	<#if stylesheet?exists>
	<@stylesheet/>
</#if>

<@page.ow_base_other_head/>

</head>

<body>

<hr/>

<div id="__content__">
	<#if content?exists>
		<@content/>
	</#if>
</div>

</body>
</html>