import Course from "./components/Course"  
import courses from "./constants/courses"
const App = () => {
  
  return (
      courses.map(course=>{
        return(
          <Course key={course.id} course={course}/>
        )
      })
  )
}

export default App