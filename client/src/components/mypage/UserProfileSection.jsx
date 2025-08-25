
import './UserProfileSection.css'
import React, {useState} from 'react';

export default function MyProfile() {
  const [userName, setUserName] = useState("");
  return (
    <div className='w-100 h-300px'>
        <div className="margin-15px">
            <div className="h-100px display-flex-column border-1px radius-10">
              <p className='margin-10px-0 marginLeft-5px font-weight-b'>사용자 이름</p>
            <input type="text"
              placeholder='닉네임 설정'
              value={userName}
              onChange={(e) => setUserName(e.target.value)}

              className='userNameInput margin-10-0px'></input>
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
