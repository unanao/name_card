﻿<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="s" uri="/struts-tags"%>

		<div class="span12">
		<div class="blank"></div>
	<p>
		<a  class="btn-small fr" style="margin-right:100px" value="new_product" onclick="location.href='pcenter/saveProductPage'">
			发布新产品》
		</a>
	</p>			
			<table class="table"  id="product_table">
				<tbody>			
			<s:iterator value="products" id="product">
				<tr >
					<td><s:property value="#product.name"/> </td>
					<td><a href="product/showProduct?productId=<s:property value="#product.id" />"  
                            target="_blank">
                                   查看
                        </a></td>
					<td><a onclick="$('#pcenter_right').load('pcenter/updateProductPage?productId=<s:property value='#product.id'/>');">编辑</a></td>
					<td><a href="pcenter/deleteProduct?productId=<s:property value='#product.id'/>">删除</a></td>
                    
				</tr>
			</s:iterator>				
				</tbody>
			</table>
		</div>

		
