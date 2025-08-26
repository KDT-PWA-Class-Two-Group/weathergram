import './myPage.css';
import React, { useState } from 'react';
import UseProfileSection from '../components/mypage/UserProfileSection.jsx'
import UserPostGrid from '../components/mypage/UserPostGrid.jsx'

export default function MyPages (){
  // 설정 클릭시 프로필 설정/ 다시 클릭시 사용자 갤러리가 보임
  const [showPostGrid, setShowPostGrid] = useState(true);
  const handleProfileSetClick = () =>{
    setShowPostGrid(!showPostGrid)
  }

  // 프로필 설정창에서 수정된 프로필 반영
  const [userCustomName, setUserCustomName] = useState('사용자 지정 닉네임')
  const  handleUserCustomName = (newCustomName) => {
    setUserCustomName(newCustomName);    
  }

  return(
    <div>
      <div className='w-100 display-flex-column'
       style={{height: "930px",
          backgroundColor: "#fff",
          border: "1px solid #bbb",
        }}>

          {/* 프로필 헤더 */}
          <div className='w-100 h-240px'
          style={{backgroundColor: "#ddd"}}>
          </div>

          {/* 프로필 사진, 이름 */}
          <div className='w-100 h-100px display-flex-alignItems-center marginTop--40px'>
            <div className="w-100px h-100px radius-50 marginLeft-10px"
            style={{
              backgroundColor: "#fff"
            }}>
              <img src="" alt=""
                style={{ width: "100%"}}></img>
              </div>
            
            <div className="w-160px h-70px marginLeft-10px marginTop-30px">
              <p className='font-size-16 font-weight-b'>{userCustomName}</p>
              <p className="font-size-14 marginTop--10px">
                <span>icon</span><span className='marginLeft-5px'>000</span>
              <span className='marginLeft-10px'>icon</span><span className='marginLeft-5px'>000</span>
              </p>
            </div>
            <div className='w-100px h-100px display-flex-center-end' onClick={handleProfileSetClick}>
              <img className="profile-set"src="" alt="."></img></div>    


          </div>
          
          {/* 프로필 갤러리 */}
          {showPostGrid? (<UserPostGrid /> 
          ) : ( 
            <UseProfileSection 
            userCustomName={userCustomName}
            // UserProfileSection에서 수정한 이름 반영
            onSaveUserName = {handleUserCustomName}
            />
            )}          
          
          
      </div>
    </div>    
    
  )
} 