
import './UserProfileSection.css'
import React, {useState, useEffect} from 'react';

export default function UserProfileSection({userCustomName, onSaveUserName}) {
  // 사용자 지정 이름 변경하기
  const [userName, setUserName] = useState(userCustomName);

  useEffect(() => {
    setUserName(userCustomName);
  }, [userCustomName])

  const handleSaveUserName = () => {
    onSaveUserName(userName)
    alert('닉네임이 저장되었습니다!');

  }
  return (
    <div className='w-100 h-300px marginTop-70px'>
        <div className="margin-15px">
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
