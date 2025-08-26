
import './UserProfileSection.css'
import React, {useState, useEffect, useRef} from 'react';

export default function UserProfileSection({userCustomName, onSaveUserName, userProfileImage, onSaveUserProfileImage}) {
  
  const [userName, setUserName] = useState(userCustomName);
  const [userSelectImage, setUserSelectImage ] = useState(null)
  const fileInputRef = useRef(null);

  // 사용자 지정 이름 변경하기
  useEffect(() => {
    setUserName(userCustomName);
  }, [userCustomName])

  const handleSaveUserName = () => {
    onSaveUserName(userName)
    alert('닉네임이 저장되었습니다!');
  }

  // 사용자 프로필 사진 변경하기
  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if(file){
      const reader = new FileReader()
      reader.onloadend = () => {
      setUserSelectImage(reader.result);
      }
      reader.readAsDataURL(file)
    }else{
      setUserSelectImage(userProfileImage) //변경 취소
    }
  }

  const handleSaveProfileImageChange = () => {
    if (userSelectImage) {
      onSaveUserProfileImage(userSelectImage); //myPage에 전달
      setUserSelectImage(null)
      if(fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      alert('프로필 사진 저장 되었습니다!')
    }else{
      alert('사진을 선택해주세요.')
    }
  }

  
  return (
    <div className='w-100 h-300px marginTop-70px'>
        <div className="margin-15px">
          {/* 프로필 사진 변경 */}
          <div className="h-100px  border-1px radius-10">
              <p className='margin-10px-0 marginLeft-5px font-weight-b'>프로필 사진 변경하기</p>
            <div className="display-flex">
                <input type='file'
                accept='image/*'
                ref={fileInputRef}
                onChange={handleFileChange}
                className='hidden'>
                </input>
                <button
                 onClick={() =>fileInputRef.current.click()}>사진 선택</button>
                 
                <button
                 onClick={handleSaveProfileImageChange}
                 disabled={!userSelectImage}>저장</button>
              </div>
          </div>

          {/* 사용자 이름 변경 */}
            <div className="h-100px  border-1px radius-10">
              <p className='margin-10px-0 marginLeft-5px font-weight-b'>사용자 이름</p>
            <div className="display-flex">
              <input type="text"
              placeholder='닉네임 설정'
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className='userNameInput margin-10-0px'></input>
              <img src="" alt="icon" srcset="" onClick={handleSaveUserName} style={{ cursor: 'pointer' }}/></div>
              </div>

          <div className="h-60px border-1px radius-10 marginTop-10px">
            <div className="">
              <p className='margin-10px-0 marginLeft-5px font-weight-b'>로그인 계정 <span className='marginLeft-5px font-weight-normal'>mmm@gmail.com</span></p>
            </div>
          </div>

          <div className="h-60px border-1px radius-10 marginTop-10px">
            <div className="">
              <p className='margin-10px-0 marginLeft-5px font-weight-b'>로그인 계정 <span className='marginLeft-5px font-weight-normal'>mmm@gmail.com</span></p>
            </div>
          </div>
        </div>
    </div>
            )
          }
