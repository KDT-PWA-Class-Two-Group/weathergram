
import './UserProfileSection.css'

export default function MyProfile() {
  return (
<div className='w-100 h-100px display-flex-alignItems-center marginTop--40px'
  style={{backgroundColor: "pink"}}>
            <div className="w-100px h-100px radius-50 marginLeft-10px"
            style={{
              backgroundColor: "#fff"
            }}>
              <img src="" alt=""
                style={{ width: "100%"}}></img>
              </div>
            
            <div className="w-160px h-70px marginLeft-10px marginTop-30px">
              <p>사용자 지정 닉네임</p>
              <p className="marginTop--10px"><span>.</span><span>000</span>
              <span>.</span><span>000</span></p>
            </div>
            <img className="profile-set"src="" alt="."></img>

          </div>

            )
          }
