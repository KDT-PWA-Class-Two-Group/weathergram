import React, {useState, useEffect} from 'react'

export default function UserPostGrid(){
    const [posts, setPosts] = useState([])

  useEffect(() => {
    //사용자 업로드 게시글 api호출
    fetch('경로')
    .then(response => response.json())
    .catch(error => console.error('호출 오류', error))

    const dummyPosts = [
      { id: 1, imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
      { id: 2, imageUrl: 'https://images.unsplash.com/photo-1549417215-d72b22e1713d?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
      { id: 3, imageUrl: 'https://images.unsplash.com/photo-1589174176465-b777a8ddde58?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }
    ];
    setPosts(dummyPosts);

  }, [])

  return(
    <div className='w-100 h-auto marginTop-70px' style={{backgroundColor: "#ccc"}}>
      {posts.map(post => (
        <div key={post.id}
          style={{
                  width:"120px",
                  height:"120px",
                  margin:"5px",
                  objectFit: 'cover',
                  float:'left'
                }}>
          <img src={post.imgUrl} alt='사용자 업로드 이미지'
               
            />
        </div>
      ))}        
      </div>
  )
}