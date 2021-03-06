package com.bancai.web.accounts;

import java.util.Map;

import org.apache.commons.codec.digest.DigestUtils;
import org.apache.log4j.Level;
import org.apache.log4j.Logger;

import com.bancai.constants.AccountsContants;
import com.bancai.constants.CommonConstants;
import com.bancai.dao.User;
import com.bancai.service.UserActivationService;
import com.bancai.service.UserService;
import com.bancai.utils.CookieUtils;
import com.bancai.utils.email.SendEmailUtils;
import com.bancai.utils.xss.HTMLInputFilter;
import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionSupport;

/**
 * 处理用户登录
 * 
 * @author unanao <jianjiaosun@163.com>
 * 
 */
public class LoginAction extends ActionSupport implements AccountsContants, CommonConstants {
	private static final long serialVersionUID = 1L;

	private String userName;
	private String password;
	private String retPage = "login";
	private String rememberme;
	UserService userService = new UserService();
	SendEmailUtils sendEmailUtils = new SendEmailUtils();
	UserActivationService userActivationService = new UserActivationService();
	AccountsCommon accountsCommon = new AccountsCommon();
	Logger logger = Logger.getLogger(LoginAction.class);

	@Override
	public String execute() throws Exception {
		Map<String, Object> session = ActionContext.getContext().getSession();
		User user;
		Integer userId;
		String expectPassword;
		Integer status;
		String encryptionPassword = DigestUtils.md5Hex(password);
		final String REMEMBER_ME = "rememberme";
		CookieUtils cookieUtils = new CookieUtils();
		
		/**
		 * 没有取到用户信息，说明没有注册
		 */
		try {
			user = userService.getUserByUserName(userName);
			userId = user.getId();
			expectPassword = user.getPassword();
			status = user.getStatus();
		} catch (RuntimeException re) {
			addActionError("您还没有注册");
			return INPUT;
		}

		/**
		 * 用户名和密码不匹配
		 */
		if (true != encryptionPassword.equals(expectPassword)) {
			addActionError("用户名或密码错误");

			return INPUT;
		}

		/**
		 * 对用户状态进行判断
		 */

		if (UNACTIVATED == status) {
			session.put(SESSION_UNACTIVE_USER_ID, null);
			session.put(SESSION_UNACTIVE_EMAIL, null);
			
			session.put(SESSION_UNACTIVE_USER_ID, userId);
			session.put(SESSION_UNACTIVE_EMAIL, userName);
			
			addActionError("您还没有激活， 请您登陆您的邮箱进行激活");
			return ERROR;
		} else if (FREEZED == status) {
			addActionError("您的账户已经被冻结");
			return ACTION_FREEZED;
		}
		
		/**
		 * 上面的情况都没有出现，则用户登陆成功
		 */
		try {
			userService.updateLoginInfo(user);
		} catch (Exception ex) {
			logger.log(Level.FATAL, "update login info error ", ex);
		}
		
		accountsCommon.addLoginSessions(userId);
		
		if ((null != rememberme) && (rememberme.equalsIgnoreCase(REMEMBER_ME)) ) {
			cookieUtils.addCookie(userId, expectPassword);
		}
	
		/*
		 * retPage 标明 登录成功后跳转的页面
		 * 			如果为“null”，则是点击“登陆”按钮完成跳转到首页
		 * 			其它的情况根据传入的值以及accounts.xml中的配置决定
		 * 
		 * 因为可能有的页面没有传入retPage的值， 导致 retPage = "", 但是struts.xml
		 * 直接比较“”不认识，只好在这里转换一下。
		 */
		if (0 == retPage.length())
		{
			retPage = "null";
		}
		
		return new HTMLInputFilter().filter(retPage);
	}

	public void setUserName(String userName) {
		this.userName = new HTMLInputFilter().filter(userName);
	}

	public String getUserName() {
		return new HTMLInputFilter().filter(userName);
	}

	public void setPassword(String password) {
		this.password = new HTMLInputFilter().filter(password);
	}

	public String getPassword() {
		return new HTMLInputFilter().filter(password);
	}

	public String getRetPage() {
		return new HTMLInputFilter().filter(retPage);
	}

	public void setRetPage(String retPage) {
		this.retPage = new HTMLInputFilter().filter(retPage);
	}

	public String getRememberme() {
		return new HTMLInputFilter().filter(rememberme);
	}

	public void setRememberme(String rememberme) {
		this.rememberme = new HTMLInputFilter().filter(rememberme);
	}
}
