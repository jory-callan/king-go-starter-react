import welcomeImg from "@/assets/img/welcome.png" // 静态导入
import { Card } from "@/components/ui/card"


const Dashboard = () => {
  return (
    <>
      <Card className="w-full h-full">
        <div className="max-w-full max-h-full flex justify-center items-center">
          <img
            src={welcomeImg}
            alt="welcome"
            className="w-full h-full object-contain"
          />
        </div>
      </Card>
    </>
  )
}

export default Dashboard
