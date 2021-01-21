import React from 'react';
/* <nav> 标签定义导航链接的部分。*/
	/* signout 返回 sign in 界面*/
	/*sign in和register返回登陆界面*/
const Navigation= ({isSignedin,onRouteChange}) =>{
	if( isSignedin ){
	console.log(isSignedin);
	return (
	<nav style={{display:'flex',justifyContent:'flex-end'}}>
	<p  onClick={() => onRouteChange('signin')} className='f3 line dim black underline pa3 pointer' >Sign Out</p>
	</nav>
	);}
	else
	{
        console.log(isSignedin);
		return(
        <nav style={{display:'flex',justifyContent:'flex-end'}}>
	<p  onClick={() => onRouteChange('signin')} className='f3 line dim black underline pa3 pointer' >Sign In</p>
	<p  onClick={() => onRouteChange('register')} className='f3 line dim black underline pa3 pointer' >Register</p>
	</nav>
		);}
}
/* 输出默认定义*/
export default Navigation;