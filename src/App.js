  
import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Imagelinkform from './components/Imagelinkform/Imagelinkform';
import Rank from './components/rank/rank';
import Facerecognition from './components/Facerecognition/Facerecognition';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
/*tachyons是一个轻便的css 框架 https://tachyons.io/#style*/
import 'tachyons';
/*particle 颗粒效果*/
import Particles from 'react-particles-js';
/*用到 clarifai人脸识别的API 已经 npm install clarifai了*/

const particleoption ={
  
                particles: {
                  number:
                  {
                     value:20,
                     density:
                     {
                       enable:true,
                       value_area:800
                     }
                 } }
              
}
const initialState ={
  input:'',
      imageurl:'',
      box:{},
      route:'signin',
      isSignedin: false,
      user:{
        id:'',
        name:'',
        email:'',
        password:'',
        entries: 0,
        joined:new Date()
      }

}
class App extends Component {
    /*类方法 必须在类里面*/
    constructor ()
    {
    super();
    this.state=initialState;
      }
    loadUser =(data)=>{
      this.setState({
        user:{
          id:data.id,
          name:data.name,
          email:data.email,
          entries:data.entries,
          joined:data.joined
        }
      })
    }
    
  // componentDidMount()
  //   {
  //     //这里是服务器运行地址
  //     fetch('http://localhost:3001')
  //     .then(response => response.json())
  //     .then(data => console.log(data))
  //   }
  onInputChange =(event)=>
  {
    //更新Input state
    this.setState({input: event.target.value});
  }
  calculateface =(data)=>{
    const clarifaiface=data.outputs[0].data.regions[0].region_info.bounding_box;

    //唯一id 查找
    const image=document.getElementById('inputimage');
    const width=Number(image.width);
    const height=Number(image.height);
    //return box内的内容 找到四个点
    //直接返回{} 会报错需要赋值再返回
    const res=
     {
      leftCol: clarifaiface.left_col * width,
      topRow: clarifaiface.top_row * height,
      rightCol: width - (clarifaiface.right_col * width),
      bottomRow: height - (clarifaiface.bottom_row * height)
    };
    return res;
  }


  displaybox =(box) =>
  {    console.log(box);
       this.setState({box:box});
  }
  onButtonSubmit =()=>
  { //一旦submit更新状态
    this.setState({imageurl:this.state.input});
    console.log('click');
  //face recognition api post
  fetch('https://vast-sea-22667.herokuapp.com/imageurl',{
      method:'post',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify(
      {
        input:this.state.input
      })
      })
  .then(response =>response.json())
  .then(response =>{
    if(response)
    {
      fetch('https://vast-sea-22667.herokuapp.com/image',{
      method:'put',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify(
      {
        id:this.state.user.id
      })
      })
      .then(response => response.json())
      .then(count =>{
        this.setState(Object.assign(this.state.user,{entries:count}))      
      })
      .catch(err => console.log(err));
    
  }
    this.displaybox(this.calculateface(response))
  })
  .catch(err=>console.log(err));
  
  }
  onRouteChange = (route)=>
  {
    
    this.setState({route:route});
     if(this.state.route === 'home')
    {
       this.setState({isSignedin: true})
    }
    else if(this.state.route==='signout'||this.state.route==='signin'||this.state.route==='register')
    {
      this.setState(initialState)
    }
  
    this.setState({route:route});
  }
  
  render(){
    const {isSignedin,imageurl,box,route}=this.state;
  return(
    <div className="App">

    <Particles className='particles'
              params={particleoption}/>
    <Navigation isSignedin={isSignedin} onRouteChange={this.onRouteChange} />
    { //conditional
      route==='home'
    ?<div>
        <Logo />
       
        <Rank name={this.state.user.name} entries={this.state.user.entries}/>
        <Imagelinkform onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
        
        <Facerecognition box={box} imageurl={imageurl}/>
      </div>
    :(route==='signin'
      ?<SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
      :<Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>)
    }
    </div>
  );
}
}
export default App;
