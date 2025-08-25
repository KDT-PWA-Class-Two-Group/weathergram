import './myPage.css';
import UseProfileSection from '../components/mypage/UserProfileSection.jsx'
import UserPostGrid from '../components/mypage/UserPostGrid.jsx'

export default function MyPages (){
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
          <UseProfileSection />
          
          {/* 프로필 갤러리 */}
          <UserPostGrid />
          
      </div>
    </div>    
    
  )
} 