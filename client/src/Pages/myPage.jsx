import './MyPage.css';
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

  // 프로필 이미지 변경하기
  const [userProfileImage, setUserProfileImage] = useState('')
  const handleSaveProfileImage = (newImageUrl) => {
    setUserProfileImage(newImageUrl)
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
              backgroundColor: "skyblue",
              cursor :'pointer'
            }}>
              {/* 프로필 이미지 (이미지가 없을시 배경색만 보임) */}
              {userProfileImage ?(
                <img src={userProfileImage}
                alt="사용자 지정 프로필 사진"
                style={{ width: "100%", height: "100%", objectFit: "cover"}}
                onError={(e) => {e.target.onerror = null; e.target.src = '';}} /> //이미지 로드 실패시 배경색(하늘색)이 보임
                ): (
                  null
                )}
              
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
            userProfileImage={userProfileImage}
            onSaveUserProfileImage={handleSaveProfileImage}
            />
            )}          
          
          
      </div>
    </div>    
    
  )
} 