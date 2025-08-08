import './App.css'
import router from './routes/AppRoutes'
import LoadingOverlay from './components/LoadingOverlay'
import { RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

function App() {

  return (
  <>
  {/* <h1>Hello </h1> */}
   <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light" // or "dark"
      />
       <RouterProvider router={router} fallbackElement={<LoadingOverlay/>}/>
{/* <Login/> */}
<h1>Hello World</h1>
    </>
  )
}

export default App
