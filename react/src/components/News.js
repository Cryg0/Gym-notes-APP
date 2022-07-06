import axios from 'axios'
import {useState,useEffect} from 'react'
import {Link} from 'react-router-dom'

const baseUrl='http://localhost:8000/api'

export default function PostsFeed(){
          //posts hook
          const[posts,setPosts]=useState([{
              title:'',
              author:'',
              content:'',
              status:'',
              published:''
              
          }]);
          useEffect(()=>{
          axios.get('http://127.0.0.1:8000/api/posts/').then((response)=>{
          setPosts(response.data)
          console.log(response.data)
                  
          } );
          },[] );

            //posts hook

       
    return (
        <div className="container">
        
        
       <div className='posts'>
        {posts.map((post,index) => (
      
      <div  key={index}className="card mb-3" >
  <div className="row g-0">
    <div className="col-md-2">
      <img src="logo2.jpg" className="img-fluid rounded-start" alt="..."/>
    </div>
    <div className="col-md-8">
      <div className="card-body">
        <h5 className="card-title">{post.title}</h5>
        <p className="card-text">{post.content}</p>
        <p className="card-text"><small className="text-muted">{post.published}</small></p>
      </div>
    </div>
  </div>
</div>


        ))}
        </div>
</div>


        
        )}