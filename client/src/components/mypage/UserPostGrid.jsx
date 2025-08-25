import React, {useState, useEffect} from 'react'

export default function UserPostGrid(){
    const [posts, setPosts] = useState([])

  useEffect(() => {
    //사용자 업로드 게시글 api호출
    fetch('경로')
    .then(response => response.json())
    .catch(error => console.error('호출 오류', error))

    setPosts()
  }, [])

  return(
    <div className='w-100 h-auto marginTop-70px' style={{backgroundColor: "#eee"}}>
      {posts.map(post => (
        <div key={post.id}>
          <img src={post.imgUrl} alt='사용자 게시물 이미지'
              style={{
                width:120,
                height:120,
                objectFit: 'cover'
              }}
            />
        </div>
      ))}        
      </div>
  )
}