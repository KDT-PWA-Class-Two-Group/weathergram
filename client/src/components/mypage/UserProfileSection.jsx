
import './UserProfileSection.css'
import React, {useState, useEffect, useRef} from 'react';

export default function UserProfileSection({userCustomName, onSaveUserName, userProfileImage, onSaveUserProfileImage, userHeaderImage, onSaverUserHeaderImage}) {
  
  const [userName, setUserName] = useState(userCustomName);
  const [userSelectImage, setUserSelectImage ] = useState(null)
  const [userSelectHeaderImage, setUserSelecttHeaderImage ] = useState(null)
  const profileInputRef = useRef(null);
  const headerInputRef = useRef(null);

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
      setUserSelectImage(userProfileImage) //변경 취소시 기존으로 남음
    }
  }

  const handleSaveProfileImageChange = () => {
    if (userSelectImage) {
      onSaveUserProfileImage(userSelectImage); //myPage에 전달
      setUserSelectImage(null)
      if(profileInputRef.current) {
        profileInputRef.current.value = '';
      }
      alert('프로필 사진 저장 되었습니다!')
    }else{
      alert('사진을 선택해주세요.')
    }
  }

  // 헤더 사진 변경
  const handleHeaderChange = (e) => {
    const headerFile = e.target.files[0]
    if(headerFile){
      const headereader = new FileReader()
      headereader.onloadend = () => {
      setUserSelecttHeaderImage(headereader.result);
      }
      headereader.readAsDataURL(headerFile)
    }else{
      setUserSelecttHeaderImage(userHeaderImage) //변경 취소시 기존으로 남음
    }
  }

  const handleSaveHeaderImageChange = () => {
    if (userSelectHeaderImage) {
      onSaverUserHeaderImage(userSelectHeaderImage); //myPage에 전달
      setUserSelecttHeaderImage(null)
      if(headerInputRef.current) {
        headerInputRef.current.value = '';
      }
      alert('배경사진이 저장 되었습니다!')
    }else{
      alert('사진을 선택해주세요.')
    }
  }

  
  return (
    <div className='w-100 h-300px marginTop-70px'>
        <div className="margin-15px">
                   
          {/* 사용자 이름 변경 */}
            <div className="h-60px  border-1px radius-10 marginTop-10px display-flex-center">
              <p className='margin-10px-0 marginLeft-15px font-weight-b'>사용자 이름</p>
            <div className="display-flex-center">
              <input type="text"
              placeholder='닉네임 설정'
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className='userNameInput'></input>
              <button className='changeButton' onClick={handleSaveUserName}><img src="./public/images/icons/check.svg" alt="icon" srcset="" /></button></div>
              </div>

          {/* 프로필 사진 변경 */}
          <div className="h-60px  border-1px radius-10 marginTop-10px display-flex-center">
              <p className='margin-10px-0 marginLeft-15px font-weight-b'>프로필 사진 변경하기</p>
            <div className="display-flex">
                <input type='file'
                accept='image/*'
                ref={profileInputRef}
                onChange={handleFileChange}
                className='hidden'>
                </input>
                <button className='changeButton'
                 onClick={() =>profileInputRef.current.click()}>
                  <img src="./public/images/icons/image-list.svg" alt="프로필 사진 선택" />
                 </button>
                 
                <button className='changeButton'
                 onClick={handleSaveProfileImageChange}
                 disabled={!userSelectImage}>
                  <img src="./public/images/icons/check.svg" alt="프로필 사진 변경 적용" />
                 </button>
              </div>
          </div> 

          {/* 프로필 헤더 사진 변경 */}
          <div className="h-60px  border-1px radius-10 marginTop-10px display-flex-center">
              <p className='margin-10px-0 marginLeft-15px font-weight-b'> 배경사진 변경하기</p>
            <div className="display-flex">
                <input type='file'
                accept='image/*'
                ref={headerInputRef}
                onChange={handleHeaderChange}
                className='hidden'>
                </input>
                <button className='changeButton'
                 onClick={() =>headerInputRef.current.click()}>
                  <img src="./public/images/icons/image-list.svg" alt="헤더 사진 선택" />
                 </button>
                 
                <button className='changeButton'
                 onClick={handleSaveHeaderImageChange}
                 disabled={!userSelectHeaderImage}>
                  <img src="./public/images/icons/check.svg" alt="헤더 사진 변경 적용" />
                 </button>
              </div>
          </div>

          <div className="h-60px border-1px radius-10 marginTop-30px">
            <div className="">
              <p className='margin-10px-0 marginLeft-15px font-weight-b'>로그인 계정 <span className='marginLeft-5px font-weight-normal'>mmm@gmail.com</span></p>
            </div>
          </div>

          <div className="h-60px border-1px radius-10 marginTop-10px">
            <div className="">
              <p className='margin-10px-0 marginLeft-15px font-weight-b'>로그인 계정 <span className='marginLeft-5px font-weight-normal'>mmm@gmail.com</span></p>
            </div>
          </div>
        </div>
    </div>
            )
          }
